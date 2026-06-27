"""
AI Video Generator.

Creates short-form vertical videos (1080x1920) using:
  - Pillow: background, text rendering, animated frames
  - gTTS / ElevenLabs: narration audio
  - MoviePy: compositing frames + audio into MP4
  - Optional: background music from local royalty-free tracks

Each video follows a template from templates.py.
"""

import os
import random
import tempfile
import time
from io import BytesIO
from pathlib import Path
from typing import Optional

import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter

from src.video.templates import VideoScript, get_random_script
from src.utils import get_logger, load_config

logger = get_logger(__name__)
cfg = load_config()

VIDEO_CFG = cfg["video"]
W, H = map(int, VIDEO_CFG["resolution"].split("x"))
FPS = VIDEO_CFG["fps"]
OUTPUT_DIR = Path(VIDEO_CFG["output_dir"])
TEMP_DIR = Path(VIDEO_CFG.get("temp_dir", "data/temp"))

OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
TEMP_DIR.mkdir(parents=True, exist_ok=True)

# Font sizes for portrait video
FONT_TITLE_SIZE = 72
FONT_BODY_SIZE  = 58
FONT_NUM_SIZE   = 90
FONT_BRAND_SIZE = 36


def _get_font(size: int) -> ImageFont.FreeTypeFont:
    """Try system fonts; fall back to PIL default."""
    candidates = [
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
        "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf",
        "/usr/share/fonts/truetype/ubuntu/Ubuntu-B.ttf",
        "/System/Library/Fonts/Helvetica.ttc",
        "C:/Windows/Fonts/arialbd.ttf",
    ]
    for path in candidates:
        if Path(path).exists():
            return ImageFont.truetype(path, size)
    return ImageFont.load_default()


def _draw_rounded_rect(draw: ImageDraw.Draw, xy, radius: int, fill):
    x0, y0, x1, y1 = xy
    draw.rectangle([x0 + radius, y0, x1 - radius, y1], fill=fill)
    draw.rectangle([x0, y0 + radius, x1, y1 - radius], fill=fill)
    draw.ellipse([x0, y0, x0 + 2*radius, y0 + 2*radius], fill=fill)
    draw.ellipse([x1 - 2*radius, y0, x1, y0 + 2*radius], fill=fill)
    draw.ellipse([x0, y1 - 2*radius, x0 + 2*radius, y1], fill=fill)
    draw.ellipse([x1 - 2*radius, y1 - 2*radius, x1, y1], fill=fill)


def _make_gradient_bg(color: tuple[int,int,int]) -> Image.Image:
    """Create a vertical gradient background from dark to slightly lighter."""
    img = Image.new("RGB", (W, H), color)
    draw = ImageDraw.Draw(img)
    r, g, b = color
    for y in range(H):
        factor = y / H * 0.4
        rc = min(255, int(r + (255 - r) * factor * 0.15))
        gc = min(255, int(g + (255 - g) * factor * 0.15))
        bc = min(255, int(b + (255 - b) * factor * 0.15))
        draw.line([(0, y), (W, y)], fill=(rc, gc, bc))
    return img


def _add_noise(img: Image.Image, amount: int = 8) -> Image.Image:
    """Add subtle film grain."""
    arr = np.array(img, dtype=np.int16)
    noise = np.random.randint(-amount, amount, arr.shape, dtype=np.int16)
    arr = np.clip(arr + noise, 0, 255).astype(np.uint8)
    return Image.fromarray(arr)


def _wrap_text(text: str, font: ImageFont.FreeTypeFont, max_width: int) -> list[str]:
    words = text.split()
    lines, current = [], ""
    for word in words:
        test = f"{current} {word}".strip()
        bbox = font.getbbox(test)
        if bbox[2] - bbox[0] <= max_width:
            current = test
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines


def generate_frame(
    script: VideoScript,
    revealed_count: int,
    total: int,
    progress: float = 0.0,
) -> Image.Image:
    """
    Render a single video frame.

    revealed_count: how many bullet points are visible (0 = title only)
    progress: 0.0 – 1.0 (used for subtle animation)
    """
    img = _make_gradient_bg(script.bg_color)
    draw = ImageDraw.Draw(img)

    accent = script.accent_color
    white  = (255, 255, 255)
    gray   = (180, 180, 180)

    font_title = _get_font(FONT_TITLE_SIZE)
    font_body  = _get_font(FONT_BODY_SIZE)
    font_num   = _get_font(FONT_NUM_SIZE)
    font_brand = _get_font(FONT_BRAND_SIZE)

    # Top accent bar
    bar_h = 12
    draw.rectangle([(0, 0), (W, bar_h)], fill=accent)

    # Brand watermark (top right)
    brand = "@nexus.daily"
    bbox = font_brand.getbbox(brand)
    bw = bbox[2] - bbox[0]
    draw.text((W - bw - 30, 30), brand, font=font_brand, fill=(*accent, 200))

    # Title block
    title_y = 100
    title_lines = _wrap_text(script.title, font_title, W - 80)
    for line in title_lines:
        bbox = font_title.getbbox(line)
        lw = bbox[2] - bbox[0]
        draw.text(((W - lw) // 2, title_y), line, font=font_title, fill=white)
        title_y += bbox[3] - bbox[1] + 12

    # Divider
    title_y += 20
    draw.rectangle([(60, title_y), (W - 60, title_y + 4)], fill=accent)
    title_y += 30

    # Bullet points
    bullet_y = title_y
    for i, point in enumerate(script.display_lines[:revealed_count]):
        is_latest = (i == revealed_count - 1)

        # Number pill
        num_str = str(i + 1)
        pill_x, pill_y = 50, bullet_y
        pill_r = 40
        pill_color = accent if is_latest else (60, 60, 80)
        _draw_rounded_rect(draw, (pill_x, pill_y, pill_x + 80, pill_y + 80), 20, pill_color)

        nb = font_num.getbbox(num_str)
        nx = pill_x + (80 - (nb[2] - nb[0])) // 2
        ny = pill_y + (80 - (nb[3] - nb[1])) // 2
        draw.text((nx, ny), num_str, font=font_num, fill=white)

        # Point text
        point_x = pill_x + 100
        point_lines = _wrap_text(point, font_body, W - point_x - 40)
        text_y = bullet_y + (80 - (len(point_lines) * (FONT_BODY_SIZE + 8))) // 2
        for pl in point_lines:
            txt_color = white if is_latest else gray
            draw.text((point_x, text_y), pl, font=font_body, fill=txt_color)
            text_y += FONT_BODY_SIZE + 8

        bullet_y += 110

    # Progress bar at bottom
    bar_y = H - 20
    draw.rectangle([(0, bar_y), (W, H)], fill=(30, 30, 40))
    prog_w = int(W * max(0.02, progress))
    draw.rectangle([(0, bar_y), (prog_w, H)], fill=accent)

    # CTA at very bottom
    if revealed_count >= total:
        cta = "Follow for more! 🔥"
        cb = font_brand.getbbox(cta)
        cw = cb[2] - cb[0]
        draw.text(((W - cw) // 2, bar_y - 50), cta, font=font_brand, fill=accent)

    return _add_noise(img)


def generate_audio(script: VideoScript, output_path: str) -> str:
    """Generate TTS narration. Returns path to WAV/MP3 file."""
    full_text = script.title + ". " + ". ".join(script.script_lines)

    tts_engine = VIDEO_CFG.get("tts_engine", "gtts")

    if tts_engine == "elevenlabs":
        return _elevenlabs_tts(full_text, output_path)
    else:
        return _gtts_tts(full_text, output_path)


def _gtts_tts(text: str, output_path: str) -> str:
    from gtts import gTTS
    tts = gTTS(text=text, lang=VIDEO_CFG.get("tts_language", "en"), slow=False)
    tts.save(output_path)
    return output_path


def _elevenlabs_tts(text: str, output_path: str) -> str:
    import httpx, os
    api_key = os.getenv("ELEVENLABS_API_KEY", "")
    if not api_key:
        logger.warning("ELEVENLABS_API_KEY not set, falling back to gTTS")
        return _gtts_tts(text, output_path)

    voice_id = "21m00Tcm4TlvDq8ikWAM"  # Rachel (natural, professional)
    resp = httpx.post(
        f"https://api.elevenlabs.io/v1/text-to-speech/{voice_id}",
        headers={"xi-api-key": api_key, "Content-Type": "application/json"},
        json={
            "text": text,
            "model_id": "eleven_monolingual_v1",
            "voice_settings": {"stability": 0.5, "similarity_boost": 0.75},
        },
        timeout=60,
    )
    resp.raise_for_status()
    with open(output_path, "wb") as f:
        f.write(resp.content)
    return output_path


def create_video(
    script: VideoScript | None = None,
    template: str | None = None,
    output_filename: str | None = None,
) -> str:
    """
    Generate a complete MP4 video from a script (or random template).

    Returns the path to the generated video file.
    """
    # Defer heavy imports to avoid slow startup
    from moviepy.editor import (
        AudioFileClip,
        CompositeVideoClip,
        ImageSequenceClip,
    )

    if script is None:
        script = get_random_script(template)

    if output_filename is None:
        ts = int(time.time() * 1000)
        output_filename = f"video_{script.template}_{ts}.mp4"

    output_path = str(OUTPUT_DIR / output_filename)

    n_points = len(script.display_lines)
    # Each bullet: hold_frames static + reveal_frames transition
    hold_frames   = FPS * 5   # 5 seconds per bullet
    reveal_frames = FPS // 2  # 0.5 second reveal

    frames = []
    frame_count = 0
    total_frames = n_points * (hold_frames + reveal_frames) + FPS * 2  # +2s intro

    # Intro frames (title only)
    for i in range(FPS * 2):
        progress = frame_count / total_frames
        frame = generate_frame(script, 0, n_points, progress)
        frames.append(np.array(frame))
        frame_count += 1

    # Reveal each bullet
    for bullet_idx in range(1, n_points + 1):
        # Quick reveal animation
        for rf in range(reveal_frames):
            progress = frame_count / total_frames
            frame = generate_frame(script, bullet_idx, n_points, progress)
            frames.append(np.array(frame))
            frame_count += 1
        # Hold
        for hf in range(hold_frames):
            progress = frame_count / total_frames
            frame = generate_frame(script, bullet_idx, n_points, progress)
            frames.append(np.array(frame))
            frame_count += 1

    logger.info("Rendering %d frames for '%s'", len(frames), script.title)

    # Generate audio
    audio_path = str(TEMP_DIR / f"audio_{int(time.time()*1000)}.mp3")
    try:
        generate_audio(script, audio_path)
        has_audio = True
    except Exception as e:
        logger.warning("TTS failed (%s), video will be silent.", e)
        has_audio = False

    # Compose video
    clip = ImageSequenceClip(frames, fps=FPS)

    if has_audio and Path(audio_path).exists():
        audio_clip = AudioFileClip(audio_path)
        # Loop or trim audio to match video length
        if audio_clip.duration < clip.duration:
            from moviepy.audio.fx.all import audio_loop
            audio_clip = audio_loop(audio_clip, duration=clip.duration)
        else:
            audio_clip = audio_clip.subclip(0, clip.duration)
        clip = clip.set_audio(audio_clip)

    clip.write_videofile(
        output_path,
        fps=FPS,
        codec="libx264",
        audio_codec="aac",
        temp_audiofile=str(TEMP_DIR / "temp_audio.m4a"),
        remove_temp=True,
        logger=None,
        preset="fast",
    )

    # Cleanup temp audio
    if has_audio and Path(audio_path).exists():
        Path(audio_path).unlink(missing_ok=True)

    logger.info("Video saved: %s", output_path)
    return output_path


def batch_generate(count: int, template: str | None = None) -> list[str]:
    """Generate `count` videos and return their paths."""
    paths = []
    for i in range(count):
        logger.info("Generating video %d/%d", i + 1, count)
        try:
            path = create_video(template=template)
            paths.append(path)
        except Exception as exc:
            logger.error("Video %d generation failed: %s", i + 1, exc)
    return paths
