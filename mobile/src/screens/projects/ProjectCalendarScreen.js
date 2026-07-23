import React, { useState } from "react";
import { 
  View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image 
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";

const ProjectCalendarScreen = ({ navigation }) => {
  const { colors, typography } = useTheme();
  
  const [selectedDate, setSelectedDate] = useState(16);

  // Mock days for October 2024 (starts on Tuesday)
  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);
  const prevMonthDays = [30]; // Just showing one tail day (Monday Sept 30)
  
  // Event dots config mapping day number to array of event types
  const events = {
    4: ['deployment'],
    9: ['deployment', 'audit'],
    18: ['critical'],
    25: ['deployment']
  };

  const renderDate = (day, isCurrentMonth = true) => {
    const isSelected = day === selectedDate && isCurrentMonth;
    const dayEvents = events[day] || [];
    
    return (
      <TouchableOpacity 
        key={isCurrentMonth ? `curr-${day}` : `prev-${day}`}
        style={[
          styles.dateCell,
          isSelected && { backgroundColor: colors.primary, borderRadius: 6, transform: [{ scale: 0.9 }] }
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
          !isCurrentMonth && { opacity: 0.5 }
        ]}>
          {day}
        </Text>
        
        {/* Event Dots */}
        {dayEvents.length > 0 && !isSelected && (
          <View style={styles.dotsContainer}>
            {dayEvents.map((type, index) => {
              let dotColor = colors.primary;
              if (type === 'audit') dotColor = colors.tertiaryFixedDim;
              if (type === 'critical') dotColor = colors.error;
              return (
                <View key={index} style={[styles.eventDot, { backgroundColor: dotColor }]} />
              );
            })}
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* TopAppBar */}
      <View style={[styles.header, { borderBottomColor: colors.outlineVariant }]}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
            <MaterialIcons name="grid-view" size={24} color={colors.primary} />
          </TouchableOpacity>
          <Text style={[typography.headlineLgMobile, { color: colors.primary, fontWeight: '900', letterSpacing: -1, marginLeft: 8 }]}>
            PROMETHEUS
          </Text>
        </View>
        <View style={[styles.avatar, { borderColor: colors.outlineVariant, backgroundColor: colors.surfaceContainerHigh }]}>
          <Image 
            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD67fokGL-A3AjxCV_65q38VdBYYj_9gNFaQlJ8AsiVhl49xqIiHWtklhIZZYqBdYErrokIwXAzIi3qa98uWONmbfkWxzlg3F0qb7KRzGFeTbXCilpjb3q4lYvzK4uFXYyrEwOU3pwvusMpubPIno8mXkKm7rW2RiNdT9lGP-hcun_aajVDWJvgaY5aT0Jznqn6tuMy0t4PCMcVjYqE8HawJ_Ks5ZGixaONCmypzQME2m7j9Ilq1clq5g' }}
            style={{ width: '100%', height: '100%' }}
          />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Monthly Navigation Header */}
        <View style={styles.monthHeader}>
          <View>
            <Text style={[typography.labelCaps, { color: colors.onSecondaryContainer }]}>PROJECT CALENDAR</Text>
            <Text style={[typography.headlineLgMobile, { color: colors.primary }]}>October 2024</Text>
          </View>
          <View style={styles.navArrows}>
            <TouchableOpacity style={[styles.arrowBtn, { borderColor: colors.outlineVariant }]}>
              <MaterialIcons name="chevron-left" size={24} color={colors.primary} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.arrowBtn, { borderColor: colors.outlineVariant }]}>
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
            {/* Fill empty spots to maintain grid if needed, CSS Grid handles this automatically in HTML but Flex wrap needs careful sizing */}
          </View>

          {/* Legend */}
          <View style={[styles.legend, { borderTopColor: colors.outlineVariant }]}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: colors.primary }]} />
              <Text style={[typography.labelCaps, { color: colors.secondary, fontSize: 9 }]}>DEPLOYMENT</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: colors.tertiaryFixedDim }]} />
              <Text style={[typography.labelCaps, { color: colors.secondary, fontSize: 9 }]}>SITE AUDIT</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: colors.error }]} />
              <Text style={[typography.labelCaps, { color: colors.secondary, fontSize: 9 }]}>CRITICAL</Text>
            </View>
          </View>
        </View>

        {/* Scheduled Protocols Section */}
        <View style={styles.protocolsSection}>
          <View style={styles.protocolsHeader}>
            <Text style={[typography.labelCaps, { color: colors.onSecondaryContainer }]}>SCHEDULED PROTOCOLS</Text>
            <Text style={[typography.labelSm, { color: colors.primary }]}>TODAY</Text>
          </View>

          {/* Protocol Item 1 */}
          <TouchableOpacity style={[styles.protocolItem, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]} activeOpacity={0.9}>
            <View style={[styles.dateBadge, { backgroundColor: colors.surfaceContainerLow, borderColor: colors.outlineVariant }]}>
              <Text style={[typography.labelCaps, { color: colors.secondary, fontSize: 10 }]}>OCT</Text>
              <Text style={[typography.headlineLgMobile, { color: colors.primary, fontWeight: '700', lineHeight: 24 }]}>16</Text>
            </View>
            <View style={styles.protocolContent}>
              <View style={styles.protocolTitleRow}>
                <Text style={[typography.bodyMd, { color: colors.primary, fontWeight: '700', flex: 1 }]}>Global Deployment Phase 2</Text>
                <View style={[styles.tagBadge, { backgroundColor: colors.primaryContainer }]}>
                  <Text style={[typography.labelCaps, { color: colors.onPrimaryContainer, fontSize: 9 }]}>CRITICAL</Text>
                </View>
              </View>
              <Text style={[typography.bodyMd, { color: colors.secondary, fontSize: 14, marginTop: 4 }]}>
                Infrastructure handover for South-East regions. Validation required by 18:00 UTC.
              </Text>
              <View style={styles.protocolFooter}>
                <View style={styles.avatarsRow}>
                  <View style={[styles.miniAvatar, { backgroundColor: colors.surfaceDim, borderColor: colors.surfaceContainerLowest, zIndex: 2 }]} />
                  <View style={[styles.miniAvatar, { backgroundColor: colors.surfaceDim, borderColor: colors.surfaceContainerLowest, marginLeft: -8, zIndex: 1 }]} />
                </View>
                <Text style={[typography.labelSm, { color: colors.onSecondaryContainer, fontSize: 11, marginLeft: 8 }]}>+3 assigned</Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* Protocol Item 2 */}
          <TouchableOpacity style={[styles.protocolItem, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]} activeOpacity={0.9}>
            <View style={[styles.dateBadge, { backgroundColor: colors.surfaceContainerLow, borderColor: colors.outlineVariant }]}>
              <Text style={[typography.labelCaps, { color: colors.secondary, fontSize: 10 }]}>OCT</Text>
              <Text style={[typography.headlineLgMobile, { color: colors.primary, fontWeight: '700', lineHeight: 24 }]}>18</Text>
            </View>
            <View style={styles.protocolContent}>
              <View style={styles.protocolTitleRow}>
                <Text style={[typography.bodyMd, { color: colors.primary, fontWeight: '700', flex: 1 }]}>Site Audit: Node 7A</Text>
                <View style={[styles.tagBadge, { backgroundColor: colors.tertiaryContainer }]}>
                  <Text style={[typography.labelCaps, { color: colors.onTertiaryContainer, fontSize: 9 }]}>AUDIT</Text>
                </View>
              </View>
              <Text style={[typography.bodyMd, { color: colors.secondary, fontSize: 14, marginTop: 4 }]}>
                On-site structural validation and hardware stress test protocols.
              </Text>
              <View style={[styles.protocolFooter, { justifyContent: 'space-between', width: '100%' }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <MaterialIcons name="location-on" size={16} color={colors.secondary} />
                  <Text style={[typography.labelSm, { color: colors.secondary, fontSize: 11, marginLeft: 4 }]}>Berlin Data Center</Text>
                </View>
                <MaterialIcons name="chevron-right" size={20} color={colors.secondary} />
              </View>
            </View>
          </TouchableOpacity>

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
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    overflow: 'hidden',
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
    borderRadius: 20,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  calendarBento: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    marginBottom: 32,
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
    width: `${100/7}%`,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotsContainer: {
    flexDirection: 'row',
    gap: 2,
    position: 'absolute',
    bottom: 8,
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
    paddingTop: 16,
    marginTop: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  protocolsSection: {
    marginBottom: 32,
  },
  protocolsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  protocolItem: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
  },
  dateBadge: {
    width: 48,
    height: 48,
    borderWidth: 1,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  protocolContent: {
    flex: 1,
  },
  protocolTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  tagBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 16,
    marginLeft: 8,
  },
  protocolFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  avatarsRow: {
    flexDirection: 'row',
  },
  miniAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
  }
});

export default ProjectCalendarScreen;
