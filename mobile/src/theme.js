// Mandate Design System — Refined Industrial Theme
// Matched with Web: High-contrast light mode & WhatsApp Web inspired greyish dark mode

export const lightColors = {
  background: "#eef2f6",
  surface: "#ffffff",
  surfaceContainerLowest: "#ffffff",
  surfaceContainerLow: "#f6f8fb",
  surfaceContainer: "#e2e7ef",
  surfaceContainerHigh: "#cbd5e1",
  surfaceContainerHighest: "#94a3b8",
  surfaceDim: "#dfe4ed",
  surfaceBright: "#ffffff",
  surfaceVariant: "#f0f3f8",

  onBackground: "#090d16",
  onSurface: "#090d16",
  onSurfaceVariant: "#334155",
  outline: "#475569",
  outlineVariant: "#cbd5e1",

  primary: "#090d16",
  onPrimary: "#ffffff",
  primaryContainer: "#e2e7ef",
  onPrimaryContainer: "#090d16",
  primaryFixed: "#e2e7ef",
  primaryFixedDim: "#cbd5e1",
  onPrimaryFixed: "#090d16",
  onPrimaryFixedVariant: "#1e293b",
  inversePrimary: "#94a3b8",
  inverseSurface: "#090d16",
  inverseOnSurface: "#f8fafc",

  secondary: "#334155",
  onSecondary: "#ffffff",
  secondaryContainer: "#e2e7ef",
  onSecondaryContainer: "#090d16",
  secondaryFixed: "#e2e7ef",
  secondaryFixedDim: "#cbd5e1",
  onSecondaryFixed: "#090d16",
  onSecondaryFixedVariant: "#1e293b",
  secondaryFixedDim: "#cbd5e1",
  onSecondaryFixedVariant: "#1e293b",

  tertiary: "#047857",
  onTertiary: "#ffffff",
  tertiaryContainer: "#ecfdf5",
  onTertiaryContainer: "#064e3b",
  tertiaryFixed: "#047857",
  tertiaryFixedDim: "#059669",
  onTertiaryFixed: "#022c22",
  onTertiaryFixedVariant: "#064e3b",

  error: "#dc2626",
  onError: "#ffffff",
  errorContainer: "#fef2f2",
  onErrorContainer: "#991b1b",

  surfaceTint: "#475569",
};

export const darkColors = {
  background: "#111b21",
  surface: "#202c33",
  surfaceContainerLowest: "#202c33",
  surfaceContainerLow: "#182229",
  surfaceContainer: "#222e35",
  surfaceContainerHigh: "#2a3942",
  surfaceContainerHighest: "#374248",
  surfaceDim: "#111b21",
  surfaceBright: "#2a3942",
  surfaceVariant: "#1c272e",

  onBackground: "#e9edef",
  onSurface: "#e9edef",
  onSurfaceVariant: "#aebac1",
  outline: "#8696a0",
  outlineVariant: "#2a3942",

  primary: "#e9edef",
  onPrimary: "#111b21",
  primaryContainer: "#2a3942",
  onPrimaryContainer: "#e9edef",
  primaryFixed: "#2a3942",
  primaryFixedDim: "#374248",
  onPrimaryFixed: "#e9edef",
  onPrimaryFixedVariant: "#d1d7db",
  inversePrimary: "#222e35",
  inverseSurface: "#e9edef",
  inverseOnSurface: "#111b21",

  secondary: "#aebac1",
  onSecondary: "#111b21",
  secondaryContainer: "#222e35",
  onSecondaryContainer: "#e9edef",
  secondaryFixed: "#2a3942",
  secondaryFixedDim: "#374248",
  onSecondaryFixed: "#e9edef",
  onSecondaryFixedVariant: "#d1d7db",
  secondaryFixedDim: "#374248",
  onSecondaryFixedVariant: "#d1d7db",

  tertiary: "#00a884",
  onTertiary: "#ffffff",
  tertiaryContainer: "#0b3d33",
  onTertiaryContainer: "#25d366",
  tertiaryFixed: "#00a884",
  tertiaryFixedDim: "#059669",
  onTertiaryFixed: "#022c22",
  onTertiaryFixedVariant: "#25d366",

  error: "#f15c6d",
  onError: "#450a0a",
  errorContainer: "#3c1e22",
  onErrorContainer: "#fca5a5",

  surfaceTint: "#8696a0",
};

// Default static fallback for components not yet migrated to ThemeProvider
export const colors = lightColors;

// Typographic tokens (requires loaded fonts: HankenGrotesk-*, JetBrainsMono-*)
export const typography = {
  headlineLgMobile: {
    fontFamily: "HankenGrotesk-Bold",
    fontSize: 24,
    lineHeight: 28.8, // 1.2
    letterSpacing: -0.48, // -0.02em
  },
  labelCaps: {
    fontFamily: "JetBrainsMono-SemiBold",
    fontSize: 11,
    lineHeight: 15.4, // 1.4
    letterSpacing: 1.1, // 0.1em
  },
  bodyMd: {
    fontFamily: "HankenGrotesk-Regular",
    fontSize: 16,
    lineHeight: 25.6, // 1.6
    letterSpacing: 0,
  },
  headlineLg: {
    fontFamily: "HankenGrotesk-Bold",
    fontSize: 32,
    lineHeight: 38.4,
    letterSpacing: -0.64,
  },
  displayLg: {
    fontFamily: "HankenGrotesk-ExtraBold",
    fontSize: 64,
    lineHeight: 70.4,
    letterSpacing: -2.56,
  },
  labelSm: {
    fontFamily: "JetBrainsMono-Medium",
    fontSize: 12,
    lineHeight: 16.8,
    letterSpacing: 0,
  },
};

// Aliases for backwards compatibility during migration
export const fonts = {
  regular: typography.bodyMd,
  small: typography.labelSm,
  tiny: typography.labelCaps,
  heading: typography.headlineLgMobile,
  heroHeading: typography.displayLg,
  sectionHeading: typography.headlineLgMobile,
};

export const spacing = {
  unit: 4,
  xs: 4,
  sm: 8,
  md: 16,
  gutter: 24,
  lg: 32,
  xl: 64,
};

export const borderRadius = {
  xs: 4,
  sm: 6,
  md: 8,
  DEFAULT: 12,
  lg: 16,
  xl: 20,
  full: 9999,
};
