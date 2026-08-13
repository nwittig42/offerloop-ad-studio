import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {colors, fonts} from '../../brand/theme';
import {GlowCanvas} from './PanelStage';

/**
 * Alpha-keyed ghost hand: swipe-hand-ghost-v2 with its near-white plate turned
 * into transparency (density becomes opacity, fill is a neutral cool grey), so
 * it composites normally on any background instead of multiplying a grey box
 * over whatever it sits on.
 */
export const GHOST_HAND = 'assets/generated/swipe-hand-ghost-alpha.png';

export type SwipeHandProps = {
  /** Ghost-hand image under public/ (default: the barely-there v2). */
  src?: string;
  /** Travel direction of the drag. */
  direction?: 'right' | 'left';
  /** Where the finger tip starts / how far it drags, in canvas percent. */
  fromXPct?: number;
  travelPct?: number;
  /** Vertical placement of the hand's center, in canvas percent. */
  yPct?: number;
  /** Hand width as a percent of canvas width. */
  sizePct?: number;
  /** Peak opacity of the ghost (it is faint by design). */
  opacity?: number;
  /** Seconds per full approach → drag → release → gap cycle. */
  cycleSec?: number;
  /** How many cycles to play (default: as many as fit the sequence). */
  repeat?: number;
};

/**
 * The ghost swipe-hand doing an actual swipe. One cycle is four moves:
 * approach (fade in, settle down onto the glass), contact (a small press dip),
 * drag (eased travel with a trailing tilt), release (lift and fade).
 */
export const SwipeHand: React.FC<SwipeHandProps> = ({
  src = GHOST_HAND,
  direction = 'right',
  fromXPct = 42,
  travelPct = 22,
  yPct = 56,
  sizePct = 26,
  opacity = 0.62,
  cycleSec = 1.6,
  repeat,
}) => {
  const frame = useCurrentFrame();
  const {width, fps, durationInFrames} = useVideoConfig();

  const cycle = Math.max(1, Math.round(cycleSec * fps));
  const maxCycles = Math.ceil(durationInFrames / cycle);
  const cycles = repeat ?? maxCycles;
  const index = Math.floor(frame / cycle);
  if (index >= cycles) return null;

  const t = frame % cycle;
  // Beat boundaries as fractions of the cycle: the drag itself is the fast
  // part, the gap after the release is what keeps a loop from reading as a
  // twitch.
  const approach = Math.round(cycle * 0.16);
  const contact = Math.round(cycle * 0.24);
  const release = Math.round(cycle * 0.62);
  const gone = Math.round(cycle * 0.74);

  const sign = direction === 'right' ? 1 : -1;

  // Drag: eased in and out so the hand accelerates off the press and coasts
  // into the release, the way a real flick does.
  const drag = interpolate(t, [contact, release], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.cubic),
  });
  // Overshoot slightly past the target on release, then settle back.
  const coast = interpolate(t, [release, gone], [0, 0.12], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.quad),
  });
  const xPct = fromXPct + sign * travelPct * (drag + coast);

  // Approach drops in from slightly above and behind; release lifts away.
  const drop = interpolate(t, [0, approach], [-26, 0], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.quad),
  });
  const lift = interpolate(t, [release, gone], [0, -22], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.in(Easing.quad),
  });

  // Press dip on contact, held through the drag, released at the end.
  const press = interpolate(
    t,
    [approach, contact, release, gone],
    [1, 0.955, 0.955, 1.02],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );
  // The wrist trails the finger tip through the drag.
  const tilt = sign * interpolate(drag, [0, 1], [0, 7]);

  const alpha =
    interpolate(t, [0, approach], [0, opacity], {extrapolateRight: 'clamp'}) *
    interpolate(t, [release, gone], [1, 0], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });

  const handW = width * (sizePct / 100);

  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      <Img
        src={staticFile(src)}
        style={{
          position: 'absolute',
          left: `${xPct}%`,
          top: `${yPct}%`,
          width: handW,
          height: 'auto',
          // The finger tip sits near the upper-left of the PNG, so anchor the
          // transform there — that is the point the viewer tracks.
          transform: `translate(-22%, ${drop + lift}px) rotate(${tilt}deg) scale(${press})`,
          transformOrigin: '22% 18%',
          opacity: alpha,
          // A touch of drop shadow lifts the ghost off the glass it is
          // dragging, which is what sells contact.
          filter: 'drop-shadow(0 18px 26px rgba(17,32,64,0.14))',
        }}
      />
    </AbsoluteFill>
  );
};

/**
 * Studio-only preview: the ghost hand flicking a job card off to the right on
 * the brand canvas, so the gesture can be timed before it goes over footage.
 */
export const SwipeHandDemo: React.FC = () => {
  const frame = useCurrentFrame();
  const {width, height, fps} = useVideoConfig();
  const cycle = Math.round(1.6 * fps);
  const t = frame % cycle;

  // The card follows the drag beats of SwipeHand so the motion reads as cause
  // and effect rather than a hand waving over a static screenshot.
  const drag = interpolate(t, [Math.round(cycle * 0.24), Math.round(cycle * 0.62)], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.cubic),
  });
  const fly = interpolate(t, [Math.round(cycle * 0.62), Math.round(cycle * 0.8)], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.in(Easing.quad),
  });
  const cardX = width * (0.18 * drag + 0.55 * fly);
  const cardRot = 8 * drag + 12 * fly;
  const cardAlpha = 1 - fly;

  return (
    <AbsoluteFill>
      <GlowCanvas />
      <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
        <div
          style={{
            width: width * 0.3,
            height: height * 0.46,
            borderRadius: 28,
            background: colors.white,
            boxShadow: '0 40px 100px rgba(17,32,64,0.22)',
            padding: 40,
            fontFamily: fonts.body,
            transform: `translateX(${cardX}px) rotate(${cardRot}deg)`,
            opacity: cardAlpha,
          }}
        >
          <div style={{fontSize: 34, fontWeight: 800, color: colors.ink, lineHeight: 1.2}}>
            Data Science Intern
          </div>
          <div style={{fontSize: 24, color: colors.secondaryDark, marginTop: 12, opacity: 0.7}}>
            Cresta
          </div>
          <div
            style={{
              display: 'inline-block',
              marginTop: 26,
              padding: '10px 20px',
              borderRadius: 999,
              background: '#EDF1FA',
              color: colors.primary,
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            $120-180k
          </div>
        </div>
      </AbsoluteFill>
      <SwipeHand fromXPct={44} travelPct={20} yPct={44} sizePct={24} />
    </AbsoluteFill>
  );
};
