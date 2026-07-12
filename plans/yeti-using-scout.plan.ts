import type {EditPlan} from '../src/plan/types';

// Yeti-using-Scout master (16:9). Storyboard: plans/storyboards/yeti-using-scout.json —
// yeti voice-commands Scout on the quad, Scout emails hiring managers at Doogle,
// the outreach fans out over LA, one reply comes back, the yeti reads the
// interview invite on his laptop in class. All motion clips are seedance
// animations of nano_banana keyframe stills (see manifest for prompts).
export const yetiUsingScoutPlan: EditPlan = {
  id: 'yeti-using-scout',
  fps: 30,
  scenes: [
    {
      id: 'walk-to-class',
      type: 'video',
      src: 'assets/generated/yeti-walking-class-phone-v1.mp4',
      durationSec: 4,
      muted: true,
    },
    {
      id: 'voice-command',
      type: 'video',
      src: 'assets/generated/yeti-tommy-trojan-speak-v1.mp4',
      durationSec: 2.5,
      muted: true,
      captions: [{text: '“Find me hiring managers at Doogle.”', startSec: 0.2, endSec: 2.5}],
    },
    {
      id: 'scout-ui-insert',
      type: 'video',
      src: 'assets/generated/scout-ui-promo-clip-agent-beat-wide.mp4',
      trimStartSec: 1,
      durationSec: 4,
      muted: true,
    },
    {
      id: 'scout-on-it',
      type: 'video',
      src: 'assets/generated/scout-chat-onit-v1.mp4',
      durationSec: 3,
      muted: true,
    },
    {
      id: 'scout-emailing',
      type: 'video',
      src: 'assets/generated/scout-chat-emailing-doogle-v1.mp4',
      durationSec: 3,
      muted: true,
    },
    {
      id: 'send-icon-zoom',
      type: 'video',
      src: 'assets/generated/mail-icon-zoom-transition-v1.mp4',
      durationSec: 2,
      muted: true,
    },
    {
      id: 'mail-flight',
      type: 'video',
      src: 'assets/generated/mail-flight-city-day-v1.mp4',
      durationSec: 2.5,
      muted: true,
    },
    {
      id: 'desk-landing',
      type: 'video',
      src: 'assets/generated/mail-lands-office-desk-day-v1.mp4',
      durationSec: 3,
      muted: true,
    },
    {
      id: 'la-outreach',
      type: 'video',
      src: 'assets/generated/la-skyline-mail-trails-day-v1.mp4',
      durationSec: 4,
      muted: true,
      overlays: [
        {kind: 'hookText', text: 'Scout reaches out. Everywhere.', position: 'top', startSec: 0.6, endSec: 3.6},
      ],
    },
    {
      id: 'green-tower',
      type: 'video',
      src: 'assets/generated/la-skyline-reply-green-day-v1.mp4',
      durationSec: 2.5,
      muted: true,
    },
    {
      id: 'manager-replies',
      type: 'video',
      src: 'assets/generated/hiring-manager-reply-day-v1.mp4',
      durationSec: 3,
      muted: true,
    },
    {
      id: 'mail-returns',
      type: 'video',
      src: 'assets/generated/mail-return-campus-day-v1.mp4',
      durationSec: 2.5,
      muted: true,
    },
    {
      id: 'reply-email',
      type: 'image',
      src: 'assets/generated/doogle-reply-email-screen-still-v1.png',
      durationSec: 3,
      transitionIn: 'fade',
      kenBurns: true,
      backgroundColor: '#FFFFFF',
    },
    {
      id: 'class-celebration',
      type: 'video',
      src: 'assets/generated/yeti-class-laptop-reply-v1.mp4',
      durationSec: 4.5,
      muted: true,
    },
    {
      id: 'end',
      type: 'endCard',
      durationSec: 4,
      transitionIn: 'fade',
      headline: 'Say it. Scout does it.',
      cta: 'Try Offerloop free',
      url: 'offerloop.ai',
    },
  ],
};
