import React from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';

/**
 * The chrome every ig-launch-v2 card shares: the blue mesh ground, the frosted
 * badge top left, and the white lockup with its keep-swiping arrow along the
 * bottom.
 *
 * The ground is the PNG dumped by `restyle.py --bg`, not a CSS gradient, so
 * these cards sit on exactly the same mesh as the restyled deck rather than an
 * approximation of it. The badge is CSS rather than a baked image because
 * backdrop-filter can actually sample the mesh behind it, which is what sells
 * the glass.
 */

export const CARD_W = 1080;
export const CARD_H = 1350;

/**
 * Nick asks for red on some cards. There is no red anywhere in the brand
 * palette, so it lives here beside the other carousel constants rather than
 * being promoted into brand/theme.ts, which would make it look like a brand
 * colour. Two cards use it, so it is shared rather than copied.
 */
export const CAROUSEL_RED = '#D92D20';

const BADGE = {size: 132, x: 64, y: 52, icon: 0.6};
const FOOT_Y = 1254;
const FOOT_W = 220;
const ARROW = {gap: 44, len: 86, weight: 5, head: 18, spread: 14};

export const CarouselGround: React.FC = () => (
  <Img
    src={staticFile('assets/carousels/_edits/mesh-1080x1350.png')}
    style={{position: 'absolute', inset: 0, width: '100%', height: '100%'}}
  />
);

const Badge: React.FC = () => (
  <div
    style={{
      position: 'absolute',
      left: BADGE.x,
      top: BADGE.y,
      width: BADGE.size,
      height: BADGE.size,
      borderRadius: '50%',
      background: 'rgba(255,255,255,0.36)',
      backdropFilter: 'blur(16px) saturate(140%)',
      WebkitBackdropFilter: 'blur(16px) saturate(140%)',
      border: '3px solid rgba(255,255,255,0.6)',
      boxShadow: '0 12px 26px -8px rgba(34,48,92,0.34)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Img
      src={staticFile('assets/figma/offerloop-icon-trim.png')}
      style={{width: BADGE.size * BADGE.icon, height: 'auto'}}
    />
  </div>
);

/** The lockup filled white, at a given width. */
export const WhiteLockup: React.FC<{width: number}> = ({width}) => (
  <Img
    src={staticFile('assets/figma/offerloop-lockup-trim.png')}
    style={{
      width,
      height: 'auto',
      // The export is navy and blue on alpha; crushing it to black and
      // inverting gives a clean white silhouette with the counters intact.
      filter: 'brightness(0) invert(1)',
    }}
  />
);

const Arrow: React.FC = () => {
  const h = ARROW.spread * 2 + ARROW.weight * 2;
  const mid = h / 2;
  const tip = ARROW.len - ARROW.weight / 2;
  return (
    <svg width={ARROW.len} height={h} style={{overflow: 'visible'}}>
      <g
        stroke="#FFFFFF"
        strokeWidth={ARROW.weight}
        strokeLinecap="round"
        fill="none"
      >
        <line x1={ARROW.weight / 2} y1={mid} x2={tip} y2={mid} />
        <path
          d={`M${tip - ARROW.head} ${mid - ARROW.spread} L${tip} ${mid} L${
            tip - ARROW.head
          } ${mid + ARROW.spread}`}
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};

/**
 * The footer group: lockup centred on the frame with the arrow hanging off to
 * its right, the way the reference cover does it. `arrow` is off on the last
 * card, which has nothing left to swipe to.
 */
export const CarouselFooter: React.FC<{arrow?: boolean}> = ({arrow = true}) => (
  <div
    style={{
      position: 'absolute',
      left: 0,
      right: 0,
      top: FOOT_Y,
      transform: 'translateY(-50%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <WhiteLockup width={FOOT_W} />
    {arrow ? (
      <div style={{position: 'absolute', left: (CARD_W + FOOT_W) / 2 + ARROW.gap}}>
        <Arrow />
      </div>
    ) : null}
  </div>
);

export const CarouselCardFrame: React.FC<{
  children?: React.ReactNode;
  arrow?: boolean;
  badge?: boolean;
  /**
   * Stands in for the mesh ground — a video plate, say. The badge and footer
   * still render on top, so a motion card keeps the chrome the stills have.
   */
  ground?: React.ReactNode;
}> = ({children, arrow = true, badge = true, ground}) => (
  <AbsoluteFill>
    {ground ?? <CarouselGround />}
    {badge ? <Badge /> : null}
    {children}
    <CarouselFooter arrow={arrow} />
  </AbsoluteFill>
);
