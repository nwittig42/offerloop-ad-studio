import React from 'react';
import {colors, fonts} from '../../brand/theme';

// Shared primitives for the 1320x2868 App Store screenshot panels.
// Phone screens are built at a fixed logical size (430x932, real iPhone points)
// and scaled/rotated by the panels, so text stays crisp at any output size.

export const PANEL_W = 1320;
export const PANEL_H = 2868;

export const SCREEN_W = 430;
export const SCREEN_H = 932;
const BEZEL = 20;
export const PHONE_W = SCREEN_W + BEZEL * 2;
export const PHONE_H = SCREEN_H + BEZEL * 2;

// Product UI blue as it appears in the shipped app (brighter than brand primary).
export const APP_BLUE = '#3E63F2';
export const UI_GRAY = '#6B7385';
export const UI_CHIP = '#EEF0F5';
export const UI_LINE = '#E4E7EE';
export const GREEN = '#1F9D55';
export const GREEN_BG = '#E3F4E8';

export const LightCanvas: React.FC<{children?: React.ReactNode}> = ({children}) => (
  <div
    style={{
      width: PANEL_W,
      height: PANEL_H,
      position: 'relative',
      overflow: 'hidden',
      background: `
        radial-gradient(90% 42% at 88% 4%, rgba(182,195,232,0.55) 0%, rgba(182,195,232,0) 70%),
        radial-gradient(80% 38% at 4% 86%, rgba(75,97,168,0.18) 0%, rgba(75,97,168,0) 70%),
        ${colors.background}`,
    }}
  >
    {children}
  </div>
);

export const DarkCanvas: React.FC<{children?: React.ReactNode}> = ({children}) => (
  <div
    style={{
      width: PANEL_W,
      height: PANEL_H,
      position: 'relative',
      overflow: 'hidden',
      background: `
        radial-gradient(70% 34% at 50% 40%, rgba(76,110,245,0.34) 0%, rgba(76,110,245,0) 70%),
        linear-gradient(180deg, #0D1730 0%, ${colors.secondaryDark} 55%, #101E3C 100%)`,
    }}
  >
    {children}
  </div>
);

export const Kicker: React.FC<{children: React.ReactNode; dark?: boolean; style?: React.CSSProperties}> = ({
  children,
  dark,
  style,
}) => (
  <div
    style={{
      fontFamily: fonts.body,
      fontWeight: 800,
      fontSize: 38,
      letterSpacing: '0.22em',
      textTransform: 'uppercase',
      color: dark ? colors.secondaryLight : colors.primary,
      ...style,
    }}
  >
    {children}
  </div>
);

export type HeadlineSeg = {t: string; tint?: boolean};

export const Headline: React.FC<{
  lines: HeadlineSeg[][];
  dark?: boolean;
  align?: 'left' | 'center' | 'right';
  size?: number;
  style?: React.CSSProperties;
}> = ({lines, dark, align = 'left', size = 118, style}) => (
  <div
    style={{
      fontFamily: fonts.heading,
      fontWeight: 700,
      fontSize: size,
      lineHeight: 1.14,
      letterSpacing: '-0.02em',
      color: dark ? '#F4F7FF' : colors.ink,
      textAlign: align,
      ...style,
    }}
  >
    {lines.map((segs, i) => (
      <div key={i}>
        {segs.map((s, j) => (
          <span key={j} style={s.tint ? {color: dark ? colors.secondaryLight : colors.primary} : undefined}>
            {s.t}
          </span>
        ))}
      </div>
    ))}
  </div>
);

const StatusBar: React.FC = () => (
  <div
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 52,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 32px 0 40px',
      fontFamily: fonts.body,
      fontWeight: 700,
      fontSize: 17,
      color: '#0B0D12',
      zIndex: 5,
    }}
  >
    <span>9:41</span>
    <svg width="72" height="14" viewBox="0 0 72 14">
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={i * 6} y={9 - i * 3} width="4" height={5 + i * 3} rx="1.2" fill="#0B0D12" />
      ))}
      <path d="M38 6 a 9 9 0 0 1 12 0 l -2.2 2.6 a 5.6 5.6 0 0 0 -7.6 0 z" fill="#0B0D12" />
      <circle cx="44" cy="11" r="2" fill="#0B0D12" />
      <rect x="56" y="3" width="13" height="8" rx="2.4" fill="none" stroke="#0B0D12" strokeWidth="1.2" />
      <rect x="57.5" y="4.5" width="8" height="5" rx="1.2" fill="#0B0D12" />
      <rect x="70" y="5.4" width="1.8" height="3.2" rx="0.9" fill="#0B0D12" />
    </svg>
  </div>
);

/**
 * iPhone frame at logical size (470x972). Position it with an absolutely-placed
 * wrapper; pass scale/rotate and the transform origin that keeps the visible
 * corner anchored. Screens render as children on a white 430x932 surface.
 */
export const PhoneFrame: React.FC<{
  scale?: number;
  rotate?: number;
  origin?: string;
  statusBar?: boolean;
  children?: React.ReactNode;
}> = ({scale = 2.1, rotate = 0, origin = 'top left', statusBar = true, children}) => (
  <div
    style={{
      width: PHONE_W,
      height: PHONE_H,
      transform: `scale(${scale}) rotate(${rotate}deg)`,
      transformOrigin: origin,
      borderRadius: 78,
      background: 'linear-gradient(160deg, #2A2D36 0%, #0B0D12 60%)',
      padding: BEZEL,
      boxShadow: '0 34px 90px rgba(14,26,58,0.34)',
    }}
  >
    <div
      style={{
        width: SCREEN_W,
        height: SCREEN_H,
        borderRadius: 60,
        background: '#FBFCFE',
        overflow: 'hidden',
        position: 'relative',
        fontFamily: fonts.body,
      }}
    >
      {statusBar ? <StatusBar /> : null}
      <div
        style={{
          position: 'absolute',
          top: 14,
          left: SCREEN_W / 2 - 62,
          width: 124,
          height: 36,
          borderRadius: 20,
          background: '#0B0D12',
          zIndex: 6,
        }}
      />
      {children}
    </div>
  </div>
);

const NAV_ITEMS = ['Feed', 'Inbox', 'Scout', 'Network', 'Profile'] as const;

const NavIcon: React.FC<{name: (typeof NAV_ITEMS)[number]; color: string}> = ({name, color}) => {
  const s = {fill: 'none', stroke: color, strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const};
  switch (name) {
    case 'Feed':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24">
          <rect x="4" y="3.5" width="16" height="17" rx="3.5" {...s} />
          <line x1="8" y1="9" x2="16" y2="9" {...s} />
          <line x1="8" y1="13" x2="14" y2="13" {...s} />
        </svg>
      );
    case 'Inbox':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24">
          <rect x="3.5" y="5" width="17" height="14" rx="3" {...s} />
          <path d="M4.5 7.5 12 13l7.5-5.5" {...s} />
        </svg>
      );
    case 'Scout':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24">
          <path d="M12 2.8 14.2 9.8 21.2 12 14.2 14.2 12 21.2 9.8 14.2 2.8 12 9.8 9.8 Z" fill={color} />
        </svg>
      );
    case 'Network':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24">
          <circle cx="9" cy="9" r="3.2" {...s} />
          <circle cx="16.5" cy="10.5" r="2.4" {...s} />
          <path d="M3.8 19c0.8-3 2.8-4.6 5.2-4.6s4.4 1.6 5.2 4.6" {...s} />
          <path d="M15.4 15.5c2 0.2 3.6 1.4 4.4 3.5" {...s} />
        </svg>
      );
    case 'Profile':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24">
          <circle cx="12" cy="8.6" r="3.4" {...s} />
          <path d="M5 20c1.2-3.6 3.8-5.4 7-5.4s5.8 1.8 7 5.4" {...s} />
        </svg>
      );
  }
};

export const TabBar: React.FC<{active: (typeof NAV_ITEMS)[number]; badge?: number}> = ({active, badge}) => (
  <div
    style={{
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: 84,
      background: '#FFFFFF',
      borderTop: `1px solid ${UI_LINE}`,
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'flex-start',
      paddingTop: 10,
      zIndex: 5,
    }}
  >
    {NAV_ITEMS.map((n) => {
      const on = n === active;
      const c = on ? APP_BLUE : '#9AA1B2';
      return (
        <div key={n} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, position: 'relative'}}>
          {n === 'Inbox' && badge ? (
            <div
              style={{
                position: 'absolute',
                top: -6,
                right: -14,
                minWidth: 20,
                height: 20,
                borderRadius: 10,
                background: '#E5484D',
                color: '#fff',
                fontSize: 11,
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0 5px',
              }}
            >
              {badge}
            </div>
          ) : null}
          <NavIcon name={n} color={c} />
          <span style={{fontSize: 11, fontWeight: on ? 700 : 500, color: c}}>{n}</span>
        </div>
      );
    })}
  </div>
);

export const Wordmark: React.FC<{size?: number; color?: string}> = ({size = 26, color = colors.ink}) => (
  <span style={{fontFamily: fonts.wordmark, fontSize: size, color, letterSpacing: '0.01em'}}>Offerloop</span>
);

/** Small in-screen chip (job details, filters). */
export const Chip: React.FC<{label: string; bg?: string; color?: string; size?: number; icon?: React.ReactNode; style?: React.CSSProperties}> = ({
  label,
  bg = UI_CHIP,
  color = colors.ink,
  size = 15,
  icon,
  style,
}) => (
  <span
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 7,
      padding: `${size * 0.55}px ${size * 0.95}px`,
      borderRadius: 10,
      background: bg,
      color,
      fontFamily: fonts.body,
      fontWeight: 600,
      fontSize: size,
      whiteSpace: 'nowrap',
      ...style,
    }}
  >
    {icon}
    {label}
  </span>
);

/** Big floating chip pulled out of the phone, Sorce-style. */
export const FloatChip: React.FC<{label: string; icon?: React.ReactNode; bg?: string; color?: string; style?: React.CSSProperties}> = ({
  label,
  icon,
  bg = '#FFFFFF',
  color = colors.ink,
  style,
}) => (
  <div
    style={{
      position: 'absolute',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 14,
      padding: '22px 34px',
      borderRadius: 22,
      background: bg,
      color,
      fontFamily: fonts.body,
      fontWeight: 700,
      fontSize: 34,
      boxShadow: '0 24px 60px rgba(17,32,64,0.18)',
      whiteSpace: 'nowrap',
      ...style,
    }}
  >
    {icon}
    {label}
  </div>
);

/** White floating card container (out-of-phone UI). */
export const FloatCard: React.FC<{style?: React.CSSProperties; children?: React.ReactNode}> = ({style, children}) => (
  <div
    style={{
      position: 'absolute',
      background: '#FFFFFF',
      borderRadius: 30,
      boxShadow: '0 30px 80px rgba(17,32,64,0.20)',
      fontFamily: fonts.body,
      ...style,
    }}
  >
    {children}
  </div>
);

export const Avatar: React.FC<{text: string; size?: number; bg?: string; color?: string}> = ({
  text,
  size = 44,
  bg = '#E8ECF7',
  color = colors.primary,
}) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: size / 2,
      background: bg,
      color,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: fonts.body,
      fontWeight: 700,
      fontSize: size * 0.4,
      flexShrink: 0,
      textTransform: 'lowercase',
    }}
  >
    {text}
  </div>
);

export const PlaneGlyph: React.FC<{size?: number; color?: string}> = ({size = 22, color = '#fff'}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={{display: 'block'}}>
    <path d="M3.4 11.1 20.6 3.6c0.7-0.3 1.4 0.4 1.1 1.1l-7.5 17.2c-0.3 0.8-1.4 0.7-1.7-0.1l-2.1-6.6-6.9-2.4c-0.8-0.3-0.8-1.4 0.1-1.7z" fill={color} />
  </svg>
);

/** Scout's glowing orb, pure CSS (crisp at any scale). */
export const ScoutOrb: React.FC<{size?: number; style?: React.CSSProperties}> = ({size = 420, style}) => (
  <div style={{position: 'absolute', width: size, height: size, ...style}}>
    <div
      style={{
        position: 'absolute',
        inset: -size * 0.45,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(96,130,255,0.5) 0%, rgba(96,130,255,0.16) 45%, rgba(96,130,255,0) 70%)',
      }}
    />
    <div
      style={{
        position: 'absolute',
        inset: 0,
        borderRadius: '50%',
        background: 'radial-gradient(circle at 38% 32%, #F2F6FF 0%, #B9CBFA 26%, #5F7EF0 58%, #21327E 88%, #141F52 100%)',
        boxShadow: '0 0 120px rgba(96,130,255,0.55), inset 0 0 60px rgba(255,255,255,0.25)',
      }}
    />
    <div
      style={{
        position: 'absolute',
        left: '20%',
        top: '14%',
        width: '26%',
        height: '18%',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0) 70%)',
      }}
    />
  </div>
);
