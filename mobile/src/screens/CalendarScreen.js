import React, { useState, useEffect, useCallback } from "react";
import {
  View, Text, TouchableOpacity, StyleSheet,
  SafeAreaView, ScrollView, ActivityIndicator,
} from "react-native";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { API_URL } from "../config";
import { colors, fonts, spacing, borderRadius } from "../theme";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const CalendarScreen = () => {
  const [todos, setTodos] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const { user } = useAuth();

  const fetchData = useCallback(async () => {
    try {
      const [todosRes, eventsRes] = await Promise.all([
        axios.get(`${API_URL}/api/todos`, { params: { page: 1, limit: 200, isDeleted: "false" } }),
        axios.get(`${API_URL}/api/events`).catch(() => ({ data: [] })),
      ]);
      setTodos(todosRes.data.data);
      setEvents(eventsRes.data || []);
    } catch {
      console.error("Failed to load calendar data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user) fetchData();
  }, [user, fetchData]);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const getItemsForDate = (day) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const dayTodos = todos.filter((t) => {
      if (!t.dueDate) return false;
      return t.dueDate.slice(0, 10) === dateStr;
    });
    const dayEvents = events.filter((e) => {
      if (!e.date) return false;
      return e.date.slice(0, 10) === dateStr;
    });
    return [...dayTodos.map((t) => ({ ...t, type: "task" })), ...dayEvents.map((e) => ({ ...e, type: "event" }))];
  };

  const isToday = (day) => {
    const today = new Date();
    return day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
  };

  const selectedItems = selectedDate ? getItemsForDate(selectedDate) : [];

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </SafeAreaView>
    );
  }

  const calendarCells = [];
  for (let i = 0; i < firstDay; i++) calendarCells.push(null);
  for (let d = 1; d <= daysInMonth; d++) calendarCells.push(d);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerSection}>
          <Text style={styles.heroTitle}>CALENDAR</Text>
          <Text style={styles.heroSubtitle}>YOUR SCHEDULE</Text>
        </View>

        {/* Month Navigation */}
        <View style={styles.monthNav}>
          <TouchableOpacity onPress={prevMonth}>
            <Text style={styles.navArrow}>←</Text>
          </TouchableOpacity>
          <Text style={styles.monthLabel}>
            {MONTHS[month]} {year}
          </Text>
          <TouchableOpacity onPress={nextMonth}>
            <Text style={styles.navArrow}>→</Text>
          </TouchableOpacity>
        </View>

        {/* Day Headers */}
        <View style={styles.dayHeaders}>
          {DAYS.map((d) => (
            <Text key={d} style={styles.dayHeaderText}>{d}</Text>
          ))}
        </View>

        {/* Calendar Grid */}
        <View style={styles.calendarGrid}>
          {calendarCells.map((day, idx) => {
            if (day === null) {
              return <View key={`empty-${idx}`} style={styles.dayCell} />;
            }
            const items = getItemsForDate(day);
            const hasItems = items.length > 0;
            const today = isToday(day);
            const selected = selectedDate === day;

            return (
              <TouchableOpacity
                key={day}
                style={[
                  styles.dayCell,
                  today && styles.dayCellToday,
                  selected && styles.dayCellSelected,
                ]}
                onPress={() => setSelectedDate(day === selectedDate ? null : day)}
              >
                <Text
                  style={[
                    styles.dayNumber,
                    today && styles.dayNumberToday,
                    selected && styles.dayNumberSelected,
                  ]}
                >
                  {day}
                </Text>
                {hasItems && (
                  <View style={[styles.itemDot, selected && { backgroundColor: colors.white }]} />
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Selected Day Items */}
        {selectedDate && (
          <View style={styles.selectedSection}>
            <Text style={styles.selectedTitle}>
              {MONTHS[month]} {selectedDate}
            </Text>
            {selectedItems.length === 0 ? (
              <Text style={styles.noItemsText}>No items scheduled</Text>
            ) : (
              selectedItems.map((item, idx) => (
                <View key={idx} style={styles.itemCard}>
                  <View style={[styles.itemTypeBadge, { backgroundColor: item.type === "event" ? "#6366F1" : colors.primary }]}>
                    <Text style={styles.itemTypeText}>
                      {item.type === "event" ? "EVENT" : "TASK"}
                    </Text>
                  </View>
                  <Text style={styles.itemTitle}>{item.title}</Text>
                </View>
              ))
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  scrollContent: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xxl },
  headerSection: { marginTop: spacing.lg, marginBottom: spacing.lg },
  heroTitle: { fontSize: 48, fontWeight: "900", color: colors.primary, letterSpacing: -2 },
  heroSubtitle: { ...fonts.tiny, marginTop: spacing.xs },
  monthNav: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.lg,
  },
  navArrow: { fontSize: 20, fontWeight: "700", color: colors.primary, padding: spacing.sm },
  monthLabel: { fontSize: 16, fontWeight: "700", color: colors.primary, letterSpacing: -0.5 },
  dayHeaders: { flexDirection: "row", marginBottom: spacing.sm },
  dayHeaderText: {
    flex: 1,
    textAlign: "center",
    ...fonts.tiny,
    fontSize: 9,
  },
  calendarGrid: { flexDirection: "row", flexWrap: "wrap" },
  dayCell: {
    width: `${100 / 7}%`,
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: borderRadius.sm,
  },
  dayCellToday: { backgroundColor: colors.background },
  dayCellSelected: { backgroundColor: colors.primary },
  dayNumber: { fontSize: 14, fontWeight: "600", color: colors.textPrimary },
  dayNumberToday: { fontWeight: "800" },
  dayNumberSelected: { color: colors.white },
  itemDot: { width: 4, height: 4, borderRadius: 2, backgroundColor: colors.primary, marginTop: 2 },
  selectedSection: { marginTop: spacing.xl },
  selectedTitle: { ...fonts.sectionHeading, marginBottom: spacing.md },
  noItemsText: { ...fonts.small, fontWeight: "600" },
  itemCard: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: borderRadius.sm,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  itemTypeBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.full,
    marginBottom: spacing.xs,
  },
  itemTypeText: { color: colors.white, fontSize: 8, fontWeight: "700", letterSpacing: 1 },
  itemTitle: { fontSize: 14, fontWeight: "600", color: colors.textPrimary },
});

export default CalendarScreen;
