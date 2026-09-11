#!/usr/bin/env python
"""Re-lay out slide 1 of the ig-launch carousel: drop the LAUNCH eyebrow, the
"free month of Pro" pill and the "iOS - free to start" line, then centre the
headline and set it smaller.

The deck arrived as finished PNGs with no source, so the type is moved as
pixels rather than re-set - no font in the repo matches the deck's serif, and
a substitution would read as a different slide next to the other seven. Each
block is lifted as a rectangle of the flat grey ground, resized, and
re-levelled onto the destination before it is pasted.

Re-levelling is what makes the paste invisible. The grey ground is a pure
vertical ramp with no horizontal variation at all (244,245,249 at the top row
down to 231,233,240 at the bottom), so a block that moves 150px up sits on a
ground about 1.5 levels off its own - enough to print the crop's rectangle on
a flat field. Every row of a lifted block knows which source row it came from,
so the exact offset between that row's ground and the destination row's is
added back, glyphs included: a shift of a level or two inside a dark letter
is invisible, and the seam goes away. The glyphs' own antialiasing rides
along untouched.

The edited grey slide is kept in carousels/_edits/ (underscore-prefixed, so
the preview server's deck listing skips it) and then run through restyle.py's
single-slide path to land in the blue deck.

Usage:
  .venv-key/bin/python tools/carousel/cover.py [--grey-only]
"""
import sys
from pathlib import Path

import numpy as np
from PIL import Image

sys.path.insert(0, str(Path(__file__).parent))
import restyle  # noqa: E402  (same directory)

CAROUSELS = Path("public/assets/carousels")
SRC = CAROUSELS / "ig-launch" / "1-cover.png"
GREY_OUT = CAROUSELS / "_edits" / "1-cover.png"
BLUE_OUT = CAROUSELS / "ig-launch-blue" / "1-cover.png"

# Columns that are empty on every row, so the ground ramp can be read off
# them: the headline stops at x536 and the swipe pill starts at x838.
CLEAN = slice(600, 820)

# Ink boxes measured off the source, (x0, y0, x1, y1), tight to the last
# antialiased pixel. Blocks not listed here are dropped.
LOCKUP = (76, 99, 290, 146)  # restyle erases this and drops the badge on it
LINE1 = (73, 337, 234, 404)  # "so..."
LINE2 = (68, 446, 375, 542)  # "what is"
LINE3 = (72, 583, 536, 720)  # "Offerloop?" + the orange squiggle under it
BODY1 = (73, 756, 407, 798)  # "your job search."
BODY2 = (74, 812, 335, 854)  # "on autopilot."
SWIPE = (838, 1222, 1016, 1286)

HEAD_SCALE = 0.78
# Top-to-top gaps, scaled with the headline so its rhythm is preserved.
HEAD_GAPS = (109, 137)
BODY_GAP = 56  # top to top, unscaled - the body keeps its size
HEAD_TO_BODY = 40  # headline bottom to body top
# The stack is centred between the badge and the swipe pill, then lifted a
# little: a block on true centre reads as sitting low.
CENTRE_X = 540
CENTRE_Y = 658
PAD = 3  # ground carried around each lifted block


def ground_ramp(rgb: np.ndarray) -> np.ndarray:
    """The ground colour of every row, read off the empty columns."""
    return np.median(rgb[:, CLEAN, :], axis=1)


def lift(rgb: np.ndarray, ramp: np.ndarray, box: tuple, scale: float):
    """Cut a block out, resize it, and return it with the source row each of
    its rows came from, so the caller can re-level it where it lands."""
    x0, y0, x1, y1 = box
    x0, y0 = x0 - PAD, y0 - PAD
    x1, y1 = x1 + PAD, y1 + PAD
    crop = rgb[y0:y1, x0:x1]
    h, w = crop.shape[:2]
    if scale != 1.0:
        nw, nh = max(1, round(w * scale)), max(1, round(h * scale))
        crop = np.asarray(
            Image.fromarray(np.clip(crop, 0, 255).astype(np.uint8)).resize(
                (nw, nh), Image.LANCZOS
            )
        ).astype(np.float64)
    nh = crop.shape[0]
    # Inverse of PIL's pixel-centre mapping: which source row fed each new row.
    src_rows = np.clip(
        np.round(y0 + (np.arange(nh) + 0.5) / scale - 0.5).astype(int),
        0,
        len(ramp) - 1,
    )
    return crop, ramp[src_rows]


def paste(canvas: np.ndarray, ramp: np.ndarray, block, top: int, left: int):
    """Drop a lifted block, correcting each row onto the destination ground."""
    crop, src_ground = block
    h, w = crop.shape[:2]
    dst_ground = ramp[top : top + h]
    canvas[top : top + h, left : left + w] = np.clip(
        crop + (dst_ground - src_ground)[:, None, :], 0, 255
    )


def centred(block, top: int) -> tuple[int, int]:
    """Top-left for a block centred on CENTRE_X."""
    return top, round(CENTRE_X - block[0].shape[1] / 2)


def build() -> Image.Image:
    rgb = np.asarray(Image.open(SRC).convert("RGB")).astype(np.float64)
    h, w, _ = rgb.shape
    ramp = ground_ramp(rgb)

    # Start from clean ground and put back only what stays.
    canvas = np.repeat(ramp[:, None, :], w, axis=1)
    for box in (LOCKUP, SWIPE):
        x0, y0, x1, y1 = box
        canvas[y0 - PAD : y1 + PAD, x0 - PAD : x1 + PAD] = rgb[
            y0 - PAD : y1 + PAD, x0 - PAD : x1 + PAD
        ]

    head = [lift(rgb, ramp, b, HEAD_SCALE) for b in (LINE1, LINE2, LINE3)]
    body = [lift(rgb, ramp, b, 1.0) for b in (BODY1, BODY2)]

    gaps = [round(g * HEAD_SCALE) for g in HEAD_GAPS]
    head_height = gaps[0] + gaps[1] + head[2][0].shape[0] - 2 * PAD
    body_height = BODY_GAP + body[1][0].shape[0] - 2 * PAD
    stack = head_height + HEAD_TO_BODY + body_height
    top = round(CENTRE_Y - stack / 2) - PAD

    tops = [top, top + gaps[0], top + gaps[0] + gaps[1]]
    for block, t in zip(head, tops):
        paste(canvas, ramp, block, *centred(block, t))

    body_top = tops[2] + head[2][0].shape[0] - 2 * PAD + HEAD_TO_BODY
    for block, t in zip(body, (body_top, body_top + BODY_GAP)):
        paste(canvas, ramp, block, *centred(block, t))

    return Image.fromarray(np.clip(canvas, 0, 255).astype(np.uint8))


def main() -> int:
    GREY_OUT.parent.mkdir(parents=True, exist_ok=True)
    grey = build()
    grey.save(GREY_OUT)
    print(f"  grey  -> {GREY_OUT}")
    if "--grey-only" in sys.argv:
        return 0

    bg = restyle.mesh(grey.width, grey.height)
    restyle.restyle(GREY_OUT, bg).save(BLUE_OUT)
    print(f"  blue  -> {BLUE_OUT}")

    deck = sorted(p for p in BLUE_OUT.parent.glob("*.png") if p.name[0].isdigit())
    restyle.contact_sheet([Image.open(p) for p in deck], BLUE_OUT.parent)
    print(f"  sheet -> {BLUE_OUT.parent / '_contact-sheet.png'}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
