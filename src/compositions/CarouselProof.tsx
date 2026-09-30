import React from 'react';
import {AbsoluteFill, Sequence, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {BeforeAfterTap, type BeforeAfterBeat} from '../components/BeforeAfterTap';
import {colors} from '../../brand/theme';

/**
 * Square carousel tile: two before/after taps, no hard cuts.
 *
 *   1. Instagram — Follow becomes Following, 340 followers becomes 341.
 *   2. App Store — Get becomes Open.
 *
 * Both beats run the same rhythm: hold on the control, tap, a held pause, then
 * the UI flips. The reveal gets more air than the setup, and the beats are
 * joined by a dip through the brand canvas rather than a cut, so the two bright
 * white UIs never cross-dissolve into each other.
 */

const SRC_W = 1206;
const SRC_H = 2622;

export const carouselProofBeats: BeforeAfterBeat[] = [
  {
    id: 'follow',
    beforeSrc: 'assets/recordings/ig-profile-before-follow.png',
    afterSrc: 'assets/recordings/ig-profile-after-follow.png',
    sourceW: SRC_W,
    sourceH: SRC_H,
    // Sits between the stats row and the Follow button so both changes are held.
    focusX: 603,
    focusY: 800,
    tap: {x: 44, y: 1049, w: 496, h: 101},
    accent: {x: 603, y: 484, w: 168, h: 89}, // the follower count
    zoomFrom: 1,
    zoomTo: 1.1,
    tapAtSec: 0.9,
    swapAtSec: 1.2,
    durationSec: 3.1,
  },
  {
    id: 'download',
    // Square crops: the Offerloop row plus its store screenshots, lifted off the
    // full screenshot so the competitor ad above it stays out of the tile.
    beforeSrc: 'assets/recordings/appstore-offerloop-before-get-square.png',
    afterSrc: 'assets/recordings/appstore-offerloop-after-open-square.png',
    sourceW: SRC_W,
    sourceH: SRC_W,
    focusX: 603,
    focusY: 603,
    tap: {x: 924, y: 195, w: 222, h: 96},
    // The Get pill nearly touches the right edge, so anything past ~1.05 clips it.
    zoomFrom: 1,
    zoomTo: 1.04,
    tapAtSec: 0.9,
    swapAtSec: 1.25,
    durationSec: 3.4,
  },
];

const FPS = 30;
const beats = carouselProofBeats;
const beatFrames = beats.map((b) => Math.round(b.durationSec * FPS));
export const carouselProofDurationInFrames = beatFrames.reduce((a, b) => a + b, 0);
export const carouselProofFps = FPS;

/** Per-beat lengths, so each beat can also stand alone as its own clip. */
export const carouselProofBeatFrames = beatFrames;

/** Frame the second beat starts on — the dip is centred here. */
const DIP_AT = beatFrames[0];

export const CarouselProof: React.FC = () => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();

  // Dip through the canvas between beats, and top-and-tail the loop so it
  // restarts on the same colour it ended on.
  const dip = interpolate(frame, [DIP_AT - 7, DIP_AT, DIP_AT + 7], [0, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const edges = interpolate(
    frame,
    [0, 8, durationInFrames - 9, durationInFrames - 1],
    [1, 0, 0, 1],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );

  let from = 0;
  return (
    <AbsoluteFill style={{backgroundColor: colors.background}}>
      {beats.map((beat, i) => {
        const start = from;
        from += beatFrames[i];
        return (
          <Sequence key={beat.id} from={start} durationInFrames={beatFrames[i]}>
            <BeforeAfterTap beat={beat} />
          </Sequence>
        );
      })}
      <AbsoluteFill
        style={{backgroundColor: colors.background, opacity: Math.max(dip, edges)}}
      />
    </AbsoluteFill>
  );
};

/**
 * A single beat on its own, topped and tailed so it stands alone as a clip.
 * Same rhythm and framing as inside the full tile — this is a split, not a
 * re-cut.
 */
export const CarouselProofBeat: React.FC<{index: number}> = ({index}) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const edges = interpolate(
    frame,
    [0, 8, durationInFrames - 9, durationInFrames - 1],
    [1, 0, 0, 1],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );
  return (
    <AbsoluteFill style={{backgroundColor: colors.background}}>
      <BeforeAfterTap beat={beats[index]} />
      <AbsoluteFill style={{backgroundColor: colors.background, opacity: edges}} />
    </AbsoluteFill>
  );
};
