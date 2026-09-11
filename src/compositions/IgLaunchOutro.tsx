import React from 'react';
import {AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {CarouselCardFrame} from '../components/CarouselCardFrame';
import {colors, fonts} from '../../brand/theme';

/**
 * The closing card: the lockup with a gleam crossing it, the line under it,
 * and the App Store download row.
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

/**
 * The Apple mark, from simple-icons' official path rather than drawn by hand.
 * It is a trademark and an approximation of it looks cheap, which is the whole
 * reason the package is a dependency for one 541-character string.
 */
const APPLE_PATH =
  'M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701';

const CTA_SIZE = 42;

/**
 * Download row. Set in the body sans rather than Lora: it is a call to action,
 * not editorial, and the deck already pairs Lora headlines with sans support
 * copy on the intro and apply cards.
 *
 * 'App Store' is two words and capitalised because Apple's trademark
 * guidelines require it. Nick wrote 'Appstore'.
 */
const AppStoreCta: React.FC = () => (
  <div style={{display: 'flex', alignItems: 'center', gap: 18}}>
    <svg
      width={CTA_SIZE * 1.08}
      height={CTA_SIZE * 1.08}
      viewBox="0 0 24 24"
      // The mark carries a leaf, so its mass sits low; nudging it up puts its
      // body on the text's optical centre instead of its bounding box.
      style={{display: 'block', marginTop: -CTA_SIZE * 0.08}}
    >
      <path d={APPLE_PATH} fill={colors.secondaryDark} />
    </svg>
    <div
      style={{
        fontFamily: fonts.body,
        fontWeight: 600,
        fontSize: CTA_SIZE,
        letterSpacing: '-0.01em',
        color: colors.secondaryDark,
      }}
    >
      Download on the App Store
    </div>
  </div>
);

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
        {/* Tagline and download row group together, tighter to each other
            than either is to the lockup. */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 36,
          }}
        >
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
          <AppStoreCta />
        </div>
      </AbsoluteFill>
    </CarouselCardFrame>
  );
};
