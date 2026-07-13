import React, { useState, useEffect } from "react";
import { 
  View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity 
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Svg, { Path } from "react-native-svg";
import { useTheme } from "../context/ThemeContext";

const TeamDashboardScreen = ({ navigation }) => {
  const { colors, typography } = useTheme();

  // Mock realtime active count
  const [activeCount, setActiveCount] = useState(24);

  useEffect(() => {
    const interval = setInterval(() => {
      const delta = Math.random() > 0.5 ? 1 : -1;
      setActiveCount(prev => Math.max(18, Math.min(32, prev + delta)));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* TopAppBar */}
      <View style={[styles.header, { borderBottomColor: colors.outlineVariant, backgroundColor: colors.surface }]}>
        <View style={styles.headerLeft}>
          <MaterialIcons name="terminal" size={20} color={colors.primary} />
          <Text style={[typography.labelCaps, { color: colors.primary, letterSpacing: 2, marginLeft: 8 }]}>
            MANDATE OS
          </Text>
        </View>
        <TouchableOpacity style={styles.iconButton}>
          <MaterialIcons name="account-circle" size={24} color={colors.secondary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Dashboard Header */}
        <View style={styles.pageHeader}>
          <Text style={[typography.headlineLgMobile, { color: colors.primary, fontWeight: '800' }]}>Team Workspace</Text>
          <Text style={[typography.labelCaps, { color: colors.secondary, marginTop: 4 }]}>OPERATIONAL OVERVIEW // DELTA-7 CLUSTER</Text>
        </View>

        {/* 01 Member Status Card */}
        <View style={[styles.bentoCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
          <View style={styles.bentoHeader}>
            <Text style={[typography.labelCaps, { color: colors.secondary }]}>01 // MEMBER STATUS</Text>
            <View style={[styles.tagBadge, { backgroundColor: colors.tertiaryFixed }]}>
              <Text style={[typography.labelSm, { color: colors.onTertiaryFixed, fontSize: 10 }]}>REALTIME</Text>
            </View>
          </View>
          <View style={styles.splitRow}>
            <View style={[styles.splitCol, { borderLeftColor: colors.primary }]}>
              <Text style={[{ fontFamily: 'HankenGrotesk-ExtraBold', fontSize: 40, color: colors.primary, lineHeight: 40 }]}>{activeCount}</Text>
              <Text style={[typography.labelCaps, { color: colors.secondary, marginTop: 4 }]}>ACTIVE</Text>
            </View>
            <View style={[styles.splitCol, { borderLeftColor: colors.outlineVariant }]}>
              <Text style={[{ fontFamily: 'HankenGrotesk-ExtraBold', fontSize: 40, color: colors.outline, lineHeight: 40 }]}>08</Text>
              <Text style={[typography.labelCaps, { color: colors.secondary, marginTop: 4 }]}>IDLE</Text>
            </View>
          </View>
        </View>

        {/* 02 Aggregate Output Sparkline */}
        <View style={[styles.bentoCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
          <Text style={[typography.labelCaps, { color: colors.secondary, marginBottom: 16 }]}>02 // AGGREGATE OUTPUT</Text>
          
          <View style={styles.sparklineContainer}>
            <Svg width="100%" height="100%" viewBox="0 0 400 100" preserveAspectRatio="none">
              <Path 
                d="M0,80 Q50,20 100,60 T200,40 T300,70 T400,10" 
                fill="none" 
                stroke={colors.primary} 
                strokeWidth="3" 
              />
              <Path 
                d="M0,80 Q50,20 100,60 T200,40 T300,70 T400,10 V100 H0 Z" 
                fill={`${colors.primary}08`} 
              />
            </Svg>
          </View>
          
          <View style={styles.sparklineFooter}>
            <Text style={[typography.labelSm, { color: colors.secondary }]}>00:00H</Text>
            <View style={styles.trendIndicator}>
              <MaterialIcons name="trending-up" size={14} color={colors.tertiaryFixedDim} />
              <Text style={[typography.labelSm, { color: colors.primary, marginLeft: 4 }]}>+12.4%</Text>
            </View>
            <Text style={[typography.labelSm, { color: colors.secondary }]}>23:59H</Text>
          </View>
        </View>

        {/* 04 Workload Distribution Bar Chart */}
        <View style={[styles.bentoCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
          <Text style={[typography.labelCaps, { color: colors.secondary, marginBottom: 16 }]}>04 // WORKLOAD DISTRIBUTION</Text>
          
          <View style={styles.barChartRow}>
            <View style={styles.barLabels}>
              <Text style={[typography.labelCaps, { color: colors.primary }]}>DEVELOPMENT</Text>
              <Text style={[typography.labelCaps, { color: colors.primary }]}>82%</Text>
            </View>
            <View style={[styles.progressBarBg, { backgroundColor: colors.surfaceContainerHigh }]}>
              <View style={[styles.progressBarFill, { backgroundColor: colors.primary, width: '82%' }]} />
            </View>
          </View>

          <View style={styles.barChartRow}>
            <View style={styles.barLabels}>
              <Text style={[typography.labelCaps, { color: colors.primary }]}>VALIDATION</Text>
              <Text style={[typography.labelCaps, { color: colors.primary }]}>45%</Text>
            </View>
            <View style={[styles.progressBarBg, { backgroundColor: colors.surfaceContainerHigh }]}>
              <View style={[styles.progressBarFill, { backgroundColor: colors.primary, width: '45%' }]} />
            </View>
          </View>

          <View style={[styles.barChartRow, { marginBottom: 0 }]}>
            <View style={styles.barLabels}>
              <Text style={[typography.labelCaps, { color: colors.primary }]}>DEPLOYMENT</Text>
              <Text style={[typography.labelCaps, { color: colors.primary }]}>18%</Text>
            </View>
            <View style={[styles.progressBarBg, { backgroundColor: colors.surfaceContainerHigh }]}>
              <View style={[styles.progressBarFill, { backgroundColor: colors.primary, width: '18%' }]} />
            </View>
          </View>
        </View>

        {/* 03 Critical Mandates Ledger */}
        <View style={styles.mandatesSection}>
          <View style={styles.mandatesHeader}>
            <Text style={[typography.labelCaps, { color: colors.secondary, marginRight: 16 }]}>03 // CRITICAL MANDATES</Text>
            <View style={[styles.dividerLine, { backgroundColor: colors.outlineVariant }]} />
          </View>

          <TouchableOpacity style={[styles.mandateCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]} activeOpacity={0.9}>
            <View style={[styles.mandateIcon, { backgroundColor: colors.primaryContainer }]}>
              <MaterialIcons name="warning" size={20} color="#fff" />
            </View>
            <View style={styles.mandateBody}>
              <Text style={[typography.labelCaps, { color: colors.primary, fontSize: 12 }]}>SYSTEM_RECOVERY_V2</Text>
              <Text style={[typography.labelSm, { color: colors.secondary, marginTop: 2 }]}>ID: 992-DELTA</Text>
            </View>
            <Text style={[typography.labelSm, { color: colors.error, fontWeight: '700' }]}>CRITICAL</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.mandateCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]} activeOpacity={0.9}>
            <View style={[styles.mandateIcon, { backgroundColor: colors.surfaceContainerHigh }]}>
              <MaterialIcons name="sync" size={20} color={colors.primary} />
            </View>
            <View style={styles.mandateBody}>
              <Text style={[typography.labelCaps, { color: colors.primary, fontSize: 12 }]}>NODE_SYNCHRONIZATION</Text>
              <Text style={[typography.labelSm, { color: colors.secondary, marginTop: 2 }]}>ID: 881-ALPHA</Text>
            </View>
            <Text style={[typography.labelSm, { color: colors.secondary, fontWeight: '700' }]}>QUEUED</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.mandateCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]} activeOpacity={0.9}>
            <View style={[styles.mandateIcon, { backgroundColor: colors.surfaceContainerHigh }]}>
              <MaterialIcons name="verified" size={20} color={colors.primary} />
            </View>
            <View style={styles.mandateBody}>
              <Text style={[typography.labelCaps, { color: colors.primary, fontSize: 12 }]}>SECURITY_AUDIT_L4</Text>
              <Text style={[typography.labelSm, { color: colors.secondary, marginTop: 2 }]}>ID: 704-GAMMA</Text>
            </View>
            <Text style={[typography.labelSm, { color: colors.tertiaryContainer, fontWeight: '700' }]}>RESOLVED</Text>
          </TouchableOpacity>
        </View>

        {/* Atmospheric Footer */}
        <View style={styles.atmosphericFooter}>
          <View style={[styles.gridPattern, { borderColor: colors.outlineVariant }]}>
            {/* Mock grid lines using borders inside */}
            <View style={styles.gridLines} />
          </View>
          <Text style={[typography.labelSm, { color: colors.secondary, marginTop: 8, textAlign: 'center' }]}>STATION-STATUS: OPTIMAL</Text>
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
    paddingHorizontal: 24,
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
    padding: 16,
    paddingBottom: 64,
  },
  pageHeader: {
    marginBottom: 32,
  },
  bentoCard: {
    borderWidth: 1,
    padding: 24,
    marginBottom: 32,
  },
  bentoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  tagBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 16,
  },
  splitRow: {
    flexDirection: 'row',
    gap: 16,
  },
  splitCol: {
    flex: 1,
    borderLeftWidth: 2,
    paddingLeft: 16,
    paddingVertical: 8,
  },
  sparklineContainer: {
    height: 96,
    width: '100%',
    alignItems: 'flex-end',
  },
  sparklineFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  trendIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  barChartRow: {
    marginBottom: 16,
  },
  barLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  progressBarBg: {
    height: 8,
    width: '100%',
  },
  progressBarFill: {
    height: '100%',
  },
  mandatesSection: {
    marginBottom: 32,
  },
  mandatesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  mandateCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
    marginBottom: 8,
  },
  mandateIcon: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  mandateBody: {
    flex: 1,
  },
  atmosphericFooter: {
    paddingTop: 32,
    paddingBottom: 32,
  },
  gridPattern: {
    height: 64,
    borderWidth: 1,
    opacity: 0.3,
    backgroundColor: '#00000005', // Subtle texture mock
  }
});

export default TeamDashboardScreen;
