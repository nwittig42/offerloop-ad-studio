import React from 'react';
import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';

/**
 * A translucent grey clock face with its hands whipping round, built to sit
 * BEHIND type as a watermark rather than beside it as an illustration.
 *
 * Everything is alpha-light on purpose: over a dark plate this reads as grey
 * glass, and white type stays legible straight through it. Hands carry a
 * little more alpha than the face so the movement is what you notice.
 *
 * Rotation counts are per-card, not per-second, so the whole spin is framed by
 * the composition's own length: the hands always complete the same arc however
 * long the card runs. Speeds are deliberately unreal (a minute hand lapping
 * twice while the hour hand barely moves is not a clock, it is the feeling of
 * losing an afternoon), which is the point.
 *
 * Fast hands need a fake smear, because Remotion renders discrete frames with
 * no motion blur: past a certain rotation per frame a bare hand stops reading
 * as speed and starts strobing, and at a whole tick per frame it can look
 * static or run backwards, the wagon-wheel effect. So each moving hand trails
 * a filled wedge swept back from its current angle. A wedge rather than a rake
 * of ghost copies, which stays visibly separate lines and reads as a
 * starburst; and its length comes from the hand's own degrees-per-frame, so
 * the blur is as long as the movement actually is.
 */

const GREY = {
  face: 'rgba(214,219,230,0.13)',
  tick: 'rgba(220,225,236,0.17)',
  hand: 'rgba(228,232,242,0.30)',
  smear: 'rgba(228,232,242,0.16)',
};

/** Turns completed over the full composition. */
const TURNS = {hour: 0.6, minute: 2, second: 5};
/** Smear length as a multiple of one frame's rotation. */
const SMEAR_FRAMES = 1.8;

/** Point on a circle, measuring clockwise from 12 o'clock. */
const onCircle = (c: number, radius: number, deg: number) => {
  const rad = (deg * Math.PI) / 180;
  return [c + radius * Math.sin(rad), c - radius * Math.cos(rad)];
};

const Hand: React.FC<{
  turns: number;
  length: number;
  weight: number;
  c: number;
  /** Trail a swept wedge. Off for the near-static hour hand. */
  smear?: boolean;
}> = ({turns, length, weight, c, smear = true}) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const deg = interpolate(frame, [0, durationInFrames], [0, turns * 360]);
  const perFrame = (turns * 360) / durationInFrames;
  const spread = perFrame * SMEAR_FRAMES;
  const [x1, y1] = onCircle(c, length, deg - spread);
  const [x2, y2] = onCircle(c, length, deg);
  return (
    <g>
      {smear && spread > 0.5 ? (
        // Sector from where the hand was to where it is. sweep-flag 1 is
        // clockwise, which is the direction deg increases in.
        <path
          d={`M${c} ${c} L${x1} ${y1} A${length} ${length} 0 0 1 ${x2} ${y2} Z`}
          fill={GREY.smear}
        />
      ) : null}
      <line
        x1={c}
        y1={c}
        x2={c}
        y2={c - length}
        stroke={GREY.hand}
        strokeWidth={weight}
        strokeLinecap="round"
        transform={`rotate(${deg} ${c} ${c})`}
      />
    </g>
  );
};

export const SpinningClock: React.FC<{
  /** Diameter in px. */
  size: number;
}> = ({size}) => {
  const c = size / 2;
  const r = c - size * 0.03;
  const ring = Math.max(3, size * 0.012);
  return (
    <svg width={size} height={size} style={{display: 'block', overflow: 'visible'}}>
      <circle cx={c} cy={c} r={r} fill="none" stroke={GREY.face} strokeWidth={ring} />
      {/* Twelve ticks, the quarters longer — enough to read as a clock face
          without becoming a detailed illustration behind the words. */}
      {Array.from({length: 12}, (_, i) => {
        const quarter = i % 3 === 0;
        const len = r * (quarter ? 0.13 : 0.075);
        return (
          <line
            key={i}
            x1={c}
            y1={c - r + ring / 2}
            x2={c}
            y2={c - r + ring / 2 + len}
            stroke={GREY.tick}
            strokeWidth={quarter ? ring * 1.15 : ring * 0.7}
            strokeLinecap="round"
            transform={`rotate(${i * 30} ${c} ${c})`}
          />
        );
      })}
      <Hand turns={TURNS.hour} length={r * 0.5} weight={ring * 2.1} c={c} smear={false} />
      <Hand turns={TURNS.minute} length={r * 0.72} weight={ring * 1.45} c={c} />
      <Hand turns={TURNS.second} length={r * 0.8} weight={ring * 0.8} c={c} />
      <circle cx={c} cy={c} r={ring * 1.5} fill={GREY.hand} />
    </svg>
  );
};
