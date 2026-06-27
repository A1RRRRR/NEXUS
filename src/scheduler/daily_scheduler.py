"""
Daily posting scheduler.

Responsibilities every day at midnight:
  1. Determine how many videos to post today (random within configured range)
  2. Get all available accounts
  3. Spread videos evenly across accounts, each capped at max_per_account
  4. Generate videos if needed to fill the queue
  5. Schedule each post at a random time within the posting window
  6. Populate the VideoQueue

During the day (continuous loop):
  - Claim and execute ready jobs from the queue
  - Retry failed jobs after the cooldown period
  - Log results via AccountManager
"""

import math
import random
import time
from datetime import date, datetime, timedelta
from pathlib import Path
from typing import Optional

from apscheduler.schedulers.background import BackgroundScheduler

from src.accounts.manager import AccountManager
from src.queue.video_queue import VideoQueue, PostJob
from src.tiktok.auth import TikTokAuth
from src.utils import get_logger, load_config

logger = get_logger(__name__)
cfg = load_config()

POST_CFG = cfg["posting"]
SCH_CFG  = cfg["scheduler"]


def _random_times_in_window(count: int, start_str: str, end_str: str, date_obj: date) -> list[str]:
    """
    Return `count` unique ISO datetime strings spread randomly within [start, end].
    """
    start_h, start_m = map(int, start_str.split(":"))
    end_h, end_m     = map(int, end_str.split(":"))

    start_ts = datetime(date_obj.year, date_obj.month, date_obj.day, start_h, start_m)
    end_ts   = datetime(date_obj.year, date_obj.month, date_obj.day, end_h, end_m)
    window   = int((end_ts - start_ts).total_seconds())

    offsets = sorted(random.sample(range(0, window, 60), min(count, window // 60)))
    return [
        (start_ts + timedelta(seconds=off)).strftime("%Y-%m-%d %H:%M:%S")
        for off in offsets
    ]


class DailyScheduler:
    def __init__(self, account_manager: AccountManager, queue: VideoQueue, auth: TikTokAuth):
        self.accounts = account_manager
        self.queue    = queue
        self.auth     = auth
        self._scheduler = BackgroundScheduler()

    # ------------------------------------------------------------------
    # Plan today's posts
    # ------------------------------------------------------------------
    def plan_day(self) -> int:
        """
        Build the posting plan for today. Returns number of jobs queued.

        Called automatically at midnight; can also be called manually.
        """
        today = date.today()
        target = random.randint(
            POST_CFG["daily_target_min"],
            POST_CFG["daily_target_max"],
        )
        max_per = POST_CFG["max_per_account_per_day"]

        available = self.accounts.available_accounts()
        if not available:
            logger.error("No available accounts! Add accounts with: python scripts/add_account.py")
            return 0

        # How many posts each account will do
        total_capacity = len(available) * max_per
        actual_target  = min(target, total_capacity)

        logger.info(
            "Planning day: target=%d, accounts=%d, capacity=%d, actual=%d",
            target, len(available), total_capacity, actual_target,
        )

        # Distribute videos across accounts (round-robin fill)
        assignments: list[tuple[int, str]] = []  # (account_id, scheduled_at)
        per_account = math.ceil(actual_target / len(available))

        slot_pool = []
        for account in available:
            n = min(per_account, max_per)
            times = _random_times_in_window(
                n,
                POST_CFG["posting_window_start"],
                POST_CFG["posting_window_end"],
                today,
            )
            for t in times:
                slot_pool.append((account.id, t))
                if len(slot_pool) >= actual_target:
                    break
            if len(slot_pool) >= actual_target:
                break

        random.shuffle(slot_pool)

        # Generate videos and enqueue
        jobs_queued = 0
        for account_id, scheduled_at in slot_pool:
            try:
                video_path, title, hashtags, template = self._generate_one()
                self.queue.enqueue(
                    video_path=video_path,
                    title=title,
                    hashtags=hashtags,
                    template=template,
                    account_id=account_id,
                    scheduled_at=scheduled_at,
                )
                jobs_queued += 1
            except Exception as exc:
                logger.error("Failed to queue job for account %d: %s", account_id, exc)

        logger.info("Queued %d jobs for today.", jobs_queued)
        return jobs_queued

    def _generate_one(self) -> tuple[str, str, list[str], str]:
        """Generate one video and return (path, title, hashtags, template)."""
        from src.video.generator import create_video
        from src.video.templates import get_random_script

        active_templates = cfg["templates"].get("active", ["motivational"])
        template = random.choice(active_templates)
        script   = get_random_script(template)
        path     = create_video(script=script)
        return path, script.title, script.hashtags, template

    # ------------------------------------------------------------------
    # Execution loop — run jobs as they become due
    # ------------------------------------------------------------------
    def execute_pending(self):
        """Check the queue and execute any jobs that are now due."""
        retry_mins = SCH_CFG["retry_after_minutes"]

        # New ready jobs
        job = self.queue.claim_next()
        while job:
            self._post_job(job)
            job = self.queue.claim_next()

        # Retryable failed jobs
        retry_job = self.queue.claim_retryable(retry_mins)
        if retry_job:
            self._post_job(retry_job)

    def _post_job(self, job: PostJob):
        """Execute a single posting job."""
        account = self.accounts.get_account(job.account_id)
        if not account or not account.active:
            self.queue.mark_failed(job.id, "Account not found or inactive")
            return

        try:
            account = self.accounts.refresh_if_needed(account, self.auth)
            client  = account.client()

            publish_id = client.upload_video(
                video_path=job.video_path,
                title=job.title,
                hashtags=job.hashtag_list,
            )

            self.queue.mark_success(job.id, publish_id)
            self.accounts.log_post(
                account_id=job.account_id,
                video_path=job.video_path,
                title=job.title,
                status="success",
                publish_id=publish_id,
            )

            # Respect TikTok's per-account rate limit
            time.sleep(POST_CFG.get("inter_post_delay_seconds", 600))

        except Exception as exc:
            err = str(exc)
            logger.error("Post failed (job %d, account %d): %s", job.id, job.account_id, err)
            self.queue.mark_failed(job.id, err)
            self.accounts.log_post(
                account_id=job.account_id,
                video_path=job.video_path,
                title=job.title,
                status="failed",
                error=err,
            )

    # ------------------------------------------------------------------
    # APScheduler wiring
    # ------------------------------------------------------------------
    def start(self):
        """Start the background scheduler. Blocks until interrupted."""
        tick = SCH_CFG["tick_interval"]

        # Plan today's posts immediately on start
        self._scheduler.add_job(self.plan_day, "cron", hour=0, minute=1)
        self._scheduler.add_job(self.execute_pending, "interval", seconds=tick)

        self._scheduler.start()
        logger.info("Scheduler running. Tick every %ds.", tick)

        # Run once on startup so we don't wait for midnight
        logger.info("Running initial plan_day on startup...")
        self.plan_day()

        try:
            while True:
                time.sleep(30)
        except (KeyboardInterrupt, SystemExit):
            logger.info("Shutting down scheduler.")
            self._scheduler.shutdown()

    def stop(self):
        self._scheduler.shutdown(wait=False)
