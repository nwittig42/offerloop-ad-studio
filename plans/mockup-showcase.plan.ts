import type {EditPlan} from '../src/plan/types';

// All seven PostSyncer-style mock-UI scenes back to back, for review in
// Studio. The Meta ad plan will cherry-pick and re-time these.
export const mockupShowcasePlan: EditPlan = {
  id: 'mockup-showcase',
  fps: 30,
  scenes: [
    {id: 'tabs', type: 'mockup', component: 'browserTabsPain', durationSec: 4},
    {id: 'rejections', type: 'mockup', component: 'rejectionsPain', durationSec: 4, transitionIn: 'fade'},
    {id: 'job', type: 'mockup', component: 'jobCardApply', durationSec: 4, transitionIn: 'fade'},
    {id: 'contacts', type: 'mockup', component: 'findContacts', durationSec: 5, transitionIn: 'fade'},
    {id: 'draft', type: 'mockup', component: 'emailDraft', durationSec: 6, transitionIn: 'fade'},
    {id: 'inbox', type: 'mockup', component: 'inboxDrafts', durationSec: 4, transitionIn: 'fade'},
    {id: 'stats', type: 'mockup', component: 'statStack', durationSec: 4, transitionIn: 'fade'},
  ],
};
