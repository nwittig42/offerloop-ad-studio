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
        {kind: 'hookText', text: 'Networking', color: '#1E2D4D', sizeScale: 1.5, position: 'top', startSec: 1.7, endSec: 2.5},
        {kind: 'hookText', text: 'Tracking', color: '#1E2D4D', sizeScale: 1.5, position: 'top', startSec: 2.6, endSec: 3.4},
        {kind: 'hookText', text: 'Applying', color: '#1E2D4D', sizeScale: 1.5, position: 'top', startSec: 3.5, endSec: 4.3},
        {kind: 'hookText', text: 'Repeat', color: '#1E2D4D', sizeScale: 1.5, position: 'top', startSec: 4.4, endSec: 5.2},
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
          offsetY: 70,
          startSec: 0.3,
          endSec: 2.5,
          position: 'bottom',
        },
        {
          kind: 'hookText',
          text: 'A fully autonomous assistant that handles all your networking and job-search busywork.',
          wordByWord: true,
          sizeScale: 0.75,
          offsetY: 70,
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

    // ---- ACT 3: cinematic Scout walkthrough (Nick's brief 2026-07-13) ----
    // Crossfades between beats; this is the reveal, so it breathes slightly
    // more than the intro montage. Content anchored to real footage/UI refs.
    {
      // Beat 1: over-the-shoulder typing shot (video ref = Nick's real
      // typing capture assets/recordings/scout-typing-real.mp4).
      id: 'cine-typing',
      type: 'video',
      src: 'assets/generated/scout-cine-1-typing-ots.mp4',
      durationSec: 4.5,
      muted: true,
      fit: 'cover',
      transitionIn: 'fade',
      overlays: [
        {kind: 'hookText', text: 'Just ask.', offsetY: 70, startSec: 1.5, endSec: 4.5, position: 'bottom'},
      ],
    },
    {
      // Beat 2: Scout responds — floating reply card, warp-particle space.
      id: 'cine-responding',
      type: 'video',
      src: 'assets/generated/scout-cine-2-responding-v2.mp4',
      durationSec: 3,
      muted: true,
      fit: 'cover',
      transitionIn: 'fade',
    },
    {
      // Beat 3: applications landing, rows + applied ✓ pills popping in.
      id: 'cine-applications',
      type: 'video',
      src: 'assets/generated/scout-cine-3-applications.mp4',
      durationSec: 4,
      muted: true,
      fit: 'cover',
      transitionIn: 'fade',
      overlays: [
        {kind: 'hookText', text: '15 roles. Applied.', startSec: 2.2, endSec: 4},
      ],
    },
    {
      // Beat 3b: second prompt typed live and held — "Email three people on
      // each team|" lands letter-perfect (trim skips the first 2s of typing
      // so the scene ends on the ~1.8s clean hold).
      id: 'cine-typing-email',
      type: 'video',
      src: 'assets/generated/scout-cine-3b-typing-email-v6.mp4',
      durationSec: 6,
      trimStartSec: 2,
      muted: true,
      fit: 'cover',
      transitionIn: 'fade',
    },
    {
      // Beat 4: outreach going out — the network lighting up.
      id: 'cine-network',
      type: 'video',
      src: 'assets/generated/scout-cine-4-network.mp4',
      durationSec: 4.5,
      muted: true,
      fit: 'cover',
      transitionIn: 'fade',
      overlays: [
        {kind: 'hookText', text: '45 people. Emailed.', startSec: 2.6, endSec: 4.5},
      ],
    },
    {
      // Beat 5: proof in the inbox — Gmail drafts, the receipts.
      id: 'cine-drafts',
      type: 'video',
      src: 'assets/generated/scout-cine-5-drafts.mp4',
      durationSec: 4,
      muted: true,
      fit: 'cover',
      transitionIn: 'fade',
      overlays: [
        {kind: 'hookText', text: 'Personalized drafts. In your Gmail.', offsetY: 70, startSec: 2, endSec: 4, position: 'bottom'},
      ],
    },

    // ---- ACT 4: close ----
    {
      // The payoff line, alone on brand background.
      id: 'get-time-back',
      type: 'title',
      durationSec: 2,
      transitionIn: 'fade',
      title: 'Get your time back.',
      grow: true,
    },
    {
      // Wordmark → headline → CTA → summit art.
      id: 'end-card',
      type: 'endCard',
      durationSec: 5,
      transitionIn: 'fade',
      headline: 'Get your time back.',
      cta: 'Go land the offer',
      url: 'offerloop.ai',
    },
  ],
  audio: [
    {
      // Music bed from the Act 2 turn onward. 7.0s = timeline start of
      // 'turn-scout' (scene sums minus the 1s crossfade overlaps) —
      // recompute if any earlier scene's duration or CROSSFADE_FRAMES changes.
      src: 'assets/generated/Timeless (Instrumental).mp3',
      startSec: 7.0,
      // Skip the quiet intro — the section Nick picked (22.6s into the file)
      // eases in over 2s (squared ramp) instead of slamming.
      trimStartSec: 22.6,
      fadeInSec: 2,
      fadeOutSec: 3,
    },
  ],
};
