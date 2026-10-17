// Static screen layout; theme colors are applied by the component.
import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  // ── Navbar ──
  navbar: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    zIndex: 10,
  },
  navBrand: {
    gap: 6,
    flexDirection: "row",
    alignItems: "center",
    flexShrink: 1,
    minWidth: 0,
    marginRight: 6,
  },
  brandText: {
    flexShrink: 1,
    fontFamily: "HankenGrotesk-Bold",
    fontSize: 19,
    letterSpacing: -0.6,
    textTransform: "uppercase",
  },
  navActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    flexShrink: 0,
  },
  iconBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  authButtonsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  loginBtn: {
    paddingHorizontal: 6,
    paddingVertical: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  loginBtnText: {
    fontFamily: "JetBrainsMono-SemiBold",
    fontSize: 10.5,
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  primaryNavBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 9999,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryNavBtnText: {
    fontFamily: "JetBrainsMono-SemiBold",
    fontSize: 10.5,
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },

  // ── Scroll Content ──
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },

  // ── Hero Section ──
  heroSection: {
    paddingVertical: 56,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  heroInner: {
    maxWidth: 420,
    width: "100%",
    alignItems: "center",
  },
  heroHeadline: {
    fontFamily: "HankenGrotesk-ExtraBold",
    fontSize: 44,
    lineHeight: 46,
    letterSpacing: -1.8,
    textTransform: "uppercase",
    textAlign: "center",
    marginBottom: 18,
  },
  heroSubtitle: {
    fontFamily: "HankenGrotesk-Regular",
    fontSize: 15,
    lineHeight: 23,
    textAlign: "center",
    opacity: 0.85,
    marginBottom: 28,
    maxWidth: 320,
  },
  heroCtaBtn: {
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 9999,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  heroCtaBtnText: {
    fontFamily: "JetBrainsMono-SemiBold",
    fontSize: 12,
    letterSpacing: 1.8,
    textTransform: "uppercase",
  },

  // ── Bento Grid Features ──
  bentoSection: {
    paddingHorizontal: 16,
    paddingVertical: 32,
  },
  bentoCard: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    overflow: "hidden",
  },
  cardMediaBox: {
    height: 160,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
    overflow: "hidden",
  },
  calendarMediaBox: {
    height: 140,
    borderWidth: 1,
  },
  cardWatermarkIcon: {
    opacity: 0.22,
  },
  cardTextContent: {
    width: "100%",
  },
  cardTextContentTop: {
    width: "100%",
    marginBottom: 16,
  },
  cardTag: {
    fontFamily: "JetBrainsMono-SemiBold",
    fontSize: 11,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    marginBottom: 6,
  },
  cardTitle: {
    fontFamily: "HankenGrotesk-Bold",
    fontSize: 22,
    lineHeight: 28,
    letterSpacing: -0.5,
    marginBottom: 10,
  },
  cardDescription: {
    fontFamily: "HankenGrotesk-Regular",
    fontSize: 14,
    lineHeight: 22,
  },

  // Feature 2: Interactive Ring
  interactiveRingContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 16,
    height: 180,
  },
  outerCircle: {
    width: 170,
    height: 170,
    borderRadius: 85,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  spinningRing: {
    position: "absolute",
    width: 136,
    height: 136,
    borderRadius: 68,
    borderWidth: 1.5,
    borderStyle: "dashed",
  },

  // Feature 4: Team Workspaces
  teamCard: {
    position: "relative",
  },
  teamWatermarkContainer: {
    position: "absolute",
    right: -15,
    bottom: -20,
  },
  teamContentWrapper: {
    position: "relative",
    zIndex: 2,
  },
  miniBadgesRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 20,
  },
  miniBadge: {
    flex: 1,
    aspectRatio: 1.4,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  miniBadgeTitle: {
    fontFamily: "JetBrainsMono-SemiBold",
    fontSize: 12,
    letterSpacing: 0.5,
    marginBottom: 4,
    textAlign: "center",
  },
  miniBadgeSubtitle: {
    fontFamily: "JetBrainsMono-Medium",
    fontSize: 10,
    letterSpacing: 0.5,
    textAlign: "center",
  },

  // ── Quote Section ──
  quoteSection: {
    paddingVertical: 48,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  quoteText: {
    fontFamily: "HankenGrotesk-Bold",
    fontStyle: "italic",
    fontSize: 18,
    lineHeight: 26,
    letterSpacing: -0.3,
    textAlign: "center",
    maxWidth: 340,
    marginBottom: 14,
  },
  quoteAttribution: {
    fontFamily: "JetBrainsMono-SemiBold",
    fontSize: 11,
    letterSpacing: 1.8,
    textAlign: "center",
    textTransform: "uppercase",
  },

  // ── Footer ──
  footerSection: {
    paddingVertical: 36,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    alignItems: "center",
  },
  footerBrandCol: {
    alignItems: "center",
    marginBottom: 20,
  },
  footerBrandText: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 14,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    marginBottom: 4,
  },
  footerCopyright: {
    fontFamily: "JetBrainsMono-Medium",
    fontSize: 10,
    letterSpacing: 0.5,
    textTransform: "uppercase",
    textAlign: "center",
  },
  footerLinksGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    maxWidth: 340,
  },
  footerLinkBtn: {
    minHeight: 44,
    paddingHorizontal: 8,
    paddingVertical: 6,
    marginHorizontal: 3,
    marginVertical: 3,
  },
  footerLinkText: {
    fontFamily: "JetBrainsMono-Medium",
    fontSize: 11,
    lineHeight: 16,
    textDecorationLine: "underline",
  },
});
export default styles;
