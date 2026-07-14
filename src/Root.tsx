import {Composition} from 'remotion';
import {PlanPlayer} from './compositions/PlanPlayer';
import {makePlanMetadata} from './plan/validate';
import {planDurationInFrames, planFps} from './plan/timing';
import type {EditPlan} from './plan/types';
import {yetiUsingScoutPlan} from '../plans/yeti-using-scout.plan';
import {trueViewPlan} from '../plans/trueview.plan';

// Every composition is the generic PlanPlayer pointed at a plan file.
// To ship a new video: add plans/<name>.plan.ts and point a slot at it here.
const slots: Array<{id: string; width: number; height: number; plan: EditPlan}> = [
  {id: 'TrueViewAd', width: 1920, height: 1080, plan: trueViewPlan},
  {id: 'YetiUsingScout', width: 1920, height: 1080, plan: yetiUsingScoutPlan},
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
    </>
  );
};
