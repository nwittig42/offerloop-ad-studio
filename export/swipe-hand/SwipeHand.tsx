import React from 'react';

/**
 * A ghost hand swiping, on its own. Nothing else.
 *
 * Drop this file and swipe-hand-ghost-v2.png into any React project. No
 * dependencies, no imports beyond React, no build config.
 *
 *   <SwipeHand src="/swipe-hand-ghost-v2.png" />
 *   <SwipeHand src="/swipe-hand-ghost-v2.png" direction="left" size={320} />
 *
 * One loop is: fade in and settle down, small press dip, eased drag with the
 * wrist trailing, lift and fade, then a pause before it repeats.
 */

export type SwipeHandProps = {
  /** Path to the hand PNG as your app serves it. */
  src: string;
  /** Hand width in px (height follows the image). */
  size?: number;
  /** Which way the swipe travels. */
  direction?: 'right' | 'left';
  /** Drag distance in px. */
  travel?: number;
  /** Seconds for one full loop, pause included. */
  duration?: number;
  /** Peak opacity of the ghost. */
  opacity?: number;
  /** Run once instead of looping. */
  once?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

const KEYFRAMES = `
@keyframes swipe-hand-gesture {
  0%   { opacity: 0; transform: translate3d(0, -26px, 0) rotate(0deg) scale(1.05); }
  16%  { opacity: var(--swipe-hand-opacity); transform: translate3d(0, 0, 0) rotate(0deg) scale(1); }
  24%  { opacity: var(--swipe-hand-opacity); transform: translate3d(0, 0, 0) rotate(0deg) scale(0.955); }
  62%  { opacity: var(--swipe-hand-opacity); transform: translate3d(var(--swipe-hand-travel), 0, 0) rotate(var(--swipe-hand-rotate)) scale(0.955); }
  74%  { opacity: 0; transform: translate3d(var(--swipe-hand-coast), -22px, 0) rotate(var(--swipe-hand-rotate)) scale(1.02); }
  100% { opacity: 0; transform: translate3d(var(--swipe-hand-coast), -22px, 0) rotate(var(--swipe-hand-rotate)) scale(1.02); }
}
@media (prefers-reduced-motion: reduce) {
  .swipe-hand-img { animation: none !important; opacity: var(--swipe-hand-opacity); }
}
`;

export const SwipeHand: React.FC<SwipeHandProps> = ({
  src,
  size = 260,
  direction = 'right',
  travel = 180,
  duration = 1.6,
  opacity = 0.62,
  once = false,
  className,
  style,
}) => {
  const sign = direction === 'right' ? 1 : -1;
  const vars = {
    '--swipe-hand-travel': `${sign * travel}px`,
    // Slight overshoot past the target on release.
    '--swipe-hand-coast': `${sign * travel * 1.12}px`,
    '--swipe-hand-rotate': `${sign * 7}deg`,
    '--swipe-hand-opacity': String(opacity),
  } as React.CSSProperties;

  return (
    <span
      className={className}
      style={{display: 'inline-block', lineHeight: 0, ...vars, ...style}}
    >
      <style>{KEYFRAMES}</style>
      <img
        className="swipe-hand-img"
        src={src}
        alt=""
        aria-hidden="true"
        style={{
          width: size,
          height: 'auto',
          display: 'block',
          opacity: 0,
          pointerEvents: 'none',
          userSelect: 'none',
          // The finger tip is the point the eye tracks, so pivot there.
          transformOrigin: '22% 18%',
          animation: `swipe-hand-gesture ${duration}s ${
            once ? '1' : 'infinite'
          } cubic-bezier(0.4, 0, 0.2, 1) both`,
        }}
      />
    </span>
  );
};

export default SwipeHand;
