"""
Video script templates for AI-generated content.

Each template produces:
  - A spoken script (for TTS)
  - An on-screen text list
  - Suggested hashtags
  - A title / caption

Templates available:
  motivational | educational | listicle | facts | tips
"""

import random
from dataclasses import dataclass, field
from typing import Callable


@dataclass
class VideoScript:
    template: str
    title: str
    caption: str
    script_lines: list[str]  # narrated aloud
    display_lines: list[str]  # shown on screen (shorter)
    hashtags: list[str]
    bg_color: tuple[int, int, int] = (15, 15, 25)
    accent_color: tuple[int, int, int] = (255, 82, 120)
    duration_hint: int = 30  # target seconds


# ------------------------------------------------------------------
# Template data
# ------------------------------------------------------------------

MOTIVATIONAL_SCRIPTS = [
    {
        "title": "5 Habits of Highly Successful People",
        "caption": "Which habit will you start today? 👇",
        "lines": [
            ("They wake up early and own their morning.", "Wake up early"),
            ("They set clear, written goals every single day.", "Set daily goals"),
            ("They protect their energy by saying no.", "Say NO more"),
            ("They invest 1 hour daily in learning.", "Learn every day"),
            ("They review their progress every week.", "Weekly review"),
        ],
        "hashtags": ["success", "motivation", "habits", "mindset", "selfdevelopment"],
    },
    {
        "title": "Stop Wasting Time — Do This Instead",
        "caption": "Save this before you scroll past 🔖",
        "lines": [
            ("Delete social media from your phone for 30 days.", "Delete distractions"),
            ("Replace scrolling with reading 10 pages a day.", "Read 10 pages daily"),
            ("Wake up 1 hour earlier than everyone else.", "Wake up 1hr early"),
            ("Do your hardest task first thing in the morning.", "Eat the frog"),
            ("Track your time for one week — it will shock you.", "Track your time"),
        ],
        "hashtags": ["productivity", "timemanagement", "focus", "discipline", "growthmindset"],
    },
    {
        "title": "You Are Closer Than You Think",
        "caption": "Don't quit now 💪",
        "lines": [
            ("Most people quit right before the breakthrough.", "Never quit"),
            ("Every expert was once a complete beginner.", "Start anyway"),
            ("Consistency beats talent every single time.", "Stay consistent"),
            ("Your only competition is who you were yesterday.", "Beat yesterday"),
            ("One more day of effort could change everything.", "One more day"),
        ],
        "hashtags": ["nevergiveup", "motivation", "inspiration", "mindset", "success"],
    },
]

EDUCATIONAL_SCRIPTS = [
    {
        "title": "How Compound Interest Actually Works",
        "caption": "Einstein called it the 8th wonder of the world 🤯",
        "lines": [
            ("$100 invested at 10 percent grows to $17,449 in 50 years.", "$100 → $17K in 50yrs"),
            ("Doubling time = 72 divided by your interest rate.", "Rule of 72"),
            ("Starting at 20 vs 30 doubles your final wealth.", "Start NOW"),
            ("Consistency matters more than the amount you invest.", "Invest every month"),
            ("Time in the market beats timing the market.", "Stay invested"),
        ],
        "hashtags": ["finance", "investing", "compoundinterest", "money", "financialeducation"],
    },
    {
        "title": "The Science of Deep Sleep",
        "caption": "Sleep smarter, not longer 🧠",
        "lines": [
            ("Deep sleep repairs your body and consolidates memory.", "Deep sleep heals"),
            ("Avoid screens 90 minutes before bed — blue light kills melatonin.", "No screens"),
            ("Keep your room at 65-68°F for optimal sleep.", "Cool room = deep sleep"),
            ("Consistent sleep and wake times anchor your circadian rhythm.", "Same schedule daily"),
            ("Avoid caffeine after 2pm — it stays in your system 8 hours.", "Cut caffeine early"),
        ],
        "hashtags": ["sleep", "health", "science", "wellness", "brainhealth"],
    },
]

LISTICLE_SCRIPTS = [
    {
        "title": "5 Apps That Pay You Real Money",
        "caption": "I use all 5 of these 💰",
        "lines": [
            ("Fiverr — sell any skill, even if it's just typing.", "Fiverr"),
            ("Swagbucks — earn points for surveys and shopping.", "Swagbucks"),
            ("Upwork — freelance for top companies from home.", "Upwork"),
            ("Foap — sell your phone photos for up to $10 each.", "Foap"),
            ("TaskRabbit — get paid for everyday tasks near you.", "TaskRabbit"),
        ],
        "hashtags": ["makemoneyonline", "sidehustle", "apps", "passiveincome", "money"],
    },
    {
        "title": "5 Books That Changed My Life",
        "caption": "Comment which one you've read 👇",
        "lines": [
            ("Atomic Habits by James Clear — tiny changes, remarkable results.", "Atomic Habits"),
            ("The Psychology of Money — timeless lessons on wealth.", "Psychology of Money"),
            ("Deep Work by Cal Newport — rules for focused success.", "Deep Work"),
            ("Man's Search for Meaning — finding purpose in adversity.", "Man's Search for Meaning"),
            ("The 4-Hour Work Week — escape the 9-5 trap.", "4-Hour Work Week"),
        ],
        "hashtags": ["books", "reading", "selfdevelopment", "bookrecommendations", "reading"],
    },
]

FACTS_SCRIPTS = [
    {
        "title": "Mind-Blowing Psychology Facts",
        "caption": "Number 3 shocked me 😮",
        "lines": [
            ("Your brain can only focus deeply for about 90 minutes before needing a break.", "90-min focus limit"),
            ("People who write goals down are 42 percent more likely to achieve them.", "Write your goals"),
            ("Music synchronizes brain waves — the right playlist boosts IQ.", "Music = brain boost"),
            ("Smiling, even forced, reduces stress hormones within minutes.", "Force a smile"),
            ("Sleep deprivation has the same effect on decisions as being drunk.", "Sleep or suffer"),
        ],
        "hashtags": ["psychology", "mindblown", "facts", "brainfacts", "science"],
    },
]

TIPS_SCRIPTS = [
    {
        "title": "5 Life Hacks You Wish You Knew Sooner",
        "caption": "Save this — thank me later 📌",
        "lines": [
            ("Charge your phone to 80 percent, not 100. It doubles battery lifespan.", "80% charge rule"),
            ("Put your phone face-down during meals. Focus jumps 40 percent.", "Phone face-down"),
            ("Drink 500ml of water right after waking — rehydrates and boosts metabolism.", "Morning water"),
            ("Use the 2-minute rule: if it takes under 2 minutes, do it now.", "2-minute rule"),
            ("Write tomorrow's top 3 tasks tonight to sleep better.", "Plan tonight"),
        ],
        "hashtags": ["lifehacks", "tips", "productivity", "hacks", "viral"],
    },
]

# ------------------------------------------------------------------
# Template registry
# ------------------------------------------------------------------

_TEMPLATE_MAP: dict[str, list[dict]] = {
    "motivational": MOTIVATIONAL_SCRIPTS,
    "educational": EDUCATIONAL_SCRIPTS,
    "listicle": LISTICLE_SCRIPTS,
    "facts": FACTS_SCRIPTS,
    "tips": TIPS_SCRIPTS,
}

# Default color schemes per template
_COLORS: dict[str, tuple] = {
    "motivational": ((10, 10, 20), (255, 82, 120)),
    "educational":  ((5, 20, 40), (0, 180, 255)),
    "listicle":     ((20, 10, 5), (255, 160, 0)),
    "facts":        ((5, 25, 10), (0, 220, 100)),
    "tips":         ((25, 5, 25), (200, 0, 255)),
}


def get_random_script(template: str | None = None) -> VideoScript:
    """Return a random VideoScript, optionally from a specific template."""
    if template is None:
        template = random.choice(list(_TEMPLATE_MAP.keys()))

    pool = _TEMPLATE_MAP.get(template, MOTIVATIONAL_SCRIPTS)
    raw = random.choice(pool)
    bg, accent = _COLORS.get(template, ((15, 15, 25), (255, 82, 120)))

    script_lines = [line for line, _ in raw["lines"]]
    display_lines = [short for _, short in raw["lines"]]

    return VideoScript(
        template=template,
        title=raw["title"],
        caption=raw["caption"],
        script_lines=script_lines,
        display_lines=display_lines,
        hashtags=raw["hashtags"],
        bg_color=bg,
        accent_color=accent,
        duration_hint=len(raw["lines"]) * 8,  # ~8s per bullet
    )


def list_templates() -> list[str]:
    return list(_TEMPLATE_MAP.keys())
