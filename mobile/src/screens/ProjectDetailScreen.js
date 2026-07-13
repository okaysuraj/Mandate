import React, { useState, useEffect } from "react";
import { 
  View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image 
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";

const ProjectDetailScreen = ({ route, navigation }) => {
  const { project } = route.params || { project: { _id: "PX-909", name: "HELIOS-PRIMARY INTERFACE", healthIndex: 74.2 } };
  const { colors, typography, spacing, borderRadius } = useTheme();

  // Simulating telemetry data changes
  const [uptime, setUptime] = useState(99.98);
  useEffect(() => {
    const interval = setInterval(() => {
      const val = 99.95 + Math.random() * 0.04;
      setUptime(val);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const progress = project.healthIndex || 74.2;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* TopAppBar */}
      <View style={[styles.header, { borderBottomColor: colors.outlineVariant }]}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 8 }}>
            <MaterialIcons name="arrow-back" size={24} color={colors.primary} />
          </TouchableOpacity>
          <Text style={[typography.headlineLgMobile, { color: colors.primary, fontWeight: '900', letterSpacing: -1 }]}>
            PROMETHEUS
          </Text>
        </View>
        <View style={[styles.avatarContainer, { borderColor: colors.outlineVariant }]}>
          <Image 
            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBrx3AAqc6LeDSbPS91FhjNKvScl6XrVEeG2QRPJigxZAkVf4s3Wy-ZSX42pRHnNejsazNpIYNnMzK_n736koVUHSi_BC9GOyBLcpP01ZlG8jQCi9cRjpLXzECvxOKvsyxHd7LcaeylMV9iZnpPr4CTeNL0R6I6FgLo2x_NQYuc2_ASDGxmN94YQK02je7OgnyYZlYTaz-HavhWXOjdxR6owfzfD-yescj2qKG6MTFG_madD8DMrmaXbg' }}
            style={styles.avatarImage}
          />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Project Title Section */}
        <View style={styles.section}>
          <View style={styles.titleBadgeRow}>
            <View style={[styles.sequenceBadge, { backgroundColor: 'rgba(60, 227, 106, 0.2)' }]}>
              <Text style={[typography.labelCaps, { color: colors.onTertiaryContainer, fontSize: 10 }]}>ACTIVE SEQUENCE</Text>
            </View>
            <Text style={[typography.labelCaps, { color: colors.secondary, fontSize: 10 }]}>
              #{project._id?.substring(0,6).toUpperCase() || 'PX-909'}
            </Text>
          </View>
          <Text style={[typography.headlineLgMobile, { color: colors.primary, textTransform: 'uppercase' }]}>
            {project.name || "HELIOS-PRIMARY INTERFACE"}
          </Text>
        </View>

        {/* Status Telemetry Bento */}
        <View style={[styles.section, styles.telemetryBento, { backgroundColor: colors.primaryContainer, borderColor: colors.primary }]}>
          <View style={styles.telemetryHeader}>
            <View>
              <Text style={[typography.labelCaps, { color: colors.onPrimaryContainer, opacity: 0.6 }]}>SYSTEM STATUS</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                <View style={[styles.pulseDot, { backgroundColor: colors.tertiaryFixed }]} />
                <Text style={[typography.headlineLgMobile, { color: colors.onTertiaryFixedVariant }]}>Status: Nominal</Text>
              </View>
            </View>
            <Text style={[typography.labelSm, { color: colors.onPrimaryContainer, opacity: 0.4 }]}>AUTO_REFRESH: ON</Text>
          </View>

          <View style={[styles.telemetryFooter, { borderTopColor: 'rgba(255,255,255,0.1)' }]}>
            <View style={{ flex: 1 }}>
              <Text style={[typography.labelCaps, { color: colors.onPrimaryContainer, opacity: 0.6 }]}>UPTIME</Text>
              <Text style={[typography.labelSm, { color: colors.onSecondary, fontWeight: '700', marginTop: 2 }]}>{uptime.toFixed(2)}% / 144HR</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[typography.labelCaps, { color: colors.onPrimaryContainer, opacity: 0.6 }]}>LOAD</Text>
              <Text style={[typography.labelSm, { color: colors.onSecondary, fontWeight: '700', marginTop: 2 }]}>0.42 OPS/SEC</Text>
            </View>
          </View>
        </View>

        {/* Core Metrics Vertical Stack */}
        <View style={styles.section}>
          {/* Progress Card */}
          <View style={[styles.metricCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
            <View style={styles.metricHeader}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <MaterialIcons name="explore" size={18} color={colors.primary} style={{ marginRight: 8 }} />
                <Text style={[typography.labelCaps, { color: colors.secondary }]}>PROGRESS</Text>
              </View>
              <Text style={[typography.headlineLgMobile, { color: colors.primary }]}>{progress}%</Text>
            </View>
            <View style={[styles.progressBarBg, { backgroundColor: colors.surfaceContainer }]}>
              <View style={[styles.progressBarFill, { backgroundColor: colors.primary, width: `${progress}%` }]} />
            </View>
            <Text style={[typography.labelSm, { color: colors.secondary, marginTop: 12 }]}>Estimated completion: Q4 FY24</Text>
          </View>

          {/* Efficiency Card */}
          <View style={[styles.metricCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
            <View style={styles.metricHeader}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <MaterialIcons name="bolt" size={18} color={colors.primary} style={{ marginRight: 8 }} />
                <Text style={[typography.labelCaps, { color: colors.secondary }]}>EFFICIENCY</Text>
              </View>
              <Text style={[typography.headlineLgMobile, { color: colors.primary }]}>A+</Text>
            </View>
            <View style={styles.efficiencyBars}>
              <View style={[styles.effBar, { backgroundColor: colors.primary }]} />
              <View style={[styles.effBar, { backgroundColor: colors.primary }]} />
              <View style={[styles.effBar, { backgroundColor: colors.primary }]} />
              <View style={[styles.effBar, { backgroundColor: colors.primary }]} />
              <View style={[styles.effBar, { backgroundColor: colors.surfaceContainer }]} />
            </View>
            <Text style={[typography.labelSm, { color: colors.onTertiaryContainer, fontWeight: '700', marginTop: 12 }]}>OPTIMIZED PATHWAY DETECTED</Text>
          </View>

          {/* Active Mandates Card */}
          <View style={[styles.metricCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
            <View style={styles.metricHeader}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <MaterialIcons name="shield" size={18} color={colors.primary} style={{ marginRight: 8 }} />
                <Text style={[typography.labelCaps, { color: colors.secondary }]}>ACTIVE MANDATES</Text>
              </View>
              <Text style={[typography.headlineLgMobile, { color: colors.primary }]}>12</Text>
            </View>
            <View style={styles.avatarStackContainer}>
              <View style={[styles.stackAvatar, { backgroundColor: colors.surface, zIndex: 3 }]} />
              <View style={[styles.stackAvatar, { backgroundColor: colors.surfaceVariant, zIndex: 2, marginLeft: -8 }]} />
              <View style={[styles.stackAvatar, { backgroundColor: colors.primaryContainer, zIndex: 1, marginLeft: -8, alignItems: 'center', justifyContent: 'center' }]}>
                <Text style={{ fontSize: 10, color: 'white' }}>+9</Text>
              </View>
            </View>
            <TouchableOpacity style={{ marginTop: 12 }}>
              <Text style={[typography.labelCaps, { color: colors.primary }]}>VIEW ALL PROTOCOLS -{">"}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Chronological Recent Activity */}
        <View style={styles.section}>
          <Text style={[typography.labelCaps, { color: colors.secondary, borderBottomWidth: 1, borderBottomColor: colors.outlineVariant, paddingBottom: 4, marginBottom: 16 }]}>
            RECENT ACTIVITY
          </Text>
          
          <View style={styles.timeline}>
            <View style={[styles.timelineLine, { backgroundColor: colors.outlineVariant }]} />
            
            {/* Item 1 */}
            <View style={styles.timelineItem}>
              <View style={[styles.timelineIconContainer, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
                <MaterialIcons name="cloud-upload" size={14} color={colors.primary} />
              </View>
              <View style={styles.timelineContent}>
                <Text style={[typography.bodyMd, { color: colors.primary }]}>
                  <Text style={{ fontWeight: '700' }}>Core Module</Text> synced with primary relay.
                </Text>
                <Text style={[typography.labelSm, { color: colors.secondary, marginTop: 4 }]}>14m ago — Sector 7G</Text>
              </View>
            </View>

            {/* Item 2 */}
            <View style={styles.timelineItem}>
              <View style={[styles.timelineIconContainer, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
                <MaterialIcons name="person" size={14} color={colors.primary} />
              </View>
              <View style={styles.timelineContent}>
                <Text style={[typography.bodyMd, { color: colors.primary }]}>
                  <Text style={{ fontWeight: '700' }}>User AD-1</Text> modified interface parameters.
                </Text>
                <Text style={[typography.labelSm, { color: colors.secondary, marginTop: 4 }]}>2h ago — Admin Console</Text>
              </View>
            </View>

            {/* Item 3 */}
            <View style={styles.timelineItem}>
              <View style={[styles.timelineIconContainer, { backgroundColor: colors.errorContainer, borderColor: colors.error }]}>
                <MaterialIcons name="warning" size={14} color={colors.error} />
              </View>
              <View style={styles.timelineContent}>
                <Text style={[typography.bodyMd, { color: colors.primary }]}>
                  <Text style={{ fontWeight: '700' }}>Encryption Alert:</Text> Minor handshake latency.
                </Text>
                <Text style={[typography.labelSm, { color: colors.error, fontWeight: '700', marginTop: 4 }]}>5h ago — Auto-resolved</Text>
              </View>
            </View>

            {/* Item 4 */}
            <View style={styles.timelineItem}>
              <View style={[styles.timelineIconContainer, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
                <MaterialIcons name="check-circle" size={14} color={colors.primary} />
              </View>
              <View style={styles.timelineContent}>
                <Text style={[typography.bodyMd, { color: colors.primary }]}>
                  <Text style={{ fontWeight: '700' }}>Milestone Alpha</Text> confirmed by controller.
                </Text>
                <Text style={[typography.labelSm, { color: colors.secondary, marginTop: 4 }]}>Yesterday — System Finalized</Text>
              </View>
            </View>

          </View>
        </View>
      </ScrollView>

      {/* Pinned Primary Action */}
      <View style={styles.pinnedActionContainer}>
        <TouchableOpacity style={[styles.primaryBtn, { backgroundColor: colors.primary }]} activeOpacity={0.8}>
          <MaterialIcons name="rocket-launch" size={20} color={colors.onPrimary} style={{ marginRight: 12 }} />
          <Text style={[typography.labelCaps, { color: colors.onPrimary, letterSpacing: 2 }]}>INITIALIZE SEQUENCE</Text>
        </TouchableOpacity>
      </View>
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
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  content: {
    padding: 16,
    paddingBottom: 120, // space for pinned FAB and BottomNav
  },
  section: {
    marginBottom: 24,
  },
  titleBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  sequenceBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  telemetryBento: {
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
  },
  telemetryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  pulseDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  telemetryFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    paddingTop: 16,
  },
  metricCard: {
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 16,
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  progressBarBg: {
    width: '100%',
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
  },
  efficiencyBars: {
    flexDirection: 'row',
    gap: 4,
  },
  effBar: {
    flex: 1,
    height: 32,
    borderRadius: 4,
  },
  avatarStackContainer: {
    flexDirection: 'row',
  },
  stackAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: 'white',
  },
  timeline: {
    position: 'relative',
    paddingLeft: 12, // Space for line and icons
  },
  timelineLine: {
    position: 'absolute',
    left: 23,
    top: 8,
    bottom: 8,
    width: 1,
  },
  timelineItem: {
    position: 'relative',
    paddingLeft: 36,
    marginBottom: 24,
  },
  timelineIconContainer: {
    position: 'absolute',
    left: -12,
    top: 2,
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  timelineContent: {
    marginLeft: 0,
  },
  pinnedActionContainer: {
    position: 'absolute',
    bottom: 24,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    zIndex: 50,
  },
  primaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    borderRadius: 9999,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 10,
  }
});

export default ProjectDetailScreen;
