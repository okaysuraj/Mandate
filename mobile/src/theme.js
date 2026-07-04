// Mandate Design System — Industrial Minimalist Theme

export const lightColors = {
  surfaceContainerHigh: "#e7e8ea",
  background: "#f9f9fb",
  secondaryFixedDim: "#c6c6c8",
  onTertiaryFixedVariant: "#00531e",
  onPrimaryContainer: "#858383",
  onErrorContainer: "#93000a",
  outlineVariant: "#c4c7c7",
  onTertiaryFixed: "#002108",
  primaryFixed: "#e5e2e1",
  surfaceContainerHighest: "#e1e2e4",
  surfaceDim: "#d9dadc",
  onSecondaryFixedVariant: "#454749",
  primaryFixedDim: "#c8c6c5",
  inversePrimary: "#c8c6c5",
  onSecondary: "#ffffff",
  onPrimaryFixedVariant: "#474746",
  primary: "#000000",
  tertiary: "#000000",
  onSecondaryContainer: "#616365",
  onSurfaceVariant: "#444748",
  surfaceVariant: "#e1e2e4",
  onTertiary: "#ffffff",
  onSurface: "#191c1e",
  outline: "#747878",
  tertiaryFixed: "#69ff87",
  inverseOnSurface: "#f0f1f3",
  onPrimaryFixed: "#1c1b1b",
  errorContainer: "#ffdad6",
  primaryContainer: "#1c1b1b",
  secondary: "#5d5e60",
  onError: "#ffffff",
  surface: "#f9f9fb",
  surfaceTint: "#5f5e5e",
  inverseSurface: "#2e3132",
  surfaceContainerLow: "#f3f3f5",
  onTertiaryContainer: "#00983d",
  onPrimary: "#ffffff",
  error: "#ba1a1a",
  tertiaryFixedDim: "#3ce36a",
  tertiaryContainer: "#002108",
  surfaceContainerLowest: "#ffffff",
  secondaryContainer: "#dfdfe1",
  surfaceBright: "#f9f9fb",
  onSecondaryFixed: "#1a1c1d",
  secondaryFixed: "#e2e2e4",
  onBackground: "#191c1e",
  surfaceContainer: "#edeef0",
};

export const darkColors = {
  surfaceContainerHigh: "#282828",
  background: "#0a0a0a",
  secondaryFixedDim: "#c6c6c8",
  onTertiaryFixedVariant: "#00531e",
  onPrimaryContainer: "#1c1b1b",
  onErrorContainer: "#ffdad6",
  outlineVariant: "#444748",
  onTertiaryFixed: "#002108",
  primaryFixed: "#e5e2e1",
  surfaceContainerHighest: "#333333",
  surfaceDim: "#111111",
  onSecondaryFixedVariant: "#454749",
  primaryFixedDim: "#c8c6c5",
  inversePrimary: "#000000",
  onSecondary: "#ffffff",
  onPrimaryFixedVariant: "#474746",
  primary: "#ffffff",
  tertiary: "#ffffff",
  onSecondaryContainer: "#e2e2e4",
  onSurfaceVariant: "#c4c7c7",
  surfaceVariant: "#2c2c2c",
  onTertiary: "#ffffff",
  onSurface: "#f9f9fb",
  outline: "#444748",
  tertiaryFixed: "#69ff87",
  inverseOnSurface: "#2e3132",
  onPrimaryFixed: "#1c1b1b",
  errorContainer: "#93000a",
  primaryContainer: "#e5e2e1",
  secondary: "#c6c6c8",
  onError: "#ffffff",
  surface: "#0a0a0a",
  surfaceTint: "#c8c6c5",
  inverseSurface: "#f0f1f3",
  surfaceContainerLow: "#141414",
  onTertiaryContainer: "#3ce36a",
  onPrimary: "#000000",
  error: "#ba1a1a",
  tertiaryFixedDim: "#3ce36a",
  tertiaryContainer: "#002108",
  surfaceContainerLowest: "#000000",
  secondaryContainer: "#dfdfe1",
  surfaceBright: "#282828",
  onSecondaryFixed: "#1a1c1d",
  secondaryFixed: "#e2e2e4",
  onBackground: "#f9f9fb",
  surfaceContainer: "#1c1c1c",
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
  DEFAULT: 16,
  lg: 32,
  xl: 48,
  full: 9999,
};
