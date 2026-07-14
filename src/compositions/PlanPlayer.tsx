import {
  AbsoluteFill,
  Audio,
  Img,
  OffthreadVideo,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {TransitionSeries, linearTiming} from '@remotion/transitions';
import {fade} from '@remotion/transitions/fade';
import {colors, fonts} from '../../brand/theme';
import type {EditPlan, Overlay, Scene} from '../plan/types';
import {CROSSFADE_FRAMES, sceneDurationInFrames} from '../plan/timing';
import {Captions} from '../components/Captions';
import {EndCard} from '../components/EndCard';
import {HookText} from '../components/HookText';
import {LowerThird} from '../components/LowerThird';
import {TimerCounter} from '../components/TimerCounter';
import {mockups} from '../components/mock';

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

const OverlayRenderer: React.FC<{overlay: Overlay; sceneFrames: number}> = ({
  overlay,
  sceneFrames,
}) => {
  const {fps} = useVideoConfig();
  const from = Math.round((overlay.startSec ?? 0) * fps);
  const durationInFrames =
    overlay.endSec === undefined
      ? sceneFrames - from
      : Math.max(1, Math.round((overlay.endSec - (overlay.startSec ?? 0)) * fps));

  return (
    <Sequence from={from} durationInFrames={durationInFrames}>
      {overlay.kind === 'hookText' ? (
        <HookText
          text={overlay.text}
          position={overlay.position}
          color={overlay.color}
          wordByWord={overlay.wordByWord}
          typewriter={overlay.typewriter}
          sizeScale={overlay.sizeScale}
          offsetY={overlay.offsetY}
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
      return (
        <OffthreadVideo
          src={staticFile(scene.src)}
          trimBefore={
            scene.trimStartSec ? Math.round(scene.trimStartSec * fps) : undefined
          }
          muted={scene.muted ?? true}
          style={{
            width: '100%',
            height: '100%',
            objectFit: scene.fit ?? 'cover',
            filter: scene.blur ? `blur(${scene.blur}px)` : undefined,
            transform: scene.blur ? 'scale(1.06)' : undefined,
          }}
        />
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
                if (fadeInFrames > 0) {
                  v *= interpolate(f, [0, fadeInFrames], [0, 1], {
                    extrapolateLeft: 'clamp',
                    extrapolateRight: 'clamp',
                  });
                }
                if (fadeFrames > 0) {
                  v *= interpolate(
                    f,
                    [trackFrames - fadeFrames, trackFrames],
                    [1, 0],
                    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
                  );
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
          const sequence = (
            <TransitionSeries.Sequence key={scene.id} durationInFrames={frames}>
              <FadeIn enabled={index === 0 && scene.transitionIn === 'fade'}>
                <SceneContent scene={scene} />
                {scene.overlays?.map((overlay, i) => (
                  <OverlayRenderer key={i} overlay={overlay} sceneFrames={frames} />
                ))}
                {scene.captions ? <Captions cues={scene.captions} /> : null}
              </FadeIn>
            </TransitionSeries.Sequence>
          );
          return crossfade
            ? [
                <TransitionSeries.Transition
                  key={`${scene.id}-x`}
                  presentation={fade()}
                  timing={linearTiming({durationInFrames: CROSSFADE_FRAMES})}
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
