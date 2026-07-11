import {staticFile} from 'remotion';
import type {CalculateMetadataFunction} from 'remotion';
import type {EditPlan} from './types';
import {planDurationInFrames, planFps} from './timing';

/** Every asset path a plan references. */
export const collectAssetPaths = (plan: EditPlan): string[] => {
  const paths = new Set<string>();
  for (const scene of plan.scenes) {
    if (scene.type === 'video' || scene.type === 'image') {
      paths.add(scene.src);
    }
  }
  for (const track of plan.audio ?? []) {
    paths.add(track.src);
  }
  return [...paths];
};

/**
 * calculateMetadata for a plan-driven composition: derives duration/fps from
 * the plan and fails loudly (at Studio load and before render) if any
 * referenced asset is missing from public/.
 */
export const makePlanMetadata = (
  plan: EditPlan,
): CalculateMetadataFunction<{plan: EditPlan}> => {
  return async ({props}) => {
    const missing: string[] = [];
    await Promise.all(
      collectAssetPaths(plan).map(async (path) => {
        try {
          const res = await fetch(staticFile(path), {method: 'HEAD'});
          if (!res.ok) missing.push(path);
        } catch {
          missing.push(path);
        }
      }),
    );
    if (missing.length > 0) {
      throw new Error(
        `Plan "${plan.id}" references assets missing from public/: ${missing.join(', ')}`,
      );
    }
    return {
      durationInFrames: planDurationInFrames(plan),
      fps: planFps(plan),
      props,
    };
  };
};
