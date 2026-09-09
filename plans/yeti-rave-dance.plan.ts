import type {EditPlan} from '../src/plan/types';
import {colors} from '../brand/theme';

// Bench for the rave-dance yeti asset, not a shipping video: it plays the same
// 5s loop twice so both deliverables can be eyeballed side by side in Studio.
//
// Beat 1 is the raw Higgsfield plate on black. Beat 2 is the keyed WebM on the
// brand canvas, which is also how the alpha gets verified — Chromium is the
// only decoder here that reads WebM alpha (ffmpeg's VP9 decoder drops it), so
// if beat 2 shows the yeti on light grey with no black box, the matte is good.
//
// Source is 24fps; the plan runs at 24 so a plan frame is a source frame.
export const yetiRaveDancePlan: EditPlan = {
  id: 'yeti-rave-dance',
  fps: 24,
  scenes: [
    {
      id: 'plate-on-black',
      type: 'video',
      src: 'assets/generated/yeti-rave-dance-v1.mp4',
      durationSec: 5.04,
      // contain, and no push-in: this is an asset check, so show the actual
      // framing and let the loop read as a loop.
      fit: 'contain',
      push: false,
    },
    {
      id: 'keyed-on-brand-canvas',
      type: 'video',
      src: 'assets/generated/yeti-rave-dance-alpha.webm',
      durationSec: 5.04,
      fit: 'contain',
      push: false,
      transparent: true,
      backgroundColor: colors.background,
    },
  ],
};
