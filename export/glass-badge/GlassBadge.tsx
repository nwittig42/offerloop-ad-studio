import React from 'react';

/**
 * The Offerloop glass badge: the loop mark floating inside a frosted disc.
 *
 * Self-contained, no dependencies beyond React. Every dimension scales off
 * `size`, so one component covers a 32px nav mark and a 400px hero.
 *
 * Use this rather than a PNG anywhere the badge sits on a real background.
 * `backdrop-filter` blurs whatever is painted behind the disc, which is the
 * entire effect: over the marketing site's gradient or a photo, the glass
 * actually samples it. A baked PNG can only ever carry the one background it
 * was rendered over.
 *
 * Needs `offerloop-icon.svg` served somewhere, passed as `src`.
 */

/** Every dimension as a fraction of the disc diameter. */
const R = {
  icon: 0.58,
  blur: 0.105,
  rim: 0.0224,
  shadowY: 0.097,
  shadowBlur: 0.216,
  shadowSpread: -0.06,
};

export type GlassBadgeProps = {
  /** Where `offerloop-icon.svg` is served from. */
  src?: string;
  /** Outer diameter in px. */
  size?: number;
  /** Below about 48px the knot needs more room; try 0.74. */
  iconFraction?: number;
  shadow?: boolean;
  /** Glass opacity. Raise it over busy backgrounds, lower it over flat ones. */
  veil?: number;
  className?: string;
  style?: React.CSSProperties;
  /** Set when the badge is decorative beside a wordmark, so it is not announced twice. */
  alt?: string;
};

export const GlassBadge: React.FC<GlassBadgeProps> = ({
  src = '/offerloop-icon.svg',
  size = 132,
  iconFraction = R.icon,
  shadow = true,
  veil = 0.36,
  className,
  style,
  alt = 'Offerloop',
}) => (
  <div
    className={className}
    style={{
      width: size,
      height: size,
      boxSizing: 'border-box',
      borderRadius: '50%',
      background: `rgba(255,255,255,${veil})`,
      backdropFilter: `blur(${size * R.blur}px) saturate(140%)`,
      WebkitBackdropFilter: `blur(${size * R.blur}px) saturate(140%)`,
      border: `${size * R.rim}px solid rgba(255,255,255,0.6)`,
      boxShadow: shadow
        ? `0 ${size * R.shadowY}px ${size * R.shadowBlur}px ${
            size * R.shadowSpread
          }px rgba(34,48,92,0.34)`
        : undefined,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 'none',
      ...style,
    }}
  >
    <img
      src={src}
      alt={alt}
      width={size * iconFraction}
      style={{width: size * iconFraction, height: 'auto', display: 'block'}}
    />
  </div>
);
