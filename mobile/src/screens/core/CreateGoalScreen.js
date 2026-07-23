import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, SafeAreaView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';

const CreateGoalScreen = ({ navigation }) => {
  const { colors, typography, spacing, borderRadius } = useTheme();
  const [priority, setPriority] = useState('MED');

  const renderPriorityButton = (label) => {
    const isActive = priority === label;
    return (
      <TouchableOpacity
        key={label}
        style={[
          styles.priorityBtn,
          isActive && { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant, borderWidth: 1 }
        ]}
        onPress={() => setPriority(label)}
      >
        <Text style={[typography.labelCaps, { color: isActive ? colors.primary : colors.secondary }]}>{label}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: colors.outlineVariant, backgroundColor: colors.surface }]}>
        <View style={styles.headerLeft}>
          <MaterialIcons name="terminal" size={24} color={colors.primary} />
          <Text style={[typography.labelCaps, { color: colors.primary, marginLeft: spacing.sm, letterSpacing: 2 }]}>MANDATE</Text>
        </View>
        <TouchableOpacity style={styles.accountBtn}>
          <MaterialIcons name="account-circle" size={24} color={colors.secondary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <View style={[styles.mainContent, { paddingHorizontal: spacing.md, paddingTop: spacing.lg }]}>
          
          <View style={{ marginBottom: spacing.xl }}>
            <Text style={[typography.labelCaps, { color: colors.onPrimaryContainer, marginBottom: spacing.xs }]}>SYSTEM_INITIALIZATION</Text>
            <Text style={[typography.headlineLgMobile, { color: colors.primary }]}>DEFINE_NEW_STRATEGIC_OBJECTIVE</Text>
          </View>

          <View style={styles.formSpace}>
            {/* 01 IDENTITY */}
            <View style={styles.formSection}>
              <View style={styles.sectionHeaderRow}>
                <Text style={[typography.labelCaps, { color: colors.secondary }]}>01 // IDENTITY</Text>
                <Text style={[typography.labelSm, { color: colors.onTertiaryContainer }]}>REQUIRED</Text>
              </View>
              <TextInput
                style={[styles.textInput, typography.labelSm, { borderBottomColor: colors.outlineVariant, color: colors.primary }]}
                placeholder="e.g. OPERATION_OVERFLOW_MITIGA"
                placeholderTextColor={colors.outlineVariant}
              />
            </View>

            {/* 02 STRATEGIC_CATEGORY */}
            <View style={styles.formSection}>
              <Text style={[typography.labelCaps, { color: colors.secondary, marginBottom: spacing.sm }]}>02 // STRATEGIC_CATEGORY</Text>
              <TouchableOpacity style={[styles.selectInput, { backgroundColor: colors.surfaceContainerLow, borderBottomColor: colors.outlineVariant }]}>
                <Text style={[typography.labelSm, { color: colors.primary }]}>SELECT_CATEGORY</Text>
                <MaterialIcons name="unfold-more" size={20} color={colors.secondary} />
              </TouchableOpacity>
            </View>

            {/* 03 PRIORITY_LEVEL */}
            <View style={styles.formSection}>
              <Text style={[typography.labelCaps, { color: colors.secondary, marginBottom: spacing.sm }]}>03 // PRIORITY_LEVEL</Text>
              <View style={[styles.priorityContainer, { backgroundColor: colors.surfaceContainerLow }]}>
                {['LOW', 'MED', 'CRIT'].map(renderPriorityButton)}
              </View>
            </View>

            {/* 04 TARGET_COMPLETION */}
            <View style={styles.formSection}>
              <Text style={[typography.labelCaps, { color: colors.secondary, marginBottom: spacing.sm }]}>04 // TARGET_COMPLETION</Text>
              <TouchableOpacity style={[styles.selectInput, { backgroundColor: 'transparent', borderBottomColor: colors.outlineVariant }]}>
                <Text style={[typography.labelSm, { color: colors.secondary }]}>YYYY-MM-DD</Text>
                <MaterialIcons name="calendar-today" size={20} color={colors.secondary} />
              </TouchableOpacity>
            </View>

            {/* 05 SUCCESS_METRICS */}
            <View style={styles.formSection}>
              <View style={styles.sectionHeaderRow}>
                <Text style={[typography.labelCaps, { color: colors.secondary }]}>05 // SUCCESS_METRICS</Text>
                <TouchableOpacity style={[styles.addBtn, { borderColor: colors.outlineVariant }]}>
                  <MaterialIcons name="add" size={20} color={colors.primary} />
                </TouchableOpacity>
              </View>
              
              <View style={styles.kpiList}>
                {/* KPI 1 */}
                <View style={[styles.kpiCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
                  <View>
                    <Text style={[typography.labelCaps, { color: colors.secondary, fontSize: 10, marginBottom: spacing.xs }]}>METRIC_01</Text>
                    <Text style={[typography.labelSm, { color: colors.primary, textTransform: 'uppercase' }]}>System Latency</Text>
                  </View>
                  <View style={styles.kpiRight}>
                    <Text style={[typography.labelCaps, { color: colors.onTertiaryContainer, fontSize: 10, marginBottom: spacing.xs }]}>TARGET</Text>
                    <Text style={[typography.labelSm, { color: colors.primary, fontWeight: 'bold' }]}>&lt; 150ms</Text>
                  </View>
                </View>
                
                {/* KPI 2 */}
                <View style={[styles.kpiCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
                  <View>
                    <Text style={[typography.labelCaps, { color: colors.secondary, fontSize: 10, marginBottom: spacing.xs }]}>METRIC_02</Text>
                    <Text style={[typography.labelSm, { color: colors.primary, textTransform: 'uppercase' }]}>User Retention</Text>
                  </View>
                  <View style={styles.kpiRight}>
                    <Text style={[typography.labelCaps, { color: colors.onTertiaryContainer, fontSize: 10, marginBottom: spacing.xs }]}>TARGET</Text>
                    <Text style={[typography.labelSm, { color: colors.primary, fontWeight: 'bold' }]}>&gt; 92.5%</Text>
                  </View>
                </View>
              </View>
            </View>

          </View>
        </View>
      </ScrollView>

      {/* Floating Action */}
      <View style={styles.fabContainer}>
        <TouchableOpacity style={[styles.fab, { backgroundColor: colors.primary, borderRadius: borderRadius.full }]}>
          <MaterialIcons name="bolt" size={24} color={colors.onPrimary} />
          <Text style={[typography.labelCaps, { color: colors.onPrimary, marginLeft: spacing.sm, letterSpacing: 2 }]}>DEPLOY_OBJECTIVE</Text>
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
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  accountBtn: {
    padding: 8,
    borderRadius: 20,
  },
  container: {
    flexGrow: 1,
    paddingBottom: 160,
  },
  mainContent: {},
  formSpace: {
    gap: 32,
  },
  formSection: {},
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  textInput: {
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  selectInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  priorityContainer: {
    flexDirection: 'row',
    borderRadius: 32,
    padding: 4,
  },
  priorityBtn: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 32,
  },
  addBtn: {
    padding: 4,
    borderWidth: 1,
    borderRadius: 4,
  },
  kpiList: {
    gap: 8,
    marginTop: 8,
  },
  kpiCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
    borderRadius: 8,
  },
  kpiRight: {
    alignItems: 'flex-end',
  },
  fabContainer: {
    position: 'absolute',
    bottom: 80, // Above nav bar
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    zIndex: 40,
  },
  fab: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  }
});

export default CreateGoalScreen;
