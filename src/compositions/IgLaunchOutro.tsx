import React from 'react';
import {AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {CarouselCardFrame} from '../components/CarouselCardFrame';
import {colors, fonts} from '../../brand/theme';

/**
 * The closing card: the lockup with a gleam crossing it, and the line under
 * it.
 *
 * This replaced the spinning icon mark. The lockup is the hero here, so the
 * frame's own footer lockup is switched off rather than printing a second one
 * below it. The badge stays, so the icon is top left as on every other card.
 *
 * The lockup sits in its native navy and blue, not the white the footer uses.
 * A gleam is a bright streak, and on a white mark there is nothing brighter
 * for it to be: the effect only reads against a dark glyph.
 */

export const igLaunchOutroFps = 30;
export const igLaunchOutroDurationInFrames = 120; // 4s

const LOCKUP = 'assets/figma/offerloop-lockup-trim.png';
/** The export is 526x129. */
const LOCKUP_W = 720;
const LOCKUP_H = Math.round((LOCKUP_W * 129) / 526);

/**
 * The sweep runs f14 to f66 and is clear of the mark at both ends of the
 * composition, so the Instagram loop shows one clean pass per cycle rather
 * than a streak parked mid-glyph at the cut.
 */
const GLEAM = {from: 14, to: 66, width: 26};

const Gleam: React.FC = () => {
  const frame = useCurrentFrame();
  // Travels from fully left of the mark to fully right of it.
  const x = interpolate(frame, [GLEAM.from, GLEAM.to], [-GLEAM.width - 10, 110], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        // Masked by the lockup's own alpha, so the streak only lights the
        // glyphs and never crosses the space between them as a visible band.
        WebkitMaskImage: `url("${staticFile(LOCKUP)}")`,
        maskImage: `url("${staticFile(LOCKUP)}")`,
        WebkitMaskSize: '100% 100%',
        maskSize: '100% 100%',
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
      }}
    >
      <div
        style={{
          position: 'absolute',
          // Overhangs vertically so the skew cannot expose a corner.
          top: '-40%',
          bottom: '-40%',
          left: `${x}%`,
          width: `${GLEAM.width}%`,
          background:
            'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.96) 50%, rgba(255,255,255,0) 100%)',
          transform: 'skewX(-16deg)',
        }}
      />
    </div>
  );
};

export const IgLaunchOutro: React.FC = () => {
  return (
    // Badge on, so the icon sits top left like every other card. Arrow off
    // (nothing left to swipe to) and footer off, because this card is the
    // lockup and the footer would print a second one below it.
    <CarouselCardFrame arrow={false} footer={false}>
      <AbsoluteFill
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: 54,
          // Barely lifted. The other cards need a big lift to clear the
          // footer lockup, but this one switches the footer off, so a large
          // one just leaves the whole lower half of the card empty.
          paddingBottom: 24,
        }}
      >
        <div
          style={{
            position: 'relative',
            width: LOCKUP_W,
            height: LOCKUP_H,
            filter: 'drop-shadow(0 16px 30px rgba(30,45,77,0.20))',
          }}
        >
          <Img src={staticFile(LOCKUP)} style={{width: '100%', height: '100%'}} />
          <Gleam />
        </div>
        <div
          style={{
            fontFamily: fonts.heading,
            fontWeight: 700,
            fontSize: 70,
            letterSpacing: '-0.02em',
            color: colors.secondaryDark,
            textAlign: 'center',
          }}
        >
          A New Way To Job Search
        </div>
      </AbsoluteFill>
    </CarouselCardFrame>
  );
};
