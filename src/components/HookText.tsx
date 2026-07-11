import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors, fonts} from '../../brand/theme';

export const HookText: React.FC<{
  text: string;
  position?: 'center' | 'top' | 'bottom';
  color?: string;
}> = ({text, position = 'center', color = colors.white}) => {
  const frame = useCurrentFrame();
  const {fps, width, height} = useVideoConfig();
  const isVertical = height > width;
  const enter = spring({frame, fps, config: {damping: 200, stiffness: 120}});
  const y = interpolate(enter, [0, 1], [24, 0]);

  return (
    <AbsoluteFill
      style={{
        justifyContent:
          position === 'top' ? 'flex-start' : position === 'bottom' ? 'flex-end' : 'center',
        alignItems: 'center',
        padding: width * 0.06,
        paddingTop: position === 'top' ? height * 0.1 : undefined,
        paddingBottom: position === 'bottom' ? height * 0.14 : undefined,
      }}
    >
      <div
        style={{
          opacity: enter,
          transform: `translateY(${y}px)`,
          fontFamily: fonts.heading,
          fontWeight: 700,
          fontSize: width * (isVertical ? 0.085 : 0.052),
          letterSpacing: '-0.02em',
          lineHeight: 1.15,
          color,
          textAlign: 'center',
          textShadow: '0 2px 24px rgba(17, 47, 84, 0.35)',
        }}
      >
        {text}
      </div>
    </AbsoluteFill>
  );
};
