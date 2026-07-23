import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Image, Animated, Easing } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';

const ProtocolPausedScreen = ({ navigation }) => {
  const { colors, typography, spacing, borderRadius } = useTheme();

  const spinAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const [hr, setHr] = useState(72);

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 20000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 0.6,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        })
      ])
    ).start();

    const interval = setInterval(() => {
      setHr(prev => 70 + Math.floor(Math.random() * 5));
    }, 3000);

    return () => clearInterval(interval);
  }, [spinAnim, pulseAnim]);

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      {/* TopAppBar */}
      <View style={[styles.header, { backgroundColor: colors.background, borderBottomColor: colors.outlineVariant }]}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.iconBtn}>
            <MaterialIcons name="grid-view" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>
        <Text style={[typography.headlineLgMobile, { color: colors.primary, fontWeight: '900', letterSpacing: -1 }]}>PROMETHEUS</Text>
        <View style={styles.headerRight}>
          <View style={[styles.avatarContainer, { borderColor: colors.outlineVariant, backgroundColor: colors.surfaceContainerHighest }]}>
            <Image 
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2g0WOaDjHp6cuuE7NPDk6jvMv9riaTgnZSt3lDUoO49p9KXiIUcBJetYf6Jtre0aoNFxFyZ4cPCGKY-jaOkAUOY1qhkOfOLvjv_5dFrPNgIX34r-hfeMSzVRQU-E9ZsPr4KkI64ZoSyK_yM8l6dxzDKXuG4WCs0DgpyJbUwaGBbe9nkAB56aov3AdGE6nNILosHV4P40Wn_XyV7quUI_1kKiU5E_q1Pq3qsO52M2gP78p_Hw_JFjitQ' }}
              style={styles.avatarImg}
            />
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        
        {/* Status Header */}
        <View style={styles.statusHeader}>
          <View style={[styles.sessionIdBadge, { backgroundColor: colors.surfaceContainerHigh, borderColor: colors.outlineVariant }]}>
            <Text style={[typography.labelCaps, { color: colors.secondary }]}>SESSION ID: #4409-X</Text>
          </View>
          <Text style={[typography.headlineLgMobile, { color: colors.primary, letterSpacing: -1, marginBottom: 4, textAlign: 'center' }]}>PROTOCOL PAUSED</Text>
          <Text style={[typography.labelSm, { color: colors.secondary, textAlign: 'center', maxWidth: 280 }]}>Active focus session interrupted by user manual override.</Text>
        </View>

        {/* Big Timer Component */}
        <View style={styles.timerSection}>
          <View style={[styles.timerCircle, { borderColor: 'rgba(0,0,0,0.1)' }]}>
            <Animated.View style={[
              styles.timerDashedBorder, 
              { borderColor: 'rgba(0,0,0,0.1)' },
              { transform: [{ rotate: spin }] }
            ]} />
            <Animated.View style={[styles.timerGlow, { backgroundColor: 'rgba(0,0,0,0.05)', opacity: pulseAnim }]} />
            
            <View style={styles.timerContent}>
              <Text style={[typography.displayLg, { color: colors.primary, letterSpacing: -2 }]}>42:18</Text>
              <Text style={[typography.labelCaps, { color: colors.secondary, marginTop: -4 }]}>REMAINING</Text>
            </View>
          </View>
        </View>

        {/* Main Action */}
        <View style={styles.actionSection}>
          <TouchableOpacity style={[styles.resumeBtn, { backgroundColor: colors.primary, shadowColor: colors.primary }]}>
            <MaterialIcons name="play-arrow" size={24} color={colors.onPrimary} />
            <Text style={[typography.headlineLgMobile, { color: colors.onPrimary, marginLeft: 16 }]}>RESUME PROTOCOL</Text>
          </TouchableOpacity>
        </View>

        {/* Interruption Log & Biometrics Bento Grid */}
        <View style={styles.bentoSection}>
          
          {/* Interruption Log */}
          <View style={[styles.bentoCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
            <View style={styles.cardHeader}>
              <Text style={[typography.labelCaps, { color: colors.primary }]}>INTERRUPTION LOG</Text>
              <MaterialIcons name="history" size={18} color={colors.secondary} />
            </View>
            <View style={styles.logList}>
              <View style={[styles.logItem, { borderBottomColor: colors.surfaceContainerLow }]}>
                <Text style={[typography.labelSm, { color: colors.secondary, width: 80 }]}>14:02:11</Text>
                <View style={styles.logContent}>
                  <Text style={[typography.labelSm, { color: colors.primary }]}>Manual Pause</Text>
                  <Text style={[typography.labelSm, { fontSize: 11, color: colors.secondary, marginTop: 4 }]}>User initiated via Mobile UI</Text>
                </View>
              </View>
              <View style={[styles.logItem, { borderBottomColor: colors.surfaceContainerLow }]}>
                <Text style={[typography.labelSm, { color: colors.secondary, width: 80 }]}>13:45:04</Text>
                <View style={styles.logContent}>
                  <Text style={[typography.labelSm, { color: colors.primary }]}>Alert Trigger</Text>
                  <Text style={[typography.labelSm, { fontSize: 11, color: colors.secondary, marginTop: 4 }]}>External Notification: System Admin</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Biometrics */}
          <View style={styles.biometricsGrid}>
            <View style={[styles.biometricCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
              <View style={styles.cardHeader}>
                <Text style={[typography.labelCaps, { color: colors.secondary }]}>HEART RATE</Text>
                <MaterialIcons name="favorite" size={18} color={colors.error} />
              </View>
              <View style={styles.biometricContent}>
                <Text style={[typography.displayLg, { fontSize: 42, color: colors.primary, letterSpacing: -1 }]}>{hr}</Text>
                <Text style={[typography.labelSm, { color: colors.secondary }]}>BPM / RESTING</Text>
              </View>
            </View>
            
            <View style={[styles.biometricCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
              <View style={styles.cardHeader}>
                <Text style={[typography.labelCaps, { color: colors.secondary }]}>BODY TEMP</Text>
                <MaterialIcons name="device-thermostat" size={18} color={colors.onTertiaryContainer} />
              </View>
              <View style={styles.biometricContent}>
                <Text style={[typography.displayLg, { fontSize: 42, color: colors.primary, letterSpacing: -1 }]}>36.6</Text>
                <Text style={[typography.labelSm, { color: colors.secondary }]}>CELSIUS / OPTIMAL</Text>
              </View>
            </View>
          </View>

          {/* Focus Quality Summary */}
          <View style={[styles.bentoCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
            <View style={styles.cardHeader}>
              <Text style={[typography.labelCaps, { color: colors.primary }]}>SESSION INTENSITY</Text>
              <View style={styles.intensityBars}>
                <View style={[styles.intensityBar, { backgroundColor: colors.primary }]} />
                <View style={[styles.intensityBar, { backgroundColor: colors.primary }]} />
                <View style={[styles.intensityBar, { backgroundColor: colors.primary }]} />
                <View style={[styles.intensityBar, { backgroundColor: 'rgba(0,0,0,0.2)' }]} />
                <View style={[styles.intensityBar, { backgroundColor: 'rgba(0,0,0,0.2)' }]} />
              </View>
            </View>
            <View style={styles.chartContainer}>
              <View style={[styles.chartBar, { backgroundColor: colors.surfaceContainerHigh, height: '40%' }]} />
              <View style={[styles.chartBar, { backgroundColor: colors.surfaceContainerHigh, height: '60%' }]} />
              <View style={[styles.chartBar, { backgroundColor: colors.surfaceContainerHigh, height: '85%' }]} />
              <View style={[styles.chartBar, { backgroundColor: colors.primary, height: '95%' }]} />
              <View style={[styles.chartBar, { backgroundColor: colors.primary, height: '100%' }]} />
              <View style={[styles.chartBar, { backgroundColor: colors.surfaceContainerHigh, height: '20%' }]} />
              <View style={[styles.chartBar, { backgroundColor: colors.surfaceContainerHigh, height: '45%' }]} />
              <View style={[styles.chartBar, { backgroundColor: colors.surfaceContainerHigh, height: '75%' }]} />
              <View style={[styles.chartBar, { backgroundColor: colors.surfaceContainerHigh, height: '50%' }]} />
              <View style={[styles.chartBar, { backgroundColor: colors.surfaceContainerHigh, height: '30%' }]} />
            </View>
          </View>

        </View>
      </ScrollView>

      {/* Bottom Nav */}
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
          <MaterialIcons name="center-focus-strong" size={24} color={colors.onPrimary} />
          <Text style={[typography.labelCaps, { color: colors.onPrimary, marginTop: 4 }]}>Focus</Text>
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
    flex: 1,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
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
  avatarImg: {
    width: '100%',
    height: '100%',
  },
  container: {
    flexGrow: 1,
    paddingTop: 32, // pt-lg
    paddingBottom: 128, // pb-32
  },
  statusHeader: {
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 32, // mt-lg conceptually for next section
  },
  sessionIdBadge: {
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 16,
  },
  timerSection: {
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 32,
  },
  timerCircle: {
    width: 320,
    height: 320,
    borderRadius: 160,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  timerDashedBorder: {
    position: 'absolute',
    top: 16,
    left: 16,
    right: 16,
    bottom: 16,
    borderRadius: 144,
    borderWidth: 4,
    borderStyle: 'dashed',
  },
  timerGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 160,
  },
  timerContent: {
    alignItems: 'center',
    zIndex: 10,
  },
  actionSection: {
    paddingHorizontal: 16,
    marginBottom: 64, // mt-xl conceptually for next
  },
  resumeBtn: {
    flexDirection: 'row',
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  bentoSection: {
    paddingHorizontal: 16,
    gap: 16,
  },
  bentoCard: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 32,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  logList: {
    gap: 16,
  },
  logItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    paddingBottom: 16,
  },
  logContent: {
    flex: 1,
  },
  biometricsGrid: {
    flexDirection: 'row',
    gap: 16,
  },
  biometricCard: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 16,
    padding: 24, // simplified padding
    aspectRatio: 1,
    justifyContent: 'space-between',
  },
  biometricContent: {
    marginTop: 16,
  },
  intensityBars: {
    flexDirection: 'row',
    gap: 4,
  },
  intensityBar: {
    width: 4,
    height: 12,
    borderRadius: 2,
  },
  chartContainer: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 4,
    marginTop: 32,
  },
  chartBar: {
    flex: 1,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 64, // h-xl conceptually
    borderTopWidth: 1,
    zIndex: 50,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
  navItemActive: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    borderRadius: 8,
    marginHorizontal: 8,
  }
});

export default ProtocolPausedScreen;
