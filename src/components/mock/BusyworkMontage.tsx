import {Img, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors, fonts} from '../../../brand/theme';
import {MockStage} from './MockStage';

const INK = colors.ink;
const GRAYTXT = '#6B7385';

// Four hard-cut beats inside one persistent browser window (PostSyncer tab
// feel). ~1.25s per beat at 30fps.
const BEAT_FRAMES = 38;

const TABS = [
  {label: 'Job Board: 1,240 results', url: 'jobs.example.com/search?q=analyst&level=entry'},
  {label: 'Networking Tracker: Google Sheets', url: 'docs.google.com/spreadsheets/d/1kT…/edit#gid=0'},
  {label: 'LinkedIn: Marcus Webb', url: 'linkedin.com/in/marcus-webb-usc'},
  {label: 'ChatGPT: cold email v9', url: 'chatgpt.com/c/68f2…'},
];

const SHEET_PEOPLE = [
  ['Sarah Kim', 'Goldman Sachs', 'Emailed', 'Jun 28'],
  ['Marcus Webb', 'Marshall Wace', 'No reply', 'Jun 25'],
  ['Priya Shah', 'Morgan Stanley', 'Follow up', 'Jun 30'],
  ['David Osei', 'McKinsey & Co', 'Emailed', 'Jul 1'],
  ['Emily Dawson', 'Jane Street', 'No reply', 'Jun 22'],
  ['Alex Rivera', 'Evercore', 'Coffee chat', 'Jul 2'],
  ['Grace Chen', 'Blackstone', 'Emailed', 'Jul 3'],
  ['Tom Nguyen', 'Citadel', 'No reply', 'Jun 19'],
  ['Lena Park', 'Bain & Company', 'Follow up', 'Jul 5'],
  ['Chris Adeyemi', 'Lazard', 'Emailed', 'Jul 6'],
  ['Maya Patel', 'PJT Partners', 'No reply', 'Jun 19'],
  ['Jordan Lee', 'Deloitte', 'Coffee chat', 'Jul 7'],
];

const CHATGPT_REPLY =
  'Subject: Quick question from a USC junior\n\nHi Sarah, I came across your path from USC to Goldman and it stood out to me. I’m exploring banking recruiting this fall and would love 15 minutes to hear how you approached it…';

const STATUS_COLOR: Record<string, string> = {
  Emailed: '#218547',
  'No reply': '#DB382E',
  'Follow up': '#B57E00',
  'Coffee chat': '#4A60A8',
};

const JobBoardBeat: React.FC<{beatFrame: number}> = ({beatFrame}) => {
  // fast doomscroll down a tall generated page capture
  // image renders 1800 wide -> ~3225 tall; viewport is 852, so max ~-2370
  const y = interpolate(beatFrame, [0, BEAT_FRAMES], [0, -2300], {
    extrapolateRight: 'clamp',
  });
  return (
    <div style={{position: 'absolute', inset: 0, overflow: 'hidden', background: '#fff'}}>
      <Img
        src={staticFile('assets/generated/jobboard-scroll-tall.png')}
        style={{width: '100%', transform: `translateY(${y}px)`}}
      />
    </div>
  );
};

const SheetBeat: React.FC<{beatFrame: number}> = ({beatFrame}) => {
  const ROW_H = 64;
  // straight linear scroll — 36 rows covers the whole beat, no loop seam
  const scroll = beatFrame * 26;
  const rows = [...SHEET_PEOPLE, ...SHEET_PEOPLE, ...SHEET_PEOPLE];
  return (
    <div style={{position: 'absolute', inset: 0, overflow: 'hidden', background: '#fff', fontFamily: fonts.body}}>
      {/* sheets toolbar */}
      <div style={{height: 54, background: '#F7F8FA', borderBottom: '2px solid #E3E5EC', display: 'flex', alignItems: 'center', paddingLeft: 24, gap: 16}}>
        <div style={{width: 30, height: 40, background: '#1DA45E', borderRadius: 6}} />
        <div>
          <div style={{fontSize: 18, fontWeight: 600, color: '#1F2937'}}>Networking Tracker 2026</div>
          <div style={{fontSize: 13, color: GRAYTXT}}>File Edit View Insert Format Data Tools</div>
        </div>
      </div>
      {/* header row */}
      <div style={{display: 'flex', height: 48, background: '#EEF1F5', borderBottom: '2px solid #D8DCE4', fontWeight: 700, fontSize: 17, color: '#3B4351', alignItems: 'center'}}>
        {['', 'Name', 'Company', 'Status', 'Last contacted'].map((h, i) => (
          <div key={i} style={{width: i === 0 ? 60 : [0, 380, 420, 320, 320][i], paddingLeft: 16, borderRight: '1px solid #D8DCE4', height: '100%', display: 'flex', alignItems: 'center'}}>
            {h}
          </div>
        ))}
      </div>
      {/* endless rows */}
      <div style={{position: 'absolute', top: 102, left: 0, right: 0, bottom: 0, overflow: 'hidden'}}>
        <div style={{transform: `translateY(${-scroll}px)`}}>
          {rows.map((r, i) => (
            <div key={i} style={{display: 'flex', height: ROW_H, borderBottom: '1px solid #E7EAF0', fontSize: 18, color: '#28303C', alignItems: 'center'}}>
              <div style={{width: 60, paddingLeft: 16, color: GRAYTXT, borderRight: '1px solid #E7EAF0', height: '100%', display: 'flex', alignItems: 'center', background: '#F7F8FA', fontSize: 15}}>
                {i + 2}
              </div>
              <div style={{width: 380, paddingLeft: 16}}>{r[0]}</div>
              <div style={{width: 420, paddingLeft: 16}}>{r[1]}</div>
              <div style={{width: 320, paddingLeft: 16, color: STATUS_COLOR[r[2]] ?? INK, fontWeight: 600}}>{r[2]}</div>
              <div style={{width: 320, paddingLeft: 16, color: GRAYTXT}}>{r[3]}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const LinkedInBeat: React.FC<{beatFrame: number}> = ({beatFrame}) => {
  // quick scan down the profile: two fast pans with a beat between
  const y = interpolate(beatFrame, [0, 14, 20, BEAT_FRAMES], [0, -900, -900, -1900], {
    extrapolateRight: 'clamp',
  });
  return (
    <div style={{position: 'absolute', inset: 0, overflow: 'hidden', background: '#F3F2EF'}}>
      <Img
        src={staticFile('assets/generated/linkedin-profile-tall.png')}
        style={{width: '100%', transform: `translateY(${y}px)`}}
      />
    </div>
  );
};

const ChatGptBeat: React.FC<{beatFrame: number}> = ({beatFrame}) => {
  // the same cold email re-prompted: type → regenerate → retype
  const LOOP = 19;
  const iteration = Math.floor(beatFrame / LOOP);
  const loopFrame = beatFrame % LOOP;
  const typed = Math.round(
    interpolate(loopFrame, [2, LOOP - 2], [0, CHATGPT_REPLY.length], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }),
  );
  return (
    <div style={{position: 'absolute', inset: 0, background: '#FFFFFF', fontFamily: fonts.body, display: 'flex', flexDirection: 'column'}}>
      <div style={{padding: '28px 120px 0'}}>
        {/* user prompt bubble */}
        <div style={{marginLeft: 'auto', width: 640, background: '#F1F3F7', borderRadius: 18, padding: '18px 24px', fontSize: 19, color: '#28303C'}}>
          rewrite this cold email again, make it sound more confident but not desperate
        </div>
        {/* assistant reply, retyping */}
        <div style={{marginTop: 28, width: 900, fontSize: 19, lineHeight: 1.55, color: '#28303C', whiteSpace: 'pre-wrap', minHeight: 320}}>
          {CHATGPT_REPLY.slice(0, typed)}
          <span style={{opacity: Math.floor(beatFrame / 4) % 2 ? 0 : 1}}>▍</span>
        </div>
      </div>
      <div style={{marginTop: 'auto', padding: '0 120px 30px', display: 'flex', alignItems: 'center', gap: 18}}>
        <div style={{padding: '10px 22px', borderRadius: 10, border: '2px solid #D8DCE4', fontSize: 17, fontWeight: 600, color: iteration % 2 ? '#fff' : '#3B4351', background: iteration % 2 ? colors.primary : '#fff'}}>
          ↻ Regenerate
        </div>
        <div style={{fontSize: 16, color: GRAYTXT}}>Draft {8 + iteration} · still not right</div>
      </div>
    </div>
  );
};

/** B2: rapid-fire busywork montage — 4 tabs, hard cuts, one browser window. */
export const BusyworkMontage: React.FC = () => {
  const frame = useCurrentFrame();
  useVideoConfig();
  const beat = Math.min(TABS.length - 1, Math.floor(frame / BEAT_FRAMES));
  const beatFrame = frame - beat * BEAT_FRAMES;

  return (
    <MockStage backgroundColor={colors.background}>
      <div
        style={{
          position: 'absolute',
          left: 60,
          top: 60,
          width: 1800,
          height: 960,
          background: '#fff',
          borderRadius: 18,
          boxShadow: '0 16px 48px rgba(18,31,64,0.18)',
          overflow: 'hidden',
        }}
      >
        {/* tab bar — persistent, active tab jumps on every hard cut */}
        <div style={{height: 56, background: '#DEE1EA', position: 'relative', zIndex: 2}}>
          {['#FF5F57', '#FFBD2E', '#28C840'].map((c, i) => (
            <div key={c} style={{position: 'absolute', left: 22 + i * 26, top: 21, width: 14, height: 14, borderRadius: 7, background: c}} />
          ))}
          {TABS.map((t, i) => (
            <div
              key={t.label}
              style={{
                position: 'absolute',
                left: 110 + i * 400,
                top: 9,
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '9px 14px 9px 18px',
                borderRadius: 10,
                background: i === beat ? '#fff' : '#E9EBF2',
                fontFamily: fonts.body,
                fontSize: 15,
                fontWeight: i === beat ? 700 : 500,
                color: i === beat ? INK : GRAYTXT,
                whiteSpace: 'nowrap',
              }}
            >
              <span style={{width: 14, height: 14, borderRadius: 7, background: colors.primary}} />
              {t.label}
              <span style={{color: GRAYTXT}}>×</span>
            </div>
          ))}
        </div>
        {/* url bar */}
        <div style={{height: 52, background: '#F4F5F9', display: 'flex', alignItems: 'center', position: 'relative', zIndex: 2}}>
          <div style={{marginLeft: 100, width: 1600, height: 36, borderRadius: 18, background: '#fff', display: 'flex', alignItems: 'center', paddingLeft: 20, fontFamily: fonts.body, fontSize: 15, color: GRAYTXT}}>
            {TABS[beat].url}
          </div>
        </div>
        {/* content — hard cuts, no fades */}
        <div style={{position: 'absolute', top: 108, left: 0, right: 0, bottom: 0}}>
          {beat === 0 && <JobBoardBeat beatFrame={beatFrame} />}
          {beat === 1 && <SheetBeat beatFrame={beatFrame} />}
          {beat === 2 && <LinkedInBeat beatFrame={beatFrame} />}
          {beat === 3 && <ChatGptBeat beatFrame={beatFrame} />}
        </div>
      </div>
    </MockStage>
  );
};
