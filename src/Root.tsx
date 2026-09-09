import {Composition, Still} from 'remotion';
import {PlanPlayer} from './compositions/PlanPlayer';
import {appStorePanels, appStorePanelsV2, PANEL_H, PANEL_W} from './appstore';
import {SwipeHandDemo} from './components/SwipeHand';
import {makePlanMetadata} from './plan/validate';
import {planDurationInFrames, planFps} from './plan/timing';
import type {EditPlan} from './plan/types';
import {yetiUsingScoutPlan} from '../plans/yeti-using-scout.plan';
import {trueViewPlan} from '../plans/trueview.plan';
import {productHuntPlan} from '../plans/product-hunt.plan';
import {atsNewsHookPlan} from '../plans/ats-news-hook.plan';
import {yetiRaveDancePlan} from '../plans/yeti-rave-dance.plan';
import {yetiDrumPlan} from '../plans/yeti-drum.plan';

// Every composition is the generic PlanPlayer pointed at a plan file.
// To ship a new video: add plans/<name>.plan.ts and point a slot at it here.
const slots: Array<{id: string; width: number; height: number; plan: EditPlan}> = [
  {id: 'ProductHuntLaunch', width: 1920, height: 1080, plan: productHuntPlan},
  {id: 'TrueViewAd', width: 1920, height: 1080, plan: trueViewPlan},
  {id: 'YetiUsingScout', width: 1920, height: 1080, plan: yetiUsingScoutPlan},
  {id: 'AtsNewsHook', width: 1080, height: 1920, plan: atsNewsHookPlan},
  {id: 'YetiRaveDance', width: 1080, height: 1920, plan: yetiRaveDancePlan},
  {id: 'YetiDrum', width: 1080, height: 1920, plan: yetiDrumPlan},
];

export const Root: React.FC = () => {
  return (
    <>
      {slots.map(({id, width, height, plan}) => (
        <Composition
          key={id}
          id={id}
          component={PlanPlayer}
          durationInFrames={planDurationInFrames(plan)}
          fps={planFps(plan)}
          width={width}
          height={height}
          defaultProps={{plan}}
          calculateMetadata={makePlanMetadata(plan)}
        />
      ))}
      {/* Gesture-timing bench for the ghost swipe hand (3 loops at 30fps). */}
      <Composition
        id="SwipeHandDemo"
        component={SwipeHandDemo}
        durationInFrames={144}
        fps={30}
        width={1920}
        height={1080}
      />
      {[...appStorePanels, ...appStorePanelsV2].map(({id, component}) => (
        <Still key={id} id={id} component={component} width={PANEL_W} height={PANEL_H} />
      ))}
    </>
  );
};
