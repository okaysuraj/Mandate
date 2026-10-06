import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';

const TaskReflectionScreen = () => {
  const { colors, typography, spacing, borderRadius } = useTheme();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      {/* Top App Bar */}
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.outlineVariant }]}>
        <View style={styles.headerLeft}>
          <View style={[styles.headerAvatar, { backgroundColor: colors.primary }]}>
            <Image 
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1ELQSpv0SZ6BFJ0nbh33iwEZjusw5-HKDXBIbfLXzrfxkaiPxl0o1yFvVH3ikH3UamUkNsqbKCGj04-6T4X-8kErBYY23TDWvFRvBXwVRhQ9LzWFNWBiHjKnwf393O2HimHEjAMKno9gN7ugm4wQUrgD_XDm1Go2FeL3X4COcZ9T6sJX593aWFDBoih69QsoFQFWZOzbp2zpD--JMOWptaQacRrzhv9O1qVzoIKVlbRASq_Fm_5ZtoQ' }}
              style={styles.avatarImg}
            />
          </View>
          <Text style={[typography.labelCaps, { color: colors.primary, fontWeight: '900', letterSpacing: 2, marginLeft: 12 }]}>MANDATE</Text>
        </View>
        <TouchableOpacity style={styles.iconBtn}>
          <MaterialIcons name="settings" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        
        {/* Screen Title Section */}
        <View style={styles.titleSection}>
          <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant, marginBottom: 4 }]}>TASK RETROSPECTIVE</Text>
          <Text style={[typography.headlineLgMobile, { color: colors.primary, textTransform: 'uppercase' }]}>Task Review</Text>
        </View>

        <View style={styles.mainGrid}>
          
          {/* Efficiency Rating Card */}
          <View style={[styles.bentoCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant, position: 'relative', overflow: 'hidden' }]}>
            <View style={{ position: 'relative', zIndex: 10 }}>
              <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant, marginBottom: 16 }]}>COMPLETION SCORE</Text>
              <View style={styles.ratingRow}>
                <Text style={[typography.displayLg, { color: colors.primary, fontSize: 60 }]}>94.2</Text>
                <View style={[styles.optimalTag, { backgroundColor: 'rgba(60, 227, 106, 0.2)' }]}>
                  <Text style={[typography.labelCaps, { color: colors.onTertiaryContainer }]}>ON TRACK</Text>
                </View>
              </View>
              <Text style={[typography.labelSm, { color: colors.onSurfaceVariant, marginTop: 16 }]}>
                Task completed ahead of expected schedule with all subtasks verified.
              </Text>
            </View>
            <View style={styles.bgIconWrapper}>
              <MaterialIcons name="analytics" size={120} color={colors.primary} style={{ opacity: 0.05 }} />
            </View>
          </View>

          {/* Phase Bar Chart */}
          <View style={[styles.bentoCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
            <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant, marginBottom: 32 }]}>EFFORT DISTRIBUTION</Text>
            <View style={styles.barChartContainer}>
              <View style={styles.barCol}>
                <View style={[styles.barFill, { backgroundColor: colors.primary, height: '100%' }]} />
                <Text style={[typography.labelCaps, { fontSize: 10 }]}>PLAN</Text>
              </View>
              <View style={styles.barCol}>
                <View style={[styles.barFill, { backgroundColor: colors.primary, height: '75%' }]} />
                <Text style={[typography.labelCaps, { fontSize: 10 }]}>EXEC</Text>
              </View>
              <View style={styles.barCol}>
                <View style={[styles.barFill, { backgroundColor: colors.primary, height: '50%' }]} />
                <Text style={[typography.labelCaps, { fontSize: 10 }]}>TEST</Text>
              </View>
              <View style={styles.barCol}>
                <View style={[styles.barFill, { backgroundColor: colors.primary, height: '80%' }]} />
                <Text style={[typography.labelCaps, { fontSize: 10 }]}>REVIEW</Text>
              </View>
              <View style={styles.barCol}>
                <View style={[styles.barFill, { backgroundColor: colors.outlineVariant, height: '25%' }]} />
                <Text style={[typography.labelCaps, { fontSize: 10 }]}>DOCS</Text>
              </View>
            </View>
          </View>

          {/* Operator Logs */}
          <View style={[styles.bentoCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
            <View style={styles.cardHeaderFlex}>
              <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant }]}>RETROSPECTIVE NOTES</Text>
              <MaterialIcons name="edit-note" size={20} color={colors.onSurfaceVariant} />
            </View>
            <View style={[styles.quoteBlock, { backgroundColor: colors.surfaceContainerLow, borderColor: colors.outlineVariant, borderWidth: 1, borderRadius: 8, padding: 16 }]}>
              <Text style={[typography.bodyMd, { color: colors.onSurface, fontSize: 14, fontStyle: 'italic', lineHeight: 22 }]}>
                "Completed the sprint milestone with minimal blockers. Handed off deliverables to the design team for final review and sign-off."
              </Text>
              <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant, fontSize: 10, marginTop: 16 }]}>
                LOGGED: Oct 24, 2024 • 14:22
              </Text>
            </View>
          </View>

          {/* Resource Load Metrics */}
          <View style={styles.resourceGrid}>
            <View style={[styles.bentoCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant, flex: 1 }]}>
              <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant, marginBottom: 8 }]}>FOCUS TIME</Text>
              <Text style={[typography.headlineLgMobile, { fontSize: 24, fontWeight: 'bold' }]}>4.2h</Text>
              <View style={[styles.progressBg, { backgroundColor: colors.surfaceContainerHigh }]}>
                <View style={[styles.progressFill, { backgroundColor: colors.primary, width: '70%' }]} />
              </View>
            </View>
            
            <View style={[styles.bentoCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant, flex: 1 }]}>
              <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant, marginBottom: 8 }]}>ACCURACY</Text>
              <Text style={[typography.headlineLgMobile, { fontSize: 24, fontWeight: 'bold' }]}>92%</Text>
              <View style={[styles.progressBg, { backgroundColor: colors.surfaceContainerHigh }]}>
                <View style={[styles.progressFill, { backgroundColor: colors.primary, width: '92%' }]} />
              </View>
            </View>
          </View>

          {/* Activity Visual Element */}
          <View style={[styles.atmosphericBox, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant, borderWidth: 1 }]}>
            <View style={[styles.telemetryOverlay, { borderColor: colors.outlineVariant }]}>
              <View style={[styles.telemetryTextBg, { backgroundColor: colors.surfaceContainerLow, borderColor: colors.outlineVariant }]}>
                <Text style={[typography.labelCaps, { color: colors.primary, fontSize: 10, letterSpacing: 2 }]}>ACTIVITY VERIFIED</Text>
                <Text style={[typography.labelSm, { color: colors.secondary, fontSize: 8, marginTop: 4 }]}>ALL CRITERIA SATISFIED</Text>
              </View>
            </View>
          </View>

        </View>
      </ScrollView>

      {/* FAB */}
      <TouchableOpacity style={[styles.fab, { backgroundColor: colors.primary }]}>
        <MaterialIcons name="file-download" size={24} color={colors.onPrimary} />
      </TouchableOpacity>

      {/* Bottom Nav */}
      <View style={[styles.bottomNav, { backgroundColor: colors.surface, borderTopColor: colors.outlineVariant }]}>
        <TouchableOpacity style={[styles.navItem, { borderRightColor: colors.outlineVariant }]}>
          <MaterialIcons name="dashboard" size={24} color={colors.onSurfaceVariant} />
          <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant, marginTop: 4, fontSize: 10 }]}>DASHBOARD</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navItem, { borderRightColor: colors.outlineVariant }]}>
          <MaterialIcons name="folder-open" size={24} color={colors.onSurfaceVariant} />
          <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant, marginTop: 4, fontSize: 10 }]}>PROJECTS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navItem, { borderRightColor: colors.outlineVariant }]}>
          <MaterialIcons name="notifications-none" size={24} color={colors.onSurfaceVariant} />
          <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant, marginTop: 4, fontSize: 10 }]}>ALERTS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navItemActive, { backgroundColor: colors.primary, borderLeftColor: colors.outline, borderRightColor: colors.outline }]}>
          <MaterialIcons name="settings" size={24} color={colors.onPrimary} />
          <Text style={[typography.labelCaps, { color: colors.onPrimary, marginTop: 4, fontSize: 10 }]}>SETTINGS</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    height: 64,
    borderBottomWidth: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    overflow: 'hidden',
  },
  avatarImg: {
    width: '100%',
    height: '100%',
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: -8,
  },
  container: {
    paddingTop: 80, 
    paddingBottom: 112, 
    paddingHorizontal: 24,
  },
  titleSection: {
    marginBottom: 32,
  },
  mainGrid: {
    gap: 16,
  },
  bentoCard: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 32,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
  },
  optimalTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  bgIconWrapper: {
    position: 'absolute',
    right: 0,
    bottom: -10,
  },
  barChartContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 128,
    gap: 8,
  },
  barCol: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 8,
  },
  barFill: {
    width: '100%',
  },
  cardHeaderFlex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  quoteBlock: {
    marginBottom: 8,
  },
  resourceGrid: {
    flexDirection: 'row',
    gap: 16,
  },
  progressBg: {
    height: 4,
    width: '100%',
    marginTop: 8,
  },
  progressFill: {
    height: '100%',
  },
  atmosphericBox: {
    height: 192,
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 12,
  },
  telemetryOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderWidth: 1,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  telemetryTextBg: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
  },
  fab: {
    position: 'absolute',
    bottom: 96,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    zIndex: 40,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'stretch',
    height: 80,
    borderTopWidth: 1,
    zIndex: 50,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
  },
  navItemActive: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderLeftWidth: 1,
    borderRightWidth: 1,
  }
});

export default TaskReflectionScreen;
