import {Panel01Hook, Panel02Apply, Panel03Reach, Panel04Ask, Panel05Research, Panel06Prepare, Panel07Track} from './panels';
import {PanelV2Assistant, PanelV2ScoutCan, PanelV2SwipeApply} from './panelsV2';
export {PANEL_W, PANEL_H} from './ui';

// App Store screenshot stills (6.9" slot, 1320x2868). Render all with
// `npm run appstore`; upload out/appstore/*.png in this order.
export const appStorePanels = [
  {id: 'AppStore-01-Hook', file: '01-hook', component: Panel01Hook},
  {id: 'AppStore-02-Apply', file: '02-apply', component: Panel02Apply},
  {id: 'AppStore-03-Reach', file: '03-reach', component: Panel03Reach},
  {id: 'AppStore-04-Ask', file: '04-ask', component: Panel04Ask},
  {id: 'AppStore-05-Research', file: '05-research', component: Panel05Research},
  {id: 'AppStore-06-Prepare', file: '06-prepare', component: Panel06Prepare},
  {id: 'AppStore-07-Track', file: '07-track', component: Panel07Track},
] as const;

// v2: Scout-led set (renders to out/appstore-v2/). Panels 4-7 reuse v1 components.
export const appStorePanelsV2 = [
  {id: 'AppStoreV2-01-Assistant', file: '01-assistant', component: PanelV2Assistant},
  {id: 'AppStoreV2-02-ScoutCan', file: '02-scout-can', component: PanelV2ScoutCan},
  {id: 'AppStoreV2-03-SwipeApply', file: '03-swipe-apply', component: PanelV2SwipeApply},
  {id: 'AppStoreV2-04-Reach', file: '04-reach', component: Panel03Reach},
  {id: 'AppStoreV2-05-Research', file: '05-research', component: Panel05Research},
  {id: 'AppStoreV2-06-Prepare', file: '06-prepare', component: Panel06Prepare},
  {id: 'AppStoreV2-07-Track', file: '07-track', component: Panel07Track},
] as const;
