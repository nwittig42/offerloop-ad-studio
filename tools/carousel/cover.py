#!/usr/bin/env python
"""Re-lay out slide 1 of the ig-launch carousel.

Against the original: the LAUNCH eyebrow, the "free month of Pro" pill, the
"iOS - free to start" line, the orange rule, the question mark and the "your
job search. on autopilot." subhead are all gone. What is left is "so... what
is" as one small lead-in line over the Offerloop lockup, centred, with the
same lockup in white and a white arrow along the bottom where the swipe pill
used to be - the shape of the reference cover Nick sent (the PINNED slide).

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

Only the lead-in line goes through that path. Both lockups are composited
onto the finished blue frame instead, after restyle: the flood that turns the
grey ground into gradient reads bright pixels as ground, so a white mark laid
into the grey slide would simply be eaten, and the counters of a colour one
would be filled with gradient at the wrong shading. The white version is the
lockup's own alpha filled white, so it keeps every counter open.

Sizes come off the reference, mapped across canvases - both are 4:5, so the
lead-in line's 36px ascender on its 1198px-tall frame is 41px here.

Usage:
  .venv-key/bin/python tools/carousel/cover.py [--grey-only]
"""
import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw

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
LEAD_A = (73, 337, 234, 404)  # "so..."      - both sit on their own baseline
LEAD_B = (68, 446, 375, 542)  # "what is"      at the block's bottom row
# The orange rule sits under the headline and the two p descenders reach into
# its band, so it goes by colour rather than by a row cut. The ground itself
# runs about five levels bluer than it is red, so anything warmer than that
# is rule, including its antialiased fringe; the blue type never is.
SQUIGGLE = (60, 686, 545, 730)

# The product lockup, which replaces the typeset "Offerloop?" as the hero.
# 620px is 57% of the frame: the reference's word runs to 69%, and the lockup
# is a wider, quieter shape than a single word set in a display serif.
LOGO = Path("public/assets/figma/offerloop-logo-lockup.png")
LOGO_W = 620
LEAD_SCALE = 0.43  # 41px ascender, the reference's lead-in mapped to 1350px
WORD_SPACE = 26  # ink gap between the two lead words, source px
LEAD_TO_LOGO = 36  # lead baseline down to the top of the lockup
# The stack is centred between the badge and the footer, then lifted a
# little: a block on true centre reads as sitting low.
CENTRE_X = 540
CENTRE_Y = 658
PAD = 3  # ground carried around each lifted block

# Footer lockup, sitting where the swipe pill used to.
FOOT_Y = 1254
FOOT_W = 220
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


def logo(width: int, white: bool = False) -> Image.Image:
    """The lockup at a given width, optionally as a white silhouette.

    Trimmed on a threshold rather than getbbox(): the export carries stray
    alpha-1 pixels out to all four edges, so getbbox() returns the whole
    612x408 canvas and every size below would be measured on the padding
    instead of on the mark.
    """
    im = Image.open(LOGO).convert("RGBA")
    alpha = np.asarray(im.getchannel("A"))
    ys, xs = np.where(alpha > 8)
    im = im.crop((xs.min(), ys.min(), xs.max() + 1, ys.max() + 1))
    im = im.resize((width, round(width * im.height / im.width)), Image.LANCZOS)
    if white:
        im = Image.merge("RGBA", (*Image.new("RGB", im.size, "white").split(), im.getchannel("A")))
    return im


def layout() -> dict:
    """Where the lead-in and the lockup sit, as one stack centred on the frame."""
    aw, ah = ink_size(LEAD_A, LEAD_SCALE)
    bw, bh = ink_size(LEAD_B, LEAD_SCALE)
    space = WORD_SPACE * LEAD_SCALE
    mark = logo(LOGO_W)
    stack = ah + LEAD_TO_LOGO + mark.height
    baseline = CENTRE_Y - stack / 2 + ah
    return {
        "left": CENTRE_X - (aw + space + bw) / 2,
        "a_top": baseline - ah,
        "b_left": CENTRE_X - (aw + space + bw) / 2 + aw + space,
        "b_top": baseline - bh,
        "logo": mark,
        "logo_top": round(baseline + LEAD_TO_LOGO),
    }


def build(rgb: np.ndarray, ramp: np.ndarray, plan: dict) -> Image.Image:
    """The grey slide: clean ground plus the lead-in line, which is the only
    part that has to survive restyle's flood."""
    h, w, _ = rgb.shape
    canvas = np.repeat(ramp[:, None, :], w, axis=1)
    place(canvas, ramp, lift(rgb, ramp, LEAD_A, LEAD_SCALE), plan["left"], plan["a_top"])
    place(canvas, ramp, lift(rgb, ramp, LEAD_B, LEAD_SCALE), plan["b_left"], plan["b_top"])
    return Image.fromarray(np.clip(canvas, 0, 255).astype(np.uint8))


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


def marks(frame: Image.Image, plan: dict) -> Image.Image:
    """The hero lockup, and the white one with its arrow along the bottom."""
    out = frame.convert("RGBA")
    mark = plan["logo"]
    out.alpha_composite(mark, (round(CENTRE_X - mark.width / 2), plan["logo_top"]))

    foot = logo(FOOT_W, white=True)
    left = round(CENTRE_X - foot.width / 2)
    out.alpha_composite(foot, (left, round(FOOT_Y - foot.height / 2)))

    ah = ARROW_HEAD[1] * 2 + ARROW_WEIGHT * 2
    out.paste(
        Image.new("RGBA", (ARROW_LEN, ah), (255, 255, 255, 255)),
        (left + foot.width + ARROW_GAP, round(FOOT_Y - ah / 2)),
        arrow(ARROW_LEN, ah),
    )
    return out.convert("RGB")


def main() -> int:
    rgb = np.asarray(Image.open(SRC).convert("RGB")).astype(np.float64)
    ramp = ground_ramp(rgb)
    drop_squiggle(rgb, ramp)

    plan = layout()
    GREY_OUT.parent.mkdir(parents=True, exist_ok=True)
    grey = build(rgb, ramp, plan)
    grey.save(GREY_OUT)
    print(f"  grey  -> {GREY_OUT}")
    if "--grey-only" in sys.argv:
        return 0

    bg = restyle.mesh(grey.width, grey.height)
    marks(restyle.restyle(GREY_OUT, bg), plan).save(BLUE_OUT)
    print(f"  blue  -> {BLUE_OUT}")

    deck = sorted(p for p in BLUE_OUT.parent.glob("*.png") if p.name[0].isdigit())
    restyle.contact_sheet([Image.open(p) for p in deck], BLUE_OUT.parent)
    print(f"  sheet -> {BLUE_OUT.parent / '_contact-sheet.png'}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
