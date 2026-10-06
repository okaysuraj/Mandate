import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';

const PriorityStatusScreen = ({ navigation }) => {
  const { colors, typography, spacing, borderRadius } = useTheme();

  const [alpha, setAlpha] = useState(84);
  const [beta, setBeta] = useState(42);
  const [gamma, setGamma] = useState(12);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.surface }]}>
      {/* TopAppBar */}
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.outlineVariant }]}>
        <View style={styles.headerLeft}>
          <View style={[styles.avatarContainer, { backgroundColor: colors.surfaceContainerHigh, borderColor: colors.outlineVariant }]}>
            <MaterialIcons name="person" size={20} color={colors.onSurfaceVariant} />
          </View>
          <Text style={[typography.labelCaps, { color: colors.primary, fontWeight: '900', letterSpacing: 2, marginLeft: 12 }]}>MANDATE</Text>
        </View>
        <TouchableOpacity style={styles.iconBtn}>
          <MaterialIcons name="settings" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        
        {/* Header Section */}
        <View style={styles.headerSection}>
          <Text style={[typography.headlineLgMobile, { color: colors.primary, textTransform: 'uppercase', marginBottom: 8 }]}>Workflow Settings</Text>
          <Text style={[typography.bodyMd, { color: colors.onSurfaceVariant }]}>
            Configure priority weights and workflow stages for your workspace tasks.
          </Text>
        </View>

        {/* Priority Thresholds */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderBetween}>
            <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant, letterSpacing: 1 }]}>PRIORITY WEIGHTS</Text>
            <Text style={[typography.labelSm, { color: colors.outline }]}>AUTO-SORT: ON</Text>
          </View>

          <View style={[styles.thresholdsCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
            {/* Urgent */}
            <View style={styles.sliderWrapper}>
              <View style={styles.sliderHeader}>
                <Text style={[typography.labelCaps, { fontWeight: 'bold', color: colors.primary }]}>URGENT PRIORITY</Text>
                <Text style={[typography.labelSm, { color: colors.primary }]}>{alpha}%</Text>
              </View>
              <View style={[styles.sliderTrack, { backgroundColor: colors.surfaceContainer }]}>
                <View style={[styles.sliderThumb, { backgroundColor: colors.primary, left: `${alpha}%` }]} />
              </View>
              <View style={styles.sliderFooter}>
                <Text style={[typography.labelSm, { fontSize: 10, color: colors.outline, opacity: 0.6 }]}>LOW</Text>
                <Text style={[typography.labelSm, { fontSize: 10, color: colors.outline, opacity: 0.6 }]}>HIGH</Text>
              </View>
            </View>

            {/* High */}
            <View style={[styles.sliderWrapper, { borderTopWidth: 1, borderTopColor: colors.surfaceContainer, paddingTop: 16 }]}>
              <View style={styles.sliderHeader}>
                <Text style={[typography.labelCaps, { fontWeight: 'bold', color: colors.primary }]}>HIGH PRIORITY</Text>
                <Text style={[typography.labelSm, { color: colors.primary }]}>{beta}%</Text>
              </View>
              <View style={[styles.sliderTrack, { backgroundColor: colors.surfaceContainer }]}>
                <View style={[styles.sliderThumb, { backgroundColor: colors.primary, left: `${beta}%` }]} />
              </View>
              <View style={styles.sliderFooter}>
                <Text style={[typography.labelSm, { fontSize: 10, color: colors.outline, opacity: 0.6 }]}>LOW</Text>
                <Text style={[typography.labelSm, { fontSize: 10, color: colors.outline, opacity: 0.6 }]}>HIGH</Text>
              </View>
            </View>

            {/* Medium */}
            <View style={[styles.sliderWrapper, { borderTopWidth: 1, borderTopColor: colors.surfaceContainer, paddingTop: 16 }]}>
              <View style={styles.sliderHeader}>
                <Text style={[typography.labelCaps, { fontWeight: 'bold', color: colors.primary }]}>MEDIUM PRIORITY</Text>
                <Text style={[typography.labelSm, { color: colors.primary }]}>{gamma}%</Text>
              </View>
              <View style={[styles.sliderTrack, { backgroundColor: colors.surfaceContainer }]}>
                <View style={[styles.sliderThumb, { backgroundColor: colors.primary, left: `${gamma}%` }]} />
              </View>
              <View style={styles.sliderFooter}>
                <Text style={[typography.labelSm, { fontSize: 10, color: colors.outline, opacity: 0.6 }]}>LOW</Text>
                <Text style={[typography.labelSm, { fontSize: 10, color: colors.outline, opacity: 0.6 }]}>HIGH</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Status Builder */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderBetween}>
            <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant, letterSpacing: 1 }]}>WORKFLOW STAGES</Text>
            <TouchableOpacity>
              <MaterialIcons name="add-circle" size={18} color={colors.primary} />
            </TouchableOpacity>
          </View>

          <View style={[styles.statusList, { borderColor: colors.outlineVariant }]}>
            {/* Pending */}
            <View style={[styles.statusItem, { backgroundColor: colors.surfaceContainerLowest, borderBottomColor: colors.outlineVariant }]}>
              <MaterialIcons name="radio-button-checked" size={20} color={colors.onTertiaryContainer} style={styles.statusIcon} />
              <View style={styles.statusContent}>
                <Text style={[typography.labelCaps, { fontWeight: 'bold', color: colors.primary }]}>PENDING</Text>
                <Text style={[typography.labelSm, { fontSize: 10, color: colors.onSurfaceVariant }]}>Initial task creation and backlog</Text>
              </View>
              <MaterialIcons name="drag-handle" size={18} color={colors.outline} />
            </View>

            {/* In Progress */}
            <View style={[styles.statusItem, { backgroundColor: colors.surfaceContainerLowest, borderBottomColor: colors.outlineVariant }]}>
              <MaterialIcons name="pending" size={20} color={colors.primary} style={styles.statusIcon} />
              <View style={styles.statusContent}>
                <Text style={[typography.labelCaps, { fontWeight: 'bold', color: colors.primary }]}>IN PROGRESS</Text>
                <Text style={[typography.labelSm, { fontSize: 10, color: colors.onSurfaceVariant }]}>Active work underway</Text>
              </View>
              <View style={[styles.activeBadge, { backgroundColor: colors.primary }]}>
                <Text style={[typography.labelCaps, { fontSize: 9, color: colors.onPrimary }]}>ACTIVE</Text>
              </View>
            </View>

            {/* In Review */}
            <View style={[styles.statusItem, { backgroundColor: colors.surfaceContainerLowest, borderBottomColor: colors.outlineVariant }]}>
              <MaterialIcons name="rate-review" size={20} color={colors.outline} style={styles.statusIcon} />
              <View style={styles.statusContent}>
                <Text style={[typography.labelCaps, { fontWeight: 'bold', color: colors.onSurfaceVariant }]}>IN REVIEW</Text>
                <Text style={[typography.labelSm, { fontSize: 10, color: colors.outline }]}>Quality review and validation</Text>
              </View>
              <MaterialIcons name="drag-handle" size={18} color={colors.outline} />
            </View>

            {/* Completed */}
            <View style={[styles.statusItem, { backgroundColor: colors.surfaceContainerLowest }]}>
              <MaterialIcons name="check-circle" size={20} color={colors.onTertiaryContainer} style={styles.statusIcon} />
              <View style={styles.statusContent}>
                <Text style={[typography.labelCaps, { fontWeight: 'bold', color: colors.primary }]}>COMPLETED</Text>
                <Text style={[typography.labelSm, { fontSize: 10, color: colors.outline }]}>Deliverables completed and signed off</Text>
              </View>
              <MaterialIcons name="drag-handle" size={18} color={colors.outline} />
            </View>
          </View>
        </View>

        {/* CTA Section */}
        <View style={styles.ctaSection}>
          <TouchableOpacity style={[styles.primaryBtn, { backgroundColor: colors.primary }]}>
            <Text style={[typography.labelCaps, { color: colors.onPrimary, fontWeight: 'bold' }]}>SAVE CHANGES</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.secondaryBtn, { borderColor: colors.outlineVariant }]}>
            <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant }]}>RESET TO DEFAULTS</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>

      {/* Bottom Nav */}
      <View style={[styles.bottomNav, { backgroundColor: colors.surface, borderTopColor: colors.outlineVariant }]}>
        <TouchableOpacity style={[styles.navItem, { borderRightColor: colors.outlineVariant }]}>
          <MaterialIcons name="dashboard" size={24} color={colors.onSecondaryFixedVariant} />
          <Text style={[typography.labelCaps, { color: colors.onSecondaryFixedVariant, marginTop: 4, fontSize: 10 }]}>DASHBOARD</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navItem, { borderRightColor: colors.outlineVariant }]}>
          <MaterialIcons name="folder-open" size={24} color={colors.onSecondaryFixedVariant} />
          <Text style={[typography.labelCaps, { color: colors.onSecondaryFixedVariant, marginTop: 4, fontSize: 10 }]}>PROJECTS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navItem, { borderRightColor: colors.outlineVariant }]}>
          <MaterialIcons name="notifications-none" size={24} color={colors.onSecondaryFixedVariant} />
          <Text style={[typography.labelCaps, { color: colors.onSecondaryFixedVariant, marginTop: 4, fontSize: 10 }]}>ALERTS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navItem, { backgroundColor: colors.primary }]}>
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
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flexGrow: 1,
    padding: 24, // px-gutter
    paddingBottom: 100, // pb-12 conceptually + space for bottom nav
  },
  headerSection: {
    marginBottom: 32, // mb-md + space-y-xl conceptually
  },
  section: {
    marginBottom: 32, // space-y-lg
  },
  sectionHeaderBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  thresholdsCard: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
  },
  sliderWrapper: {
    marginBottom: 16,
  },
  sliderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 8,
  },
  sliderTrack: {
    height: 2,
    width: '100%',
    position: 'relative',
    justifyContent: 'center',
    marginBottom: 8,
  },
  sliderThumb: {
    width: 16,
    height: 16,
    borderRadius: 8,
    position: 'absolute',
    marginLeft: -8,
  },
  sliderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statusList: {
    borderWidth: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  statusIcon: {
    marginRight: 16,
  },
  statusContent: {
    flex: 1,
  },
  activeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  ctaSection: {
    gap: 16, // gap-md
    paddingTop: 16, // pt-md
  },
  primaryBtn: {
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryBtn: {
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    height: 80, // h-20
    borderTopWidth: 1,
    zIndex: 50,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
  }
});

export default PriorityStatusScreen;
