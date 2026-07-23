import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Image, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';

const FocusTimerLogsScreen = ({ navigation }) => {
  const { colors, typography, spacing, borderRadius } = useTheme();
  
  const [timeLeft, setTimeLeft] = useState(1498);
  const [logText, setLogText] = useState('');
  
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeString = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

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
        <View style={[styles.avatarContainer, { borderColor: colors.outlineVariant, backgroundColor: colors.surfaceContainerHigh }]}>
          <Image 
            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBASIB66jc-HeAz7BRUrY_F8KYpGcVCc_8Q6bVmLQ5pTR3hDYYUuL450uN0rbyY66P72OeJRrxHMxK26wZU7YZuVzfncz1FDU5OdTLltG3qzLAPVubJcKr4Yg5biA24coXgl4Hv4i1i0BZBrWguidNHSoZBW6PwZhLz8MCNAzb3CohOUSjF7JamVcRqxf-cFC5HGsNbkf4LQx3XFfu42_OH3WS5NndhUzZa1eVY75tpYYAeryBv6an1zQ' }}
            style={styles.avatar}
          />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        
        {/* Timer Section (Hero Bento) */}
        <View style={[styles.bentoCard, styles.heroBento, { borderColor: colors.outlineVariant, backgroundColor: colors.surfaceContainerLowest }]}>
          <View style={[styles.timerRing, { borderColor: colors.surfaceContainerHigh }]} />
          <Text style={[typography.labelCaps, { color: colors.secondary, textTransform: 'uppercase', letterSpacing: 2, marginBottom: spacing.md }]}>Current Session</Text>
          <Text style={[typography.displayLg, { color: colors.primary, fontSize: 80, fontWeight: '900', letterSpacing: -2 }]}>{timeString}</Text>
          
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: spacing.md }}>
            <View style={[styles.statusDot, { backgroundColor: colors.onTertiaryContainer }]} />
            <Text style={[typography.labelSm, { color: colors.onTertiaryContainer, fontWeight: 'bold' }]}>Active: Engineering Sprints</Text>
          </View>
        </View>

        {/* Session Metrics Stack */}
        <View style={styles.metricsGrid}>
          <View style={[styles.bentoCard, styles.metricCard, { borderColor: colors.outlineVariant, backgroundColor: colors.surfaceContainerLowest }]}>
            <Text style={[typography.labelCaps, { color: colors.secondary, marginBottom: spacing.xs }]}>FOCUS SCORE</Text>
            <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: spacing.xs }}>
              <Text style={[typography.headlineLgMobile, { color: colors.primary }]}>94</Text>
              <Text style={[typography.labelSm, { color: colors.onTertiaryContainer }]}>+2.4</Text>
            </View>
            <View style={[styles.progressTrack, { backgroundColor: colors.surfaceContainerHigh }]}>
              <View style={[styles.progressFill, { backgroundColor: colors.primary, width: '94%' }]} />
            </View>
          </View>

          <View style={[styles.bentoCard, styles.metricCard, { borderColor: colors.outlineVariant, backgroundColor: colors.surfaceContainerLowest }]}>
            <Text style={[typography.labelCaps, { color: colors.secondary, marginBottom: spacing.xs }]}>TOTAL OUTPUT</Text>
            <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: spacing.xs }}>
              <Text style={[typography.headlineLgMobile, { color: colors.primary }]}>12.8</Text>
              <Text style={[typography.labelSm, { color: colors.secondary }]}>units</Text>
            </View>
            <View style={[styles.progressTrack, { backgroundColor: colors.surfaceContainerHigh }]}>
              <View style={[styles.progressFill, { backgroundColor: colors.primary, width: '65%' }]} />
            </View>
          </View>
        </View>

        {/* Technical Log Area */}
        <View style={[styles.logBento, { borderColor: colors.outlineVariant, backgroundColor: colors.surfaceContainerLowest }]}>
          <View style={[styles.logHeader, { backgroundColor: colors.surfaceContainerLow, borderBottomColor: colors.outlineVariant }]}>
            <Text style={[typography.labelCaps, { color: colors.primary }]}>TECHNICAL LOG</Text>
            <MaterialIcons name="terminal" size={18} color={colors.secondary} />
          </View>
          
          <ScrollView style={styles.logList} contentContainerStyle={{ padding: spacing.md, gap: spacing.md }}>
            <View style={styles.logEntry}>
              <Text style={[typography.labelSm, styles.logTime, { color: colors.secondary }]}>14:02:11</Text>
              <Text style={[typography.labelSm, styles.logContent, { color: colors.onSurface }]}>Session initiated. Target: [Refactor Logic Engine]</Text>
            </View>
            <View style={styles.logEntry}>
              <Text style={[typography.labelSm, styles.logTime, { color: colors.secondary }]}>14:05:44</Text>
              <Text style={[typography.labelSm, styles.logContent, { color: colors.onSurface }]}>External noise detected. Noise cancellation increased to 85%.</Text>
            </View>
            <View style={styles.logEntry}>
              <Text style={[typography.labelSm, styles.logTime, { color: colors.secondary }]}>14:12:01</Text>
              <Text style={[typography.labelSm, styles.logContent, { color: colors.onTertiaryContainer }]}>Peak cognitive load detected. High Focus flow state identified.</Text>
            </View>
            <View style={styles.logEntry}>
              <Text style={[typography.labelSm, styles.logTime, { color: colors.secondary }]}>14:18:32</Text>
              <Text style={[typography.labelSm, styles.logContent, { color: colors.onSurface }]}>Network requests optimized. Latency minimized.</Text>
            </View>
            <View style={[styles.logEntry, { borderLeftWidth: 2, borderLeftColor: colors.primary, paddingLeft: 8 }]}>
              <Text style={[typography.labelSm, styles.logTime, { color: colors.secondary }]}>14:24:19</Text>
              <Text style={[typography.labelSm, styles.logContent, { color: colors.primary, fontWeight: 'bold' }]}>Awaiting input... System nominal.</Text>
            </View>
          </ScrollView>

          <View style={[styles.logInputContainer, { borderTopColor: colors.outlineVariant }]}>
            <View style={[styles.inputWrapper, { backgroundColor: colors.surfaceContainerLow }]}>
              <TextInput 
                style={[styles.textInput, typography.labelSm, { color: colors.primary }]}
                placeholder="Append log entry..."
                placeholderTextColor={colors.secondaryFixedDim}
                value={logText}
                onChangeText={setLogText}
              />
              <TouchableOpacity style={styles.sendBtn}>
                <MaterialIcons name="send" size={20} color={colors.primary} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Session Controls */}
        <View style={styles.controlsGrid}>
          <TouchableOpacity style={[styles.controlBtn, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
            <MaterialIcons name="pause" size={20} color={colors.primary} style={{ marginRight: 8 }} />
            <Text style={[typography.bodyMd, { color: colors.primary, fontWeight: 'bold' }]}>Pause Session</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.controlBtn, { backgroundColor: colors.error }]}>
            <MaterialIcons name="close" size={20} color={colors.onError} style={{ marginRight: 8 }} />
            <Text style={[typography.bodyMd, { color: colors.onError, fontWeight: 'bold' }]}>Abort</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>

      {/* Bottom Navigation Shell */}
      <View style={[styles.bottomNav, { backgroundColor: colors.surface, borderTopColor: colors.outlineVariant }]}>
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
          <MaterialIcons name="center-focus-strong" size={24} color={colors.onPrimaryContainer} />
          <Text style={[typography.labelCaps, { color: colors.onPrimaryContainer, marginTop: 4 }]}>Focus</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="analytics" size={24} color={colors.onSecondaryContainer} />
          <Text style={[typography.labelCaps, { color: colors.onSecondaryContainer, marginTop: 4 }]}>Metrics</Text>
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
    marginHorizontal: -8,
  },
  avatarContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
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
    paddingBottom: 100, // Bottom nav
    gap: 32,
  },
  bentoCard: {
    borderWidth: 1,
    borderRadius: 16,
  },
  heroBento: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    minHeight: 320,
    overflow: 'hidden',
    position: 'relative',
  },
  timerRing: {
    position: 'absolute',
    width: 280,
    height: 280,
    borderRadius: 140,
    borderWidth: 4,
    opacity: 0.5,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  metricsGrid: {
    flexDirection: 'row',
    gap: 16,
  },
  metricCard: {
    flex: 1,
    padding: 16,
  },
  progressTrack: {
    width: '100%',
    height: 4,
    borderRadius: 2,
    marginTop: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  logBento: {
    borderWidth: 1,
    borderRadius: 16,
    overflow: 'hidden',
    height: 300,
  },
  logHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
  },
  logList: {
    flex: 1,
  },
  logEntry: {
    flexDirection: 'row',
    gap: 8,
  },
  logTime: {
    opacity: 0.5,
    width: 64,
  },
  logContent: {
    flex: 1,
  },
  logInputContainer: {
    padding: 16,
    borderTopWidth: 1,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 9999,
    paddingHorizontal: 16,
  },
  textInput: {
    flex: 1,
    paddingVertical: 12,
  },
  sendBtn: {
    padding: 8,
  },
  controlsGrid: {
    flexDirection: 'row',
    gap: 16,
  },
  controlBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingBottom: 16,
    height: 64,
    borderTopWidth: 1,
    zIndex: 50,
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

export default FocusTimerLogsScreen;
