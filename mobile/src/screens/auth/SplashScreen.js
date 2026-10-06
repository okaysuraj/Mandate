import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from '../../context/ThemeContext';

const { width } = Dimensions.get('window');

const SplashScreen = ({ navigation }) => {
  const { colors, typography } = useTheme();

  const [progress] = useState(new Animated.Value(0));
  const [taskIndex, setTaskIndex] = useState(0);
  const [displayProgress, setDisplayProgress] = useState(0);
  const [timerText, setTimerText] = useState('00:00:00:00');

  const tasks = [
    "AUTHENTICATING SECURE PROTOCOLS",
    "MAPPING NEURAL DATA STRUCTURES",
    "SYNCHRONIZING ASSET REGISTRY",
    "OPTIMIZING BENTO_GRID INTERFACE",
    "VERIFYING PERMISSIONS",
    "FINALIZING SYSTEM BOOT",
    "SYSTEM READY"
  ];

  useEffect(() => {
    // Timer simulation
    const timerInterval = setInterval(() => {
      const now = new Date();
      const parts = [
        now.getHours().toString().padStart(2, '0'),
        now.getMinutes().toString().padStart(2, '0'),
        now.getSeconds().toString().padStart(2, '0'),
        Math.floor(now.getMilliseconds() / 10).toString().padStart(2, '0')
      ];
      setTimerText(parts.join(':'));
    }, 40);

    // Progress animation
    Animated.timing(progress, {
      toValue: 100,
      duration: 4000,
      useNativeDriver: false,
    }).start();

    // Progress listener to update text
    const listenerId = progress.addListener(({ value }) => {
      setDisplayProgress(Math.floor(value));
      
      const newIndex = Math.min(Math.floor((value / 100) * tasks.length), tasks.length - 1);
      if (newIndex !== taskIndex) {
        setTaskIndex(newIndex);
      }

      // Automatically navigate away (optional)
      // if (value === 100) {
      //   setTimeout(() => navigation.replace('HomeDashboard'), 500);
      // }
    });

    return () => {
      clearInterval(timerInterval);
      progress.removeListener(listenerId);
    };
  }, []);

  const progressWidth = progress.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <View style={styles.container}>
        
        {/* Top Status Indicators */}
        <View style={styles.topStatusContainer}>
          <View style={styles.statusColLeft}>
            <Text style={[typography.labelCaps, { color: colors.secondary, letterSpacing: 2 }]}>SYS_ID: 8824-M</Text>
            <Text style={[typography.labelSm, { color: colors.secondary }]}>OS_V: 2.0.44_STABLE</Text>
          </View>
          <View style={styles.statusColRight}>
            <Text style={[typography.labelCaps, { color: colors.secondary }]}>{timerText}</Text>
            <Text style={[typography.labelSm, { color: colors.secondary }]}>NODE_STATUS: ACTIVE</Text>
          </View>
        </View>

        {/* Center Brand Anchor */}
        <View style={styles.centerBrand}>
          <Text style={[typography.headlineLgMobile, { color: colors.primary, fontWeight: 'bold', letterSpacing: 8 }]}>MANDATE</Text>
          <View style={[styles.brandDivider, { backgroundColor: colors.outlineVariant }]} />
        </View>

        {/* Bottom Loading Module */}
        <View style={styles.bottomModule}>
          <View style={styles.progressFeedback}>
            <View style={styles.progressHeader}>
              <View style={styles.progressTextCol}>
                <Text style={[typography.labelCaps, { color: colors.primary }]}>INITIALIZING CORE</Text>
                <Text style={[typography.labelSm, { color: colors.secondary }]} numberOfLines={1}>
                  {tasks[taskIndex]}
                </Text>
              </View>
              <Text style={[typography.labelCaps, { color: colors.primary, fontSize: 14 }]}>{displayProgress}%</Text>
            </View>

            <View style={[styles.progressBarBg, { backgroundColor: colors.surfaceContainerHigh }]}>
              <Animated.View style={[styles.progressBarFill, { backgroundColor: colors.primary, width: progressWidth }]} />
            </View>
          </View>

          <View style={styles.metaFooter}>
            <Text style={[typography.labelSm, { color: colors.secondary, textTransform: 'uppercase', letterSpacing: 2, fontSize: 10 }]}>© 2024 MANDATE INDUSTRIAL SYSTEMS</Text>
            <Text style={[typography.labelSm, { color: colors.secondary, fontSize: 10 }]}>ENCRYPTED_HANDSHAKE_REQUIRED</Text>
          </View>
        </View>

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { 
    flex: 1, 
  },
  container: {
    flex: 1,
    padding: 32,
    justifyContent: 'space-between',
  },
  topStatusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    opacity: 0.6,
    marginTop: 24,
  },
  statusColLeft: {
    gap: 4,
  },
  statusColRight: {
    alignItems: 'flex-end',
    gap: 4,
  },
  centerBrand: {
    alignItems: 'center',
    gap: 16,
  },
  brandDivider: {
    width: 48,
    height: 2,
    borderRadius: 1,
  },
  bottomModule: {
    gap: 32,
    marginBottom: 24,
  },
  progressFeedback: {
    gap: 8,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 4,
  },
  progressTextCol: {
    flex: 1,
    paddingRight: 16,
  },
  progressBarBg: {
    width: '100%',
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 2,
  },
  metaFooter: {
    alignItems: 'center',
    gap: 4,
    opacity: 0.6,
  },
});

export default SplashScreen;
