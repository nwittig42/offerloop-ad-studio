import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors, fonts} from '../../../brand/theme';
import {MockStage} from './MockStage';

const GRAYTXT = '#6B7385';
const QUERY = 'Analysts at Goldman Sachs';

const PEOPLE = [
  {name: 'Sarah Kim', role: 'Investment Banking Analyst', school: "USC '24", status: 'Replied 2h ago', statusColor: '#218547', rot: -4, x: 240, y: 300},
  {name: 'Marcus Webb', role: 'Technology, Media & Telecom', school: "USC '23", status: 'Draft ready', statusColor: colors.primary, rot: 0, x: 700, y: 340},
  {name: 'Priya Shah', role: 'Equity Research Associate', school: "UCLA '22", status: 'Draft ready', statusColor: colors.primary, rot: 4, x: 1160, y: 300},
];

/** Contact finder: query types itself, people cards fan in. */
export const FindContacts: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const typedChars = Math.round(
    interpolate(frame, [5, 5 + QUERY.length * 1.2], [0, QUERY.length], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }),
  );
  const cursorOn = Math.floor(frame / 15) % 2 === 0;
  const cardsStart = 5 + QUERY.length * 1.2 + 8;

  return (
    <MockStage backgroundColor={colors.background}>
      <div
        style={{
          position: 'absolute',
          left: 440,
          top: 110,
          width: 1040,
          height: 84,
          borderRadius: 42,
          background: '#fff',
          boxShadow: '0 12px 36px rgba(18,31,64,0.14)',
          display: 'flex',
          alignItems: 'center',
          fontFamily: fonts.body,
        }}
      >
        <div style={{marginLeft: 44, fontSize: 28, fontWeight: 500, color: colors.ink, flexGrow: 1}}>
          {QUERY.slice(0, typedChars)}
          <span style={{opacity: cursorOn ? 1 : 0}}>|</span>
        </div>
        <div style={{marginRight: 12, padding: '16px 36px', borderRadius: 30, background: colors.primary, color: '#fff', fontWeight: 700, fontSize: 24}}>
          Search
        </div>
      </div>

      {PEOPLE.map((p, i) => {
        const enter = spring({frame: frame - cardsStart - i * 6, fps, config: {damping: 200, stiffness: 110}});
        const initials = p.name.split(' ').map((w) => w[0]).join('');
        return (
          <div
            key={p.name}
            style={{
              position: 'absolute',
              left: p.x,
              top: p.y,
              width: 500,
              height: 560,
              borderRadius: 24,
              background: '#fff',
              boxShadow: '0 20px 52px rgba(18,31,64,0.16)',
              transform: `rotate(${p.rot * enter}deg) translateY(${(1 - enter) * 120}px)`,
              opacity: enter,
              fontFamily: fonts.body,
              textAlign: 'center',
            }}
          >
            <div style={{margin: '48px auto 0', width: 120, height: 120, borderRadius: 60, background: colors.secondaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 44, color: colors.ink}}>
              {initials}
            </div>
            <div style={{marginTop: 28, fontWeight: 700, fontSize: 34, color: colors.ink}}>{p.name}</div>
            <div style={{marginTop: 8, fontSize: 22, color: GRAYTXT}}>{p.role}</div>
            <div style={{display: 'inline-block', marginTop: 22, padding: '10px 18px', borderRadius: 999, background: '#E9EBF2', fontSize: 20, fontWeight: 500, color: colors.ink}}>
              {p.school}
            </div>
            <div style={{margin: '30px auto 0', width: 380, padding: '18px 0', borderRadius: 32, background: colors.primary, color: '#fff', fontWeight: 700, fontSize: 24}}>
              Email: draft ready
            </div>
            <div style={{marginTop: 22, fontSize: 20, fontWeight: 500, color: p.statusColor}}>{p.status}</div>
          </div>
        );
      })}
    </MockStage>
  );
};
