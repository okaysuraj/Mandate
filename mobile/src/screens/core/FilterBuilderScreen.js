import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';

const FilterBuilderScreen = ({ navigation }) => {
  const { colors, typography, spacing, borderRadius } = useTheme();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.surface }]}>
      {/* TopAppBar */}
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.outlineVariant }]}>
        <View style={styles.headerLeft}>
          <MaterialIcons name="terminal" size={24} color={colors.primary} style={{ marginRight: 8 }} />
          <Text style={[typography.labelCaps, { color: colors.primary, letterSpacing: 2 }]}>MANDATE</Text>
        </View>
        <TouchableOpacity style={styles.iconBtn}>
          <MaterialIcons name="account-circle" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {/* Content Header */}
        <View style={[styles.contentHeader, { paddingHorizontal: spacing.md, paddingTop: spacing.lg, paddingBottom: spacing.md }]}>
          <Text style={[typography.headlineLgMobile, { color: colors.primary }]}>Filter Builder</Text>
          <Text style={[typography.bodyMd, { color: colors.secondary, marginTop: 4 }]}>Optimize stream processing logic.</Text>
        </View>

        {/* Builder Interface */}
        <View style={[styles.builderContainer, { paddingHorizontal: spacing.md }]}>
          
          {/* Step 1: Logic Configuration */}
          <View style={[styles.bentoCard, { borderColor: colors.primary, borderWidth: 2 }]}>
            <View style={styles.cardHeader}>
              <Text style={[typography.labelCaps, { color: colors.onPrimaryFixedVariant }]}>STEP 01 // LOGIC</Text>
              <View style={[styles.pillTab, { backgroundColor: colors.primary }]}>
                <Text style={[typography.labelCaps, { color: colors.onPrimary, fontSize: 10 }]}>ACTIVE</Text>
              </View>
            </View>

            <View style={styles.rootOperatorContainer}>
              <Text style={[typography.labelCaps, { color: colors.secondary, fontSize: 10, marginBottom: 4 }]}>ROOT OPERATOR</Text>
              <View style={[styles.operatorBox, { backgroundColor: colors.surfaceContainerLow, borderColor: colors.outlineVariant }]}>
                <Text style={[typography.labelSm, { color: colors.primary }]}>IF ALL (AND)</Text>
                <MaterialIcons name="unfold-more" size={16} color={colors.primary} />
              </View>
            </View>

            <View style={styles.conditionsContainer}>
              {/* Condition Block 1 */}
              <View style={[styles.conditionBlock, { backgroundColor: colors.surfaceContainerLowest, borderLeftColor: colors.primary }]}>
                <View style={styles.conditionHeader}>
                  <Text style={[typography.labelCaps, { color: colors.primary, fontSize: 10 }]}>CONDITION_0A</Text>
                  <MaterialIcons name="delete" size={16} color={colors.error} />
                </View>
                <View style={styles.conditionFields}>
                  <View style={[styles.conditionField, { backgroundColor: colors.surfaceContainer, borderColor: colors.outlineVariant }]}>
                    <Text style={[typography.labelSm, { color: colors.primary }]}>payload.status_code</Text>
                    <MaterialIcons name="keyboard-arrow-down" size={14} color={colors.primary} />
                  </View>
                  <View style={[styles.conditionField, { backgroundColor: colors.surfaceContainer, borderColor: colors.outlineVariant }]}>
                    <Text style={[typography.labelSm, { color: colors.primary }]}>EQUALS</Text>
                    <MaterialIcons name="keyboard-arrow-down" size={14} color={colors.primary} />
                  </View>
                  <View style={[styles.conditionValue, { backgroundColor: colors.surfaceContainerLow, borderColor: colors.outlineVariant }]}>
                    <Text style={[typography.labelSm, { color: colors.primary }]}>200</Text>
                  </View>
                </View>
              </View>

              {/* Condition Block 2 */}
              <View style={[styles.conditionBlock, { backgroundColor: colors.surfaceContainerLowest, borderLeftColor: colors.outlineVariant, opacity: 0.8 }]}>
                <View style={styles.conditionHeader}>
                  <Text style={[typography.labelCaps, { color: colors.secondary, fontSize: 10 }]}>CONDITION_0B</Text>
                  <MaterialIcons name="delete" size={16} color={colors.error} />
                </View>
                <View style={styles.conditionFields}>
                  <View style={[styles.conditionField, { backgroundColor: colors.surfaceContainer, borderColor: colors.outlineVariant }]}>
                    <Text style={[typography.labelSm, { color: colors.primary }]}>headers.content_type</Text>
                    <MaterialIcons name="keyboard-arrow-down" size={14} color={colors.primary} />
                  </View>
                  <View style={[styles.conditionField, { backgroundColor: colors.surfaceContainer, borderColor: colors.outlineVariant }]}>
                    <Text style={[typography.labelSm, { color: colors.primary }]}>CONTAINS</Text>
                    <MaterialIcons name="keyboard-arrow-down" size={14} color={colors.primary} />
                  </View>
                  <View style={[styles.conditionValue, { backgroundColor: colors.surfaceContainerLow, borderColor: colors.outlineVariant }]}>
                    <Text style={[typography.labelSm, { color: colors.primary }]}>application/json</Text>
                  </View>
                </View>
              </View>

              <TouchableOpacity style={[styles.addConditionBtn, { borderColor: colors.outline }]}>
                <MaterialIcons name="add" size={16} color={colors.secondary} />
                <Text style={[typography.labelCaps, { color: colors.secondary, marginLeft: 4 }]}>ADD CONDITION</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Step 2: Real-time Analytics Preview */}
          <View style={[styles.bentoCard, { borderColor: colors.outlineVariant }]}>
            <View style={styles.cardHeader}>
              <Text style={[typography.labelCaps, { color: colors.onPrimaryFixedVariant }]}>STEP 02 // ANALYTICS</Text>
              <View style={[styles.pillTabOutline, { borderColor: colors.outline }]}>
                <Text style={[typography.labelCaps, { color: colors.secondary, fontSize: 10 }]}>PREVIEW</Text>
              </View>
            </View>

            <View style={styles.analyticsGrid}>
              <View style={styles.analyticsItem}>
                <Text style={[typography.labelCaps, { color: colors.secondary, fontSize: 9 }]}>ACTIVE STREAM</Text>
                <Text style={[typography.labelSm, { color: colors.primary }]}>12.4k/s</Text>
              </View>
              <View style={styles.analyticsItem}>
                <Text style={[typography.labelCaps, { color: colors.secondary, fontSize: 9 }]}>MATCHING</Text>
                <Text style={[typography.labelSm, { color: colors.onTertiaryContainer }]}>8.1k/s</Text>
              </View>
              <View style={styles.analyticsItem}>
                <Text style={[typography.labelCaps, { color: colors.secondary, fontSize: 9 }]}>DROPPED</Text>
                <Text style={[typography.labelSm, { color: colors.error }]}>4.3k/s</Text>
              </View>
            </View>

            {/* Latency Probability Density Chart Placeholder */}
            <View style={[styles.chartContainer, { backgroundColor: colors.surfaceContainerLow }]}>
              <View style={styles.chartBars}>
                {[10, 20, 30, 40, 50, 60, 40, 20, 10].map((opacity, idx) => (
                  <View key={idx} style={[styles.chartBar, { backgroundColor: colors.primary, opacity: opacity / 100, height: `${opacity}%` }]} />
                ))}
              </View>
              <View style={styles.chartOverlay}>
                <Text style={[typography.labelCaps, { color: colors.secondary, opacity: 0.5 }]}>LATENCY PROBABILITY DENSITY</Text>
              </View>
            </View>
          </View>

          {/* Action Area */}
          <View style={styles.actionArea}>
            <TouchableOpacity style={[styles.deployBtn, { backgroundColor: colors.primary }]}>
              <Text style={[typography.labelCaps, { color: colors.onPrimary, letterSpacing: 2 }]}>DEPLOY TO CLUSTER</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.draftBtn, { borderColor: colors.outlineVariant }]}>
              <Text style={[typography.labelCaps, { color: colors.secondary }]}>SAVE DRAFT (LOCAL)</Text>
            </TouchableOpacity>
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
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBtn: {
    padding: 8,
  },
  container: {
    flexGrow: 1,
    paddingBottom: 100, // Bottom nav
  },
  contentHeader: {},
  builderContainer: {
    gap: 16,
    paddingBottom: 32,
  },
  bentoCard: {
    backgroundColor: '#fff',
    borderWidth: 1,
    padding: 24,
    gap: 24, // spacing between main sections in card
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pillTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 9999,
  },
  pillTabOutline: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 9999,
    borderWidth: 1,
  },
  rootOperatorContainer: {
    gap: 8,
  },
  operatorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 8,
    borderWidth: 1,
  },
  conditionsContainer: {
    gap: 16,
    marginTop: 16,
  },
  conditionBlock: {
    padding: 16,
    borderLeftWidth: 2,
    gap: 8,
  },
  conditionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  conditionFields: {
    gap: 4,
  },
  conditionField: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    borderWidth: 1,
  },
  conditionValue: {
    padding: 8,
    borderWidth: 1,
  },
  addConditionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderWidth: 1,
    borderStyle: 'dashed',
  },
  analyticsGrid: {
    flexDirection: 'row',
    gap: 8,
  },
  analyticsItem: {
    flex: 1,
    gap: 4,
  },
  chartContainer: {
    height: 192,
    position: 'relative',
    overflow: 'hidden',
    marginTop: 16,
  },
  chartBars: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    paddingBottom: 8,
    height: '100%',
    gap: 4,
  },
  chartBar: {
    flex: 1,
  },
  chartOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionArea: {
    gap: 8,
    marginTop: 16,
  },
  deployBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24,
    borderRadius: 32,
  },
  draftBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 32,
    borderWidth: 1,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'stretch', // Fill height for the active tab background
    height: 64,
    borderTopWidth: 1,
    zIndex: 50,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navItemActive: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 2,
  }
});

export default FilterBuilderScreen;
