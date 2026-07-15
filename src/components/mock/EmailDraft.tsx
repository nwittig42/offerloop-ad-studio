import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors, fonts} from '../../../brand/theme';
import {MockStage} from './MockStage';

const GRAYTXT = '#6B7385';
const BODY = `Hi Emily,

I’m Nick, a junior at USC studying Business Administration with a focus on fintech. I noticed your team just expanded the Technology Analyst program , congratulations.

Your path from engineering into leading recruiting for the program stood out to me. I’d love 15 minutes to hear how you think about candidates who…`;

/** Gmail-style draft to the hiring manager, body typing itself, Send pulsing. */
export const EmailDraft: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const winIn = spring({frame, fps, config: {damping: 200}});
  const typed = Math.round(
    interpolate(frame, [10, 10 + BODY.length * 0.22], [0, BODY.length], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }),
  );
  const donetyping = typed >= BODY.length;
  const sendPulse = donetyping ? 1 + 0.06 * Math.abs(Math.sin(frame / 6)) : 1;

  return (
    <MockStage backgroundColor={colors.secondaryDark}>
      <div
        style={{
          position: 'absolute',
          left: 460,
          top: 100,
          width: 1000,
          height: 880,
          borderRadius: 24,
          background: '#fff',
          boxShadow: '0 24px 72px rgba(0,0,0,0.35)',
          opacity: winIn,
          transform: `translateY(${(1 - winIn) * 60}px)`,
          fontFamily: fonts.body,
        }}
      >
        <div style={{position: 'absolute', left: 56, top: 44, fontWeight: 700, fontSize: 30, color: colors.ink}}>Your draft</div>
        <div style={{position: 'absolute', right: 44, top: 36, fontSize: 34, color: GRAYTXT}}>×</div>

        <div style={{position: 'absolute', left: 56, top: 110, width: 64, height: 64, borderRadius: 32, background: colors.secondaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 24, color: colors.ink}}>
          ED
        </div>
        <div style={{position: 'absolute', left: 140, top: 116, fontWeight: 700, fontSize: 26, color: colors.ink}}>Emily Dawson</div>
        <div style={{position: 'absolute', left: 140, top: 152, fontSize: 20, color: GRAYTXT}}>
          Hiring Manager, Technology Analyst Program
        </div>

        <div style={{position: 'absolute', left: 56, top: 208, width: 888, height: 2, background: '#E5E7EF'}} />
        <div style={{position: 'absolute', left: 56, top: 228, fontSize: 18, fontWeight: 500, color: GRAYTXT}}>Subject</div>
        <div style={{position: 'absolute', left: 56, top: 258, fontWeight: 700, fontSize: 24, color: colors.ink}}>
          USC junior interested in your Technology Analyst program
        </div>
        <div style={{position: 'absolute', left: 56, top: 310, width: 888, height: 2, background: '#E5E7EF'}} />

        <div style={{position: 'absolute', left: 56, top: 336, width: 888, fontSize: 22, lineHeight: 1.5, color: '#38424F', whiteSpace: 'pre-wrap'}}>
          {BODY.slice(0, typed)}
          {!donetyping && <span>|</span>}
        </div>

        <div
          style={{
            position: 'absolute',
            left: 56,
            top: 750,
            width: 220,
            height: 68,
            borderRadius: 34,
            background: colors.primary,
            color: '#fff',
            fontWeight: 700,
            fontSize: 26,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: `scale(${sendPulse})`,
            boxShadow: donetyping ? '0 8px 28px rgba(74,96,168,0.5)' : 'none',
          }}
        >
          Send
        </div>
        <div style={{position: 'absolute', left: 300, top: 760, padding: '12px 20px', borderRadius: 999, background: '#E9EBF2', fontSize: 20, fontWeight: 500, color: colors.ink}}>
          Sends from your own Gmail
        </div>
      </div>
    </MockStage>
  );
};
