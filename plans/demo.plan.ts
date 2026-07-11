import type {EditPlan} from '../src/plan/types';
import {illustrations} from '../brand/theme';

// Demo plan that exercises every scene type using only Figma assets.
// It is the placeholder content for all compositions until real plans exist —
// replace with trueview.plan.ts once the TrueView script is approved.
export const demoPlan: EditPlan = {
  id: 'demo',
  fps: 30,
  scenes: [
    {
      id: 'hook',
      type: 'title',
      durationSec: 3,
      title: 'Recruiting season is a mountain.',
      subtitle: 'Offerloop is your guide.',
    },
    {
      id: 'summit',
      type: 'image',
      durationSec: 4.5,
      src: illustrations.scoutMountainSummit,
      kenBurns: true,
      transitionIn: 'fade',
      captions: [
        {text: 'Find the right people at your target firms', startSec: 0.4, endSec: 2.2},
        {text: 'and reach out before anyone else does', startSec: 2.2, endSec: 4.2},
      ],
      overlays: [
        {kind: 'lowerThird', title: 'Offerloop Scout', subtitle: 'Your networking copilot', startSec: 0.5, endSec: 2.2},
      ],
    },
    {
      id: 'end',
      type: 'endCard',
      durationSec: 4,
      transitionIn: 'fade',
      headline: 'Network into your dream job',
      cta: 'Try Offerloop free',
      url: 'offerloop.ai',
    },
  ],
};
