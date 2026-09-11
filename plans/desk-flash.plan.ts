import type {EditPlan} from '../src/plan/types';

// Five-second carousel background: a grind timelapse with the three tabs of
// the busywork stack popping up over it and dropping away again. Built to sit
// *behind* carousel copy, so it stays soft and never asks to be read.
//
// The base plate is desk-timelapse-apartment-fast-v1.mp4 — the 10s Higgsfield
// generation (invented person, apartment bedroom, afternoon -> golden hour ->
// dusk -> night, lamp cutting in, papers stacking up) sped 2.6x locally so the
// whole light arc still lands inside five seconds. Speeding the file up front
// rather than leaning on playbackRate keeps trimStartSec honest: a plan frame
// is a frame of this file, so the segment maths below is exact.
//
// It is cut into four segments whose trims chain, so the light keeps falling
// straight through the interruptions and the pop-ups read as breaking into one
// unbroken shot rather than restarting it.
//
// Flashes run 10 frames (0.42s) each. The first pass used 3 frames and Nick
// could not see them at all — at background scale a pop needs roughly a third
// of a second to register, so do not trim these below ~8 frames. The
// three-flash climax cluster from the earlier cut is gone: inside a 5s loop it
// read as noise, and a background wants a rhythm you can follow.
//
// Blur: 5px on the timelapse (a soft, tired, out-of-focus haze) and 14px on
// the plates, so a viewer clocks *which* app it is from colour and layout
// without ever being able to read it. Both are the levers to tune.
//
// Flashes are hard cuts by design: transitionIn stays unset, because a
// crossfade into a bright full-screen UI double-exposes to mush.
//
// Two compositions play this: DeskFlash at 1920x1080 and DeskFlashCarousel at
// 1080x1350 for the carousel cards. In 4:5 'cover' crops nearly half the width
// away, which would centre-crop the identifying edge off every plate, so the
// plates anchor left — see FLASH_ANCHOR.
//
// The sped file is 93 frames; the segments consume 90 of them.
const fps = 24;
/** Frames, as seconds — keeps the pop-up lengths frame-exact rather than rounded. */
const f = (frames: number) => frames / fps;

const DESK = 'assets/generated/desk-timelapse-apartment-fast-v1.mp4';
const TIMELAPSE_BLUR = 5;
const FLASH_BLUR = 14;
const FLASH_FRAMES = 10;
/**
 * Gmail's sidebar and logo, Excel's name column, LinkedIn's nav mark: all sit
 * at the left of their plate, so a left anchor is what keeps each one
 * identifiable once 4:5 crops the sides. No effect in 16:9, where the plates
 * already match the frame and nothing is cropped.
 */
const FLASH_ANCHOR = 'left center';

/** One segment of the underlying take, picking up where the last one stopped. */
const desk = (id: string, trimFrames: number, frames: number) =>
  ({
    id,
    type: 'video' as const,
    src: DESK,
    trimStartSec: f(trimFrames),
    durationSec: f(frames),
    fit: 'cover' as const,
    blur: TIMELAPSE_BLUR,
    // No push-in: it would reset to 1 at every hard cut and pop the framing.
    // The timelapse supplies all the motion this needs.
    push: false,
    muted: true,
  });

/** A full-frame app plate popped up over the take, then gone. */
const flash = (id: string, src: string) =>
  ({
    id,
    type: 'image' as const,
    src,
    durationSec: f(FLASH_FRAMES),
    fit: 'cover' as const,
    objectPosition: FLASH_ANCHOR,
    blur: FLASH_BLUR,
    // Slightly oversized so it lands as a punch rather than a placed frame.
    scale: 1.06,
  });

const GMAIL = 'assets/generated/gmail-rejections-browser-crop-v1.png';
const EXCEL = 'assets/generated/desk-flash-excel-plate-v1.png';
const LINKEDIN = 'assets/generated/desk-flash-linkedin-plate-v1.png';

// 30 + 10 + 22 + 10 + 16 + 10 + 22 = 120 frames = 5.00s at 24fps.
export const deskFlashPlan: EditPlan = {
  id: 'desk-flash',
  fps,
  scenes: [
    // Hold: afternoon sun, head down, nothing yet.
    desk('desk-a', 0, 30),
    flash('flash-gmail', GMAIL),
    desk('desk-b', 30, 22),
    flash('flash-excel', EXCEL),
    desk('desk-c', 52, 16),
    flash('flash-linkedin', LINKEDIN),
    // Release: lamp on, papers stacked, quiet.
    desk('desk-d', 68, 22),
  ],
};
