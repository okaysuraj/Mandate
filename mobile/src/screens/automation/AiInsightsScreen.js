import React, { useEffect } from "react";
import { 
  View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image 
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, withSequence } from 'react-native-reanimated';

const AiInsightsScreen = ({ navigation }) => {
  const { colors, typography } = useTheme();

  // Pulse effect for live indicator
  const liveOpacity = useSharedValue(0.7);
  useEffect(() => {
    liveOpacity.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1000 }),
        withTiming(0.7, { duration: 1000 })
      ),
      -1,
      true
    );
  }, []);
  const animatedLiveStyle = useAnimatedStyle(() => ({ opacity: liveOpacity.value }));

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* TopAppBar */}
      <View style={[styles.header, { borderBottomColor: colors.outlineVariant, backgroundColor: colors.surface }]}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
            <MaterialIcons name="account-circle" size={24} color={colors.primary} />
          </TouchableOpacity>
          <Text style={[typography.headlineLgMobile, { color: colors.primary, fontWeight: '900', letterSpacing: -1, marginLeft: 8 }]}>
            MANDATE
          </Text>
        </View>
        <TouchableOpacity style={styles.iconButton}>
          <MaterialIcons name="smart-toy" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Header Section */}
        <View style={styles.pageHeader}>
          <View style={styles.headerTextRow}>
            <View>
              <Text style={[typography.labelCaps, { color: colors.secondary, marginBottom: 4 }]}>SYSTEM STATUS</Text>
              <Text style={[typography.headlineLgMobile, { color: colors.primary, fontWeight: '700', letterSpacing: -0.5 }]}>Executive Report</Text>
            </View>
            <Animated.View style={[styles.liveBadge, { backgroundColor: colors.tertiaryFixed }, animatedLiveStyle]}>
              <MaterialIcons name="bolt" size={14} color={colors.onTertiaryContainer} />
              <Text style={[typography.labelSm, { color: colors.onTertiaryContainer, marginLeft: 4 }]}>Live</Text>
            </Animated.View>
          </View>
          <View style={[styles.divider, { backgroundColor: colors.outlineVariant, marginTop: 16 }]} />
        </View>

        {/* Bento Grid: Main Dashboard Modules */}
        <View style={styles.grid}>
          
          {/* Consistency Score Gauge */}
          <View style={[styles.bentoCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant, alignItems: 'center' }]}>
            <Text style={[typography.labelCaps, { color: colors.secondary, letterSpacing: 2, marginBottom: 24 }]}>CONSISTENCY_SCORE</Text>
            
            {/* Custom gauge using views and borders */}
            <View style={styles.gaugeContainer}>
              <View style={[styles.gaugeBg, { borderColor: colors.surfaceContainerLow }]} />
              <View style={[styles.gaugeFill, { borderColor: colors.primary, transform: [{ rotate: '115deg' }] }]} />
            </View>

            <View style={styles.scoreText}>
              <Text style={[{ fontFamily: 'HankenGrotesk-ExtraBold', fontSize: 48, color: colors.primary }]}>84</Text>
              <Text style={[typography.headlineLgMobile, { color: colors.onPrimaryContainer, marginTop: 12, marginLeft: 2 }]}>%</Text>
            </View>
            <Text style={[typography.labelSm, { color: colors.secondary, marginTop: 8 }]}>+2.4% from peak interval</Text>
          </View>

          {/* Bottleneck Alerts List */}
          <View style={[styles.bentoCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
            <View style={styles.bentoHeader}>
              <Text style={[typography.labelCaps, { color: colors.secondary, letterSpacing: 2 }]}>BOTTLENECK ALERTS</Text>
              <MaterialIcons name="warning" size={20} color={colors.error} />
            </View>

            <View style={styles.alertsList}>
              <View style={styles.alertItem}>
                <View style={[styles.alertMarker, { backgroundColor: colors.error }]} />
                <View>
                  <Text style={[typography.labelSm, { color: colors.primary, fontWeight: '700', fontSize: 13 }]}>Node 04 Latency Spike</Text>
                  <Text style={[typography.labelSm, { color: colors.secondary, marginTop: 2 }]}>Region: North-East Hub [480ms]</Text>
                </View>
              </View>

              <View style={styles.alertItem}>
                <View style={[styles.alertMarker, { backgroundColor: colors.secondary }]} />
                <View>
                  <Text style={[typography.labelSm, { color: colors.primary, fontWeight: '700', fontSize: 13 }]}>Queue Overflow Threshold</Text>
                  <Text style={[typography.labelSm, { color: colors.secondary, marginTop: 2 }]}>Sub-system: Transaction Engine</Text>
                </View>
              </View>
            </View>

            <TouchableOpacity style={[styles.actionBtn, { borderColor: colors.outlineVariant }]}>
              <Text style={[typography.labelCaps, { color: colors.secondary }]}>VIEW TOPOLOGY</Text>
            </TouchableOpacity>
          </View>

          {/* Throughput Forecast Histogram */}
          <View style={[styles.bentoCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
            <Text style={[typography.labelCaps, { color: colors.secondary, letterSpacing: 2, marginBottom: 24 }]}>THROUGHPUT FORECAST</Text>
            
            <View style={styles.histogramContainer}>
              <View style={[styles.bar, { backgroundColor: colors.primaryContainer, height: '20%' }]} />
              <View style={[styles.bar, { backgroundColor: colors.primaryContainer, height: '35%' }]} />
              <View style={[styles.bar, { backgroundColor: colors.primaryContainer, height: '60%' }]} />
              <View style={[styles.bar, { backgroundColor: colors.primary, height: '85%' }]} />
              <View style={[styles.bar, { backgroundColor: colors.primaryContainer, height: '70%' }]} />
              <View style={[styles.bar, { backgroundColor: colors.primaryContainer, height: '55%' }]} />
              <View style={[styles.bar, { backgroundColor: colors.primaryContainer, height: '40%' }]} />
              <View style={[styles.bar, { backgroundColor: colors.primaryContainer, height: '30%' }]} />
            </View>

            <View style={styles.timeLabels}>
              <Text style={[typography.labelSm, { color: colors.secondary, fontSize: 10 }]}>0600h</Text>
              <Text style={[typography.labelSm, { color: colors.primary, fontSize: 10, fontWeight: '700' }]}>1200h</Text>
              <Text style={[typography.labelSm, { color: colors.secondary, fontSize: 10 }]}>1800h</Text>
            </View>

            <View style={styles.histogramFooter}>
              <Text style={[typography.labelSm, { color: colors.primary, fontSize: 13 }]}>
                Peak: <Text style={{ fontWeight: '700' }}>12.4 GB/s</Text>
              </Text>
              <MaterialIcons name="trending-up" size={16} color={colors.secondary} />
            </View>
          </View>

          {/* Active Subsystems Status */}
          <View style={[styles.bentoCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
            <Text style={[typography.labelCaps, { color: colors.secondary, letterSpacing: 2, marginBottom: 24 }]}>ACTIVE SUBSYSTEMS</Text>
            
            <View style={styles.subsystemsGrid}>
              
              <View style={[styles.subsystemCard, { backgroundColor: colors.surfaceContainerLow, borderColor: colors.outlineVariant }]}>
                <View style={styles.subsystemHeader}>
                  <Text style={[typography.labelCaps, { color: colors.secondary, fontSize: 10 }]}>AUTH</Text>
                  <View style={[styles.statusDot, { backgroundColor: colors.tertiaryFixedDim }]} />
                </View>
                <Text style={[typography.headlineLgMobile, { color: colors.primary, fontSize: 18, fontWeight: '700' }]}>OK</Text>
              </View>

              <View style={[styles.subsystemCard, { backgroundColor: colors.surfaceContainerLow, borderColor: colors.outlineVariant }]}>
                <View style={styles.subsystemHeader}>
                  <Text style={[typography.labelCaps, { color: colors.secondary, fontSize: 10 }]}>CORE</Text>
                  <View style={[styles.statusDot, { backgroundColor: colors.tertiaryFixedDim }]} />
                </View>
                <Text style={[typography.headlineLgMobile, { color: colors.primary, fontSize: 18, fontWeight: '700' }]}>OK</Text>
              </View>

              <View style={[styles.subsystemCard, { backgroundColor: colors.surfaceContainerLow, borderColor: colors.outlineVariant }]}>
                <View style={styles.subsystemHeader}>
                  <Text style={[typography.labelCaps, { color: colors.secondary, fontSize: 10 }]}>EDGE</Text>
                  <View style={[styles.statusDot, { backgroundColor: colors.error }]} />
                </View>
                <Text style={[typography.headlineLgMobile, { color: colors.primary, fontSize: 18, fontWeight: '700' }]}>WRN</Text>
              </View>

              <View style={[styles.subsystemCard, { backgroundColor: colors.surfaceContainerLow, borderColor: colors.outlineVariant }]}>
                <View style={styles.subsystemHeader}>
                  <Text style={[typography.labelCaps, { color: colors.secondary, fontSize: 10 }]}>DB</Text>
                  <View style={[styles.statusDot, { backgroundColor: colors.tertiaryFixedDim }]} />
                </View>
                <Text style={[typography.headlineLgMobile, { color: colors.primary, fontSize: 18, fontWeight: '700' }]}>OK</Text>
              </View>

            </View>
          </View>

          {/* Industrial Aesthetic Placeholder Image */}
          <View style={[styles.imageCard, { borderColor: colors.outlineVariant }]}>
            <View style={[styles.imageOverlay, { backgroundColor: `${colors.primary}1A` }]} />
            <Image 
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCK4MGVsgMhUzYvj1nATvZrrLaD39vxxhGInN4Ty1dminBKlW_WM5xkH8L7zlaGl1ovwjNqBox9vQkfr5R6fnzUw3HKy6fV73zyqnHsusnDwVRV1euC7PnBfR1UewzUuEEhIFcNiQYxob6qE31rXlJOscVbXgfccqCKgOD2BsH-q0Pg6a5E39szmvLcEn_SseDdaMlyDi21wTEsmxWeLXOZ0kieNSCl9WEOUMba76TSV0ZJTw1PPy8L5w' }}
              style={styles.image}
            />
            <View style={styles.imageLabel}>
              <Text style={[typography.labelCaps, { color: '#fff', fontSize: 10 }]}>DC-NV-01_CAM</Text>
            </View>
          </View>

        </View>

      </ScrollView>
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
  iconButton: {
    padding: 8,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 64,
  },
  pageHeader: {
    marginBottom: 32,
  },
  headerTextRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  divider: {
    height: 1,
    width: '100%',
    opacity: 0.5,
  },
  grid: {
    gap: 16,
  },
  bentoCard: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 24,
  },
  gaugeContainer: {
    position: 'relative',
    width: 140,
    height: 70,
    overflow: 'hidden',
    marginBottom: 8,
  },
  gaugeBg: {
    width: 140,
    height: 140,
    borderWidth: 12,
    borderRadius: 70,
  },
  gaugeFill: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 140,
    height: 140,
    borderWidth: 12,
    borderRadius: 70,
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
  },
  scoreText: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 8,
  },
  bentoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  alertsList: {
    gap: 16,
  },
  alertItem: {
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: 16,
  },
  alertMarker: {
    width: 4,
    borderRadius: 2,
  },
  actionBtn: {
    width: '100%',
    paddingVertical: 12,
    borderRadius: 24,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  histogramContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 128,
  },
  bar: {
    width: 16,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  timeLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  histogramFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  subsystemsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  subsystemCard: {
    flex: 1,
    minWidth: '45%',
    padding: 16,
    borderWidth: 1,
    borderRadius: 8,
    gap: 8,
  },
  subsystemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  imageCard: {
    height: 160,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  imageLabel: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    zIndex: 2,
  }
});

export default AiInsightsScreen;
