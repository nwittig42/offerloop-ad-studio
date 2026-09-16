import React from 'react';
import {Img, staticFile} from 'remotion';

/**
 * The frosted glass badge: the Offerloop loop mark floating inside a
 * translucent disc. It is the mark top left on every ig-launch-v2 card and on
 * the brochure masthead.
 *
 * Everything scales off `size`, which is what the two hand-tuned copies in
 * CarouselCardFrame (132px) and Brochure (268px) do not do. Those were written
 * independently, and comparing them is what produced the ratios below: at a
 * 2.03x size ratio their rims, shadow offsets and icon fractions already agree
 * to within a pixel, so one proportional component reproduces both.
 *
 * The one thing size cannot fix: `backdrop-filter` blurs whatever is painted
 * behind this div. On the mesh that is the entire effect. Over nothing it
 * degrades to a flat 36% white puck, which is why the exported asset has to
 * bake a background in. See export/glass-badge/README.md.
 */

/** Every dimension as a fraction of the disc diameter. */
const R = {
  /** Mark width. The two copies use 0.58 and 0.6; the brochure's reads better. */
  icon: 0.58,
  /** backdrop-filter blur radius. From the brochure's 28 at 268. */
  blur: 0.105,
  /** Rim stroke. From 6 at 268 and 3 at 132, which agree. */
  rim: 0.0224,
  shadowY: 0.097,
  shadowBlur: 0.216,
  shadowSpread: -0.06,
};

export const GLASS_BADGE_RATIOS = R;

export const GlassBadge: React.FC<{
  size: number;
  /** Drop the shadow when the disc is cropped to its own edge, where it cannot show. */
  shadow?: boolean;
  /**
   * Override the mark's share of the diameter. Only the favicon bake uses it:
   * the loop mark is an intricate knot, and at 0.58 of 32px it is 18px of
   * three overlapping strokes, which resolves to mush. Optical sizing, the
   * same reason small type is set with looser tracking.
   */
  iconFraction?: number;
  style?: React.CSSProperties;
}> = ({size, shadow = true, iconFraction = R.icon, style}) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: '50%',
      background: 'rgba(255,255,255,0.36)',
      backdropFilter: `blur(${size * R.blur}px) saturate(140%)`,
      WebkitBackdropFilter: `blur(${size * R.blur}px) saturate(140%)`,
      border: `${size * R.rim}px solid rgba(255,255,255,0.6)`,
      boxShadow: shadow
        ? `0 ${size * R.shadowY}px ${size * R.shadowBlur}px ${
            size * R.shadowSpread
          }px rgba(34,48,92,0.34)`
        : undefined,
      // border-box, so `size` is the disc's outer diameter. The two older
      // copies leave this at content-box, which makes their real diameter
      // size + 2 * rim. Matters only if you compare renders pixel for pixel.
      boxSizing: 'border-box',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      ...style,
    }}
  >
    <Img
      src={staticFile('assets/figma/offerloop-icon.svg')}
      style={{width: size * iconFraction, height: 'auto'}}
    />
  </div>
);
