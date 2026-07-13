// Edit-plan schema — the contract between plans/<name>.plan.ts files and the
// generic PlanPlayer compositions. Times are in seconds; the player converts
// to frames using the plan's fps.

/** Path under public/, e.g. 'assets/recordings/find-flow.mp4'. */
export type AssetPath = string;

export type CaptionCue = {
  text: string;
  /** Seconds relative to the start of the scene. */
  startSec: number;
  endSec: number;
};

export type Overlay =
  | {
      kind: 'hookText';
      text: string;
      startSec?: number;
      endSec?: number;
      position?: 'center' | 'top' | 'bottom';
    }
  | {
      kind: 'lowerThird';
      title: string;
      subtitle?: string;
      startSec?: number;
      endSec?: number;
    }
  | {
      kind: 'timer';
      /** Rendered as `${prefix} ${n}`, n counting from → to over the overlay window. */
      prefix?: string;
      from: number;
      to: number;
      startSec?: number;
      endSec?: number;
      position?: 'center' | 'top' | 'bottom';
    };

type SceneBase = {
  id: string;
  /** How long this scene occupies the timeline. */
  durationSec: number;
  transitionIn?: 'fade' | 'none';
  captions?: CaptionCue[];
  overlays?: Overlay[];
};

export type VideoScene = SceneBase & {
  type: 'video';
  src: AssetPath;
  /** Seconds into the source file to start playback. */
  trimStartSec?: number;
  muted?: boolean;
  fit?: 'cover' | 'contain';
};

export type ImageScene = SceneBase & {
  type: 'image';
  src: AssetPath;
  fit?: 'cover' | 'contain';
  /** Slow push-in for static assets. */
  kenBurns?: boolean;
  backgroundColor?: string;
};

export type TitleScene = SceneBase & {
  type: 'title';
  title: string;
  subtitle?: string;
};

export type EndCardScene = SceneBase & {
  type: 'endCard';
  headline: string;
  cta: string;
  url?: string;
};

export type MockupScene = SceneBase & {
  type: 'mockup';
  /** Key into src/components/mock registry (animated UI mockups). */
  component: import('../components/mock').MockupName;
};

export type Scene = VideoScene | ImageScene | TitleScene | EndCardScene | MockupScene;

export type AudioTrack = {
  src: AssetPath;
  /** Seconds into the timeline at which the track starts. */
  startSec?: number;
  /** Seconds into the source file to start playback. */
  trimStartSec?: number;
  volume?: number;
  /** Fade out over the last N seconds of the track's window. */
  fadeOutSec?: number;
  /** Loop (for music beds shorter than the video). */
  loop?: boolean;
};

export type EditPlan = {
  id: string;
  fps?: number; // default 30
  scenes: Scene[];
  /** Voiceover / music laid over the whole timeline. */
  audio?: AudioTrack[];
};
