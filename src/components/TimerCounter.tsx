import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors, fonts} from '../../brand/theme';

/** Counting readout ("Hour 47") that races from → to over its overlay window. */
export const TimerCounter: React.FC<{
  prefix?: string;
  from: number;
  to: number;
  position?: 'center' | 'top' | 'bottom';
}> = ({prefix = '', from, to, position = 'top'}) => {
  const frame = useCurrentFrame();
  const {fps, width, height, durationInFrames} = useVideoConfig();
  const isVertical = height > width;
  const enter = spring({frame, fps, config: {damping: 200, stiffness: 120}});
  // Ease out so the count sprints early and settles on the final number.
  const n = Math.round(
    interpolate(frame, [0, durationInFrames * 0.85], [from, to], {
      easing: (t) => 1 - (1 - t) * (1 - t),
      extrapolateRight: 'clamp',
    }),
  );

  return (
    <AbsoluteFill
      style={{
        justifyContent:
          position === 'top' ? 'flex-start' : position === 'bottom' ? 'flex-end' : 'center',
        alignItems: 'center',
        paddingTop: position === 'top' ? height * 0.08 : undefined,
        paddingBottom: position === 'bottom' ? height * 0.12 : undefined,
      }}
    >
      <div
        style={{
          opacity: enter,
          display: 'flex',
          alignItems: 'baseline',
          gap: '0.35em',
          padding: '0.32em 0.85em',
          borderRadius: 999,
          background: 'rgba(17, 24, 43, 0.72)',
          fontFamily: fonts.heading,
          fontWeight: 700,
          fontSize: width * (isVertical ? 0.065 : 0.038),
          color: colors.white,
          fontVariantNumeric: 'tabular-nums',
          boxShadow: '0 4px 32px rgba(17, 47, 84, 0.35)',
        }}
      >
        {prefix ? <span style={{opacity: 0.75, fontWeight: 500}}>{prefix}</span> : null}
        <span>{n}</span>
      </div>
    </AbsoluteFill>
  );
};
