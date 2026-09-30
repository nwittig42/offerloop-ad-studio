"""Rebuild the Offerloop wordmark lockup at high resolution without changing it.

The only copy is connect-grow-hire/src/assets/offerloop_logo2_trimmed.png at
526x129, and no larger original or vector exists anywhere on disk. Higgsfield's
image upscaler rejected it, so it is reconstructed locally, same idea as
tools/glass-badge/trace-icon.py:

- Shape: upsample the alpha channel, Gaussian-blur it, then run a narrow soft
  threshold. The blur absorbs the ragged antialiasing of the 129px source; the
  soft threshold gives crisp but antialiased edges at the new size.
- Color: every fill in the logo is a smooth gradient, so plain upsampling is
  already sharp enough. The one catch is that edge pixels carry background
  color, so colors are pushed outward with a premultiplied blur (rgb*a / a)
  before upsampling. Nothing is repainted or re-picked.

Run:  .venv-key/bin/python tools/logo-upscale.py
"""

from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter

SRC = Path.home() / 'Offerloop/Final_offerloop/connect-grow-hire/src/assets/offerloop_logo2_trimmed.png'
OUT = Path('export/offerloop-logo')
SCALES = (4, 8)
BLUR = 1.0    # Gaussian sigma in *source* pixels
SOFT = 0.09   # half-width of the threshold ramp, in alpha units (0..1)


def build(im: Image.Image, up: int) -> Image.Image:
    w, h = im.size
    W, H = w * up, h * up
    rgba = np.asarray(im, dtype=np.float32) / 255
    a = rgba[..., 3:4]

    # Color: take it only from solid interior pixels (edge pixels in the
    # source carry a dark fringe), then bleed it outward with a weighted blur.
    solid = (a > 0.85).astype(np.float32)
    wgt = Image.fromarray((solid[..., 0] * 255).astype(np.uint8), 'L')
    acc = np.zeros_like(rgba[..., :3])
    wsum = np.zeros_like(a)
    for r in (1, 2, 4):
        wb = np.asarray(wgt.filter(ImageFilter.GaussianBlur(r)), dtype=np.float32)[..., None] / 255
        cb = np.stack([np.asarray(Image.fromarray((rgba[..., c] * solid[..., 0] * 255).astype(np.uint8), 'L')
                                  .filter(ImageFilter.GaussianBlur(r)), dtype=np.float32) / 255 for c in range(3)], -1)
        take = (wsum < 1e-3) & (wb > 1e-3)
        acc = np.where(take, cb / np.maximum(wb, 1e-4), acc)
        wsum = np.where(take, 1.0, wsum)
    fill = np.where(solid > 0, rgba[..., :3], acc)
    fill_img = Image.fromarray((np.clip(fill, 0, 1) * 255).astype(np.uint8), 'RGB')
    color = np.asarray(fill_img.resize((W, H), Image.LANCZOS), dtype=np.float32) / 255

    # Shape: upsample alpha, smooth, soft-threshold at 50%.
    alpha = im.split()[3].resize((W, H), Image.BICUBIC)
    alpha = np.asarray(alpha.filter(ImageFilter.GaussianBlur(BLUR * up)), dtype=np.float32) / 255
    t = np.clip((alpha - 0.5) / (2 * SOFT) + 0.5, 0, 1)
    t = t * t * (3 - 2 * t)

    out = np.concatenate([color, t[..., None]], -1)
    return Image.fromarray((out * 255).round().astype(np.uint8), 'RGBA')


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    im = Image.open(SRC).convert('RGBA')
    for up in SCALES:
        big = build(im, up)
        big.save(OUT / f'offerloop-logo-{up}x.png', optimize=True)
        # Preview on white for eyeballing.
        bg = Image.new('RGBA', big.size, (255, 255, 255, 255))
        bg.alpha_composite(big)
        bg.convert('RGB').save(OUT / f'offerloop-logo-{up}x-on-white.png')
        print(up, big.size)


if __name__ == '__main__':
    main()
