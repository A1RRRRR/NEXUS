#!/usr/bin/env python3
"""
NEXUS — TikTok Automation Engine

Commands:
  python main.py start       Start the full automation (scheduler + executor)
  python main.py dashboard   Show live monitoring dashboard
  python main.py status      Print today's stats and exit
"""

import os
import sys

import click
from dotenv import load_dotenv

load_dotenv()


@click.group()
def cli():
    """NEXUS TikTok automation engine."""
    pass


@cli.command()
def start():
    """Start the scheduler. Runs continuously (use tmux/screen/systemd)."""
    from src.accounts.manager import AccountManager
    from src.queue.video_queue import VideoQueue
    from src.scheduler.daily_scheduler import DailyScheduler
    from src.tiktok.auth import TikTokAuth
    from src.utils import get_logger

    logger = get_logger("main")

    client_key    = os.getenv("TIKTOK_CLIENT_KEY")
    client_secret = os.getenv("TIKTOK_CLIENT_SECRET")
    redirect_uri  = os.getenv("TIKTOK_REDIRECT_URI", "http://localhost:8080/callback")

    if not client_key or not client_secret:
        click.echo("[ERROR] TIKTOK_CLIENT_KEY and TIKTOK_CLIENT_SECRET must be set in .env")
        sys.exit(1)

    auth = TikTokAuth(client_key, client_secret, redirect_uri)
    mgr  = AccountManager()
    q    = VideoQueue()
    sch  = DailyScheduler(mgr, q, auth)

    accounts = mgr.get_all_active()
    if not accounts:
        click.echo("[ERROR] No TikTok accounts found. Add accounts first:")
        click.echo("  python scripts/add_account.py")
        sys.exit(1)

    click.echo(f"Starting NEXUS with {len(accounts)} account(s)...")
    click.echo("Press Ctrl+C to stop.\n")
    sch.start()


@cli.command()
def dashboard():
    """Launch the live monitoring dashboard."""
    from src.accounts.manager import AccountManager
    from src.monitor.dashboard import run_dashboard
    from src.queue.video_queue import VideoQueue

    run_dashboard(AccountManager(), VideoQueue())


@cli.command()
def status():
    """Print today's posting stats and exit."""
    from rich.console import Console
    from src.accounts.manager import AccountManager
    from src.queue.video_queue import VideoQueue

    console = Console()
    mgr = AccountManager()
    q   = VideoQueue()

    daily = mgr.daily_stats()
    queue = q.stats()

    console.print("\n[bold]NEXUS — Today's Status[/bold]")
    console.print(f"  Published : [green]{daily.get('success', 0)}[/green]")
    console.print(f"  Failed    : [red]{daily.get('failed', 0)}[/red]")
    console.print(f"  Pending   : [yellow]{queue.get('pending', 0)}[/yellow]")
    console.print(f"  Accounts  : {len(mgr.get_all_active())} active\n")


if __name__ == "__main__":
    cli()
