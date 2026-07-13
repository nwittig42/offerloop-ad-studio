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
      // Meta-ad B1 cold open, cut at 1.8s — the browser in that mock enters at
      // frame 55, so ending here keeps only the kinetic type ("Getting a job
      // is a full-time job in itself.") and the real footage below replaces
      // the mock browser.
      id: 'cold-open-line',
      type: 'mockup',
      component: 'browserTabsPain',
      durationSec: 1.8,
    },
    {
      // Nick's real Chrome recording: LinkedIn profile → ChatGPT outreach
      // draft → Sheets tracker → LinkedIn Jobs → motion blur out.
      id: 'real-tabs',
      type: 'video',
      src: 'assets/generated/Google Chrome.mp4',
      durationSec: 4.4,
      muted: true,
      fit: 'cover',
      overlays: [
        {kind: 'hookText', text: 'Network.', color: '#1E2D4D', startSec: 0.2, endSec: 1.4},
        {kind: 'hookText', text: 'Track.', color: '#1E2D4D', startSec: 1.5, endSec: 2.5},
        {kind: 'hookText', text: 'Apply.', color: '#1E2D4D', startSec: 2.6, endSec: 3.5},
        {kind: 'hookText', text: 'Repeat.', color: '#1E2D4D', startSec: 3.6, endSec: 4.4},
      ],
    },
    {
      id: 'hundreds-of-hours',
      type: 'title',
      durationSec: 3,
      title: 'Hundreds of hours of boring, repetitive work.',
      subtitle: 'With no response.',
    },
    {
      // Higgsfield-generated rejection inbox (nano banana).
      id: 'rejection-inbox',
      type: 'image',
      src: 'assets/generated/rejection-inbox-v1.png',
      durationSec: 3.5,
      kenBurns: true,
      transitionIn: 'fade',
    },
  ],
};
