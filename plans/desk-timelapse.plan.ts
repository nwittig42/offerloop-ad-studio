import type {EditPlan} from '../src/plan/types';

// The desk-flash carousel background with the app pop-ups taken out: five
// seconds of the grind timelapse and nothing else, for cards where copy needs
// a quiet plate behind it.
//
// Same footage and same 5px haze as plans/desk-flash.plan.ts, so the two are
// interchangeable card to card. This one runs off
// desk-timelapse-apartment-5s-v1.mp4 — the 10s generation sped 2x locally to
// 121 frames, rather than the 2.6x file the flash cut uses, because with no
// pop-ups eating frames the whole five seconds is footage. Result: the
// afternoon -> golden hour -> dusk -> night arc plays a little slower here.
//
// One unbroken scene, so there is no cut to protect and no trim maths: it just
// plays. push stays off to match the flash cut, which needs it off (a push-in
// resets to 1 at every hard cut and pops the framing), so the two videos drift
// identically behind the same copy.
//
// Two compositions play this: DeskTimelapse at 1920x1080 and
// DeskTimelapseCarousel at 1080x1350 for the carousel cards.
const fps = 24;

export const deskTimelapsePlan: EditPlan = {
  id: 'desk-timelapse',
  fps,
  scenes: [
    {
      id: 'desk',
      type: 'video',
      src: 'assets/generated/desk-timelapse-apartment-5s-v1.mp4',
      // 120 of the file's 121 frames = 5.00s at 24fps.
      durationSec: 120 / fps,
      fit: 'cover',
      blur: 5,
      push: false,
      muted: true,
    },
  ],
};
