import React from "react";
import { 
  View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image 
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";

const TimelineViewScreen = ({ navigation }) => {
  const { colors, typography } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* TopAppBar */}
      <View style={[styles.header, { borderBottomColor: colors.surfaceDim, backgroundColor: colors.surface }]}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
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

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Summary Metrics */}
        <View style={styles.metricsRow}>
          <View style={[styles.bentoItem, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
            <Text style={[typography.labelCaps, { color: colors.onSecondaryContainer, marginBottom: 4 }]}>EFFICIENCY</Text>
            <View style={styles.metricValueRow}>
              <Text style={[typography.headlineLgMobile, { color: colors.primary, fontWeight: '700' }]}>94</Text>
              <Text style={[typography.labelSm, { color: colors.secondary, marginLeft: 2 }]}>%</Text>
            </View>
            <View style={[styles.progressBarBg, { backgroundColor: colors.surfaceContainerLow }]}>
              <View style={[styles.progressBarFill, { backgroundColor: colors.primary, width: '94%' }]} />
            </View>
          </View>

          <View style={[styles.bentoItem, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
            <Text style={[typography.labelCaps, { color: colors.onSecondaryContainer, marginBottom: 4 }]}>PATH LOAD</Text>
            <Text style={[typography.headlineLgMobile, { color: colors.primary, fontWeight: '700' }]}>0.82</Text>
            <Text style={[typography.labelSm, { color: colors.onTertiaryContainer, marginTop: 12 }]}>OPTIMAL</Text>
          </View>
        </View>

        {/* Current Time Indicator */}
        <View style={styles.timeAnchorContainer}>
          <View style={[styles.timeAnchor, { borderColor: colors.primary, backgroundColor: colors.surfaceContainerLowest }]}>
            <Text style={[typography.labelCaps, { color: colors.primary, fontWeight: '600' }]}>NOW — OCT 24, 09:42</Text>
          </View>
        </View>

        {/* Vertical Timeline */}
        <View style={styles.timelineSection}>
          <View style={[styles.timelineLine, { backgroundColor: colors.surfaceDim }]} />

          {/* Timeline Entry 1 (Active/Now) */}
          <View style={styles.timelineEntry}>
            <View style={[styles.markerActive, { backgroundColor: colors.primary }]} />
            <View style={[styles.entryCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.primary }]}>
              <View style={styles.entryHeader}>
                <Text style={[typography.bodyMd, { color: colors.primary, fontWeight: '700', flex: 1 }]}>Infrastructure Stress Test</Text>
                <View style={[styles.tagBadge, { backgroundColor: colors.tertiaryContainer }]}>
                  <Text style={[typography.labelCaps, { color: colors.onTertiaryContainer, fontSize: 10 }]}>LIVE</Text>
                </View>
              </View>
              <View style={styles.entryMeta}>
                <MaterialIcons name="memory" size={16} color={colors.secondary} />
                <Text style={[typography.labelSm, { color: colors.secondary, marginLeft: 8 }]}>CORE-01</Text>
              </View>
              <View style={styles.progressSection}>
                <View style={styles.progressLabels}>
                  <Text style={[typography.labelCaps, { color: colors.onSecondaryContainer, fontSize: 10 }]}>IN PROGRESS</Text>
                  <Text style={[typography.labelSm, { color: colors.primary, fontWeight: '700' }]}>68%</Text>
                </View>
                <View style={[styles.progressBarBg, { backgroundColor: colors.surfaceContainerLow, height: 8 }]}>
                  <View style={[styles.progressBarFill, { backgroundColor: colors.primary, width: '68%' }]} />
                </View>
              </View>
            </View>
          </View>

          {/* Timeline Entry 2 */}
          <View style={styles.timelineEntry}>
            <View style={[styles.markerInactive, { backgroundColor: colors.surfaceDim }]} />
            <View style={[styles.entryCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.surfaceDim }]}>
              <View style={styles.entryHeader}>
                <Text style={[typography.bodyMd, { color: colors.primary, fontWeight: '700', flex: 1 }]}>API Schema Refactor</Text>
                <View style={[styles.tagBadge, { backgroundColor: colors.secondaryContainer }]}>
                  <Text style={[typography.labelCaps, { color: colors.onSecondaryContainer, fontSize: 10 }]}>QUEUED</Text>
                </View>
              </View>
              <View style={styles.entryMeta}>
                <MaterialIcons name="person" size={16} color={colors.secondary} />
                <Text style={[typography.labelSm, { color: colors.secondary, marginLeft: 8 }]}>J. COLLINS</Text>
              </View>
              <View style={styles.progressSection}>
                <View style={styles.progressLabels}>
                  <Text style={[typography.labelCaps, { color: colors.onSecondaryContainer, fontSize: 10 }]}>REMAINING</Text>
                  <Text style={[typography.labelSm, { color: colors.primary }]}>4.5h</Text>
                </View>
                <View style={[styles.progressBarBg, { backgroundColor: colors.surfaceContainerLow, height: 8 }]}>
                  <View style={[styles.progressBarFill, { backgroundColor: colors.surfaceDim, width: '0%' }]} />
                </View>
              </View>
            </View>
          </View>

          {/* Visual Break: Data Image */}
          <View style={styles.timelineEntry}>
            <View style={[styles.markerInactive, { backgroundColor: colors.surfaceDim }]} />
            <View style={styles.imageCard}>
              <Image 
                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuByJJnW5UCg5pE-kTZdJh0uyHelVJEd3b5ZIF1mUMI0jbaDeSHij6GAkUyIhEADjpx5w7j214qcSMyRQxH5rgo9FQC_6pTHVH_Q0tYxfiKeJzOfuAqks3HayXzUKvx2sKuvos35wetCTFt-1XLKDPgCMSCsXXIddrGU5r7t1jjqdba3HU7isB15pcwsSZ3Nnm8NB6ELsve96hkhQPVDleRcLakr1iCz4AF490POhPLz6Ni5PoRj2AsFMQ' }}
                style={styles.imageContent}
              />
            </View>
            <Text style={[typography.labelSm, { color: colors.secondary, fontStyle: 'italic', marginTop: 8, paddingLeft: 48 }]}>
              Architecture snapshot for Node-9 documentation.
            </Text>
          </View>

          {/* Timeline Entry 3 */}
          <View style={styles.timelineEntry}>
            <View style={[styles.markerInactive, { backgroundColor: colors.surfaceDim }]} />
            <View style={[styles.entryCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.surfaceDim, opacity: 0.8 }]}>
              <View style={styles.entryHeader}>
                <Text style={[typography.bodyMd, { color: colors.primary, fontWeight: '700', flex: 1 }]}>Database Migration</Text>
                <View style={[styles.tagBadge, { backgroundColor: colors.surfaceContainerHighest }]}>
                  <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant, fontSize: 10 }]}>DONE</Text>
                </View>
              </View>
              <View style={styles.entryMeta}>
                <MaterialIcons name="database" size={16} color={colors.secondary} />
                <Text style={[typography.labelSm, { color: colors.secondary, marginLeft: 8 }]}>DB-CLUSTER</Text>
              </View>
              <View style={styles.progressSection}>
                <View style={styles.progressLabels}>
                  <Text style={[typography.labelCaps, { color: colors.onSecondaryContainer, fontSize: 10 }]}>COMPLETE</Text>
                  <Text style={[typography.labelSm, { color: colors.primary, fontWeight: '700' }]}>100%</Text>
                </View>
                <View style={[styles.progressBarBg, { backgroundColor: colors.surfaceContainerLow, height: 8 }]}>
                  <View style={[styles.progressBarFill, { backgroundColor: colors.onTertiaryContainer, width: '100%' }]} />
                </View>
              </View>
            </View>
          </View>

          {/* Timeline Entry 4 */}
          <View style={[styles.timelineEntry, { marginBottom: 0 }]}>
            <View style={[styles.markerInactive, { backgroundColor: colors.surfaceDim }]} />
            <View style={[styles.entryCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.surfaceDim }]}>
              <View style={styles.entryHeader}>
                <Text style={[typography.bodyMd, { color: colors.primary, fontWeight: '700', flex: 1 }]}>Security Audit: Phase 2</Text>
                <View style={[styles.tagBadge, { backgroundColor: colors.secondaryContainer }]}>
                  <Text style={[typography.labelCaps, { color: colors.onSecondaryContainer, fontSize: 10 }]}>UPCOMING</Text>
                </View>
              </View>
              <View style={styles.entryMeta}>
                <MaterialIcons name="lock" size={16} color={colors.secondary} />
                <Text style={[typography.labelSm, { color: colors.secondary, marginLeft: 8 }]}>SEC-OPS</Text>
              </View>
              <View style={styles.progressSection}>
                <View style={styles.progressLabels}>
                  <Text style={[typography.labelCaps, { color: colors.onSecondaryContainer, fontSize: 10 }]}>STARTING IN</Text>
                  <Text style={[typography.labelSm, { color: colors.primary, fontWeight: '700' }]}>12h</Text>
                </View>
                <View style={[styles.progressBarBg, { backgroundColor: colors.surfaceContainerLow, height: 8 }]}>
                  <View style={[styles.progressBarFill, { backgroundColor: colors.surfaceDim, width: '0%' }]} />
                </View>
              </View>
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
  metricsRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 32,
  },
  bentoItem: {
    flex: 1,
    padding: 24,
    borderWidth: 1,
    borderRadius: 16,
  },
  metricValueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  progressBarBg: {
    height: 4,
    width: '100%',
    borderRadius: 4,
    marginTop: 16,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
  },
  timeAnchorContainer: {
    zIndex: 10,
    marginBottom: 16,
    paddingLeft: 48, // Aligned with content slightly offset
  },
  timeAnchor: {
    borderWidth: 2,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },
  timelineSection: {
    position: 'relative',
    paddingBottom: 32,
  },
  timelineLine: {
    position: 'absolute',
    left: 24,
    top: 0,
    bottom: 0,
    width: 2,
  },
  timelineEntry: {
    position: 'relative',
    paddingLeft: 48,
    marginBottom: 32,
  },
  markerActive: {
    position: 'absolute',
    left: 19,
    top: 8,
    width: 12,
    height: 12,
    borderRadius: 6,
    zIndex: 10,
  },
  markerInactive: {
    position: 'absolute',
    left: 21,
    top: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    zIndex: 5,
  },
  entryCard: {
    padding: 24,
    borderWidth: 1,
    borderRadius: 16,
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  tagBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 16,
  },
  entryMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  progressSection: {
    marginTop: 8,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 4,
  },
  imageCard: {
    height: 160,
    borderWidth: 1,
    borderColor: '#D9DADC',
    borderRadius: 16,
    overflow: 'hidden',
  },
  imageContent: {
    width: '100%',
    height: '100%',
  }
});

export default TimelineViewScreen;
