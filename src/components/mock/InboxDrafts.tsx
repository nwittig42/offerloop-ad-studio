import {spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors, fonts} from '../../../brand/theme';
import {MockStage} from './MockStage';

const GRAYTXT = '#6B7385';

const ROWS = [
  {who: 'Sarah Kim', what: 'Re: Coffee chat next week?', tag: 'Your turn', tagBg: '#FBEAEA', tagColor: '#DB382E'},
  {who: 'Emily Dawson', what: 'Draft ready — Technology Analyst program', tag: 'Draft ready', tagBg: '#E9EBF2', tagColor: '#4A60A8'},
  {who: 'Marcus Webb', what: 'Happy to intro you to our staffing lead', tag: 'Replied', tagBg: '#E0F2E4', tagColor: '#218547'},
  {who: 'Priya Shah', what: 'Draft ready — Equity Research coffee chat', tag: 'Draft ready', tagBg: '#E9EBF2', tagColor: '#4A60A8'},
  {who: 'Jane Street Recruiting', what: 'Re: Rotational Trading Desk Operations', tag: 'Replied', tagBg: '#E0F2E4', tagColor: '#218547'},
  {who: 'David Osei', what: 'Draft ready — Alumni outreach, McKinsey', tag: 'Draft ready', tagBg: '#E9EBF2', tagColor: '#4A60A8'},
];

/** One inbox: every outreach thread with its status, rows cascading in. */
export const InboxDrafts: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const winIn = spring({frame, fps, config: {damping: 200}});

  return (
    <MockStage backgroundColor={colors.background}>
      <div
        style={{
          position: 'absolute',
          left: 360,
          top: 90,
          width: 1200,
          height: 900,
          borderRadius: 24,
          background: '#fff',
          boxShadow: '0 20px 60px rgba(18,31,64,0.16)',
          opacity: winIn,
          fontFamily: fonts.body,
          overflow: 'hidden',
        }}
      >
        <div style={{padding: '40px 56px 24px', fontWeight: 700, fontSize: 34, color: colors.ink}}>Inbox</div>
        <div style={{display: 'flex', gap: 12, padding: '0 56px 24px'}}>
          {['All', 'Your turn', 'Waiting', 'Replied'].map((f, i) => (
            <div
              key={f}
              style={{
                padding: '10px 22px',
                borderRadius: 999,
                background: i === 0 ? colors.primary : '#E9EBF2',
                color: i === 0 ? '#fff' : colors.ink,
                fontWeight: 600,
                fontSize: 20,
              }}
            >
              {f}
            </div>
          ))}
        </div>
        {ROWS.map((r, i) => {
          const rowIn = spring({frame: frame - 8 - i * 5, fps, config: {damping: 200, stiffness: 140}});
          return (
            <div
              key={r.who}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 24,
                padding: '22px 56px',
                borderTop: '2px solid #EFF1F6',
                opacity: rowIn,
                transform: `translateX(${(1 - rowIn) * 60}px)`,
              }}
            >
              <div style={{width: 56, height: 56, borderRadius: 28, background: colors.secondaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 20, color: colors.ink, flexShrink: 0}}>
                {r.who.split(' ').map((w) => w[0]).join('').slice(0, 2)}
              </div>
              <div style={{flexGrow: 1, minWidth: 0}}>
                <div style={{fontWeight: 700, fontSize: 24, color: colors.ink}}>{r.who}</div>
                <div style={{fontSize: 20, color: GRAYTXT, marginTop: 4}}>{r.what}</div>
              </div>
              <div style={{padding: '8px 18px', borderRadius: 999, background: r.tagBg, color: r.tagColor, fontWeight: 700, fontSize: 18, flexShrink: 0}}>
                {r.tag}
              </div>
            </div>
          );
        })}
      </div>
    </MockStage>
  );
};
