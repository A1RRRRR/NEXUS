"""
TikTok OAuth 2.0 flow for the Content Posting API.

Each TikTok account must go through the OAuth flow once to obtain an
access_token + refresh_token. These are stored in the database and
refreshed automatically before they expire.

TikTok token lifetimes:
  access_token  — 24 hours
  refresh_token — 365 days
"""

import hashlib
import os
import secrets
import time
import urllib.parse
from http.server import BaseHTTPRequestHandler, HTTPServer
from threading import Thread

import httpx

from src.utils import get_logger, load_config

logger = get_logger(__name__)
cfg = load_config()

TIKTOK_AUTH_URL = "https://www.tiktok.com/v2/auth/authorize/"
TIKTOK_TOKEN_URL = "https://open.tiktokapis.com/v2/oauth/token/"

SCOPES = [
    "user.info.basic",
    "video.publish",
    "video.upload",
]


class TikTokAuth:
    def __init__(self, client_key: str, client_secret: str, redirect_uri: str):
        self.client_key = client_key
        self.client_secret = client_secret
        self.redirect_uri = redirect_uri

    # ------------------------------------------------------------------
    # Step 1 – Build the authorization URL for a human to visit
    # ------------------------------------------------------------------
    def get_auth_url(self) -> tuple[str, str, str]:
        """Return (auth_url, code_verifier, state) for PKCE flow."""
        state = secrets.token_urlsafe(16)
        code_verifier = secrets.token_urlsafe(64)
        code_challenge = (
            hashlib.sha256(code_verifier.encode()).digest().hex()
        )

        params = {
            "client_key": self.client_key,
            "scope": ",".join(SCOPES),
            "response_type": "code",
            "redirect_uri": self.redirect_uri,
            "state": state,
            "code_challenge": code_challenge,
            "code_challenge_method": "S256",
        }
        url = TIKTOK_AUTH_URL + "?" + urllib.parse.urlencode(params)
        return url, code_verifier, state

    # ------------------------------------------------------------------
    # Step 2 – Exchange the auth code for tokens
    # ------------------------------------------------------------------
    def exchange_code(self, code: str, code_verifier: str) -> dict:
        """Return token payload from TikTok."""
        payload = {
            "client_key": self.client_key,
            "client_secret": self.client_secret,
            "code": code,
            "grant_type": "authorization_code",
            "redirect_uri": self.redirect_uri,
            "code_verifier": code_verifier,
        }
        resp = httpx.post(TIKTOK_TOKEN_URL, data=payload, timeout=30)
        resp.raise_for_status()
        data = resp.json()
        if data.get("error"):
            raise RuntimeError(f"Token exchange failed: {data}")
        return data

    # ------------------------------------------------------------------
    # Step 3 – Refresh an expiring access token
    # ------------------------------------------------------------------
    def refresh_token(self, refresh_token: str) -> dict:
        """Return a fresh token payload using the stored refresh_token."""
        payload = {
            "client_key": self.client_key,
            "client_secret": self.client_secret,
            "grant_type": "refresh_token",
            "refresh_token": refresh_token,
        }
        resp = httpx.post(TIKTOK_TOKEN_URL, data=payload, timeout=30)
        resp.raise_for_status()
        data = resp.json()
        if data.get("error"):
            raise RuntimeError(f"Token refresh failed: {data}")
        return data

    # ------------------------------------------------------------------
    # Helper – local callback server for OAuth redirect
    # ------------------------------------------------------------------
    def run_local_callback_server(self, expected_state: str, port: int = 8080) -> str:
        """
        Spin up a temporary HTTP server on localhost to capture the OAuth
        redirect and return the authorization code.
        """
        received = {}

        class Handler(BaseHTTPRequestHandler):
            def do_GET(self):
                parsed = urllib.parse.urlparse(self.path)
                params = dict(urllib.parse.parse_qsl(parsed.query))
                received["code"] = params.get("code")
                received["state"] = params.get("state")
                received["error"] = params.get("error")
                self.send_response(200)
                self.end_headers()
                self.wfile.write(b"<h2>Authorization successful! You can close this tab.</h2>")

            def log_message(self, *args):
                pass  # suppress server logs

        server = HTTPServer(("localhost", port), Handler)
        server.timeout = 120  # wait up to 2 minutes

        def serve():
            server.handle_request()

        t = Thread(target=serve, daemon=True)
        t.start()
        t.join(timeout=130)

        if received.get("error"):
            raise RuntimeError(f"OAuth error: {received['error']}")
        if received.get("state") != expected_state:
            raise RuntimeError("State mismatch — possible CSRF attack.")
        if not received.get("code"):
            raise TimeoutError("No authorization code received within 2 minutes.")

        return received["code"]
