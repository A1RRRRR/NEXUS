"""
Generate a single test video without posting it.
Use this to verify your video generation pipeline works.

Usage:
  python scripts/generate_test_video.py
  python scripts/generate_test_video.py --template motivational
"""

import os, sys, argparse
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from src.video.generator import create_video
from src.video.templates import get_random_script, list_templates
from src.utils import get_logger

logger = get_logger("generate_test_video")


def main():
    parser = argparse.ArgumentParser(description="Generate a test TikTok video")
    parser.add_argument("--template", choices=list_templates(), default=None,
                        help="Video template to use (default: random)")
    parser.add_argument("--output", default=None, help="Output filename")
    args = parser.parse_args()

    print(f"\nGenerating test video (template: {args.template or 'random'})...")
    script = get_random_script(args.template)
    print(f"  Title:    {script.title}")
    print(f"  Hashtags: {', '.join(script.hashtags)}")
    print(f"  Duration: ~{script.duration_hint}s")
    print()

    path = create_video(script=script, output_filename=args.output)
    print(f"\n✅ Video saved: {path}")
    print("   Open this file to verify the output looks correct.\n")


if __name__ == "__main__":
    main()
