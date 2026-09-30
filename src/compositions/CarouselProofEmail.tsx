import React from 'react';
import {AbsoluteFill, OffthreadVideo, staticFile, useVideoConfig} from 'remotion';

/**
 * Square tile for the "send one email" carousel step: a real screen
 * recording of one swipe-to-send, cropped to the card + confirmation toast
 * so it matches the tight framing of the other two proof beats.
 *
 * Source is 440x960. The recording's own navy app background sits behind
 * the card, so vertical letterboxing (crop taller than the square allows at
 * full width) blends in rather than showing bars.
 */
const SRC_W = 440;
const SRC_H = 960;
const CROP_TOP = 195; // top of the white card
const CROP_H = 575; // through the bottom of the Draft it / Send it bar

const FPS = 30;
export const carouselProofEmailFps = FPS;
export const carouselProofEmailDurationInFrames = 60; // one swipe, ~2s

export const CarouselProofEmail: React.FC = () => {
  const {height} = useVideoConfig();
  const scale = height / CROP_H;

  return (
    <AbsoluteFill style={{backgroundColor: '#2A3B69'}}>
      <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
        <div
          style={{
            position: 'relative',
            width: SRC_W * scale,
            height: CROP_H * scale,
            overflow: 'hidden',
          }}
        >
          <OffthreadVideo
            src={staticFile('assets/recordings/email-send-swipe-raw.mov')}
            trimBefore={Math.round(0.7 * FPS)}
            trimAfter={Math.round(2.7 * FPS)}
            muted
            style={{
              position: 'absolute',
              top: -CROP_TOP * scale,
              left: 0,
              width: SRC_W * scale,
              height: SRC_H * scale,
            }}
          />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
