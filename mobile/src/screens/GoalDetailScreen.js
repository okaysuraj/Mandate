import React from "react";
import {
  View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";
import Svg, { Circle } from 'react-native-svg';

const GoalDetailScreen = ({ route, navigation }) => {
  const { goal } = route.params || { goal: { _id: "NEURAL_EXPANSION_V4", title: "Neural Expansion V4", progress: 70 } };
  const { colors, typography, spacing, borderRadius } = useTheme();

  const progress = goal.progress || 70;
  
  // Svg circular progress math
  const size = 120;
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.surface }]}>
      {/* TopAppBar */}
      <View style={[styles.header, { borderBottomColor: colors.outlineVariant, backgroundColor: colors.surface }]}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 8 }}>
            <MaterialIcons name="arrow-back" size={24} color={colors.primary} />
          </TouchableOpacity>
          <MaterialIcons name="terminal" size={20} color={colors.primary} />
          <Text style={[typography.labelCaps, { color: colors.primary, marginLeft: spacing.sm, letterSpacing: 2 }]}>
            MANDATE
          </Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconButton}>
            <MaterialIcons name="search" size={24} color={colors.secondary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <MaterialIcons name="account-circle" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Goal Header */}
        <View style={styles.section}>
          <View style={styles.goalIdRow}>
            <View style={[styles.idBadge, { backgroundColor: colors.primaryContainer }]}>
              <Text style={[typography.labelCaps, { color: colors.onPrimaryContainer, fontSize: 10 }]}>
                GOAL_ID: {goal._id?.substring(0, 8).toUpperCase() || "MX-2900"}
              </Text>
            </View>
            <TouchableOpacity>
              <MaterialIcons name="more-vert" size={24} color={colors.primary} />
            </TouchableOpacity>
          </View>
          <Text style={[typography.headlineLgMobile, { color: colors.primary, textTransform: 'uppercase', marginVertical: 8 }]}>
            {goal.title}
          </Text>
          <View style={styles.statusRow}>
            <View style={[styles.pulseDot, { backgroundColor: colors.onTertiaryContainer }]} />
            <Text style={[typography.labelSm, { color: colors.onTertiaryContainer }]}>ACTIVE_OPTIMIZED</Text>
          </View>
        </View>

        {/* Bento Grid: Main Metrics */}
        <View style={[styles.section, styles.bentoGrid]}>
          {/* Progress Gauge */}
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
                <Text style={[typography.displayLg, { fontSize: 32, color: colors.primary }]}>{progress}%</Text>
                <Text style={[typography.labelCaps, { fontSize: 8, color: colors.secondary, marginTop: -4 }]}>COMPLETION</Text>
              </View>
            </View>
            <Text style={[typography.labelSm, { color: colors.secondary, marginTop: 16, textAlign: 'center' }]}>
              Syncing with Phase_03 protocols...
            </Text>
          </View>

          {/* Success Probability */}
          <View style={[styles.bentoCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant, justifyContent: 'space-between' }]}>
            <View>
              <Text style={[typography.labelCaps, { color: colors.secondary }]}>SUCCESS_PROBABILITY</Text>
              <View style={{ flexDirection: 'row', alignItems: 'baseline', marginTop: 4 }}>
                <Text style={[typography.headlineLgMobile, { color: colors.primary }]}>94.2%</Text>
                <Text style={[typography.labelSm, { color: colors.onTertiaryContainer, fontWeight: 'bold', marginLeft: 4 }]}>+1.2%</Text>
              </View>
            </View>
            {/* Mock Chart */}
            <View style={styles.chartContainer}>
              {[40, 55, 45, 70, 65, 85, 94].map((h, i) => (
                <View key={i} style={[styles.chartBar, { height: `${h}%`, backgroundColor: colors.primary }]} />
              ))}
            </View>
            <View style={[styles.tminusRow, { borderTopColor: colors.surfaceContainer }]}>
              <Text style={[typography.labelCaps, { color: colors.secondary }]}>T-MINUS</Text>
              <Text style={[typography.labelCaps, { color: colors.primary }]}>12:04:11:59</Text>
            </View>
          </View>
        </View>

        {/* Linked Mandates List */}
        <View style={styles.section}>
          <Text style={[typography.labelCaps, { color: colors.secondary, marginBottom: 8, paddingHorizontal: 4 }]}>LINKED_MANDATES</Text>
          <View style={[styles.linkedList, { borderTopColor: colors.surfaceContainerHigh, borderBottomColor: colors.surfaceContainerHigh }]}>
            
            {/* Item 1 */}
            <View style={[styles.linkedItem, { borderBottomColor: colors.surfaceContainerHigh }]}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <MaterialIcons name="hub" size={20} color={colors.secondary} style={{ marginRight: 12 }} />
                <View>
                  <Text style={[typography.labelSm, { color: colors.primary, fontWeight: '700' }]}>SYNAPSE_LOAD_BALANCER</Text>
                  <Text style={[typography.labelSm, { color: colors.secondary }]}>ID: MX-2900</Text>
                </View>
              </View>
              <View style={[styles.badgeOutline, { borderColor: colors.onTertiaryContainer }]}>
                <Text style={[typography.labelCaps, { fontSize: 8, color: colors.onTertiaryContainer }]}>VALIDATED</Text>
              </View>
            </View>

            {/* Item 2 */}
            <View style={[styles.linkedItem, { borderBottomColor: colors.surfaceContainerHigh }]}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <MaterialIcons name="psychology" size={20} color={colors.secondary} style={{ marginRight: 12 }} />
                <View>
                  <Text style={[typography.labelSm, { color: colors.primary, fontWeight: '700' }]}>LATENCY_REDUCTION_X</Text>
                  <Text style={[typography.labelSm, { color: colors.secondary }]}>ID: MX-3102</Text>
                </View>
              </View>
              <View style={[styles.badgeOutline, { borderColor: colors.primary }]}>
                <Text style={[typography.labelCaps, { fontSize: 8, color: colors.primary }]}>IN_PROGRESS</Text>
              </View>
            </View>

          </View>
        </View>

        {/* Milestone Log */}
        <View style={styles.section}>
          <Text style={[typography.labelCaps, { color: colors.secondary, marginBottom: 8, paddingHorizontal: 4 }]}>MILESTONE_LOG</Text>
          <View style={{ gap: 12 }}>
            {/* Milestone 1 */}
            <View style={[styles.milestoneCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
              <View style={[styles.milestoneAccent, { backgroundColor: colors.onTertiaryContainer }]} />
              <View style={styles.milestoneHeader}>
                <View style={{ flex: 1 }}>
                  <Text style={[typography.labelCaps, { color: colors.onTertiaryContainer }]}>PHASE_01: INITIAL_MAPPING</Text>
                  <Text style={[typography.bodyMd, { color: colors.onSurface, marginTop: 4 }]}>Completed neural architecture scan with 0.001% variance. Integration successful.</Text>
                </View>
                <MaterialIcons name="check-circle" size={20} color={colors.onTertiaryContainer} />
              </View>
              <Text style={[typography.labelSm, { color: colors.secondary, marginTop: 12 }]}>TIMESTAMP: 2024.10.12.09:00:00</Text>
            </View>

            {/* Pending Milestone */}
            <View style={[styles.milestoneCard, { backgroundColor: colors.surface, borderColor: colors.outlineVariant, borderStyle: 'dashed' }]}>
              <View style={[styles.milestoneHeader, { opacity: 0.5 }]}>
                <View style={{ flex: 1 }}>
                  <Text style={[typography.labelCaps, { color: colors.secondary }]}>PHASE_03: GLOBAL_SYNC</Text>
                  <Text style={[typography.bodyMd, { color: colors.secondary, marginTop: 4 }]}>Awaiting completion of capacity expansion and node validation.</Text>
                </View>
                <MaterialIcons name="pending" size={20} color={colors.secondary} />
              </View>
            </View>
          </View>
        </View>

        {/* Image / Token */}
        <View style={[styles.imageContainer, { backgroundColor: colors.surfaceContainerHigh }]}>
          <Image 
            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAKGIcuQgFjMMEhBqShD0HD6q2xleJoZxSSSeA2zv4DfqTEFTkxOqnSQwTkCV1OhYjBdN6YWLiBEgq90FQCtkCIxYZ9livnVFVK6gabf5z0mPJOXFd7SYVVO2Fva9TcHvq2jIRAaBfjomZfDZPMp9lfHRgvEX_Pffa0iMODn2iOhQCjkIUr2AwtH39YX47lZUxZTH5-SEoPM0a9T10tUQ_fAjYJkcMSEaYxjv2Y78UVx5HO8Pk_9j8VSg' }}
            style={styles.image}
          />
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
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: 8,
    marginLeft: 4,
  },
  content: {
    padding: 16,
    paddingTop: 32,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 32,
  },
  goalIdRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  idBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pulseDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  bentoGrid: {
    flexDirection: 'column',
    gap: 16,
  },
  bentoCard: {
    borderWidth: 1,
    padding: 24,
  },
  chartContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 100,
    marginTop: 16,
    gap: 4,
  },
  chartBar: {
    flex: 1,
  },
  tminusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
  },
  linkedList: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  linkedItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
  },
  badgeOutline: {
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
  },
  milestoneCard: {
    borderWidth: 1,
    padding: 16,
    position: 'relative',
    overflow: 'hidden',
  },
  milestoneAccent: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
  },
  milestoneHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginLeft: 8, // space for accent
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 16/9,
    borderRadius: 8,
    overflow: 'hidden',
    marginTop: 16,
  },
  image: {
    width: '100%',
    height: '100%',
  }
});

export default GoalDetailScreen;
