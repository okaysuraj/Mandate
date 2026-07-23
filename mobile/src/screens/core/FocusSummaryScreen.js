import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';

const FocusSummaryScreen = ({ navigation }) => {
  const { colors, typography, spacing, borderRadius } = useTheme();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      {/* Top Navigation Anchor */}
      <View style={[styles.header, { backgroundColor: colors.background, borderBottomColor: colors.outlineVariant }]}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.iconBtn}>
            <MaterialIcons name="grid-view" size={24} color={colors.primary} />
          </TouchableOpacity>
          <Text style={[typography.headlineLgMobile, { color: colors.primary, fontWeight: '900', letterSpacing: -1, marginLeft: 8 }]}>PROMETHEUS</Text>
        </View>
        <View style={[styles.avatarContainer, { backgroundColor: colors.surfaceContainer }]}>
          <Image 
            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCc4YppKRQnHHaYwfWbsJj-jKv7U_hO6BWU5nuxUeGsAG2fvW97Xcppu8tbxPTc36TWqRsD3RKECeLM_5n2J0G9JSslfl2cmbPDKcdFYjMX92nBQKXVXTU2gsjeUPqmHOZzxnYXt-9_H67p5-oGQ3Beh1sRjKlqXtYrR7RkLLUcHUEfCB1gmv5z7H18F0No4xspjn8fhArZHGVunWS4lm-7hcOBRJMQ1zjQLMnOoofb0DUMFlzzfxc9TA' }}
            style={styles.avatar}
          />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        
        {/* Summary Header */}
        <View style={{ marginBottom: spacing.lg }}>
          <View style={{ flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.sm }}>
            <View style={[styles.badge, { backgroundColor: colors.surfaceContainer }]}>
              <Text style={[typography.labelCaps, { color: colors.onSecondaryContainer }]}>SESSION_ID: 9823-A</Text>
            </View>
            <View style={[styles.badge, { backgroundColor: colors.tertiaryContainer + '1A' }]}>
              <Text style={[typography.labelCaps, { color: colors.onTertiaryContainer }]}>COMPLETED</Text>
            </View>
          </View>
          <Text style={[typography.headlineLgMobile, { color: colors.primary, marginBottom: spacing.xs }]}>Post-Session Report</Text>
          <Text style={[typography.bodyMd, { color: colors.secondary }]}>Industrial workflow analysis for Project Genesis.</Text>
        </View>

        {/* Efficiency Score Bento */}
        <View style={[styles.bentoCard, { borderColor: colors.outlineVariant, marginBottom: spacing.md, paddingVertical: spacing.lg }]}>
          <View style={[styles.progressTopBar, { backgroundColor: colors.surfaceContainerHigh }]}>
            <View style={[styles.progressFill, { backgroundColor: colors.primary, width: '94.2%' }]} />
          </View>
          <Text style={[typography.labelCaps, { color: colors.secondary, marginBottom: spacing.xs }]}>EFFICIENCY RATING</Text>
          <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: spacing.xs }}>
            <Text style={[typography.displayLg, { color: colors.primary, fontSize: 60, fontWeight: '900', letterSpacing: -2 }]}>94.2</Text>
            <Text style={[typography.headlineLg, { color: colors.secondary }]}>/100</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: spacing.md, gap: spacing.xs }}>
            <MaterialIcons name="trending-up" size={16} color={colors.onTertiaryContainer} />
            <Text style={[typography.labelSm, { color: colors.onTertiaryContainer }]}>+4.1% vs previous session</Text>
          </View>
        </View>

        {/* Distribution Chart Bento */}
        <View style={[styles.bentoCard, { borderColor: colors.outlineVariant, marginBottom: spacing.md }]}>
          <View style={[styles.cardHeader, { marginBottom: spacing.md }]}>
            <Text style={[typography.labelCaps, { color: colors.primary }]}>DISTRIBUTION</Text>
            <MaterialIcons name="bar-chart" size={20} color={colors.secondary} />
          </View>
          <View style={styles.chartContainer}>
            {[
              { day: 'MON', height: '45%', opacity: 0.2 },
              { day: 'TUE', height: '65%', opacity: 0.4 },
              { day: 'WED', height: '95%', opacity: 1, bold: true },
              { day: 'THU', height: '55%', opacity: 0.3 },
              { day: 'FRI', height: '80%', opacity: 0.6 },
            ].map((item, index) => (
              <View key={index} style={styles.barWrapper}>
                <View style={[styles.barBg, { backgroundColor: colors.primaryContainer + '1A', height: item.height }]}>
                  <View style={[styles.barFill, { backgroundColor: colors.primary, opacity: item.opacity }]} />
                </View>
                <Text style={[typography.labelSm, { fontSize: 10, color: item.bold ? colors.primary : colors.secondary, fontWeight: item.bold ? 'bold' : 'normal', marginTop: spacing.xs }]}>{item.day}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Task Ledger */}
        <View style={{ gap: spacing.sm }}>
          <View style={[styles.cardHeader, { paddingHorizontal: spacing.xs }]}>
            <Text style={[typography.labelCaps, { color: colors.primary }]}>FINALIZED TASKS</Text>
            <Text style={[typography.labelSm, { color: colors.secondary }]}>Total: 12</Text>
          </View>
          
          <View style={{ gap: spacing.sm }}>
            {[
              { title: 'Asset Indexing', time: 'Completed 14:20 PM', size: '340MB' },
              { title: 'Schema Validation', time: 'Completed 15:45 PM', size: '1.2GB' },
              { title: 'CDN Syncing', time: 'Completed 16:10 PM', size: '89MB' },
            ].map((task, index) => (
              <View key={index} style={[styles.taskRow, { borderColor: colors.outlineVariant }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.md }}>
                  <View style={[styles.taskIconBg, { backgroundColor: colors.tertiaryContainer + '0D' }]}>
                    <MaterialIcons name="check-circle" size={18} color={colors.onTertiaryContainer} />
                  </View>
                  <View>
                    <Text style={[typography.bodyMd, { color: colors.primary, fontWeight: 'bold' }]}>{task.title}</Text>
                    <Text style={[typography.labelSm, { color: colors.secondary, fontSize: 10 }]}>{task.time}</Text>
                  </View>
                </View>
                <View style={[styles.sizeBadge, { backgroundColor: colors.surfaceContainerLow }]}>
                  <Text style={[typography.labelCaps, { color: colors.primary, fontSize: 10 }]}>{task.size}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
        
      </ScrollView>

      {/* Bottom Actions & Navigation Shell */}
      <View style={[styles.bottomShell, { backgroundColor: colors.surfaceContainerLowest, borderTopColor: colors.outlineVariant }]}>
        
        {/* Primary Action Pinned */}
        <View style={[styles.pinnedAction, { borderBottomColor: colors.outlineVariant + '4D' }]}>
          <TouchableOpacity style={[styles.primaryBtn, { backgroundColor: colors.primary }]}>
            <MaterialIcons name="rocket-launch" size={20} color={colors.onPrimary} style={{ marginRight: 8 }} />
            <Text style={[typography.labelCaps, { color: colors.onPrimary }]}>Deploy Logs to Project</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navItem}>
            <MaterialIcons name="inventory-2" size={24} color={colors.onSecondaryContainer} />
            <Text style={[typography.labelCaps, { color: colors.onSecondaryContainer, marginTop: 4 }]}>Projects</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <MaterialIcons name="view-kanban" size={24} color={colors.onSecondaryContainer} />
            <Text style={[typography.labelCaps, { color: colors.onSecondaryContainer, marginTop: 4 }]}>Board</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <MaterialIcons name="timeline" size={24} color={colors.onSecondaryContainer} />
            <Text style={[typography.labelCaps, { color: colors.onSecondaryContainer, marginTop: 4 }]}>Gantt</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.navItemActive, { backgroundColor: colors.primaryContainer }]}>
            <MaterialIcons name="analytics" size={24} color={colors.onPrimaryContainer} />
            <Text style={[typography.labelCaps, { color: colors.onPrimaryContainer, marginTop: 4 }]}>Metrics</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <MaterialIcons name="center-focus-strong" size={24} color={colors.onSecondaryContainer} />
            <Text style={[typography.labelCaps, { color: colors.onSecondaryContainer, marginTop: 4 }]}>Focus</Text>
          </TouchableOpacity>
        </View>
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
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBtn: {
    padding: 8,
    marginHorizontal: -8,
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  container: {
    flexGrow: 1,
    padding: 16,
    paddingTop: 32,
    paddingBottom: 200, // Space for bottom shell
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  bentoCard: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  progressTopBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
  },
  progressFill: {
    height: '100%',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  chartContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 160,
    width: '100%',
    paddingHorizontal: 8,
  },
  barWrapper: {
    flex: 1,
    alignItems: 'center',
    height: '100%',
    justifyContent: 'flex-end',
  },
  barBg: {
    width: '100%',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  barFill: {
    width: '100%',
    height: '100%',
  },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 8,
  },
  taskIconBg: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sizeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  bottomShell: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    zIndex: 50,
  },
  pinnedAction: {
    padding: 16,
    borderBottomWidth: 1,
  },
  primaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 9999,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 8,
    paddingBottom: 16,
    height: 64,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
  },
  navItemActive: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
  }
});

export default FocusSummaryScreen;
