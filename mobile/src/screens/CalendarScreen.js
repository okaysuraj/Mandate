import React, { useState } from "react";
import {
  View, Text, TouchableOpacity, StyleSheet,
  SafeAreaView, ScrollView
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";

const CalendarScreen = ({ navigation }) => {
  const [selectedDay, setSelectedDay] = useState(2);
  const currentMonth = "OCTOBER 2024";
  const { colors, typography, spacing, borderRadius } = useTheme();

  // Simplified calendar generation
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const events = {
    1: [{ label: "SYS_CHECK_04", type: "default" }],
    2: [{ label: "CALIBRATION_X", type: "primary" }, { label: "MECH_VAL", type: "default" }],
    4: [{ label: "LOG_AUDIT", type: "outline" }],
    11: [{ label: "MAINT_WINDOW", type: "error" }],
  };

  const getEventStyle = (type) => {
    switch (type) {
      case "primary": return { bg: colors.primary, text: colors.onPrimary };
      case "error": return { bg: colors.errorContainer, text: colors.onErrorContainer };
      case "outline": return { bg: colors.surface, text: colors.secondary, border: colors.outlineVariant };
      default: return { bg: colors.surfaceContainerHigh, text: colors.secondary };
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.surface }]}>
      {/* TopAppBar */}
      <View style={[styles.header, { borderBottomColor: colors.outlineVariant, backgroundColor: colors.surface }]}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>
        <Text style={[typography.headlineLgMobile, { color: colors.primary }]}>CALENDAR</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity>
            <MaterialIcons name="more-vert" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Month Header */}
        <View style={styles.monthHeader}>
          <View>
            <Text style={[typography.headlineLgMobile, { color: colors.primary }]}>{currentMonth}</Text>
            <Text style={[typography.labelCaps, { color: colors.secondary }]}>PROTOCOL SCHEDULE: PHASE 04</Text>
          </View>
          <View style={styles.monthActions}>
            <TouchableOpacity style={[styles.iconButton, { borderColor: colors.outlineVariant }]}>
              <MaterialIcons name="chevron-left" size={20} color={colors.primary} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.iconButton, { borderColor: colors.outlineVariant }]}>
              <MaterialIcons name="chevron-right" size={20} color={colors.primary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Calendar Grid (Simplified for mobile vertical scrolling list view alternative or actual grid) */}
        {/* Realistically, rendering a 7-column grid in RN looks like this: */}
        <View style={[styles.calendarGrid, { borderColor: colors.outlineVariant, backgroundColor: colors.outlineVariant }]}>
          {/* Day Headers */}
          <View style={[styles.weekRow, { backgroundColor: colors.surface }]}>
            {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => (
              <View key={i} style={styles.dayHeaderCell}>
                <Text style={[typography.labelCaps, { color: colors.secondary }]}>{day}</Text>
              </View>
            ))}
          </View>
          
          <View style={styles.daysWrapper}>
            {/* Filler for 1st of month (assuming starts on Tuesday for visual sake) */}
            <View style={[styles.dayCell, { backgroundColor: colors.surfaceContainerLow }]} />
            
            {days.map((day) => {
              const isSelected = selectedDay === day;
              const dayEvents = events[day];
              
              return (
                <TouchableOpacity
                  key={day}
                  style={[
                    styles.dayCell,
                    { backgroundColor: colors.surfaceContainerLowest },
                    isSelected && { borderWidth: 2, borderColor: colors.primary }
                  ]}
                  onPress={() => setSelectedDay(day)}
                >
                  <View style={styles.dayNumberRow}>
                    <Text style={[typography.labelSm, { color: isSelected ? colors.primary : colors.secondary, fontWeight: isSelected ? '700' : '500' }]}>
                      {String(day).padStart(2, '0')}
                    </Text>
                  </View>
                  {dayEvents && (
                    <View style={styles.eventDots}>
                      {dayEvents.map((e, i) => {
                        const style = getEventStyle(e.type);
                        return <View key={i} style={[styles.dot, { backgroundColor: style.bg }]} />;
                      })}
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Selected Day Details */}
        <View style={[styles.detailsSection, { borderTopColor: colors.outlineVariant }]}>
          <Text style={[typography.headlineLgMobile, { color: colors.primary, marginBottom: 4 }]}>
            {new Date(2024, 9, selectedDay).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: '2-digit' }).toUpperCase()}
          </Text>
          <Text style={[typography.labelCaps, { color: colors.secondary, marginBottom: spacing.lg }]}>
            INDUSTRIAL LIFECYCLE: ACTIVE
          </Text>

          <View style={styles.scheduleList}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <View style={[styles.activeDot, { backgroundColor: colors.primary }]} />
              <Text style={[typography.labelCaps, { color: colors.secondary }]}>SCHEDULED OPERATIONS</Text>
            </View>

            {events[selectedDay] ? (
              events[selectedDay].map((evt, i) => {
                const style = getEventStyle(evt.type);
                return (
                  <View key={i} style={[styles.eventCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant, borderRadius: borderRadius.sm }]}>
                    <View style={styles.eventCardHeader}>
                      <Text style={[typography.labelCaps, { color: colors.secondary, fontSize: 10 }]}>08:00 — 10:30</Text>
                      <View style={[styles.eventBadge, { backgroundColor: style.bg, borderWidth: style.border ? 1 : 0, borderColor: style.border }]}>
                        <Text style={[typography.labelCaps, { color: style.text, fontSize: 9 }]}>PROTOCOL</Text>
                      </View>
                    </View>
                    <Text style={[typography.bodyMd, { color: colors.primary, fontWeight: '700' }]}>{evt.label}</Text>
                    <Text style={[typography.labelSm, { color: colors.secondary, marginTop: 4 }]}>Standard alignment and verification procedure.</Text>
                  </View>
                );
              })
            ) : (
              <Text style={[typography.labelSm, { color: colors.secondary }]}>No operations scheduled.</Text>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  headerLeft: {
    flex: 1,
    alignItems: 'flex-start',
  },
  headerRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  monthHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    padding: 16,
    marginTop: 8,
  },
  monthActions: {
    flexDirection: 'row',
    gap: 8,
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarGrid: {
    margin: 16,
    borderWidth: 1,
    borderBottomWidth: 0,
    borderRightWidth: 0,
  },
  weekRow: {
    flexDirection: 'row',
  },
  dayHeaderCell: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'transparent', // The background color of the grid container acts as border
  },
  daysWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: '14.28%', // 100/7
    aspectRatio: 1,
    padding: 4,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'transparent',
  },
  dayNumberRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  eventDots: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 2,
    marginTop: 4,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  detailsSection: {
    padding: 16,
    borderTopWidth: 1,
    marginTop: 8,
  },
  scheduleList: {
    marginTop: 8,
  },
  activeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  eventCard: {
    padding: 16,
    borderWidth: 1,
    marginBottom: 12,
  },
  eventCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  eventBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  }
});

export default CalendarScreen;
