# Swipe hand

A ghost hand swiping. Self-contained, no dependencies beyond React.

## Files

- `SwipeHand.tsx` — the component
- `swipe-hand-ghost-alpha.png` — transparent version (use this one; works on any background)
- `swipe-hand-ghost-v2.png` — the original grey-on-white render, if you want the plate
- `preview.html` — open in a browser to see the motion, no build step

## Use

Copy `SwipeHand.tsx` into your components folder and the PNG into wherever your app serves static files.

```tsx
<SwipeHand src="/swipe-hand-ghost-alpha.png" />
<SwipeHand src="/swipe-hand-ghost-alpha.png" direction="left" size={320} travel={220} />
<SwipeHand src="/swipe-hand-ghost-alpha.png" once duration={1.2} opacity={0.5} />
```

Props: `src` (required), `size` (px, default 260), `direction` (`'right' | 'left'`), `travel` (px, default 180), `duration` (seconds per loop, default 1.6), `opacity` (default 0.62), `once`, `className`, `style`.

Position it with the wrapper: the component renders an inline-block span, so put it in a relative container and place that span wherever the gesture belongs.

One loop: fade in and settle, press dip, eased drag with the wrist trailing, lift and fade, pause. Honors `prefers-reduced-motion`.
