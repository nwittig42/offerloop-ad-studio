import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors, fonts} from '../../../brand/theme';
import {MockStage} from './MockStage';

const CARDS = [
  {x: 120, y: 140, rot: -6, title: 'Application update', snippet: 'Thank you for your interest. Unfortunately, we have decided…'},
  {x: 1180, y: 110, rot: 5, title: 'Application received', snippet: 'You are applicant #412 for Analyst, Investment Banking'},
  {x: 210, y: 700, rot: 4, title: 'Goldman Sachs Careers', snippet: 'Your application status has been updated: Not selected'},
  {x: 1240, y: 660, rot: -5, title: 'LinkedIn', snippet: 'Weekly digest: 9 new jobs match "consulting analyst"'},
  {x: 700, y: 840, rot: 2, title: 'no-reply@workday.com', snippet: 'Thank you for applying. Due to the volume of applications…'},
];

/** Dark pain shot: rejection emails drifting in, badge counters ticking up. */
export const RejectionsPain: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const headIn = spring({frame: frame - 12, fps, config: {damping: 200}});

  return (
    <MockStage backgroundColor={colors.secondaryDark}>
      {CARDS.map((c, i) => {
        const enter = spring({frame: frame - i * 5, fps, config: {damping: 200, stiffness: 90}});
        const drift = Math.sin((frame + i * 37) / 40) * 6;
        return (
          <div
            key={c.title}
            style={{
              position: 'absolute',
              left: c.x,
              top: c.y,
              width: 560,
              height: 120,
              borderRadius: 16,
              background: '#fff',
              boxShadow: '0 12px 36px rgba(0,0,0,0.35)',
              transform: `rotate(${c.rot}deg) translateY(${(1 - enter) * 60 + drift}px)`,
              opacity: enter,
            }}
          >
            <div style={{position: 'absolute', left: 24, top: 38, width: 44, height: 44, borderRadius: 22, background: colors.secondaryLight}} />
            <div style={{position: 'absolute', left: 88, top: 24, fontFamily: fonts.body, fontWeight: 700, fontSize: 20, color: colors.ink}}>
              {c.title}
            </div>
            <div style={{position: 'absolute', left: 88, top: 56, width: 440, fontFamily: fonts.body, fontSize: 16, color: '#6B7385', lineHeight: 1.3}}>
              {c.snippet}
            </div>
          </div>
        );
      })}

      {[{x: 880, y: 300, n: 247}, {x: 1040, y: 260, n: 512}].map((b, i) => {
        const count = Math.round(
          interpolate(frame, [10 + i * 6, 55], [Math.max(1, b.n - 60), b.n], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
        );
        const enter = spring({frame: frame - 8 - i * 6, fps, config: {damping: 200}});
        return (
          <div
            key={b.n}
            style={{
              position: 'absolute',
              left: b.x,
              top: b.y,
              width: 96,
              height: 96,
              borderRadius: 48,
              background: '#EB4335',
              boxShadow: '0 0 40px 6px rgba(235,67,53,0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: fonts.body,
              fontWeight: 700,
              fontSize: 34,
              color: '#fff',
              transform: `scale(${enter})`,
            }}
          >
            {count}
          </div>
        );
      })}

      <div
        style={{
          position: 'absolute',
          top: 480,
          width: '100%',
          textAlign: 'center',
          fontFamily: fonts.body,
          fontWeight: 700,
          fontSize: 76,
          color: '#fff',
          opacity: headIn,
          textShadow: '0 4px 40px rgba(0,0,0,0.5)',
        }}
      >
        Rejections everywhere.
      </div>
    </MockStage>
  );
};
