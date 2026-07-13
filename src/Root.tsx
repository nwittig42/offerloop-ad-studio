import {Composition} from 'remotion';
import {PlanPlayer} from './compositions/PlanPlayer';
import {makePlanMetadata} from './plan/validate';
import {planDurationInFrames, planFps} from './plan/timing';
import type {EditPlan} from './plan/types';
import {demoPlan} from '../plans/demo.plan';
import {metaAdPlan} from '../plans/meta-ad.plan';
import {mockupShowcasePlan} from '../plans/mockup-showcase.plan';
import {yetiUsingScoutPlan} from '../plans/yeti-using-scout.plan';

// Every composition is the generic PlanPlayer pointed at a plan file.
// To ship a new video: add plans/<name>.plan.ts and point a slot at it here.
const slots: Array<{id: string; width: number; height: number; plan: EditPlan}> = [
  // Masters (16:9)
  {id: 'MetaAd', width: 1920, height: 1080, plan: metaAdPlan},
  {id: 'TrueViewAd', width: 1920, height: 1080, plan: demoPlan},
  {id: 'YetiUsingScout', width: 1920, height: 1080, plan: yetiUsingScoutPlan},
  {id: 'MockupShowcase', width: 1920, height: 1080, plan: mockupShowcasePlan},
  {id: 'Explainer', width: 1920, height: 1080, plan: demoPlan},
  // Cutdown formats
  {id: 'CutdownVertical', width: 1080, height: 1920, plan: demoPlan},
  {id: 'CutdownFeed', width: 1080, height: 1350, plan: demoPlan},
  {id: 'CutdownSquare', width: 1080, height: 1080, plan: demoPlan},
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
