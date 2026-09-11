#!/usr/bin/env python
"""Re-lay out slide 1 of the ig-launch carousel.

Against the original: the LAUNCH eyebrow, the "free month of Pro" pill, the
"iOS - free to start" line, the orange rule and the "your job search. on
autopilot." subhead are all gone. What is left is "so... what is" as one
small lead-in line over a big "Offerloop?", centred, with the full Offerloop
lockup in white and a white arrow along the bottom where the swipe pill used
to be - the shape of the reference cover Nick sent (the PINNED slide).

The deck arrived as finished PNGs with no source, so the type is moved as
pixels rather than re-set - no font in the repo matches the deck's serif, and
a substitution would read as a different slide next to the other seven. Each
block is lifted as a rectangle of the flat grey ground, resized, and
re-levelled onto the destination before it is pasted.

Re-levelling is what makes the paste invisible. The grey ground is a pure
vertical ramp with no horizontal variation at all (244,245,249 at the top row
down to 231,233,240 at the bottom), so a block that moves 150px up sits on a
ground about 1.5 levels off its own - enough to print the crop's rectangle on
a flat field. Every row of a lifted block knows which source row it came
from, so the exact offset between that row's ground and the destination
row's is added back, glyphs included: a shift of a level or two inside a dark
letter is invisible, and the seam goes away. The glyphs' own antialiasing
rides along untouched.

The white lockup is the one exception: it cannot go into the grey slide,
because restyle.py's flood would read white as ground and eat it. It is
lifted as a coverage mask instead (each pixel's distance from the ground over
the strongest distance near it, which normalises the near-black wordmark and
the mid-blue icon to the same solid silhouette) and composited onto the
finished blue frame.

Sizes come off the reference, mapped across canvases - both are 4:5, so the
lead-in line's 36px ascender on its 1198px-tall frame is 41px here.

Usage:
  .venv-key/bin/python tools/carousel/cover.py [--grey-only]
"""
import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter

sys.path.insert(0, str(Path(__file__).parent))
import restyle  # noqa: E402  (same directory)

CAROUSELS = Path("public/assets/carousels")
SRC = CAROUSELS / "ig-launch" / "1-cover.png"
GREY_OUT = CAROUSELS / "_edits" / "1-cover.png"
BLUE_OUT = CAROUSELS / "ig-launch-blue" / "1-cover.png"

# Columns that are empty on every row, so the ground ramp can be read off
# them: the headline stops at x536 and the old swipe pill started at x838.
CLEAN = slice(600, 820)

# Ink boxes measured off the source, (x0, y0, x1, y1), tight to the last
# antialiased pixel. Blocks not listed here are dropped.
LOCKUP = (76, 99, 290, 146)  # icon + "Offerloop", reused white at the bottom
LEAD_A = (73, 337, 234, 404)  # "so..."      - both sit on their own baseline
LEAD_B = (68, 446, 375, 542)  # "what is"      at the block's bottom row
HEAD = (75, 583, 522, 705)  # "Offerloop?", cap line to the p's descender
# The orange rule sits under the headline and the two p descenders reach into
# its band, so it goes by colour rather than by a row cut. The ground itself
# runs about five levels bluer than it is red, so anything warmer than that
# is rule, including its antialiased fringe; the blue type never is.
SQUIGGLE = (60, 686, 545, 730)

HEAD_SCALE = 0.78
LEAD_SCALE = 0.43  # 41px ascender, the reference's lead-in mapped to 1350px
WORD_SPACE = 26  # ink gap between the two lead words, source px
LEAD_TO_HEAD = 36  # lead baseline down to the cap line of "Offerloop?"
# The stack is centred between the badge and the footer, then lifted a
# little: a block on true centre reads as sitting low.
CENTRE_X = 540
CENTRE_Y = 658
PAD = 3  # ground carried around each lifted block

# Footer lockup, sitting where the swipe pill used to.
FOOT_Y = 1254
FOOT_SCALE = 1.0
ARROW_GAP = 44  # lockup right edge to the start of the shaft
ARROW_LEN = 86
ARROW_WEIGHT = 5
ARROW_HEAD = (18, 14)  # how far back and how far out the barbs reach
SS = 4  # supersampling for the drawn arrow


def ground_ramp(rgb: np.ndarray) -> np.ndarray:
    """The ground colour of every row, read off the empty columns."""
    return np.median(rgb[:, CLEAN, :], axis=1)


def drop_squiggle(rgb: np.ndarray, ramp: np.ndarray) -> None:
    """Erase the orange rule in place, leaving the descenders over it alone."""
    x0, y0, x1, y1 = SQUIGGLE
    band = rgb[y0:y1, x0:x1]
    warm = (band[:, :, 0] - band[:, :, 2]) > -2
    ground = np.broadcast_to(ramp[y0:y1][:, None, :], band.shape)
    rgb[y0:y1, x0:x1] = np.where(warm[..., None], ground, band)


def lift(rgb: np.ndarray, ramp: np.ndarray, box: tuple, scale: float):
    """Cut a block out, resize it, and return it with the source row each of
    its rows came from, so the caller can re-level it where it lands."""
    x0, y0, x1, y1 = box
    crop = rgb[y0 - PAD : y1 + PAD, x0 - PAD : x1 + PAD]
    h, w = crop.shape[:2]
    if scale != 1.0:
        crop = np.asarray(
            Image.fromarray(np.clip(crop, 0, 255).astype(np.uint8)).resize(
                (max(1, round(w * scale)), max(1, round(h * scale))), Image.LANCZOS
            )
        ).astype(np.float64)
    # Inverse of PIL's pixel-centre mapping: which source row fed each new row.
    src_rows = np.clip(
        np.round(y0 - PAD + (np.arange(crop.shape[0]) + 0.5) / scale - 0.5).astype(int),
        0,
        len(ramp) - 1,
    )
    return crop, ramp[src_rows], scale


def place(canvas: np.ndarray, ramp: np.ndarray, block, ink_left, ink_top):
    """Drop a lifted block so its ink box lands at (ink_left, ink_top),
    correcting each row onto the destination ground."""
    crop, src_ground, scale = block
    h, w = crop.shape[:2]
    top = round(ink_top - PAD * scale)
    left = round(ink_left - PAD * scale)
    dst_ground = ramp[top : top + h]
    canvas[top : top + h, left : left + w] = np.clip(
        crop + (dst_ground - src_ground)[:, None, :], 0, 255
    )


def ink_size(box: tuple, scale: float) -> tuple[float, float]:
    return (box[2] - box[0]) * scale, (box[3] - box[1]) * scale


def build(rgb: np.ndarray, ramp: np.ndarray) -> Image.Image:
    h, w, _ = rgb.shape

    # Start from clean ground and put back only what stays: the top lockup,
    # which restyle erases and drops the frosted badge onto.
    canvas = np.repeat(ramp[:, None, :], w, axis=1)
    x0, y0, x1, y1 = LOCKUP
    canvas[y0 - PAD : y1 + PAD, x0 - PAD : x1 + PAD] = rgb[
        y0 - PAD : y1 + PAD, x0 - PAD : x1 + PAD
    ]

    aw, ah = ink_size(LEAD_A, LEAD_SCALE)
    bw, bh = ink_size(LEAD_B, LEAD_SCALE)
    space = WORD_SPACE * LEAD_SCALE
    hw, hh = ink_size(HEAD, HEAD_SCALE)

    stack = ah + LEAD_TO_HEAD + hh
    top = CENTRE_Y - stack / 2

    # Lead-in: two words on one line, hung from a shared baseline.
    baseline = top + ah
    left = CENTRE_X - (aw + space + bw) / 2
    place(canvas, ramp, lift(rgb, ramp, LEAD_A, LEAD_SCALE), left, baseline - ah)
    place(
        canvas, ramp, lift(rgb, ramp, LEAD_B, LEAD_SCALE), left + aw + space, baseline - bh
    )

    head_top = baseline + LEAD_TO_HEAD
    place(canvas, ramp, lift(rgb, ramp, HEAD, HEAD_SCALE), CENTRE_X - hw / 2, head_top)

    return Image.fromarray(np.clip(canvas, 0, 255).astype(np.uint8))


def coverage(rgb: np.ndarray, ramp: np.ndarray, box: tuple) -> Image.Image:
    """Lift a block as an alpha mask: how covered each pixel is by ink.

    Distance from the ground alone would make the mid-blue icon translucent
    next to the near-black wordmark. Dividing by the strongest distance in the
    neighbourhood normalises every stroke to solid whatever colour it was,
    while the antialiased rim, which is genuinely part-covered, stays partial.
    """
    x0, y0, x1, y1 = box
    crop = rgb[y0:y1, x0:x1]
    d = np.abs(crop - ramp[y0:y1][:, None, :]).max(2)
    img = Image.fromarray(np.clip(d, 0, 255).astype(np.uint8))
    peak = np.asarray(
        img.filter(ImageFilter.MaxFilter(21)).filter(ImageFilter.GaussianBlur(4))
    ).astype(np.float64)
    alpha = np.clip(d / np.maximum(peak, 1.0), 0, 1)
    return Image.fromarray((alpha * 255).astype(np.uint8))


def arrow(width: int, height: int) -> Image.Image:
    """A thin white arrow, drawn oversized and downsampled for clean edges."""
    mask = Image.new("L", (width * SS, height * SS), 0)
    d = ImageDraw.Draw(mask)
    mid = height * SS // 2
    w = ARROW_WEIGHT * SS
    back, out = ARROW_HEAD[0] * SS, ARROW_HEAD[1] * SS
    tip = width * SS - w // 2
    for a, b in (
        ((w // 2, mid), (tip, mid)),
        ((tip, mid), (tip - back, mid - out)),
        ((tip, mid), (tip - back, mid + out)),
    ):
        d.line([a, b], fill=255, width=w)
        for x, y in (a, b):  # round the caps
            d.ellipse((x - w // 2, y - w // 2, x + w // 2, y + w // 2), fill=255)
    return mask.resize((width, height), Image.LANCZOS)


def footer(frame: Image.Image, rgb: np.ndarray, ramp: np.ndarray) -> Image.Image:
    """Lockup in white plus the keep-swiping arrow, along the bottom."""
    out = frame.convert("RGBA")
    mask = coverage(rgb, ramp, LOCKUP)
    lw, lh = ink_size(LOCKUP, FOOT_SCALE)
    lw, lh = round(lw), round(lh)
    if FOOT_SCALE != 1.0:
        mask = mask.resize((lw, lh), Image.LANCZOS)
    left = round(CENTRE_X - lw / 2)
    white = Image.new("RGBA", (lw, lh), (255, 255, 255, 255))
    out.paste(white, (left, round(FOOT_Y - lh / 2)), mask)

    ah = ARROW_HEAD[1] * 2 + ARROW_WEIGHT * 2
    tip = arrow(ARROW_LEN, ah)
    out.paste(
        Image.new("RGBA", (ARROW_LEN, ah), (255, 255, 255, 255)),
        (left + lw + ARROW_GAP, round(FOOT_Y - ah / 2)),
        tip,
    )
    return out.convert("RGB")


def main() -> int:
    rgb = np.asarray(Image.open(SRC).convert("RGB")).astype(np.float64)
    ramp = ground_ramp(rgb)
    drop_squiggle(rgb, ramp)

    GREY_OUT.parent.mkdir(parents=True, exist_ok=True)
    grey = build(rgb, ramp)
    grey.save(GREY_OUT)
    print(f"  grey  -> {GREY_OUT}")
    if "--grey-only" in sys.argv:
        return 0

    bg = restyle.mesh(grey.width, grey.height)
    footer(restyle.restyle(GREY_OUT, bg), rgb, ramp).save(BLUE_OUT)
    print(f"  blue  -> {BLUE_OUT}")

    deck = sorted(p for p in BLUE_OUT.parent.glob("*.png") if p.name[0].isdigit())
    restyle.contact_sheet([Image.open(p) for p in deck], BLUE_OUT.parent)
    print(f"  sheet -> {BLUE_OUT.parent / '_contact-sheet.png'}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
