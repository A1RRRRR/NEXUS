"""
Interactive script to authorize a new TikTok account.

Run once per account:
  python scripts/add_account.py

The script will:
  1. Open a browser to the TikTok OAuth page
  2. Start a local callback server (port 8080)
  3. Exchange the authorization code for tokens
  4. Store credentials in the database
"""

import os
import sys
import webbrowser

sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from dotenv import load_dotenv
load_dotenv()

from src.tiktok.auth import TikTokAuth
from src.accounts.manager import AccountManager
from src.utils import get_logger

logger = get_logger("add_account")


def main():
    client_key    = os.getenv("TIKTOK_CLIENT_KEY")
    client_secret = os.getenv("TIKTOK_CLIENT_SECRET")
    redirect_uri  = os.getenv("TIKTOK_REDIRECT_URI", "http://localhost:8080/callback")

    if not client_key or not client_secret:
        print("\n[ERROR] Set TIKTOK_CLIENT_KEY and TIKTOK_CLIENT_SECRET in your .env file first.")
        print("See docs/TIKTOK_SETUP.md for instructions.\n")
        sys.exit(1)

    auth = TikTokAuth(client_key, client_secret, redirect_uri)
    mgr  = AccountManager()

    print("\n" + "="*60)
    print("  NEXUS — Add TikTok Account")
    print("="*60)
    username = input("Enter a label for this account (e.g. @myusername): ").strip()
    if not username:
        print("Username is required.")
        sys.exit(1)

    auth_url, code_verifier, state = auth.get_auth_url()

    print(f"\n1. Opening TikTok authorization page in your browser...")
    print(f"   If it doesn't open, paste this URL manually:\n   {auth_url}\n")
    webbrowser.open(auth_url)

    print("2. Authorize the app in TikTok, then wait for the redirect...")

    try:
        code = auth.run_local_callback_server(state, port=8080)
        print("3. Authorization code received! Exchanging for tokens...")
    except TimeoutError:
        print("[ERROR] Timed out waiting for authorization. Please try again.")
        sys.exit(1)

    token_data = auth.exchange_code(code, code_verifier)
    acct_id = mgr.add_account(username, token_data)

    print(f"\n✅ Account '{username}' added successfully! (ID: {acct_id})")
    print(f"   Active accounts: {len(mgr.get_all_active())}")
    print("\nRun `python scripts/add_account.py` again to add more accounts.\n")


if __name__ == "__main__":
    main()
