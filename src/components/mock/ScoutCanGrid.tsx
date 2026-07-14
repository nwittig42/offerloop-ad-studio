import {spring, useCurrentFrame, useVideoConfig} from 'remotion';
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
 * The product's "SCOUT CAN" capability grid, cards popping in staggered,
 * then the breadth line lands: one agent, all of it.
 */
export const ScoutCanGrid: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const headIn = spring({frame: frame - CARDS.length * 5 - 14, fps, config: {damping: 200}});

  return (
    <MockStage backgroundColor={colors.background}>
      <div
        style={{
          position: 'absolute',
          top: 130,
          left: 0,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 380px)',
            gap: 26,
          }}
        >
          {CARDS.map((c, i) => {
            const enter = spring({frame: frame - i * 5, fps, config: {damping: 200, stiffness: 130}});
            return (
              <div
                key={c.title}
                style={{
                  height: 210,
                  borderRadius: 22,
                  background: '#fff',
                  boxShadow: '0 16px 40px rgba(18,31,64,0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 22,
                  padding: '0 30px',
                  opacity: enter,
                  transform: `translateY(${(1 - enter) * 40}px) scale(${0.9 + 0.1 * enter})`,
                  fontFamily: fonts.body,
                }}
              >
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 16,
                    background: '#EEF1FA',
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
                  <div style={{fontWeight: 500, fontSize: 21, color: '#6B7385', marginTop: 6}}>
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
          top: 750,
          width: '100%',
          textAlign: 'center',
          fontFamily: fonts.heading,
          fontWeight: 700,
          fontSize: 82,
          letterSpacing: '-0.02em',
          color: colors.ink,
          opacity: headIn,
          transform: `translateY(${(1 - headIn) * 24}px)`,
        }}
      >
        One agent. All of it.
      </div>
    </MockStage>
  );
};
