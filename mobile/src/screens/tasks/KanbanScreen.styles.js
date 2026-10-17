// Static layout styles; theme colors are supplied by the screen at render time.
import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  boardHeader: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    gap: 10,
  },
  boardHeaderTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  pipelineTagRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 2,
  },
  pipelineDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  pipelineTagText: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 9,
    letterSpacing: 0.8,
  },
  boardTitle: {
    fontFamily: "HankenGrotesk-Bold",
    fontSize: 22,
    letterSpacing: -0.5,
    textTransform: "uppercase",
  },
  newMandateBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 8,
    gap: 4,
  },
  newMandateBtnText: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 11,
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 38,
  },
  searchInput: {
    flex: 1,
    fontFamily: "HankenGrotesk-Regular",
    fontSize: 12,
  },
  columnTabsRow: {
    paddingVertical: 8,
    borderBottomWidth: 1,
  },
  tabsScrollContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  tabChip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 9999,
    borderWidth: 1,
  },
  tabChipText: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 10,
    letterSpacing: 0.5,
  },
  columnsPager: {
    flex: 1,
  },
  columnScrollContent: {
    padding: 16,
    paddingBottom: 48,
    gap: 12,
  },
  taskCard: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    gap: 8,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  refCodeText: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 9,
    letterSpacing: 0.8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
  },
  priorityBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 9999,
    borderWidth: 1,
    gap: 4,
  },
  priorityDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
  },
  priorityText: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 9,
  },
  cardTitle: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 13,
    lineHeight: 18,
  },
  cardDescription: {
    fontFamily: "HankenGrotesk-Regular",
    fontSize: 11,
    lineHeight: 16,
  },
  tagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
  },
  tagPill: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
  },
  tagText: {
    fontFamily: "JetBrainsMono-Regular",
    fontSize: 9,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    paddingTop: 8,
  },
  metaLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  metaText: {
    fontFamily: "JetBrainsMono-Regular",
    fontSize: 10,
  },
  activePill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  activeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  activePillText: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 9,
  },
  statusActionsRow: {
    flexDirection: "row",
    gap: 6,
    paddingTop: 8,
    borderTopWidth: 1,
    flexWrap: "wrap",
  },
  transitionBtn: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  transitionBtnText: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 9,
    letterSpacing: 0.5,
  },
  emptyColumnBox: {
    padding: 32,
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 24,
  },
  emptyColumnTitle: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 11,
    textTransform: "uppercase",
  },
  emptyAssignBtn: {
    marginTop: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
  },
  emptyAssignText: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 10,
  },
});
export default styles;
