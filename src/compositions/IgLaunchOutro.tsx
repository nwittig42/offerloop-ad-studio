import React from 'react';
import {AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {CarouselCardFrame} from '../components/CarouselCardFrame';

/**
 * Card 9: the mark alone, turning about its vertical axis.
 *
 * One constant-speed revolution across the whole composition, so the last
 * frame lands exactly where the first one started and Instagram's loop has no
 * seam. Constant speed is the point: any easing makes the restart visible.
 *
 * The mark is a flat PNG, so it goes edge-on at 90 and 270 degrees and the far
 * side reads mirrored. That is what a spinning sign does, and it is why the
 * icon carries the spin rather than the lockup, whose wordmark would read
 * backwards for half of every turn.
 */

export const igLaunchOutroFps = 30;
export const igLaunchOutroDurationInFrames = 120; // one turn, 4s

const MARK = 420;

export const IgLaunchOutro: React.FC = () => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const turn = (frame / durationInFrames) * 360;
  return (
    <CarouselCardFrame arrow={false} badge={false}>
      <AbsoluteFill
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          // The footer sits low, so centring on the frame would read as
          // hanging. Lift the mark to the optical centre of the open field.
          paddingBottom: 180,
          perspective: 1600,
        }}
      >
        <Img
          src={staticFile('assets/figma/offerloop-icon-trim.png')}
          style={{
            width: MARK,
            height: 'auto',
            transform: `rotateY(${turn}deg)`,
            transformStyle: 'preserve-3d',
            filter: 'drop-shadow(0 18px 34px rgba(30,45,77,0.22))',
          }}
        />
      </AbsoluteFill>
    </CarouselCardFrame>
  );
};
