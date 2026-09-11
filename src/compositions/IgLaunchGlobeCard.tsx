import React from 'react';
import {AbsoluteFill} from 'remotion';
import {CarouselCardFrame, CAROUSEL_RED, CARD_W, CARD_H} from '../components/CarouselCardFrame';
import {GlobeScale} from '../components/GlobeScale';
import {fonts} from '../../brand/theme';
import {igLaunchV2Cards, type CardCopy} from '../../plans/ig-launch-v2.cards';

/**
 * Deck position 5 (scale): the LA-to-globe animation as the whole ground, with
 * ANYONE. reversed out in white over it and the contact count in red below.
 *
 * The animation used to sit in a square panel on the mesh. As the ground it
 * replaces the mesh entirely, which is why the type here is white while every
 * other card sets its headline in navy.
 *
 * The animation is the GlobeScale component rendered in place, not the
 * out/globe-scale.mp4 file played back. Same pixels either way, minus a second
 * encode, and the timing stays editable from one place.
 */

// Vertical budget on a 1350-tall card; the footer lockup reaches ~1210.
/** Top of the headline. ANYONE. at 190px on 1.05 leading ends at ~356. */
const TOP = 156;
/** Top of the red line, which ends ~1190. */
const COUNT_TOP = 1126;

/**
 * The ground is footage now, and it travels from a dark city map to a bright
 * blue globe. White type holds over the dark end on its own but loses contrast
 * against lit land, and the red line and the white footer lockup have the same
 * problem, so the top and bottom are deepened. The middle is left alone: that
 * is where the globe is, and a veil over the whole frame would only dull it.
 */
const SCRIM =
  'linear-gradient(to bottom, rgba(4,9,22,0.74) 0%, rgba(4,9,22,0.20) 24%, rgba(4,9,22,0) 42%, rgba(4,9,22,0) 62%, rgba(4,9,22,0.36) 78%, rgba(4,9,22,0.80) 100%)';

export const IgLaunchGlobeCard: React.FC<{index?: number}> = ({index = 0}) => {
  const card: CardCopy = igLaunchV2Cards[index] ?? igLaunchV2Cards[0];
  return (
    <CarouselCardFrame
      ground={
        <AbsoluteFill>
          <GlobeScale width={CARD_W} height={CARD_H} showLabel={false} />
          <AbsoluteFill style={{background: SCRIM}} />
        </AbsoluteFill>
      }
    >
      <AbsoluteFill
        style={{
          top: TOP,
          height: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {card.headline ? (
          <div
            style={{
              fontFamily: fonts.heading,
              fontWeight: 700,
              fontSize: card.size ?? 190,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              color: '#FFFFFF',
              textAlign: 'center',
            }}
          >
            {card.headline.map((line) => (
              <div key={line}>{line}</div>
            ))}
          </div>
        ) : null}
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          top: COUNT_TOP,
          height: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {card.support ? (
          <div
            style={{
              fontFamily: fonts.heading,
              fontWeight: 700,
              fontSize: 56,
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              color: CAROUSEL_RED,
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
