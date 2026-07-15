import {spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors, fonts} from '../../../brand/theme';
import {MockStage} from './MockStage';

const GRAYTXT = '#6B7385';
const CHIP = '#E9EBF2';

/** Job card + Scout applying: swipe → "Application sent" toast. */
export const JobCardApply: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const cardIn = spring({frame, fps, config: {damping: 200}});
  const toastIn = spring({frame: frame - Math.round(fps * 1.6), fps, config: {damping: 200, stiffness: 140}});
  const sendPulse = 1 + 0.08 * Math.max(0, Math.sin((frame - fps) / 5)) * (frame > fps ? 1 : 0);

  return (
    <MockStage backgroundColor={colors.background}>
      <div
        style={{
          position: 'absolute',
          left: 500,
          top: 120,
          width: 920,
          height: 840,
          borderRadius: 28,
          background: '#fff',
          boxShadow: '0 20px 60px rgba(18,31,64,0.16)',
          opacity: cardIn,
          transform: `translateY(${(1 - cardIn) * 50}px)`,
          fontFamily: fonts.body,
        }}
      >
        <div style={{position: 'absolute', left: 56, top: 56, width: 72, height: 72, borderRadius: 18, background: colors.secondaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 34, color: colors.ink}}>
          M
        </div>
        <div style={{position: 'absolute', left: 152, top: 56, fontWeight: 700, fontSize: 40, color: colors.ink}}>Technology Analyst</div>
        <div style={{position: 'absolute', left: 152, top: 110, fontWeight: 500, fontSize: 22, color: GRAYTXT}}>Marshall Wace · New York, NY</div>

        <div style={{position: 'absolute', left: 56, top: 180, fontSize: 20, fontWeight: 500, color: GRAYTXT}}>Compensation</div>
        <div style={{position: 'absolute', left: 56, top: 214, padding: '12px 20px', borderRadius: 12, background: '#E0F2E4', color: '#218547', fontWeight: 700, fontSize: 24}}>
          $150,000 / yr
        </div>

        <div style={{position: 'absolute', left: 56, top: 300, fontSize: 20, fontWeight: 500, color: GRAYTXT}}>Work arrangement</div>
        {['Full-time', 'Hybrid', '2027 grads'].map((c, i) => (
          <div key={c} style={{position: 'absolute', left: 56 + i * 160, top: 334, padding: '10px 18px', borderRadius: 10, background: CHIP, fontSize: 20, fontWeight: 500, color: colors.ink}}>
            {c}
          </div>
        ))}

        <div style={{position: 'absolute', left: 56, top: 420, fontSize: 20, fontWeight: 500, color: GRAYTXT}}>What you’ll do</div>
        {[780, 740, 800, 520].map((w, i) => (
          <div key={i} style={{position: 'absolute', left: 56, top: 460 + i * 34, width: w, height: 16, borderRadius: 8, background: CHIP}} />
        ))}

        {[
          {bg: '#FBEAEA', glyph: '×', color: '#DB382E', scale: 1},
          {bg: colors.primary, glyph: '→', color: '#fff', scale: sendPulse},
          {bg: '#5C4FDB', glyph: 'AI', color: '#fff', scale: 1},
        ].map((b, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: 300 + i * 130,
              top: 690,
              width: 96,
              height: 96,
              borderRadius: 48,
              background: b.bg,
              boxShadow: '0 10px 24px rgba(18,31,64,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: b.glyph === 'AI' ? 32 : 44,
              color: b.color,
              transform: `scale(${b.scale})`,
            }}
          >
            {b.glyph}
          </div>
        ))}
      </div>

      <div
        style={{
          position: 'absolute',
          left: 1180,
          top: 896,
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          padding: '18px 32px 18px 28px',
          borderRadius: 999,
          background: '#176B38',
          boxShadow: '0 12px 32px rgba(0,0,0,0.25)',
          fontFamily: fonts.body,
          fontWeight: 700,
          fontSize: 26,
          color: '#fff',
          opacity: Math.max(0, toastIn),
          transform: `translateY(${(1 - Math.max(0, toastIn)) * 40}px)`,
        }}
      >
        <span>✓</span> Application sent. Scout handled it
      </div>
    </MockStage>
  );
};
