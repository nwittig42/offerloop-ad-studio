import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors, fonts} from '../../brand/theme';

const WORD_STAGGER_FRAMES = 4;

const TYPE_FRAMES_PER_CHAR = 3;

export const HookText: React.FC<{
  text: string;
  position?: 'center' | 'top' | 'bottom';
  color?: string;
  wordByWord?: boolean;
  typewriter?: boolean;
  sizeScale?: number;
  offsetY?: number;
}> = ({
  text,
  position = 'center',
  color = colors.white,
  wordByWord = false,
  typewriter = false,
  sizeScale = 1,
  offsetY = 0,
}) => {
  const frame = useCurrentFrame();
  const {fps, width, height} = useVideoConfig();
  const isVertical = height > width;
  const enter = spring({frame, fps, config: {damping: 200, stiffness: 120}});
  const y = interpolate(enter, [0, 1], [24, 0]);
  const words = text.split(' ');
  const typedChars = Math.max(0, Math.floor(frame / TYPE_FRAMES_PER_CHAR));

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
          transform: `translateY(${y + offsetY}px)`,
          fontFamily: fonts.heading,
          fontWeight: 700,
          fontSize: width * (isVertical ? 0.085 : 0.052) * sizeScale,
          letterSpacing: '-0.02em',
          lineHeight: 1.15,
          color,
          textAlign: 'center',
          textShadow: '0 2px 24px rgba(17, 47, 84, 0.35)',
        }}
      >
        {typewriter ? (
          <span style={{whiteSpace: 'pre'}}>{text.slice(0, typedChars)}</span>
        ) : wordByWord
          ? words.map((word, i) => {
              const pop = spring({
                frame: frame - i * WORD_STAGGER_FRAMES,
                fps,
                config: {damping: 200, stiffness: 140},
              });
              return (
                <span
                  key={i}
                  style={{
                    display: 'inline-block',
                    whiteSpace: 'pre',
                    opacity: Math.max(0, pop),
                    transform: `translateY(${(1 - Math.max(0, pop)) * 26}px)`,
                  }}
                >
                  {word + (i < words.length - 1 ? ' ' : '')}
                </span>
              );
            })
          : text}
      </div>
    </AbsoluteFill>
  );
};
