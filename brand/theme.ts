// Offerloop brand theme — synced from Figma "Offerloop x PS Main File"
// (file mzL5XPw3VFciHDs6RG7SAb, design-system page 1418:2135).
// Last sync: 2026-07-10. Re-sync by asking Claude: "re-sync brand from Figma".

export const colors = {
  background: '#F5F6F8',
  primary: '#4A60A8',
  secondaryLight: '#B6C3E8',
  secondaryDark: '#1E2D4D',
  // Deep navy used for the Offerloop wordmark and illustration line work.
  ink: '#112F54',
  // Accent is marked "TBD" in the Figma design system — aliased to primary
  // until one is chosen.
  accent: '#4A60A8',
  white: '#FFFFFF',
} as const;

// Full primary ramp from the design-system page (★ = brand primary swatch).
export const primaryScale = {
  50: '#F3F3F6',
  100: '#E3E5EC',
  200: '#C4CADD',
  300: '#9CA8CD',
  400: '#6C7FBA',
  500: '#4B61A8', // ★
  600: '#3D4F89',
  700: '#2F3C66',
  800: '#212944',
} as const;

// Typography from the design-system page:
// - Headings: Lora Bold (H2 48px, line-height 1.2, letter-spacing -2%)
// - Body/UI: Google Sans Flex Regular (24px, line-height 1.34). Google Sans
//   Flex is Google's brand font and not freely redistributable — Inter is the
//   fallback if it isn't installed locally.
// - Wordmark: Libre Baskerville Regular in colors.ink (the "Offerloop" text).
export const fonts = {
  heading: "'Lora', Georgia, serif",
  body: "'Google Sans Flex', 'Inter', -apple-system, sans-serif",
  wordmark: "'Libre Baskerville', Georgia, serif",
} as const;

export const logo = {
  // No standalone logo asset exists in the Figma file yet (the Scout badge
  // frame literally says "feel free to add logo!"). The wordmark below is the
  // "Offerloop" text vectorized from the badge; swap for the real logo when
  // one lands in Figma.
  wordmark: 'assets/figma/offerloop-wordmark.svg',
} as const;

// Illustration exports from the design-system page (Scout mascot set).
export const illustrations = {
  scoutMountainSummit: 'assets/figma/scout-mountain-summit.png', // scout planting ∞ flag on summit — hero/end-card art
  scoutPeekabooWave: 'assets/figma/scout-peekaboo-wave.png', // scout with backpack waving
  scoutPeekabooLedge: 'assets/figma/scout-peekaboo-ledge.png', // scout peeking over a ledge
  scoutBadge: 'assets/figma/scout-badge.png', // scout badge card with wordmark
  mountainsForestBg: 'assets/figma/mountains-forest-bg.png', // watercolor mountains + forest, wide
  mountainsLakeBg: 'assets/figma/mountains-lake-bg.png', // watercolor mountains + lake, wide
} as const;
