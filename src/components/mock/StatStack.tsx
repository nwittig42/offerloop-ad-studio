import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors, fonts} from '../../../brand/theme';
import {MockStage} from './MockStage';

const STATS = [
  {n: 47, label: 'EMAILS SENT'},
  {n: 12, label: 'REPLIES'},
  {n: 5, label: 'COFFEE CHATS'},
  {n: 1, label: 'OFFER'},
];

/** Social-proof stat cards punching in one by one, counters rolling up. */
export const StatStack: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const headIn = spring({frame: frame - STATS.length * 8 - 10, fps, config: {damping: 200}});

  return (
    <MockStage backgroundColor="#DCE1F2">
      <div style={{position: 'absolute', top: 200, width: '100%', display: 'flex', justifyContent: 'center', gap: 48}}>
        {STATS.map((s, i) => {
          const enter = spring({frame: frame - i * 8, fps, config: {damping: 200, stiffness: 130}});
          const count = Math.round(
            interpolate(frame - i * 8, [0, 25], [0, s.n], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
          );
          return (
            <div
              key={s.label}
              style={{
                width: 330,
                height: 360,
                borderRadius: 28,
                background: '#fff',
                boxShadow: '0 20px 52px rgba(18,31,64,0.14)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 12,
                opacity: enter,
                transform: `scale(${0.8 + 0.2 * enter})`,
                fontFamily: fonts.body,
              }}
            >
              <div style={{fontWeight: 800, fontSize: 110, color: colors.primary, lineHeight: 1}}>{count}</div>
              <div style={{fontWeight: 700, fontSize: 24, letterSpacing: '0.12em', color: '#6B7385'}}>{s.label}</div>
            </div>
          );
        })}
      </div>
      <div
        style={{
          position: 'absolute',
          top: 680,
          width: '100%',
          textAlign: 'center',
          fontFamily: fonts.heading,
          fontWeight: 700,
          fontSize: 64,
          letterSpacing: '-0.02em',
          color: colors.ink,
          opacity: headIn,
        }}
      >
        Real results. Real time back.
      </div>
    </MockStage>
  );
};
