import React from 'react';
import {colors, fonts} from '../../brand/theme';
import {APP_BLUE, Avatar, Chip, GREEN, GREEN_BG, PlaneGlyph, TabBar, UI_CHIP, UI_GRAY, UI_LINE, Wordmark} from './ui';

// Phone screens recreated from Nick's 07-15 recording of the real app,
// built at the 430x932 logical size PhoneFrame expects.

const Line: React.FC<{w: number | string; h?: number; style?: React.CSSProperties}> = ({w, h = 11, style}) => (
  <div style={{width: w, height: h, borderRadius: h / 2, background: '#E7EAF1', ...style}} />
);

const TopBar: React.FC<{credits: string}> = ({credits}) => (
  <div style={{position: 'absolute', top: 58, left: 0, right: 0, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 18px'}}>
    <Chip label={credits} bg="#FFF4D6" color="#8A6A12" size={14} icon={<span style={{fontSize: 13}}>⚡</span>} />
    <Wordmark size={24} />
    <div style={{position: 'relative'}}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={colors.ink} strokeWidth="1.8" strokeLinecap="round">
        <path d="M6 9.5a6 6 0 0 1 12 0c0 4 1.4 5.4 2 6H4c0.6-0.6 2-2 2-6z" />
        <path d="M10 19a2.2 2.2 0 0 0 4 0" />
      </svg>
      <div style={{position: 'absolute', top: -4, right: -6, width: 16, height: 16, borderRadius: 8, background: '#E5484D', color: '#fff', fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>4</div>
    </div>
  </div>
);

export const FeedScreen: React.FC = () => (
  <div style={{position: 'absolute', inset: 0, background: '#F4F5F8', fontFamily: fonts.body}}>
    <TopBar credits="4850" />
    <div style={{position: 'absolute', top: 104, left: 0, right: 0, textAlign: 'center', fontSize: 13, fontWeight: 500, color: UI_GRAY}}>
      485 drafts left · 10 credits each
    </div>
    <div style={{position: 'absolute', top: 132, left: 14, right: 14, bottom: 96, background: '#fff', borderRadius: 26, boxShadow: '0 6px 24px rgba(17,32,64,0.07)', padding: '26px 24px'}}>
      <div style={{fontSize: 28, fontWeight: 800, color: colors.ink, lineHeight: 1.2}}>
        Marketing Operations
        <br />
        Strategy
      </div>
      <div style={{display: 'flex', alignItems: 'center', gap: 12, marginTop: 20}}>
        <div style={{width: 46, height: 46, borderRadius: 12, background: '#EDF1FA', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <svg width="26" height="26" viewBox="0 0 24 24">
            <path d="M4 14c2-6 6-9 9-9 2 0 3.4 1 3.4 2.6 0 2.8-3.4 3.4-3.4 5.4 0 1 0.8 1.6 1.8 1.6 1.4 0 2.6-1 3.2-2.4" fill="none" stroke="#2B4C7E" strokeWidth="2" strokeLinecap="round" />
            <circle cx="8.4" cy="16.6" r="1.6" fill="#2B4C7E" />
          </svg>
        </div>
        <div>
          <div style={{fontSize: 18, fontWeight: 700, color: colors.ink}}>LangChain</div>
          <div style={{fontSize: 13.5, fontWeight: 500, color: UI_GRAY, display: 'flex', alignItems: 'center', gap: 5}}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={UI_GRAY} strokeWidth="2"><circle cx="12" cy="9.5" r="3" /><path d="M12 21c4-4.5 6.5-8 6.5-11.5a6.5 6.5 0 1 0-13 0C5.5 13 8 16.5 12 21z" /></svg>
            Remote
          </div>
        </div>
      </div>
      <div style={{fontSize: 12.5, fontWeight: 600, color: UI_GRAY, marginTop: 24, letterSpacing: '0.02em'}}>Work arrangement</div>
      <div style={{marginTop: 9}}>
        <Chip label="Remote" size={14} icon={<span style={{fontSize: 13}}>🌐</span>} />
      </div>
      <div style={{fontSize: 12.5, fontWeight: 600, color: UI_GRAY, marginTop: 22}}>Job description</div>
      <div style={{fontSize: 14.5, lineHeight: 1.55, color: '#3E4557', marginTop: 8}}>
        About Us At LangChain, our mission is to make intelligent agents ubiquitous. We build the foundation for agent
        engineering in the real world, helping developers move from prototypes to production-ready AI agents that teams
        can rely on. We began as widely adopted open-source tools and have grown to also offer a platform for building,
        evaluating, deploying, and operating agents…
      </div>
      <div style={{position: 'absolute', bottom: 88, left: 0, right: 0, textAlign: 'center', fontSize: 12, color: '#A6ADBE'}}>
        ⤢ Tap anywhere to enlarge
      </div>
      <div style={{position: 'absolute', bottom: 18, left: 0, right: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 14}}>
        {[
          {d: 36, bg: '#F1F3F8', node: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={UI_GRAY} strokeWidth="2" strokeLinecap="round"><path d="M12 15V4M8 7.5 12 3.5l4 4" /><path d="M5 13v6h14v-6" /></svg>},
          {d: 36, bg: '#F1F3F8', node: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={UI_GRAY} strokeWidth="2" strokeLinejoin="round"><path d="M6 3.5h12v17l-6-4.5-6 4.5z" /></svg>},
          {d: 52, bg: '#FCE9E8', node: <svg width="22" height="22" viewBox="0 0 24 24" stroke="#DB382E" strokeWidth="2.6" strokeLinecap="round"><path d="M6 6l12 12M18 6 6 18" /></svg>},
          {d: 60, bg: APP_BLUE, node: <PlaneGlyph size={26} />},
          {d: 36, bg: '#F1F3F8', node: <span style={{fontSize: 15}}>⚡</span>},
          {d: 36, bg: '#F1F3F8', node: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={UI_GRAY} strokeWidth="2" strokeLinecap="round"><path d="M4 7h10M18 7h2M4 17h4M12 17h8" /><circle cx="16" cy="7" r="2" /><circle cx="10" cy="17" r="2" /></svg>},
        ].map((b, i) => (
          <div key={i} style={{width: b.d, height: b.d, borderRadius: b.d / 2, background: b.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: b.d > 40 ? '0 6px 16px rgba(17,32,64,0.16)' : undefined}}>
            {b.node}
          </div>
        ))}
      </div>
    </div>
    <TabBar active="Feed" badge={52} />
  </div>
);

export const InboxScreen: React.FC<{draftsOnly?: boolean}> = ({draftsOnly}) => {
  const live = [
    {av: 'P', name: 'Point72', live: 'In line, drafting starts in a moment…', accent: '#DCE4F7'},
    {av: 'LN', name: 'long nguyen · SpaceX', live: 'Researching their background and recent…', accent: '#D7E8FB'},
    {av: 'MJ', name: 'martha janicki · LangChain', live: 'Writing your outreach…', accent: '#E5DEF7'},
    {av: 'HL', name: 'harry li · DoorDash', live: 'Researching their background and recent…', accent: '#F7E3DC'},
  ];
  const drafts = [
    {av: 'DM', name: 'daniel macblane', sub: 'Draft · From Mercury to Anthropic, curious about the move', time: '13m'},
    {av: 'JF', name: 'jack fetsch', sub: 'Draft · From Harvard Corporate Finance to Goldman IB', time: '9h'},
    {av: 'WS', name: 'will stoeckle', sub: 'Draft · From Home Partners to Physical Intelligence', time: '10h'},
    {av: 'SB', name: 'stephen balaban', sub: 'Draft · From Software Engineer to CTO and…', time: '10h'},
    {av: 'KP', name: 'kavier prewitt', sub: 'Draft · From club consulting to Bain, the jump', time: '12h'},
    {av: 'OM', name: 'olivia moreno', sub: 'Draft · USC Marshall to Stripe partnerships', time: '1d'},
    {av: 'JS', name: 'jasa sastry', sub: 'Draft · From data club projects to Databricks', time: '1d'},
    {av: 'CB', name: 'chris bala', sub: 'Draft · Fellow Trojan in payments infra', time: '2d'},
  ];
  const rows: Array<{av: string; name: string; live?: string; sub?: string; time?: string; accent?: string}> = draftsOnly
    ? drafts
    : [...live, ...drafts.slice(0, 4)];
  return (
    <div style={{position: 'absolute', inset: 0, background: '#FBFCFE', fontFamily: fonts.body}}>
      <div style={{position: 'absolute', top: 62, left: 0, right: 0, textAlign: 'center', fontSize: 20, fontWeight: 800, color: colors.ink}}>Inbox</div>
      <div style={{position: 'absolute', top: 100, left: 16, right: 16, height: 40, borderRadius: 12, background: '#F0F2F7', display: 'flex', alignItems: 'center', gap: 9, padding: '0 14px', color: '#9AA1B2', fontSize: 14.5}}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9AA1B2" strokeWidth="2.4" strokeLinecap="round"><circle cx="10.5" cy="10.5" r="6" /><path d="m15.5 15.5 4 4" /></svg>
        Search name, company, subject
      </div>
      <div style={{position: 'absolute', top: 154, left: 16, display: 'flex', gap: 8}}>
        <Chip label="All" bg={colors.ink} color="#fff" size={14} />
        <Chip label="Your turn" size={14} icon={<span style={{background: '#E5484D', color: '#fff', borderRadius: 9, fontSize: 11, fontWeight: 700, padding: '1px 6px'}}>52</span>} />
        <Chip label="Waiting" size={14} />
        <Chip label="Replied" size={14} />
      </div>
      <div style={{position: 'absolute', top: 210, left: 0, right: 0, bottom: 84}}>
        {rows.map((r, i) => (
          <div key={i} style={{display: 'flex', alignItems: 'center', gap: 13, padding: '13px 16px', borderBottom: `1px solid ${UI_LINE}`, background: r.live ? '#fff' : undefined, borderLeft: r.live ? `3px solid ${APP_BLUE}` : '3px solid transparent'}}>
            <Avatar text={r.av} size={44} bg={r.accent ?? '#EDF0F7'} />
            <div style={{flex: 1, minWidth: 0}}>
              <div style={{fontSize: 15.5, fontWeight: 700, color: colors.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{r.name}</div>
              {r.live ? (
                <div style={{display: 'flex', alignItems: 'center', gap: 6, marginTop: 3}}>
                  <span style={{width: 7, height: 7, borderRadius: 4, background: GREEN, boxShadow: `0 0 6px ${GREEN}`}} />
                  <span style={{fontSize: 13, fontWeight: 600, color: GREEN, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{r.live}</span>
                </div>
              ) : (
                <div style={{fontSize: 13, color: UI_GRAY, marginTop: 3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{r.sub}</div>
              )}
            </div>
            <div style={{fontSize: 12, color: '#A6ADBE', display: 'flex', alignItems: 'center', gap: 4}}>
              {r.time ?? ''}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#C2C8D6" strokeWidth="2.4" strokeLinecap="round"><path d="m9 5 7 7-7 7" /></svg>
            </div>
          </div>
        ))}
      </div>
      <TabBar active="Inbox" badge={52} />
    </div>
  );
};

export const CompanyScreen: React.FC = () => (
  <div style={{position: 'absolute', inset: 0, background: '#FBFCFE', fontFamily: fonts.body}}>
    <div style={{position: 'absolute', top: 60, left: 16, right: 16, display: 'flex', alignItems: 'center', gap: 12}}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={colors.ink} strokeWidth="2.4" strokeLinecap="round"><path d="M15 5 8 12l7 7" /></svg>
      <div style={{width: 40, height: 40, borderRadius: 20, background: '#0B0D12', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 15}}>ok</div>
      <div style={{fontSize: 21, fontWeight: 800, color: colors.ink}}>okta</div>
    </div>
    <div style={{position: 'absolute', top: 116, left: 16}}>
      <Chip label="Identity Security" size={13.5} icon={<span style={{fontSize: 12}}>🏢</span>} />
    </div>
    <div style={{position: 'absolute', top: 158, left: 16, right: 16, height: 46, borderRadius: 13, background: APP_BLUE, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9, fontSize: 15.5, fontWeight: 700}}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round"><circle cx="12" cy="8.6" r="3.2" /><path d="M5.6 19.6c1.1-3.4 3.5-5 6.4-5s5.3 1.6 6.4 5" /></svg>
      Find my next contact
      <span style={{fontSize: 12.5, fontWeight: 700, background: 'rgba(255,255,255,0.22)', borderRadius: 8, padding: '2px 8px'}}>-10 cr</span>
    </div>
    <div style={{position: 'absolute', top: 210, left: 0, right: 0, textAlign: 'center', fontSize: 12, color: '#A6ADBE'}}>
      Always someone new; anyone you've already reached is skipped
    </div>
    <div style={{position: 'absolute', top: 244, left: 16, right: 16, display: 'flex', gap: 22, borderBottom: `1px solid ${UI_LINE}`, paddingBottom: 10, fontSize: 14.5, fontWeight: 600, color: UI_GRAY}}>
      <span style={{color: colors.ink, fontWeight: 800, borderBottom: `2.5px solid ${colors.ink}`, paddingBottom: 10, marginBottom: -11}}>Overview</span>
      <span>Reached out (2)</span>
      <span>Applied (1)</span>
      <span>Roles (4)</span>
    </div>
    <div style={{position: 'absolute', top: 292, left: 16, display: 'flex', alignItems: 'center', gap: 7, fontSize: 13.5, fontWeight: 600, color: UI_GRAY}}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={UI_GRAY} strokeWidth="2"><rect x="4" y="7" width="16" height="13" rx="2.5" /><path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7" /></svg>
      The role you swiped
    </div>
    <div style={{position: 'absolute', top: 322, left: 16, right: 16, background: '#fff', borderRadius: 20, border: `1px solid ${UI_LINE}`, boxShadow: '0 6px 20px rgba(17,32,64,0.06)', padding: '22px 20px'}}>
      <div style={{fontSize: 25, fontWeight: 800, color: colors.ink, lineHeight: 1.25}}>
        Solutions Engineer,
        <br />
        Auth0
      </div>
      <div style={{display: 'flex', alignItems: 'flex-start', gap: 10, marginTop: 14}}>
        <div style={{width: 34, height: 34, borderRadius: 17, background: '#0B0D12', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 13}}>ok</div>
        <div>
          <div style={{fontSize: 15.5, fontWeight: 700, color: colors.ink}}>Okta</div>
          <div style={{fontSize: 12.5, color: UI_GRAY, lineHeight: 1.45}}>Dallas, Texas; New York, New York; San Francisco, California; Seattle, Washington</div>
        </div>
      </div>
      <div style={{marginTop: 18, height: 44, borderRadius: 12, border: `1.5px solid ${APP_BLUE}`, color: APP_BLUE, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontSize: 15, fontWeight: 700}}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={APP_BLUE} strokeWidth="2.2" strokeLinecap="round"><circle cx="12" cy="8.6" r="3.2" /><path d="M5.6 19.6c1.1-3.4 3.5-5 6.4-5s5.3 1.6 6.4 5" /></svg>
        Find a contact at Okta
      </div>
      <div style={{marginTop: 12, height: 44, borderRadius: 12, background: APP_BLUE, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontSize: 15, fontWeight: 700, boxShadow: '0 8px 20px rgba(62,99,242,0.35)'}}>
        <span style={{fontSize: 14}}>⚡</span> Auto-apply to this role
      </div>
      <div style={{fontSize: 12.5, fontWeight: 600, color: UI_GRAY, marginTop: 20}}>Job details</div>
      <div style={{marginTop: 8}}>
        <Chip label="Full-time" size={13.5} icon={<span style={{fontSize: 12}}>💼</span>} />
      </div>
    </div>
    <TabBar active="Network" badge={52} />
  </div>
);

export const PrepDocScreen: React.FC = () => (
  <div style={{position: 'absolute', inset: 0, background: '#FBFCFE', fontFamily: fonts.body}}>
    <div style={{position: 'absolute', top: 60, left: 16, right: 16, display: 'flex', alignItems: 'center', gap: 12}}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={colors.ink} strokeWidth="2.4" strokeLinecap="round"><path d="M15 5 8 12l7 7" /></svg>
      <span style={{fontSize: 17}}>☕</span>
      <div style={{fontSize: 19, fontWeight: 800, color: colors.ink}}>Meeting prep</div>
      <div style={{marginLeft: 'auto', fontSize: 12.5, color: UI_GRAY}}>4 of 4</div>
    </div>
    <div style={{position: 'absolute', top: 108, left: 16, right: 16, display: 'flex', alignItems: 'center', gap: 12, background: '#fff', border: `1px solid ${UI_LINE}`, borderRadius: 16, padding: '13px 15px'}}>
      <Avatar text="nr" size={42} bg="#E5EFF9" />
      <div>
        <div style={{fontSize: 15.5, fontWeight: 700, color: colors.ink}}>natalie redberg</div>
        <div style={{fontSize: 13, color: UI_GRAY}}>data scientist at spotify</div>
      </div>
      <div style={{marginLeft: 'auto'}}>
        <Chip label="Open the full prep" bg="#EDF1FE" color={APP_BLUE} size={12.5} />
      </div>
    </div>
    <div style={{position: 'absolute', top: 192, left: 16, right: 16, bottom: 20}}>
      <div style={{fontSize: 17, fontWeight: 800, color: colors.ink, display: 'flex', alignItems: 'center', gap: 8}}>
        <span style={{fontSize: 15}}>🤝</span> Why you two connect
      </div>
      <div style={{fontSize: 14, lineHeight: 1.6, color: '#3E4557', marginTop: 9}}>
        As a proactive business administration student emphasizing data skills and entrepreneurial ventures, Rylan is
        uniquely poised to engage with Natalie, a seasoned data scientist at Spotify. Rylan's experiences as a commerce
        and fulfillment manager demonstrate a strong intersection with Natalie's journey from programmatic marketing to
        data science.
      </div>
      <div style={{fontSize: 17, fontWeight: 800, color: colors.ink, marginTop: 24, display: 'flex', alignItems: 'center', gap: 8}}>
        <span style={{fontSize: 15}}>🧊</span> Icebreaker topics
      </div>
      {[
        'Transition from marketing to data science, what pushed the leap',
        'Building models with messy real-world music data',
        'USC data clubs vs. industry: what actually transfers',
      ].map((t, i) => (
        <div key={i} style={{display: 'flex', gap: 10, marginTop: 12, alignItems: 'flex-start'}}>
          <span style={{width: 7, height: 7, borderRadius: 4, background: APP_BLUE, marginTop: 8, flexShrink: 0}} />
          <span style={{fontSize: 14, lineHeight: 1.5, color: '#3E4557'}}>{t}</span>
        </div>
      ))}
      <div style={{fontSize: 17, fontWeight: 800, color: colors.ink, marginTop: 24, display: 'flex', alignItems: 'center', gap: 8}}>
        <span style={{fontSize: 15}}>💡</span> Common ground
      </div>
      <Line w="92%" style={{marginTop: 12}} />
      <Line w="84%" style={{marginTop: 9}} />
      <Line w="88%" style={{marginTop: 9}} />
    </div>
  </div>
);

export const CompaniesScreen: React.FC = () => {
  const companies = [
    {n: 'stripe', c: '#635BFF', badge: '5'},
    {n: 'redwood materials', c: '#2E7D5B', badge: '4'},
    {n: 'anthropic', c: '#C6613F', badge: '9'},
    {n: 'point72', c: '#111827', badge: '2'},
    {n: 'box', c: '#0061D5', badge: '1'},
    {n: 'doordash', c: '#EB1700', badge: '2'},
    {n: 'spacex', c: '#005288', badge: '1'},
    {n: 'databricks', c: '#FF3621', badge: '3'},
    {n: 'solopulse', c: '#7C3AED', badge: '1'},
  ];
  return (
    <div style={{position: 'absolute', inset: 0, background: '#FBFCFE', fontFamily: fonts.body}}>
      <div style={{position: 'absolute', top: 62, left: 0, right: 0, textAlign: 'center', fontSize: 20, fontWeight: 800, color: colors.ink}}>Network</div>
      <div style={{position: 'absolute', top: 106, left: 16, right: 16, display: 'flex', gap: 22, borderBottom: `1px solid ${UI_LINE}`, paddingBottom: 10, fontSize: 14.5, fontWeight: 600, color: UI_GRAY}}>
        <span style={{color: colors.ink, fontWeight: 800, borderBottom: `2.5px solid ${colors.ink}`, paddingBottom: 10, marginBottom: -11}}>Companies</span>
        <span>Applications</span>
        <span>Meeting prep</span>
      </div>
      <div style={{position: 'absolute', top: 152, left: 16, right: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 13.5, color: UI_GRAY}}>
        <span style={{fontWeight: 700, color: colors.ink}}>Companies · 33</span>
        <span>Milestones · 27 passed 🏅</span>
      </div>
      <div style={{position: 'absolute', top: 190, left: 16, right: 16, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12}}>
        {companies.map((co) => (
          <div key={co.n} style={{background: '#fff', border: `1px solid ${UI_LINE}`, borderRadius: 16, padding: '14px 10px 12px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8}}>
            <div style={{width: 44, height: 44, borderRadius: 12, background: co.c, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 18}}>
              {co.n[0].toUpperCase()}
            </div>
            <div style={{fontSize: 11.5, fontWeight: 700, color: colors.ink, textAlign: 'center', lineHeight: 1.2}}>{co.n}</div>
            <div style={{fontSize: 10.5, color: UI_GRAY}}>
              {co.badge} roles
            </div>
          </div>
        ))}
      </div>
      <TabBar active="Network" badge={52} />
    </div>
  );
};

/** Status pill used by the applications tracker card. */
export const StatusPill: React.FC<{label: string; tone: 'green' | 'amber' | 'blue'; size?: number}> = ({label, tone, size = 13}) => {
  const map = {
    green: {bg: GREEN_BG, color: GREEN},
    amber: {bg: '#FCF1DC', color: '#B4770F'},
    blue: {bg: '#E7EDFE', color: APP_BLUE},
  } as const;
  return <Chip label={label} bg={map[tone].bg} color={map[tone].color} size={size} />;
};
