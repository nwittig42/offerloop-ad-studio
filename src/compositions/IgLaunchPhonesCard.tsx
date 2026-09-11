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

// Vertical budget, top to bottom, on a 1350-tall card. The blocks have to
// clear each other and the shared chrome: the footer lockup is centred on
// 1254 and 54 tall, so nothing may reach past ~1210. An early pass ran the
// copy to 1276 and printed 'introducing you.' straight through that lockup.
//
// The top group starts above the badge's baseline (the badge ends at y 184),
// which is fine because every line in the group is centred and none is wider
// than ~430, so nothing reaches the badge's x 64-196.
/** Top of the headline group: eyebrow, lockup, then the headline. Ends ~426. */
const TOP = 140;
/** Vertical centre of the phone row: the middle phone spans 460 to 1096. */
const ROW_Y = 778;
/** Top of the support block, ~78 tall, landing just short of 1210. */
const COPY_TOP = 1132;

const LOCKUP_W = 430;
/** The lockup export is 526x129. */
const LOCKUP_ASPECT = 526 / 129;

/**
 * Widths, with the middle one larger. Heights follow from PHONE_ASPECT: 635
 * for the middle and 587 for the outer two, fitting the ~636px the budget
 * above leaves. The three widths plus gaps come to 896, inside the 920 the
 * card's 80px side padding allows.
 */
const PHONE = {mid: 292, side: 270, gap: 32};

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
      {card.phones ? (
        <PhoneFrame
          src={card.phones.left.src}
          width={PHONE.side}
          video={card.phones.left.video}
        />
      ) : null}
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
      {card.phones ? (
        <PhoneFrame
          src={card.phones.right.src}
          width={PHONE.side}
          video={card.phones.right.video}
        />
      ) : null}
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
        {card.headline ? (
          <div
            style={{
              marginTop: 4,
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
      </AbsoluteFill>

      <PhoneRow card={card} />

      {/* Under the phones: the support lines only. The headline sits in the top
          group with the lockup. */}
      <AbsoluteFill
        style={{
          top: COPY_TOP,
          height: 'auto',
          paddingLeft: 80,
          paddingRight: 80,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
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
