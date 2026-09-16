"""Turn the five glass badge renders into the shipping size ramp.

Both halves run together:  npm run badge:bake

That renders the five squares at EXPORT_SIZE into out/glass-badge/, which is
gitignored because they are intermediates, then runs this script to write the
shipping ramp into export/glass-badge/.

Sizes come from downscaling rather than from more compositions on purpose. The
disc's blur radius is a fraction of its diameter, so a natively rendered 32px
badge would carry a 3px blur and stop looking like the 1024px one. Downscaling
a single large render keeps every size the same object.
"""

from PIL import Image

RAW = 'out/glass-badge/{}.png'
OUT = 'export/glass-badge/offerloop-badge-{}-{}.png'

# Which sizes each variant earns. The disc carries the full ramp because it is
# the one that ends up as an avatar and a favicon; the other two are only ever
# placed large.
RAMP = {
    'Disc': ('disc', [1024, 512, 256, 180]),
    'Tile': ('tile', [1024, 512]),
    'Float': ('float', [1024, 512, 256]),
    'Alpha': ('alpha', [1024, 512]),
    'Favicon': ('favicon', [32]),
}

# Multi-resolution .ico, built from the tighter favicon render rather than the
# disc. It stops at 64: .ico is the legacy path, everything modern reaches for
# the PNGs, and carrying 128 and 256 in here tripled the file for nothing.
ICO = 'export/glass-badge/favicon.ico'
ICO_SRC = 'Favicon'
ICO_SIZES = [16, 32, 48, 64]


def main() -> None:
    written = []
    for render, (slug, sizes) in RAMP.items():
        src = Image.open(RAW.format(render)).convert('RGBA')
        for size in sizes:
            dest = OUT.format(slug, size)
            src.resize((size, size), Image.LANCZOS).save(dest, optimize=True)
            written.append(dest)

    ico = Image.open(RAW.format(ICO_SRC)).convert('RGBA')
    ico.save(ICO, sizes=[(s, s) for s in ICO_SIZES])
    written.append(ICO)

    for path in written:
        print(path)


if __name__ == '__main__':
    main()
