"""
Manual trigger: plan and execute today's posts right now.
Useful for testing before the scheduler is running continuously.

Usage:
  python scripts/run_daily.py --plan-only    # just build the queue, don't post
  python scripts/run_daily.py                # plan + execute
"""

import os, sys, argparse
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from dotenv import load_dotenv
load_dotenv()

from src.accounts.manager import AccountManager
from src.queue.video_queue import VideoQueue
from src.scheduler.daily_scheduler import DailyScheduler
from src.tiktok.auth import TikTokAuth
from src.utils import get_logger

logger = get_logger("run_daily")


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--plan-only", action="store_true", help="Build queue without posting")
    args = parser.parse_args()

    client_key    = os.getenv("TIKTOK_CLIENT_KEY")
    client_secret = os.getenv("TIKTOK_CLIENT_SECRET")
    redirect_uri  = os.getenv("TIKTOK_REDIRECT_URI", "http://localhost:8080/callback")

    auth = TikTokAuth(client_key, client_secret, redirect_uri)
    mgr  = AccountManager()
    q    = VideoQueue()
    sch  = DailyScheduler(mgr, q, auth)

    accounts = mgr.get_all_active()
    if not accounts:
        print("\n[ERROR] No TikTok accounts found.")
        print("Add at least one with: python scripts/add_account.py\n")
        sys.exit(1)

    print(f"\nActive accounts: {len(accounts)}")
    print(f"Pending in queue: {q.pending_count()}")

    n = sch.plan_day()
    print(f"\n✅ Queued {n} videos for today.")

    if not args.plan_only:
        print("Executing pending posts...\n")
        sch.execute_pending()
        stats = q.stats()
        print(f"\nQueue stats: {stats}")


if __name__ == "__main__":
    main()
