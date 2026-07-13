import type {EditPlan} from '../src/plan/types';

// TrueView YouTube ad (16:9, target 60–90s), built scene by scene with Nick.
// Storyboard: plans/storyboards/saas-vid-1---trueview.json.
// VO-driven SaaS ad — Nick records narration once the script locks; the cold
// open runs silent before VO kicks in.
export const trueViewPlan: EditPlan = {
  id: 'trueview',
  fps: 30,
  scenes: [
    {
      // Cold open reused from the meta ad (B1): "Getting a job is a full-time
      // job in itself." holds alone, then the browser slams in and chaos tabs
      // spawn — the chaos is the proof of the claim.
      id: 'cold-open-tabs',
      type: 'mockup',
      component: 'browserTabsPain',
      durationSec: 6,
    },
  ],
};
