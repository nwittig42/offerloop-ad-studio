---
name: ad-lighting
description: "Defines canvas, glow, and color-as-light treatment for Offerloop ad scenes, learned from Google's launch films. Use when designing or restyling any scene background, when UI footage looks flat or pasted-on, when the user asks for the cinematic/premium look, mentions glows, gradients, backgrounds, or dark mode scenes, or when writing Higgsfield prompts for UI-on-stage shots."
---

# Ad Lighting & Color

How Google lights product films (reference: `public/assets/references/google/`). Core move: **brand color is light, never paint.** Colors appear as blurred glows, gradient washes, and edge-lights — almost never as flat filled surfaces.

## The two canvases

Every scene sits on one of two canvases; a whole film usually commits to one and may flip once as a dramatic beat (AI Mode flips dark→light at its midpoint, and that flip is the film's only "cut"):

- **Charcoal dark** — near-black blue-gray (~#0A0E14). UI renders as dark-mode cards barely lighter than the canvas, separated by glow rather than borders.
- **Paper light** — white/off-white (#F8F8F6). UI renders as light cards with soft shadows.

Offerloop mapping (`brand/theme.ts`): light canvas = `background` #F5F6F8; dark canvas = deepen `secondaryDark` #1E2D4D toward ~#0D1424; glow hues = `primary` #4A60A8 and `secondaryLight` #B6C3E8 (Google uses its 4 brand hues; we have 2 blues — add a warm neutral if a scene needs a second temperature).

## Glow treatments

- **Aurora blobs (dark canvas):** 2–4 heavily blurred color blobs (blur radius ≈ 25–40% of frame width) drifting slowly behind and around the UI. They move continuously — a static glow reads as a stain. Remotion: radial gradients on huge divs with slow interpolated x/y, or `filter: blur()` on colored circles.
- **Edge wash (light canvas):** soft pastel gradient bleeding in from one or two frame edges (Google's deja-vu segment: rainbow wash from the left edge onto white). Keeps the center clean for content.
- **Element glow:** input pills and key chips get a gradient outline or under-glow (the "Ask AI Mode" bar glows in 4 colors when active). Reserve for the ONE interactive element the beat is about.

## UI-on-stage rules

- **Oversize the crop.** Never show a full screen at laptop scale — crop into the UI so its text is display-sized; the fragment fills 60–90% of frame width and may run off-frame. The camera drifts across it instead of cutting.
- Cards get rounded corners and float: soft shadow on light canvas, glow separation on dark.
- **Highlight inside the UI:** tint 1–3 query keywords in accent hues; put a translucent blue selection highlight behind the key sentence of an answer. This steers the eye without any extra chrome.
- Progressive text-shimmer on "thinking" states (loading bars shimmer in a gradient).

## Real footage

Anthem-style human shots are warm, natural, candid — window light, golden hour, laughing mid-action. Never sterile studio white. Screen glow on faces ties the human to the product.

## Anti-patterns

- Flat brand-color background fills behind UI (color must be light, not paint)
- Static glows (always drift)
- Full-screen UI at readable-but-small scale — if a phone viewer can't read it, crop tighter
- Hard borders/strokes to separate cards on the dark canvas — separation comes from glow and elevation
- More than ~2 glow hues in one scene
