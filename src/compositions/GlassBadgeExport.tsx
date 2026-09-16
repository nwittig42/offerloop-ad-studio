import React from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';
import {GlassBadge, GLASS_BADGE_RATIOS as R} from '../components/GlassBadge';

/**
 * Bakes the glass badge into a shippable raster. Four variants, because
 * `backdrop-filter` has no meaning in a standalone file and each use wants a
 * different answer to "blur what?":
 *
 * - `disc`  the badge alone, mesh baked into the glass, transparent outside
 *           the circle. The avatar / favicon / anywhere-round one.
 * - `tile`  a full-bleed mesh square with the badge centred and its shadow
 *           intact. App Store, Product Hunt, anywhere that wants a square.
 * - `float` the tile with the surround knocked out: same disc, same shadow,
 *           transparent everywhere else. Drops onto any layout.
 * - `alpha` the glass over nothing. Honest about the limitation: no backdrop
 *           to sample, so it reads as a flat translucent puck. Use it only
 *           when it will sit on a background too varied to bake.
 *
 * All of them render at EXPORT_SIZE and the size ramp is produced by downscaling
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
 * Badge and the mesh it samples, clipped together to the disc.
 *
 * The clip is why the mesh is full-bleed inside it rather than sized to the
 * disc: backdrop-filter's blur kernel reaches past the disc edge, and giving
 * it mesh out there rather than transparency is what keeps the rim clean.
 * The shadow is always off here, since it would fall outside the clip.
 */
const ClippedDisc: React.FC<{
  size: number;
  iconFraction?: number;
  /**
   * How big the mesh behind the glass is drawn, centred on the disc. Defaults
   * to the disc itself. `float` passes the full frame so that its glass samples
   * exactly the pixels the tile's glass does, which is what makes the two
   * discs identical rather than merely similar.
   */
  frame?: number;
  at?: string;
}> = ({size, iconFraction, frame = size, at = 'center bottom'}) => (
  <div
    style={{
      position: 'absolute',
      width: size,
      height: size,
      borderRadius: '50%',
      overflow: 'hidden',
    }}
  >
    <div
      style={{
        position: 'absolute',
        width: frame,
        height: frame,
        left: (size - frame) / 2,
        top: (size - frame) / 2,
      }}
    >
      <Mesh at={at} />
    </div>
    <GlassBadge size={size} shadow={false} iconFraction={iconFraction} />
  </div>
);

/** The disc filling the frame edge to edge. No room for a shadow, so none. */
export const GlassBadgeDisc: React.FC = () => (
  <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
    <ClippedDisc size={EXPORT_SIZE} />
  </AbsoluteFill>
);

/**
 * Disc diameter as a share of the frame, for the two variants that leave a
 * margin. 0.72 is what gives the shadow somewhere to land: it reaches about
 * 0.10 of the frame below the disc, inside the 0.14 margin this leaves.
 */
const TILE_DISC = 0.72;

/** Square, mesh to the edges, badge at 72% so the shadow has room. */
export const GlassBadgeTile: React.FC = () => (
  <AbsoluteFill>
    <Mesh />
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
      <GlassBadge size={EXPORT_SIZE * TILE_DISC} />
    </AbsoluteFill>
  </AbsoluteFill>
);

/**
 * The tile's disc with the mesh surround removed. Same 72% diameter and the
 * same shadow, so it drops into a layout at the same size the tile occupies,
 * but on transparency instead of blue.
 *
 * The shadow is drawn by its own empty circle sitting outside the clip, which
 * is the whole trick: in the tile it is painted onto the mesh and cannot be
 * separated from it, so here it is painted straight onto alpha instead.
 */
export const GlassBadgeFloat: React.FC = () => {
  const d = EXPORT_SIZE * TILE_DISC;
  return (
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
      <div
        style={{
          position: 'absolute',
          width: d,
          height: d,
          borderRadius: '50%',
          boxShadow: `0 ${d * R.shadowY}px ${d * R.shadowBlur}px ${
            d * R.shadowSpread
          }px rgba(34,48,92,0.34)`,
        }}
      />
      <ClippedDisc size={d} frame={EXPORT_SIZE} at="center" />
    </AbsoluteFill>
  );
};

/**
 * The disc again, with the mark pushed out to 0.74 of the diameter. Feeds the
 * 32px and .ico bakes only: the default 0.58 leaves the knot too fine to read
 * at tab size. Nothing above 180px should use this one, where it looks cramped.
 */
export const GlassBadgeFavicon: React.FC = () => (
  <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
    <ClippedDisc size={EXPORT_SIZE} iconFraction={0.74} />
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
  {id: 'GlassBadgeFloat', component: GlassBadgeFloat},
  {id: 'GlassBadgeFavicon', component: GlassBadgeFavicon},
] as const;
