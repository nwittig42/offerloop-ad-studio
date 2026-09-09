#!/usr/bin/env python
"""Key a bright subject off a black plate into straight-alpha RGBA frames.

Built for the Higgsfield character clips that come back on a solid black
background (the yeti rave dance was the first). Run it on a directory of RGB
PNG frames exported by ffmpeg; it writes RGBA PNGs alongside, which ffmpeg
then encodes to an alpha WebM (Remotion) and ProRes 4444 (editors).

Why not do this entirely in ffmpeg: a blur-and-threshold "fill" cannot close a
hole that sits near the silhouette edge, because the blur neighbourhood pulls
in real background. This does the correct thing instead - flood fill the
background inward from the frame border, and treat every dark region the flood
never reaches as an interior hole to force opaque. That keeps dark pupils,
claws and the gap under a fist solid while leaving genuine gaps (between the
legs, arm to torso) transparent.

Usage:
  key-alpha.py <frames_dir> [--lo 40] [--hi 70]

  lo/hi  luma ramp in 0-255. At or below lo is fully transparent, at or above
         hi fully opaque, linear between. lo must sit above the brightest
         plate pixel (measure it - a "black" render often carries a faint
         floor; the yeti plate topped out at 39).
"""
import sys
from pathlib import Path

from PIL import Image, ImageChops, ImageDraw, ImageMath

BG_MARK = 1  # scratch value the flood uses to mark reachable background


def alpha_for(luma: Image.Image, lo: int, hi: int) -> Image.Image:
    """Straight-alpha channel for one frame's luma."""
    # Soft ramp: keeps wispy fur edges as partial alpha instead of aliasing them.
    span = max(1, hi - lo)
    ramp = luma.point(
        lambda v: 0 if v <= lo else (255 if v >= hi else int((v - lo) * 255 / span))
    )

    # Hard silhouette for the flood, thresholded at hi rather than lo: only
    # fully-opaque pixels count as subject. The soft edge ring is then part of
    # the region the flood reaches, so fur keeps its partial alpha, while a
    # dark feature enclosed by solid fur is judged a hole and forced opaque.
    solid = luma.point(lambda v: 0 if v < hi else 255)
    w, h = solid.size
    padded = Image.new("L", (w + 2, h + 2), 0)
    padded.paste(solid, (1, 1))

    # Flood the background inward from outside the subject.
    ImageDraw.floodfill(padded, (0, 0), BG_MARK, thresh=0)

    # Anything still 0 was never reached: an interior hole. Force it opaque.
    holes = padded.crop((1, 1, w + 1, h + 1)).point(lambda v: 255 if v == 0 else 0)

    return ImageChops.lighter(ramp, holes)


def unpremultiply(channel: Image.Image, alpha: Image.Image) -> Image.Image:
    """Divide the plate's black back out of a partially transparent edge pixel.

    Needs real per-pixel division across two images, so it goes through
    ImageMath - an 8-bit ImageChops.multiply cannot apply a factor above 1.
    """
    return ImageMath.lambda_eval(
        lambda a: a["convert"](
            a["min"](a["float"](a["c"]) * 255 / a["max"](a["float"](a["a"]), 1), 255), "L"
        ),
        c=channel,
        a=alpha,
    )


def main() -> int:
    args = sys.argv[1:]
    if not args:
        print(__doc__)
        return 2

    frames_dir = Path(args[0])
    lo, hi = 40, 70
    for i, a in enumerate(args):
        if a == "--lo":
            lo = int(args[i + 1])
        if a == "--hi":
            hi = int(args[i + 1])

    frames = sorted(frames_dir.glob("in_*.png"))
    if not frames:
        print(f"no in_*.png frames in {frames_dir}", file=sys.stderr)
        return 1

    for n, path in enumerate(frames, 1):
        rgb = Image.open(path).convert("RGB")
        alpha = alpha_for(rgb.convert("L"), lo, hi)
        r, g, b = (unpremultiply(c, alpha) for c in rgb.split())
        Image.merge("RGBA", (r, g, b, alpha)).save(frames_dir / f"out_{n:05d}.png")

    print(f"keyed {len(frames)} frames (lo={lo} hi={hi})")
    return 0


if __name__ == "__main__":
    sys.exit(main())
