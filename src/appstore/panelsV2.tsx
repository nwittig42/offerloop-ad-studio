import React from 'react';
import {Img, staticFile} from 'remotion';
import {colors, fonts} from '../../brand/theme';
import {
  APP_BLUE,
  FloatChip,
  Headline,
  Kicker,
  LightCanvas,
  PANEL_W,
  PhoneFrame,
  PlaneGlyph,
  Ridge,
  UI_GRAY,
} from './ui';
import {FeedScreen, ScoutChatScreen} from './screens';

// v2 set: Scout-led narrative. Panels 4-7 reuse the v1 components
// (Reach/Research/Prepare/Track) via the registry in index.ts.

const M = 100;

const At: React.FC<{x?: number; y?: number; z?: number; style?: React.CSSProperties; children?: React.ReactNode}> = ({x = 0, y = 0, z, style, children}) => (
  <div style={{position: 'absolute', left: x, top: y, zIndex: z, ...style}}>{children}</div>
);

// ---------------------------------------------------------------- Panel 1

export const PanelV2Assistant: React.FC = () => (
  <LightCanvas>
    <Ridge />
    <At x={0} y={200} style={{width: PANEL_W}}>
      <Headline
        align="center"
        size={130}
        lines={[[{t: 'Your job search'}], [{t: 'assistant.', tint: true}]]}
      />
    </At>
    {[
      {x: 1075, y: 700, s: 46, o: 0.45, r: -16},
      {x: 1145, y: 570, s: 58, o: 0.7, r: -8},
      {x: 1210, y: 425, s: 70, o: 0.95, r: -2},
    ].map((p, i) => (
      <At key={i} x={p.x} y={p.y} style={{opacity: p.o, transform: `rotate(${p.r}deg)`}}>
        <PlaneGlyph size={p.s} color={colors.primary} />
      </At>
    ))}
    <At x={155} y={660} z={4} style={{transform: 'rotate(-3deg)'}}>
      <PhoneFrame scale={2.15}>
        <ScoutChatScreen />
      </PhoneFrame>
    </At>
    <FloatChip
      label="On it, drafting the right person at Stripe."
      icon={<span style={{width: 16, height: 16, borderRadius: 8, background: '#5AD07E', boxShadow: '0 0 12px #5AD07E', display: 'inline-block'}} />}
      bg={colors.secondaryDark}
      color="#fff"
      style={{left: 46, top: 2270, transform: 'rotate(-2deg)', zIndex: 8, fontSize: 31}}
    />
    {/* Scout waves from behind the phone's lower right edge */}
    <At x={936} y={2080} z={6} style={{transform: 'rotate(7deg)'}}>
      <Img src={staticFile('assets/figma/scout-peekaboo-wave.png')} style={{width: 330}} />
    </At>
  </LightCanvas>
);

// ---------------------------------------------------------------- Panel 2

const CAPABILITIES = [
  {icon: '💼', title: 'Apply to jobs', sub: 'Find roles that fit & apply'},
  {icon: '🔍', title: 'Find people at companies', sub: 'Names + verified emails'},
  {icon: '🎯', title: 'Reach the hiring manager', sub: 'Find who owns the role'},
  {icon: '🏢', title: 'Research companies', sub: 'Know them before you reach out'},
  {icon: '☕', title: 'Prep for meetings', sub: 'Walk in confident'},
  {icon: '✍️', title: 'Write a cover letter', sub: 'Personalized in seconds'},
  {icon: '📄', title: 'Tailor your resume', sub: 'Match any job description'},
  {icon: '👥', title: 'Track everything', sub: 'Contacts & conversations'},
];

export const PanelV2ScoutCan: React.FC = () => (
  <LightCanvas>
    <Ridge opacity={0.09} />
    <At x={M} y={170}>
      <Kicker>Scout can</Kicker>
      <Headline
        size={104}
        lines={[[{t: 'One assistant.'}], [{t: 'The entire job search.', tint: true}]]}
        style={{marginTop: 26}}
      />
    </At>
    <At x={M} y={620} style={{width: PANEL_W - M * 2, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 38}}>
      {CAPABILITIES.map((c) => (
        <div
          key={c.title}
          style={{
            background: '#fff',
            borderRadius: 30,
            boxShadow: '0 18px 50px rgba(17,32,64,0.10)',
            padding: '46px 42px 48px',
            fontFamily: fonts.body,
          }}
        >
          <div style={{width: 100, height: 100, borderRadius: 24, background: '#EDF1FA', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48}}>
            {c.icon}
          </div>
          <div style={{fontSize: 41, fontWeight: 800, color: colors.ink, marginTop: 30, lineHeight: 1.22, minHeight: 100}}>{c.title}</div>
          <div style={{fontSize: 28, color: UI_GRAY, marginTop: 10, lineHeight: 1.4}}>{c.sub}</div>
        </div>
      ))}
    </At>
    {/* Scout peeks up over the bottom edge */}
    <At x={760} y={2620} z={6}>
      <Img src={staticFile('assets/figma/scout-peekaboo-ledge.png')} style={{width: 480}} />
    </At>
  </LightCanvas>
);

// ---------------------------------------------------------------- Panel 3

export const PanelV2SwipeApply: React.FC = () => (
  <LightCanvas>
    <Ridge />
    <At x={M} y={180}>
      <Kicker>Apply</Kicker>
      <Headline lines={[[{t: 'Swipe right.'}], [{t: 'It applies for you.', tint: true}]]} style={{marginTop: 26}} />
    </At>
    <At x={560} y={840} style={{width: 150, height: 150, borderRadius: 75, background: '#fff', boxShadow: '0 24px 60px rgba(17,32,64,0.16)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <svg width="56" height="56" viewBox="0 0 24 24" stroke="#DB382E" strokeWidth="2.6" strokeLinecap="round"><path d="M6 6l12 12M18 6 6 18" /></svg>
    </At>
    <At x={760} y={810} style={{width: 170, height: 170, borderRadius: 85, background: APP_BLUE, boxShadow: '0 28px 70px rgba(62,99,242,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <PlaneGlyph size={72} />
    </At>
    <FloatChip label="$120-180k" icon={<span style={{fontSize: 30}}>💵</span>} bg="#FBEDEA" color="#B03A2E" style={{left: 90, top: 1040, transform: 'rotate(-5deg)', zIndex: 8}} />
    <FloatChip
      label="Auto-applied · Marketing Ops"
      icon={<span style={{width: 34, height: 34, borderRadius: 17, background: '#1F9D55', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 800}}>✓</span>}
      style={{left: 620, top: 2450, zIndex: 9, transform: 'rotate(2deg)'}}
    />
    <At x={150} y={1180} z={4} style={{transform: 'rotate(-8deg)'}}>
      <PhoneFrame scale={2.3}>
        <FeedScreen />
      </PhoneFrame>
    </At>
  </LightCanvas>
);
