"""
Daily posting scheduler — fully autonomous.

What happens every day automatically:
  00:01 — plan_day():    pick daily target, distribute across accounts, generate videos, fill queue
  Every tick — execute_pending(): upload any job whose scheduled time has arrived
  Every tick — retry failed jobs after cooldown
  02:00 — cleanup():    delete videos older than 2 days to save disk space
  Every 6h — health_check(): warn if too few active accounts remain
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
VID_CFG  = cfg["video"]


def _random_times_in_window(count: int, start_str: str, end_str: str, date_obj: date) -> list[str]:
    start_h, start_m = map(int, start_str.split(":"))
    end_h, end_m     = map(int, end_str.split(":"))

    start_ts = datetime(date_obj.year, date_obj.month, date_obj.day, start_h, start_m)
    end_ts   = datetime(date_obj.year, date_obj.month, date_obj.day, end_h, end_m)
    window   = int((end_ts - start_ts).total_seconds())

    if count >= window // 60:
        # More slots than minutes — spread evenly
        step = window // max(count, 1)
        offsets = [i * step for i in range(count)]
    else:
        offsets = sorted(random.sample(range(0, window, 60), count))

    return [
        (start_ts + timedelta(seconds=off)).strftime("%Y-%m-%d %H:%M:%S")
        for off in offsets
    ]


class DailyScheduler:
    def __init__(self, account_manager: AccountManager, queue: VideoQueue, auth: TikTokAuth):
        self.accounts = account_manager
        self.queue    = queue
        self.auth     = auth
        self._scheduler = BackgroundScheduler(timezone="UTC")

    # ------------------------------------------------------------------
    # Plan today — called at midnight and on startup
    # ------------------------------------------------------------------
    def plan_day(self) -> int:
        today = date.today()
        target = random.randint(POST_CFG["daily_target_min"], POST_CFG["daily_target_max"])
        max_per = POST_CFG["max_per_account_per_day"]

        available = self.accounts.available_accounts()
        if not available:
            logger.error(
                "No available accounts! Add accounts with: python scripts/add_account.py"
            )
            return 0

        total_capacity = len(available) * max_per
        actual_target  = min(target, total_capacity)

        logger.info(
            "Planning day: target=%d, accounts=%d, capacity=%d, actual=%d",
            target, len(available), total_capacity, actual_target,
        )

        # Round-robin assignment: fill each account up to its cap
        slot_pool: list[tuple[int, str]] = []
        per_account = math.ceil(actual_target / len(available))

        for account in available:
            slots_for_this = min(per_account, max_per, actual_target - len(slot_pool))
            if slots_for_this <= 0:
                break
            times = _random_times_in_window(
                slots_for_this,
                POST_CFG["posting_window_start"],
                POST_CFG["posting_window_end"],
                today,
            )
            for t in times:
                slot_pool.append((account.id, t))

        random.shuffle(slot_pool)

        # Generate one video per slot and enqueue
        jobs_queued = 0
        active_templates = cfg["templates"].get("active", ["motivational"])

        for account_id, scheduled_at in slot_pool:
            template = random.choice(active_templates)
            try:
                video_path, title, hashtags = self._generate_one(template)
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
                logger.error("Failed to generate/queue job for account %d: %s", account_id, exc)

        logger.info("Queued %d jobs for today.", jobs_queued)
        return jobs_queued

    def _generate_one(self, template: str) -> tuple[str, list[str], str]:
        from src.video.generator import create_video
        from src.video.templates import get_random_script
        script = get_random_script(template)
        path   = create_video(script=script)
        return path, script.title, script.hashtags

    # ------------------------------------------------------------------
    # Execute pending jobs (called on every tick)
    # ------------------------------------------------------------------
    def execute_pending(self):
        retry_mins = SCH_CFG["retry_after_minutes"]

        job = self.queue.claim_next()
        while job:
            self._post_job(job)
            job = self.queue.claim_next()

        retry_job = self.queue.claim_retryable(retry_mins)
        if retry_job:
            self._post_job(retry_job)

    def _post_job(self, job: PostJob):
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
            logger.info(
                "Posted '%s' from account %s (publish_id=%s)",
                job.title, account.username, publish_id,
            )

            # Respect per-account spacing to avoid spam detection
            delay = POST_CFG.get("inter_post_delay_seconds", 600)
            time.sleep(delay)

        except Exception as exc:
            err = str(exc)
            logger.error("Post failed (job %d, account %s): %s", job.id,
                         account.username if account else "?", err)
            self.queue.mark_failed(job.id, err)
            self.accounts.log_post(
                account_id=job.account_id,
                video_path=job.video_path,
                title=job.title,
                status="failed",
                error=err,
            )

    # ------------------------------------------------------------------
    # Cleanup — delete generated videos older than 2 days
    # ------------------------------------------------------------------
    def cleanup(self):
        output_dir = Path(VID_CFG.get("output_dir", "data/generated"))
        temp_dir   = Path(VID_CFG.get("temp_dir", "data/temp"))
        cutoff     = time.time() - 2 * 86400  # 2 days ago

        removed = 0
        for directory in (output_dir, temp_dir):
            if directory.exists():
                for f in directory.iterdir():
                    if f.is_file() and f.stat().st_mtime < cutoff:
                        f.unlink(missing_ok=True)
                        removed += 1

        if removed:
            logger.info("Cleanup: removed %d old video/temp files.", removed)

    # ------------------------------------------------------------------
    # Health check — warn if running low on active accounts
    # ------------------------------------------------------------------
    def health_check(self):
        active = self.accounts.get_all_active()
        min_needed = math.ceil(POST_CFG["daily_target_min"] / POST_CFG["max_per_account_per_day"])
        if len(active) < min_needed:
            logger.warning(
                "HEALTH: Only %d active accounts — need %d for target of %d/day. "
                "Add more with: python scripts/add_account.py",
                len(active), min_needed, POST_CFG["daily_target_min"],
            )
        else:
            logger.info(
                "HEALTH: %d active accounts — capacity %d posts/day.",
                len(active), len(active) * POST_CFG["max_per_account_per_day"],
            )

        # Log today's progress
        stats = self.accounts.daily_stats()
        logger.info(
            "TODAY: published=%d, failed=%d, pending=%d",
            stats.get("success", 0), stats.get("failed", 0),
            self.queue.pending_count(),
        )

    # ------------------------------------------------------------------
    # APScheduler wiring — start the engine
    # ------------------------------------------------------------------
    def start(self):
        tick = SCH_CFG["tick_interval"]

        # Daily plan at 00:01 UTC
        self._scheduler.add_job(self.plan_day, "cron", hour=0, minute=1, id="plan_day")

        # Cleanup at 02:00 UTC
        self._scheduler.add_job(self.cleanup, "cron", hour=2, minute=0, id="cleanup")

        # Health check every 6 hours
        self._scheduler.add_job(self.health_check, "interval", hours=6, id="health")

        # Execution tick
        self._scheduler.add_job(self.execute_pending, "interval", seconds=tick, id="execute")

        self._scheduler.start()
        logger.info("Scheduler running. Tick every %ds.", tick)

        # On startup: plan today + run health check immediately
        logger.info("Running startup plan_day and health_check...")
        self.health_check()

        if self.queue.pending_count() == 0:
            self.plan_day()
        else:
            logger.info(
                "Queue already has %d pending jobs — skipping plan_day.",
                self.queue.pending_count(),
            )

        try:
            while True:
                time.sleep(30)
        except (KeyboardInterrupt, SystemExit):
            logger.info("Shutting down NEXUS scheduler.")
            self._scheduler.shutdown()

    def stop(self):
        self._scheduler.shutdown(wait=False)
