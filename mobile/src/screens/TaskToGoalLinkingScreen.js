import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Animated } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

const TaskToGoalLinkingScreen = () => {
  const { colors, typography, spacing, borderRadius } = useTheme();
  const [spinValue] = useState(new Animated.Value(0));

  const handleSync = () => {
    Animated.sequence([
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(spinValue, {
        toValue: 0,
        duration: 0,
        useNativeDriver: true,
      })
    ]).start();
  };

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.surface }]}>
      {/* Top App Bar */}
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.outlineVariant }]}>
        <View style={styles.headerLeft}>
          <MaterialIcons name="terminal" size={24} color={colors.primary} />
          <Text style={[typography.labelCaps, { color: colors.primary, letterSpacing: 2, marginLeft: 8 }]}>MANDATE</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconBtn}>
            <MaterialIcons name="search" size={24} color={colors.secondary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}>
            <MaterialIcons name="account-circle" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        
        {/* OS Status Header */}
        <View style={styles.statusSection}>
          <View style={styles.statusFlex}>
            <View>
              <Text style={[typography.headlineLgMobile, { color: colors.primary }]}>Strategic Alignment</Text>
              <Text style={[typography.labelSm, { color: colors.secondary, textTransform: 'uppercase', letterSpacing: -0.5, marginTop: 4 }]}>System Protocol: Active-Sync</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={[typography.displayLg, { color: colors.primary, fontSize: 40, lineHeight: 40, fontWeight: 'bold' }]}>65%</Text>
              <Text style={[typography.labelCaps, { color: colors.onTertiaryContainer }]}>ALIGNED</Text>
            </View>
          </View>
          {/* Progress Bar */}
          <View style={[styles.progressBarBg, { backgroundColor: colors.surfaceContainerHigh }]}>
            <View style={[styles.progressBarFill, { backgroundColor: colors.primary, width: '65%' }]} />
          </View>
        </View>

        <View style={styles.bentoLayout}>
          
          {/* SECTION 1: MANDATE_BACKLOG */}
          <View style={styles.sectionBlock}>
            <View style={[styles.sectionHeader, { borderLeftColor: colors.primary }]}>
              <Text style={[typography.labelCaps, { color: colors.primary }]}>MANDATE_BACKLOG</Text>
              <Text style={[typography.labelSm, { color: colors.outline, marginLeft: 8 }]}>[4 UNITS]</Text>
            </View>

            <View style={styles.taskList}>
              {/* Task 1 */}
              <TouchableOpacity style={[styles.taskCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
                <View>
                  <Text style={[typography.labelSm, { color: colors.secondary, marginBottom: 4 }]}>REF: MD-882</Text>
                  <Text style={[typography.bodyMd, { color: colors.primary, fontWeight: 'bold' }]}>Optimize Telemetry Processing</Text>
                </View>
                <MaterialIcons name="radio-button-unchecked" size={24} color={colors.outlineVariant} />
              </TouchableOpacity>

              {/* Task 2 */}
              <TouchableOpacity style={[styles.taskCard, styles.taskCardShadow, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.primary }]}>
                <View>
                  <Text style={[typography.labelSm, { color: colors.primary, marginBottom: 4 }]}>REF: MD-410</Text>
                  <Text style={[typography.bodyMd, { color: colors.primary, fontWeight: 'bold' }]}>Refactor Auth Middleware</Text>
                </View>
                <MaterialIcons name="check-circle" size={24} color={colors.primary} />
              </TouchableOpacity>

              {/* Task 3 */}
              <TouchableOpacity style={[styles.taskCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
                <View>
                  <Text style={[typography.labelSm, { color: colors.secondary, marginBottom: 4 }]}>REF: MD-102</Text>
                  <Text style={[typography.bodyMd, { color: colors.primary, fontWeight: 'bold' }]}>UI Component Registry Expansion</Text>
                </View>
                <MaterialIcons name="radio-button-unchecked" size={24} color={colors.outlineVariant} />
              </TouchableOpacity>
            </View>
          </View>

          {/* CENTRAL SHUFFLE/LINK PROTOCOL */}
          <View style={styles.syncSection}>
            <View style={[styles.syncLine, { backgroundColor: colors.outlineVariant }]} />
            <TouchableOpacity 
              style={[styles.syncBtn, { backgroundColor: colors.primary }]}
              onPress={handleSync}
              activeOpacity={0.8}
            >
              <Animated.View style={{ transform: [{ rotate: spin }] }}>
                <MaterialIcons name="sync" size={28} color={colors.onPrimary} />
              </Animated.View>
            </TouchableOpacity>
          </View>

          {/* SECTION 2: STRATEGIC_目標 */}
          <View style={styles.sectionBlock}>
            <View style={[styles.sectionHeader, { borderLeftColor: colors.onTertiaryContainer }]}>
              <Text style={[typography.labelCaps, { color: colors.onTertiaryContainer }]}>STRATEGIC_目標</Text>
              <Text style={[typography.labelSm, { color: colors.outline, marginLeft: 8 }]}>[CORE_INITIATIVE]</Text>
            </View>

            <View style={styles.goalList}>
              {/* Goal Card 1 */}
              <View style={[styles.goalCardActive, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.primary }]}>
                <View style={[styles.activeTargetBadge, { backgroundColor: colors.primary }]}>
                  <Text style={[typography.labelCaps, { color: colors.onPrimary, fontSize: 10 }]}>ACTIVE_TARGET</Text>
                </View>
                
                <Text style={[typography.labelSm, { color: colors.outline, letterSpacing: 2, marginBottom: 8 }]}>OBJ_ALPHA_01</Text>
                <Text style={[typography.headlineLgMobile, { color: colors.primary, marginBottom: 16 }]}>GLOBAL LATENCY NEUTRALITY</Text>
                
                <View style={styles.goalMetaRow}>
                  <View style={styles.avatarGroup}>
                    <View style={[styles.miniAvatar, { backgroundColor: colors.surfaceContainerHigh, borderColor: colors.surface }]}>
                      <Text style={{ fontSize: 10, fontWeight: 'bold' }}>JD</Text>
                    </View>
                    <View style={[styles.miniAvatar, { backgroundColor: colors.surfaceContainerHigh, borderColor: colors.surface }]}>
                      <Text style={{ fontSize: 10, fontWeight: 'bold' }}>MK</Text>
                    </View>
                  </View>
                  <Text style={[typography.labelSm, { color: colors.secondary, marginLeft: 12 }]}>+12 Linked Items</Text>
                </View>
              </View>

              {/* Goal Card 2 */}
              <View style={[styles.goalCardSecondary, { backgroundColor: colors.surfaceContainerLow, borderColor: colors.outlineVariant }]}>
                <Text style={[typography.labelSm, { color: colors.outline, marginBottom: 4 }]}>OBJ_BETA_04</Text>
                <Text style={[typography.bodyMd, { color: colors.primary, fontWeight: 'bold' }]}>QUANTUM COMPUTE READINESS</Text>
              </View>
            </View>
          </View>

        </View>

      </ScrollView>

      {/* Bottom Nav */}
      <View style={[styles.bottomNav, { backgroundColor: colors.surface, borderTopColor: colors.outlineVariant }]}>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="track-changes" size={24} color={colors.secondary} />
          <Text style={[typography.labelSm, { color: colors.secondary, marginTop: 4, fontSize: 10 }]}>GOALS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navItem, styles.navItemActive, { backgroundColor: colors.primaryContainer, borderTopColor: colors.primary }]}>
          <MaterialIcons name="hub" size={24} color={colors.onPrimaryContainer} />
          <Text style={[typography.labelSm, { color: colors.onPrimaryContainer, marginTop: 4, fontSize: 10 }]}>NETWORK</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="analytics" size={24} color={colors.secondary} />
          <Text style={[typography.labelSm, { color: colors.secondary, marginTop: 4, fontSize: 10 }]}>LOGS</Text>
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
    paddingVertical: 8,
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
    gap: 16,
  },
  iconBtn: {
    padding: 4,
  },
  container: {
    paddingTop: 72, 
    paddingBottom: 112, 
    paddingHorizontal: 16,
  },
  statusSection: {
    marginBottom: 32,
  },
  statusFlex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 8,
  },
  progressBarBg: {
    width: '100%',
    height: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
  },
  bentoLayout: {
    gap: 32,
  },
  sectionBlock: {
    gap: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 4,
    paddingLeft: 8,
    marginBottom: 16,
  },
  taskList: {
    gap: 8,
  },
  taskCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
  },
  taskCardShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4, 
  },
  syncSection: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    position: 'relative',
  },
  syncLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    top: '50%',
    zIndex: -1,
  },
  syncBtn: {
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
  },
  goalList: {
    gap: 8,
  },
  goalCardActive: {
    padding: 32,
    borderWidth: 2,
    position: 'relative',
    overflow: 'hidden',
  },
  activeTargetBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 4,
  },
  goalMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarGroup: {
    flexDirection: 'row',
  },
  miniAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -8, // negative margin for overlap
  },
  goalCardSecondary: {
    padding: 16,
    borderWidth: 1,
    opacity: 0.6,
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
    paddingTop: 8,
  },
  navItemActive: {
    borderTopWidth: 2,
  }
});

export default TaskToGoalLinkingScreen;
