import React from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';
import {GlassBadge} from '../components/GlassBadge';

/**
 * Bakes the glass badge into a shippable raster. Three variants, because
 * `backdrop-filter` has no meaning in a standalone file and each use wants a
 * different answer to "blur what?":
 *
 * - `disc`  the badge alone, mesh baked into the glass, transparent outside
 *           the circle. The avatar / favicon / anywhere-round one.
 * - `tile`  a full-bleed mesh square with the badge centred and its shadow
 *           intact. App Store, Product Hunt, anywhere that wants a square.
 * - `alpha` the glass over nothing. Honest about the limitation: no backdrop
 *           to sample, so it reads as a flat translucent puck. Use it only
 *           when it will sit on a background too varied to bake.
 *
 * All three render at EXPORT_SIZE and the size ramp is produced by downscaling
 * (tools/glass-badge/bake.py). Re-rendering small would shrink the blur radius
 * with the disc and change the look; downscaling a big one keeps it.
 */

export const EXPORT_SIZE = 1024;

/**
 * Mesh scaled to cover a square, so the gradient is not squashed.
 *
 * `at` picks which band of the 1080x1350 mesh the square lands on, and it is
 * a real choice rather than a default: the mesh runs from a near-white hotspot
 * upper centre to a saturated blue along the bottom. Centre gives a pale disc
 * whose white rim disappears; bottom gives one with the rim and the glass both
 * reading. The tile keeps centre because the badge floats over it small and
 * the surround supplies the colour.
 */
const Mesh: React.FC<{at?: string}> = ({at = 'center'}) => (
  <Img
    src={staticFile('assets/carousels/_edits/mesh-1080x1350.png')}
    style={{
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: at,
    }}
  />
);

/**
 * Disc cropped to its own edge, so the shadow is switched off: it would fall
 * outside the circle and only show up as a dirty rim.
 */
export const GlassBadgeDisc: React.FC = () => (
  <AbsoluteFill>
    <AbsoluteFill style={{borderRadius: '50%', overflow: 'hidden'}}>
      <Mesh at="center bottom" />
    </AbsoluteFill>
    <GlassBadge size={EXPORT_SIZE} shadow={false} />
  </AbsoluteFill>
);

/** Square, mesh to the edges, badge at 72% so the shadow has room. */
export const GlassBadgeTile: React.FC = () => (
  <AbsoluteFill>
    <Mesh />
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
      <GlassBadge size={EXPORT_SIZE * 0.72} />
    </AbsoluteFill>
  </AbsoluteFill>
);

/**
 * The disc again, with the mark pushed out to 0.74 of the diameter. Feeds the
 * 32px and .ico bakes only: the default 0.58 leaves the knot too fine to read
 * at tab size. Nothing above 180px should use this one, where it looks cramped.
 */
export const GlassBadgeFavicon: React.FC = () => (
  <AbsoluteFill>
    <AbsoluteFill style={{borderRadius: '50%', overflow: 'hidden'}}>
      <Mesh at="center bottom" />
    </AbsoluteFill>
    <GlassBadge size={EXPORT_SIZE} shadow={false} iconFraction={0.74} />
  </AbsoluteFill>
);

/** No mesh. Renders on alpha, so backdrop-filter has nothing to blur. */
export const GlassBadgeAlpha: React.FC = () => (
  <AbsoluteFill>
    <GlassBadge size={EXPORT_SIZE} shadow={false} />
  </AbsoluteFill>
);

export const glassBadgeStills = [
  {id: 'GlassBadgeDisc', component: GlassBadgeDisc},
  {id: 'GlassBadgeTile', component: GlassBadgeTile},
  {id: 'GlassBadgeAlpha', component: GlassBadgeAlpha},
  {id: 'GlassBadgeFavicon', component: GlassBadgeFavicon},
] as const;
