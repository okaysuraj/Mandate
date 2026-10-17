// Static layout styles; theme colors are supplied by the screen at render time.
import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: {
    padding: 16,
    gap: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 4,
  },
  commandTitle: {
    fontFamily: "HankenGrotesk-Bold",
    fontSize: 22,
    letterSpacing: -0.5,
  },
  commandSubtitle: {
    fontFamily: "JetBrainsMono-Medium",
    fontSize: 10,
    letterSpacing: 0.8,
    marginTop: 2,
    textTransform: "uppercase",
  },
  liveBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 9999,
    borderWidth: 1,
    gap: 6,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  liveText: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 10,
  },
  metricsRow: {
    gap: 12,
  },
  bentoCard: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
  },
  cardTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  metricLabel: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 11,
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  valueRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 4,
  },
  metricValue: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 32,
    lineHeight: 36,
  },
  metricUnit: {
    fontFamily: "JetBrainsMono-Medium",
    fontSize: 16,
  },
  progressBarBg: {
    height: 6,
    borderRadius: 3,
    overflow: "hidden",
    marginVertical: 10,
    width: "100%",
  },
  progressBarFill: {
    height: "100%",
    borderRadius: 3,
  },
  metricSubtext: {
    fontFamily: "JetBrainsMono-Regular",
    fontSize: 11,
  },
  statusBlocksRow: {
    flexDirection: "row",
    gap: 6,
    marginVertical: 10,
  },
  statusBlock: {
    flex: 1,
    height: 6,
    borderRadius: 2,
  },
  // Pulse Card
  pulseCard: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    gap: 14,
  },
  pulseHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 6,
  },
  pulseTitle: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  pulseBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 9999,
    borderWidth: 1,
  },
  pulseBadgeText: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 9,
  },
  visualizerBox: {
    height: 120,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  radarWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  outerRadarRing: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  innerRadarRing: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
  },
  liveLogsList: {
    gap: 8,
  },
  logItemCard: {
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    gap: 4,
  },
  logMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  logDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  logTime: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 10,
  },
  logTaskTitle: {
    fontFamily: "HankenGrotesk-Regular",
    fontSize: 12,
    paddingLeft: 12,
  },
  // Pinned Mandates Card
  pinnedCard: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  pinnedHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pinnedTitle: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  viewAllText: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 10,
    letterSpacing: 0.5,
  },
  pinnedList: {
    gap: 10,
  },
  mandateItem: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    gap: 6,
  },
  mandateTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  priorityBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
  },
  priorityBadgeText: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 9,
  },
  mandateItemTitle: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 12,
  },
  mandateItemDesc: {
    fontFamily: "HankenGrotesk-Regular",
    fontSize: 11,
  },
  mandateBottom: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 2,
  },
  dueDateText: {
    fontFamily: "JetBrainsMono-Regular",
    fontSize: 10,
  },
  emptyMandatesBox: {
    padding: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
  },
  emptyMandatesText: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 11,
  },
  addMandateBtn: {
    borderTopWidth: 1,
    paddingTop: 12,
    alignItems: "center",
  },
  addMandateBtnText: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 11,
    letterSpacing: 0.8,
  },
  // Health & Workstreams Card
  healthCard: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    gap: 16,
  },
  healthHeader: {
    gap: 12,
  },
  healthTitle: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  healthSubtitle: {
    fontFamily: "HankenGrotesk-Regular",
    fontSize: 11,
    marginTop: 2,
  },
  healthCounters: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 8,
  },
  counterCol: {
    alignItems: "center",
  },
  counterLabel: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 9,
    letterSpacing: 0.6,
  },
  counterVal: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 18,
    marginTop: 2,
  },
  priorityGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  priorityColCard: {
    flexBasis: "48%",
    flexGrow: 1,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    gap: 6,
  },
  priorityColHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  priorityColName: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 10,
  },
  priorityColCount: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 9,
  },
  meterBg: {
    height: 48,
    borderRadius: 4,
    overflow: "hidden",
    justifyContent: "flex-end",
  },
  meterFill: {
    width: "100%",
  },
  meterSubtext: {
    fontFamily: "JetBrainsMono-Regular",
    fontSize: 9,
  },
});
export default styles;
