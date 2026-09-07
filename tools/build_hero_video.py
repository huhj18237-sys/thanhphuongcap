"""Build a looping craft-story hero film for Thành Phương Cap."""

from __future__ import annotations

import math
import subprocess
from pathlib import Path

import imageio_ffmpeg
import numpy as np
from PIL import Image, ImageDraw, ImageEnhance, ImageFilter


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "assets" / "hero-showcase.mp4"
WIDTH, HEIGHT = 960, 720
FPS = 24
HOLD_FRAMES = 60
TRANSITION_FRAMES = 24
SCENE_FRAMES = HOLD_FRAMES + TRANSITION_FRAMES

SCENES = [
    ("video-scenes/01-embroidery.jpg", (-0.08, 0.03), 0.065),
    ("video-scenes/02-craft.jpg", (0.08, -0.04), 0.050),
    ("video-scenes/03-construction.jpg", (-0.06, 0.04), 0.055),
    ("video-scenes/04-packaging.jpg", (0.06, -0.03), 0.048),
]


def smooth(value: float) -> float:
    return value * value * (3.0 - 2.0 * value)


def prepare_image(path: Path) -> Image.Image:
    image = Image.open(path).convert("RGB")
    image = ImageEnhance.Color(image).enhance(1.05)
    return ImageEnhance.Contrast(image).enhance(1.06)


def render_scene(image: Image.Image, progress: float, pan: tuple[float, float], zoom_amount: float) -> np.ndarray:
    progress = max(0.0, min(1.0, progress))
    easing = smooth(progress)
    base_scale = max(WIDTH / image.width, HEIGHT / image.height)
    scale = base_scale * (1.025 + zoom_amount * easing)
    new_size = (math.ceil(image.width * scale), math.ceil(image.height * scale))
    resized = image.resize(new_size, Image.Resampling.LANCZOS)

    overflow_x = max(0, resized.width - WIDTH)
    overflow_y = max(0, resized.height - HEIGHT)
    center_x = overflow_x / 2
    center_y = overflow_y / 2
    wave = math.sin(easing * math.pi)
    crop_x = center_x + pan[0] * overflow_x * wave
    crop_y = center_y + pan[1] * overflow_y * wave
    crop_x = int(max(0, min(overflow_x, crop_x)))
    crop_y = int(max(0, min(overflow_y, crop_y)))
    frame = resized.crop((crop_x, crop_y, crop_x + WIDTH, crop_y + HEIGHT))
    return np.asarray(frame, dtype=np.float32)


def grade(frame: np.ndarray, frame_number: int, total_frames: int) -> np.ndarray:
    yy, xx = np.mgrid[0:HEIGHT, 0:WIDTH]
    nx = xx / WIDTH
    ny = yy / HEIGHT

    vignette = 1.0 - 0.18 * np.clip(((nx - 0.5) ** 2 + (ny - 0.5) ** 2) / 0.5, 0, 1)
    frame *= vignette[..., None]

    cycle = frame_number / total_frames
    light_center = -0.35 + 1.7 * cycle
    diagonal = nx * 0.82 + ny * 0.18
    light = np.exp(-((diagonal - light_center) / 0.10) ** 2) * 18.0
    frame += light[..., None] * np.array([1.0, 0.83, 0.60], dtype=np.float32)

    return np.clip(frame, 0, 255).astype(np.uint8)


def diagonal_story_wipe(current: np.ndarray, upcoming: np.ndarray, progress: float, reverse: bool) -> np.ndarray:
    """Reveal the next chapter with a soft diagonal editorial wipe."""
    yy, xx = np.mgrid[0:HEIGHT, 0:WIDTH]
    diagonal = (xx / WIDTH) * 0.82 + (yy / HEIGHT) * 0.18
    if reverse:
        diagonal = 1.0 - diagonal
    edge = -0.12 + progress * 1.24
    feather = 0.09
    mask = np.clip((edge - diagonal + feather) / feather, 0.0, 1.0)
    return current * (1.0 - mask[..., None]) + upcoming * mask[..., None]


def add_signature_thread(frame: np.ndarray, frame_number: int, total_frames: int) -> np.ndarray:
    """Run one subtle champagne thread through every scene to unify the story."""
    base = Image.fromarray(frame).convert("RGBA")
    glow = Image.new("RGBA", base.size, (0, 0, 0, 0))
    sharp = Image.new("RGBA", base.size, (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow)
    sharp_draw = ImageDraw.Draw(sharp)

    points: list[tuple[int, int]] = []
    for x in range(-80, WIDTH + 81, 5):
        normalized = (x + 80) / (WIDTH + 160)
        y = HEIGHT * (0.76 - 0.13 * math.sin(normalized * math.pi * 2.0 + 0.45))
        y += HEIGHT * 0.035 * math.sin(normalized * math.pi * 5.0)
        points.append((x, int(y)))

    phase = frame_number / max(1, total_frames - 1)
    head = max(2, min(len(points), int((phase * 1.16) * len(points))))
    trail_start = max(0, head - int(len(points) * 0.34))
    trail = points[trail_start:head]
    if len(trail) > 1:
        glow_draw.line(trail, fill=(246, 203, 120, 115), width=12)
        sharp_draw.line(trail, fill=(255, 226, 164, 178), width=2)
        x, y = trail[-1]
        glow_draw.ellipse((x - 18, y - 18, x + 18, y + 18), fill=(255, 211, 124, 125))
        sharp_draw.ellipse((x - 3, y - 3, x + 3, y + 3), fill=(255, 245, 214, 235))

    glow = glow.filter(ImageFilter.GaussianBlur(8))
    return np.asarray(Image.alpha_composite(Image.alpha_composite(base, glow), sharp).convert("RGB"))


def main() -> None:
    images = [prepare_image(ROOT / "assets" / scene[0]) for scene in SCENES]
    total_frames = len(SCENES) * SCENE_FRAMES
    ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
    command = [
        ffmpeg,
        "-y",
        "-f", "rawvideo",
        "-vcodec", "rawvideo",
        "-pix_fmt", "rgb24",
        "-s", f"{WIDTH}x{HEIGHT}",
        "-r", str(FPS),
        "-i", "-",
        "-an",
        "-c:v", "libx264",
        "-preset", "medium",
        "-crf", "22",
        "-pix_fmt", "yuv420p",
        "-movflags", "+faststart",
        str(OUTPUT),
    ]

    process = subprocess.Popen(command, stdin=subprocess.PIPE)
    assert process.stdin is not None

    for frame_number in range(total_frames):
        scene_index = frame_number // SCENE_FRAMES
        local_frame = frame_number % SCENE_FRAMES
        image, pan, zoom = images[scene_index], SCENES[scene_index][1], SCENES[scene_index][2]
        current_progress = local_frame / max(1, SCENE_FRAMES - 1)
        frame = render_scene(image, current_progress, pan, zoom)

        if local_frame >= HOLD_FRAMES:
            blend_progress = smooth((local_frame - HOLD_FRAMES) / max(1, TRANSITION_FRAMES - 1))
            next_index = (scene_index + 1) % len(SCENES)
            next_image, next_pan, next_zoom = images[next_index], SCENES[next_index][1], SCENES[next_index][2]
            next_frame = render_scene(next_image, blend_progress * 0.08, next_pan, next_zoom)
            frame = diagonal_story_wipe(frame, next_frame, blend_progress, scene_index % 2 == 1)

        frame = grade(frame, frame_number, total_frames)
        frame = add_signature_thread(frame, frame_number, total_frames)
        process.stdin.write(frame.tobytes())

    process.stdin.close()
    return_code = process.wait()
    if return_code != 0:
        raise SystemExit(return_code)
    print(f"Created {OUTPUT} ({OUTPUT.stat().st_size / 1024 / 1024:.2f} MB)")


if __name__ == "__main__":
    main()
