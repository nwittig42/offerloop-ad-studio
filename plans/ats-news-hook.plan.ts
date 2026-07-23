import type {EditPlan} from '../src/plan/types';

// ATS news supercut: the first 7 seconds (setup + 4-in-a-row + freeze stamp)
// of plans/ats-news-hook.script.md. Vertical 1080x1920; the 16:9 news clips
// sit letterboxed on the dark stage like captured broadcast footage.
//
// Trims are cut so each supercut beat ends exactly on "...the ATS" per
// ffmpeg silencedetect speech windows; nudge in Studio if a word clips.
export const atsNewsHookPlan: EditPlan = {
  id: 'ats-news-hook',
  scenes: [
    // Setup, sentence 1: "If you applied online this year, odds are a human
    // never read your resume." (speech 0.58-4.94 in source)
    {
      id: 'setup-a',
      type: 'video',
      src: 'assets/generated/ats-news-anchor-kjb7-setup.mp4',
      trimStartSec: 0.4,
      durationSec: 4.75,
      muted: false,
      fit: 'contain',
      transitionIn: 'fade',
    },
    // Jump cut past the anchor's breath to sentence 2: "It was screened out
    // by the ATS." (speech 5.72-8.08)
    {
      id: 'setup-b',
      type: 'video',
      src: 'assets/generated/ats-news-anchor-kjb7-setup.mp4',
      trimStartSec: 5.35,
      durationSec: 2.7,
      muted: false,
      fit: 'contain',
    },
    // The supercut: four stations, hard cuts, each trimmed to the phrase.
    {
      id: 'ats-1-hireline',
      type: 'video',
      src: 'assets/generated/ats-news-anchor-hireline.mp4',
      trimStartSec: 3.1,
      durationSec: 1.95,
      muted: false,
      fit: 'contain',
    },
    {
      id: 'ats-2-kwrv6',
      type: 'video',
      src: 'assets/generated/ats-news-anchor-kwrv6-morning.mp4',
      trimStartSec: 3.65,
      durationSec: 0.95,
      muted: false,
      fit: 'contain',
    },
    {
      id: 'ats-3-field',
      type: 'video',
      src: 'assets/generated/ats-news-reporter-field.mp4',
      trimStartSec: 2.95,
      durationSec: 1.55,
      muted: false,
      fit: 'contain',
    },
    {
      id: 'ats-4-marketpulse',
      type: 'video',
      src: 'assets/generated/ats-news-anchor-marketpulse.mp4',
      trimStartSec: 3.8,
      durationSec: 0.95,
      muted: false,
      fit: 'contain',
    },
    // Freeze on the last cut, desaturated, and stamp the enemy's name.
    {
      id: 'freeze-stamp',
      type: 'image',
      src: 'assets/generated/ats-news-freeze-the-ats.png',
      fit: 'contain',
      backgroundColor: '#1E2D4D',
      durationSec: 1.2,
      overlays: [
        {
          kind: 'hookText',
          text: 'THE ATS.',
          position: 'center',
          color: '#FFFFFF',
          font: 'heading',
          sizeScale: 1.7,
        },
      ],
    },
  ],
};
