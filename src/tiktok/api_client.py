"""
TikTok Content Posting API v2 client.

Handles:
  - Video upload (chunked, Direct Post flow)
  - Status polling
  - Automatic token refresh via AccountManager
"""

import os
import time
from pathlib import Path
from typing import Optional

import httpx
from tenacity import retry, stop_after_attempt, wait_exponential

from src.utils import get_logger, load_config

logger = get_logger(__name__)
cfg = load_config()

BASE_URL = cfg["tiktok_api"]["base_url"]
CHUNK_SIZE = cfg["tiktok_api"]["chunk_size_bytes"]
UPLOAD_TIMEOUT = cfg["tiktok_api"]["upload_timeout_seconds"]


class TikTokAPIError(Exception):
    pass


class TikTokClient:
    """Authenticated TikTok API client for a single account."""

    def __init__(self, access_token: str):
        self.access_token = access_token
        self._headers = {
            "Authorization": f"Bearer {access_token}",
            "Content-Type": "application/json; charset=UTF-8",
        }

    # ------------------------------------------------------------------
    # Video upload — Direct Post flow
    # ------------------------------------------------------------------
    def upload_video(
        self,
        video_path: str,
        title: str,
        hashtags: list[str] | None = None,
        privacy: str = "PUBLIC_TO_EVERYONE",
        disable_comment: bool = False,
        disable_duet: bool = False,
        disable_stitch: bool = False,
    ) -> str:
        """
        Upload and publish a video. Returns the publish_id.

        privacy options:
          PUBLIC_TO_EVERYONE | MUTUAL_FOLLOW_FRIENDS | FOLLOWER_OF_CREATOR | SELF_ONLY
        """
        video_path = Path(video_path)
        if not video_path.exists():
            raise FileNotFoundError(f"Video not found: {video_path}")

        file_size = video_path.stat().st_size
        caption = self._build_caption(title, hashtags or [])

        # Step 1 — Initialize upload
        publish_id, upload_url = self._init_upload(
            file_size=file_size,
            caption=caption,
            privacy=privacy,
            disable_comment=disable_comment,
            disable_duet=disable_duet,
            disable_stitch=disable_stitch,
        )
        logger.info("Upload initialized. publish_id=%s", publish_id)

        # Step 2 — Upload chunks
        self._upload_chunks(upload_url, video_path, file_size)
        logger.info("Video chunks uploaded for publish_id=%s", publish_id)

        # Step 3 — Poll until published
        self._wait_for_publish(publish_id)
        logger.info("Video published! publish_id=%s", publish_id)

        return publish_id

    # ------------------------------------------------------------------
    # Internal helpers
    # ------------------------------------------------------------------
    @retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=2, min=4, max=30))
    def _init_upload(
        self,
        file_size: int,
        caption: str,
        privacy: str,
        disable_comment: bool,
        disable_duet: bool,
        disable_stitch: bool,
    ) -> tuple[str, str]:
        chunk_count = max(1, -(-file_size // CHUNK_SIZE))  # ceiling division

        body = {
            "post_info": {
                "title": caption,
                "privacy_level": privacy,
                "disable_comment": disable_comment,
                "disable_duet": disable_duet,
                "disable_stitch": disable_stitch,
            },
            "source_info": {
                "source": "FILE_UPLOAD",
                "video_size": file_size,
                "chunk_size": CHUNK_SIZE,
                "total_chunk_count": chunk_count,
            },
        }

        resp = httpx.post(
            f"{BASE_URL}/post/video/init/",
            headers=self._headers,
            json=body,
            timeout=30,
        )
        self._check_response(resp)
        data = resp.json()["data"]
        return data["publish_id"], data["upload_url"]

    def _upload_chunks(self, upload_url: str, video_path: Path, file_size: int):
        uploaded = 0
        chunk_index = 0

        with open(video_path, "rb") as f:
            while True:
                chunk = f.read(CHUNK_SIZE)
                if not chunk:
                    break

                start = uploaded
                end = uploaded + len(chunk) - 1

                headers = {
                    "Content-Range": f"bytes {start}-{end}/{file_size}",
                    "Content-Type": "video/mp4",
                }

                resp = httpx.put(
                    upload_url,
                    content=chunk,
                    headers=headers,
                    timeout=UPLOAD_TIMEOUT,
                )
                if resp.status_code not in (200, 201, 206):
                    raise TikTokAPIError(
                        f"Chunk {chunk_index} upload failed: {resp.status_code} {resp.text}"
                    )

                uploaded += len(chunk)
                chunk_index += 1
                logger.debug("Uploaded chunk %d (%d/%d bytes)", chunk_index, uploaded, file_size)

    def _wait_for_publish(self, publish_id: str, timeout: int = 300):
        deadline = time.time() + timeout
        while time.time() < deadline:
            status = self._get_publish_status(publish_id)
            if status == "PUBLISH_COMPLETE":
                return
            if status in ("FAILED", "CANCELLED"):
                raise TikTokAPIError(f"Publish failed with status: {status}")
            time.sleep(5)
        raise TimeoutError(f"Publish did not complete within {timeout}s")

    @retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=2, min=2, max=10))
    def _get_publish_status(self, publish_id: str) -> str:
        resp = httpx.post(
            f"{BASE_URL}/post/video/status/fetch/",
            headers=self._headers,
            json={"publish_id": publish_id},
            timeout=30,
        )
        self._check_response(resp)
        return resp.json()["data"]["status"]

    def _check_response(self, resp: httpx.Response):
        if resp.status_code == 401:
            raise TikTokAPIError("Access token expired or invalid.")
        if resp.status_code == 429:
            sleep = int(resp.headers.get("Retry-After", 60))
            logger.warning("Rate limited. Sleeping %ds.", sleep)
            time.sleep(sleep)
            raise TikTokAPIError("Rate limited")
        if not resp.is_success:
            raise TikTokAPIError(f"HTTP {resp.status_code}: {resp.text}")
        body = resp.json()
        if body.get("error", {}).get("code", "ok") != "ok":
            raise TikTokAPIError(f"API error: {body['error']}")

    @staticmethod
    def _build_caption(title: str, hashtags: list[str]) -> str:
        tag_str = " ".join(f"#{h.lstrip('#')}" for h in hashtags)
        caption = f"{title} {tag_str}".strip()
        return caption[:2200]  # TikTok caption limit
