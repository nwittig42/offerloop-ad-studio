import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors, fonts} from '../../brand/theme';

/** Normalize a word for highlight matching (lowercase, strip surrounding punctuation). */
const norm = (w: string) => w.toLowerCase().replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, '');

const WORD_STAGGER_FRAMES = 3;

const TYPE_FRAMES_PER_CHAR = 3;

/** Fade the whole line out over the last N frames of its window. */
const EXIT_FRAMES = 10;

export const HookText: React.FC<{
  text: string;
  position?: 'center' | 'top' | 'bottom';
  color?: string;
  highlight?: string;
  highlightColor?: string;
  font?: 'heading' | 'body' | 'wordmark';
  wordByWord?: boolean;
  typewriter?: boolean;
  sizeScale?: number;
  offsetY?: number;
  /** Overlay window length; enables the exit fade. */
  durationInFrames?: number;
}> = ({
  text,
  position = 'center',
  color = colors.white,
  highlight,
  highlightColor = colors.primary,
  font = 'heading',
  wordByWord = false,
  typewriter = false,
  sizeScale = 1,
  offsetY = 0,
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const {fps, width, height} = useVideoConfig();
  const isVertical = height > width;
  const enter = spring({frame, fps, config: {damping: 200, stiffness: 120}});
  const exit =
    durationInFrames === undefined
      ? 1
      : interpolate(
          frame,
          [durationInFrames - EXIT_FRAMES, durationInFrames],
          [1, 0],
          {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
        );
  const y = interpolate(enter, [0, 1], [24, 0]);
  const words = text.split(' ');
  const highlightSet = new Set(
    (highlight ? highlight.split(' ') : []).map(norm).filter(Boolean),
  );
  const wordColor = (word: string) =>
    highlightSet.has(norm(word)) ? highlightColor : color;
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
          opacity: enter * exit,
          transform: `translateY(${y + offsetY}px)`,
          fontFamily: fonts[font],
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
          <span style={{whiteSpace: 'pre', color}}>{text.slice(0, typedChars)}</span>
        ) : (
          words.map((word, i) => {
            const pop = wordByWord
              ? spring({
                  frame: frame - i * WORD_STAGGER_FRAMES,
                  fps,
                  config: {damping: 200, stiffness: 140},
                })
              : 1;
            return (
              <span
                key={i}
                style={{
                  display: 'inline-block',
                  whiteSpace: 'pre',
                  color: wordColor(word),
                  opacity: Math.max(0, pop),
                  transform: `translateY(${(1 - Math.max(0, pop)) * 26}px)`,
                }}
              >
                {word + (i < words.length - 1 ? ' ' : '')}
              </span>
            );
          })
        )}
      </div>
    </AbsoluteFill>
  );
};
