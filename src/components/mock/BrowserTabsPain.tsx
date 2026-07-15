import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors, fonts} from '../../../brand/theme';
import {MockStage} from './MockStage';

const TABS = [
  'LinkedIn: 84 jobs',
  'Job Tracker: Google Sheets',
  'ChatGPT: cover letter v9',
  'Gmail: Inbox (147)',
  'LinkedIn: Connect requests',
  'ChatGPT: resume bullets',
];

const INK = colors.ink;
const GRAYTXT = '#6B7385';

// Cold open: the claim lands alone, then the browser slams in as the proof.
const BROWSER_IN = 55; // frame the browser window enters

/** Opening shot: "Getting a job is a full-time job in itself." → tab chaos. */
export const BrowserTabsPain: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const line1In = spring({frame, fps, config: {damping: 200}});
  const line2In = spring({frame: frame - 14, fps, config: {damping: 200, stiffness: 130}});
  // headline glides from center stage to the top as the browser enters
  const settle = spring({frame: frame - BROWSER_IN, fps, config: {damping: 200}});
  const headTop = interpolate(settle, [0, 1], [360, 56]);
  const headScale = interpolate(settle, [0, 1], [1, 0.62]);
  const browserIn = spring({frame: frame - BROWSER_IN - 6, fps, config: {damping: 200, stiffness: 90}});
  const tabFrame = frame - BROWSER_IN - 14; // tabs start after the window lands

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
          color: INK,
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
          background: '#fff',
          borderRadius: 18,
          boxShadow: '0 16px 48px rgba(18,31,64,0.18)',
          overflow: 'hidden',
          opacity: Math.max(0, browserIn),
          transform: `translateY(${(1 - Math.max(0, browserIn)) * 400}px)`,
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
            const pop = spring({frame: tabFrame - i * 7, fps, config: {damping: 200, stiffness: 160}});
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
          const rowIn = interpolate(tabFrame - 2 - i * 3, [0, 10], [0, 1], {
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
