// Mandate Design System — Premium Monochrome Theme
// Matches the web app's visual language: Space Grotesk headings, Inter body, #1A1A1A primary

export const colors = {
  primary: "#1A1A1A",
  background: "#F9F9FB",
  white: "#FFFFFF",
  black: "#0A0A0A",
  border: "#D9DADC",
  borderLight: "#EDEDF0",
  cardBg: "#F3F3F5",
  textPrimary: "#1A1A1A",
  textSecondary: "#6B7280",
  textMuted: "#9CA3AF",
  danger: "#EF4444",
  success: "#22C55E",
  warning: "#F59E0B",
};

export const fonts = {
  regular: { fontSize: 14, color: colors.textPrimary },
  small: { fontSize: 12, color: colors.textSecondary },
  tiny: {
    fontSize: 10,
    fontWeight: "700",
    color: colors.textMuted,
    textTransform: "uppercase",
    letterSpacing: 2,
  },
  heading: {
    fontSize: 32,
    fontWeight: "800",
    color: colors.textPrimary,
    textTransform: "uppercase",
    letterSpacing: -1,
  },
  heroHeading: {
    fontSize: 56,
    fontWeight: "800",
    color: colors.textPrimary,
    textTransform: "uppercase",
    letterSpacing: -2,
  },
  sectionHeading: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.textPrimary,
    letterSpacing: -0.5,
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 20,
  xl: 32,
  full: 999,
};
