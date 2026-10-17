// Static layout styles; theme colors are supplied by the screen at render time.
import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: {
    padding: 16,
    gap: 16,
  },
  sectionHeader: {
    paddingBottom: 12,
    borderBottomWidth: 1,
    gap: 8,
  },
  headerTagRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 2,
  },
  headerTagDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  headerTagText: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 9,
    letterSpacing: 0.8,
  },
  monthTitle: {
    fontFamily: "HankenGrotesk-Bold",
    fontSize: 22,
    letterSpacing: -0.5,
  },
  monthSubtitle: {
    fontFamily: "JetBrainsMono-Regular",
    fontSize: 10,
    marginTop: 2,
  },
  actionControlsRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 6,
  },
  todayBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
  },
  todayBtnText: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 10,
  },
  arrowsBox: {
    flexDirection: "row",
    borderRadius: 8,
    borderWidth: 1,
    overflow: "hidden",
  },
  arrowBtn: {
    width: 32,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  scheduleBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 4,
  },
  scheduleBtnText: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 10,
  },
  // Calendar Card
  calendarCard: {
    borderWidth: 1,
    borderRadius: 12,
    overflow: "hidden",
  },
  weekdaysRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    paddingVertical: 8,
  },
  weekdayCell: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  weekdayText: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 9.5,
    letterSpacing: 0.5,
  },
  daysGrid: {
    flexDirection: "column",
  },
  calendarRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
  },
  dayCell: {
    flex: 1,
    height: 64,
    padding: 3,
    justifyContent: "space-between",
  },
  dayCellTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dayNumberCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  dayNumberText: {
    fontFamily: "JetBrainsMono-Medium",
    fontSize: 10,
  },
  taskCountBadge: {
    paddingHorizontal: 3,
    paddingVertical: 1,
    borderRadius: 8,
    borderWidth: 1,
  },
  taskCountText: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 8,
  },
  taskDotsRow: {
    flexDirection: "row",
    gap: 2,
    flexWrap: "wrap",
    marginTop: 2,
  },
  taskMiniDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
  },
  // Selected Agenda Card
  agendaCard: {
    borderWidth: 1,
    borderRadius: 12,
    overflow: "hidden",
  },
  agendaHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 14,
    borderBottomWidth: 1,
  },
  agendaWeekday: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 9,
    letterSpacing: 0.8,
  },
  agendaDateTitle: {
    fontFamily: "HankenGrotesk-Bold",
    fontSize: 15,
  },
  addAgendaTaskBtn: {
    width: 30,
    height: 30,
    borderRadius: 6,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  agendaTasksList: {
    padding: 14,
    gap: 10,
  },
  agendaTaskItem: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    gap: 6,
  },
  agendaTaskMetaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  agendaRefCode: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 9,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
  },
  agendaPriorityPill: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 9999,
    borderWidth: 1,
  },
  agendaPriorityText: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 8,
  },
  agendaTaskTitle: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 12,
  },
  agendaTaskDesc: {
    fontFamily: "HankenGrotesk-Regular",
    fontSize: 11,
  },
  agendaTaskFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    paddingTop: 6,
    marginTop: 2,
  },
  agendaStatusText: {
    fontFamily: "JetBrainsMono-Regular",
    fontSize: 9,
    letterSpacing: 0.5,
  },
  emptyAgendaBox: {
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyAgendaTitle: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 11,
    letterSpacing: 0.8,
  },
  emptyAgendaSub: {
    fontFamily: "HankenGrotesk-Regular",
    fontSize: 11,
    marginTop: 2,
  },
  assignDirectiveBtn: {
    marginTop: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
  },
  assignDirectiveText: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 10,
  },
  // Severity Legend
  legendCard: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    gap: 10,
  },
  legendTitle: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 10,
    letterSpacing: 0.8,
  },
  legendGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  legendItem: {
    flexBasis: "48%",
    flexGrow: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderRadius: 6,
    borderWidth: 1,
    gap: 6,
  },
  legendDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  legendLabel: {
    fontFamily: "JetBrainsMono-Medium",
    fontSize: 10,
  },
  // Operational Metrics
  metricsGrid: {
    gap: 10,
  },
  metricCard: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    gap: 6,
  },
  metricTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  metricTag: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 9,
    letterSpacing: 0.6,
  },
  metricNumber: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 24,
  },
  metricDesc: {
    fontFamily: "HankenGrotesk-Regular",
    fontSize: 11,
  },
  metricBarBg: {
    height: 6,
    borderRadius: 3,
    overflow: "hidden",
    marginTop: 4,
  },
  metricBarFill: {
    height: "100%",
  },
});
export default styles;
