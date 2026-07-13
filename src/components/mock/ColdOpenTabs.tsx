import {
  OffthreadVideo,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {colors, fonts} from '../../../brand/theme';
import {MockStage} from './MockStage';

// TrueView cold open: the claim lands alone, then glides to the top while the
// REAL Chrome recording (not a mock) slides in from below as a framed window.
const WINDOW_IN = 38; // frame the recording window enters (tightened pacing)
const HEADLINE_OUT = WINDOW_IN + 8; // headline hands the top spot to the word pops

export const ColdOpenTabs: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const line1In = spring({frame, fps, config: {damping: 200}});
  const line2In = spring({frame: frame - 10, fps, config: {damping: 200, stiffness: 130}});
  // headline glides from center stage to the top as the window enters,
  // then fades out so the Network/Track/Apply/Repeat pops own the top spot
  const settle = spring({frame: frame - WINDOW_IN, fps, config: {damping: 200}});
  const headTop = interpolate(settle, [0, 1], [360, 56]);
  const headScale = interpolate(settle, [0, 1], [1, 0.62]);
  const headOut = interpolate(frame, [HEADLINE_OUT, HEADLINE_OUT + 10], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const windowIn = spring({frame: frame - WINDOW_IN - 6, fps, config: {damping: 200, stiffness: 90}});

  return (
    <MockStage backgroundColor={colors.background}>
      <div
        style={{
          position: 'absolute',
          top: headTop,
          width: '100%',
          textAlign: 'center',
          fontFamily: fonts.body,
          fontWeight: 700,
          color: colors.ink,
          opacity: headOut,
          transform: `scale(${headScale})`,
          transformOrigin: 'center top',
        }}
      >
        <div style={{fontSize: 110, opacity: line1In, transform: `translateY(${(1 - line1In) * 30}px)`}}>
          Getting a job
        </div>
        <div style={{fontSize: 110, opacity: Math.max(0, line2In), transform: `translateY(${(1 - Math.max(0, line2In)) * 30}px)`}}>
          is a <span style={{color: colors.primary}}>full-time job</span> in itself.
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          left: 80,
          top: 300,
          width: 1760,
          height: 830,
          borderRadius: 18,
          boxShadow: '0 16px 48px rgba(18,31,64,0.18)',
          overflow: 'hidden',
          background: '#fff',
          opacity: Math.max(0, windowIn),
          transform: `translateY(${(1 - Math.max(0, windowIn)) * 400}px)`,
        }}
      >
        <Sequence from={WINDOW_IN + 6} layout="none">
          <OffthreadVideo
            src={staticFile('assets/generated/chrome-tabs-cinematic-v1.mp4')}
            muted
            style={{width: '100%', height: '100%', objectFit: 'cover'}}
          />
        </Sequence>
      </div>
    </MockStage>
  );
};
