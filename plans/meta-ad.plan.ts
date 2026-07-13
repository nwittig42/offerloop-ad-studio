import type {EditPlan} from '../src/plan/types';

// RESTARTED 2026-07-13 (script v5): the ad is now cut from real footage Nick
// uploads — no mock-UI scenes. This stub keeps the MetaAd composition loadable
// in Studio; scenes get added as footage lands in assets/recordings/.
export const metaAdPlan: EditPlan = {
  id: 'meta-ad',
  fps: 30,
  scenes: [
    {
      id: 'awaiting-footage',
      type: 'title',
      durationSec: 3,
      title: 'Meta ad — restarting from real footage.',
      subtitle: 'Waiting on Nick’s uploads (see plans/meta-ad.script.md).',
    },
  ],
};
