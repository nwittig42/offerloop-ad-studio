import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors, fonts} from '../../../brand/theme';
import {MockStage} from './MockStage';

// The real dashboard's "SCOUT CAN" capability cards, verbatim.
const CARDS = [
  {icon: 'briefcase', title: 'Apply to jobs', sub: 'Find roles that fit & apply'},
  {icon: 'search', title: 'Find people at companies', sub: 'Names + verified emails'},
  {icon: 'target', title: 'Reach the hiring manager', sub: 'Find who owns the role'},
  {icon: 'building', title: 'Research companies', sub: 'Know them before you reach out'},
  {icon: 'coffee', title: 'Prep for meetings', sub: 'Walk in confident'},
  {icon: 'pen', title: 'Write a cover letter', sub: 'Personalized in seconds'},
  {icon: 'doc', title: 'Tailor your resume', sub: 'Match any job description'},
  {icon: 'people', title: 'Track everything', sub: 'Contacts & conversations'},
] as const;

const GLOW_START = 52; // frame the sweep begins (after headline + cards land)
const GLOW_STEP = 7; // frames between cards lighting up
const GLOW_LEN = 26; // how long a card stays lit

const Icon: React.FC<{name: (typeof CARDS)[number]['icon']}> = ({name}) => {
  const s = {
    fill: 'none',
    stroke: colors.primary,
    strokeWidth: 2.6,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  } as const;
  return (
    <svg width={34} height={34} viewBox="0 0 24 24" style={{display: 'block'}}>
      {name === 'briefcase' && (
        <g {...s}>
          <rect x="3" y="7" width="18" height="13" rx="2" />
          <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 12h18" />
        </g>
      )}
      {name === 'search' && (
        <g {...s}>
          <circle cx="11" cy="11" r="6.5" />
          <path d="M20 20l-4.2-4.2" />
        </g>
      )}
      {name === 'target' && (
        <g {...s}>
          <circle cx="12" cy="12" r="8.5" />
          <circle cx="12" cy="12" r="4.5" />
          <circle cx="12" cy="12" r="1" />
        </g>
      )}
      {name === 'building' && (
        <g {...s}>
          <rect x="5" y="4" width="14" height="17" rx="1.5" />
          <path d="M9 8h2M13 8h2M9 12h2M13 12h2M9 16h2M13 16h2" />
        </g>
      )}
      {name === 'coffee' && (
        <g {...s}>
          <path d="M4 9h12v7a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V9z" />
          <path d="M16 10h2a2.5 2.5 0 0 1 0 5h-2M7 5.5v1.5M11 5.5v1.5" />
        </g>
      )}
      {name === 'pen' && (
        <g {...s}>
          <path d="M4 20l1.2-4.2L16.4 4.6a2 2 0 0 1 2.8 0l.2.2a2 2 0 0 1 0 2.8L8.2 18.8 4 20z" />
        </g>
      )}
      {name === 'doc' && (
        <g {...s}>
          <path d="M6 3h8l4 4v14H6V3z" />
          <path d="M14 3v4h4M9 12h6M9 16h6" />
        </g>
      )}
      {name === 'people' && (
        <g {...s}>
          <circle cx="9" cy="9" r="3.2" />
          <path d="M3.5 20a5.5 5.5 0 0 1 11 0M16 6.5a3.2 3.2 0 0 1 0 5.4M20.5 20a5.5 5.5 0 0 0-4-5.2" />
        </g>
      )}
    </svg>
  );
};

/**
 * Cinematic take on the dashboard's "SCOUT CAN" grid: dark navy space,
 * cards float in on a tilted 3D plane, then an indigo glow sweeps across
 * them one by one before the breadth line lands. Text is Remotion-crisp —
 * the Higgsfield takes garbled the card copy (jobs b4f37329 / 846bf688).
 */
export const ScoutCanGrid: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  // Headline leads; the cards are the payoff and close the beat.
  const headIn = spring({frame, fps, config: {damping: 200}});
  const drift = interpolate(frame, [0, 300], [1, 1.06]);

  return (
    <MockStage backgroundColor={colors.secondaryDark}>
      {/* deep-space backdrop: soft radial key light + vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 70% 55% at 50% 34%, rgba(74,96,168,0.45), rgba(30,45,77,0) 70%), linear-gradient(180deg, #16233E 0%, #1E2D4D 55%, #101B31 100%)',
        }}
      />
      {/* diagonal light streak, echoing the cine beats */}
      <div
        style={{
          position: 'absolute',
          top: -200,
          left: 380,
          width: 340,
          height: 1500,
          transform: 'rotate(24deg)',
          background:
            'linear-gradient(90deg, rgba(182,195,232,0) 0%, rgba(182,195,232,0.10) 50%, rgba(182,195,232,0) 100%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          justifyContent: 'center',
          perspective: 1400,
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 320,
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 380px)',
            gap: 26,
            transform: `rotateX(9deg) rotateY(-4deg) scale(${drift})`,
            transformStyle: 'preserve-3d',
          }}
        >
          {CARDS.map((c, i) => {
            const enter = spring({frame: frame - 16 - i * 4, fps, config: {damping: 200, stiffness: 120}});
            // indigo glow sweeping across the grid, one card at a time
            const glow = interpolate(
              frame,
              [
                GLOW_START + i * GLOW_STEP,
                GLOW_START + i * GLOW_STEP + 8,
                GLOW_START + i * GLOW_STEP + GLOW_LEN,
                GLOW_START + i * GLOW_STEP + GLOW_LEN + 14,
              ],
              [0, 1, 0.55, 0.25],
              {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
            );
            return (
              <div
                key={c.title}
                style={{
                  height: 210,
                  borderRadius: 22,
                  background: `rgba(255,255,255,${0.9 + 0.1 * glow})`,
                  border: `2px solid rgba(182,195,232,${0.25 + 0.75 * glow})`,
                  boxShadow: `0 24px 60px rgba(6,12,26,0.55), 0 0 ${40 * glow}px rgba(122,150,230,${0.75 * glow}), inset 0 0 ${26 * glow}px rgba(160,180,240,${0.35 * glow})`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 22,
                  padding: '0 30px',
                  opacity: enter,
                  transform: `translateY(${(1 - enter) * 90}px) translateZ(${glow * 34}px)`,
                  fontFamily: fonts.body,
                }}
              >
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 16,
                    background: `rgba(228,233,248,${0.85 + 0.15 * glow})`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Icon name={c.icon} />
                </div>
                <div>
                  <div style={{fontWeight: 700, fontSize: 30, color: colors.ink, lineHeight: 1.2}}>
                    {c.title}
                  </div>
                  <div style={{fontWeight: 500, fontSize: 21, color: '#5D677E', marginTop: 6}}>
                    {c.sub}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          top: 118,
          width: '100%',
          textAlign: 'center',
          fontFamily: fonts.heading,
          fontWeight: 700,
          fontSize: 78,
          letterSpacing: '-0.02em',
          color: '#fff',
          textShadow: '0 2px 30px rgba(10,18,38,0.6)',
          opacity: headIn,
          transform: `translateY(${(1 - headIn) * 24}px)`,
        }}
      >
        One assistant. Every part of the job hunt.
      </div>
    </MockStage>
  );
};
