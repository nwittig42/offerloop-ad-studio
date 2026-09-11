import React from 'react';
import {AbsoluteFill, OffthreadVideo, staticFile} from 'remotion';
import {CarouselCardFrame} from '../components/CarouselCardFrame';
import {colors, fonts} from '../../brand/theme';
import {igLaunchV2Cards, type CardCopy} from '../../plans/ig-launch-v2.cards';

/**
 * A card with one landscape media panel: headline above, the clip in a
 * floating browser panel below. Deck position 4 (search) uses it, whose
 * footage is a desktop capture rather than a phone one.
 *
 * The panel styling is lifted from PanelStage (the PlanPlayer treatment) so
 * desktop footage looks the same whether it shows up in a video or on a card.
 * No tilt though: PanelStage rotates its panel in 3D for cinematic beats, and
 * on a flat carousel card that just reads as a mistake.
 */

// Vertical budget on a 1350-tall card. The footer lockup is centred on 1254
// and 54 tall, so nothing may reach past ~1200.
/** Top of the headline. */
const TOP = 200;
/** The panel is centred in the space left between headline and footer. */
const BAND = {top: 480, bottom: 1200};

const PANEL_W = 1000;
/** extension-find-lead.mp4 is 1400x794. */
const PANEL_ASPECT = 1400 / 794;

export const IgLaunchPanelCard: React.FC<{index?: number}> = ({index = 0}) => {
  const card: CardCopy = igLaunchV2Cards[index] ?? igLaunchV2Cards[0];
  const panelH = Math.round(PANEL_W / PANEL_ASPECT);
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
          gap: 16,
        }}
      >
        {card.headline ? (
          <div
            style={{
              fontFamily: fonts.heading,
              fontWeight: 700,
              fontSize: card.size ?? 104,
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
          top: (BAND.top + BAND.bottom) / 2,
          transform: 'translateY(-50%)',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            width: PANEL_W,
            height: panelH,
            borderRadius: 22,
            overflow: 'hidden',
            boxShadow:
              '0 40px 100px rgba(17,32,64,0.28), 0 8px 24px rgba(17,32,64,0.16)',
            outline: `1px solid ${colors.secondaryLight}55`,
            outlineOffset: -1,
          }}
        >
          {card.video?.src ? (
            <OffthreadVideo
              src={staticFile(card.video.src)}
              muted
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          ) : null}
        </div>
      </div>
    </CarouselCardFrame>
  );
};
