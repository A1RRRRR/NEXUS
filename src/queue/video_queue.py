"""
SQLite-backed video posting queue.

Jobs flow through states:
  pending → assigned → posting → success | failed | retry
"""

import sqlite3
import time
from contextlib import contextmanager
from datetime import datetime
from pathlib import Path
from typing import Optional

from src.utils import get_logger, load_config

logger = get_logger(__name__)
cfg = load_config()


class PostJob:
    def __init__(self, row: dict):
        self.id: int          = row["id"]
        self.video_path: str  = row["video_path"]
        self.title: str       = row["title"]
        self.hashtags: str    = row["hashtags"]   # comma-separated
        self.template: str    = row["template"]
        self.account_id: int  = row["account_id"]
        self.status: str      = row["status"]
        self.scheduled_at: str = row["scheduled_at"]
        self.attempts: int    = row["attempts"]
        self.error: str       = row.get("error") or ""

    @property
    def hashtag_list(self) -> list[str]:
        return [h.strip() for h in self.hashtags.split(",") if h.strip()]


class VideoQueue:
    def __init__(self, db_path: str | None = None):
        self.db_path = db_path or cfg.get("db_path", "data/nexus.db")
        Path(self.db_path).parent.mkdir(parents=True, exist_ok=True)
        self._init_db()

    @contextmanager
    def _conn(self):
        conn = sqlite3.connect(self.db_path)
        conn.row_factory = sqlite3.Row
        try:
            yield conn
            conn.commit()
        finally:
            conn.close()

    def _init_db(self):
        with self._conn() as conn:
            conn.executescript("""
                CREATE TABLE IF NOT EXISTS post_queue (
                    id            INTEGER PRIMARY KEY AUTOINCREMENT,
                    video_path    TEXT NOT NULL,
                    title         TEXT NOT NULL,
                    hashtags      TEXT DEFAULT '',
                    template      TEXT DEFAULT 'motivational',
                    account_id    INTEGER,
                    status        TEXT DEFAULT 'pending',
                    scheduled_at  TEXT,
                    attempts      INTEGER DEFAULT 0,
                    error         TEXT,
                    created_at    TEXT DEFAULT (datetime('now')),
                    updated_at    TEXT DEFAULT (datetime('now'))
                );

                CREATE INDEX IF NOT EXISTS idx_queue_status
                    ON post_queue (status, scheduled_at);
            """)

    # ------------------------------------------------------------------
    # Enqueue
    # ------------------------------------------------------------------
    def enqueue(
        self,
        video_path: str,
        title: str,
        hashtags: list[str],
        template: str,
        account_id: int,
        scheduled_at: str,
    ) -> int:
        hashtag_str = ",".join(hashtags)
        with self._conn() as conn:
            cur = conn.execute(
                """
                INSERT INTO post_queue
                    (video_path, title, hashtags, template, account_id, scheduled_at)
                VALUES (?, ?, ?, ?, ?, ?)
                """,
                (video_path, title, hashtag_str, template, account_id, scheduled_at),
            )
            return cur.lastrowid

    def enqueue_batch(self, jobs: list[dict]) -> int:
        """Insert multiple jobs at once. Returns count inserted."""
        with self._conn() as conn:
            conn.executemany(
                """
                INSERT INTO post_queue
                    (video_path, title, hashtags, template, account_id, scheduled_at)
                VALUES (:video_path, :title, :hashtags, :template, :account_id, :scheduled_at)
                """,
                jobs,
            )
        return len(jobs)

    # ------------------------------------------------------------------
    # Dequeue / claim
    # ------------------------------------------------------------------
    def claim_next(self) -> Optional[PostJob]:
        """
        Atomically claim the next pending job whose scheduled_at has passed.
        Returns None if nothing is ready.
        """
        now = datetime.utcnow().isoformat(sep=" ", timespec="seconds")
        with self._conn() as conn:
            row = conn.execute(
                """
                SELECT * FROM post_queue
                WHERE status = 'pending'
                  AND (scheduled_at IS NULL OR scheduled_at <= ?)
                ORDER BY scheduled_at ASC
                LIMIT 1
                """,
                (now,),
            ).fetchone()

            if not row:
                return None

            conn.execute(
                "UPDATE post_queue SET status = 'posting', updated_at = ? WHERE id = ?",
                (now, row["id"]),
            )
        return PostJob(dict(row))

    def claim_retryable(self, retry_after_minutes: int = 30) -> Optional[PostJob]:
        """Claim a failed job that is eligible for retry."""
        threshold = datetime.utcnow().isoformat(sep=" ", timespec="seconds")
        max_retries = cfg["scheduler"]["max_retries"]
        with self._conn() as conn:
            row = conn.execute(
                """
                SELECT * FROM post_queue
                WHERE status = 'failed'
                  AND attempts < ?
                  AND updated_at <= datetime('now', ?)
                ORDER BY updated_at ASC
                LIMIT 1
                """,
                (max_retries, f"-{retry_after_minutes} minutes"),
            ).fetchone()
            if not row:
                return None
            conn.execute(
                "UPDATE post_queue SET status = 'posting', updated_at = ? WHERE id = ?",
                (threshold, row["id"]),
            )
        return PostJob(dict(row))

    # ------------------------------------------------------------------
    # Status updates
    # ------------------------------------------------------------------
    def mark_success(self, job_id: int, publish_id: str = ""):
        self._set_status(job_id, "success", publish_id=publish_id)

    def mark_failed(self, job_id: int, error: str):
        with self._conn() as conn:
            conn.execute(
                """
                UPDATE post_queue
                SET status = 'failed',
                    error = ?,
                    attempts = attempts + 1,
                    updated_at = datetime('now')
                WHERE id = ?
                """,
                (error[:500], job_id),
            )

    def _set_status(self, job_id: int, status: str, **kwargs):
        fields = ", ".join(f"{k} = ?" for k in kwargs)
        values = list(kwargs.values())
        if fields:
            sql = f"UPDATE post_queue SET status = ?, {fields}, updated_at = datetime('now') WHERE id = ?"
            args = [status] + values + [job_id]
        else:
            sql = "UPDATE post_queue SET status = ?, updated_at = datetime('now') WHERE id = ?"
            args = [status, job_id]
        with self._conn() as conn:
            conn.execute(sql, args)

    # ------------------------------------------------------------------
    # Stats
    # ------------------------------------------------------------------
    def pending_count(self) -> int:
        with self._conn() as conn:
            row = conn.execute(
                "SELECT COUNT(*) as n FROM post_queue WHERE status IN ('pending', 'posting')"
            ).fetchone()
        return row["n"]

    def stats(self) -> dict:
        with self._conn() as conn:
            rows = conn.execute(
                """
                SELECT status, COUNT(*) as n
                FROM post_queue
                GROUP BY status
                """
            ).fetchall()
        return {r["status"]: r["n"] for r in rows}

    def recent_jobs(self, limit: int = 20) -> list[PostJob]:
        with self._conn() as conn:
            rows = conn.execute(
                "SELECT * FROM post_queue ORDER BY id DESC LIMIT ?", (limit,)
            ).fetchall()
        return [PostJob(dict(r)) for r in rows]
