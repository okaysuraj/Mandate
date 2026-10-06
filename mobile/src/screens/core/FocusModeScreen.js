import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Animated, Easing, Vibration, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";
import AppHeader from "../../components/layout/AppHeader";

const FocusModeScreen = ({ navigation }) => {
  const { colors, typography } = useTheme();
  
  const [totalSeconds, setTotalSeconds] = useState(25 * 60);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState(25);
  
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
    Vibration.vibrate(10);
    setIsRunning(!isRunning);
  };

  const resetTimer = (minutes) => {
    setIsRunning(false);
    setSelectedDuration(minutes);
    setTotalSeconds(minutes * 60);
    setTimeLeft(minutes * 60);
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
      <AppHeader title="FOCUS MODE" showBack={true} navigation={navigation} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header Section matching web FocusModePage.jsx */}
        <View style={styles.pageHeader}>
          <View style={styles.breadcrumbRow}>
            <View style={[styles.brandDot, { backgroundColor: colors.primary }]} />
            <Text style={[styles.breadcrumbText, { color: colors.onSurfaceVariant }]}>
              ATTENTION PROTOCOL
            </Text>
          </View>
          <Text style={[styles.title, { color: colors.onSurface }]}>
            Focus Mode
          </Text>
          <Text style={[styles.subtitle, { color: colors.onSurfaceVariant }]}>
            A distraction-light workspace designed for deep work with time-boxed intervals and priority cues.
          </Text>
        </View>

        {/* Distraction-Free Card */}
        <View style={[styles.card, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
          <Text style={[styles.cardTitle, { color: colors.onSurface }]}>DISTRACTION-FREE WORKSPACE</Text>
          <Text style={[styles.cardSubtitle, { color: colors.onSurfaceVariant }]}>
            Mutes notifications, minimizes secondary navigation, and highlights your current task.
          </Text>
        </View>

        {/* Interactive Deep Work Timer Canvas */}
        <View style={[styles.timerCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
          {/* Animated Atmospheric Rings */}
          <View style={styles.ringsContainer} pointerEvents="none">
            <Animated.View style={[styles.pulseRing, { borderColor: colors.outlineVariant, width: 220, height: 220 }, ringStyle(pulse1)]} />
            <Animated.View style={[styles.pulseRing, { borderColor: colors.outlineVariant, width: 280, height: 280, position: 'absolute' }, ringStyle(pulse2)]} />
          </View>

          {/* Time Display */}
          <View style={styles.timeCenter}>
            <Text style={[styles.timeText, { color: colors.primary }]}>{formatTime(timeLeft)}</Text>
            <Text style={[styles.statusLabel, { color: colors.onSurfaceVariant }]}>
              {isRunning ? "DEEP FOCUS ACTIVE" : "SESSION PAUSED"}
            </Text>
          </View>

          {/* Duration Selector Buttons */}
          <View style={styles.durationSelector}>
            {[25, 50, 5].map((mins) => (
              <TouchableOpacity
                key={mins}
                onPress={() => resetTimer(mins)}
                style={[
                  styles.durationChip,
                  {
                    backgroundColor: selectedDuration === mins ? colors.primary : colors.surfaceContainerLow,
                    borderColor: selectedDuration === mins ? colors.primary : colors.outlineVariant,
                  },
                ]}
              >
                <Text style={[
                  styles.durationChipText,
                  { color: selectedDuration === mins ? colors.onPrimary : colors.onSurfaceVariant }
                ]}>
                  {mins === 5 ? "5m Break" : `${mins}m Work`}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Action Button: Play / Pause */}
          <TouchableOpacity
            onPress={toggleTimer}
            style={[styles.playBtn, { backgroundColor: colors.primary }]}
            activeOpacity={0.85}
          >
            <MaterialIcons 
              name={isRunning ? "pause" : "play-arrow"} 
              size={28} 
              color={colors.onPrimary} 
            />
            <Text style={[styles.playBtnText, { color: colors.onPrimary }]}>
              {isRunning ? "PAUSE INTERVAL" : "ENGAGE FOCUS"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: 16, paddingBottom: 40 },
  pageHeader: { marginBottom: 16 },
  breadcrumbRow: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 6 },
  brandDot: { width: 8, height: 8, borderRadius: 4 },
  breadcrumbText: { fontFamily: "JetBrainsMono-Bold", fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase" },
  title: { fontFamily: "HankenGrotesk-Bold", fontSize: 24, textTransform: "uppercase", letterSpacing: -0.5 },
  subtitle: { fontFamily: "HankenGrotesk-Regular", fontSize: 13, marginTop: 4, lineHeight: 18 },
  card: { borderWidth: 1, borderRadius: 14, padding: 16, marginBottom: 16 },
  cardTitle: { fontFamily: "JetBrainsMono-Bold", fontSize: 12, letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 },
  cardSubtitle: { fontFamily: "HankenGrotesk-Regular", fontSize: 12, lineHeight: 17 },
  timerCard: { borderWidth: 1, borderRadius: 14, padding: 24, alignItems: "center", position: "relative", minHeight: 340, justifyContent: "center" },
  ringsContainer: { position: "absolute", inset: 0, alignItems: "center", justifyContent: "center" },
  pulseRing: { borderRadius: 999, borderWidth: 1 },
  timeCenter: { alignItems: "center", marginVertical: 24 },
  timeText: { fontFamily: "JetBrainsMono-Bold", fontSize: 52, letterSpacing: -2 },
  statusLabel: { fontFamily: "JetBrainsMono-Bold", fontSize: 10, letterSpacing: 1.5, marginTop: 4 },
  durationSelector: { flexDirection: "row", gap: 10, marginBottom: 20 },
  durationChip: { borderWidth: 1, borderRadius: 20, paddingHorizontal: 14, paddingVertical: 6 },
  durationChipText: { fontFamily: "JetBrainsMono-Bold", fontSize: 11 },
  playBtn: { flexDirection: "row", alignItems: "center", gap: 8, paddingVertical: 12, paddingHorizontal: 28, borderRadius: 12, shadowOpacity: 0.15, shadowRadius: 6, elevation: 4 },
  playBtnText: { fontFamily: "JetBrainsMono-Bold", fontSize: 12, letterSpacing: 1 },
});

export default FocusModeScreen;
