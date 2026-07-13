import type {EditPlan} from '../src/plan/types';

// TrueView YouTube ad (16:9, target 60–90s), built scene by scene with Nick.
// Storyboard: plans/storyboards/saas-vid-1---trueview.json.
// VO-driven SaaS ad — Nick records narration once the script locks; the open
// runs silent.
//
// Act 1 (current): cold-open type → Nick's real Chrome tab recording with
// Network/Track/Apply/Repeat pops synced to the tab switches → "hundreds of
// hours" card → rejection-inbox still.
export const trueViewPlan: EditPlan = {
  id: 'trueview',
  fps: 30,
  scenes: [
    {
      // Combined cold open: "Getting a job is a full-time job in itself."
      // holds center, glides to the top as the real Chrome window slides in,
      // then FADES OUT and Network/Track/Apply/Repeat pop in its place at the
      // top. Window lands ~1.5s; pacing tightened across the board.
      id: 'cold-open-tabs',
      type: 'mockup',
      component: 'coldOpenTabs',
      durationSec: 5.2,
      overlays: [
        {kind: 'hookText', text: 'Network.', color: '#1E2D4D', sizeScale: 1.5, position: 'top', startSec: 1.7, endSec: 2.5},
        {kind: 'hookText', text: 'Track.', color: '#1E2D4D', sizeScale: 1.5, position: 'top', startSec: 2.6, endSec: 3.4},
        {kind: 'hookText', text: 'Apply.', color: '#1E2D4D', sizeScale: 1.5, position: 'top', startSec: 3.5, endSec: 4.3},
        {kind: 'hookText', text: 'Repeat.', color: '#1E2D4D', sizeScale: 1.5, position: 'top', startSec: 4.4, endSec: 5.2},
      ],
    },
    {
      id: 'hundreds-of-hours',
      type: 'video',
      src: 'assets/generated/nick-desk-timelapse-v1.mp4',
      durationSec: 2.4,
      muted: true,
      fit: 'cover',
      blur: 7,
      transitionIn: 'fade',
      overlays: [
        {
          kind: 'hookText',
          text: 'Hundreds of hours of boring, repetitive work.',
          wordByWord: true,
          startSec: 0.2,
        },
      ],
    },
    {
      // 4K nano-banana Gmail-in-Chrome full of rejections; slow Remotion
      // push-in (the AI scroll clip degraded into text mush and was rejected —
      // see gmail-rejections-scroll-v1.mp4 manifest note).
      id: 'rejection-inbox',
      type: 'image',
      src: 'assets/generated/gmail-rejections-browser-crop-v1.png',
      durationSec: 2.4,
      kenBurns: true,
      transitionIn: 'fade',
      overlays: [
        {
          kind: 'hookText',
          text: 'For no response.',
          color: '#1E2D4D',
          wordByWord: true,
          sizeScale: 1.5,
          startSec: 0.3,
        },
      ],
    },

    // ---- ACT 2: the turn ----
    {
      // Record scratch. HARD CUT (no fade on purpose) from the rejection
      // inbox to a dark screen. Censored for ad review; Nick's VO says it
      // uncensored if the organic cut ever gets narration.
      id: 'f-that',
      type: 'title',
      durationSec: 1.2,
      title: 'F*** that.',
    },
    {
      // Cinematic real-UI dashboard shot carries both turn lines.
      id: 'turn-scout',
      type: 'video',
      src: 'assets/generated/offerloop-ui-dashboard-cinematic-v1.mp4',
      durationSec: 5,
      muted: true,
      fit: 'cover',
      transitionIn: 'fade',
      overlays: [
        {
          kind: 'hookText',
          text: 'Just let Scout take care of it.',
          startSec: 0.3,
          endSec: 2.5,
          position: 'bottom',
        },
        {
          kind: 'hookText',
          text: 'A fully autonomous assistant that handles all your networking and job-search busywork.',
          wordByWord: true,
          sizeScale: 0.75,
          startSec: 2.7,
          endSec: 5,
          position: 'bottom',
        },
      ],
    },
    {
      // Tee up Act 3 (proof beats).
      id: 'how-it-works',
      type: 'title',
      durationSec: 1.5,
      transitionIn: 'fade',
      title: 'So how does it work?',
    },
  ],
};
