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
  key-alpha.py <frames_dir> [--lo 40] [--hi 70] [--plate-frac 0]

  lo/hi  luma ramp in 0-255. At or below lo is fully transparent, at or above
         hi fully opaque, linear between. lo must sit above the brightest
         plate pixel (measure it - a "black" render often carries a faint
         floor; the yeti dance plate topped out at 39, though the drum plate
         is a true 0 and only reads 42 at the border where a tripod leg
         touches the edge, so measure background, not the whole ring).

  plate-frac  0 (default) forces every enclosed dark region opaque, which is
         right for a lone character. Set it when the subject encloses real
         background: the drum kit rings pockets of black between the shells
         and inside the stand tripods, and those must stay transparent while
         the mouth cavity and eye sockets stay solid. A hole at or above this
         fraction of untouched plate (luma <= PLATE_BLACK) is judged
         background; below it, a lit subject feature. On the drums at lo 40 /
         hi 70 the kit pockets ran 0.48 to 0.97 and the eyes, mouth and
         fist gap 0.00 to 0.08, so 0.3 splits them with room either side.
         Area does NOT split them - the camera pushes in, the eye sockets
         grow past the smallest kit pocket, and an area cut punches his eyes
         out on the back half of the clip.
"""
import sys
from multiprocessing import Pool
from pathlib import Path

from PIL import Image, ImageChops, ImageDraw, ImageMath

BG_MARK = 1  # scratch value the flood uses to mark reachable background
PLATE_BLACK = 4  # luma at or under this is untouched plate, not shadowed subject


def subject_holes(
    holes: Image.Image, luma: Image.Image, plate_frac: float
) -> Image.Image:
    """Drop the enclosed regions that are really background the subject rings.

    A pocket the drum kit encloses is the untouched plate, so nearly all of it
    sits at plate black; a dark subject feature the flood could not reach (the
    mouth cavity, an eye socket) is lit, so almost none of it does. Measure
    that fraction per region and keep only the lit ones. The test is against
    PLATE_BLACK rather than lo on purpose: lo is tuned for the alpha ramp and
    sits well above the plate, so measuring against it counts a shadowed eye
    socket as black and loses the separation.

    Components are walked with floodfill rather than a hand-rolled label pass
    so the per-pixel work stays in C: seek the next unvisited pixel in the raw
    bytes, flood it away, and diff to recover the component.
    """
    plate = luma.point(lambda v: 255 if v <= PLATE_BLACK else 0)
    work = holes.copy()
    keep = Image.new("L", holes.size, 0)
    width = holes.width
    while True:
        found = work.tobytes().find(b"\xff")
        if found < 0:
            return keep
        y, x = divmod(found, width)
        before = work.copy()
        ImageDraw.floodfill(work, (x, y), 0, thresh=0)
        component = ImageChops.difference(before, work)
        area = component.histogram()[255]
        black = ImageChops.multiply(component, plate).histogram()[255]
        if black / area < plate_frac:
            keep = ImageChops.lighter(keep, component)


def alpha_for(
    luma: Image.Image, lo: int, hi: int, plate_frac: float = 0.0
) -> Image.Image:
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
    if plate_frac:
        holes = subject_holes(holes, luma, plate_frac)

    return ImageChops.lighter(ramp, holes)


def unpremultiply(channel: Image.Image, alpha: Image.Image) -> Image.Image:
    """Divide the plate's black back out of a partially transparent edge pixel.

    Needs real per-pixel division across two images, so it goes through
    ImageMath - an 8-bit ImageChops.multiply cannot apply a factor above 1.

    Fully transparent pixels are forced to black rather than left to the
    division. A plate pixel that is dark but not zero (the yeti render carried
    a floor up to luma 39) divides by an alpha of zero, clamps to 255, and
    fills the transparent region with white. Nothing shows it while alpha is
    honoured, but 4:2:0 chroma subsampling averages that white into the
    subject's edge pixels, so a lossy encode grows a light halo.
    """
    return ImageMath.lambda_eval(
        lambda a: a["convert"](
            a["min"](a["float"](a["c"]) * 255 / a["max"](a["float"](a["a"]), 1), 255)
            * (a["float"](a["a"]) > 0),
            "L",
        ),
        c=channel,
        a=alpha,
    )


def key_frame(job: tuple[int, Path, int, int, float]) -> None:
    """Key one frame. Takes a tuple so it can be handed to a process pool."""
    n, path, lo, hi, plate_frac = job
    rgb = Image.open(path).convert("RGB")
    alpha = alpha_for(rgb.convert("L"), lo, hi, plate_frac)
    r, g, b = (unpremultiply(c, alpha) for c in rgb.split())
    Image.merge("RGBA", (r, g, b, alpha)).save(path.parent / f"out_{n:05d}.png")


def main() -> int:
    args = sys.argv[1:]
    if not args:
        print(__doc__)
        return 2

    frames_dir = Path(args[0])
    lo, hi, plate_frac = 40, 70, 0.0
    for i, a in enumerate(args):
        if a == "--lo":
            lo = int(args[i + 1])
        if a == "--hi":
            hi = int(args[i + 1])
        if a == "--plate-frac":
            plate_frac = float(args[i + 1])

    frames = sorted(frames_dir.glob("in_*.png"))
    if not frames:
        print(f"no in_*.png frames in {frames_dir}", file=sys.stderr)
        return 1

    # Frames are independent, and --plate-frac walks every enclosed region on
    # each one (hundreds on the drum kit, seconds a frame), so fan them out.
    jobs = [(n, path, lo, hi, plate_frac) for n, path in enumerate(frames, 1)]
    with Pool() as pool:
        for _ in pool.imap_unordered(key_frame, jobs):
            pass

    print(f"keyed {len(frames)} frames (lo={lo} hi={hi} plate_frac={plate_frac})")
    return 0


if __name__ == "__main__":
    sys.exit(main())
