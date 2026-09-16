"""Trace the Offerloop loop mark from PNG into a clean SVG.

Why this exists: the only copy of the mark in the repo is
public/assets/figma/offerloop-icon-trim.png at 122x122. Anything that renders
it larger than that goes soft, which rules out an App Store icon, a Product
Hunt logo, or a 1024px glass badge. No vector was ever exported from Figma
(and the Figma MCP is rate-limited, see CLAUDE.md), so the vector is recovered
from the raster instead.

Method: upsample the alpha channel 8x, Gaussian-blur it, then threshold.
Blurring first matters. potrace fits curves to whatever wobble survives the
threshold, and the 122px source has ragged antialiased edges, so tracing it
raw yields ~15KB of path chasing noise. Moving the smoothing into the alpha
ramp collapses the same shape to ~4KB while staying within 0.5% of the source
by area.

The gradient is not traced. It is recovered by least-squares fitting each
channel against x and y across every opaque pixel: the fit comes back with
dy ~= 0, so the mark is a purely horizontal ramp, and the fitted endpoints are
the two stops below.

Run:  .venv-key/bin/python tools/glass-badge/trace-icon.py
Needs: pip install potracer  (pure-python potrace, no system binary)

Writes the vector to both a committed home and the Remotion static dir, since
public/assets is gitignored.
"""

from PIL import Image, ImageFilter
import numpy as np
import potrace

SRC = 'public/assets/figma/offerloop-icon-trim.png'
DESTS = [
    'export/glass-badge/offerloop-icon.svg',
    'public/assets/figma/offerloop-icon.svg',
]

UP = 8          # upsample factor applied before thresholding
BLUR = 6.0      # Gaussian sigma in upsampled pixels; 6 keeps the arrowhead tip
TURDSIZE = 400  # drop specks; in upsampled space, so generous
OPTTOL = 0.8
VIEW = 1024     # emitted viewBox, square

# Fitted from the source's opaque pixels. dy came back at 0.001, hence x-only.
STOPS = ('#1C4097', '#22A8DE')


def main() -> None:
    im = Image.open(SRC).convert('RGBA')
    w, h = im.size
    alpha = im.split()[3].resize((w * UP, h * UP), Image.LANCZOS)
    ink = np.asarray(alpha.filter(ImageFilter.GaussianBlur(BLUR))) > 128

    bm = potrace.Bitmap(ink)
    # Bitmap() inverts whatever it is handed, on the assumption that True means
    # white paper. Ours means ink, so invert back before tracing.
    bm.invert()
    path = bm.trace(turdsize=TURDSIZE, alphamax=1.0, opttolerance=OPTTOL)

    # potrace works in upsampled pixel space; map that onto the viewBox.
    s = VIEW / (w * UP)
    pt = lambda p: f'{p.x * s:.1f},{p.y * s:.1f}'

    parts: list[str] = []
    for curve in path:
        parts.append(f'M{pt(curve.start_point)}')
        for seg in curve:
            if seg.is_corner:
                parts.append(f'L{pt(seg.c)}L{pt(seg.end_point)}')
            else:
                parts.append(f'C{pt(seg.c1)} {pt(seg.c2)} {pt(seg.end_point)}')
        parts.append('Z')
    d = ''.join(parts)

    svg = (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {VIEW} {VIEW}" '
        f'width="{VIEW}" height="{VIEW}">\n'
        f'  <defs>\n'
        f'    <linearGradient id="offerloopMark" x1="0" y1="0" x2="{VIEW}" y2="0" '
        f'gradientUnits="userSpaceOnUse">\n'
        f'      <stop offset="0" stop-color="{STOPS[0]}"/>\n'
        f'      <stop offset="1" stop-color="{STOPS[1]}"/>\n'
        f'    </linearGradient>\n'
        f'  </defs>\n'
        f'  <path fill="url(#offerloopMark)" fill-rule="evenodd" d="{d}"/>\n'
        f'</svg>\n'
    )

    ref = np.asarray(im.split()[3].resize((w * UP, h * UP), Image.LANCZOS)) > 128
    iou = (ref & ink).sum() / (ref | ink).sum()

    for dest in DESTS:
        with open(dest, 'w') as fh:
            fh.write(svg)
    print(f'{sum(1 for _ in path)} contours, {len(svg)} bytes, IoU {iou:.4f}')
    print('wrote ' + ', '.join(DESTS))


if __name__ == '__main__':
    main()
