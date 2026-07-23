import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
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
          <Text style={[typography.labelCaps, { color: colors.primary, fontWeight: '900', letterSpacing: 2, marginLeft: 12 }]}>CORE_OS_v1.0</Text>
        </View>
        <TouchableOpacity style={styles.iconBtn}>
          <MaterialIcons name="settings" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        
        {/* Header Section */}
        <View style={styles.headerSection}>
          <Text style={[typography.headlineLgMobile, { color: colors.primary, textTransform: 'uppercase', marginBottom: 8 }]}>Configuration</Text>
          <Text style={[typography.bodyMd, { color: colors.onSurfaceVariant }]}>
            Define system response triggers and operational lifecycle stages for the primary processor.
          </Text>
        </View>

        {/* Priority Thresholds */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderBetween}>
            <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant, letterSpacing: 1 }]}>PRIORITY THRESHOLDS</Text>
            <Text style={[typography.labelSm, { color: colors.outline }]}>AUTO-LEVELING: ON</Text>
          </View>

          <View style={[styles.thresholdsCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
            {/* Alpha */}
            <View style={styles.sliderWrapper}>
              <View style={styles.sliderHeader}>
                <Text style={[typography.labelCaps, { fontWeight: 'bold', color: colors.primary }]}>ALPHA_REACTION</Text>
                <Text style={[typography.labelSm, { color: colors.primary }]}>{alpha}%</Text>
              </View>
              <View style={[styles.sliderTrackMock, { backgroundColor: colors.surfaceContainer }]}>
                <View style={[styles.sliderThumbMock, { backgroundColor: colors.primary, left: `${alpha}%` }]} />
              </View>
              <View style={styles.sliderFooter}>
                <Text style={[typography.labelSm, { fontSize: 10, color: colors.outline, opacity: 0.6 }]}>L-SPEC</Text>
                <Text style={[typography.labelSm, { fontSize: 10, color: colors.outline, opacity: 0.6 }]}>H-SPEC</Text>
              </View>
            </View>

            {/* Beta */}
            <View style={[styles.sliderWrapper, { borderTopWidth: 1, borderTopColor: colors.surfaceContainer, paddingTop: 16 }]}>
              <View style={styles.sliderHeader}>
                <Text style={[typography.labelCaps, { fontWeight: 'bold', color: colors.primary }]}>BETA_LATENCY</Text>
                <Text style={[typography.labelSm, { color: colors.primary }]}>{beta}%</Text>
              </View>
              <View style={[styles.sliderTrackMock, { backgroundColor: colors.surfaceContainer }]}>
                <View style={[styles.sliderThumbMock, { backgroundColor: colors.primary, left: `${beta}%` }]} />
              </View>
              <View style={styles.sliderFooter}>
                <Text style={[typography.labelSm, { fontSize: 10, color: colors.outline, opacity: 0.6 }]}>MIN_RESP</Text>
                <Text style={[typography.labelSm, { fontSize: 10, color: colors.outline, opacity: 0.6 }]}>MAX_RESP</Text>
              </View>
            </View>

            {/* Gamma */}
            <View style={[styles.sliderWrapper, { borderTopWidth: 1, borderTopColor: colors.surfaceContainer, paddingTop: 16 }]}>
              <View style={styles.sliderHeader}>
                <Text style={[typography.labelCaps, { fontWeight: 'bold', color: colors.primary }]}>GAMMA_THRESHOLD</Text>
                <Text style={[typography.labelSm, { color: colors.primary }]}>{gamma}%</Text>
              </View>
              <View style={[styles.sliderTrackMock, { backgroundColor: colors.surfaceContainer }]}>
                <View style={[styles.sliderThumbMock, { backgroundColor: colors.primary, left: `${gamma}%` }]} />
              </View>
              <View style={styles.sliderFooter}>
                <Text style={[typography.labelSm, { fontSize: 10, color: colors.outline, opacity: 0.6 }]}>NOISE_FLOOR</Text>
                <Text style={[typography.labelSm, { fontSize: 10, color: colors.outline, opacity: 0.6 }]}>SIG_CEILING</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Status Builder */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderBetween}>
            <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant, letterSpacing: 1 }]}>STATUS BUILDER</Text>
            <TouchableOpacity>
              <MaterialIcons name="add-circle" size={18} color={colors.primary} />
            </TouchableOpacity>
          </View>

          <View style={[styles.statusList, { borderColor: colors.outlineVariant }]}>
            {/* Initialized */}
            <View style={[styles.statusItem, { backgroundColor: colors.surfaceContainerLowest, borderBottomColor: colors.outlineVariant }]}>
              <MaterialIcons name="radio-button-checked" size={20} color={colors.onTertiaryContainer} style={styles.statusIcon} />
              <View style={styles.statusContent}>
                <Text style={[typography.labelCaps, { fontWeight: 'bold', color: colors.primary }]}>INITIALIZED</Text>
                <Text style={[typography.labelSm, { fontSize: 10, color: colors.onSurfaceVariant }]}>System boot & validation sequence</Text>
              </View>
              <MaterialIcons name="drag-handle" size={18} color={colors.outline} />
            </View>

            {/* Staging */}
            <View style={[styles.statusItem, { backgroundColor: colors.surfaceContainerLowest, borderBottomColor: colors.outlineVariant, borderLeftWidth: 4, borderLeftColor: colors.primary }]}>
              <MaterialIcons name="pending" size={20} color={colors.primary} style={styles.statusIcon} />
              <View style={styles.statusContent}>
                <Text style={[typography.labelCaps, { fontWeight: 'bold', color: colors.primary }]}>STAGING</Text>
                <Text style={[typography.labelSm, { fontSize: 10, color: colors.onSurfaceVariant }]}>Asset deployment to sandbox environment</Text>
              </View>
              <View style={[styles.activeBadge, { backgroundColor: colors.primary }]}>
                <Text style={[typography.labelCaps, { fontSize: 9, color: colors.onPrimary }]}>ACTIVE</Text>
              </View>
            </View>

            {/* Processing */}
            <View style={[styles.statusItem, { backgroundColor: colors.surfaceContainerLowest, borderBottomColor: colors.outlineVariant }]}>
              <MaterialIcons name="memory" size={20} color={colors.outline} style={styles.statusIcon} />
              <View style={styles.statusContent}>
                <Text style={[typography.labelCaps, { fontWeight: 'bold', color: colors.onSurfaceVariant }]}>PROCESSING</Text>
                <Text style={[typography.labelSm, { fontSize: 10, color: colors.outline }]}>Core computational load allocation</Text>
              </View>
              <MaterialIcons name="drag-handle" size={18} color={colors.outline} />
            </View>

            {/* Distribution */}
            <View style={[styles.statusItem, { backgroundColor: colors.surfaceContainerLowest, borderBottomColor: colors.outlineVariant }]}>
              <MaterialIcons name="hub" size={20} color={colors.outline} style={styles.statusIcon} />
              <View style={styles.statusContent}>
                <Text style={[typography.labelCaps, { fontWeight: 'bold', color: colors.onSurfaceVariant }]}>DISTRIBUTION</Text>
                <Text style={[typography.labelSm, { fontSize: 10, color: colors.outline }]}>External node synchronization</Text>
              </View>
              <MaterialIcons name="drag-handle" size={18} color={colors.outline} />
            </View>

            {/* Completed */}
            <View style={[styles.statusItem, { backgroundColor: colors.surfaceContainerLowest }]}>
              <MaterialIcons name="inventory-2" size={20} color={colors.outline} style={[styles.statusIcon, { opacity: 0.4 }]} />
              <View style={styles.statusContent}>
                <Text style={[typography.labelCaps, { fontWeight: 'bold', color: colors.outline }]}>COMPLETED</Text>
                <Text style={[typography.labelSm, { fontSize: 10, color: colors.outline, opacity: 0.5 }]}>Log generation & cold storage</Text>
              </View>
              <MaterialIcons name="drag-handle" size={18} color={colors.outline} />
            </View>
          </View>
        </View>

        {/* CTA Section */}
        <View style={styles.ctaSection}>
          <TouchableOpacity style={[styles.primaryBtn, { backgroundColor: colors.primary }]}>
            <Text style={[typography.labelCaps, { color: colors.onPrimary, fontWeight: 'bold' }]}>COMMIT CHANGES</Text>
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
          <MaterialIcons name="inventory-2" size={24} color={colors.onSecondaryFixedVariant} />
          <Text style={[typography.labelCaps, { color: colors.onSecondaryFixedVariant, marginTop: 4, fontSize: 10 }]}>ASSETS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navItem, { borderRightColor: colors.outlineVariant }]}>
          <MaterialIcons name="notifications-active" size={24} color={colors.onSecondaryFixedVariant} />
          <Text style={[typography.labelCaps, { color: colors.onSecondaryFixedVariant, marginTop: 4, fontSize: 10 }]}>ALERTS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navItem, { backgroundColor: colors.primary }]}>
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
  sliderTrackMock: {
    height: 2,
    width: '100%',
    position: 'relative',
    justifyContent: 'center',
    marginBottom: 8,
  },
  sliderThumbMock: {
    width: 16,
    height: 16,
    position: 'absolute',
    marginLeft: -8,
  },
  sliderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statusList: {
    borderWidth: 1,
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
  },
  ctaSection: {
    gap: 16, // gap-md
    paddingTop: 16, // pt-md
  },
  primaryBtn: {
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryBtn: {
    height: 48,
    borderRadius: 24,
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
