import React, { useState, useEffect } from "react";
import { 
  View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity 
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Svg, { Circle } from 'react-native-svg';
import { useTheme } from "../../context/ThemeContext";

const AnalyticsScreen = ({ navigation }) => {
  const { colors, typography, spacing, borderRadius } = useTheme();

  // SVG Gauge Calculations
  const size = 192; // 48 * 4
  const strokeWidth = 16;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const progress = 75; // 75%
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  // Chart Animation State
  const [chartHeights, setChartHeights] = useState([0, 0, 0, 0, 0]);
  useEffect(() => {
    // Animate in
    setTimeout(() => {
      setChartHeights([80, 65, 95, 40, 70]);
    }, 300);
  }, []);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.surface }]}>
      {/* TopAppBar */}
      <View style={[styles.header, { borderBottomColor: colors.outlineVariant }]}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.iconButton}>
            <MaterialIcons name="menu" size={24} color={colors.primary} />
          </TouchableOpacity>
          <Text style={[typography.headlineLgMobile, { color: colors.primary, fontWeight: '900', letterSpacing: -1, marginLeft: 8 }]}>
            MANDATE
          </Text>
        </View>
        <TouchableOpacity style={styles.iconButton}>
          <MaterialIcons name="account-circle" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.section}>
          <View style={styles.heroHeader}>
            <View>
              <Text style={[typography.labelCaps, { color: colors.secondary }]}>METRIC_01</Text>
              <Text style={[typography.headlineLgMobile, { color: colors.primary, textTransform: 'uppercase' }]}>Command Center</Text>
            </View>
            <View style={[styles.liveBadge, { backgroundColor: colors.primary }]}>
              <Text style={[typography.labelSm, { color: colors.onPrimary }]}>LIVE</Text>
            </View>
          </View>

          {/* Deep Work Gauge */}
          <View style={[styles.bentoCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant, alignItems: 'center' }]}>
            <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
              <Svg width={size} height={size} style={{ transform: [{ rotate: '-90deg' }] }}>
                <Circle
                  stroke={colors.surfaceContainer}
                  fill="none"
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  strokeWidth={strokeWidth}
                />
                <Circle
                  stroke={colors.primary}
                  fill="none"
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  strokeWidth={strokeWidth}
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="butt"
                />
              </Svg>
              <View style={[StyleSheet.absoluteFill, { alignItems: 'center', justifyContent: 'center' }]}>
                <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                  <Text style={[typography.displayLg, { fontSize: 40, color: colors.primary }]}>75</Text>
                  <Text style={[typography.headlineLg, { fontSize: 20, color: colors.primary }]}>%</Text>
                </View>
                <Text style={[typography.labelCaps, { color: colors.secondary, marginTop: 4 }]}>DEEP WORK</Text>
              </View>
            </View>
            <Text style={[typography.bodyMd, { color: colors.onSurfaceVariant, textAlign: 'center', marginTop: 16, maxWidth: 260 }]}>
              Your focus sessions are 12% higher than last week's median.
            </Text>
          </View>
        </View>

        {/* Dynamic Workloads */}
        <View style={styles.section}>
          <Text style={[typography.labelCaps, { color: colors.secondary, marginBottom: 8 }]}>DYNAMIC_WORKLOADS</Text>
          
          {/* Bar Chart */}
          <View style={[styles.bentoCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant, marginBottom: 16 }]}>
            <View style={styles.cardHeader}>
              <Text style={[typography.headlineLgMobile, { fontSize: 18, color: colors.primary }]}>Output vs. Capacity</Text>
              <MaterialIcons name="bar-chart" size={24} color={colors.secondary} />
            </View>
            
            <View style={styles.chartContainer}>
              {['MON', 'TUE', 'WED', 'THU', 'FRI'].map((day, index) => (
                <View key={day} style={styles.chartCol}>
                  <View style={[styles.chartBarBg, { backgroundColor: colors.surfaceContainerHigh }]}>
                    <View style={[styles.chartBarFill, { backgroundColor: colors.primary, height: `${chartHeights[index]}%` }]} />
                  </View>
                  <Text style={[typography.labelSm, { color: colors.primary, marginTop: 8 }]}>{day}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Task Latency */}
          <View style={[styles.bentoCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
            <View style={styles.cardHeader}>
              <Text style={[typography.headlineLgMobile, { fontSize: 18, color: colors.primary }]}>Task Latency</Text>
              <MaterialIcons name="timer" size={24} color={colors.secondary} />
            </View>
            <View style={{ gap: 12 }}>
              <View style={styles.latencyRow}>
                <View style={styles.latencyLeft}>
                  <View style={[styles.dot, { backgroundColor: colors.error }]} />
                  <Text style={[typography.bodyMd, { color: colors.primary, fontWeight: '500' }]}>Core API Refactor</Text>
                </View>
                <Text style={[typography.labelSm, { color: colors.error }]}>+4.2h</Text>
              </View>
              <View style={styles.latencyRow}>
                <View style={styles.latencyLeft}>
                  <View style={[styles.dot, { backgroundColor: colors.onTertiaryContainer }]} />
                  <Text style={[typography.bodyMd, { color: colors.primary, fontWeight: '500' }]}>Sprint Review Prep</Text>
                </View>
                <Text style={[typography.labelSm, { color: colors.onTertiaryContainer }]}>-1.5h</Text>
              </View>
              <View style={styles.latencyRow}>
                <View style={styles.latencyLeft}>
                  <View style={[styles.dot, { backgroundColor: colors.secondary }]} />
                  <Text style={[typography.bodyMd, { color: colors.primary, fontWeight: '500' }]}>Design System Audit</Text>
                </View>
                <Text style={[typography.labelSm, { color: colors.secondary }]}>+0.8h</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Resolution Log */}
        <View style={styles.section}>
          <Text style={[typography.labelCaps, { color: colors.secondary, marginBottom: 8 }]}>RESOLUTION_LOG</Text>
          <View style={[styles.bentoCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant, padding: 0 }]}>
            
            <View style={[styles.logItem, { borderBottomColor: colors.surfaceContainerHigh }]}>
              <MaterialIcons name="check-circle" size={18} color={colors.primary} style={{ marginTop: 2 }} />
              <View style={{ marginLeft: 12 }}>
                <Text style={[typography.bodyMd, { color: colors.primary, fontWeight: '700' }]}>Deployment Pipeline Stabilized</Text>
                <Text style={[typography.labelSm, { color: colors.secondary }]}>14:20 PM • Engineering</Text>
              </View>
            </View>

            <View style={[styles.logItem, { borderBottomColor: colors.surfaceContainerHigh }]}>
              <MaterialIcons name="check-circle" size={18} color={colors.primary} style={{ marginTop: 2 }} />
              <View style={{ marginLeft: 12 }}>
                <Text style={[typography.bodyMd, { color: colors.primary, fontWeight: '700' }]}>Q3 Capacity Forecast Finalized</Text>
                <Text style={[typography.labelSm, { color: colors.secondary }]}>11:05 AM • Operations</Text>
              </View>
            </View>

            <View style={[styles.logItem, { borderBottomWidth: 0 }]}>
              <MaterialIcons name="check-circle" size={18} color={colors.primary} style={{ marginTop: 2 }} />
              <View style={{ marginLeft: 12 }}>
                <Text style={[typography.bodyMd, { color: colors.primary, fontWeight: '700' }]}>Latency Spike Resolved</Text>
                <Text style={[typography.labelSm, { color: colors.secondary }]}>09:45 AM • Infrastructure</Text>
              </View>
            </View>
            
          </View>
        </View>

        {/* Footer Component */}
        <View style={[styles.footer, { backgroundColor: colors.surfaceContainer }]}>
          <Text style={[typography.labelCaps, { color: colors.primary }]}>© 2024 MANDATE INDUSTRIAL</Text>
          <View style={styles.footerLinks}>
            <Text style={[typography.labelSm, { color: colors.secondary }]}>Privacy</Text>
            <Text style={[typography.labelSm, { color: colors.secondary }]}>Terms</Text>
            <Text style={[typography.labelSm, { color: colors.secondary }]}>Support</Text>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 32,
  },
  heroHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  liveBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  bentoCard: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 24,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  chartContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 160,
    gap: 8,
  },
  chartCol: {
    flex: 1,
    alignItems: 'center',
  },
  chartBarBg: {
    width: '100%',
    height: 128,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  chartBarFill: {
    width: '100%',
  },
  latencyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  latencyLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  logItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16,
    borderBottomWidth: 1,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 32,
    marginHorizontal: -16,
    gap: 16,
  },
  footerLinks: {
    flexDirection: 'row',
    gap: 16,
  }
});

export default AnalyticsScreen;
