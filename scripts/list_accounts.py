"""List all registered TikTok accounts and today's post counts."""

import os, sys
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from rich.console import Console
from rich.table import Table
from src.accounts.manager import AccountManager

console = Console()

def main():
    mgr = AccountManager()
    accounts = mgr.get_all_active()
    if not accounts:
        console.print("[yellow]No accounts found. Run: python scripts/add_account.py[/yellow]")
        return

    table = Table(title="Registered TikTok Accounts")
    table.add_column("ID", justify="right")
    table.add_column("Username", style="cyan")
    table.add_column("Open ID", style="dim")
    table.add_column("Posts Today", justify="right")
    table.add_column("Token Status", justify="center")

    for a in accounts:
        today = mgr.posts_today(a.id)
        token = "[green]Valid" if not a.is_token_expired() else "[red]Expired"
        table.add_row(str(a.id), a.username, a.open_id[:16]+"…", str(today), token)

    console.print(table)
    console.print(f"\nTotal active accounts: [bold]{len(accounts)}[/bold]")
    max_cap = len(accounts) * 5
    console.print(f"Max posts/day with these accounts: [bold]{max_cap}[/bold]")
    console.print(f"  (Need {150//5} accounts for 150/day, {350//5} for 350/day)\n")

if __name__ == "__main__":
    main()
