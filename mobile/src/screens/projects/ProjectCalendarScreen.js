import React, { useState, useEffect, useMemo, useCallback } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";
import api from "../../services/api";

const ProjectCalendarScreen = ({ navigation }) => {
  const { colors, typography } = useTheme();
  
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date().getDate());
  const [eventsList, setEventsList] = useState([]);
  const [tasksList, setTasksList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCalendarData = useCallback(async () => {
    setLoading(true);
    try {
      const [eventsRes, tasksRes] = await Promise.allSettled([
        api.get('/events'),
        api.get('/tasks')
      ]);

      if (eventsRes.status === 'fulfilled' && Array.isArray(eventsRes.value?.data)) {
        setEventsList(eventsRes.value.data);
      }
      if (tasksRes.status === 'fulfilled' && Array.isArray(tasksRes.value?.data)) {
        setTasksList(tasksRes.value.data);
      }
    } catch (err) {
      console.warn('Failed to fetch calendar data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCalendarData();
  }, [fetchCalendarData]);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth(); // 0-indexed

  const monthName = currentDate.toLocaleString('default', { month: 'long' });

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
    setSelectedDate(1);
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
    setSelectedDate(1);
  };

  // Days in current month
  const totalDaysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = (new Date(year, month, 1).getDay() + 6) % 7; // Monday = 0

  const daysInMonth = Array.from({ length: totalDaysInMonth }, (_, i) => i + 1);
  const prevMonthTotalDays = new Date(year, month, 0).getDate();
  const prevMonthDays = Array.from(
    { length: firstDayOfWeek }, 
    (_, i) => prevMonthTotalDays - firstDayOfWeek + i + 1
  );

  // Group events and tasks by day of current month
  const dayItemsMap = useMemo(() => {
    const map = {};
    
    eventsList.forEach((ev) => {
      const d = new Date(ev.startTime || ev.createdAt);
      if (d.getFullYear() === year && d.getMonth() === month) {
        const dayNum = d.getDate();
        if (!map[dayNum]) map[dayNum] = [];
        map[dayNum].push({
          id: ev._id,
          title: ev.title,
          description: ev.description,
          type: 'event',
          time: d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          color: colors.primary
        });
      }
    });

    tasksList.forEach((tk) => {
      if (tk.dueDate) {
        const d = new Date(tk.dueDate);
        if (d.getFullYear() === year && d.getMonth() === month) {
          const dayNum = d.getDate();
          if (!map[dayNum]) map[dayNum] = [];
          map[dayNum].push({
            id: tk._id,
            title: tk.title,
            description: `Priority: ${tk.priority?.toUpperCase()} • Status: ${tk.status?.toUpperCase()}`,
            type: tk.priority === 'urgent' ? 'critical' : 'task',
            time: 'Due',
            color: tk.priority === 'urgent' ? colors.error : colors.tertiaryFixedDim
          });
        }
      }
    });

    return map;
  }, [eventsList, tasksList, year, month, colors]);

  const activeDayItems = dayItemsMap[selectedDate] || [];

  const renderDate = (day, isCurrentMonth = true) => {
    const isSelected = day === selectedDate && isCurrentMonth;
    const items = isCurrentMonth ? dayItemsMap[day] || [] : [];
    
    return (
      <TouchableOpacity 
        key={isCurrentMonth ? `curr-${day}` : `prev-${day}`}
        style={[
          styles.dateCell,
          isSelected && { backgroundColor: colors.primary, borderRadius: 6, transform: [{ scale: 0.95 }] }
        ]}
        onPress={() => isCurrentMonth && setSelectedDate(day)}
        disabled={!isCurrentMonth}
      >
        <Text style={[
          typography.labelSm,
          { 
            color: isSelected 
              ? colors.onPrimary 
              : isCurrentMonth ? colors.onSurface : colors.outlineVariant 
          },
          !isCurrentMonth && { opacity: 0.4 }
        ]}>
          {day}
        </Text>
        
        {items.length > 0 && !isSelected && (
          <View style={styles.dotsContainer}>
            {items.slice(0, 3).map((item, index) => (
              <View 
                key={index} 
                style={[styles.eventDot, { backgroundColor: item.color }]} 
              />
            ))}
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* TopAppBar */}
      <View style={[styles.header, { borderBottomColor: colors.outlineVariant, backgroundColor: colors.surface }]}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={24} color={colors.primary} />
          </TouchableOpacity>
          <Text style={[typography.headlineLgMobile, { color: colors.primary, fontWeight: '900', letterSpacing: -1, marginLeft: 8 }]}>
            SCHEDULE
          </Text>
        </View>
        <TouchableOpacity 
          style={styles.iconButton}
          onPress={() => navigation.navigate('GlobalSearch')}
        >
          <MaterialIcons name="search" size={24} color={colors.secondary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Monthly Navigation Header */}
        <View style={styles.monthHeader}>
          <View>
            <Text style={[typography.labelCaps, { color: colors.secondary }]}>CALENDAR TIMELINE</Text>
            <Text style={[typography.headlineLgMobile, { color: colors.primary }]}>{monthName} {year}</Text>
          </View>
          <View style={styles.navArrows}>
            <TouchableOpacity 
              style={[styles.arrowBtn, { borderColor: colors.outlineVariant, backgroundColor: colors.surfaceContainerLowest }]}
              onPress={prevMonth}
            >
              <MaterialIcons name="chevron-left" size={24} color={colors.primary} />
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.arrowBtn, { borderColor: colors.outlineVariant, backgroundColor: colors.surfaceContainerLowest }]}
              onPress={nextMonth}
            >
              <MaterialIcons name="chevron-right" size={24} color={colors.primary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Bento Calendar Grid */}
        <View style={[styles.calendarBento, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
          <View style={styles.daysHeader}>
            {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map(day => (
              <Text key={day} style={[typography.labelCaps, { color: colors.secondary, fontSize: 10, width: `${100/7}%`, textAlign: 'center' }]}>
                {day}
              </Text>
            ))}
          </View>
          
          <View style={styles.datesGrid}>
            {prevMonthDays.map(day => renderDate(day, false))}
            {daysInMonth.map(day => renderDate(day, true))}
          </View>

          {/* Legend */}
          <View style={[styles.legend, { borderTopColor: colors.outlineVariant }]}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: colors.primary }]} />
              <Text style={[typography.labelCaps, { color: colors.secondary, fontSize: 9 }]}>EVENT</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: colors.tertiaryFixedDim }]} />
              <Text style={[typography.labelCaps, { color: colors.secondary, fontSize: 9 }]}>TASK DEADLINE</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: colors.error }]} />
              <Text style={[typography.labelCaps, { color: colors.secondary, fontSize: 9 }]}>CRITICAL</Text>
            </View>
          </View>
        </View>

        {/* Scheduled Tasks Section */}
        <View style={styles.protocolsSection}>
          <View style={styles.protocolsHeader}>
            <Text style={[typography.labelCaps, { color: colors.secondary }]}>SCHEDULED TASKS</Text>
            <Text style={[typography.labelSm, { color: colors.primary }]}>
              DAY {selectedDate}
            </Text>
          </View>

          {loading ? (
            <ActivityIndicator size="small" color={colors.primary} style={{ marginVertical: 24 }} />
          ) : activeDayItems.length === 0 ? (
            <View style={[styles.emptyBox, { borderColor: colors.outlineVariant, backgroundColor: colors.surfaceContainerLowest }]}>
              <MaterialIcons name="event-available" size={32} color={colors.secondary} />
              <Text style={[typography.bodyMd, { color: colors.secondary, marginTop: 8, textAlign: 'center' }]}>
                No scheduled events or task deadlines on this date.
              </Text>
            </View>
          ) : (
            activeDayItems.map((item) => (
              <TouchableOpacity 
                key={item.id}
                style={[styles.protocolItem, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]} 
                activeOpacity={0.8}
                onPress={() => {
                  if (item.type !== 'event') {
                    navigation.navigate('TaskDetail', { taskId: item.id });
                  }
                }}
              >
                <View style={[styles.dateBadge, { backgroundColor: colors.surfaceContainerLow, borderColor: colors.outlineVariant }]}>
                  <Text style={[typography.labelCaps, { color: colors.secondary, fontSize: 10 }]}>
                    {monthName.substring(0, 3).toUpperCase()}
                  </Text>
                  <Text style={[typography.headlineLgMobile, { color: colors.primary, fontWeight: '700', lineHeight: 24 }]}>
                    {selectedDate}
                  </Text>
                </View>
                <View style={styles.protocolContent}>
                  <View style={styles.protocolTitleRow}>
                    <Text style={[typography.bodyMd, { color: colors.primary, fontWeight: '700', flex: 1 }]} numberOfLines={1}>
                      {item.title}
                    </Text>
                    <View style={[styles.tagBadge, { backgroundColor: item.color + '25' }]}>
                      <Text style={[typography.labelCaps, { color: item.color, fontSize: 9 }]}>
                        {item.type.toUpperCase()}
                      </Text>
                    </View>
                  </View>
                  {item.description ? (
                    <Text style={[typography.bodyMd, { color: colors.secondary, fontSize: 13, marginTop: 4 }]} numberOfLines={2}>
                      {item.description}
                    </Text>
                  ) : null}
                  <View style={styles.protocolFooter}>
                    <Text style={[typography.labelSm, { color: colors.secondary, fontSize: 11 }]}>
                      {item.time}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 64,
    borderBottomWidth: 1,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: 8,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 64,
  },
  monthHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  navArrows: {
    flexDirection: 'row',
    gap: 8,
  },
  arrowBtn: {
    width: 40,
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  calendarBento: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  daysHeader: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  datesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dateCell: {
    width: `${100 / 7}%`,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 2,
    position: 'relative',
  },
  dotsContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 4,
    gap: 3,
  },
  eventDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    borderTopWidth: 1,
    paddingTop: 12,
    marginTop: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  protocolsSection: {
    gap: 12,
  },
  protocolsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  protocolItem: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  dateBadge: {
    width: 48,
    height: 52,
    borderWidth: 1,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  protocolContent: {
    flex: 1,
  },
  protocolTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tagBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  protocolFooter: {
    marginTop: 6,
  },
  emptyBox: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ProjectCalendarScreen;
