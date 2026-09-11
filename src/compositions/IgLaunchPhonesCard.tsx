import React from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';
import {CarouselCardFrame} from '../components/CarouselCardFrame';
import {PhoneFrame, phoneHeight} from '../components/PhoneFrame';
import {colors, fonts, primaryScale} from '../../brand/theme';
import {igLaunchV2Cards, type CardCopy} from '../../plans/ig-launch-v2.cards';

/**
 * Deck position 3, laid out from the reference card Nick sent: a headline
 * group at the top, a row of three phones with the middle one raised and
 * playing, then the copy block, then the shared lockup and arrow.
 *
 * Everything is positioned absolutely rather than flex-centred. The other
 * cards centre their type in the band between badge and footer, which is
 * right when type is all there is; here three fixed blocks have to clear each
 * other at known heights, and 'move it up a lot' means the top group is
 * pinned near the top rather than floating in the middle.
 *
 * Chrome still comes from CarouselCardFrame, so the badge and the footer match
 * the stills either side.
 */

// Vertical budget, top to bottom, on a 1350-tall card. The three blocks have
// to clear each other and the shared chrome: the badge ends at y 184, and the
// footer lockup is centred on 1254 and 54 tall, so nothing may reach past
// ~1210. The first pass ran the copy to 1276 and 'introducing you.' printed
// straight through the footer lockup.
/** Top of the headline group. */
const TOP = 200;
/** Vertical centre of the phone row: spans 395 to 995. */
const ROW_Y = 695;
/** Top of the copy block, which runs ~195 tall and lands just short of 1210. */
const COPY_TOP = 1012;

const LOCKUP_W = 430;
/** The lockup export is 526x129. */
const LOCKUP_ASPECT = 526 / 129;

/**
 * Widths, with the middle one larger. Heights follow from PHONE_ASPECT, so the
 * middle phone is 600 tall and the outer two 554 — which is what has to fit
 * the 600px the budget above leaves for the row.
 */
const PHONE = {mid: 276, side: 255, gap: 34};

const Eyebrow: React.FC<{text: string}> = ({text}) => (
  <div
    style={{
      fontFamily: fonts.body,
      fontWeight: 600,
      fontSize: 30,
      letterSpacing: '0.28em',
      textTransform: 'uppercase',
      color: primaryScale[600],
    }}
  >
    {text}
  </div>
);

/**
 * The three phones, middle one larger and lifted so it reads as in front.
 * Sizes are fixed rather than derived from the canvas: this card only ever
 * renders at 1080x1350.
 */
const PhoneRow: React.FC<{card: CardCopy}> = ({card}) => {
  const midH = phoneHeight(PHONE.mid);
  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: ROW_Y,
        transform: 'translateY(-50%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: PHONE.gap,
      }}
    >
      {card.phones ? <PhoneFrame src={card.phones.left} width={PHONE.side} /> : null}
      {/* Wrapper carries the extra lift and shadow so the middle phone sits
          forward of the other two without changing its own frame. */}
      <div
        style={{
          height: midH,
          filter: 'drop-shadow(0 30px 40px rgba(8,14,32,0.45))',
        }}
      >
        {card.video ? <PhoneFrame src={card.video.src} width={PHONE.mid} video /> : null}
      </div>
      {card.phones ? <PhoneFrame src={card.phones.right} width={PHONE.side} /> : null}
    </div>
  );
};

export const IgLaunchPhonesCard: React.FC<{index?: number}> = ({index = 0}) => {
  const card: CardCopy = igLaunchV2Cards[index] ?? igLaunchV2Cards[0];
  return (
    <CarouselCardFrame>
      {/* Headline group, pinned to the top. */}
      <AbsoluteFill
        style={{
          top: TOP,
          height: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 20,
        }}
      >
        {card.eyebrow ? <Eyebrow text={card.eyebrow} /> : null}
        {card.mark ? (
          <Img
            src={staticFile('assets/figma/offerloop-lockup-trim.png')}
            style={{width: LOCKUP_W, height: LOCKUP_W / LOCKUP_ASPECT}}
          />
        ) : null}
      </AbsoluteFill>

      <PhoneRow card={card} />

      {/* Copy block: the card's headline and support, set as one group the way
          the reference stacks its lines under the phones. */}
      <AbsoluteFill
        style={{
          top: COPY_TOP,
          height: 'auto',
          paddingLeft: 80,
          paddingRight: 80,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 12,
        }}
      >
        {card.headline ? (
          <div
            style={{
              fontFamily: fonts.heading,
              fontWeight: 700,
              fontSize: card.size ?? 46,
              lineHeight: 1.14,
              letterSpacing: '-0.02em',
              color: colors.secondaryDark,
              textAlign: 'center',
            }}
          >
            {card.headline.map((line) => (
              <div key={line}>{line}</div>
            ))}
          </div>
        ) : null}
        {card.support ? (
          <div
            style={{
              fontFamily: fonts.body,
              fontWeight: 500,
              fontSize: 30,
              lineHeight: 1.3,
              color: colors.primary,
              textAlign: 'center',
            }}
          >
            {card.support.map((line) => (
              <div key={line}>{line}</div>
            ))}
          </div>
        ) : null}
      </AbsoluteFill>
    </CarouselCardFrame>
  );
};
