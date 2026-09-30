import {
  AbsoluteFill,
  OffthreadVideo,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {colors} from '../../brand/theme';
import type {VideoScene} from '../plan/types';

const DEFAULT_ASPECT = 1736 / 1080;

/**
 * Drifting brand-canvas glow (ad-lighting: color is light, never paint; blobs
 * always move so a glow never reads as a stain). Two hues max, heavily blurred,
 * kept subtle so the UI panel stays razor sharp on top.
 */
export const GlowCanvas: React.FC = () => {
  const frame = useCurrentFrame();
  const {width, height} = useVideoConfig();
  // Slow sinusoidal drift, deterministic on frame.
  const t = frame / 90;
  const blobA = {
    x: width * (0.30 + 0.05 * Math.sin(t)),
    y: height * (0.34 + 0.04 * Math.cos(t * 0.8)),
  };
  const blobB = {
    x: width * (0.72 + 0.05 * Math.cos(t * 0.7)),
    y: height * (0.66 + 0.04 * Math.sin(t * 0.9)),
  };
  const r = width * 0.42;
  return (
    <AbsoluteFill style={{backgroundColor: colors.background, overflow: 'hidden'}}>
      <div
        style={{
          position: 'absolute',
          left: blobA.x - r,
          top: blobA.y - r,
          width: r * 2,
          height: r * 2,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${colors.primary}30 0%, ${colors.primary}00 65%)`,
          filter: `blur(${width * 0.06}px)`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: blobB.x - r,
          top: blobB.y - r,
          width: r * 2,
          height: r * 2,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${colors.secondaryLight}45 0%, ${colors.secondaryLight}00 65%)`,
          filter: `blur(${width * 0.06}px)`,
        }}
      />
    </AbsoluteFill>
  );
};

/**
 * A crisp real recording floated as a tilted browser panel over a drifting
 * brand glow — the Product Hunt film's cinematic treatment. Motion (tilt,
 * push-in, glow) is added here; the source is captured flat.
 */
export const PanelStage: React.FC<{scene: VideoScene}> = ({scene}) => {
  const frame = useCurrentFrame();
  const {width, height, fps, durationInFrames} = useVideoConfig();

  const aspect = scene.panelAspect ?? DEFAULT_ASPECT;
  const panelW = width * ((scene.panelWidthPct ?? 62) / 100);
  const panelH = panelW / aspect;

  const push =
    scene.push === false ? 1 : interpolate(frame, [0, durationInFrames], [1, 1.05]);
  // Settle-in: the panel drifts up and rotates the last degree into place.
  const settle = interpolate(frame, [0, 18], [0, 1], {extrapolateRight: 'clamp'});
  const tilt = scene.tilt ?? -8;
  const rotY = tilt * (0.82 + 0.18 * settle);
  const rotZ = (tilt < 0 ? -1.2 : 1.2) * settle;
  // Ride slightly high so a bottom kinetic line sits in a clean canvas gutter.
  const baseY = -height * 0.05;
  const lift = baseY + interpolate(settle, [0, 1], [26, 0]);

  const showGlow = scene.glow ?? true;

  return (
    <AbsoluteFill>
      {showGlow ? <GlowCanvas /> : <AbsoluteFill style={{backgroundColor: colors.background}} />}
      <AbsoluteFill
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          perspective: 1800,
        }}
      >
        <div
          style={{
            width: panelW,
            height: panelH,
            transform: `translateY(${lift}px) rotateY(${rotY}deg) rotateZ(${rotZ}deg) scale(${push})`,
            transformStyle: 'preserve-3d',
            borderRadius: 22,
            overflow: 'hidden',
            boxShadow:
              '0 40px 100px rgba(17,32,64,0.28), 0 8px 24px rgba(17,32,64,0.16)',
            outline: `1px solid ${colors.secondaryLight}55`,
            outlineOffset: -1,
            position: 'relative',
          }}
        >
          <OffthreadVideo
            src={staticFile(scene.src)}
            trimBefore={
              scene.trimStartSec ? Math.round(scene.trimStartSec * fps) : undefined
            }
            muted={scene.muted ?? true}
            playbackRate={scene.playbackRate}
            style={{
              width: '100%',
              height: '100%',
              objectFit: scene.fit ?? 'cover',
              display: 'block',
            }}
          />
          {(scene.masks ?? []).map((m, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: `${m.xPct}%`,
                top: `${m.yPct}%`,
                width: `${m.wPct}%`,
                height: `${m.hPct}%`,
                borderRadius: m.radius ?? 6,
                background: 'rgba(230,233,240,0.72)',
                backdropFilter: 'blur(9px)',
                WebkitBackdropFilter: 'blur(9px)',
              }}
            />
          ))}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
