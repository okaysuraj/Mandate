import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, TextInput, Image, Switch } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

const InitialConfigurationScreen = ({ navigation }) => {
  const { colors, typography, spacing, borderRadius } = useTheme();

  const [workspaceType, setWorkspaceType] = useState('manufacturing');
  const [criticalAlerts, setCriticalAlerts] = useState(true);
  const [dailyReports, setDailyReports] = useState(false);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      {/* TopAppBar */}
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.outlineVariant }]}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.iconBtn}>
            <MaterialIcons name="menu" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>
        <Text style={[typography.headlineLgMobile, { color: colors.primary, fontWeight: 'bold', letterSpacing: -1 }]}>MANDATE</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconBtn}>
            <MaterialIcons name="account-circle" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        
        {/* Progress Indicator */}
        <View style={styles.section}>
          <View style={styles.progressHeader}>
            <View>
              <Text style={[typography.labelCaps, { color: colors.secondary }]}>INITIAL CONFIGURATION</Text>
              <Text style={[typography.headlineLgMobile, { color: colors.primary, marginTop: 4 }]}>System Setup</Text>
            </View>
            <Text style={[typography.labelSm, { color: colors.primary, fontWeight: 'bold' }]}>Step 01 / 03</Text>
          </View>
          <View style={[styles.progressBarBg, { backgroundColor: colors.surfaceContainer }]}>
            <View style={[styles.progressBarFill, { backgroundColor: colors.primary, width: '33.33%' }]} />
          </View>
        </View>

        {/* Operational Window Group */}
        <View style={styles.section}>
          <View style={styles.sectionTitle}>
            <MaterialIcons name="schedule" size={16} color={colors.secondary} />
            <Text style={[typography.labelCaps, { color: colors.secondary }]}>OPERATIONAL WINDOW</Text>
          </View>
          <View style={[styles.bentoGroup, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
            <View style={styles.timeInputWrapper}>
              <Text style={[typography.labelSm, { color: colors.secondary, marginBottom: 4 }]}>START TIME</Text>
              <TextInput 
                style={[typography.headlineLgMobile, styles.timeInput, { borderBottomColor: colors.outlineVariant, color: colors.primary }]}
                defaultValue="08:00"
              />
            </View>
            <View style={styles.timeInputWrapper}>
              <Text style={[typography.labelSm, { color: colors.secondary, marginBottom: 4 }]}>END TIME</Text>
              <TextInput 
                style={[typography.headlineLgMobile, styles.timeInput, { borderBottomColor: colors.outlineVariant, color: colors.primary }]}
                defaultValue="18:00"
              />
            </View>
          </View>
        </View>

        {/* Workspace Type Selection */}
        <View style={styles.section}>
          <View style={styles.sectionTitle}>
            <MaterialIcons name="factory" size={16} color={colors.secondary} />
            <Text style={[typography.labelCaps, { color: colors.secondary }]}>WORKSPACE TYPE</Text>
          </View>
          <View style={styles.workspaceGrid}>
            
            <TouchableOpacity 
              style={[
                styles.workspaceOption, 
                { backgroundColor: colors.surfaceContainerLowest },
                workspaceType === 'manufacturing' ? { borderColor: colors.primary, borderWidth: 2 } : { borderColor: colors.outlineVariant }
              ]}
              onPress={() => setWorkspaceType('manufacturing')}
            >
              <View style={styles.workspaceOptionLeft}>
                <MaterialIcons name="precision-manufacturing" size={24} color={workspaceType === 'manufacturing' ? colors.primary : colors.secondary} />
                <View>
                  <Text style={[typography.labelCaps, { color: workspaceType === 'manufacturing' ? colors.primary : colors.secondary }]}>MANUFACTURING</Text>
                  <Text style={[typography.labelSm, { color: colors.secondary, marginTop: 4, fontSize: 10 }]}>Heavy industry & automation</Text>
                </View>
              </View>
              {workspaceType === 'manufacturing' && (
                <MaterialIcons name="check-circle" size={24} color={colors.primary} />
              )}
            </TouchableOpacity>

            <TouchableOpacity 
              style={[
                styles.workspaceOption, 
                { backgroundColor: colors.surfaceContainerLowest },
                workspaceType === 'logistics' ? { borderColor: colors.primary, borderWidth: 2 } : { borderColor: colors.outlineVariant }
              ]}
              onPress={() => setWorkspaceType('logistics')}
            >
              <View style={styles.workspaceOptionLeft}>
                <MaterialIcons name="inventory-2" size={24} color={workspaceType === 'logistics' ? colors.primary : colors.secondary} />
                <View>
                  <Text style={[typography.labelCaps, { color: workspaceType === 'logistics' ? colors.primary : colors.secondary }]}>LOGISTICS</Text>
                  <Text style={[typography.labelSm, { color: colors.secondary, marginTop: 4, fontSize: 10 }]}>Storage & distribution nodes</Text>
                </View>
              </View>
              {workspaceType === 'logistics' && (
                <MaterialIcons name="check-circle" size={24} color={colors.primary} />
              )}
            </TouchableOpacity>

            <TouchableOpacity 
              style={[
                styles.workspaceOption, 
                { backgroundColor: colors.surfaceContainerLowest },
                workspaceType === 'laboratory' ? { borderColor: colors.primary, borderWidth: 2 } : { borderColor: colors.outlineVariant }
              ]}
              onPress={() => setWorkspaceType('laboratory')}
            >
              <View style={styles.workspaceOptionLeft}>
                <MaterialIcons name="biotech" size={24} color={workspaceType === 'laboratory' ? colors.primary : colors.secondary} />
                <View>
                  <Text style={[typography.labelCaps, { color: workspaceType === 'laboratory' ? colors.primary : colors.secondary }]}>LABORATORY</Text>
                  <Text style={[typography.labelSm, { color: colors.secondary, marginTop: 4, fontSize: 10 }]}>Controlled environments</Text>
                </View>
              </View>
              {workspaceType === 'laboratory' && (
                <MaterialIcons name="check-circle" size={24} color={colors.primary} />
              )}
            </TouchableOpacity>

          </View>
        </View>

        {/* Alert Protocols Group */}
        <View style={styles.section}>
          <View style={styles.sectionTitle}>
            <MaterialIcons name="notifications-active" size={16} color={colors.secondary} />
            <Text style={[typography.labelCaps, { color: colors.secondary }]}>ALERT PROTOCOLS</Text>
          </View>
          <View style={[styles.protocolsContainer, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
            
            <View style={[styles.protocolRow, { borderBottomColor: colors.outlineVariant, borderBottomWidth: 1 }]}>
              <View style={styles.protocolLeft}>
                <Text style={[typography.labelCaps, { color: colors.primary }]}>CRITICAL ALERTS</Text>
                <Text style={[typography.labelSm, { color: colors.secondary }]}>Instant escalation for level 5 events</Text>
              </View>
              <Switch
                value={criticalAlerts}
                onValueChange={setCriticalAlerts}
                trackColor={{ false: colors.surfaceContainerHigh, true: colors.primary }}
                thumbColor={colors.onPrimary}
              />
            </View>

            <View style={styles.protocolRow}>
              <View style={styles.protocolLeft}>
                <Text style={[typography.labelCaps, { color: colors.primary }]}>DAILY REPORTS</Text>
                <Text style={[typography.labelSm, { color: colors.secondary }]}>Automated summaries at window close</Text>
              </View>
              <Switch
                value={dailyReports}
                onValueChange={setDailyReports}
                trackColor={{ false: colors.surfaceContainerHigh, true: colors.primary }}
                thumbColor={colors.onPrimary}
              />
            </View>

          </View>
        </View>

        {/* Save Action */}
        <View style={styles.saveSection}>
          <TouchableOpacity style={[styles.saveButton, { backgroundColor: colors.primary }]}>
            <Text style={[typography.labelCaps, { color: colors.onPrimary, letterSpacing: 2 }]}>SAVE CONFIGURATION</Text>
          </TouchableOpacity>
          <Text style={[typography.labelSm, { color: colors.secondary, textAlign: 'center', marginTop: 16 }]}>
            You can modify these parameters later in System Settings.
          </Text>
        </View>

        {/* Visual Anchor */}
        <View style={[styles.visualAnchor, { borderColor: colors.outlineVariant }]}>
          <View style={[styles.overlay, { backgroundColor: colors.primary, opacity: 0.05 }]} />
          <Image
            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBD28itYlwaVJc7c-6_0zmV_3zJe_2hjFKkb-6ukJ6tbGIi9jypNc-8vGjQl2C3mAzq7dXd2S8GH4gEE9jrdKtrvYZILo4RIYmm0u160NxB7Nc2_kamexnAqiawgv-zDpWrQQoZzE5GMBoOsaVp-2UUUJcnN_hXGiGE2Yh0ilx_p8EJVSfRPbNymskj3IHfhhe94PZ5v80v1Z4nl3UhSfnVZc7tGGXjRhHvW4uByOCrjvV8ShwqW13fSw' }}
            style={[styles.anchorImage, { opacity: 0.8 }]}
          />
          <View style={styles.anchorBadgeContainer}>
            <View style={[styles.anchorBadge, { backgroundColor: colors.primary }]}>
              <Text style={[typography.labelCaps, { color: colors.onPrimary, fontSize: 10 }]}>AUTH_ID: MDT-992</Text>
            </View>
          </View>
        </View>

      </ScrollView>

      {/* Bottom Nav */}
      <View style={[styles.bottomNav, { backgroundColor: colors.surface, borderTopColor: colors.outlineVariant }]}>
        <TouchableOpacity style={[styles.navItemActive, { borderTopColor: colors.primary }]}>
          <MaterialIcons name="grid-view" size={24} color={colors.primary} />
          <Text style={[typography.labelSm, { color: colors.primary, marginTop: 4, fontSize: 10 }]}>DASHBOARD</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="precision-manufacturing" size={24} color={colors.secondary} />
          <Text style={[typography.labelSm, { color: colors.secondary, marginTop: 4, fontSize: 10 }]}>ASSETS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="error" size={24} color={colors.secondary} />
          <Text style={[typography.labelSm, { color: colors.secondary, marginTop: 4, fontSize: 10 }]}>ALERTS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="settings" size={24} color={colors.secondary} />
          <Text style={[typography.labelSm, { color: colors.secondary, marginTop: 4, fontSize: 10 }]}>SYSTEM</Text>
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
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBtn: {
    padding: 8,
    marginHorizontal: -8,
  },
  container: {
    flexGrow: 1,
    padding: 24, // px-gutter
    paddingBottom: 128,
    gap: 24, // space-y-xl (more or less)
  },
  section: {
    width: '100%',
    marginBottom: 8,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 8,
  },
  progressBarBg: {
    height: 4,
    width: '100%',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
  },
  sectionTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 16,
  },
  bentoGroup: {
    flexDirection: 'row',
    borderWidth: 1,
    padding: 32, // p-lg
  },
  timeInputWrapper: {
    flex: 1,
  },
  timeInput: {
    borderBottomWidth: 1,
    paddingVertical: 8, // py-sm
    marginRight: 16,
  },
  workspaceGrid: {
    gap: 8, // gap-sm
  },
  workspaceOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16, // p-md
    borderWidth: 1,
  },
  workspaceOptionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  protocolsContainer: {
    borderWidth: 1,
  },
  protocolRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 32, // p-lg
  },
  protocolLeft: {
    flex: 1,
    paddingRight: 16,
  },
  saveSection: {
    marginTop: 32,
  },
  saveButton: {
    width: '100%',
    paddingVertical: 32, // py-lg
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  visualAnchor: {
    height: 192, // h-48
    width: '100%',
    borderWidth: 1,
    marginTop: 64, // mt-xl
    position: 'relative',
    overflow: 'hidden',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 10,
  },
  anchorImage: {
    width: '100%',
    height: '100%',
  },
  anchorBadgeContainer: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    zIndex: 20,
  },
  anchorBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 64, // h-16
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 8,
    borderTopWidth: 2,
  }
});

export default InitialConfigurationScreen;
