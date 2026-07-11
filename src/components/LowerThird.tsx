import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors, fonts} from '../../brand/theme';

export const LowerThird: React.FC<{title: string; subtitle?: string}> = ({title, subtitle}) => {
  const frame = useCurrentFrame();
  const {fps, width, height} = useVideoConfig();
  const isVertical = height > width;
  const enter = spring({frame, fps, config: {damping: 200}});
  const x = interpolate(enter, [0, 1], [-40, 0]);

  return (
    <AbsoluteFill style={{justifyContent: 'flex-end', alignItems: 'flex-start'}}>
      <div
        style={{
          opacity: enter,
          transform: `translateX(${x}px)`,
          marginLeft: width * 0.05,
          marginBottom: height * (isVertical ? 0.24 : 0.1),
          backgroundColor: colors.background,
          borderLeft: `${Math.max(4, width * 0.005)}px solid ${colors.primary}`,
          borderRadius: width * 0.006,
          padding: `${width * 0.012}px ${width * 0.022}px`,
          boxShadow: '0 8px 24px rgba(17, 47, 84, 0.18)',
        }}
      >
        <div
          style={{
            fontFamily: fonts.heading,
            fontWeight: 700,
            fontSize: width * (isVertical ? 0.042 : 0.024),
            color: colors.secondaryDark,
          }}
        >
          {title}
        </div>
        {subtitle ? (
          <div
            style={{
              fontFamily: fonts.body,
              fontSize: width * (isVertical ? 0.03 : 0.016),
              color: colors.primary,
              marginTop: 4,
            }}
          >
            {subtitle}
          </div>
        ) : null}
      </div>
    </AbsoluteFill>
  );
};
