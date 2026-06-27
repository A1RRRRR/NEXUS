# NEXUS — TikTok Automation Engine

Post **150–350 professional AI-generated TikTok videos per day** automatically
across multiple accounts.

---

## What It Does

- **Generates professional videos** using templates, text-to-speech narration, and animated graphics — no manual editing required
- **Schedules posts** spread evenly across the day (6am–11pm) across all your accounts
- **Manages multiple TikTok accounts** with automatic token refresh
- **Retries failures** automatically with exponential backoff
- **Live dashboard** to monitor posting progress in real time

---

## Quick Start

### Step 1 — Install dependencies

```bash
pip install -r requirements.txt
```

> Requires Python 3.11+ and FFmpeg (`sudo apt install ffmpeg` on Ubuntu)

### Step 2 — Configure credentials

```bash
cp .env.example .env
# Edit .env with your TikTok API keys
```

See **[docs/TIKTOK_SETUP.md](docs/TIKTOK_SETUP.md)** for getting TikTok developer credentials.

### Step 3 — Add posting accounts

Run once per TikTok account:

```bash
python scripts/add_account.py
```

To reach 150–350 posts/day you need **30–70 accounts** (5 posts/account/day).

### Step 4 — Test video generation

```bash
python scripts/generate_test_video.py
# Opens data/generated/video_*.mp4
```

### Step 5 — Start the engine

```bash
python main.py start
```

The scheduler runs continuously. Use `tmux`, `screen`, or `systemd` to keep it alive.

---

## Commands

| Command | Description |
|---|---|
| `python main.py start` | Start the automation engine |
| `python main.py dashboard` | Live terminal monitoring dashboard |
| `python main.py status` | Print today's stats and exit |
| `python scripts/add_account.py` | Authorize a new TikTok account |
| `python scripts/list_accounts.py` | Show all accounts + daily counts |
| `python scripts/generate_test_video.py` | Generate one test video |
| `python scripts/run_daily.py` | Manually trigger today's plan |
| `python scripts/run_daily.py --plan-only` | Queue jobs without posting |

---

## Configuration

Edit `config.yaml` to adjust:

```yaml
posting:
  daily_target_min: 150      # Minimum videos per day
  daily_target_max: 350      # Maximum videos per day
  max_per_account_per_day: 5 # Per-account limit (TikTok safety)
  posting_window_start: "06:00"
  posting_window_end: "23:00"

templates:
  active:
    - motivational
    - educational
    - listicle
    - facts
    - tips

video:
  tts_engine: "gtts"         # "gtts" (free) or "elevenlabs" (higher quality)
```

---

## Video Templates

NEXUS ships with 5 professional template categories:

| Template | Style | Example |
|---|---|---|
| `motivational` | Dark bg, red accent | "5 Habits of Highly Successful People" |
| `educational` | Navy bg, blue accent | "How Compound Interest Actually Works" |
| `listicle` | Dark orange, warm | "5 Apps That Pay You Real Money" |
| `facts` | Dark green, bright | "Mind-Blowing Psychology Facts" |
| `tips` | Dark purple, violet | "5 Life Hacks You Wish You Knew Sooner" |

Each template generates a unique video with:
- Animated bullet point reveal
- AI-narrated voiceover (gTTS or ElevenLabs)
- Branded watermark
- Progress bar
- Auto-generated hashtags

---

## Architecture

```
NEXUS/
├── main.py                  CLI entry point
├── config.yaml              All settings
├── src/
│   ├── tiktok/
│   │   ├── auth.py          OAuth 2.0 + PKCE flow
│   │   └── api_client.py    Chunked video upload + publish
│   ├── video/
│   │   ├── generator.py     Frame rendering + audio + MoviePy
│   │   └── templates.py     Script templates (5 categories)
│   ├── accounts/
│   │   └── manager.py       Multi-account SQLite store + token refresh
│   ├── queue/
│   │   └── video_queue.py   SQLite job queue (pending→posting→success/failed)
│   ├── scheduler/
│   │   └── daily_scheduler.py  APScheduler — plan day + execute jobs
│   └── monitor/
│       └── dashboard.py     Rich terminal dashboard
├── scripts/
│   ├── add_account.py       One-time per-account OAuth flow
│   ├── list_accounts.py     Show all accounts
│   ├── generate_test_video.py  Test video generation
│   └── run_daily.py         Manual posting trigger
└── docs/
    └── TIKTOK_SETUP.md      Step-by-step TikTok API setup
```

---

## Scaling to 150–350 Videos/Day

| Stage | What you need |
|---|---|
| TikTok developer app | 1 app (applies to all accounts) |
| Posting accounts | 30–70 accounts |
| Server | Any Linux VPS (1 CPU, 2GB RAM is enough) |
| Storage | ~50MB per video × 350 = ~17GB/day (delete after posting) |
| Time to set up | ~2 hours for first account, ~5 min per additional account |

---

## Important Notes

- **TikTok ToS**: Automation must comply with TikTok's Terms of Service. Use unique, original content and avoid spam-like behavior. NEXUS generates unique videos from templates to maximize compliance.
- **Account safety**: NEXUS enforces a 5-video/day/account limit and 10-minute gaps between posts on the same account to avoid flags.
- **Video uniqueness**: Each generated video is unique — different script, colors, timing, and slight visual variations.
