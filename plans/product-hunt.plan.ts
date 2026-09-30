import type {EditPlan} from '../src/plan/types';
import {colors} from '../brand/theme';

// Product Hunt launch film (16:9, ~45s, silent, text-driven).
// Script: plans/product-hunt.script.md. Approved build 2026-07-20.
//
// Decoupled data spine (Nick, 2026-07-20): the real recordings each demo a
// different company, so on-screen lines stay benefit-framed and company
// agnostic; every clip carries its own real receipt underneath. 6-beat
// capability run (Research + Tailor-resume cut). Privacy: mask emails only.
//
// Look: crisp real recordings float as tilted browser panels (treatment
// 'panel', alternating -8/+6 tilt) over a drifting brand-canvas glow, with
// kinetic keyword-tinted type. Framing beats (hook / turn / payoff / close)
// live on the same light canvas so crossfades morph instead of cutting.
const INK = colors.ink; // #112F54 light-canvas text
const ACCENT = colors.primary; // #4A60A8 keyword tint

export const productHuntPlan: EditPlan = {
  id: 'product-hunt',
  fps: 30,
  scenes: [
    // ---- HOOK: name it (0:00) ----
    {
      id: 'hook',
      type: 'canvas',
      variant: 'glow',
      durationSec: 7.5,
      transitionIn: 'fade',
      overlays: [
        {
          kind: 'hookText',
          text: 'The first AI agent that job hunts for you.',
          color: INK,
          highlight: 'job hunts',
          highlightColor: ACCENT,
          wordByWord: true,
          startSec: 0.5,
          endSec: 4.9,
        },
        {
          kind: 'hookText',
          text: 'Offerloop',
          font: 'wordmark',
          color: INK,
          sizeScale: 1.5,
          startSec: 5.2,
          endSec: 7.5,
        },
      ],
    },

    // ---- THE OLD WAY: pain (0:07) ----
    {
      id: 'old-way',
      type: 'video',
      src: 'assets/recordings/old-way-tabs.mp4',
      durationSec: 4.4,
      trimStartSec: 0.2,
      muted: true,
      fit: 'cover',
      blur: 3,
      grayscale: true,
      transitionIn: 'none',
      overlays: [
        {
          kind: 'hookText',
          text: 'The old way: hours of tabs.',
          color: colors.white,
          wordByWord: true,
          startSec: 0.4,
          endSec: 2.3,
        },
        {
          kind: 'hookText',
          text: 'Then silence.',
          color: colors.white,
          startSec: 2.5,
          endSec: 4.4,
        },
      ],
    },

    // ---- THE TURN (0:12) ----
    {
      id: 'turn',
      type: 'video',
      src: 'assets/recordings/the-turn-dashboard-type.mp4',
      treatment: 'panel',
      tilt: -8,
      durationSec: 4.8,
      trimStartSec: 2.6,
      muted: true,
      transitionIn: 'none',
      overlays: [
        {
          kind: 'hookText',
          text: 'Now you just say what you want.',
          color: INK,
          highlight: 'say',
          highlightColor: ACCENT,
          wordByWord: true,
          position: 'bottom',
          startSec: 0.4,
          endSec: 2.4,
        },
        {
          kind: 'hookText',
          text: 'Scout does the rest.',
          color: INK,
          highlight: 'Scout',
          highlightColor: ACCENT,
          position: 'bottom',
          startSec: 2.5,
          endSec: 4.8,
        },
      ],
    },

    // ---- CAPABILITY RUN (0:18) — 6 real beats, alternating tilt ----
    {
      id: 'cap-apply',
      type: 'video',
      src: 'assets/recordings/apply-to-jobs.mp4',
      treatment: 'panel',
      tilt: 6,
      durationSec: 3.4,
      trimStartSec: 7.4,
      muted: true,
      transitionIn: 'fade',
      overlays: [
        {
          kind: 'hookText',
          text: 'Apply to any of 500,000 jobs.',
          color: INK,
          highlight: '500,000 jobs.',
          highlightColor: ACCENT,
          wordByWord: true,
          sizeScale: 0.72,
          position: 'bottom',
          startSec: 0.5,
        },
      ],
    },
    {
      id: 'cap-find',
      type: 'video',
      src: 'assets/recordings/find-people-at-companies.mp4',
      treatment: 'panel',
      tilt: -8,
      durationSec: 3.6,
      trimStartSec: 10.6,
      muted: true,
      transitionIn: 'fade',
      // Mask the returned personal email ([personal email]).
      masks: [{xPct: 57.5, yPct: 66.5, wPct: 12, hPct: 4.5}],
      overlays: [
        {
          kind: 'hookText',
          text: 'Find anyone. 2.2 billion professionals.',
          color: INK,
          highlight: '2.2 billion',
          highlightColor: ACCENT,
          wordByWord: true,
          sizeScale: 0.72,
          position: 'bottom',
          startSec: 0.5,
        },
      ],
    },
    {
      id: 'cap-reach',
      type: 'video',
      src: 'assets/recordings/reach-hiring-manager.mp4',
      treatment: 'panel',
      tilt: 6,
      durationSec: 3.6,
      trimStartSec: 9.6,
      muted: true,
      transitionIn: 'fade',
      // Mask the hiring manager's email ([hiring manager email]).
      masks: [{xPct: 59, yPct: 49, wPct: 12, hPct: 4.5}],
      overlays: [
        {
          kind: 'hookText',
          text: 'Reach 3 million recruiters.',
          color: INK,
          highlight: '3 million',
          highlightColor: ACCENT,
          wordByWord: true,
          sizeScale: 0.72,
          position: 'bottom',
          startSec: 0.5,
        },
      ],
    },
    {
      id: 'cap-cover',
      type: 'video',
      src: 'assets/recordings/write-cover-letter.mp4',
      treatment: 'panel',
      tilt: -8,
      durationSec: 3.2,
      trimStartSec: 1.15,
      playbackRate: 0.5, // 2.75s source slowed so the letter + PDF beat can breathe
      muted: true,
      transitionIn: 'fade',
      overlays: [
        {
          kind: 'hookText',
          text: 'A cover letter that reads like you.',
          color: INK,
          highlight: 'reads like you.',
          highlightColor: ACCENT,
          wordByWord: true,
          sizeScale: 0.72,
          position: 'bottom',
          startSec: 0.4,
        },
      ],
    },
    {
      id: 'cap-prep',
      type: 'video',
      src: 'assets/recordings/prep-coffee-chat.mp4',
      treatment: 'panel',
      tilt: 6,
      durationSec: 3.4,
      trimStartSec: 1.9,
      muted: true,
      transitionIn: 'fade',
      overlays: [
        {
          kind: 'hookText',
          text: 'Walk into every coffee chat prepped.',
          color: INK,
          highlight: 'prepped.',
          highlightColor: ACCENT,
          wordByWord: true,
          sizeScale: 0.72,
          position: 'bottom',
          startSec: 0.5,
        },
      ],
    },
    {
      id: 'cap-track',
      type: 'video',
      src: 'assets/recordings/track-everything.mp4',
      treatment: 'panel',
      tilt: -8,
      durationSec: 3.0,
      trimStartSec: 0.4,
      muted: true,
      transitionIn: 'fade',
      // Mask the contact email in the inbox reading pane (gian.ciolino@...).
      masks: [{xPct: 43.5, yPct: 33, wPct: 12, hPct: 4}],
      overlays: [
        {
          kind: 'hookText',
          text: 'Track every contact and conversation.',
          color: INK,
          highlight: 'every',
          highlightColor: ACCENT,
          wordByWord: true,
          sizeScale: 0.72,
          position: 'bottom',
          startSec: 0.5,
        },
      ],
    },

    // ---- INSTANT PAYOFF (0:38) ----
    {
      id: 'payoff',
      type: 'canvas',
      variant: 'glow',
      durationSec: 5.8,
      transitionIn: 'fade',
      overlays: [
        {
          kind: 'hookText',
          text: 'Every step of the job hunt.',
          color: INK,
          wordByWord: true,
          startSec: 0.4,
          endSec: 2.6,
        },
        {
          kind: 'hookText',
          text: 'One agent.',
          color: ACCENT,
          sizeScale: 1.2,
          startSec: 2.6,
          endSec: 4.0,
        },
        {
          kind: 'hookText',
          text: 'All of it, instantly.',
          color: INK,
          highlight: 'instantly.',
          highlightColor: ACCENT,
          startSec: 4.0,
          endSec: 5.8,
        },
      ],
    },

    // ---- CLOSE: category claim (0:44) ----
    {
      id: 'close',
      type: 'canvas',
      variant: 'ridge',
      durationSec: 7.0,
      transitionIn: 'fade',
      overlays: [
        {
          kind: 'hookText',
          text: 'One assistant. The entire job search.',
          color: INK,
          highlight: 'entire job search.',
          highlightColor: ACCENT,
          wordByWord: true,
          startSec: 0.6,
          endSec: 3.9,
        },
        {
          kind: 'hookText',
          text: 'Offerloop',
          font: 'wordmark',
          color: INK,
          sizeScale: 1.4,
          offsetY: -50,
          startSec: 4.1,
          endSec: 7.0,
        },
        {
          kind: 'hookText',
          text: 'offerloop.ai',
          font: 'body',
          color: ACCENT,
          sizeScale: 0.55,
          offsetY: 80,
          startSec: 4.4,
          endSec: 7.0,
        },
      ],
    },
  ],
};
