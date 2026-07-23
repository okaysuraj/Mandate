import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Animated, Dimensions } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

const { width } = Dimensions.get('window');

const SplashScreen = ({ navigation }) => {
  const { typography } = useTheme();

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
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        
        {/* Top Status Indicators */}
        <View style={styles.topStatusContainer}>
          <View style={styles.statusColLeft}>
            <Text style={[typography.labelCaps, styles.fadedText, { letterSpacing: 2 }]}>SYS_ID: 8824-M</Text>
            <Text style={[typography.labelSm, styles.fadedText]}>OS_V: 2.0.44_STABLE</Text>
          </View>
          <View style={styles.statusColRight}>
            <Text style={[typography.labelCaps, styles.fadedText]}>{timerText}</Text>
            <Text style={[typography.labelSm, styles.fadedText]}>NODE_STATUS: ACTIVE</Text>
          </View>
        </View>

        {/* Center Brand Anchor */}
        <View style={styles.centerBrand}>
          <Text style={[typography.headlineLgMobile, styles.brandText]}>MANDATE</Text>
          <View style={styles.brandDivider} />
        </View>

        {/* Bottom Loading Module */}
        <View style={styles.bottomModule}>
          <View style={styles.progressFeedback}>
            <View style={styles.progressHeader}>
              <View style={styles.progressTextCol}>
                <Text style={[typography.labelCaps, styles.progressLabel]}>INITIALIZING CORE</Text>
                <Text style={[typography.labelSm, styles.progressTask]} numberOfLines={1}>
                  {tasks[taskIndex]}
                </Text>
              </View>
              <Text style={[typography.labelCaps, styles.percentText]}>{displayProgress}%</Text>
            </View>

            <View style={styles.progressBarBg}>
              <Animated.View style={[styles.progressBarFill, { width: progressWidth }]} />
            </View>
          </View>

          <View style={styles.metaFooter}>
            <Text style={[typography.labelSm, styles.metaTitle]}>© 2024 MANDATE INDUSTRIAL SYSTEMS</Text>
            <Text style={[typography.labelSm, styles.metaSubtitle]}>ENCRYPTED_HANDSHAKE_REQUIRED</Text>
          </View>
        </View>

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { 
    flex: 1, 
    backgroundColor: '#000000',
  },
  container: {
    flex: 1,
    padding: 32, // p-lg roughly or xl
    justifyContent: 'space-between',
  },
  topStatusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    opacity: 0.4,
    marginTop: 24,
  },
  statusColLeft: {
    gap: 4,
  },
  statusColRight: {
    alignItems: 'flex-end',
    gap: 4,
  },
  fadedText: {
    color: '#ffffff',
  },
  centerBrand: {
    alignItems: 'center',
    gap: 16,
  },
  brandText: {
    color: '#ffffff',
    fontWeight: 'bold',
    letterSpacing: 8,
  },
  brandDivider: {
    width: 48,
    height: 1,
    backgroundColor: '#ffffff',
    opacity: 0.2,
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
  progressLabel: {
    color: '#ffffff',
    opacity: 0.6,
  },
  progressTask: {
    color: '#ffffff',
    opacity: 0.4,
    textTransform: 'uppercase',
  },
  percentText: {
    color: '#ffffff',
    fontSize: 14,
  },
  progressBarBg: {
    width: '100%',
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#ffffff',
  },
  metaFooter: {
    alignItems: 'center',
    gap: 4,
    opacity: 0.3,
  },
  metaTitle: {
    color: '#ffffff',
    textTransform: 'uppercase',
    letterSpacing: 2,
    fontSize: 10,
  },
  metaSubtitle: {
    color: '#ffffff',
    fontSize: 10,
  }
});

export default SplashScreen;
