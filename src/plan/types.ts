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
      /** CSS color; defaults to white. */
      color?: string;
      /** Substring whose words get tinted with highlightColor (keyword accent). */
      highlight?: string;
      /** Color for the highlighted words (defaults to primary). */
      highlightColor?: string;
      /** Font family: 'heading' (Lora, default), 'body' (sans), or 'wordmark' (Libre Baskerville). */
      font?: 'heading' | 'body' | 'wordmark';
      /** Reveal the text one word at a time. */
      wordByWord?: boolean;
      /** Reveal the text one character at a time (typewriter). */
      typewriter?: boolean;
      /** Font-size multiplier on the default hook size (e.g. 1.8 = much larger). */
      sizeScale?: number;
      /** Push the text down (+) or up (-) in px from its default position. */
      offsetY?: number;
    }
  | {
      kind: 'lowerThird';
      title: string;
      subtitle?: string;
      startSec?: number;
      endSec?: number;
    }
  | {
      /**
       * Ghost swipe-hand gesture cue (approach, press, drag, release), looped
       * for the overlay window. Composites with multiply, so it belongs on
       * light scenes.
       */
      kind: 'swipeHand';
      startSec?: number;
      endSec?: number;
      /** Image under public/ (defaults to the ghost hand v2). */
      src?: AssetPath;
      direction?: 'right' | 'left';
      /** Finger-tip start x and drag distance, in canvas percent. */
      fromXPct?: number;
      travelPct?: number;
      /** Hand center y, in canvas percent. */
      yPct?: number;
      /** Hand width as a percent of canvas width. */
      sizePct?: number;
      /** Peak opacity (the ghost is faint by design). */
      opacity?: number;
      /** Seconds per approach → drag → release → gap cycle. */
      cycleSec?: number;
      /** Number of swipes (defaults to as many as fit the window). */
      repeat?: number;
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

/** Redaction rectangle over the panel, in panel-percent coords (0-100). */
export type PanelMask = {
  xPct: number;
  yPct: number;
  wPct: number;
  hPct: number;
  /** Corner radius in px (default 6). */
  radius?: number;
};

export type VideoScene = SceneBase & {
  type: 'video';
  src: AssetPath;
  /** Seconds into the source file to start playback. */
  trimStartSec?: number;
  muted?: boolean;
  fit?: 'cover' | 'contain';
  /** Gaussian blur in px (background-plate look); slightly scales up to hide soft edges. */
  blur?: number;
  /** Desaturate to near-grayscale (pain-beat look). */
  grayscale?: boolean;
  /**
   * Slow push-in, on by default — constant motion keeps crossfades from
   * feeling like a slideshow. Set false to opt out.
   */
  push?: boolean;
  /** Playback speed (default 1). <1 slows the source (e.g. 0.5 = half speed). */
  playbackRate?: number;
  /**
   * How the clip sits on stage.
   * 'full' (default): full-bleed with push-in — the legacy behavior.
   * 'panel': a floating browser panel, tilted with a soft shadow over a
   * drifting brand-canvas glow. For crisp real recordings that are not 16:9.
   */
  treatment?: 'full' | 'panel';
  /** panel only: rotateY tilt in degrees (App Store convention: alternate -8 / +6). */
  tilt?: number;
  /** panel only: panel width as a % of canvas width (default 74). */
  panelWidthPct?: number;
  /** panel only: source aspect ratio w/h (default 1736/1080). Sets panel height so cover never crops. */
  panelAspect?: number;
  /** panel only: brand-canvas glow behind the panel (default true). */
  glow?: boolean;
  /** panel only: privacy redaction rects (e.g. over emails), in panel-percent coords. */
  masks?: PanelMask[];
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
  /** Font-size multiplier on the default title size. */
  sizeScale?: number;
  /** Continuously scale the title up over the scene (punch-in feel). */
  grow?: boolean;
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

/**
 * A framing beat on the brand light canvas — the kinetic-type stage for hooks,
 * payoffs, and closes. Text comes from overlays; this just paints the stage.
 */
export type CanvasScene = SceneBase & {
  type: 'canvas';
  /** 'glow' = drifting brand aurora; 'plain' = flat brand canvas; 'ridge' = mountain art bg. */
  variant?: 'glow' | 'plain' | 'ridge';
  backgroundColor?: string;
};

export type Scene =
  | VideoScene
  | ImageScene
  | TitleScene
  | EndCardScene
  | MockupScene
  | CanvasScene;

export type AudioTrack = {
  src: AssetPath;
  /** Seconds into the timeline at which the track starts. */
  startSec?: number;
  /** Seconds into the source file to start playback. */
  trimStartSec?: number;
  volume?: number;
  /** Fade in over the first N seconds of the track's window. */
  fadeInSec?: number;
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
