import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Image, Switch, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';

const TaskRecurrenceScreen = () => {
  const { colors, typography, spacing, borderRadius } = useTheme();
  const [frequency, setFrequency] = useState('daily');
  const [retryEnabled, setRetryEnabled] = useState(false);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      {/* Top App Bar */}
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.outlineVariant }]}>
        <View style={styles.headerLeft}>
          <View style={[styles.headerAvatar, { borderColor: colors.outlineVariant, backgroundColor: colors.surfaceContainer }]}>
            <Image 
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCzkuRbTzU2ItBCIs8-Z6hGK32w7GuBriLb_QyMvfDU5rK5uVyursN0hWO_7zzBK_8GUrIJhpvIFoLjvQ8dnqHnNJ1cQYsY60SgkkpJGhwphAJ3Ca3i8LT4qPN0xceVwg2D3DSEBQotlGPp63aYD9lMYMTsw3I_SH7DkBnvv90I0RqIr28kUdgUQGAcHwV60tgYvHQKmR85QsHH_N0UX-0mZWSM52ANFeJFemEmYRDTmwPAmxrUOoQ18w' }}
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
        
        {/* Header Section */}
        <View style={styles.titleSection}>
          <Text style={[typography.headlineLgMobile, { color: colors.primary, textTransform: 'uppercase' }]}>Task Recurrence</Text>
          <Text style={[typography.bodyMd, { color: colors.onSurfaceVariant, marginTop: 4 }]}>Configure automated execution cycles.</Text>
        </View>

        {/* Frequency Segmented Control */}
        <View style={[styles.bentoCard, { backgroundColor: '#ffffff', borderColor: colors.outlineVariant, marginBottom: 16 }]}>
          <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant, marginBottom: 16 }]}>FREQUENCY ENGINE</Text>
          <View style={[styles.segmentedControl, { backgroundColor: colors.surfaceContainerLow, borderColor: colors.outlineVariant }]}>
            <TouchableOpacity 
              style={[styles.segmentBtn, frequency === 'daily' && { backgroundColor: colors.primary }]}
              onPress={() => setFrequency('daily')}
            >
              <Text style={[typography.labelCaps, { color: frequency === 'daily' ? colors.onPrimary : colors.onSurfaceVariant }]}>DAILY</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.segmentBtn, frequency === 'weekly' && { backgroundColor: colors.primary }]}
              onPress={() => setFrequency('weekly')}
            >
              <Text style={[typography.labelCaps, { color: frequency === 'weekly' ? colors.onPrimary : colors.onSurfaceVariant }]}>WEEKLY</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.segmentBtn, frequency === 'custom' && { backgroundColor: colors.primary }]}
              onPress={() => setFrequency('custom')}
            >
              <Text style={[typography.labelCaps, { color: frequency === 'custom' ? colors.onPrimary : colors.onSurfaceVariant }]}>CUSTOM</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Configuration Inputs */}
        <View style={styles.configInputsGroup}>
          {/* Start Date */}
          <View style={[styles.bentoCard, { backgroundColor: '#ffffff', borderColor: colors.outlineVariant }]}>
            <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant, marginBottom: 8 }]}>START DATE</Text>
            <View style={[styles.inputWrapper, { borderBottomColor: colors.outlineVariant }]}>
              <TextInput 
                style={[typography.labelCaps, styles.textInput, { color: colors.onSurface }]}
                value="2024-05-20"
                editable={false}
              />
              <MaterialIcons name="calendar-today" size={20} color={colors.onSurfaceVariant} />
            </View>
          </View>

          {/* Execution Time */}
          <View style={[styles.bentoCard, { backgroundColor: '#ffffff', borderColor: colors.outlineVariant }]}>
            <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant, marginBottom: 8 }]}>EXECUTION TIME (UTC)</Text>
            <View style={[styles.inputWrapper, { borderBottomColor: colors.outlineVariant }]}>
              <TextInput 
                style={[typography.labelCaps, styles.textInput, { color: colors.onSurface }]}
                value="08:00"
                editable={false}
              />
              <MaterialIcons name="schedule" size={20} color={colors.onSurfaceVariant} />
            </View>
          </View>
        </View>

        {/* Visual Recurrence Timeline */}
        <View style={[styles.bentoCard, { backgroundColor: '#ffffff', borderColor: colors.outlineVariant, marginTop: 16 }]}>
          <View style={styles.timelineHeader}>
            <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant }]}>RECURRENCE PREVIEW</Text>
            <View style={[styles.tagBadge, { backgroundColor: 'rgba(60, 227, 106, 0.2)' }]}>
              <Text style={[typography.labelSm, { color: colors.onTertiaryContainer, fontSize: 10, textTransform: 'uppercase' }]}>Optimized</Text>
            </View>
          </View>

          <View style={styles.timelineContainer}>
            <View style={[styles.timelineAxis, { backgroundColor: colors.outlineVariant }]} />
            
            <View style={styles.cyclesRow}>
              {/* Cycle 1 */}
              <View style={styles.cycleCol}>
                <View style={[styles.cycleDotActive, { backgroundColor: colors.primary, borderColor: colors.surface }]}>
                  <Text style={[typography.labelCaps, { color: colors.onPrimary, fontSize: 10 }]}>20</Text>
                </View>
                <Text style={[typography.labelSm, { color: colors.primary, fontSize: 10, fontWeight: 'bold' }]}>MAY</Text>
              </View>

              {/* Cycle 2 */}
              <View style={styles.cycleCol}>
                <View style={[styles.cycleDot, { backgroundColor: colors.surfaceContainerHighest, borderColor: colors.outlineVariant }]}>
                  <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant, fontSize: 10 }]}>21</Text>
                </View>
                <Text style={[typography.labelSm, { color: colors.onSurfaceVariant, fontSize: 10 }]}>MAY</Text>
              </View>

              {/* Cycle 3 */}
              <View style={styles.cycleCol}>
                <View style={[styles.cycleDot, { backgroundColor: colors.surfaceContainerHighest, borderColor: colors.outlineVariant }]}>
                  <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant, fontSize: 10 }]}>22</Text>
                </View>
                <Text style={[typography.labelSm, { color: colors.onSurfaceVariant, fontSize: 10 }]}>MAY</Text>
              </View>

              {/* Cycle 4 */}
              <View style={[styles.cycleCol, { opacity: 0.5 }]}>
                <View style={[styles.cycleDot, { backgroundColor: colors.surfaceContainerHighest, borderColor: colors.outlineVariant }]}>
                  <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant, fontSize: 10 }]}>23</Text>
                </View>
                <Text style={[typography.labelSm, { color: colors.onSurfaceVariant, fontSize: 10 }]}>MAY</Text>
              </View>
            </View>
          </View>

          <View style={[styles.timelineAnnotation, { backgroundColor: colors.surfaceContainerLow, borderLeftColor: colors.primary }]}>
            <Text style={[typography.bodyMd, { color: colors.onSurface, fontSize: 13, lineHeight: 18 }]}>
              <Text style={{ fontWeight: 'bold' }}>Summary: </Text>
              Task will execute every 24 hours starting May 20th at 08:00 UTC. Next instance occurs in <Text style={{ color: colors.onTertiaryContainer, fontWeight: 'bold' }}>14h 22m</Text>.
            </Text>
          </View>
        </View>

        {/* Advanced Toggle Card */}
        <View style={[styles.bentoCard, styles.toggleCardRow, { backgroundColor: '#ffffff', borderColor: colors.outlineVariant, marginTop: 16 }]}>
          <View>
            <Text style={[typography.labelCaps, { color: colors.primary }]}>FAILURE RETRY POLICY</Text>
            <Text style={[typography.labelSm, { color: colors.onSurfaceVariant, marginTop: 2 }]}>3 Retries • 15m Intervals</Text>
          </View>
          <Switch 
            value={retryEnabled}
            onValueChange={setRetryEnabled}
            trackColor={{ false: colors.surfaceContainerHighest, true: colors.onTertiaryContainer }}
            thumbColor={'#ffffff'}
          />
        </View>

        {/* Action Button */}
        <View style={styles.actionSection}>
          <TouchableOpacity style={[styles.actionBtn, { backgroundColor: colors.primary }]}>
            <Text style={[typography.labelCaps, { color: colors.onPrimary, letterSpacing: 2 }]}>APPLY CONFIGURATION</Text>
            <MaterialIcons name="bolt" size={18} color={colors.onPrimary} style={{ marginLeft: 8 }} />
          </TouchableOpacity>
        </View>

      </ScrollView>

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
    borderWidth: 1,
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
    marginBottom: 24,
  },
  bentoCard: {
    borderWidth: 1,
    padding: 24,
  },
  segmentedControl: {
    flexDirection: 'row',
    borderRadius: 32,
    borderWidth: 1,
    padding: 4,
  },
  segmentBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 24,
  },
  configInputsGroup: {
    gap: 16,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingVertical: 8,
  },
  textInput: {
    flex: 1,
    padding: 0,
    margin: 0,
  },
  timelineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tagBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  timelineContainer: {
    position: 'relative',
    marginTop: 32,
    height: 64,
    justifyContent: 'center',
  },
  timelineAxis: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    top: '50%',
  },
  cyclesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
    position: 'relative',
    zIndex: 10,
  },
  cycleCol: {
    alignItems: 'center',
    gap: 8,
  },
  cycleDotActive: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
  },
  cycleDot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
  },
  timelineAnnotation: {
    marginTop: 24,
    padding: 16,
    borderLeftWidth: 2,
  },
  toggleCardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  actionSection: {
    marginTop: 32,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 32,
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

export default TaskRecurrenceScreen;
