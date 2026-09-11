import type {EditPlan} from '../src/plan/types';

// Short hook fragment, not a standalone video: the grind timelapse with the
// three tabs of the busywork stack punching through it and vanishing again.
//
// The base plate is one continuous take of nick-desk-timelapse-v1.mp4 (day
// fading to night, lamp clicking on, coffee cups stacking up). It is cut into
// five segments whose trimStartSec values chain, so the daylight keeps falling
// straight through the interruptions and the flashes read as breaking into a
// single unbroken shot rather than restarting it.
//
// Rhythm follows the anthem cold-open pattern from the ad-pacing skill: a hold
// long enough to register the grind, then gaps that contract (2.17s -> 1.58s
// -> 1.21s -> 0.79s), a six-frame triple-flash cluster as the climax, and a
// 2.25s release on the night footage so it does not end on a busy frame.
//
// Flashes are hard cuts by design: transitionIn stays unset, because a
// crossfade into a bright full-screen UI double-exposes to mush and would kill
// the pop. Single flashes are 3 frames, the cluster runs 2 frames apiece.
//
// Everything is blurred. The timelapse sits at 5px (a soft, tired,
// out-of-focus haze) and the flash plates at 14px, so a viewer clocks *which*
// app it is from colour and layout without ever being able to read it. Both
// are the levers to tune if Nick wants it sharper or mushier.
//
// Source is 24fps and the plan runs at 24, so a plan frame is a source frame
// and the frame counts below are exact.
const fps = 24;
/** Frames, as seconds — keeps the flash lengths frame-exact rather than rounded. */
const f = (frames: number) => frames / fps;

const DESK = 'assets/generated/nick-desk-timelapse-v1.mp4';
const TIMELAPSE_BLUR = 5;
const FLASH_BLUR = 14;

/** One segment of the underlying take, picking up where the last one stopped. */
const desk = (id: string, trimStartSec: number, frames: number) =>
  ({
    id,
    type: 'video' as const,
    src: DESK,
    trimStartSec,
    durationSec: f(frames),
    fit: 'cover' as const,
    blur: TIMELAPSE_BLUR,
    // No push-in: it would reset to 1 at every hard cut and pop the framing.
    // The timelapse supplies all the motion this needs.
    push: false,
    muted: true,
  });

/** A full-frame app plate punched in over the take, then gone. */
const flash = (id: string, src: string, frames: number) =>
  ({
    id,
    type: 'image' as const,
    src,
    durationSec: f(frames),
    fit: 'cover' as const,
    blur: FLASH_BLUR,
    // Slightly oversized so it lands as a punch rather than a placed frame.
    scale: 1.06,
  });

const GMAIL = 'assets/generated/gmail-rejections-browser-crop-v1.png';
const TRACKER = 'assets/generated/desk-flash-excel-plate-v1.png';
const LINKEDIN = 'assets/generated/desk-flash-linkedin-plate-v1.png';

export const deskFlashPlan: EditPlan = {
  id: 'desk-flash',
  fps,
  scenes: [
    // Hold: daylight, head down, nothing yet.
    desk('desk-a', 0, 52),
    flash('flash-gmail', GMAIL, 3),
    desk('desk-b', f(52), 38),
    flash('flash-tracker', TRACKER, 3),
    desk('desk-c', f(90), 29),
    flash('flash-linkedin', LINKEDIN, 3),
    desk('desk-d', f(119), 19),
    // Climax: all three at once, two frames each.
    flash('cluster-gmail', GMAIL, 2),
    flash('cluster-tracker', TRACKER, 2),
    flash('cluster-linkedin', LINKEDIN, 2),
    // Release: lamp on, cups stacked, quiet.
    desk('desk-e', f(138), 54),
  ],
};
