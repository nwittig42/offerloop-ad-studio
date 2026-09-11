#!/usr/bin/env python
"""Restyle the flat IG carousel exports onto a blue mesh gradient with a
frosted-glass logo badge in the top left.

The slides arrived as finished PNGs with no source, so the background cannot
simply be re-rendered. Instead each slide is split into background and
content: the light grey ground is flood-filled inward from the frame border
(the same trick as key-alpha.py), everything the flood never reaches is real
content - headlines, chips, the device mockups - and is carried over
untouched. Inside the flooded region the pixel is not replaced but used as a
multiplier over the new gradient, so the drop shadows under the phones and the
antialiased fringe on every glyph survive as shading instead of leaving a grey
halo where the old ground used to be.

Two layout moves keep the new badge from colliding with the art. Slides that
carry the small wordmark lockup over an eyebrow label get the lockup erased
and everything below it pushed down (SHIFT), which frees a band the full-size
badge fits in; the cover and CTA slides already have the headroom and only
need the erase. Content pushed past the bottom edge is cropped, which is fine
- those phones were already bleeding off frame.

Usage:
  .venv-key/bin/python tools/carousel/restyle.py <src_dir> <out_dir>
"""
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter
import numpy as np

ICON = Path("public/assets/figma/offerloop-icon.png")

# Background flood. A pixel joins the ground if it is bright and near-neutral;
# LOOSE sits well below the ground itself (231-254) so the soft shadow ramps
# and glyph fringes are inside the region and get shaded rather than cut out.
LOOSE = 185
CHROMA = 40
SHADOW_CUT = 0.93  # below this a ground pixel is shading, not clean ground
FIELD_SIGMA = 40.0  # px; separates the old ground's blooms from real shadows

# Mesh blobs: (cx, cy, radius, hex) in fractions of the frame. Kept light on
# purpose - the slides' type is navy and has to keep its contrast.
BLOBS = [
    (0.02, 0.02, 0.50, "#D5E7F7"),
    (1.00, 0.00, 0.55, "#87ABE0"),
    (0.00, 0.70, 0.52, "#BFD1F2"),
    (0.35, 1.02, 0.52, "#A2BAE9"),
    (1.02, 0.88, 0.52, "#7FA0D8"),
    (0.38, 0.28, 0.40, "#FDFEFF"),
]
FALLOFF = 2.6

# Badge geometry, in px on the 1080x1350 frame.
BADGE_D = 132
BADGE_X = 64
BADGE_Y = 52
ICON_FRAC = 0.60

# Per-slide layout. erase: boxes of old lockup to wipe back to ground.
# shift: px to push everything below the lockup down, freeing badge room.
LAYOUT = {
    "default": {"erase": [(46, 44, 285, 108)], "shift": 72, "shift_from": 118},
    "1-cover.png": {"erase": [(56, 84, 310, 160)], "shift": 0, "shift_from": 0},
    "8-cta.png": {"erase": [(56, 84, 310, 160)], "shift": 0, "shift_from": 0},
    # The Companies board bleeds to the top edge here, so nothing can shift
    # and the badge sits over the art as in the reference. The lockup still
    # has to go; the board starts at x313, so the wipe clears it comfortably.
    # ...and the wipe has to stop at x207. The board is rotated, so its
    # corner runs down the frame as a diagonal band from x209 at the top
    # edge, passing right beside the lockup; a box drawn out to the wordmark's
    # full width cuts that corner off and fills it with sky.
    # The wordmark's last glyph falls past that stop, in the sliver between
    # the lockup and the corner, so it takes a second tight box of its own.
    "7-track.png": {
        "erase": [(46, 42, 207, 104), (197, 64, 224, 88)],
        "shift": 0,
        "shift_from": 0,
    },
}


def hex_rgb(h: str) -> tuple[float, float, float]:
    h = h.lstrip("#")
    return tuple(int(h[i : i + 2], 16) for i in (0, 2, 4))


def mesh(w: int, h: int) -> np.ndarray:
    """Soft multi-blob gradient, inverse-distance weighted so it stays smooth.

    Aspect is corrected before measuring distance, otherwise a blob on a 4:5
    frame comes out as an ellipse and the mesh reads as banding.
    """
    yy, xx = np.mgrid[0:h, 0:w].astype(np.float64)
    xx /= w
    yy /= h
    ar = h / w

    acc = np.zeros((h, w, 3))
    wsum = np.zeros((h, w))
    for cx, cy, r, col in BLOBS:
        d = np.hypot(xx - cx, (yy - cy) * ar) / r
        weight = np.exp(-(d**FALLOFF))
        wsum += weight
        acc += weight[..., None] * np.array(hex_rgb(col))
    return acc / wsum[..., None]


def ground_region(rgb: np.ndarray) -> np.ndarray:
    """Bool mask of the original ground, flood-filled in from the border.

    Seeded from the top, left and right edges only. Several slides let a white
    phone screen run off the bottom of the frame; seeding the bottom row would
    let the flood walk straight into the device and punch a hole through it.
    The bottom strips of real ground are still reached, around via the sides.
    """
    mx = rgb.max(2)
    mn = rgb.min(2)
    candidate = (mx >= LOOSE) & ((mx - mn) <= CHROMA)

    h, w = candidate.shape
    # 255 = floodable candidate. Pad so one corner seed reaches every edge.
    work = Image.new("L", (w + 2, h + 2), 0)
    work.paste(Image.fromarray((candidate * 255).astype(np.uint8)), (1, 1))
    px = work.load()
    for x in range(w + 2):  # top gutter only; bottom stays unseeded
        px[x, 0] = 255
    for y in range(h + 2):
        px[0, y] = 255
        px[w + 1, y] = 255

    ImageDraw.floodfill(work, (0, 0), 1, thresh=0)
    filled = np.asarray(work.crop((1, 1, w + 1, h + 1)))
    return filled == 1


def wide_blur(a: np.ndarray, sigma: float) -> np.ndarray:
    """Separable blur over a float plane. Three box passes approximate a
    gaussian closely enough for a field this smooth, and each pass is a
    cumulative sum, so the cost does not grow with the radius. Pillow cannot
    help here - its GaussianBlur rejects float images.
    """
    r = max(1, int(round(sigma * 1.04)))
    out = a
    for _ in range(3):
        for axis in (0, 1):
            out = np.swapaxes(out, 0, axis)
            pad = np.pad(out, ((r + 1, r), (0, 0)), mode="edge")
            cs = np.cumsum(pad, axis=0)
            out = (cs[2 * r + 1 :] - cs[: -(2 * r + 1)]) / (2 * r + 1)
            out = np.swapaxes(out, 0, axis)
    return out


def ground_field(luma: np.ndarray, ground: np.ndarray) -> np.ndarray:
    """The old background's own light, as a smooth low-frequency field.

    The originals are not flat grey - each carries soft blooms and a vignette,
    and those have to come out or they fight the new gradient and print every
    synthesised patch (the wiped lockup, the band the shift vacates) as a
    visible rectangle against them. Dividing by this field normalises clean
    ground to 1.0 everywhere, whatever the old slide was doing underneath.

    The split is by scale: the blooms run across hundreds of px, the phone
    shadows and glyph fringes across tens, so a wide blur keeps the former and
    leaves the latter as detail. It is a normalised convolution over ground
    only - blurring the raw frame would drag the navy headlines into the
    field and carve haloes around them - and pixels already darker than
    SHADOW_CUT are held out of the estimate so a phone's shadow cannot pull
    the field down and erase itself.
    """
    # Where a full-bleed mockup leaves no ground within a blur radius there is
    # nothing to estimate from, so those pixels take the frame-wide level. They
    # are covered by content anyway; the guard just keeps the divide finite.
    level = float(np.percentile(luma[ground], 85)) if ground.any() else 255.0

    def estimate(weight: np.ndarray) -> np.ndarray:
        den = wide_blur(weight, FIELD_SIGMA)
        num = wide_blur(luma * weight, FIELD_SIGMA)
        return np.where(den > 1e-4, num / np.maximum(den, 1e-6), level)

    # Two passes. The first runs over all ground and is dragged down wherever
    # a phone throws a shadow; the second drops whatever that first pass says
    # is shading and re-estimates from clean ground alone. The cut has to be
    # against the field and not a global level: 7-track's ground falls from
    # near-white at the frame edge to 225 beside the board, and a global cut
    # throws that darker end away as shadow, leaving the field too high there
    # and the wiped box glowing against it.
    g = ground.astype(np.float64)
    first = estimate(g)
    return estimate(g * (luma >= SHADOW_CUT * first))


def split(path: Path) -> tuple[np.ndarray, np.ndarray, np.ndarray]:
    """Return (rgb, ground mask, shading multiplier) for one slide."""
    rgb = np.asarray(Image.open(path).convert("RGB")).astype(np.float64)
    ground = ground_region(rgb)
    luma = rgb @ (0.2126, 0.7152, 0.0722)
    shade = np.clip(luma / ground_field(luma, ground), 0.0, 1.0)
    return rgb, ground, shade


def glass_badge(base: Image.Image) -> Image.Image:
    """Frost a disc of the composed frame and sit the icon mark in it.

    Done against the finished frame rather than drawn flat so the disc picks
    up whatever is behind it - the gradient on most slides, the Companies
    board on 7-track - which is what sells it as glass.
    """
    w, h = base.size
    box = (BADGE_X, BADGE_Y, BADGE_X + BADGE_D, BADGE_Y + BADGE_D)
    out = base.convert("RGB")

    disc = Image.new("L", (w, h), 0)
    ImageDraw.Draw(disc).ellipse(box, fill=255)

    # Contact shadow, dropped before the disc so it reads as sitting above.
    shadow = disc.filter(ImageFilter.GaussianBlur(15))
    shadow = shadow.transform(
        (w, h), Image.AFFINE, (1, 0, 0, 0, 1, -7), resample=Image.BILINEAR
    )
    tint = Image.new("RGB", (w, h), (34, 48, 92))
    out = Image.composite(Image.blend(out, tint, 0.16), out, shadow)

    # Frost: blur what is behind the disc, then lift it toward white.
    blurred = out.filter(ImageFilter.GaussianBlur(16))
    frosted = Image.blend(blurred, Image.new("RGB", (w, h), (255, 255, 255)), 0.36)
    out = Image.composite(frosted, out, disc)

    # Rim: a bright inner edge plus a faint cool outline, so the disc has an
    # edge on a pale gradient as well as over dark artwork.
    rim = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    rd = ImageDraw.Draw(rim)
    rd.ellipse(box, outline=(255, 255, 255, 150), width=3)
    rd.ellipse(
        (box[0] - 1, box[1] - 1, box[2] + 1, box[3] + 1),
        outline=(110, 133, 196, 70),
        width=2,
    )
    out = Image.alpha_composite(out.convert("RGBA"), rim)

    icon = Image.open(ICON).convert("RGBA")
    icon = icon.crop(icon.getbbox())
    side = int(BADGE_D * ICON_FRAC)
    scale = side / max(icon.size)
    icon = icon.resize(
        (max(1, round(icon.width * scale)), max(1, round(icon.height * scale))),
        Image.LANCZOS,
    )
    out.alpha_composite(
        icon,
        (
            BADGE_X + (BADGE_D - icon.width) // 2,
            BADGE_Y + (BADGE_D - icon.height) // 2,
        ),
    )
    return out


def fill_box(
    shade: np.ndarray,
    ground: np.ndarray,
    box: tuple[int, int, int, int],
    axis: str = "both",
) -> None:
    """Replace a rectangle of the shading with a smooth fill off its borders.

    A constant is not good enough. The wipe box on 7-track sits in the soft
    shadow the Companies board throws left, so flattening it prints the
    rectangle's own edges on the frame. Interpolating the four borders across
    the hole instead lands on whatever the neighbourhood was doing - flat
    where the ground is flat, a ramp where it is ramping.
    """
    x0, y0, x1, y1 = box

    def edge(values: np.ndarray, is_ground: np.ndarray) -> np.ndarray:
        """One border strip, with any pixel that is content rather than
        ground replaced by the strip's typical ground. 7-track's box reaches
        to within a few px of the Companies board, and sampling the board
        itself would drag dark streaks across the fill."""
        clean = values[is_ground]
        return np.where(is_ground, values, np.median(clean) if clean.size else 1.0)

    h, w = y1 - y0, x1 - x0
    vy = np.linspace(0, 1, h)[:, None]
    vx = np.linspace(0, 1, w)[None, :]
    top = edge(shade[y0 - 1, x0:x1], ground[y0 - 1, x0:x1])[None, :]
    bottom = edge(shade[y1, x0:x1], ground[y1, x0:x1])[None, :]
    left = edge(shade[y0:y1, x0 - 1], ground[y0:y1, x0 - 1])[:, None]
    right = edge(shade[y0:y1, x1], ground[y0:y1, x1])[:, None]

    vertical = top * (1 - vy) + bottom * vy
    horizontal = left * (1 - vx) + right * vx
    if axis == "x":
        shade[y0:y1, x0:x1] = horizontal
    elif axis == "y":
        shade[y0:y1, x0:x1] = vertical
    else:
        shade[y0:y1, x0:x1] = 0.5 * (vertical + horizontal)


def restyle(path: Path, bg: np.ndarray) -> Image.Image:
    rgb, ground, shade = split(path)
    h, w, _ = rgb.shape
    cfg = LAYOUT.get(path.name, LAYOUT["default"])

    # Wipe the old lockup: declare it ground so the gradient covers it, and
    # carry the surrounding shading across it so the box leaves no edge.
    for box in cfg["erase"]:
        fill_box(shade, ground, box)
        x0, y0, x1, y1 = box
        ground[y0:y1, x0:x1] = True

    # Push the art down to open a band for the badge.
    n = cfg["shift"]
    if n:
        src = cfg["shift_from"]
        for layer in (ground, shade):
            layer[src + n :] = layer[src : h - n]
        ground[src : src + n] = True
        shade[src : src + n] = 1.0

    rgb_shift = rgb
    if n:
        rgb_shift = rgb.copy()
        rgb_shift[cfg["shift_from"] + n :] = rgb[cfg["shift_from"] : h - n]

    # Ground becomes gradient carrying the old shading; content passes through.
    out = np.where(ground[..., None], bg * shade[..., None], rgb_shift)
    frame = Image.fromarray(np.clip(out, 0, 255).astype(np.uint8))
    return glass_badge(frame).convert("RGB")


def contact_sheet(slides: list[Image.Image], dst: Path) -> None:
    """Four-across proof sheet, so the whole deck can be read in one look."""
    tw, th, pad = 268, 335, 8
    cols = 4
    rows = -(-len(slides) // cols)
    sheet = Image.new(
        "RGB", (cols * tw + (cols + 1) * pad, rows * th + (rows + 1) * pad), (24, 26, 30)
    )
    for i, im in enumerate(slides):
        sheet.paste(
            im.resize((tw, th), Image.LANCZOS),
            (pad + (i % cols) * (tw + pad), pad + (i // cols) * (th + pad)),
        )
    sheet.save(dst / "_contact-sheet.png")


def main() -> int:
    if len(sys.argv) < 3:
        print(__doc__)
        return 2
    src, dst = Path(sys.argv[1]), Path(sys.argv[2])
    dst.mkdir(parents=True, exist_ok=True)

    slides = sorted(p for p in src.glob("*.png") if p.name[0].isdigit())
    if not slides:
        print(f"no numbered slides in {src}", file=sys.stderr)
        return 1

    w, h = Image.open(slides[0]).size
    bg = mesh(w, h)
    done = []
    for p in slides:
        frame = restyle(p, bg)
        frame.save(dst / p.name)
        done.append(frame)
        print(f"  {p.name}")
    contact_sheet(done, dst)

    caption = src / "caption.txt"
    if caption.exists():
        (dst / "caption.txt").write_text(caption.read_text())
    print(f"restyled {len(slides)} slides -> {dst}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
