import React from 'react';
import {AbsoluteFill, OffthreadVideo, staticFile} from 'remotion';
import {CarouselCardFrame} from '../components/CarouselCardFrame';
import {SpinningClock} from '../components/SpinningClock';
import {fonts} from '../../brand/theme';
import {igLaunchV2Cards, type CardCopy} from '../../plans/ig-launch-v2.cards';

/**
 * Deck position 1: the desk timelapse plays full-bleed where the other cards
 * have the mesh ground, with the headline reversed out in white over it and a
 * clock turning behind the letters.
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
/**
 * The headline, fully present from frame 0.
 *
 * It used to pop in word by word and then drift, which is the usual answer to
 * type that would otherwise sit dead. Not here: this is deck position 1, and
 * Instagram takes a carousel's grid thumbnail from the first slide, so any
 * reveal means the thumbnail shows a half-written headline. Held still, frame
 * 0 is the finished card. The plate behind it is a timelapse with a clock
 * running, so the card is in no danger of feeling static.
 */
const Headline: React.FC<{lines: string[]; size: number}> = ({lines, size}) => (
  <div
    style={{
      fontFamily: fonts.heading,
      fontWeight: 700,
      fontSize: size,
      lineHeight: 1.12,
      letterSpacing: '-0.02em',
      color: '#FFFFFF',
      textAlign: 'center',
    }}
  >
    {lines.map((line) => (
      <div key={line}>{line}</div>
    ))}
  </div>
);

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
          <Headline lines={card.headline} size={card.size ?? 92} />
        ) : null}
      </AbsoluteFill>
    </CarouselCardFrame>
  );
};
