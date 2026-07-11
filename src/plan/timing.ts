import type {EditPlan, Scene} from './types';

export const DEFAULT_FPS = 30;

export const planFps = (plan: EditPlan): number => plan.fps ?? DEFAULT_FPS;

export const sceneDurationInFrames = (scene: Scene, fps: number): number =>
  Math.round(scene.durationSec * fps);

export const planDurationInFrames = (plan: EditPlan): number => {
  const fps = planFps(plan);
  return plan.scenes.reduce(
    (sum, scene) => sum + sceneDurationInFrames(scene, fps),
    0,
  );
};
