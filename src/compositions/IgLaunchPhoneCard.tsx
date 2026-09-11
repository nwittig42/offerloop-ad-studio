import React from 'react';
import {AbsoluteFill} from 'remotion';
import {CarouselCardFrame} from '../components/CarouselCardFrame';
import {PhoneFrame, phoneHeight} from '../components/PhoneFrame';
import {colors, fonts} from '../../brand/theme';
import {igLaunchV2Cards, type CardCopy} from '../../plans/ig-launch-v2.cards';

/**
 * A card with one hero phone: headline and support copy at the top, the phone
 * filling the space beneath, then the shared lockup and arrow. Deck position 4
 * (apply) uses it.
 *
 * Separate from IgLaunchPhonesCard rather than a branch inside it: that card
 * carries a lockup in its top group and puts its support copy BELOW the phone
 * row, while this one has no lockup and stacks headline and support together
 * above a single phone. Folding both into one component meant a conditional
 * around nearly every block.
 */

// Vertical budget on a 1350-tall card. The footer lockup is centred on 1254
// and 54 tall, so nothing may reach past ~1200.
/** Top of the copy group. */
const TOP = 150;
/** Top of the phone, which runs 765 tall and lands at 1170. */
const PHONE_TOP = 405;
/** Width follows from the height the budget leaves. */
const PHONE_W = 352;

export const IgLaunchPhoneCard: React.FC<{index?: number}> = ({index = 0}) => {
  const card: CardCopy = igLaunchV2Cards[index] ?? igLaunchV2Cards[0];
  return (
    <CarouselCardFrame>
      <AbsoluteFill
        style={{
          top: TOP,
          height: 'auto',
          paddingLeft: 80,
          paddingRight: 80,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 18,
        }}
      >
        {card.headline ? (
          <div
            style={{
              fontFamily: fonts.heading,
              fontWeight: 700,
              fontSize: card.size ?? 72,
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
              fontSize: 34,
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

      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: PHONE_TOP,
          height: phoneHeight(PHONE_W),
          display: 'flex',
          justifyContent: 'center',
          filter: 'drop-shadow(0 30px 44px rgba(8,14,32,0.45))',
        }}
      >
        {card.video ? <PhoneFrame src={card.video.src} width={PHONE_W} video /> : null}
      </div>
    </CarouselCardFrame>
  );
};
