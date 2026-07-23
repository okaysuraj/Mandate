import React, { useState, useEffect, useRef } from "react";
import { 
  View, Text, StyleSheet, SafeAreaView, TouchableOpacity, 
  Animated, Easing, Vibration, Image
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";

const FocusModeScreen = ({ navigation }) => {
  const { colors, typography, spacing } = useTheme();
  
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  
  // Animation values for pulsing rings
  const pulse1 = useRef(new Animated.Value(0)).current;
  const pulse2 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const createPulseAnimation = (animValue, delay) => {
      return Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(animValue, {
            toValue: 1,
            duration: 4000,
            easing: Easing.bezier(0.4, 0, 0.6, 1),
            useNativeDriver: true,
          })
        ])
      );
    };

    createPulseAnimation(pulse1, 0).start();
    createPulseAnimation(pulse2, 2000).start();
  }, [pulse1, pulse2]);

  useEffect(() => {
    let intervalId;
    if (isRunning && timeLeft > 0) {
      intervalId = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft <= 0) {
      setIsRunning(false);
      Vibration.vibrate([500, 500, 500]);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, timeLeft]);

  const toggleTimer = () => {
    Vibration.vibrate(10); // Haptic feedback
    setIsRunning(!isRunning);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const ringStyle = (animValue) => ({
    transform: [{
      scale: animValue.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0.95, 1.05, 0.95]
      })
    }],
    opacity: animValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0.3, 0.1, 0.3]
    })
  });

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Top Navigation Shell */}
      <View style={[styles.header, { borderBottomColor: colors.outlineVariant }]}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 4 }}>
            <MaterialIcons name="grid-view" size={24} color={colors.primary} />
          </TouchableOpacity>
          <Text style={[typography.headlineLgMobile, { color: colors.primary, fontWeight: '900', letterSpacing: -1, marginLeft: 8 }]}>
            PROMETHEUS
          </Text>
        </View>
        <View style={[styles.avatar, { backgroundColor: colors.surfaceContainerHigh, borderColor: colors.outlineVariant }]}>
          <Image 
            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB5xHGCG_F78BzdT9_bbWRnaV0gSn6XAbjsZucAI_hbsKBW6ZSk5wKnW8hs9XqEXOzj8n7mxfykEQzR1em69wTewPPZpoDHsQaRUMjoN7ORTsnMrc637QC3swBPAIaVU_DM97uunZcQC9Xub-NUbw8Xga4aORE2gXMy9y-MTJjQhtUhfHPh5pyug7lie5H4V3DZf04OCztLddBy8Xw6I-Ydmys9y2E2ne7Zbs_4jYwTfqU1OtASbEmchA' }}
            style={{ width: '100%', height: '100%' }}
          />
        </View>
      </View>

      <View style={styles.mainCanvas}>
        {/* Atmospheric Background Element */}
        <View style={styles.bgContainer} pointerEvents="none">
          <Animated.View style={[styles.pulseRing, { borderColor: colors.outlineVariant, width: 288, height: 288 }, ringStyle(pulse1)]} />
          <Animated.View style={[styles.pulseRing, { borderColor: colors.outlineVariant, width: 384, height: 384, position: 'absolute' }, ringStyle(pulse2)]} />
        </View>

        {/* Session Context */}
        <View style={styles.contextHeader}>
          <View style={[styles.badge, { backgroundColor: colors.surfaceContainer }]}>
            <Text style={[typography.labelCaps, { color: colors.onSecondaryContainer }]}>CURRENT MODULE</Text>
          </View>
          <Text style={[typography.headlineLgMobile, { color: colors.primary, marginTop: 8 }]}>Deep Focus Session</Text>
        </View>

        {/* High-Impact Timer */}
        <View style={styles.timerSection}>
          <Text style={[{ fontFamily: 'HankenGrotesk-ExtraBold', fontSize: 96, letterSpacing: -4, color: colors.primary }]}>
            {formatTime(timeLeft)}
          </Text>
          <View style={styles.optimizedBadge}>
            <MaterialIcons name="bolt" size={14} color={colors.onTertiaryContainer} />
            <Text style={[typography.labelSm, { color: colors.onTertiaryContainer, marginLeft: 4 }]}>OPTIMIZED</Text>
          </View>
        </View>

        {/* Base Telemetry (Bento Style) */}
        <View style={styles.telemetryGrid}>
          
          <View style={[styles.bentoCard, { backgroundColor: colors.surface, borderColor: colors.outlineVariant }]}>
            <View style={styles.bentoHeader}>
              <Text style={[typography.labelCaps, { color: colors.secondary }]}>CPU LOAD</Text>
              <MaterialIcons name="memory" size={14} color={colors.secondary} />
            </View>
            <View style={styles.bentoContent}>
              <Text style={[typography.headlineLgMobile, { color: colors.primary }]}>14%</Text>
              <View style={styles.bars}>
                <View style={[styles.bar, { height: 4, backgroundColor: colors.primary }]} />
                <View style={[styles.bar, { height: 8, backgroundColor: colors.primary }]} />
                <View style={[styles.bar, { height: 12, backgroundColor: colors.outlineVariant }]} />
                <View style={[styles.bar, { height: 8, backgroundColor: colors.outlineVariant }]} />
              </View>
            </View>
          </View>

          <View style={[styles.bentoCard, { backgroundColor: colors.surface, borderColor: colors.outlineVariant }]}>
            <View style={styles.bentoHeader}>
              <Text style={[typography.labelCaps, { color: colors.secondary }]}>STREAK</Text>
              <MaterialIcons name="local-fire-department" size={14} color={colors.secondary} />
            </View>
            <View style={styles.bentoContent}>
              <Text style={[typography.headlineLgMobile, { color: colors.primary }]}>08</Text>
              <Text style={[typography.labelSm, { color: colors.onSecondaryContainer, marginBottom: 4 }]}>DAYS</Text>
            </View>
          </View>

        </View>

        {/* Primary Commit Action */}
        <View style={styles.actionSection}>
          <TouchableOpacity 
            style={[styles.commitBtn, { backgroundColor: isRunning ? colors.error : colors.primary }]}
            onPress={toggleTimer}
            activeOpacity={0.9}
          >
            <Text style={[typography.headlineLgMobile, { color: isRunning ? colors.onError : colors.onPrimary, fontSize: 20 }]}>
              {isRunning ? 'Suspend Session' : 'Initiate Focus'}
            </Text>
            <MaterialIcons name="arrow-forward" size={24} color={isRunning ? colors.onError : colors.onPrimary} style={{ marginLeft: 8 }} />
          </TouchableOpacity>
          <Text style={[typography.labelSm, { color: colors.secondary, opacity: 0.6, marginTop: 16, textAlign: 'center' }]}>
            Session duration locked to 25 minutes
          </Text>
        </View>

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
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
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    overflow: 'hidden',
  },
  mainCanvas: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 32,
    paddingHorizontal: 16,
    position: 'relative',
    overflow: 'hidden',
  },
  bgContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: -1,
  },
  pulseRing: {
    borderRadius: 9999,
    borderWidth: 1,
  },
  contextHeader: {
    alignItems: 'center',
    width: '100%',
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  timerSection: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
  },
  optimizedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  telemetryGrid: {
    flexDirection: 'row',
    width: '100%',
    maxWidth: 360,
    gap: 16,
    marginBottom: 32,
  },
  bentoCard: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
  },
  bentoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  bentoContent: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  bars: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 2,
    height: 16,
    paddingBottom: 4,
  },
  bar: {
    width: 3,
  },
  actionSection: {
    width: '100%',
    maxWidth: 360,
  },
  commitBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 32,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  }
});

export default FocusModeScreen;
