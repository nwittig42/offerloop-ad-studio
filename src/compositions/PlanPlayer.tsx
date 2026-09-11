import {
  AbsoluteFill,
  Audio,
  Easing,
  Img,
  OffthreadVideo,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import type {
  TransitionPresentation,
  TransitionPresentationComponentProps,
} from '@remotion/transitions';
import {TransitionSeries, linearTiming} from '@remotion/transitions';
import {colors, fonts} from '../../brand/theme';
import type {EditPlan, Overlay, Scene} from '../plan/types';
import {CROSSFADE_FRAMES, sceneDurationInFrames} from '../plan/timing';
import {Captions} from '../components/Captions';
import {EndCard} from '../components/EndCard';
import {HookText} from '../components/HookText';
import {LowerThird} from '../components/LowerThird';
import {PanelStage, GlowCanvas} from '../components/PanelStage';
import {SwipeHand} from '../components/SwipeHand';
import {TimerCounter} from '../components/TimerCounter';
import {mockups} from '../components/mock';

/**
 * Crossfade that also settles the incoming scene from a slight zoom — with
 * the per-scene push-in this keeps both layers moving through every blend,
 * which is what makes dissolves read as fluid instead of slideshow-y.
 */
const FadeZoomInner: React.FC<
  TransitionPresentationComponentProps<Record<string, never>>
> = ({children, presentationDirection, presentationProgress}) => {
  const entering = presentationDirection === 'entering';
  const opacity = entering ? presentationProgress : 1;
  const scale = entering ? 1.045 - 0.045 * presentationProgress : 1;
  return (
    <AbsoluteFill style={{opacity, transform: `scale(${scale})`}}>
      {children}
    </AbsoluteFill>
  );
};

const fadeZoom = (): TransitionPresentation<Record<string, never>> => ({
  component: FadeZoomInner,
  props: {},
});

const FadeIn: React.FC<{enabled: boolean; children: React.ReactNode}> = ({enabled, children}) => {
  const frame = useCurrentFrame();
  const opacity = enabled
    ? interpolate(frame, [0, 12], [0, 1], {extrapolateRight: 'clamp'})
    : 1;
  return <AbsoluteFill style={{opacity}}>{children}</AbsoluteFill>;
};

const KenBurns: React.FC<{enabled: boolean; children: React.ReactNode}> = ({enabled, children}) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const scale = enabled ? interpolate(frame, [0, durationInFrames], [1, 1.08]) : 1;
  return <AbsoluteFill style={{transform: `scale(${scale})`}}>{children}</AbsoluteFill>;
};

const OverlayRenderer: React.FC<{
  overlay: Overlay;
  sceneFrames: number;
  /** Overlays must be gone by this frame (scene end minus any crossfade). */
  maxFrames?: number;
}> = ({overlay, sceneFrames, maxFrames}) => {
  const {fps} = useVideoConfig();
  const cap = maxFrames ?? sceneFrames;
  const from = Math.round((overlay.startSec ?? 0) * fps);
  if (from >= cap) return null;
  const requested =
    overlay.endSec === undefined
      ? sceneFrames - from
      : Math.round((overlay.endSec - (overlay.startSec ?? 0)) * fps);
  const durationInFrames = Math.max(1, Math.min(requested, cap - from));

  return (
    <Sequence from={from} durationInFrames={durationInFrames}>
      {overlay.kind === 'hookText' ? (
        <HookText
          text={overlay.text}
          position={overlay.position}
          color={overlay.color}
          highlight={overlay.highlight}
          highlightColor={overlay.highlightColor}
          font={overlay.font}
          wordByWord={overlay.wordByWord}
          typewriter={overlay.typewriter}
          sizeScale={overlay.sizeScale}
          offsetY={overlay.offsetY}
          durationInFrames={durationInFrames}
        />
      ) : overlay.kind === 'swipeHand' ? (
        <SwipeHand
          src={overlay.src}
          direction={overlay.direction}
          fromXPct={overlay.fromXPct}
          travelPct={overlay.travelPct}
          yPct={overlay.yPct}
          sizePct={overlay.sizePct}
          opacity={overlay.opacity}
          cycleSec={overlay.cycleSec}
          repeat={overlay.repeat}
        />
      ) : overlay.kind === 'timer' ? (
        <TimerCounter
          prefix={overlay.prefix}
          from={overlay.from}
          to={overlay.to}
          position={overlay.position}
        />
      ) : (
        <LowerThird title={overlay.title} subtitle={overlay.subtitle} />
      )}
    </Sequence>
  );
};

const SceneContent: React.FC<{scene: Scene}> = ({scene}) => {
  const {width, height, fps, durationInFrames} = useVideoConfig();
  const frame = useCurrentFrame();
  const isVertical = height > width;

  switch (scene.type) {
    case 'video':
      {
        // Floating-panel cinematic treatment (tilt + glow + shadow) for crisp
        // real recordings that are not full 16:9.
        if (scene.treatment === 'panel') {
          return <PanelStage scene={scene} />;
        }
        // Constant slow push-in (unless opted out) so there's always motion
        // carrying through the crossfades. Blur plates keep their fixed
        // overscan on top of it.
        const push =
          scene.push === false
            ? 1
            : interpolate(frame, [0, durationInFrames], [1, 1.06]);
        const overscan = scene.blur ? 1.06 : 1;
        const video = (
          <OffthreadVideo
            src={staticFile(scene.src)}
            trimBefore={
              scene.trimStartSec ? Math.round(scene.trimStartSec * fps) : undefined
            }
            muted={scene.muted ?? true}
            playbackRate={scene.playbackRate}
            // Keyed WebM only: without this Remotion composites the matte on black.
            transparent={scene.transparent}
            style={{
              width: '100%',
              height: '100%',
              objectFit: scene.fit ?? 'cover',
              filter: [
                scene.blur ? `blur(${scene.blur}px)` : '',
                scene.grayscale ? 'grayscale(0.9) contrast(0.95)' : '',
              ]
                .filter(Boolean)
                .join(' ') || undefined,
              transform: `scale(${push * overscan})`,
            }}
          />
        );
        // Only wrap when a stage color is asked for, so full-bleed clips keep
        // their existing bare-canvas behavior.
        return scene.backgroundColor ? (
          <AbsoluteFill style={{backgroundColor: scene.backgroundColor}}>{video}</AbsoluteFill>
        ) : (
          video
        );
      }
    case 'canvas':
      return (
        <AbsoluteFill style={{backgroundColor: scene.backgroundColor ?? colors.background}}>
          {scene.variant === 'ridge' ? (
            <>
              <Img
                src={staticFile('assets/figma/mountains-forest-bg.png')}
                style={{width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9}}
              />
              {/* Soft center wash so ink text stays legible over the ridge. */}
              <AbsoluteFill
                style={{
                  background:
                    'radial-gradient(ellipse 60% 50% at 50% 48%, rgba(245,246,248,0.72) 0%, rgba(245,246,248,0.25) 55%, rgba(245,246,248,0) 80%)',
                }}
              />
            </>
          ) : null}
          {scene.variant === 'glow' || scene.variant === undefined ? <GlowCanvas /> : null}
        </AbsoluteFill>
      );
    case 'image':
      return (
        <AbsoluteFill
          style={{
            backgroundColor: scene.backgroundColor ?? colors.background,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <KenBurns enabled={scene.kenBurns ?? false}>
            <Img
              src={staticFile(scene.src)}
              style={{
                width: '100%',
                height: '100%',
                objectFit: scene.fit ?? 'contain',
                objectPosition: scene.objectPosition,
                filter: scene.blur ? `blur(${scene.blur}px)` : undefined,
                // Blur samples transparent pixels past the edge, so overscan
                // past the frame rather than letting a soft rim show.
                transform:
                  scene.blur || scene.scale
                    ? `scale(${(scene.scale ?? 1) * (scene.blur ? 1.06 : 1)})`
                    : undefined,
              }}
            />
          </KenBurns>
        </AbsoluteFill>
      );
    case 'title':
      return (
        <AbsoluteFill
          style={{
            backgroundColor: colors.secondaryDark,
            justifyContent: 'center',
            alignItems: 'center',
            padding: width * 0.08,
          }}
        >
          <div
            style={{
              fontFamily: fonts.heading,
              fontWeight: 700,
              fontSize: width * (isVertical ? 0.085 : 0.055) * (scene.sizeScale ?? 1),
              letterSpacing: '-0.02em',
              color: colors.white,
              textAlign: 'center',
              lineHeight: 1.15,
              transform: scene.grow
                ? `scale(${interpolate(frame, [0, durationInFrames], [1, 1.45])})`
                : undefined,
            }}
          >
            {scene.title}
          </div>
          {scene.subtitle ? (
            <div
              style={{
                fontFamily: fonts.body,
                fontSize: width * (isVertical ? 0.042 : 0.024),
                color: colors.secondaryLight,
                textAlign: 'center',
                marginTop: height * 0.03,
              }}
            >
              {scene.subtitle}
            </div>
          ) : null}
        </AbsoluteFill>
      );
    case 'endCard':
      return <EndCard headline={scene.headline} cta={scene.cta} url={scene.url} />;
    case 'mockup': {
      const Mockup = mockups[scene.component];
      return <Mockup />;
    }
  }
};

const PlanAudio: React.FC<{plan: EditPlan}> = ({plan}) => {
  const {fps, durationInFrames} = useVideoConfig();
  return (
    <>
      {(plan.audio ?? []).map((track, i) => {
        const from = Math.round((track.startSec ?? 0) * fps);
        const trackFrames = durationInFrames - from;
        const fadeFrames = Math.round((track.fadeOutSec ?? 0) * fps);
        const fadeInFrames = Math.round((track.fadeInSec ?? 0) * fps);
        return (
          <Sequence
            key={i}
            from={from}
            durationInFrames={trackFrames}
            style={{
              translate: "30.4px 0px"
            }}>
            <Audio
              src={staticFile(track.src)}
              trimBefore={
                track.trimStartSec ? Math.round(track.trimStartSec * fps) : undefined
              }
              loop={track.loop}
              volume={(f) => {
                const base = track.volume ?? 1;
                let v = base;
                // Squared ramps: linear gain sounds like a jump-in/-out because
                // perceived loudness is roughly logarithmic.
                if (fadeInFrames > 0) {
                  const t = interpolate(f, [0, fadeInFrames], [0, 1], {
                    extrapolateLeft: 'clamp',
                    extrapolateRight: 'clamp',
                  });
                  v *= t * t;
                }
                if (fadeFrames > 0) {
                  const t = interpolate(
                    f,
                    [trackFrames - fadeFrames, trackFrames],
                    [1, 0],
                    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
                  );
                  v *= t * t;
                }
                return v;
              }}
            />
          </Sequence>
        );
      })}
    </>
  );
};

/** Generic player: renders any EditPlan. All compositions use this. */
export const PlanPlayer: React.FC<{plan: EditPlan}> = ({plan}) => {
  const {fps} = useVideoConfig();
  return (
    <AbsoluteFill style={{backgroundColor: colors.secondaryDark}}>
      <TransitionSeries>
        {plan.scenes.flatMap((scene, index) => {
          const frames = sceneDurationInFrames(scene, fps);
          // 'fade' on a non-first scene = true crossfade with the previous
          // scene (no dip to the stage background); on the first scene it's a
          // fade up from the stage.
          const crossfade = index > 0 && scene.transitionIn === 'fade';
          // Text must clear the frame before the next scene starts blending
          // in, or the crossfade shows both scenes' overlays at once.
          const nextFades = plan.scenes[index + 1]?.transitionIn === 'fade';
          const overlayCap = frames - (nextFades ? CROSSFADE_FRAMES : 0);
          const sequence = (
            <TransitionSeries.Sequence key={scene.id} durationInFrames={frames}>
              <FadeIn enabled={index === 0 && scene.transitionIn === 'fade'}>
                <SceneContent scene={scene} />
                {scene.overlays?.map((overlay, i) => (
                  <OverlayRenderer
                    key={i}
                    overlay={overlay}
                    sceneFrames={frames}
                    maxFrames={overlayCap}
                  />
                ))}
                {scene.captions ? <Captions cues={scene.captions} /> : null}
              </FadeIn>
            </TransitionSeries.Sequence>
          );
          return crossfade
            ? [
                <TransitionSeries.Transition
                  key={`${scene.id}-x`}
                  presentation={fadeZoom()}
                  timing={linearTiming({
                    durationInFrames: CROSSFADE_FRAMES,
                    easing: Easing.inOut(Easing.ease),
                  })}
                />,
                sequence,
              ]
            : [sequence];
        })}
      </TransitionSeries>
      <PlanAudio plan={plan} />
    </AbsoluteFill>
  );
};
