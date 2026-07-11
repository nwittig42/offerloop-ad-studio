import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {colors, fonts, illustrations, logo} from '../../brand/theme';

export const EndCard: React.FC<{headline: string; cta: string; url?: string}> = ({
  headline,
  cta,
  url,
}) => {
  const frame = useCurrentFrame();
  const {fps, width, height} = useVideoConfig();
  const isVertical = height > width;
  const enter = spring({frame, fps, config: {damping: 200, stiffness: 100}});
  const ctaEnter = spring({frame: frame - Math.round(fps * 0.4), fps, config: {damping: 200}});
  const artRise = interpolate(enter, [0, 1], [height * 0.06, 0]);

  return (
    <AbsoluteFill style={{backgroundColor: colors.background}}>
      {/* Summit illustration anchored to the bottom */}
      <AbsoluteFill style={{justifyContent: 'flex-end', alignItems: 'center'}}>
        <Img
          src={staticFile(illustrations.scoutMountainSummit)}
          style={{
            width: isVertical ? width * 1.15 : width * 0.52,
            transform: `translateY(${artRise}px)`,
            opacity: enter,
          }}
        />
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          alignItems: 'center',
          paddingTop: height * (isVertical ? 0.12 : 0.1),
        }}
      >
        <Img
          src={staticFile(logo.wordmark)}
          style={{width: width * (isVertical ? 0.4 : 0.18), opacity: enter}}
        />
        <div
          style={{
            opacity: enter,
            fontFamily: fonts.heading,
            fontWeight: 700,
            fontSize: width * (isVertical ? 0.075 : 0.042),
            letterSpacing: '-0.02em',
            color: colors.secondaryDark,
            textAlign: 'center',
            maxWidth: width * (isVertical ? 0.9 : 0.6),
            lineHeight: 1.15,
            marginTop: height * 0.04,
          }}
        >
          {headline}
        </div>
        <div
          style={{
            opacity: Math.max(0, ctaEnter),
            transform: `scale(${0.9 + 0.1 * Math.max(0, ctaEnter)})`,
            backgroundColor: colors.primary,
            color: colors.white,
            fontFamily: fonts.body,
            fontWeight: 700,
            fontSize: width * (isVertical ? 0.042 : 0.022),
            padding: `${width * 0.012}px ${width * 0.035}px`,
            borderRadius: 999,
            marginTop: height * 0.045,
            boxShadow: '0 12px 32px rgba(74, 96, 168, 0.4)',
          }}
        >
          {cta}
        </div>
        {url ? (
          <div
            style={{
              opacity: Math.max(0, ctaEnter),
              fontFamily: fonts.body,
              fontSize: width * (isVertical ? 0.032 : 0.016),
              color: colors.primary,
              marginTop: height * 0.02,
            }}
          >
            {url}
          </div>
        ) : null}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
