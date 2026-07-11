import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors, fonts} from '../../../brand/theme';
import {MockStage} from './MockStage';

const TABS = [
  'LinkedIn — 84 jobs',
  'Indeed — Analyst roles',
  'Handshake',
  'cover-letter-v7-FINAL.docx',
  'Resume_2026_v3.pdf',
  'Gmail — Inbox (47)',
];

const INK = colors.ink;
const GRAYTXT = '#6B7385';

/** "Endless tabs…" pain shot: browser chrome, tabs popping in one by one. */
export const BrowserTabsPain: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const headIn = spring({frame, fps, config: {damping: 200}});

  return (
    <MockStage backgroundColor={colors.background}>
      <div
        style={{
          position: 'absolute',
          top: 70,
          width: '100%',
          textAlign: 'center',
          fontFamily: fonts.body,
          fontWeight: 700,
          fontSize: 76,
          color: INK,
          opacity: headIn,
        }}
      >
        Endless tabs…
      </div>

      <div
        style={{
          position: 'absolute',
          left: 80,
          top: 210,
          width: 1760,
          height: 830,
          background: '#fff',
          borderRadius: 18,
          boxShadow: '0 16px 48px rgba(18,31,64,0.18)',
          overflow: 'hidden',
        }}
      >
        {/* tab bar */}
        <div style={{height: 56, background: '#DEE1EA', position: 'relative'}}>
          {['#FF5F57', '#FFBD2E', '#28C840'].map((c, i) => (
            <div
              key={c}
              style={{
                position: 'absolute',
                left: 22 + i * 26,
                top: 21,
                width: 14,
                height: 14,
                borderRadius: 7,
                background: c,
              }}
            />
          ))}
          {TABS.map((label, i) => {
            const pop = spring({frame: frame - 8 - i * 7, fps, config: {damping: 200, stiffness: 160}});
            return (
              <div
                key={label}
                style={{
                  position: 'absolute',
                  left: 110 + i * 288,
                  top: 9,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '9px 14px 9px 18px',
                  borderRadius: 10,
                  background: i === 0 ? '#fff' : '#E9EBF2',
                  fontFamily: fonts.body,
                  fontSize: 15,
                  fontWeight: 500,
                  color: i === 0 ? INK : GRAYTXT,
                  opacity: Math.max(0, pop),
                  transform: `scale(${0.7 + 0.3 * Math.max(0, pop)})`,
                  whiteSpace: 'nowrap',
                }}
              >
                <span style={{width: 14, height: 14, borderRadius: 7, background: colors.primary}} />
                {label}
                <span style={{color: GRAYTXT}}>×</span>
              </div>
            );
          })}
        </div>
        {/* url bar */}
        <div style={{height: 56, background: '#F4F5F9', display: 'flex', alignItems: 'center'}}>
          <div
            style={{
              marginLeft: 100,
              width: 1560,
              height: 38,
              borderRadius: 19,
              background: '#fff',
              display: 'flex',
              alignItems: 'center',
              paddingLeft: 20,
              fontFamily: fonts.body,
              fontSize: 15,
              color: GRAYTXT,
            }}
          >
            linkedin.com/jobs/search?keywords=investment+banking+analyst&location=New+York
          </div>
        </div>
        {/* job list skeleton */}
        {Array.from({length: 5}, (_, i) => {
          const rowIn = interpolate(frame - 10 - i * 3, [0, 10], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: 100,
                top: 150 + i * 128,
                width: 1560,
                height: 100,
                borderRadius: 12,
                background: '#ECEEF3',
                opacity: rowIn,
              }}
            >
              <div style={{position: 'absolute', left: 28, top: 24, width: 420, height: 18, borderRadius: 9, background: '#CCD1E0'}} />
              <div style={{position: 'absolute', left: 28, top: 56, width: 260, height: 14, borderRadius: 7, background: '#DBDFEA'}} />
            </div>
          );
        })}
      </div>
    </MockStage>
  );
};
