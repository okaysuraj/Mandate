import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

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
          <Text style={[typography.labelCaps, { color: colors.primary, fontWeight: '900', letterSpacing: 2, marginLeft: 12 }]}>CORE_OS_V1.0</Text>
        </View>
        <TouchableOpacity style={styles.iconBtn}>
          <MaterialIcons name="settings" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        
        {/* Screen Title Section */}
        <View style={styles.titleSection}>
          <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant, marginBottom: 4 }]}>SESSION_ID: 992-X-K</Text>
          <Text style={[typography.headlineLgMobile, { color: colors.primary, textTransform: 'uppercase' }]}>Post-Op Review</Text>
        </View>

        <View style={styles.mainGrid}>
          
          {/* Efficiency Rating Card */}
          <View style={[styles.bentoCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant, position: 'relative', overflow: 'hidden' }]}>
            <View style={{ position: 'relative', zIndex: 10 }}>
              <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant, marginBottom: 16 }]}>EFFICIENCY_RATING</Text>
              <View style={styles.ratingRow}>
                <Text style={[typography.displayLg, { color: colors.primary, fontSize: 60 }]}>94.2</Text>
                <View style={[styles.optimalTag, { backgroundColor: 'rgba(60, 227, 106, 0.2)' }]}>
                  <Text style={[typography.labelCaps, { color: colors.onTertiaryContainer }]}>OPTIMAL</Text>
                </View>
              </View>
              <Text style={[typography.labelSm, { color: colors.onSurfaceVariant, marginTop: 16 }]}>
                System performance exceeds baseline benchmarks by 12.4%.
              </Text>
            </View>
            <View style={styles.bgIconWrapper}>
              <MaterialIcons name="analytics" size={120} color={colors.primary} style={{ opacity: 0.05 }} />
            </View>
          </View>

          {/* Phase Bar Chart */}
          <View style={[styles.bentoCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
            <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant, marginBottom: 32 }]}>PHASE_INTENSITY_DISTRIBUTION</Text>
            <View style={styles.barChartContainer}>
              <View style={styles.barCol}>
                <View style={[styles.barFill, { backgroundColor: colors.primary, height: '100%' }]} />
                <Text style={[typography.labelCaps, { fontSize: 10 }]}>INIT</Text>
              </View>
              <View style={styles.barCol}>
                <View style={[styles.barFill, { backgroundColor: colors.primary, height: '75%' }]} />
                <Text style={[typography.labelCaps, { fontSize: 10 }]}>SYNC</Text>
              </View>
              <View style={styles.barCol}>
                <View style={[styles.barFill, { backgroundColor: colors.primary, height: '50%' }]} />
                <Text style={[typography.labelCaps, { fontSize: 10 }]}>PROC</Text>
              </View>
              <View style={styles.barCol}>
                <View style={[styles.barFill, { backgroundColor: colors.primary, height: '80%' }]} />
                <Text style={[typography.labelCaps, { fontSize: 10 }]}>VALI</Text>
              </View>
              <View style={styles.barCol}>
                <View style={[styles.barFill, { backgroundColor: colors.outlineVariant, height: '25%' }]} />
                <Text style={[typography.labelCaps, { fontSize: 10 }]}>IDLE</Text>
              </View>
            </View>
          </View>

          {/* Operator Logs */}
          <View style={[styles.bentoCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
            <View style={styles.cardHeaderFlex}>
              <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant }]}>OPERATOR_LOGS</Text>
              <MaterialIcons name="edit-note" size={20} color={colors.onSurfaceVariant} />
            </View>
            <View style={[styles.quoteBlock, { borderLeftColor: colors.primary }]}>
              <Text style={[typography.bodyMd, { color: colors.onSurface, fontSize: 14, fontStyle: 'italic', lineHeight: 22 }]}>
                "Minor latency spike detected during SYNC phase. Recalibration of thermal sinks initiated manually. Performance remained within strict industrial tolerance levels."
              </Text>
              <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant, fontSize: 10, marginTop: 16 }]}>
                TIMESTAMP: 2024-05-24T14:22:01Z
              </Text>
            </View>
          </View>

          {/* Resource Load Metrics */}
          <View style={styles.resourceGrid}>
            <View style={[styles.bentoCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant, flex: 1 }]}>
              <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant, marginBottom: 8 }]}>CPU_LOAD</Text>
              <Text style={[typography.headlineLgMobile, { fontSize: 24, fontWeight: 'bold' }]}>42%</Text>
              <View style={[styles.progressBg, { backgroundColor: colors.surfaceContainerHigh }]}>
                <View style={[styles.progressFill, { backgroundColor: colors.primary, width: '42%' }]} />
              </View>
            </View>
            
            <View style={[styles.bentoCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant, flex: 1 }]}>
              <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant, marginBottom: 8 }]}>THERMAL</Text>
              <Text style={[typography.headlineLgMobile, { fontSize: 24, fontWeight: 'bold' }]}>58°C</Text>
              <View style={[styles.progressBg, { backgroundColor: colors.surfaceContainerHigh }]}>
                <View style={[styles.progressFill, { backgroundColor: colors.primary, width: '65%' }]} />
              </View>
            </View>
          </View>

          {/* Atmospheric Visual Element */}
          <View style={[styles.atmosphericBox, { backgroundColor: '#000000' }]}>
            <View style={[styles.telemetryOverlay, { borderColor: 'rgba(255,255,255,0.3)' }]}>
              <View style={[styles.telemetryTextBg, { backgroundColor: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)' }]}>
                <Text style={[typography.labelCaps, { color: '#ffffff', fontSize: 10, letterSpacing: 2 }]}>REALTIME_TELEMETRY_FEED</Text>
                <Text style={[typography.labelSm, { color: 'rgba(255,255,255,0.4)', fontSize: 8, marginTop: 4 }]}>ENCRYPTED DATA STREAM_021</Text>
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
          <MaterialIcons name="inventory-2" size={24} color={colors.onSurfaceVariant} />
          <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant, marginTop: 4, fontSize: 10 }]}>ASSETS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navItem, { borderRightColor: colors.outlineVariant }]}>
          <MaterialIcons name="notifications-active" size={24} color={colors.onSurfaceVariant} />
          <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant, marginTop: 4, fontSize: 10 }]}>ALERTS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navItemActive, { backgroundColor: colors.primary, borderLeftColor: colors.outline, borderRightColor: colors.outline }]}>
          <MaterialIcons name="settings-input-component" size={24} color={colors.onPrimary} />
          <Text style={[typography.labelCaps, { color: colors.onPrimary, marginTop: 4, fontSize: 10 }]}>SYSTEM</Text>
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
    borderRadius: 4,
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
    borderLeftWidth: 2,
    paddingLeft: 16,
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
  },
  telemetryOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  telemetryTextBg: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderWidth: 1,
    alignItems: 'center',
  },
  fab: {
    position: 'absolute',
    bottom: 96,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
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
