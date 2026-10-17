import { CalendarMonthView } from "./CalendarMonthView";
import { CalendarTaskCard, CalendarSummary } from "./CalendarAgenda";
import styles from "./CalendarScreen.styles";
import { useIsFocused } from "@react-navigation/native";
import useVisibleTasks from "../../hooks/useVisibleTasks";
import { useState, useEffect, useMemo } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useAuth } from "../../context/AuthContext";
import { useDataStore } from "../../store/useDataStore";
import { useTheme } from "../../context/ThemeContext";
import AppHeader from "../../components/layout/AppHeader";

const CalendarScreen = ({ navigation }) => {
  const { user } = useAuth();
  const tasks = useVisibleTasks();
  const focused = useIsFocused();
  const storeWorkspaceId = useDataStore((state) => state.workspaceId);
  const loadTasks = useDataStore((state) => state.loadTasks);
  const { colors } = useTheme();

  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth()); // 0-11
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    if (user && focused && storeWorkspaceId) loadTasks();
  }, [user, loadTasks, focused, storeWorkspaceId]);

  const safeTasks = useMemo(
    () =>
      Array.isArray(tasks)
        ? tasks
        : Array.isArray(tasks?.data)
          ? tasks.data
          : [],
    [tasks],
  );

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
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
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
    const firstDayOfWeek =
      firstDayOfMonth.getDay() === 0 ? 6 : firstDayOfMonth.getDay() - 1;
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
  const selectedDayTasks = selectedKey
    ? tasksByDate.get(selectedKey) || []
    : [];

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
    (t) => t.status === "completed" || t.status === "done",
  ).length;
  const highPriorityCount = safeTasks.filter(
    (t) => t.priority === "urgent" || t.priority === "high",
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
    <SafeAreaView
      edges={["top"]}
      style={[styles.safeArea, { backgroundColor: colors.background }]}
    >
      <AppHeader title="CALENDAR" navigation={navigation} />

      <FlatList
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        data={selectedDayTasks}
        keyExtractor={(task) => task._id}
        initialNumToRender={6}
        maxToRenderPerBatch={6}
        windowSize={5}
        ListHeaderComponent={
          <View style={{ gap: 16 }}>
            {/* Section Header matching web CalendarPage.jsx */}
            <CalendarMonthView
              currentMonthName={currentMonthName}
              safeTasks={safeTasks}
              handleToday={handleToday}
              handlePrevMonth={handlePrevMonth}
              handleNextMonth={handleNextMonth}
              navigation={navigation}
              extractDateKey={extractDateKey}
              selectedDate={selectedDate}
              calendarRows={calendarRows}
              isTodayDate={isTodayDate}
              isSelectedDayDate={isSelectedDayDate}
              handleSelectCell={handleSelectCell}
              getPriorityDot={getPriorityDot}
            />

            {/* Calendar Grid Container */}

            {/* Selected Date Agenda Card */}

            <View
              style={[
                styles.agendaHeader,
                {
                  backgroundColor: colors.surfaceContainerLow,
                  borderBottomColor: colors.outlineVariant,
                },
              ]}
            >
              <View>
                <Text
                  style={[
                    styles.agendaWeekday,
                    { color: colors.onSurfaceVariant },
                  ]}
                >
                  {selectedDate
                    .toLocaleDateString("en-US", { weekday: "long" })
                    .toUpperCase()}
                </Text>
                <Text
                  style={[styles.agendaDateTitle, { color: colors.onSurface }]}
                >
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
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyAgendaBox}>
            <MaterialIcons
              name="event-available"
              size={32}
              color={colors.outline}
              style={{ marginBottom: 6 }}
            />
            <Text
              style={[styles.emptyAgendaTitle, { color: colors.onSurface }]}
            >
              NO TASKS SCHEDULED
            </Text>
            <Text
              style={[
                styles.emptyAgendaSub,
                { color: colors.onSurfaceVariant },
              ]}
            >
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
              <Text
                style={[styles.assignDirectiveText, { color: colors.primary }]}
              >
                + Create Task
              </Text>
            </TouchableOpacity>
          </View>
        }
        renderItem={({ item: task, index: idx }) => (
          <CalendarTaskCard
            task={task}
            getPriorityLabel={getPriorityLabel}
            idx={idx}
            navigation={navigation}
            getPriorityDot={getPriorityDot}
          />
        )}
        ListFooterComponent={
          <CalendarSummary
            totalTasksCount={totalTasksCount}
            completionRate={completionRate}
            highPriorityCount={highPriorityCount}
          />
        }
      />
    </SafeAreaView>
  );
};

export default CalendarScreen;
