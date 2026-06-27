"""
Multi-account manager.

Stores TikTok account credentials in SQLite and handles:
  - Adding new accounts (OAuth flow)
  - Token refresh
  - Selecting accounts for today's posting schedule
  - Tracking daily post counts per account
"""

import json
import sqlite3
import time
from contextlib import contextmanager
from datetime import date, datetime
from pathlib import Path
from typing import Optional

from src.tiktok.auth import TikTokAuth
from src.tiktok.api_client import TikTokClient
from src.utils import get_logger, load_config

logger = get_logger(__name__)
cfg = load_config()

MAX_PER_ACCOUNT = cfg["posting"]["max_per_account_per_day"]


class Account:
    def __init__(self, row: dict):
        self.id: int = row["id"]
        self.username: str = row["username"]
        self.open_id: str = row["open_id"]
        self.access_token: str = row["access_token"]
        self.refresh_token: str = row["refresh_token"]
        self.token_expires_at: int = row["token_expires_at"]
        self.active: bool = bool(row["active"])

    def is_token_expired(self) -> bool:
        return time.time() >= self.token_expires_at - 300  # refresh 5min early

    def client(self) -> TikTokClient:
        return TikTokClient(self.access_token)


class AccountManager:
    def __init__(self, db_path: str | None = None):
        self.db_path = db_path or cfg.get("db_path", "data/nexus.db")
        Path(self.db_path).parent.mkdir(parents=True, exist_ok=True)
        self._init_db()

    # ------------------------------------------------------------------
    # DB setup
    # ------------------------------------------------------------------
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
                CREATE TABLE IF NOT EXISTS accounts (
                    id               INTEGER PRIMARY KEY AUTOINCREMENT,
                    username         TEXT NOT NULL,
                    open_id          TEXT UNIQUE NOT NULL,
                    access_token     TEXT NOT NULL,
                    refresh_token    TEXT NOT NULL,
                    token_expires_at INTEGER NOT NULL,
                    active           INTEGER DEFAULT 1,
                    created_at       TEXT DEFAULT (datetime('now'))
                );

                CREATE TABLE IF NOT EXISTS post_log (
                    id           INTEGER PRIMARY KEY AUTOINCREMENT,
                    account_id   INTEGER NOT NULL,
                    publish_id   TEXT,
                    video_path   TEXT,
                    title        TEXT,
                    status       TEXT DEFAULT 'pending',
                    posted_at    TEXT,
                    error        TEXT,
                    FOREIGN KEY (account_id) REFERENCES accounts(id)
                );

                CREATE INDEX IF NOT EXISTS idx_postlog_date
                    ON post_log (account_id, posted_at);
            """)

    # ------------------------------------------------------------------
    # Account CRUD
    # ------------------------------------------------------------------
    def add_account(self, username: str, token_data: dict) -> int:
        """Store a newly authorized account. Returns the row id."""
        expires_at = int(time.time()) + token_data.get("expires_in", 86400)
        with self._conn() as conn:
            cur = conn.execute(
                """
                INSERT INTO accounts
                    (username, open_id, access_token, refresh_token, token_expires_at)
                VALUES (?, ?, ?, ?, ?)
                ON CONFLICT(open_id) DO UPDATE SET
                    username         = excluded.username,
                    access_token     = excluded.access_token,
                    refresh_token    = excluded.refresh_token,
                    token_expires_at = excluded.token_expires_at,
                    active           = 1
                """,
                (
                    username,
                    token_data["open_id"],
                    token_data["access_token"],
                    token_data["refresh_token"],
                    expires_at,
                ),
            )
            return cur.lastrowid

    def get_all_active(self) -> list[Account]:
        with self._conn() as conn:
            rows = conn.execute(
                "SELECT * FROM accounts WHERE active = 1"
            ).fetchall()
        return [Account(dict(r)) for r in rows]

    def get_account(self, account_id: int) -> Optional[Account]:
        with self._conn() as conn:
            row = conn.execute(
                "SELECT * FROM accounts WHERE id = ?", (account_id,)
            ).fetchone()
        return Account(dict(row)) if row else None

    def deactivate_account(self, account_id: int):
        with self._conn() as conn:
            conn.execute(
                "UPDATE accounts SET active = 0 WHERE id = ?", (account_id,)
            )

    # ------------------------------------------------------------------
    # Token management
    # ------------------------------------------------------------------
    def refresh_if_needed(self, account: Account, auth: TikTokAuth) -> Account:
        if not account.is_token_expired():
            return account
        logger.info("Refreshing token for account %s", account.username)
        try:
            data = auth.refresh_token(account.refresh_token)
            expires_at = int(time.time()) + data.get("expires_in", 86400)
            with self._conn() as conn:
                conn.execute(
                    """
                    UPDATE accounts
                    SET access_token = ?, refresh_token = ?, token_expires_at = ?
                    WHERE id = ?
                    """,
                    (data["access_token"], data["refresh_token"], expires_at, account.id),
                )
            account.access_token = data["access_token"]
            account.refresh_token = data["refresh_token"]
            account.token_expires_at = expires_at
        except Exception as exc:
            logger.error("Token refresh failed for %s: %s", account.username, exc)
            self.deactivate_account(account.id)
            raise
        return account

    # ------------------------------------------------------------------
    # Daily post tracking
    # ------------------------------------------------------------------
    def posts_today(self, account_id: int) -> int:
        today = date.today().isoformat()
        with self._conn() as conn:
            row = conn.execute(
                """
                SELECT COUNT(*) as cnt FROM post_log
                WHERE account_id = ?
                  AND status = 'success'
                  AND posted_at LIKE ?
                """,
                (account_id, f"{today}%"),
            ).fetchone()
        return row["cnt"] if row else 0

    def available_accounts(self) -> list[Account]:
        """Return active accounts that haven't hit their daily posting limit."""
        all_active = self.get_all_active()
        available = [a for a in all_active if self.posts_today(a.id) < MAX_PER_ACCOUNT]
        return available

    def log_post(
        self,
        account_id: int,
        video_path: str,
        title: str,
        status: str,
        publish_id: str = "",
        error: str = "",
    ):
        with self._conn() as conn:
            conn.execute(
                """
                INSERT INTO post_log (account_id, publish_id, video_path, title, status, posted_at, error)
                VALUES (?, ?, ?, ?, ?, datetime('now'), ?)
                """,
                (account_id, publish_id, video_path, title, status, error),
            )

    # ------------------------------------------------------------------
    # Stats
    # ------------------------------------------------------------------
    def daily_stats(self) -> dict:
        today = date.today().isoformat()
        with self._conn() as conn:
            row = conn.execute(
                """
                SELECT
                    COUNT(*) as total,
                    SUM(CASE WHEN status='success' THEN 1 ELSE 0 END) as success,
                    SUM(CASE WHEN status='failed'  THEN 1 ELSE 0 END) as failed
                FROM post_log
                WHERE posted_at LIKE ?
                """,
                (f"{today}%",),
            ).fetchone()
        return dict(row) if row else {"total": 0, "success": 0, "failed": 0}
