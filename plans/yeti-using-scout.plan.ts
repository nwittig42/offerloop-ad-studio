import type {EditPlan} from '../src/plan/types';

// Yeti-using-Scout master (16:9). Storyboard: plans/storyboards/yeti-using-scout.json.
// v2 after Nick's review: opens directly on the side-view voice command (no walking
// intro, no caption, no standalone UI insert — the phone content lives in the in-paw
// close-ups), every motion clip plays full length so the blur transitions land
// (the send-icon clip ENDS in a blue flare that match-cuts into the flight shot),
// and the ending is: return transition → yeti turns to tell the class → the email.
export const yetiUsingScoutPlan: EditPlan = {
  id: 'yeti-using-scout',
  fps: 30,
  scenes: [
    {
      id: 'voice-command',
      type: 'video',
      src: 'assets/generated/yeti-tommy-trojan-speak-v1.mp4',
      durationSec: 4,
      muted: true,
    },
    {
      id: 'scout-on-it',
      type: 'video',
      src: 'assets/generated/scout-chat-onit-v1.mp4',
      durationSec: 3.5,
      muted: true,
    },
    {
      id: 'scout-emailing',
      type: 'video',
      src: 'assets/generated/scout-chat-emailing-doogle-v1.mp4',
      durationSec: 4,
      muted: true,
    },
    {
      // Ends in a full blue-light flare — plays out entirely to hand off into the flight.
      id: 'send-icon-zoom',
      type: 'video',
      src: 'assets/generated/mail-icon-zoom-transition-v1.mp4',
      durationSec: 4,
      muted: true,
    },
    {
      id: 'mail-flight',
      type: 'video',
      src: 'assets/generated/mail-flight-city-day-v1.mp4',
      durationSec: 4,
      muted: true,
    },
    {
      id: 'desk-landing',
      type: 'video',
      src: 'assets/generated/mail-lands-office-desk-day-v1.mp4',
      durationSec: 4,
      muted: true,
    },
    {
      id: 'la-outreach',
      type: 'video',
      src: 'assets/generated/la-skyline-mail-trails-day-v1.mp4',
      durationSec: 5,
      muted: true,
    },
    {
      id: 'green-tower',
      type: 'video',
      src: 'assets/generated/la-skyline-reply-green-day-v1.mp4',
      durationSec: 4,
      muted: true,
    },
    {
      id: 'manager-replies',
      type: 'video',
      src: 'assets/generated/hiring-manager-reply-day-v1.mp4',
      durationSec: 4,
      muted: true,
    },
    {
      // Same green fly-blur transition back — plays to completion so the arc lands on campus.
      id: 'mail-returns',
      type: 'video',
      src: 'assets/generated/mail-return-campus-day-v1.mp4',
      durationSec: 4,
      muted: true,
    },
    {
      // Cut straight to the yeti: he reads it, spins around to the students behind him
      // ("Oh my god — wait, I got an interview!"), then points back at the screen.
      id: 'class-reaction',
      type: 'video',
      src: 'assets/generated/yeti-class-tell-classmates-v1.mp4',
      durationSec: 6,
      muted: true,
    },
    {
      // ...and then shows the computer with the message on it.
      id: 'reply-email',
      type: 'image',
      src: 'assets/generated/doogle-reply-email-screen-still-v1.png',
      durationSec: 3.5,
      transitionIn: 'fade',
      kenBurns: true,
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
