import React from 'react';
import {
  AbsoluteFill,
  OffthreadVideo,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {CarouselCardFrame} from '../components/CarouselCardFrame';
import {SpinningClock} from '../components/SpinningClock';
import {fonts} from '../../brand/theme';
import {igLaunchV2Cards, type CardCopy} from '../../plans/ig-launch-v2.cards';

/**
 * The one motion card in ig-launch-v2 (deck position 2): the desk timelapse
 * plays full-bleed where the other cards have the mesh ground, with the
 * headline reversed out in white and popped in word by word.
 *
 * Copy still comes from plans/ig-launch-v2.cards.ts, and the chrome still
 * comes from CarouselCardFrame, so the badge top left and the white lockup and
 * arrow along the bottom are identical to the stills either side of it.
 *
 * Type is Lora like every other headline in the deck, just white instead of
 * secondaryDark. No shadow or outline on it: per the ad-typography skill,
 * separation comes from canvas contrast, which is what SCRIM is for.
 */

/**
 * The plate runs bright afternoon to night, so white type over the raw footage
 * would wash out in the first second and the white lockup with it. A navy veil
 * (the deck's own secondaryDark, so the card still reads as part of the deck)
 * holds contrast across the whole arc, deepened top and bottom where the badge
 * and the footer sit.
 */
const SCRIM = {
  veil: 'rgba(30,45,77,0.46)',
  gradient:
    'linear-gradient(to bottom, rgba(16,24,44,0.58) 0%, rgba(16,24,44,0) 26%, rgba(16,24,44,0) 62%, rgba(16,24,44,0.66) 100%)',
};

const BAND = {top: 180, bottom: 210};
/**
 * Clock diameter. Sized to sit behind both headline lines and overhang them
 * slightly, so it reads as a face the words are set over rather than a ring
 * framing them.
 */
const CLOCK = 660;
/** Frames between word pops, and the spring each word rides in on. */
const WORD_STAGGER = 4;
const WORD_DELAY = 8;

const Word: React.FC<{text: string; index: number}> = ({text, index}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const local = frame - (WORD_DELAY + index * WORD_STAGGER);
  // Slight overshoot, so each word lands rather than fades up.
  const pop = spring({
    frame: local,
    fps,
    config: {damping: 13, mass: 0.5, stiffness: 120},
    durationInFrames: 22,
  });
  const opacity = interpolate(local, [0, 5], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return (
    <span
      style={{
        display: 'inline-block',
        opacity,
        transform: `translateY(${(1 - pop) * 26}px) scale(${0.88 + pop * 0.12})`,
      }}
    >
      {text}
    </span>
  );
};

const KineticHeadline: React.FC<{lines: string[]; size: number}> = ({lines, size}) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  // Once the last word has landed the line would sit dead for ~4s, which the
  // ad-typography skill warns against, so the whole block keeps drifting up a
  // few px for the rest of the card.
  const drift = interpolate(frame, [0, durationInFrames], [0, -12]);
  // Word index has to run across lines, not restart per line, or the second
  // line pops before the first finishes.
  let wordIndex = 0;
  return (
    <div
      style={{
        fontFamily: fonts.heading,
        fontWeight: 700,
        fontSize: size,
        lineHeight: 1.12,
        letterSpacing: '-0.02em',
        color: '#FFFFFF',
        textAlign: 'center',
        transform: `translateY(${drift}px)`,
      }}
    >
      {lines.map((line) => {
        const words = line.split(' ');
        return (
          <div key={line}>
            {words.map((word, i) => (
              <React.Fragment key={word}>
                <Word text={word} index={wordIndex++} />
                {/* Between words only. A trailing space counts toward the line
                    box and pulls centred text off centre by half a space. */}
                {i < words.length - 1 ? ' ' : null}
              </React.Fragment>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export const IgLaunchHookCard: React.FC<{index?: number}> = ({index = 0}) => {
  const card: CardCopy = igLaunchV2Cards[index] ?? igLaunchV2Cards[0];
  const src = card.video?.src;
  return (
    <CarouselCardFrame
      ground={
        <AbsoluteFill>
          {src ? (
            <OffthreadVideo
              src={staticFile(src)}
              muted
              style={{width: '100%', height: '100%', objectFit: 'cover'}}
            />
          ) : null}
          <AbsoluteFill style={{backgroundColor: SCRIM.veil}} />
          <AbsoluteFill style={{background: SCRIM.gradient}} />
        </AbsoluteFill>
      }
    >
      <AbsoluteFill
        style={{
          top: BAND.top,
          bottom: BAND.bottom,
          height: 'auto',
          paddingLeft: 90,
          paddingRight: 90,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Behind the letters, centred on the type block rather than the
            frame, so it stays put if the band moves. */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
          }}
        >
          <SpinningClock size={CLOCK} />
        </div>
        {card.headline ? (
          <KineticHeadline lines={card.headline} size={card.size ?? 92} />
        ) : null}
      </AbsoluteFill>
    </CarouselCardFrame>
  );
};
