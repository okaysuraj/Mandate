import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import Slider from '@react-native-community/slider';

const PreferencesBehaviorScreen = ({ navigation }) => {
  const { colors, typography, spacing, borderRadius } = useTheme();

  const [toggles, setToggles] = useState({
    dashboard: true,
    map: false,
    logs: false,
  });

  const [telemetry, setTelemetry] = useState(250);
  const [health, setHealth] = useState(5);

  const [matrix, setMatrix] = useState({
    critical: 'alert',
    warn: 'log',
    info: 'silent',
  });

  const toggleSwitch = (key) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleMatrixSelect = (event, type) => {
    setMatrix(prev => ({ ...prev, [event]: type }));
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.surface }]}>
      {/* TopAppBar */}
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.outlineVariant }]}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.iconBtn}>
            <MaterialIcons name="menu" size={24} color={colors.primary} />
          </TouchableOpacity>
          <Text style={[typography.headlineLgMobile, { color: colors.primary, fontWeight: 'bold', letterSpacing: -1, marginLeft: 8 }]}>MANDATE</Text>
        </View>
        <View style={styles.headerRight}>
          <View style={[styles.syncBadge, { backgroundColor: colors.surfaceContainerLow }]}>
            <MaterialIcons name="sync" size={14} color={colors.onTertiaryContainer} />
            <Text style={[typography.labelCaps, { color: colors.onTertiaryContainer, marginLeft: 4 }]}>LIVE</Text>
          </View>
          <TouchableOpacity style={styles.iconBtn}>
            <MaterialIcons name="account-circle" size={24} color={colors.secondary} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        
        {/* Configuration Status Header */}
        <View style={[styles.configHeader, { backgroundColor: colors.surfaceContainerLowest }]}>
          <View style={styles.configHeaderContent}>
            <View>
              <Text style={[typography.labelCaps, { color: colors.secondary, marginBottom: 4 }]}>SYSTEM PARAMETERS</Text>
              <Text style={[typography.headlineLgMobile, { color: colors.primary }]}>Preferences & Behavior</Text>
            </View>
            <View>
              <Text style={[typography.labelSm, { color: colors.onTertiaryContainer }]}>CONFIG_SYNC_OK</Text>
            </View>
          </View>
          <View style={[styles.progressBar, { backgroundColor: colors.surfaceContainer }]}>
            <View style={[styles.progressFill, { backgroundColor: colors.primary, width: '100%' }]} />
          </View>
        </View>

        {/* Dense Vertical Stack */}
        <View style={[styles.stackContainer, { borderTopColor: colors.outlineVariant }]}>
          
          {/* Workspace Views */}
          <View style={[styles.bentoCard, { borderBottomColor: colors.outlineVariant }]}>
            <View style={styles.cardHeader}>
              <View style={styles.cardHeaderLeft}>
                <MaterialIcons name="grid-view" size={20} color={colors.primary} />
                <Text style={[typography.labelCaps, { color: colors.primary, marginLeft: 8 }]}>WORKSPACE VIEWS</Text>
              </View>
              <Text style={[typography.labelSm, { color: colors.secondary }]}>ID: 0x44A2</Text>
            </View>

            <View style={styles.toggleList}>
              <View style={[styles.toggleRow, { borderColor: colors.outlineVariant, backgroundColor: toggles.dashboard ? colors.surfaceContainerLow : 'transparent' }]}>
                <Text style={[typography.bodyMd, { color: toggles.dashboard ? colors.primary : colors.secondary }]}>Industrial Dashboard</Text>
                <TouchableOpacity 
                  style={[styles.toggleTrack, toggles.dashboard ? { backgroundColor: colors.primary } : { backgroundColor: colors.secondaryContainer }]}
                  onPress={() => toggleSwitch('dashboard')}
                >
                  <View style={[styles.toggleThumb, toggles.dashboard ? { alignSelf: 'flex-end' } : { alignSelf: 'flex-start' }]} />
                </TouchableOpacity>
              </View>

              <View style={[styles.toggleRow, { borderColor: colors.outlineVariant, backgroundColor: toggles.map ? colors.surfaceContainerLow : 'transparent' }]}>
                <Text style={[typography.bodyMd, { color: toggles.map ? colors.primary : colors.secondary }]}>Asset Topology Map</Text>
                <TouchableOpacity 
                  style={[styles.toggleTrack, toggles.map ? { backgroundColor: colors.primary } : { backgroundColor: colors.secondaryContainer }]}
                  onPress={() => toggleSwitch('map')}
                >
                  <View style={[styles.toggleThumb, toggles.map ? { alignSelf: 'flex-end' } : { alignSelf: 'flex-start' }]} />
                </TouchableOpacity>
              </View>

              <View style={[styles.toggleRow, { borderColor: colors.outlineVariant, backgroundColor: toggles.logs ? colors.surfaceContainerLow : 'transparent' }]}>
                <Text style={[typography.bodyMd, { color: toggles.logs ? colors.primary : colors.secondary }]}>Log Verbosity Stream</Text>
                <TouchableOpacity 
                  style={[styles.toggleTrack, toggles.logs ? { backgroundColor: colors.primary } : { backgroundColor: colors.secondaryContainer }]}
                  onPress={() => toggleSwitch('logs')}
                >
                  <View style={[styles.toggleThumb, toggles.logs ? { alignSelf: 'flex-end' } : { alignSelf: 'flex-start' }]} />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Polling Intervals */}
          <View style={[styles.bentoCard, { borderBottomColor: colors.outlineVariant }]}>
            <View style={styles.cardHeader}>
              <View style={styles.cardHeaderLeft}>
                <MaterialIcons name="timer" size={20} color={colors.primary} />
                <Text style={[typography.labelCaps, { color: colors.primary, marginLeft: 8 }]}>POLLING INTERVALS</Text>
              </View>
              <Text style={[typography.labelSm, { color: colors.onTertiaryContainer }]}>ACTIVE</Text>
            </View>

            <View style={styles.sliderSection}>
              <View style={styles.sliderItem}>
                <View style={styles.sliderLabels}>
                  <Text style={[typography.labelSm, { color: colors.primary }]}>TELEMETRY_REFRESH</Text>
                  <Text style={[typography.labelSm, { color: colors.primary, fontWeight: 'bold' }]}>{telemetry}ms</Text>
                </View>
                {/* Note: In a real Expo project, import @react-native-community/slider. Using a simple view here to approximate. */}
                <View style={[styles.sliderTrackMock, { backgroundColor: colors.surfaceContainer }]}>
                  <View style={[styles.sliderFillMock, { backgroundColor: colors.primary, width: `${(telemetry - 100) / (2000 - 100) * 100}%` }]} />
                  <View style={[styles.sliderThumbMock, { backgroundColor: colors.primary, left: `${(telemetry - 100) / (2000 - 100) * 100}%` }]} />
                </View>
              </View>

              <View style={styles.sliderItem}>
                <View style={styles.sliderLabels}>
                  <Text style={[typography.labelSm, { color: colors.primary }]}>SYSTEM_HEALTH_CHECK</Text>
                  <Text style={[typography.labelSm, { color: colors.primary, fontWeight: 'bold' }]}>{health}s</Text>
                </View>
                <View style={[styles.sliderTrackMock, { backgroundColor: colors.surfaceContainer }]}>
                  <View style={[styles.sliderFillMock, { backgroundColor: colors.primary, width: `${(health - 1) / (60 - 1) * 100}%` }]} />
                  <View style={[styles.sliderThumbMock, { backgroundColor: colors.primary, left: `${(health - 1) / (60 - 1) * 100}%` }]} />
                </View>
              </View>
            </View>
          </View>

          {/* Notification Verbosity Matrix */}
          <View style={[styles.bentoCard, { borderBottomColor: colors.outlineVariant }]}>
            <View style={styles.cardHeader}>
              <View style={styles.cardHeaderLeft}>
                <MaterialIcons name="notification-important" size={20} color={colors.primary} />
                <Text style={[typography.labelCaps, { color: colors.primary, marginLeft: 8 }]}>VERBOSITY MATRIX</Text>
              </View>
            </View>

            <View style={styles.matrixTable}>
              <View style={[styles.matrixHeaderRow, { borderBottomColor: colors.outlineVariant }]}>
                <View style={styles.matrixCol1}><Text style={[typography.labelCaps, { color: colors.secondary }]}>EVENT</Text></View>
                <View style={styles.matrixColIcon}><Text style={[typography.labelCaps, { color: colors.secondary, textAlign: 'center' }]}>SILENT</Text></View>
                <View style={styles.matrixColIcon}><Text style={[typography.labelCaps, { color: colors.secondary, textAlign: 'center' }]}>LOG</Text></View>
                <View style={styles.matrixColIcon}><Text style={[typography.labelCaps, { color: colors.secondary, textAlign: 'center' }]}>ALERT</Text></View>
              </View>

              {/* Critical */}
              <View style={[styles.matrixRow, { borderBottomColor: colors.surfaceContainerHigh }]}>
                <View style={styles.matrixCol1}><Text style={[typography.labelSm, { color: colors.primary }]}>CRITICAL_FAIL</Text></View>
                <TouchableOpacity style={styles.matrixColIcon} onPress={() => handleMatrixSelect('critical', 'silent')}>
                  <View style={[styles.matrixBox, matrix.critical === 'silent' ? { backgroundColor: colors.primary, borderColor: colors.primary } : { borderColor: colors.outline }]} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.matrixColIcon} onPress={() => handleMatrixSelect('critical', 'log')}>
                  <View style={[styles.matrixBox, matrix.critical === 'log' ? { backgroundColor: colors.primary, borderColor: colors.primary } : { borderColor: colors.outline }]} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.matrixColIcon} onPress={() => handleMatrixSelect('critical', 'alert')}>
                  <View style={[styles.matrixBox, matrix.critical === 'alert' ? { backgroundColor: colors.primary, borderColor: colors.primary } : { borderColor: colors.outline }]} />
                </TouchableOpacity>
              </View>

              {/* Warn */}
              <View style={[styles.matrixRow, { borderBottomColor: colors.surfaceContainerHigh }]}>
                <View style={styles.matrixCol1}><Text style={[typography.labelSm, { color: colors.primary }]}>WARN_THRESHOLD</Text></View>
                <TouchableOpacity style={styles.matrixColIcon} onPress={() => handleMatrixSelect('warn', 'silent')}>
                  <View style={[styles.matrixBox, matrix.warn === 'silent' ? { backgroundColor: colors.primary, borderColor: colors.primary } : { borderColor: colors.outline }]} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.matrixColIcon} onPress={() => handleMatrixSelect('warn', 'log')}>
                  <View style={[styles.matrixBox, matrix.warn === 'log' ? { backgroundColor: colors.primary, borderColor: colors.primary } : { borderColor: colors.outline }]} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.matrixColIcon} onPress={() => handleMatrixSelect('warn', 'alert')}>
                  <View style={[styles.matrixBox, matrix.warn === 'alert' ? { backgroundColor: colors.primary, borderColor: colors.primary } : { borderColor: colors.outline }]} />
                </TouchableOpacity>
              </View>

              {/* Info */}
              <View style={[styles.matrixRow, { borderBottomColor: colors.surfaceContainerHigh }]}>
                <View style={styles.matrixCol1}><Text style={[typography.labelSm, { color: colors.primary }]}>INFO_STREAM</Text></View>
                <TouchableOpacity style={styles.matrixColIcon} onPress={() => handleMatrixSelect('info', 'silent')}>
                  <View style={[styles.matrixBox, matrix.info === 'silent' ? { backgroundColor: colors.primary, borderColor: colors.primary } : { borderColor: colors.outline }]} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.matrixColIcon} onPress={() => handleMatrixSelect('info', 'log')}>
                  <View style={[styles.matrixBox, matrix.info === 'log' ? { backgroundColor: colors.primary, borderColor: colors.primary } : { borderColor: colors.outline }]} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.matrixColIcon} onPress={() => handleMatrixSelect('info', 'alert')}>
                  <View style={[styles.matrixBox, matrix.info === 'alert' ? { backgroundColor: colors.primary, borderColor: colors.primary } : { borderColor: colors.outline }]} />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Visual Feedback Animation */}
          <View style={[styles.feedbackSection, { backgroundColor: colors.surface, borderBottomColor: colors.outlineVariant }]}>
            <MaterialIcons name="cloud-sync" size={64} color={colors.primaryFixedDim} style={{ marginBottom: 16 }} />
            <Text style={[typography.labelCaps, { color: colors.secondary, marginBottom: 4 }]}>REAL-TIME SYNC ENGINE</Text>
            <Text style={[typography.bodyMd, { color: colors.onSurfaceVariant, textAlign: 'center', maxWidth: 280 }]}>
              Your configuration is mirrored across all active terminal instances.
            </Text>
          </View>
          
        </View>

        {/* Footer */}
        <View style={[styles.footer, { backgroundColor: colors.surfaceContainer }]}>
          <Text style={[typography.labelSm, { color: colors.secondary, textTransform: 'uppercase', marginBottom: 16 }]}>© 2024 MANDATE INDUSTRIAL</Text>
          <View style={styles.footerLinks}>
            <Text style={[typography.labelSm, { color: colors.secondary }]}>Privacy</Text>
            <Text style={[typography.labelSm, { color: colors.secondary }]}>Terms</Text>
            <Text style={[typography.labelSm, { color: colors.secondary }]}>Support</Text>
          </View>
        </View>

      </ScrollView>

      {/* Bottom Nav */}
      <View style={[styles.bottomNav, { backgroundColor: colors.surface, borderTopColor: colors.outlineVariant }]}>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="grid-view" size={24} color={colors.secondary} />
          <Text style={[typography.labelSm, { color: colors.secondary, marginTop: 4, fontSize: 10, textTransform: 'uppercase' }]}>DASHBOARD</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="precision-manufacturing" size={24} color={colors.secondary} />
          <Text style={[typography.labelSm, { color: colors.secondary, marginTop: 4, fontSize: 10, textTransform: 'uppercase' }]}>ASSETS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="error" size={24} color={colors.secondary} />
          <Text style={[typography.labelSm, { color: colors.secondary, marginTop: 4, fontSize: 10, textTransform: 'uppercase' }]}>ALERTS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navItemActive, { borderTopColor: colors.primary }]}>
          <MaterialIcons name="settings" size={24} color={colors.primary} />
          <Text style={[typography.labelSm, { color: colors.primary, marginTop: 4, fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase' }]}>SYSTEM</Text>
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
    height: 56,
    borderBottomWidth: 1,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  syncBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
  },
  iconBtn: {
    padding: 4,
  },
  container: {
    flexGrow: 1,
    paddingBottom: 80, // pb-24
  },
  configHeader: {
    paddingHorizontal: 16, // px-md
    paddingVertical: 32, // py-lg
  },
  configHeaderContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 8, // mb-sm
  },
  progressBar: {
    height: 2,
    width: '100%',
  },
  progressFill: {
    height: '100%',
  },
  stackContainer: {
    borderTopWidth: 1,
  },
  bentoCard: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    padding: 16, // p-md
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16, // mb-md
  },
  cardHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggleList: {
    gap: 8, // space-y-sm
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 8, // p-sm
    borderWidth: 1,
  },
  toggleTrack: {
    width: 40,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    padding: 4,
  },
  toggleThumb: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#ffffff',
  },
  sliderSection: {
    gap: 32, // space-y-lg
  },
  sliderItem: {
    width: '100%',
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  sliderTrackMock: {
    height: 4,
    width: '100%',
    position: 'relative',
    justifyContent: 'center',
  },
  sliderFillMock: {
    height: 4,
    position: 'absolute',
    left: 0,
  },
  sliderThumbMock: {
    width: 12,
    height: 12,
    borderRadius: 6,
    position: 'absolute',
    marginLeft: -6,
  },
  matrixTable: {
    width: '100%',
  },
  matrixHeaderRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingVertical: 8,
  },
  matrixRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingVertical: 16, // py-md
    alignItems: 'center',
  },
  matrixCol1: {
    flex: 2,
    paddingRight: 16, // pr-md
  },
  matrixColIcon: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 8, // px-sm
  },
  matrixBox: {
    width: 16,
    height: 16,
    borderWidth: 1,
  },
  feedbackSection: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 200,
    borderBottomWidth: 1,
  },
  footer: {
    paddingHorizontal: 24,
    paddingVertical: 32,
    alignItems: 'center',
  },
  footerLinks: {
    flexDirection: 'row',
    gap: 16,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 64,
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

export default PreferencesBehaviorScreen;
