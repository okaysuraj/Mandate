import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

const ProjectTimelineScreen = ({ navigation }) => {
  const { colors, typography, spacing, borderRadius } = useTheme();
  
  const [viewMode, setViewMode] = useState('WEEKLY'); // 'WEEKLY' | 'MONTHLY'

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      {/* TopAppBar */}
      <View style={[styles.header, { backgroundColor: colors.background, borderBottomColor: colors.outlineVariant }]}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.iconBtn}>
            <MaterialIcons name="grid-view" size={24} color={colors.primary} />
          </TouchableOpacity>
          <Text style={[typography.headlineLgMobile, { color: colors.primary, fontWeight: '900', letterSpacing: -1, marginLeft: 8 }]}>PROMETHEUS</Text>
        </View>
        <View style={[styles.avatarContainer, { borderColor: colors.outlineVariant, backgroundColor: colors.surfaceContainerHigh }]}>
          <Image 
            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDnmHq4P7X8mAbB03gF0W8ai3bM1MK8dhiF6_37Gmvut8Eq4ML7R4x4gdB1q-eEJiHty2bdjE5EAeeGHob4t01A_ns89hL2OTVC5vfZrmqxPoQKePUQghOkruglakvs2FFjzkMDsXvUU7F5K_rSYzpDUNMXLO5-Byag8hv_y7v5ejKljoKzSAFzk9zZOnYDih0WssgO0Gj2VjodBoEfJ3uhxn8QPa0p29Gw0kHNaZpl6CUvtl7XInwjow' }}
            style={styles.avatarImg}
          />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        
        {/* Section Header & View Toggle */}
        <View style={styles.headerSection}>
          <View>
            <Text style={[typography.labelCaps, { color: colors.secondary, marginBottom: 4 }]}>OPERATIONAL ROADMAP</Text>
            <Text style={[typography.headlineLgMobile, { color: colors.primary }]}>Project Timeline</Text>
          </View>

          <View style={[styles.toggleContainer, { backgroundColor: colors.surfaceContainerLow, borderColor: colors.outlineVariant }]}>
            <TouchableOpacity 
              style={[styles.toggleBtn, viewMode === 'WEEKLY' ? { backgroundColor: colors.primary } : null]}
              onPress={() => setViewMode('WEEKLY')}
            >
              <Text style={[typography.labelCaps, viewMode === 'WEEKLY' ? { color: colors.onPrimary } : { color: colors.secondary }]}>WEEKLY</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.toggleBtn, viewMode === 'MONTHLY' ? { backgroundColor: colors.primary } : null]}
              onPress={() => setViewMode('MONTHLY')}
            >
              <Text style={[typography.labelCaps, viewMode === 'MONTHLY' ? { color: colors.onPrimary } : { color: colors.secondary }]}>MONTHLY</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Global Progress Bento Module */}
        <View style={[styles.progressCard, { backgroundColor: colors.surface, borderColor: colors.outlineVariant }]}>
          <View style={styles.progressHeader}>
            <View style={styles.progressHeaderLeft}>
              <MaterialIcons name="timeline" size={20} color={colors.primary} />
              <Text style={[typography.labelCaps, { color: colors.primary, marginLeft: 8 }]}>TOTAL COMPLETION</Text>
            </View>
            <Text style={[typography.labelSm, { fontWeight: 'bold', color: colors.primary }]}>64%</Text>
          </View>
          <View style={[styles.progressBarBg, { backgroundColor: colors.surfaceContainerHigh }]}>
            <View style={[styles.progressBarFill, { backgroundColor: colors.primary, width: '64%' }]} />
          </View>
          <View style={styles.progressFooter}>
            <Text style={[typography.labelCaps, { color: colors.secondary }]}>OCT 2023</Text>
            <Text style={[typography.labelCaps, { color: colors.secondary }]}>MAR 2024</Text>
          </View>
        </View>

        {/* Vertical Timeline List */}
        <View style={styles.timelineSection}>
          <View style={[styles.timelineLine, { backgroundColor: colors.outlineVariant }]} />

          {/* Milestone 1: Completed */}
          <View style={styles.timelineItem}>
            <View style={[styles.timelineDotWrapper, { backgroundColor: colors.background }]}>
              <View style={[styles.timelineDotDone, { backgroundColor: colors.tertiaryFixedDim, borderColor: colors.surface }]} />
            </View>
            <View style={[styles.timelineCard, { backgroundColor: colors.surfaceContainerLow, borderColor: colors.outlineVariant }]}>
              <View style={styles.timelineCardHeader}>
                <Text style={[typography.headlineLgMobile, { fontSize: 18, color: colors.primary }]}>Core Architecture</Text>
                <View style={[styles.badge, { backgroundColor: colors.tertiaryContainer }]}>
                  <Text style={[typography.labelCaps, { fontSize: 10, color: colors.onTertiaryContainer }]}>DONE</Text>
                </View>
              </View>
              <Text style={[typography.bodyMd, { fontSize: 14, color: colors.secondary, marginBottom: 16 }]}>Foundation of the distributed ledger and security protocols.</Text>
              
              <View style={styles.subtaskList}>
                <View style={styles.subtaskItem}>
                  <Text style={[typography.labelSm, { fontSize: 12, color: colors.secondary }]}>Protocol v1.0</Text>
                  <Text style={[typography.labelSm, { fontSize: 12, fontWeight: 'bold', color: colors.primary }]}>100%</Text>
                </View>
                <View style={styles.subtaskItem}>
                  <Text style={[typography.labelSm, { fontSize: 12, color: colors.secondary }]}>Security Audit</Text>
                  <Text style={[typography.labelSm, { fontSize: 12, fontWeight: 'bold', color: colors.primary }]}>100%</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Milestone 2: In Progress */}
          <View style={styles.timelineItem}>
            <View style={[styles.timelineDotWrapper, { backgroundColor: colors.background }]}>
              <View style={[styles.timelineDotActive, { backgroundColor: colors.primary, borderColor: colors.surface }]}>
                <View style={styles.timelineDotActiveInner} />
              </View>
            </View>
            <View style={[styles.timelineCard, { backgroundColor: '#ffffff', borderColor: colors.primary, borderWidth: 2 }]}>
              <View style={styles.timelineCardHeader}>
                <Text style={[typography.headlineLgMobile, { fontSize: 18, color: colors.primary }]}>Mesh Node Deployment</Text>
                <View style={[styles.badge, { backgroundColor: colors.primary }]}>
                  <Text style={[typography.labelCaps, { fontSize: 10, color: colors.onPrimary }]}>ACTIVE</Text>
                </View>
              </View>
              <Text style={[typography.bodyMd, { fontSize: 14, color: colors.secondary, marginBottom: 16 }]}>Scaling the physical node infrastructure across initial test zones.</Text>
              
              <View style={styles.statsGrid}>
                <View style={[styles.statBox, { backgroundColor: colors.surfaceContainerLow, borderColor: colors.outlineVariant }]}>
                  <Text style={[typography.labelCaps, { fontSize: 10, color: colors.secondary, marginBottom: 4 }]}>NODES ONLINE</Text>
                  <Text style={[typography.headlineLgMobile, { fontSize: 20, color: colors.primary }]}>412</Text>
                </View>
                <View style={[styles.statBox, { backgroundColor: colors.surfaceContainerLow, borderColor: colors.outlineVariant }]}>
                  <Text style={[typography.labelCaps, { fontSize: 10, color: colors.secondary, marginBottom: 4 }]}>STABILITY</Text>
                  <Text style={[typography.headlineLgMobile, { fontSize: 20, color: colors.primary }]}>99.4%</Text>
                </View>
              </View>

              <View style={[styles.expansionSection, { borderTopColor: colors.outlineVariant }]}>
                <View style={styles.expansionHeader}>
                  <Text style={[typography.labelSm, { fontSize: 12, fontWeight: 'bold', color: colors.primary, textTransform: 'uppercase' }]}>Zone B Expansion</Text>
                  <Text style={[typography.labelSm, { fontSize: 12, color: colors.primary }]}>72%</Text>
                </View>
                <View style={[styles.progressBarBg, { backgroundColor: colors.surfaceContainerHigh }]}>
                  <View style={[styles.progressBarFill, { backgroundColor: colors.primary, width: '72%' }]} />
                </View>
              </View>
            </View>
          </View>

          {/* Milestone 3: Upcoming */}
          <View style={styles.timelineItem}>
            <View style={[styles.timelineDotWrapper, { backgroundColor: colors.background }]}>
              <View style={[styles.timelineDotUpcoming, { backgroundColor: colors.outlineVariant, borderColor: colors.surface }]} />
            </View>
            <View style={[styles.timelineCard, { backgroundColor: colors.surface, borderColor: colors.outlineVariant, opacity: 0.7 }]}>
              <View style={styles.timelineCardHeader}>
                <Text style={[typography.headlineLgMobile, { fontSize: 18, color: colors.primary }]}>Neural API Integration</Text>
                <View style={[styles.badge, { backgroundColor: colors.surfaceContainerHigh }]}>
                  <Text style={[typography.labelCaps, { fontSize: 10, color: colors.secondary }]}>UPCOMING</Text>
                </View>
              </View>
              <Text style={[typography.bodyMd, { fontSize: 14, color: colors.secondary, marginBottom: 16 }]}>Automated system interfacing for third-party neural processing nodes.</Text>
              
              <View style={styles.upcomingFooter}>
                <View style={styles.avatarRow}>
                  <View style={[styles.smallAvatarContainer, { borderColor: colors.surface }]}>
                    <Image 
                      source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBkHiM5nO0cM5pMFg2ZdWp31H4Jew8aW2pbk4PNdARs9KVTFpSzGDyxG56H-xOnWSwm7KXZ41ajQQn47yPQYqjqMO6znoWKpPc1w0HCNUSkQpFGajUiNN5nqjJb-94LAcuZTQWxgi8FMQPosg6bDGu3M6CBSM_AzvONlsPwR9dXoanuibSPU5tv_J7E-cElrQ9ZqGDVq9GPUMwe04RHXFQuqqchSkZ_MVnje-aORSgqr8nPw87mNq6UAQ' }}
                      style={styles.avatarImg}
                    />
                  </View>
                  <View style={[styles.smallAvatarContainer, { backgroundColor: colors.primary, borderColor: colors.surface, marginLeft: -8, alignItems: 'center', justifyContent: 'center' }]}>
                    <Text style={{ fontSize: 8, fontWeight: 'bold', color: '#ffffff' }}>+3</Text>
                  </View>
                </View>
                <Text style={[typography.labelSm, { fontSize: 11, color: colors.secondary }]}>Scheduled: Jan 12</Text>
              </View>
            </View>
          </View>

          {/* Milestone 4: Upcoming */}
          <View style={styles.timelineItem}>
            <View style={[styles.timelineDotWrapper, { backgroundColor: colors.background }]}>
              <View style={[styles.timelineDotUpcoming, { backgroundColor: colors.outlineVariant, borderColor: colors.surface }]} />
            </View>
            <View style={[styles.timelineCard, { backgroundColor: colors.surface, borderColor: colors.outlineVariant, opacity: 0.7 }]}>
              <View style={styles.timelineCardHeader}>
                <Text style={[typography.headlineLgMobile, { fontSize: 18, color: colors.primary }]}>Public Beta Phase</Text>
                <View style={[styles.badge, { backgroundColor: colors.surfaceContainerHigh }]}>
                  <Text style={[typography.labelCaps, { fontSize: 10, color: colors.secondary }]}>Q1 2024</Text>
                </View>
              </View>
              <Text style={[typography.bodyMd, { fontSize: 14, color: colors.secondary }]}>Full scale network stress test and initial public validator onboarding.</Text>
            </View>
          </View>

        </View>

      </ScrollView>

      {/* FAB */}
      <TouchableOpacity style={[styles.fab, { backgroundColor: colors.primary }]}>
        <MaterialIcons name="add" size={24} color={colors.onPrimary} />
      </TouchableOpacity>

      {/* Bottom Nav */}
      <View style={[styles.bottomNav, { backgroundColor: colors.surface, borderTopColor: colors.outlineVariant }]}>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="inventory-2" size={24} color={colors.onSecondaryContainer} />
          <Text style={[typography.labelCaps, { color: colors.onSecondaryContainer, marginTop: 4 }]}>Projects</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="view-kanban" size={24} color={colors.onSecondaryContainer} />
          <Text style={[typography.labelCaps, { color: colors.onSecondaryContainer, marginTop: 4 }]}>Board</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navItemActive, { backgroundColor: colors.primaryContainer }]}>
          <MaterialIcons name="timeline" size={24} color={colors.onPrimaryContainer} />
          <Text style={[typography.labelCaps, { color: colors.onPrimaryContainer, marginTop: 4 }]}>Gantt</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="center-focus-strong" size={24} color={colors.onSecondaryContainer} />
          <Text style={[typography.labelCaps, { color: colors.onSecondaryContainer, marginTop: 4 }]}>Focus</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="analytics" size={24} color={colors.onSecondaryContainer} />
          <Text style={[typography.labelCaps, { color: colors.onSecondaryContainer, marginTop: 4 }]}>Metrics</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
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
  iconBtn: {
    padding: 8,
    marginHorizontal: -8,
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    overflow: 'hidden',
  },
  avatarImg: {
    width: '100%',
    height: '100%',
  },
  container: {
    flexGrow: 1,
    padding: 16, // px-md
    paddingTop: 32, // pt-lg
    paddingBottom: 120, // pb-xl conceptually + space for nav/fab
  },
  headerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 32, // mb-lg
  },
  toggleContainer: {
    flexDirection: 'row',
    borderRadius: 20,
    padding: 4,
    borderWidth: 1,
  },
  toggleBtn: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
  },
  progressCard: {
    borderWidth: 1,
    borderRadius: 16, // rounded-lg
    padding: 32, // p-lg
    marginBottom: 32,
    gap: 16, // gap-md
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
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
  progressFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timelineSection: {
    position: 'relative',
    paddingBottom: 32,
  },
  timelineLine: {
    position: 'absolute',
    left: 19,
    top: 16,
    bottom: 16,
    width: 1,
  },
  timelineItem: {
    position: 'relative',
    paddingLeft: 64, // pl-xl
    marginBottom: 32, // space-y-lg
  },
  timelineDotWrapper: {
    position: 'absolute',
    left: 0,
    top: 4,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  timelineDotDone: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 4,
  },
  timelineDotActive: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timelineDotActiveInner: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#ffffff',
  },
  timelineDotUpcoming: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 4,
  },
  timelineCard: {
    borderWidth: 1,
    borderRadius: 16, // rounded-lg
    padding: 16, // p-md
  },
  timelineCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 16,
  },
  subtaskList: {
    gap: 8,
  },
  subtaskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  statBox: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 8, // rounded
    padding: 8, // p-sm
  },
  expansionSection: {
    borderTopWidth: 1,
    paddingTop: 16,
  },
  expansionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  upcomingFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 16,
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  smallAvatarContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 96,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    zIndex: 40,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 64, // h-xl conceptually
    borderTopWidth: 1,
    zIndex: 50,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
  navItemActive: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    borderRadius: 8,
    marginHorizontal: 8,
  }
});

export default ProjectTimelineScreen;
