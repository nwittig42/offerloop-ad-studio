// Offerloop brand theme — synced from Figma "Offerloop x PS Main File"
// (file mzL5XPw3VFciHDs6RG7SAb, design-system page 1418:2135).
// Re-sync by asking Claude: "re-sync brand from Figma".

export const colors = {
  background: '#F5F6F8',
  primary: '#4A60A8',
  secondaryLight: '#B6C3E8',
  secondaryDark: '#1E2D4D',
  // Accent is marked "TBD" in the Figma design system — aliased to primary
  // until one is chosen.
  accent: '#4A60A8',
  white: '#FFFFFF',
} as const;

export const fonts = {
  heading: 'Inter, -apple-system, sans-serif',
  body: 'Inter, -apple-system, sans-serif',
} as const;

export const logo = {
  // Populated by the Figma asset sync into public/assets/figma/.
  light: 'assets/figma/logo-light.png',
  dark: 'assets/figma/logo-dark.png',
} as const;
