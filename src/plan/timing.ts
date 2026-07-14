import type {EditPlan, Scene} from './types';

export const DEFAULT_FPS = 30;

export const planFps = (plan: EditPlan): number => plan.fps ?? DEFAULT_FPS;

export const sceneDurationInFrames = (scene: Scene, fps: number): number =>
  Math.round(scene.durationSec * fps);

/** Frames a 'fade' transition overlaps the previous scene (true crossfade). */
export const CROSSFADE_FRAMES = 30;

export const planDurationInFrames = (plan: EditPlan): number => {
  const fps = planFps(plan);
  const scenesTotal = plan.scenes.reduce(
    (sum, scene) => sum + sceneDurationInFrames(scene, fps),
    0,
  );
  // Crossfades overlap adjacent scenes, shortening the timeline.
  const overlaps = plan.scenes.filter(
    (scene, i) => i > 0 && scene.transitionIn === 'fade',
  ).length;
  return scenesTotal - overlaps * CROSSFADE_FRAMES;
};
