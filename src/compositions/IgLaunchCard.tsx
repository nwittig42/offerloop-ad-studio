import React from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';
import {CarouselCardFrame} from '../components/CarouselCardFrame';
import {colors, fonts, primaryScale} from '../../brand/theme';
import {igLaunchV2Cards, type CardCopy} from '../../plans/ig-launch-v2.cards';

/**
 * One ig-launch-v2 carousel card. Copy comes from plans/ig-launch-v2.cards.ts;
 * this file owns nothing but the type stack.
 *
 * Type follows the Coachella giveaway card, which is where Nick pointed for
 * consistency: Lora 700 headlines in secondaryDark, Inter support copy in the
 * primary blue. Everything is centred, because the deck's cover is, and the
 * stack is centred in the band between the badge and the footer rather than on
 * the frame, so no card's type drifts under the lockup.
 */

const BAND = {top: 180, bottom: 210};
const MARK_W = 500;
// 55% of the frame, off the reference card's own media block, and square:
// the clips already cut for the carousel are 1080x1080.
const MEDIA = 600;
const MEDIA_RADIUS = 32;

const Headline: React.FC<{lines: string[]; size: number}> = ({lines, size}) => (
  <div
    style={{
      fontFamily: fonts.heading,
      fontWeight: 700,
      fontSize: size,
      lineHeight: 1.12,
      letterSpacing: '-0.02em',
      color: colors.secondaryDark,
      textAlign: 'center',
    }}
  >
    {lines.map((line) => (
      <div key={line}>{line}</div>
    ))}
  </div>
);

const Support: React.FC<{lines: string[]}> = ({lines}) => (
  <div
    style={{
      fontFamily: fonts.body,
      fontWeight: 500,
      fontSize: 40,
      lineHeight: 1.34,
      color: colors.primary,
      textAlign: 'center',
    }}
  >
    {lines.map((line) => (
      <div key={line}>{line}</div>
    ))}
  </div>
);

/**
 * The screen-recording slot. Square at 600px, which is the 55% of frame width
 * the reference card gives its media block, and the shape the existing square
 * carousel clips are already cut to (assets/clips/carousel-proof-*.mp4).
 *
 * Empty, it is a dashed well that says what belongs in it, so the deck reads
 * as laid out rather than broken while the footage is still being recorded.
 */
const MediaSlot: React.FC<{src?: string; label?: string}> = ({src, label}) => (
  <div
    style={{
      width: MEDIA,
      height: MEDIA,
      borderRadius: MEDIA_RADIUS,
      overflow: 'hidden',
      background: src ? 'transparent' : 'rgba(30,45,77,0.05)',
      border: src ? 'none' : '3px dashed rgba(30,45,77,0.26)',
      boxShadow: src ? '0 30px 60px -22px rgba(8,16,32,0.5)' : 'none',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
      fontFamily: fonts.body,
      color: 'rgba(30,45,77,0.42)',
    }}
  >
    {src ? (
      <Img src={staticFile(src)} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
    ) : (
      <>
        <div style={{fontWeight: 600, fontSize: 30, letterSpacing: '0.02em'}}>
          {label ?? 'screen recording'}
        </div>
        <div style={{fontSize: 24, opacity: 0.7}}>{MEDIA} x {MEDIA}</div>
      </>
    )}
  </div>
);

const Eyebrow: React.FC<{text: string}> = ({text}) => (
  <div
    style={{
      fontFamily: fonts.body,
      fontWeight: 600,
      fontSize: 28,
      letterSpacing: '0.28em',
      textTransform: 'uppercase',
      color: primaryScale[600],
    }}
  >
    {text}
  </div>
);

export const IgLaunchCard: React.FC<{index?: number}> = ({index = 0}) => {
  const card: CardCopy = igLaunchV2Cards[index] ?? igLaunchV2Cards[0];
  return (
    <CarouselCardFrame>
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
          gap: 36,
        }}
      >
        {card.eyebrow ? <Eyebrow text={card.eyebrow} /> : null}
        {card.mark ? (
          <Img
            src={staticFile('assets/figma/offerloop-lockup-trim.png')}
            style={{width: MARK_W, height: 'auto', marginTop: -8}}
          />
        ) : null}
        {card.headline ? <Headline lines={card.headline} size={card.size ?? 92} /> : null}
        {card.support ? <Support lines={card.support} /> : null}
        {card.media ? <MediaSlot {...card.media} /> : null}
      </AbsoluteFill>
    </CarouselCardFrame>
  );
};
