import React from 'react';
import {AbsoluteFill} from 'remotion';
import {CarouselCardFrame, CAROUSEL_RED} from '../components/CarouselCardFrame';
import {GlobeScale} from '../components/GlobeScale';
import {colors, fonts} from '../../brand/theme';
import {igLaunchV2Cards, type CardCopy} from '../../plans/ig-launch-v2.cards';

/**
 * Deck position 5 (scale): ANYONE. above, the LA-to-globe animation in a
 * square panel below it, and the contact count under that in red.
 *
 * The animation is the GlobeScale component rendered in place, not the
 * out/globe-scale.mp4 file played back. Same pixels either way, minus a second
 * encode, and the timing stays editable from one place.
 */

// Vertical budget on a 1350-tall card; the footer lockup reaches ~1210.
/** Top of the headline. ANYONE. at 168px on 1.05 leading ends at ~344. */
const TOP = 168;
/**
 * Top of the square panel, and its size. The panel used to start at 322,
 * which is above where the headline ends, so ANYONE. sat right on its top
 * edge. Now it starts at 372 and is 710 rather than 760, which opens a 28px
 * gap above it and keeps a matching 26px below, before the red line at 1108.
 */
const PANEL_TOP = 372;
const PANEL = 710;
/** Top of the red line, clearing the panel's bottom at 1082. */
const COUNT_TOP = 1108;

export const IgLaunchGlobeCard: React.FC<{index?: number}> = ({index = 0}) => {
  const card: CardCopy = igLaunchV2Cards[index] ?? igLaunchV2Cards[0];
  return (
    <CarouselCardFrame>
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
              fontSize: card.size ?? 168,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
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

      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: PANEL_TOP,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            width: PANEL,
            height: PANEL,
            borderRadius: 28,
            overflow: 'hidden',
            // Required: GlobeScale is an AbsoluteFill, which would otherwise
            // position against the card and paint over the whole thing.
            position: 'relative',
            boxShadow:
              '0 40px 100px rgba(17,32,64,0.32), 0 8px 24px rgba(17,32,64,0.18)',
          }}
        >
          <GlobeScale width={PANEL} height={PANEL} />
        </div>
      </div>

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
