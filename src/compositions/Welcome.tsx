import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors, fonts} from '../../brand/theme';

// Placeholder composition shown in every slot until real edit plans exist.
export const Welcome: React.FC = () => {
  const frame = useCurrentFrame();
  const {width, height} = useVideoConfig();
  const opacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const isVertical = height > width;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.secondaryDark,
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: fonts.heading,
        padding: 80,
      }}
    >
      <div style={{opacity, textAlign: 'center'}}>
        <div
          style={{
            fontSize: isVertical ? 72 : 96,
            fontWeight: 800,
            color: colors.white,
          }}
        >
          Offerloop Ad Studio
        </div>
        <div
          style={{
            fontSize: isVertical ? 36 : 44,
            marginTop: 24,
            color: colors.secondaryLight,
          }}
        >
          {width}×{height} — waiting for its edit plan
        </div>
      </div>
    </AbsoluteFill>
  );
};
