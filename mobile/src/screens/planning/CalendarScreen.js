import {useIsFocused} from '@react-navigation/native';
import useVisibleTasks from '../../hooks/useVisibleTasks';
import React, { useState, useEffect, useMemo } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useAuth } from "../../context/AuthContext";
import { useDataStore } from "../../store/useDataStore";
import { useTheme } from "../../context/ThemeContext";
import AppHeader from "../../components/layout/AppHeader";

const { width } = Dimensions.get("window");

const CalendarScreen = ({ navigation }) => {
  const { user } = useAuth();
  const tasks = useVisibleTasks();
  const focused = useIsFocused();
  const storeWorkspaceId = useDataStore(state => state.workspaceId);
  const loadTasks = useDataStore(state => state.loadTasks);
  const { colors, typography } = useTheme();

  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth()); // 0-11
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    if (user && focused && storeWorkspaceId) loadTasks();
  }, [user, loadTasks, focused, storeWorkspaceId]);

  const safeTasks = Array.isArray(tasks) ? tasks : (Array.isArray(tasks?.data) ? tasks.data : []);

  // Month navigation
  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((prev) => prev - 1);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((prev) => prev + 1);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
  };

  const handleToday = () => {
    const now = new Date();
    setCurrentYear(now.getFullYear());
    setCurrentMonth(now.getMonth());
    setSelectedDate(now);
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const currentMonthName = `${monthNames[currentMonth]} ${currentYear}`;

  const extractDateKey = (dateVal) => {
    if (!dateVal) return "";

    const d = new Date(dateVal);
    if (isNaN(d.getTime())) return "";
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  };

  // Map tasks by date string YYYY-MM-DD
  const tasksByDate = useMemo(() => {
    const map = new Map();
    safeTasks.forEach((task) => {
      const dStr = task.dueDate;
      const key = extractDateKey(dStr);
      if (!key) return;
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(task);
    });
    return map;
  }, [safeTasks]);

  // Generate rows of exactly 7 days for the current month with previous & next month padding
  const calendarRows = useMemo(() => {
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);

    // Monday-based day of week: Mon=0, Tue=1, Wed=2, Thu=3, Fri=4, Sat=5, Sun=6
    const firstDayOfWeek = firstDayOfMonth.getDay() === 0 ? 6 : firstDayOfMonth.getDay() - 1;
    const daysInCurrentMonth = lastDayOfMonth.getDate();
    const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

    const allCells = [];

    // 1. Previous month trailing days
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const dayNum = daysInPrevMonth - i;
      const dateObj = new Date(currentYear, currentMonth - 1, dayNum);
      const dateKey = extractDateKey(dateObj);
      allCells.push({
        dayNumber: dayNum,
        dateObj,
        dateKey,
        isCurrentMonth: false,
        tasks: tasksByDate.get(dateKey) || [],
      });
    }

    // 2. Current month days
    for (let d = 1; d <= daysInCurrentMonth; d++) {
      const dateObj = new Date(currentYear, currentMonth, d);
      const dateKey = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      allCells.push({
        dayNumber: d,
        dateObj,
        dateKey,
        isCurrentMonth: true,
        tasks: tasksByDate.get(dateKey) || [],
      });
    }

    // 3. Next month leading days to complete the week
    const trailingCount = (7 - (allCells.length % 7)) % 7;
    for (let d = 1; d <= trailingCount; d++) {
      const dateObj = new Date(currentYear, currentMonth + 1, d);
      const dateKey = extractDateKey(dateObj);
      allCells.push({
        dayNumber: d,
        dateObj,
        dateKey,
        isCurrentMonth: false,
        tasks: tasksByDate.get(dateKey) || [],
      });
    }

    // 4. Group allCells into rows of 7
    const rows = [];
    for (let i = 0; i < allCells.length; i += 7) {
      rows.push(allCells.slice(i, i + 7));
    }
    return rows;
  }, [currentYear, currentMonth, tasksByDate]);

  const selectedKey = extractDateKey(selectedDate);
  const selectedDayTasks = selectedKey ? (tasksByDate.get(selectedKey) || []) : [];

  const handleSelectCell = (cell) => {
    setSelectedDate(cell.dateObj);
    if (!cell.isCurrentMonth) {
      setCurrentYear(cell.dateObj.getFullYear());
      setCurrentMonth(cell.dateObj.getMonth());
    }
  };

  const getPriorityDot = (priority) => {
    switch (priority) {
      case "urgent":
        return colors.error;
      case "high":
        return colors.primary;
      case "medium":
        return colors.tertiary;
      default:
        return colors.outline;
    }
  };

  const getPriorityLabel = (priority) => {
    switch (priority) {
      case "urgent":
        return "CRITICAL";
      case "high":
        return "HIGH";
      case "medium":
        return "MEDIUM";
      default:
        return "ROUTINE";
    }
  };

  // Metrics
  const totalTasksCount = safeTasks.length;
  const completedCount = safeTasks.filter(
    (t) => t.status === "completed" || t.status === "done"
  ).length;
  const highPriorityCount = safeTasks.filter(
    (t) => t.priority === "urgent" || t.priority === "high"
  ).length;
  const completionRate =
    totalTasksCount > 0
      ? Math.round((completedCount / totalTasksCount) * 100)
      : 0;

  const isTodayDate = (dateObj) => {
    if (!dateObj) return false;
    const now = new Date();
    return (
      dateObj.getFullYear() === now.getFullYear() &&
      dateObj.getMonth() === now.getMonth() &&
      dateObj.getDate() === now.getDate()
    );
  };

  const isSelectedDayDate = (dateObj) => {
    if (!dateObj || !selectedDate) return false;
    return (
      dateObj.getFullYear() === selectedDate.getFullYear() &&
      dateObj.getMonth() === selectedDate.getMonth() &&
      dateObj.getDate() === selectedDate.getDate()
    );
  };

  return (
    <SafeAreaView edges={["top"]} style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <AppHeader title="CALENDAR" navigation={navigation} />

      <FlatList contentContainerStyle={styles.container} showsVerticalScrollIndicator={false} data={selectedDayTasks} keyExtractor={task=>task._id} initialNumToRender={6} maxToRenderPerBatch={6} windowSize={5}
 ListHeaderComponent={<View style={{gap:16}}>
        {/* Section Header matching web CalendarPage.jsx */}
        <View style={[styles.sectionHeader, { borderBottomColor: colors.outlineVariant }]}>
          <View>
            <View style={styles.headerTagRow}>
              <View style={[styles.headerTagDot, { backgroundColor: colors.primary }]} />
              <Text style={[styles.headerTagText, { color: colors.onSurfaceVariant }]}>
                WORKSPACE CALENDAR · SCHEDULE
              </Text>
            </View>
            <Text style={[styles.monthTitle, { color: colors.onSurface }]}>
              {currentMonthName.toUpperCase()}
            </Text>
            <Text style={[styles.monthSubtitle, { color: colors.onSurfaceVariant }]}>
              {safeTasks.length} tasks scheduled in this calendar view.
            </Text>
          </View>

          {/* Month Actions Bar */}
          <View style={styles.actionControlsRow}>
            <TouchableOpacity
              onPress={handleToday}
              style={[
                styles.todayBtn,
                {
                  backgroundColor: colors.surfaceContainerLowest,
                  borderColor: colors.outlineVariant,
                },
              ]}
            >
              <Text style={[styles.todayBtnText, { color: colors.onSurface }]}>TODAY</Text>
            </TouchableOpacity>

            <View
              style={[
                styles.arrowsBox,
                {
                  backgroundColor: colors.surfaceContainerLowest,
                  borderColor: colors.outlineVariant,
                },
              ]}
            >
              <TouchableOpacity
                onPress={handlePrevMonth}
                style={[styles.arrowBtn, { borderRightColor: colors.outlineVariant, borderRightWidth: 1 }]}
              >
                <MaterialIcons name="chevron-left" size={20} color={colors.onSurface} />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleNextMonth} style={styles.arrowBtn}>
                <MaterialIcons name="chevron-right" size={20} color={colors.onSurface} />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() => navigation.navigate("CreateTask",{dueDate:extractDateKey(selectedDate)})}
              style={[styles.scheduleBtn, { backgroundColor: colors.primary }]}
              activeOpacity={0.85}
            >
              <MaterialIcons name="add" size={16} color={colors.onPrimary} />
              <Text style={[styles.scheduleBtnText, { color: colors.onPrimary }]}>
                SCHEDULE
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Calendar Grid Container */}
        <View
          style={[
            styles.calendarCard,
            {
              backgroundColor: colors.surfaceContainerLowest,
              borderColor: colors.outlineVariant,
            },
          ]}
        >
          {/* Weekday Names Header - 7 equal columns */}
          <View
            style={[
              styles.weekdaysRow,
              {
                backgroundColor: colors.surfaceContainerLow,
                borderBottomColor: colors.outlineVariant,
              },
            ]}
          >
            {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((day, idx) => (
              <View
                key={day}
                style={[
                  styles.weekdayCell,
                  idx < 6 && { borderRightWidth: 1, borderRightColor: colors.outlineVariant },
                ]}
              >
                <Text
                  style={[
                    styles.weekdayText,
                    { color: idx >= 5 ? colors.outline : colors.onSurface },
                  ]}
                >
                  {day}
                </Text>
              </View>
            ))}
          </View>

          {/* Days Grid - Row-based, strict 7 columns */}
          <View style={styles.daysGrid}>
            {calendarRows.map((row, rowIdx) => (
              <View
                key={`row-${rowIdx}`}
                style={[
                  styles.calendarRow,
                  { borderBottomColor: colors.outlineVariant },
                  rowIdx === calendarRows.length - 1 && { borderBottomWidth: 0 },
                ]}
              >
                {row.map((cell, colIdx) => {
                  const isCurrentToday = isTodayDate(cell.dateObj);
                  const isSelected = isSelectedDayDate(cell.dateObj);

                  return (
                    <TouchableOpacity
                      key={cell.dateKey}
                      onPress={() => handleSelectCell(cell)}
                      style={[
                        styles.dayCell,
                        colIdx < 6 && { borderRightWidth: 1, borderRightColor: colors.outlineVariant },
                        {
                          backgroundColor: isSelected
                            ? colors.surfaceContainerHigh
                            : cell.isCurrentMonth
                            ? colors.surfaceContainerLowest
                            : colors.surfaceContainerLow + "50",
                        },
                        isSelected && {
                          borderWidth: 1.5,
                          borderColor: colors.primary,
                        },
                      ]}
                      activeOpacity={0.7}
                    >
                      <View style={styles.dayCellTop}>
                        <View
                          style={[
                            styles.dayNumberCircle,
                            isCurrentToday && {
                              backgroundColor: colors.primary,
                            },
                          ]}
                        >
                          <Text
                            style={[
                              styles.dayNumberText,
                              {
                                color: isCurrentToday
                                  ? colors.onPrimary
                                  : isSelected
                                  ? colors.primary
                                  : cell.isCurrentMonth
                                  ? colors.onSurface
                                  : colors.outline,
                                fontWeight: isCurrentToday || isSelected ? "bold" : "500",
                              },
                            ]}
                          >
                            {cell.dayNumber}
                          </Text>
                        </View>

                        {cell.tasks.length > 0 ? (
                          <View
                            style={[
                              styles.taskCountBadge,
                              {
                                backgroundColor: isSelected
                                  ? colors.primaryContainer
                                  : colors.surfaceContainer,
                                borderColor: colors.outlineVariant,
                              },
                            ]}
                          >
                            <Text
                              style={[
                                styles.taskCountText,
                                {
                                  color: isSelected ? colors.primary : colors.onSurfaceVariant,
                                },
                              ]}
                            >
                              {cell.tasks.length}
                            </Text>
                          </View>
                        ) : null}
                      </View>

                      {/* Task Dots */}
                      <View style={styles.taskDotsRow}>
                        {cell.tasks.slice(0, 3).map((t, tIdx) => (
                          <View
                            key={tIdx}
                            style={[
                              styles.taskMiniDot,
                              { backgroundColor: getPriorityDot(t.priority) },
                            ]}
                          />
                        ))}
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            ))}
          </View>
        </View>

        {/* Selected Date Agenda Card */}
        
          <View style={[styles.agendaHeader, { backgroundColor: colors.surfaceContainerLow, borderBottomColor: colors.outlineVariant }]}>
            <View>
              <Text style={[styles.agendaWeekday, { color: colors.onSurfaceVariant }]}>
                {selectedDate.toLocaleDateString("en-US", { weekday: "long" }).toUpperCase()}
              </Text>
              <Text style={[styles.agendaDateTitle, { color: colors.onSurface }]}>
                {selectedDate.toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => navigation.navigate("CreateTask")}
              style={[
                styles.addAgendaTaskBtn,
                {
                  backgroundColor: colors.surfaceContainerLowest,
                  borderColor: colors.outlineVariant,
                },
              ]}
            >
              <MaterialIcons name="add" size={18} color={colors.onSurface} />
            </TouchableOpacity>
          </View>

          {/* Agenda Tasks List */}
          </View>}
 ListEmptyComponent={<View style={styles.emptyAgendaBox}>
                <MaterialIcons name="event-available" size={32} color={colors.outline} style={{ marginBottom: 6 }} />
                <Text style={[styles.emptyAgendaTitle, { color: colors.onSurface }]}>
                  NO TASKS SCHEDULED
                </Text>
                <Text style={[styles.emptyAgendaSub, { color: colors.onSurfaceVariant }]}>
                  No tasks scheduled for this date.
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate("CreateTask")}
                  style={[
                    styles.assignDirectiveBtn,
                    {
                      backgroundColor: colors.surfaceContainer,
                      borderColor: colors.outlineVariant,
                    },
                  ]}
                >
                  <Text style={[styles.assignDirectiveText, { color: colors.primary }]}>
                    + Create Task
                  </Text>
                </TouchableOpacity>
              </View>}
 renderItem={({item:task,index:idx})=>{
                const idStr = String(task._id || task.id || "0000");
                const refCode =
                  idStr.length >= 4 ? idStr.slice(-4).toUpperCase() : idStr.toUpperCase();
                const isDone = task.status === "completed" || task.status === "done";
                const priorityLabel = getPriorityLabel(task.priority);

                return (
                  <View style={styles.agendaTasksList}><TouchableOpacity
                    key={idx}
                    onPress={() =>
                      navigation.navigate("TaskDetail", { task, taskId: task._id || task.id })
                    }
                    style={[
                      styles.agendaTaskItem,
                      {
                        backgroundColor: colors.surfaceContainerLow,
                        borderColor: colors.outlineVariant,
                        opacity: isDone ? 0.6 : 1,
                      },
                    ]}
                    activeOpacity={0.7}
                  >
                    <View style={styles.agendaTaskMetaRow}>
                      <Text style={[styles.agendaRefCode, { color: colors.onSurfaceVariant, backgroundColor: colors.surfaceContainer, borderColor: colors.outlineVariant }]}>
                        #MND-{refCode}
                      </Text>
                      <View
                        style={[
                          styles.agendaPriorityPill,
                          {
                            borderColor: colors.outlineVariant,
                            backgroundColor: colors.surfaceContainer,
                          },
                        ]}
                      >
                        <View
                          style={[
                            styles.taskMiniDot,
                            { backgroundColor: getPriorityDot(task.priority), marginRight: 4 },
                          ]}
                        />
                        <Text style={[styles.agendaPriorityText, { color: colors.onSurfaceVariant }]}>
                          {priorityLabel}
                        </Text>
                      </View>
                    </View>

                    <Text
                      style={[
                        styles.agendaTaskTitle,
                        {
                          color: colors.onSurface,
                          textDecorationLine: isDone ? "line-through" : "none",
                        },
                      ]}
                      numberOfLines={1}
                    >
                      {task.title}
                    </Text>

                    {task.description ? (
                      <Text style={[styles.agendaTaskDesc, { color: colors.onSurfaceVariant }]} numberOfLines={2}>
                        {task.description}
                      </Text>
                    ) : null}

                    <View style={[styles.agendaTaskFooter, { borderTopColor: colors.outlineVariant }]}>
                      <Text style={[styles.agendaStatusText, { color: colors.onSurfaceVariant }]}>
                        {task.status?.toUpperCase() || "PENDING"}
                      </Text>
                      <MaterialIcons name="arrow-forward" size={14} color={colors.onSurfaceVariant} />
                    </View>
                  </TouchableOpacity></View>
                );
              }}
 ListFooterComponent={<View style={{gap:16}}>

        {/* Operational Severity Index Legend */}
        <View
          style={[
            styles.legendCard,
            {
              backgroundColor: colors.surfaceContainerLowest,
              borderColor: colors.outlineVariant,
            },
          ]}
        >
          <Text style={[styles.legendTitle, { color: colors.onSurfaceVariant }]}>
            OPERATIONAL SEVERITY INDEX
          </Text>
          <View style={styles.legendGrid}>
            <View style={[styles.legendItem, { backgroundColor: colors.surfaceContainerLow, borderColor: colors.outlineVariant }]}>
              <View style={[styles.legendDot, { backgroundColor: colors.error }]} />
              <Text style={[styles.legendLabel, { color: colors.onSurface }]}>Critical</Text>
            </View>
            <View style={[styles.legendItem, { backgroundColor: colors.surfaceContainerLow, borderColor: colors.outlineVariant }]}>
              <View style={[styles.legendDot, { backgroundColor: colors.primary }]} />
              <Text style={[styles.legendLabel, { color: colors.onSurface }]}>High</Text>
            </View>
            <View style={[styles.legendItem, { backgroundColor: colors.surfaceContainerLow, borderColor: colors.outlineVariant }]}>
              <View style={[styles.legendDot, { backgroundColor: colors.tertiary }]} />
              <Text style={[styles.legendLabel, { color: colors.onSurface }]}>Medium</Text>
            </View>
            <View style={[styles.legendItem, { backgroundColor: colors.surfaceContainerLow, borderColor: colors.outlineVariant }]}>
              <View style={[styles.legendDot, { backgroundColor: colors.outline }]} />
              <Text style={[styles.legendLabel, { color: colors.onSurface }]}>Completed</Text>
            </View>
          </View>
        </View>

        {/* Operational Metrics Bento */}
        <View style={styles.metricsGrid}>
          {/* Scheduled Volume */}
          <View
            style={[
              styles.metricCard,
              {
                backgroundColor: colors.surfaceContainerLowest,
                borderColor: colors.outlineVariant,
              },
            ]}
          >
            <View style={styles.metricTop}>
              <MaterialIcons name="calendar-month" size={18} color={colors.primary} />
              <Text style={[styles.metricTag, { color: colors.onSurfaceVariant }]}>
                SCHEDULED VOLUME
              </Text>
            </View>
            <Text style={[styles.metricNumber, { color: colors.onSurface }]}>
              {totalTasksCount}
            </Text>
            <Text style={[styles.metricDesc, { color: colors.onSurfaceVariant }]}>
              Total tasks tracked in this timeframe
            </Text>
          </View>

          {/* Resolution Ratio */}
          <View
            style={[
              styles.metricCard,
              {
                backgroundColor: colors.surfaceContainerLowest,
                borderColor: colors.outlineVariant,
              },
            ]}
          >
            <View style={styles.metricTop}>
              <MaterialIcons name="task-alt" size={18} color={colors.tertiary} />
              <Text style={[styles.metricTag, { color: colors.onSurfaceVariant }]}>
                COMPLETION RATE
              </Text>
            </View>
            <Text style={[styles.metricNumber, { color: colors.onSurface }]}>
              {completionRate}%
            </Text>
            <View style={[styles.metricBarBg, { backgroundColor: colors.surfaceContainerHigh }]}>
              <View
                style={[
                  styles.metricBarFill,
                  { backgroundColor: colors.primary, width: `${completionRate}%` },
                ]}
              />
            </View>
          </View>

          {/* Critical Density */}
          <View
            style={[
              styles.metricCard,
              {
                backgroundColor: colors.surfaceContainerLowest,
                borderColor: colors.outlineVariant,
              },
            ]}
          >
            <View style={styles.metricTop}>
              <MaterialIcons name="priority-high" size={18} color={colors.error} />
              <Text style={[styles.metricTag, { color: colors.onSurfaceVariant }]}>
                HIGH PRIORITY
              </Text>
            </View>
            <Text style={[styles.metricNumber, { color: colors.error }]}>
              {highPriorityCount}
            </Text>
            <Text style={[styles.metricDesc, { color: colors.onSurfaceVariant }]}>
              Tasks requiring priority focus
            </Text>
          </View>
        </View>

        <View style={{ height: 32 }} />
      </View>}/>
    </SafeAreaView>
  );
};

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

export default CalendarScreen;
