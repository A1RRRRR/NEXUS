"""
Terminal dashboard for real-time monitoring.

Shows:
  - Today's posting progress vs target
  - Queue stats (pending / success / failed)
  - Per-account post counts
  - Recent job log
"""

import time
from datetime import date

from rich.console import Console
from rich.layout import Layout
from rich.live import Live
from rich.panel import Panel
from rich.progress import BarColumn, Progress, TextColumn
from rich.table import Table
from rich.text import Text

from src.accounts.manager import AccountManager
from src.queue.video_queue import VideoQueue
from src.utils import load_config

cfg = load_config()
POST_CFG = cfg["posting"]
console = Console()


def _make_header() -> Panel:
    today = date.today().strftime("%A, %B %d %Y")
    txt = Text(f"  NEXUS TikTok Automation  •  {today}  ", style="bold white on dark_blue")
    return Panel(txt, style="bold blue")


def _make_progress_panel(queue: VideoQueue) -> Panel:
    stats = queue.stats()
    success = stats.get("success", 0)
    failed  = stats.get("failed", 0)
    pending = stats.get("pending", 0) + stats.get("posting", 0)
    total   = success + failed + pending

    target_min = POST_CFG["daily_target_min"]
    target_max = POST_CFG["daily_target_max"]
    target_mid = (target_min + target_max) // 2

    progress = Progress(
        TextColumn("[bold blue]{task.description}"),
        BarColumn(bar_width=40),
        TextColumn("[bold green]{task.completed}/{task.total}"),
    )
    task = progress.add_task("Today's Posts", completed=success, total=target_mid)

    table = Table.grid(padding=(0, 2))
    table.add_column(style="bold")
    table.add_column()
    table.add_row("Target:", f"{target_min}–{target_max} videos")
    table.add_row("[green]Published:", str(success))
    table.add_row("[yellow]Pending:", str(pending))
    table.add_row("[red]Failed:", str(failed))
    table.add_row("Total queued:", str(total))

    from rich.columns import Columns
    content = Columns([progress, table])
    return Panel(content, title="[bold]Daily Progress", border_style="green")


def _make_accounts_table(account_mgr: AccountManager) -> Panel:
    table = Table(show_header=True, header_style="bold magenta")
    table.add_column("Account", style="cyan")
    table.add_column("Posts Today", justify="right")
    table.add_column("Cap", justify="right")
    table.add_column("Token", justify="center")

    for acct in account_mgr.get_all_active():
        today_posts = account_mgr.posts_today(acct.id)
        cap = POST_CFG["max_per_account_per_day"]
        token_ok = "✅" if not acct.is_token_expired() else "⚠️ expired"
        table.add_row(
            acct.username,
            str(today_posts),
            str(cap),
            token_ok,
        )

    return Panel(table, title="[bold]Accounts", border_style="magenta")


def _make_recent_jobs(queue: VideoQueue) -> Panel:
    table = Table(show_header=True, header_style="bold blue")
    table.add_column("ID", justify="right", style="dim")
    table.add_column("Title", max_width=40)
    table.add_column("Status", justify="center")
    table.add_column("Scheduled")

    for job in queue.recent_jobs(15):
        status_style = {
            "success": "[green]✓ success",
            "failed":  "[red]✗ failed",
            "pending": "[yellow]⏳ pending",
            "posting": "[blue]⬆ posting",
        }.get(job.status, job.status)
        table.add_row(
            str(job.id),
            job.title[:40],
            status_style,
            job.scheduled_at or "—",
        )

    return Panel(table, title="[bold]Recent Jobs", border_style="blue")


def run_dashboard(account_mgr: AccountManager, queue: VideoQueue, refresh: float = 5.0):
    """
    Run the live terminal dashboard. Refreshes every `refresh` seconds.
    Press Ctrl+C to exit.
    """
    layout = Layout()
    layout.split_column(
        Layout(name="header", size=3),
        Layout(name="middle", size=12),
        Layout(name="jobs"),
    )
    layout["middle"].split_row(
        Layout(name="progress"),
        Layout(name="accounts"),
    )

    def update():
        layout["header"].update(_make_header())
        layout["progress"].update(_make_progress_panel(queue))
        layout["accounts"].update(_make_accounts_table(account_mgr))
        layout["jobs"].update(_make_recent_jobs(queue))

    with Live(layout, refresh_per_second=1, screen=True, console=console):
        while True:
            try:
                update()
                time.sleep(refresh)
            except KeyboardInterrupt:
                break
