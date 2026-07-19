import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, ImageBackground } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

const SmartViewsScreen = ({ navigation }) => {
  const { colors, typography, spacing, borderRadius } = useTheme();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.surface }]}>
      {/* Top Navigation */}
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.outlineVariant }]}>
        <View style={styles.headerLeft}>
          <MaterialIcons name="terminal" size={24} color={colors.primary} />
          <Text style={[typography.labelCaps, { color: colors.primary, fontWeight: '900', letterSpacing: 2, marginLeft: 8 }]}>MANDATE</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={[styles.iconBtn, { marginRight: 8 }]}>
            <MaterialIcons name="search" size={24} color={colors.secondary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}>
            <MaterialIcons name="account-circle" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        
        {/* Status Region */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.statusScroll} style={styles.statusSection}>
          <View style={[styles.statusPill, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
            <View style={[styles.pulseDot, { backgroundColor: colors.tertiaryFixedDim }]} />
            <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant, textTransform: 'uppercase' }]}>Pulse: Nominal</Text>
          </View>
          <View style={[styles.statusPill, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
            <MaterialIcons name="hub" size={14} color={colors.onSurfaceVariant} />
            <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant, textTransform: 'uppercase' }]}>Clusters: 128/128</Text>
          </View>
          <View style={[styles.statusPill, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
            <MaterialIcons name="bolt" size={14} color={colors.onSurfaceVariant} />
            <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant, textTransform: 'uppercase' }]}>Latency: 4ms</Text>
          </View>
        </ScrollView>

        {/* Predictive Behavior Analytics */}
        <View style={styles.section}>
          <Text style={[typography.headlineLgMobile, { color: colors.primary, marginBottom: 8, paddingHorizontal: 4 }]}>Predictive Behavior</Text>
          <View style={[styles.predictiveCard, { backgroundColor: '#ffffff', borderColor: colors.outlineVariant }]}>
            <View style={styles.predictiveHeader}>
              <Text style={[typography.labelCaps, { color: colors.secondary, textTransform: 'uppercase', marginBottom: 4 }]}>Current Cycle</Text>
              <Text style={[typography.displayLg, { fontSize: 32, lineHeight: 36, color: colors.primary }]}>98.4% Accuracy</Text>
            </View>
            
            <View style={styles.barChartContainer}>
              {[60, 45, 80, 95, 70, 50, 85, 40, 90, 100].map((h, i) => (
                <View key={i} style={[styles.chartBar, { height: `${h}%`, backgroundColor: colors.primary }]} />
              ))}
            </View>
          </View>
        </View>

        {/* Vertical Modules */}
        <View style={styles.modulesGrid}>
          
          {/* Operational Bottlenecks */}
          <View style={[styles.moduleCard, { backgroundColor: '#ffffff', borderColor: colors.outlineVariant }]}>
            <View style={styles.moduleHeader}>
              <Text style={[typography.labelCaps, { color: colors.secondary, letterSpacing: 2, textTransform: 'uppercase' }]}>Operational Bottlenecks</Text>
              <MaterialIcons name="warning" size={24} color={colors.error} />
            </View>
            <View style={styles.bottleneckList}>
              <View style={[styles.bottleneckItem, { backgroundColor: colors.surfaceContainerLow, borderColor: colors.outlineVariant }]}>
                <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant, marginBottom: 4 }]}>NODE_ALPHA_09</Text>
                <Text style={[typography.bodyMd, { color: colors.primary, fontWeight: 'bold' }]}>Memory Leak Detected</Text>
                <View style={[styles.progressBarBg, { backgroundColor: colors.outlineVariant, marginTop: 8 }]}>
                  <View style={[styles.progressBarFill, { backgroundColor: colors.error, width: '88%' }]} />
                </View>
              </View>
              <View style={[styles.bottleneckItem, { backgroundColor: colors.surfaceContainerLow, borderColor: colors.outlineVariant }]}>
                <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant, marginBottom: 4 }]}>GATEWAY_WEST</Text>
                <Text style={[typography.bodyMd, { color: colors.primary, fontWeight: 'bold' }]}>Congestion Level 4</Text>
                <View style={[styles.progressBarBg, { backgroundColor: colors.outlineVariant, marginTop: 8 }]}>
                  <View style={[styles.progressBarFill, { backgroundColor: colors.error, width: '72%' }]} />
                </View>
              </View>
            </View>
          </View>

          {/* Idle Protocols */}
          <View style={[styles.moduleCard, { backgroundColor: '#ffffff', borderColor: colors.outlineVariant }]}>
            <View style={styles.moduleHeader}>
              <Text style={[typography.labelCaps, { color: colors.secondary, letterSpacing: 2, textTransform: 'uppercase' }]}>Idle Protocols</Text>
              <MaterialIcons name="bedtime" size={24} color={colors.tertiaryFixedDim} />
            </View>
            <View style={styles.protocolList}>
              <View style={[styles.protocolItem, { borderBottomColor: colors.surfaceContainerHighest }]}>
                <Text style={[typography.labelSm, { color: colors.onSurfaceVariant }]}>Maintenance Cycle</Text>
                <Text style={[typography.bodyMd, { color: colors.primary, fontWeight: 'bold' }]}>Active</Text>
              </View>
              <View style={[styles.protocolItem, { borderBottomColor: colors.surfaceContainerHighest }]}>
                <Text style={[typography.labelSm, { color: colors.onSurfaceVariant }]}>Optimization</Text>
                <Text style={[typography.bodyMd, { color: colors.primary, fontWeight: 'bold' }]}>14m Remaining</Text>
              </View>
              <View style={[styles.protocolItem, { borderBottomWidth: 0 }]}>
                <Text style={[typography.labelSm, { color: colors.onSurfaceVariant }]}>Power Mode</Text>
                <View style={[styles.tag, { backgroundColor: colors.surfaceContainerHighest }]}>
                  <Text style={[typography.labelCaps, { fontSize: 10, color: colors.primary }]}>ECO-STATIC</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity style={[styles.overrideBtn, { backgroundColor: colors.primary }]}>
              <Text style={[typography.labelCaps, { color: colors.onPrimary, letterSpacing: 1 }]}>OVERRIDE PROTOCOL</Text>
            </TouchableOpacity>
          </View>

          {/* Visualization Bento */}
          <View style={[styles.imageCard, { borderColor: colors.outlineVariant }]}>
            <ImageBackground 
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDilC7ZJcIIAPFg8vZ8mXdzRbCumywnLaQ2fTvkDSNR0nY4dB_OIchV91vz0M08HtDE5YLD8nAYUNmjHs2H52no9T-iiOjbwLqFNR9CihqPtpr5iFOaA_a8vs6ZEd9malyS2zF3zzmi_sfBKqg7N_b2Q5OZmGZZRqRbMqQoFpRSnSvLGy8FSSbiys1Je8qDGrq5WAajup4JxSYBODe2duKb1qSPOWELC61RYcMgiGXgR0VhdzhEbQehjw' }}
              style={styles.imageBg}
              resizeMode="cover"
            >
              <View style={styles.imageOverlay}>
                <Text style={[typography.labelCaps, { color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase' }]}>Core Architecture</Text>
                <Text style={[typography.headlineLgMobile, { color: '#ffffff' }]}>Phase 4 Deployment</Text>
              </View>
            </ImageBackground>
          </View>

        </View>

      </ScrollView>

      {/* Bottom Nav */}
      <View style={[styles.bottomNav, { backgroundColor: colors.surface, borderTopColor: colors.outlineVariant }]}>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="track-changes" size={24} color={colors.secondary} />
          <Text style={[typography.labelSm, { color: colors.secondary, marginTop: 4, fontSize: 10 }]}>GOALS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="hub" size={24} color={colors.secondary} />
          <Text style={[typography.labelSm, { color: colors.secondary, marginTop: 4, fontSize: 10 }]}>NETWORK</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navItemActive, { backgroundColor: colors.primaryContainer, borderTopColor: colors.primary }]}>
          <MaterialIcons name="analytics" size={24} color={colors.onPrimaryContainer} />
          <Text style={[typography.labelSm, { color: colors.onPrimaryContainer, marginTop: 4, fontSize: 10 }]}>LOGS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="settings-input-component" size={24} color={colors.secondary} />
          <Text style={[typography.labelSm, { color: colors.secondary, marginTop: 4, fontSize: 10 }]}>CONFIG</Text>
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
    paddingHorizontal: 16,
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
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBtn: {
    padding: 8,
  },
  container: {
    paddingTop: 80, // header + spacing
    paddingBottom: 100, // to clear nav
  },
  statusSection: {
    marginBottom: 16,
  },
  statusScroll: {
    paddingHorizontal: 16,
    gap: 8,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    gap: 8,
  },
  pulseDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  predictiveCard: {
    height: 256,
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    position: 'relative',
  },
  predictiveHeader: {
    position: 'absolute',
    top: 32,
    left: 32,
    zIndex: 2,
  },
  barChartContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 128,
    gap: 4,
    paddingHorizontal: 16,
  },
  chartBar: {
    flex: 1,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
  },
  modulesGrid: {
    paddingHorizontal: 16,
    gap: 16,
  },
  moduleCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 32,
  },
  moduleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  bottleneckList: {
    gap: 16,
  },
  bottleneckItem: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
  progressBarBg: {
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
  },
  protocolList: {
    gap: 8,
    marginBottom: 16,
  },
  protocolItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  overrideBtn: {
    paddingVertical: 16,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageCard: {
    height: 320,
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
  },
  imageBg: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  imageOverlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 32,
    paddingTop: 64, // To create a nice gradient feel
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 80,
    borderTopWidth: 1,
    zIndex: 50,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  navItemActive: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderTopWidth: 2,
  }
});

export default SmartViewsScreen;
