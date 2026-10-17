// Static layout styles; theme colors are supplied by the screen at render time.
import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: {
    padding: 16,
    gap: 20,
  },
  // Hero Focus Card
  focusHeroCard: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 20,
    position: "relative",
    overflow: "hidden",
    gap: 12,
  },
  watermarkText: {
    position: "absolute",
    top: 16,
    right: 16,
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 48,
    opacity: 0.08,
  },
  focusTopBadges: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 8,
  },
  focusStatusPill: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 9999,
    borderWidth: 1,
    gap: 6,
  },
  pulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  focusStatusText: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 10,
    textTransform: "uppercase",
  },
  refCodeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    borderWidth: 1,
  },
  refCodeText: {
    fontFamily: "JetBrainsMono-Medium",
    fontSize: 10,
    textTransform: "uppercase",
  },
  focusTitle: {
    fontFamily: "HankenGrotesk-ExtraBold",
    fontSize: 24,
    lineHeight: 28,
    letterSpacing: -0.6,
    textTransform: "uppercase",
  },
  focusDescription: {
    fontFamily: "HankenGrotesk-Regular",
    fontSize: 13,
    lineHeight: 19,
  },
  focusActionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 4,
  },
  startSessionBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 9999,
    gap: 6,
  },
  startSessionBtnText: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 11,
    letterSpacing: 0.8,
  },
  detailsBtn: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 9999,
    borderWidth: 1,
  },
  detailsBtnText: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 11,
    letterSpacing: 0.8,
  },
  // Scheduled Protocols Section
  scheduledSection: {
    gap: 10,
  },
  sectionHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 8,
    borderBottomWidth: 1,
  },
  sectionHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  sectionTitle: {
    fontFamily: "HankenGrotesk-Bold",
    fontSize: 16,
    textTransform: "uppercase",
    letterSpacing: -0.2,
  },
  dayText: {
    fontFamily: "JetBrainsMono-Medium",
    fontSize: 11,
  },
  protocolsListCard: {
    borderWidth: 1,
    borderRadius: 12,
    overflow: "hidden",
  },
  emptyProtocolsBox: {
    padding: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyProtocolsText: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 11,
  },
  protocolItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderBottomWidth: 1,
    position: "relative",
    gap: 12,
  },
  focusLeftBar: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 3,
  },
  protocolTime: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 11,
    width: 44,
  },
  protocolInfo: {
    flex: 1,
    gap: 4,
  },
  protocolTitle: {
    fontFamily: "HankenGrotesk-Bold",
    fontSize: 13,
    textTransform: "uppercase",
  },
  protocolBadgesRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    flexWrap: "wrap",
  },
  statusPill: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 9999,
    borderWidth: 1,
    gap: 4,
  },
  statusPillText: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 9,
  },
  priorityBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
  },
  priorityBadgeText: {
    fontFamily: "JetBrainsMono-Regular",
    fontSize: 9,
  },
  protocolActionBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  // Bento Section
  bentoSection: {
    gap: 12,
  },
  bentoCard: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    gap: 10,
  },
  bentoTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bentoLabel: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  bentoProgressCount: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 11,
  },
  bentoProgressBox: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    gap: 8,
  },
  progressBarBg: {
    height: 8,
    borderRadius: 4,
    overflow: "hidden",
    width: "100%",
  },
  progressBarFill: {
    height: "100%",
    borderRadius: 4,
  },
  progressLabelsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  progressStepText: {
    fontFamily: "JetBrainsMono-Regular",
    fontSize: 10,
  },
  progressCenterVal: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 13,
  },
  activeDirectiveTitle: {
    fontFamily: "HankenGrotesk-Bold",
    fontSize: 16,
  },
  activeDirectiveMeta: {
    fontFamily: "JetBrainsMono-Regular",
    fontSize: 10,
    textTransform: "uppercase",
  },
  focusActionBottomBtn: {
    paddingVertical: 11,
    borderRadius: 9999,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },
  focusActionBottomBtnText: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 11,
    letterSpacing: 0.8,
  },
});
export default styles;
