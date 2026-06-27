"""
Batch account setup — loop until you say stop.
Run this to add all your accounts in one session.

Usage:
  python scripts/add_account_batch.py
"""

import os, sys
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from dotenv import load_dotenv
load_dotenv()

import webbrowser
from rich.console import Console
from src.tiktok.auth import TikTokAuth
from src.accounts.manager import AccountManager

console = Console()

def main():
    client_key    = os.getenv("TIKTOK_CLIENT_KEY")
    client_secret = os.getenv("TIKTOK_CLIENT_SECRET")
    redirect_uri  = os.getenv("TIKTOK_REDIRECT_URI", "http://localhost:8080/callback")

    if not client_key or not client_secret:
        console.print("[red]Set TIKTOK_CLIENT_KEY and TIKTOK_CLIENT_SECRET in .env first.[/red]")
        console.print("See docs/TIKTOK_SETUP.md")
        sys.exit(1)

    auth = TikTokAuth(client_key, client_secret, redirect_uri)
    mgr  = AccountManager()

    console.print("\n[bold blue]NEXUS — Batch Account Setup[/bold blue]")
    console.print("Add as many accounts as you want. Press Ctrl+C when done.\n")

    added = 0
    while True:
        existing = mgr.get_all_active()
        max_cap  = len(existing) * 5
        console.print(f"[dim]Current accounts: {len(existing)} ({max_cap} posts/day capacity)[/dim]")

        username = console.input("[bold]Account label (e.g. @username): [/bold]").strip()
        if not username:
            continue

        auth_url, code_verifier, state = auth.get_auth_url()
        console.print(f"\n[yellow]Opening TikTok login in browser...[/yellow]")
        console.print(f"[dim]{auth_url}[/dim]\n")
        webbrowser.open(auth_url)
        console.print("[dim]Waiting for authorization (up to 2 minutes)...[/dim]")

        try:
            code = auth.run_local_callback_server(state, port=8080)
            token_data = auth.exchange_code(code, code_verifier)
            acct_id = mgr.add_account(username, token_data)
            added += 1
            console.print(f"[green]✓ '{username}' added (ID: {acct_id})[/green]\n")
        except TimeoutError:
            console.print("[red]Timed out. Try again.[/red]\n")
        except Exception as e:
            console.print(f"[red]Error: {e}[/red]\n")

        all_accounts = mgr.get_all_active()
        cap = len(all_accounts) * 5
        console.print(f"[bold]Total accounts: {len(all_accounts)} → up to {cap} posts/day[/bold]")

        if cap >= 350:
            console.print(f"[green bold]You have enough accounts for 350 posts/day![/green bold]")

        answer = console.input("\nAdd another account? (y/n): ").strip().lower()
        if answer != "y":
            break

    console.print(f"\n[bold green]Done! Added {added} accounts this session.[/bold green]")
    console.print("Start the engine with: [bold]python main.py start[/bold]\n")


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        console = Console()
        console.print("\n[yellow]Stopped.[/yellow]")
