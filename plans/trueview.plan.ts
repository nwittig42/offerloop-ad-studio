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
      // holds center, then glides to the top while Nick's REAL Chrome
      // recording (LinkedIn → ChatGPT → Sheets → LinkedIn Jobs) slides in
      // from below as a framed window — the mock's transition, real pixels.
      // Window lands ~2.2s; word pops ride the real tab switches after that.
      id: 'cold-open-tabs',
      type: 'mockup',
      component: 'coldOpenTabs',
      durationSec: 6.6,
      overlays: [
        {kind: 'hookText', text: 'Network.', color: '#1E2D4D', sizeScale: 1.5, startSec: 2.4, endSec: 3.6},
        {kind: 'hookText', text: 'Track.', color: '#1E2D4D', sizeScale: 1.5, startSec: 3.7, endSec: 4.7},
        {kind: 'hookText', text: 'Apply.', color: '#1E2D4D', sizeScale: 1.5, startSec: 4.8, endSec: 5.7},
        {kind: 'hookText', text: 'Repeat.', color: '#1E2D4D', sizeScale: 1.5, startSec: 5.8, endSec: 6.6},
      ],
    },
    {
      id: 'hundreds-of-hours',
      type: 'video',
      src: 'assets/generated/nick-desk-timelapse-v1.mp4',
      durationSec: 3,
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
      durationSec: 3,
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
  ],
};
