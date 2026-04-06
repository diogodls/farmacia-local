export const colors = {
  background: "#f4f2ea",
  surface: "#ffffff",
  surfaceAlt: "#fbf8f0",
  surfaceTint: "#fffdf7",
  textPrimary: "#1f2a24",
  textSecondary: "#56645c",
  textMuted: "#6e7a73",
  accent: "#1f7a5a",
  accentSoft: "#dff1e9",
  success: "#4ea87a",
  warning: "#f0b34a",
  mapPin: "#d95d39",
  border: "#ded8ca",
  borderSoft: "#eee8da",
  tabBackground: "#e7e0d2",
  banner: "#25443a",
  hero: "#2f5d50",
  shadow: "#1a211d",
} as const;

export const spacing = {
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
} as const;

export const radii = {
  md: 16,
  lg: 20,
  xl: 22,
  map: 24,
  pill: 999,
} as const;

export const typography = {
  caption: 12,
  bodySm: 13,
  body: 15,
  bodyLg: 16,
  titleSm: 18,
  title: 22,
  hero: 28,
} as const;
