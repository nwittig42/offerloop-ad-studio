import type {EditPlan} from '../src/plan/types';

// Meta ad, script v3 (narrated). Storyboard: plans/storyboards/meta-ad.json.
// VO: Nick's take 1, pre-sliced per beat into assets/recordings/vo/ (see manifest
// entry for TKE.m4a for the slice map). Beats B3 and B9 show placeholder titles
// until Nick's filmed footage (desk timelapse, founder piece, walk-out) lands in
// assets/recordings/. B4 contains the uncensored "F that." read; swap/bleep the
// b4 slice before any paid Meta spend.
const WALKTHROUGH =
  'assets/generated/Offerloop Pricing Student Plans for College Networking 13 July 2026.mp4';

// Timeline starts per scene (sum of prior durations); audio slices align to these.
const starts = {
  b1: 0,
  b2: 6,
  b3: 13.2,
  b4: 18.4,
  b5: 22.4,
  b6: 25.4,
  b7: 28.4,
  b8: 31.9,
  b9: 38.1,
  b10: 45.3,
  b11: 47.1,
};

export const metaAdPlan: EditPlan = {
  id: 'meta-ad',
  fps: 30,
  scenes: [
    {
      id: 'b1-tabs',
      type: 'mockup',
      component: 'browserTabsPain',
      durationSec: 6,
    },
    {
      // TODO replace with dedicated busywork-montage mock (5 micro-shots).
      id: 'b2-busywork',
      type: 'mockup',
      component: 'rejectionsPain',
      durationSec: 7.2,
      overlays: [
        {kind: 'hookText', text: 'Resume. Cover letter. Networking.', startSec: 1.2, endSec: 4.2},
        {kind: 'hookText', text: 'And the application itself.', startSec: 4.2, endSec: 7.0},
      ],
    },
    {
      // Placeholder until Nick's desk timelapse lands.
      id: 'b3-hours',
      type: 'title',
      durationSec: 5.2,
      transitionIn: 'fade',
      title: 'Hundreds of hours.',
      subtitle: 'Wasted on repetitive busywork.',
    },
    {
      id: 'b4-turn',
      type: 'title',
      durationSec: 4,
      transitionIn: 'fade',
      title: 'Let Scout take care of all of it.',
    },
    {
      id: 'b5-logo-hero',
      type: 'image',
      durationSec: 3,
      transitionIn: 'fade',
      src: 'assets/figma/offerloop-wordmark.svg',
      fit: 'contain',
      backgroundColor: '#F5F6F8',
      overlays: [
        {kind: 'hookText', text: 'Search. Reach out. Get hired.', startSec: 1.1, endSec: 3, position: 'bottom'},
      ],
    },
    {
      id: 'b6-apply',
      type: 'mockup',
      component: 'jobCardApply',
      durationSec: 3,
    },
    {
      id: 'b7-find-people',
      type: 'video',
      src: WALKTHROUGH,
      trimStartSec: 177.5,
      durationSec: 3.5,
      muted: true,
      fit: 'cover',
      transitionIn: 'fade',
      overlays: [{kind: 'hookText', text: 'DONE ✓', startSec: 2.4, endSec: 3.5}],
    },
    {
      id: 'b8-hiring-manager',
      type: 'mockup',
      component: 'emailDraft',
      durationSec: 6.2,
    },
    {
      // Placeholder until Nick's founder piece + walk-out land.
      id: 'b9-founders',
      type: 'title',
      durationSec: 7.2,
      transitionIn: 'fade',
      title: 'Built by college students,',
      subtitle: 'for everyone still in the hunt.',
    },
    {
      id: 'b10-time-back',
      type: 'title',
      durationSec: 1.8,
      title: 'Get your time back.',
    },
    {
      id: 'b11-end',
      type: 'endCard',
      durationSec: 3,
      transitionIn: 'fade',
      headline: 'Land your dream job in a fraction of the time',
      cta: 'Use Offerloop',
      url: 'offerloop.ai',
    },
  ],
  audio: [
    {src: 'assets/recordings/vo/meta-b1.wav', startSec: starts.b1 + 0.1},
    {src: 'assets/recordings/vo/meta-b2.wav', startSec: starts.b2},
    {src: 'assets/recordings/vo/meta-b3.wav', startSec: starts.b3 + 0.1},
    {src: 'assets/recordings/vo/meta-b4.wav', startSec: starts.b4 + 0.2},
    {src: 'assets/recordings/vo/meta-b6.wav', startSec: starts.b6 + 0.2},
    {src: 'assets/recordings/vo/meta-b7.wav', startSec: starts.b7 + 0.2},
    {src: 'assets/recordings/vo/meta-b8.wav', startSec: starts.b8 + 0.1},
    {src: 'assets/recordings/vo/meta-b9.wav', startSec: starts.b9 + 0.2},
    {src: 'assets/recordings/vo/meta-b10.wav', startSec: starts.b10},
    {src: 'assets/recordings/vo/meta-b11.wav', startSec: starts.b11 + 0.3},
  ],
};
