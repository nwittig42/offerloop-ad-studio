# Offerloop glass badge

The loop mark floating inside a frosted disc. It is the badge top left on every
ig-launch carousel card and on the brochure masthead, pulled out of those two
compositions and made into something you can hand to a website, an app store,
or a social profile.

## Files

- `offerloop-icon.svg` — the loop mark as vector. **The only vector of the mark
  that exists.** Use it anywhere the badge is not wanted.
- `GlassBadge.tsx` — the component. Plain React, no Remotion, no dependencies.
  Use this on the web, not a PNG.
- `preview.html` — open in a browser. Shows the badge over four backgrounds and
  at four sizes, no build step.
- `offerloop-badge-disc-*.png` — the badge alone, transparent outside the
  circle, 1024 / 512 / 256 / 180.
- `offerloop-badge-tile-*.png` — full-bleed square, badge centred, shadow
  intact, 1024 / 512.
- `offerloop-badge-alpha-*.png` — the glass over nothing, 1024 / 512. Read the
  warning below before reaching for it.
- `offerloop-badge-favicon-32.png`, `favicon.ico` — tab sizes, mark set larger.

## Which one

| Use | File |
| --- | --- |
| App Store, Product Hunt, anywhere square | `tile-1024` |
| X / LinkedIn / Slack avatar | `disc-1024` |
| apple-touch-icon | `disc-180` |
| Browser tab | `favicon.ico` plus `favicon-32` |
| Website, app, anything live | `GlassBadge.tsx` |
| Print, or the mark without the disc | `offerloop-icon.svg` |

## The thing to understand

The disc is glass because of `backdrop-filter`, which blurs whatever is painted
behind it. That is the whole effect and it is why the badge picks up the colour
of the mesh on the carousels.

A PNG has no behind. So every baked file here had to answer "blur what?" and
each answers it differently:

- **disc** and **tile** bake the carousel mesh in. Self-contained, and they look
  exactly like the carousels, but they carry that blue with them.
- **alpha** has nothing behind it, so the glass collapses into a flat 36% white
  puck with a rim. It is not a bug and it is not fixable in a raster. Use it
  only when the badge has to sit on a background too varied to bake, and expect
  it to read as a white disc rather than as glass.

Anywhere the badge sits on a live surface, use the component instead and let it
sample a real background.

## Component

Copy `GlassBadge.tsx` into your components folder and serve
`offerloop-icon.svg` from your static directory.

```tsx
<GlassBadge src="/offerloop-icon.svg" />
<GlassBadge src="/offerloop-icon.svg" size={220} />
<GlassBadge src="/offerloop-icon.svg" size={40} iconFraction={0.74} shadow={false} />
<GlassBadge src="/offerloop-icon.svg" veil={0.55} />   // over a photo
```

Props: `src`, `size` (px, default 132), `iconFraction` (default 0.58), `shadow`,
`veil` (glass opacity, default 0.36), `className`, `style`, `alt`.

Two things the preview page will show you faster than this will:

- Over a **busy or saturated background**, raise `veil` to about 0.5. The
  default lets too much through and the mark loses contrast.
- Over **dark**, the default survives but goes muddy: the navy half of the mark
  competes with a dark disc. Push `veil` to about 0.8, which turns the glass
  back into a light plate and restores the contrast.

## Regenerating

```
npm run badge:trace   # PNG mark -> offerloop-icon.svg
npm run badge:bake    # four Remotion stills -> the PNG ramp and the .ico
```

`badge:trace` needs `potracer` in the venv (`.venv-key/bin/pip install
potracer`). It only needs re-running if a better raster of the mark appears, or
if a real vector ever lands and you want to retire the trace.

## Provenance, and the caveat that comes with it

`offerloop-icon.svg` is **traced**, not exported. No vector of the mark exists
in the Figma file, and the Figma MCP is rate-limited (see CLAUDE.md), so the
only source was `public/assets/figma/offerloop-icon-trim.png` at 122 x 122.
`tools/glass-badge/trace-icon.py` recovers the outline with potrace and the
gradient by least-squares fitting the source's opaque pixels; the result sits
within 0.5% of the source by area.

Practically it is indistinguishable, and it is a large improvement on
upscaling a 122px PNG. But it is a reconstruction. If the real vector turns up,
re-export from it and everything downstream picks the change up on the next
`npm run badge:bake`.

Two known limits:

- The mark is an intricate knot. At 16px it is a blue smudge. The favicon
  render sets it at 0.74 of the disc instead of 0.58 to buy back what it can,
  and that is as far as optical sizing goes without simplifying the mark
  itself, which would be a design decision rather than a production one.
- The gradient stops (`#1C4097` to `#22A8DE`) are fitted from a 122px raster,
  so they are close rather than authoritative. If brand has real hex values,
  put them in `trace-icon.py` under `STOPS`.
