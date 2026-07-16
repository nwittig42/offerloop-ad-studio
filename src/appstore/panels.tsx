import React from 'react';
import {Img, staticFile} from 'remotion';
import {colors, fonts} from '../../brand/theme';
import {
  APP_BLUE,
  Ridge,
  Avatar,
  Chip,
  DarkCanvas,
  FloatCard,
  FloatChip,
  GREEN,
  Headline,
  Kicker,
  LightCanvas,
  PANEL_W,
  PhoneFrame,
  PlaneGlyph,
  ScoutOrb,
  UI_GRAY,
  UI_LINE,
} from './ui';
import {CompaniesScreen, CompanyScreen, FeedScreen, InboxScreen, PrepDocScreen, StatusPill} from './screens';

const M = 100; // panel side margin

const At: React.FC<{x?: number; y?: number; z?: number; style?: React.CSSProperties; children?: React.ReactNode}> = ({x = 0, y = 0, z, style, children}) => (
  <div style={{position: 'absolute', left: x, top: y, zIndex: z, ...style}}>{children}</div>
);

// ---------------------------------------------------------------- Panel 1

export const Panel01Hook: React.FC = () => (
  <LightCanvas>
    <Ridge />
    <At x={M} y={210}>
      <Headline lines={[[{t: 'Your job search,'}], [{t: 'handled.', tint: true}]]} size={128} />
    </At>
    {/* Paper-plane trail, rising like Sorce's hearts */}
    {[
      {x: 1030, y: 760, s: 44, o: 0.45, r: -18},
      {x: 1105, y: 620, s: 56, o: 0.65, r: -10},
      {x: 1180, y: 470, s: 68, o: 0.9, r: -4},
    ].map((p, i) => (
      <At key={i} x={p.x} y={p.y} style={{opacity: p.o, transform: `rotate(${p.r}deg)`}}>
        <PlaneGlyph size={p.s} color={colors.primary} />
      </At>
    ))}
    {/* Floating pass / send buttons */}
    <At x={560} y={800} style={{width: 150, height: 150, borderRadius: 75, background: '#fff', boxShadow: '0 24px 60px rgba(17,32,64,0.16)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <svg width="56" height="56" viewBox="0 0 24 24" stroke="#DB382E" strokeWidth="2.6" strokeLinecap="round"><path d="M6 6l12 12M18 6 6 18" /></svg>
    </At>
    <At x={760} y={770} style={{width: 170, height: 170, borderRadius: 85, background: APP_BLUE, boxShadow: '0 28px 70px rgba(62,99,242,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <PlaneGlyph size={72} />
    </At>
    <FloatChip label="$120-180k" icon={<span style={{fontSize: 30}}>💵</span>} bg="#FBEDEA" color="#B03A2E" style={{left: 90, top: 1020, transform: 'rotate(-5deg)', zIndex: 8}} />
    <FloatChip label="Remote" icon={<span style={{fontSize: 30}}>🌐</span>} style={{left: 1020, top: 1660, transform: 'rotate(4deg)', zIndex: 8}} />
    {/* Scout peeks over the phone's top edge */}
    <At x={430} y={1040} z={5} style={{transform: 'rotate(-8deg)'}}>
      <Img src={staticFile('assets/figma/scout-peekaboo-ledge.png')} style={{width: 380}} />
    </At>
    <At x={150} y={1180} z={4} style={{transform: 'rotate(-8deg)'}}>
      <PhoneFrame scale={2.3}>
        <FeedScreen />
      </PhoneFrame>
    </At>
  </LightCanvas>
);

// ---------------------------------------------------------------- Panel 2

export const Panel02Apply: React.FC = () => (
  <LightCanvas>
    <Ridge />
    <At x={M} y={180}>
      <Kicker>Apply</Kicker>
      <Headline lines={[[{t: 'Applications'}], [{t: 'finish themselves.', tint: true}]]} style={{marginTop: 26}} />
    </At>
    <At x={40} y={870} z={9}>
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 18,
          padding: '26px 38px',
          borderRadius: 24,
          background: colors.secondaryDark,
          color: '#fff',
          fontFamily: fonts.body,
          fontWeight: 700,
          fontSize: 33,
          boxShadow: '0 30px 80px rgba(17,32,64,0.35)',
          transform: 'rotate(-2deg)',
        }}
      >
        <span style={{width: 18, height: 18, borderRadius: 9, background: '#5AD07E', boxShadow: '0 0 14px #5AD07E', flexShrink: 0}} />
        Saved, finishing your application in the background
      </div>
    </At>
    <FloatChip
      label="Auto-applied · Solutions Engineer"
      icon={<span style={{width: 34, height: 34, borderRadius: 17, background: GREEN, color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 800}}>✓</span>}
      style={{left: 430, top: 2520, zIndex: 9, transform: 'rotate(2deg)'}}
    />
    <At x={250} y={1060} z={4} style={{transform: 'rotate(6deg)'}}>
      <PhoneFrame scale={2.3}>
        <CompanyScreen />
      </PhoneFrame>
    </At>
  </LightCanvas>
);

// ---------------------------------------------------------------- Panel 3

const gmailGlyph = (
  <svg width="40" height="40" viewBox="0 0 24 24">
    <rect x="2" y="4" width="20" height="16" rx="2.4" fill="#fff" />
    <path d="M3.2 6.4 12 13l8.8-6.6" fill="none" stroke="#EA4335" strokeWidth="2.2" strokeLinejoin="round" />
    <path d="M3.2 6.4V19h2.6v-9l-2.6-3.6zM20.8 6.4 18.2 10v9h2.6V6.4z" fill="#EA4335" opacity="0.85" />
  </svg>
);

export const Panel03Reach: React.FC = () => (
  <LightCanvas>
    <Ridge />
    <At x={M} y={180}>
      <Kicker>Reach</Kicker>
      <Headline lines={[[{t: 'Real outreach, sent'}], [{t: 'from '}, {t: 'your Gmail.', tint: true}]]} style={{marginTop: 26}} />
    </At>
    <At x={-60} y={820} z={2} style={{transform: 'rotate(-6deg)'}}>
      <PhoneFrame scale={2.25}>
        <InboxScreen />
      </PhoneFrame>
    </At>
    <FloatCard style={{left: 130, top: 1060, width: 1090, padding: '54px 60px', zIndex: 6, transform: 'rotate(1.5deg)'}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 26}}>
        <Avatar text="mj" size={98} bg="#E5DEF7" color="#5B4AA8" />
        <div style={{flex: 1}}>
          <div style={{fontSize: 42, fontWeight: 800, color: colors.ink}}>martha janicki</div>
          <div style={{fontSize: 29, color: UI_GRAY, marginTop: 4}}>product manager at langchain</div>
        </div>
        <div style={{width: 66, height: 66, borderRadius: 14, background: '#0A66C2', color: '#fff', fontWeight: 800, fontSize: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: fonts.body}}>in</div>
      </div>
      <div style={{fontSize: 25, fontWeight: 700, color: UI_GRAY, marginTop: 44}}>Subject</div>
      <div style={{marginTop: 12, border: `2px solid ${UI_LINE}`, borderRadius: 16, padding: '22px 26px', fontSize: 30, fontWeight: 600, color: colors.ink}}>
        From Pinecone to LangChain, curious about the move
      </div>
      <div style={{fontSize: 25, fontWeight: 700, color: UI_GRAY, marginTop: 30}}>Email</div>
      <div style={{marginTop: 12, border: `2px solid ${UI_LINE}`, borderRadius: 16, padding: '26px 28px', fontSize: 28, lineHeight: 1.58, color: '#2B3247'}}>
        Hi Martha,
        <br />
        <br />
        I'm Rylan, a current USC Business Administration student exploring the intersection of finance and technology.
        Your LinkedIn post about moving from Pinecone to LangChain caught my eye; the bet on agent tooling feels early
        in the best way.
        <br />
        <br />
        I'd love 15 minutes to hear how you think about…
      </div>
      <div style={{marginTop: 36, height: 96, borderRadius: 18, background: APP_BLUE, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, fontWeight: 800, boxShadow: '0 16px 40px rgba(62,99,242,0.35)'}}>
        Send
      </div>
      <div style={{marginTop: 20, height: 96, borderRadius: 18, background: '#1B9E4B', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 18, fontSize: 36, fontWeight: 800}}>
        {gmailGlyph} View in Gmail
      </div>
      <div style={{marginTop: 26, textAlign: 'center', fontSize: 24, color: UI_GRAY}}>
        Sends from your connected Gmail, no need to leave the app.
      </div>
    </FloatCard>
  </LightCanvas>
);

// ---------------------------------------------------------------- Panel 4

export const Panel04Ask: React.FC = () => (
  <DarkCanvas>
    <Img
      src={staticFile('assets/figma/mountains-forest-bg.png')}
      style={{position: 'absolute', bottom: -60, left: -200, width: PANEL_W + 400, opacity: 0.14, filter: 'saturate(0.4) brightness(0.9)'}}
    />
    <At x={M} y={180}>
      <Kicker dark>Ask</Kicker>
      <Headline dark lines={[[{t: 'Just '}, {t: 'say', tint: true}, {t: ' what'}], [{t: "you're looking for."}]]} style={{marginTop: 26}} />
    </At>
    <ScoutOrb size={430} style={{left: PANEL_W / 2 - 215, top: 700}} />
    <At x={M} y={1310} style={{width: PANEL_W - M * 2}}>
      <div
        style={{
          background: 'rgba(255,255,255,0.055)',
          border: '1.5px solid rgba(255,255,255,0.14)',
          borderRadius: 34,
          padding: '46px 52px',
          fontFamily: fonts.body,
          backdropFilter: 'blur(6px)',
        }}
      >
        <div style={{fontSize: 27, color: 'rgba(233,239,255,0.6)', lineHeight: 1.5}}>
          heard "Find me engineers at Stripe to connect with"; cleaned it up
        </div>
        <div style={{fontSize: 44, fontWeight: 800, color: '#F4F7FF', marginTop: 18, lineHeight: 1.3}}>
          Ready to search: "Draft 1 engineers at Stripe"
        </div>
        {['Engineers at Stripe', 'Product managers at Stripe', 'Engineers at Stripe in Los Angeles', 'Draft someone on the team at Stripe'].map((p) => (
          <div
            key={p}
            style={{
              marginTop: 20,
              height: 92,
              borderRadius: 20,
              background: 'rgba(255,255,255,0.07)',
              border: '1.5px solid rgba(255,255,255,0.13)',
              display: 'flex',
              alignItems: 'center',
              padding: '0 34px',
              fontSize: 32,
              fontWeight: 600,
              color: '#E9EFFF',
            }}
          >
            {p}
          </div>
        ))}
        <div style={{display: 'flex', gap: 22, marginTop: 30}}>
          <div style={{flex: 1, height: 96, borderRadius: 20, border: '1.5px solid rgba(255,255,255,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 33, fontWeight: 700, color: 'rgba(233,239,255,0.75)'}}>
            Cancel
          </div>
          <div style={{flex: 1.6, height: 96, borderRadius: 20, background: APP_BLUE, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 33, fontWeight: 800, color: '#fff', boxShadow: '0 18px 50px rgba(62,99,242,0.5)'}}>
            Run it as-is
          </div>
        </div>
      </div>
      <div style={{textAlign: 'center', marginTop: 60, fontSize: 32, fontWeight: 600, color: 'rgba(233,239,255,0.55)', fontFamily: fonts.body}}>
        Tap and ask Scout for anything
      </div>
    </At>
  </DarkCanvas>
);

// ---------------------------------------------------------------- Panel 5

export const Panel05Research: React.FC = () => {
  const cards = [
    {av: 'LN', bg: '#D7E8FB', name: 'long nguyen · SpaceX', status: 'Researching their background…', x: 470, y: 1210, r: 2},
    {av: 'MJ', bg: '#E5DEF7', name: 'martha janicki · LangChain', status: 'Writing your outreach…', x: 540, y: 1520, r: -1.5},
    {av: 'HL', bg: '#F7E3DC', name: 'harry li · DoorDash', status: 'In line, drafting starts in a moment…', x: 430, y: 1830, r: 1},
  ];
  return (
    <LightCanvas>
      <Ridge />
      <At x={M} y={180}>
        <Kicker>Research</Kicker>
        <Headline lines={[[{t: 'It finds the '}, {t: 'right', tint: true}], [{t: 'person', tint: true}, {t: ' first.'}]]} style={{marginTop: 26}} />
      </At>
      <At x={-140} y={900} z={2} style={{transform: 'rotate(-7deg)'}}>
        <PhoneFrame scale={2.35}>
          <InboxScreen draftsOnly />
        </PhoneFrame>
      </At>
      {cards.map((c) => (
        <FloatCard key={c.name} style={{left: c.x, top: c.y, width: 800, padding: '34px 40px', transform: `rotate(${c.r}deg)`, zIndex: 6}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 24}}>
            <Avatar text={c.av} size={84} bg={c.bg} />
            <div>
              <div style={{fontSize: 34, fontWeight: 800, color: colors.ink}}>{c.name}</div>
              <div style={{display: 'flex', alignItems: 'center', gap: 12, marginTop: 10}}>
                <span style={{width: 16, height: 16, borderRadius: 8, background: GREEN, boxShadow: `0 0 12px ${GREEN}`}} />
                <span style={{fontSize: 28, fontWeight: 700, color: GREEN}}>{c.status}</span>
              </div>
            </div>
          </div>
        </FloatCard>
      ))}
    </LightCanvas>
  );
};

// ---------------------------------------------------------------- Panel 6

export const Panel06Prepare: React.FC = () => {
  const rows = [
    {av: 'nr', bg: '#E5EFF9', name: 'natalie redberg', role: 'data scientist at spotify'},
    {av: 'dl', bg: '#EAE4F9', name: 'daniel leichus', role: 'software engineer at stripe'},
    {av: 'pd', bg: '#F9EAE4', name: 'pratik dutta', role: 'manager at deloitte'},
  ];
  return (
    <LightCanvas>
      <Ridge />
      <At x={M} y={180}>
        <Kicker>Prepare</Kicker>
        <Headline lines={[[{t: 'Walk in already'}], [{t: 'prepped.', tint: true}]]} style={{marginTop: 26}} />
      </At>
      <FloatCard style={{left: M, top: 760, width: PANEL_W - M * 2, padding: '44px 52px', zIndex: 6, transform: 'rotate(-1deg)'}}>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <div style={{fontSize: 40, fontWeight: 800, color: colors.ink, display: 'flex', alignItems: 'center', gap: 16}}>
            <span style={{fontSize: 36}}>☕</span> Coffee library
          </div>
          <Chip label="New prep" bg="#F7C948" color="#5B4300" size={26} icon={<span style={{fontSize: 22}}>＋</span>} />
        </div>
        {rows.map((r, i) => (
          <div key={r.name} style={{display: 'flex', alignItems: 'center', gap: 26, padding: '32px 0', borderBottom: i < rows.length - 1 ? `2px solid ${UI_LINE}` : undefined, marginTop: i === 0 ? 18 : 0}}>
            <Avatar text={r.av} size={88} bg={r.bg} />
            <div style={{flex: 1}}>
              <div style={{fontSize: 34, fontWeight: 800, color: colors.ink}}>{r.name}</div>
              <div style={{fontSize: 27, color: UI_GRAY, marginTop: 5}}>{r.role}</div>
            </div>
            <StatusPill label="Prepped" tone="green" size={24} />
          </div>
        ))}
      </FloatCard>
      <At x={330} y={1700} z={2} style={{transform: 'rotate(5deg)'}}>
        <PhoneFrame scale={2.25}>
          <PrepDocScreen />
        </PhoneFrame>
      </At>
    </LightCanvas>
  );
};

// ---------------------------------------------------------------- Panel 7

export const Panel07Track: React.FC = () => {
  const rows = [
    {role: 'Solutions Engineer, Auth0', co: 'Okta', pill: <StatusPill label="Applied" tone="green" />, when: 'Today'},
    {role: 'Safeguards Enforcement Analyst', co: 'Anthropic', pill: <StatusPill label="Needs your input" tone="amber" />, when: '1d ago'},
    {role: 'Marketing Operations Strategy', co: 'LangChain', pill: <StatusPill label="Outreach sent" tone="blue" />, when: '2d ago'},
    {role: 'Strategic Implementation Associate', co: 'Point72', pill: <StatusPill label="Apply on the site" tone="blue" />, when: '4d ago'},
  ];
  return (
    <LightCanvas>
      <Ridge />
      <At x={520} y={340} z={2} style={{transform: 'rotate(6deg)'}}>
        <PhoneFrame scale={2.2}>
          <CompaniesScreen />
        </PhoneFrame>
      </At>
      <FloatCard style={{left: M, top: 240, width: 900, padding: '40px 46px', zIndex: 6, transform: 'rotate(-1.5deg)'}}>
        <div style={{fontSize: 24, fontWeight: 800, letterSpacing: '0.16em', color: UI_GRAY}}>APPLICATIONS</div>
        {rows.map((r, i) => (
          <div key={r.role} style={{padding: '28px 0', borderBottom: i < rows.length - 1 ? `2px solid ${UI_LINE}` : undefined}}>
            <div style={{fontSize: 30, fontWeight: 800, color: colors.ink, lineHeight: 1.3}}>{r.role}</div>
            <div style={{display: 'flex', alignItems: 'center', gap: 18, marginTop: 12}}>
              <span style={{fontSize: 24, color: UI_GRAY, fontWeight: 600}}>{r.co}</span>
              <span style={{transform: 'scale(1.5)', transformOrigin: 'left center'}}>{r.pill}</span>
              <span style={{marginLeft: 'auto', fontSize: 22, color: '#A6ADBE'}}>{r.when}</span>
            </div>
          </div>
        ))}
      </FloatCard>
      <At x={M} y={2160} z={8}>
        <Kicker>Track</Kicker>
        <Headline lines={[[{t: 'Everything, '}, {t: 'tracked', tint: true}], [{t: 'in one place.'}]]} style={{marginTop: 26}} />
      </At>
      <At x={0} y={2080} z={7} style={{width: PANEL_W, height: 788, background: 'linear-gradient(180deg, rgba(245,246,248,0) 0%, #F5F6F8 26%)'}} />
    </LightCanvas>
  );
};
