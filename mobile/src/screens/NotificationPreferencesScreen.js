import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

const NotificationPreferencesScreen = ({ navigation }) => {
  const { colors, typography, spacing, borderRadius } = useTheme();

  const [criticalPriority, setCriticalPriority] = useState(true);
  const [standardSync, setStandardSync] = useState(false);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      {/* TopAppBar */}
      <View style={[styles.header, { backgroundColor: colors.background, borderBottomColor: colors.outlineVariant }]}>
        <View style={styles.headerLeft}>
          <View style={[styles.avatarContainer, { borderColor: colors.outlineVariant }]}>
            <Image 
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBgZhVIFRmZLlsVwlBqQqOZWS6xoEj3x7wdkwvNybKQaReCAglQvXI3nT9U9NOpM7iIM1wGHdaicwnZMcsg0uD__HdgeGQkQHbm90KeishIayzKpCC3-ZqZsjwrHnLWRKezMrXEa_Nix9ztd2IM7reZhLciBuNCloYCKAQyW_Sq6WkBL_AFGRP3-xriMG-1l7lBz_qJYPAI9DZSCBrOew3Qe79jLKdp7zAJ-oe2jQpRcNBTtihT1u7Ntg' }}
              style={styles.avatarImg}
            />
          </View>
          <Text style={[typography.headlineLgMobile, { color: colors.primary, fontWeight: '900', letterSpacing: -1, marginLeft: 8 }]}>MANDATE</Text>
        </View>
        <TouchableOpacity style={styles.iconBtn}>
          <MaterialIcons name="smart-toy" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        
        {/* Header Section */}
        <View style={styles.section}>
          <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 4 }]}>System Configuration</Text>
          <Text style={[typography.headlineLgMobile, { color: colors.primary, marginBottom: 8 }]}>Global Preferences</Text>
          <Text style={[typography.bodyMd, { color: colors.secondary }]}>Calibrate notification density and delivery protocols across all operational channels.</Text>
        </View>

        {/* Mandate Transitions */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderBetween}>
            <Text style={[typography.labelCaps, { color: colors.primary }]}>Mandate Transitions</Text>
            <View style={[styles.autoSyncBadge, { backgroundColor: 'rgba(0, 33, 8, 0.1)' }]}>
              <Text style={[typography.labelSm, { color: colors.onTertiaryContainer }]}>AUTO_SYNC</Text>
            </View>
          </View>

          <View style={styles.cardsList}>
            {/* Card 1 */}
            <View style={[styles.bentoCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
              <View style={styles.cardHeaderRow}>
                <View>
                  <Text style={[typography.headlineLgMobile, { fontSize: 18, color: colors.primary }]}>Critical Priority</Text>
                  <Text style={[typography.labelSm, { color: colors.secondary }]}>Direct bypass for all quiet hours</Text>
                </View>
                <TouchableOpacity 
                  style={[styles.toggleTrack, criticalPriority ? { backgroundColor: colors.primary } : { backgroundColor: colors.surfaceContainerHigh, borderColor: colors.outlineVariant, borderWidth: 1 }]}
                  onPress={() => setCriticalPriority(!criticalPriority)}
                >
                  <View style={[styles.toggleThumb, criticalPriority ? { backgroundColor: '#ffffff', alignSelf: 'flex-end' } : { backgroundColor: colors.outline, alignSelf: 'flex-start' }]} />
                </TouchableOpacity>
              </View>
              
              <View style={styles.tagsRow}>
                <View style={[styles.tag, { borderColor: colors.outlineVariant }]}>
                  <Text style={[typography.labelSm, { color: colors.secondary, fontSize: 10 }]}>HAPTIC: HIGH</Text>
                </View>
                <View style={[styles.tag, { borderColor: colors.outlineVariant }]}>
                  <Text style={[typography.labelSm, { color: colors.secondary, fontSize: 10 }]}>AUDIO: OVERRIDE</Text>
                </View>
              </View>
            </View>

            {/* Card 2 */}
            <View style={[styles.bentoCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
              <View style={styles.cardHeaderRow}>
                <View>
                  <Text style={[typography.headlineLgMobile, { fontSize: 18, color: colors.primary }]}>Standard Sync</Text>
                  <Text style={[typography.labelSm, { color: colors.secondary }]}>Batch delivery every 15 minutes</Text>
                </View>
                <TouchableOpacity 
                  style={[styles.toggleTrack, standardSync ? { backgroundColor: colors.primary } : { backgroundColor: colors.surfaceContainerHigh, borderColor: colors.outlineVariant, borderWidth: 1 }]}
                  onPress={() => setStandardSync(!standardSync)}
                >
                  <View style={[styles.toggleThumb, standardSync ? { backgroundColor: '#ffffff', alignSelf: 'flex-end' } : { backgroundColor: colors.outline, alignSelf: 'flex-start' }]} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* Quiet Hours Scheduling Chart */}
        <View style={[styles.bentoCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
          <View style={styles.quietHeaderRow}>
            <View style={styles.quietHeaderLeft}>
              <MaterialIcons name="bedtime" size={20} color={colors.primary} />
              <Text style={[typography.labelCaps, { color: colors.primary, marginLeft: 8 }]}>Quiet Hours</Text>
            </View>
            <Text style={[typography.labelSm, { color: colors.primary, fontFamily: 'monospace' }]}>22:00 — 06:00</Text>
          </View>

          {/* Visual Schedule Chart Mock */}
          <View style={styles.chartContainer}>
            <View style={[styles.chartBarsBg, { backgroundColor: colors.surfaceContainer }]}>
              <View style={[styles.chartBar, { backgroundColor: colors.primaryFixedDim, height: '40%' }]} />
              <View style={[styles.chartBar, { backgroundColor: colors.primaryFixedDim, height: '35%' }]} />
              <View style={[styles.chartBar, { backgroundColor: colors.primaryFixedDim, height: '30%' }]} />
              <View style={[styles.chartBar, { backgroundColor: colors.primary, height: '10%' }]} />
              <View style={[styles.chartBar, { backgroundColor: colors.primary, height: '5%' }]} />
              <View style={[styles.chartBar, { backgroundColor: colors.primary, height: '5%' }]} />
              <View style={[styles.chartBar, { backgroundColor: colors.primary, height: '5%' }]} />
              <View style={[styles.chartBar, { backgroundColor: colors.primary, height: '5%' }]} />
              <View style={[styles.chartBar, { backgroundColor: colors.primary, height: '5%' }]} />
              <View style={[styles.chartBar, { backgroundColor: colors.primary, height: '10%' }]} />
              <View style={[styles.chartBar, { backgroundColor: colors.primaryFixedDim, height: '45%' }]} />
              <View style={[styles.chartBar, { backgroundColor: colors.primaryFixedDim, height: '60%' }]} />
              <View style={[styles.chartBar, { backgroundColor: colors.primaryFixedDim, height: '80%' }]} />
              <View style={[styles.chartBar, { backgroundColor: colors.primaryFixedDim, height: '90%' }]} />
              <View style={[styles.chartBar, { backgroundColor: colors.primaryFixedDim, height: '85%' }]} />
              <View style={[styles.chartBar, { backgroundColor: colors.primaryFixedDim, height: '70%' }]} />
              <View style={[styles.chartBar, { backgroundColor: colors.primaryFixedDim, height: '50%' }]} />
              <View style={[styles.chartBar, { backgroundColor: colors.primaryFixedDim, height: '40%' }]} />
            </View>
            <View style={styles.chartLabels}>
              <Text style={[typography.labelSm, { fontSize: 10, color: colors.outline }]}>00:00</Text>
              <Text style={[typography.labelSm, { fontSize: 10, color: colors.outline }]}>12:00</Text>
              <Text style={[typography.labelSm, { fontSize: 10, color: colors.outline }]}>23:59</Text>
            </View>
          </View>

          <View style={[styles.quietFooter, { borderTopColor: colors.outlineVariant }]}>
            <Text style={[typography.bodyMd, { fontSize: 14, color: colors.secondary }]}>Weekend override enabled</Text>
            <TouchableOpacity>
              <Text style={[typography.labelSm, { color: colors.primary, textDecorationLine: 'underline' }]}>Edit Schedule</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Channel Matrix */}
        <View style={styles.section}>
          <Text style={[typography.labelCaps, { color: colors.primary, marginBottom: 16 }]}>Channel Matrix</Text>
          
          <View style={[styles.tableContainer, { borderColor: colors.outlineVariant }]}>
            {/* Table Header */}
            <View style={[styles.tableRow, { backgroundColor: colors.surfaceContainerLow, borderBottomColor: colors.outlineVariant }]}>
              <View style={styles.tableCol1}><Text style={[typography.labelCaps, { fontSize: 10, color: colors.secondary }]}>Source</Text></View>
              <View style={styles.tableColIcon}><Text style={[typography.labelCaps, { fontSize: 10, color: colors.secondary, textAlign: 'center' }]}>Push</Text></View>
              <View style={styles.tableColIcon}><Text style={[typography.labelCaps, { fontSize: 10, color: colors.secondary, textAlign: 'center' }]}>SMS</Text></View>
              <View style={styles.tableColIcon}><Text style={[typography.labelCaps, { fontSize: 10, color: colors.secondary, textAlign: 'center' }]}>Log</Text></View>
            </View>
            
            {/* Table Rows */}
            <View style={[styles.tableRow, { borderBottomColor: colors.outlineVariant }]}>
              <View style={styles.tableCol1}><Text style={[typography.labelSm, { fontWeight: 'bold' }]}>Network</Text></View>
              <View style={styles.tableColIcon}><MaterialIcons name="check-circle" size={16} color={colors.primary} /></View>
              <View style={styles.tableColIcon}><MaterialIcons name="radio-button-unchecked" size={16} color={colors.outlineVariant} /></View>
              <View style={styles.tableColIcon}><MaterialIcons name="check-circle" size={16} color={colors.primary} /></View>
            </View>

            <View style={[styles.tableRow, { borderBottomColor: colors.outlineVariant }]}>
              <View style={styles.tableCol1}><Text style={[typography.labelSm, { fontWeight: 'bold' }]}>Terminal</Text></View>
              <View style={styles.tableColIcon}><MaterialIcons name="check-circle" size={16} color={colors.primary} /></View>
              <View style={styles.tableColIcon}><MaterialIcons name="check-circle" size={16} color={colors.primary} /></View>
              <View style={styles.tableColIcon}><MaterialIcons name="check-circle" size={16} color={colors.primary} /></View>
            </View>

            <View style={[styles.tableRow, { borderBottomColor: colors.outlineVariant }]}>
              <View style={styles.tableCol1}><Text style={[typography.labelSm, { fontWeight: 'bold' }]}>Security</Text></View>
              <View style={styles.tableColIcon}><MaterialIcons name="check-circle" size={16} color={colors.primary} /></View>
              <View style={styles.tableColIcon}><MaterialIcons name="check-circle" size={16} color={colors.primary} /></View>
              <View style={styles.tableColIcon}><MaterialIcons name="check-circle" size={16} color={colors.primary} /></View>
            </View>

            <View style={[styles.tableRow]}>
              <View style={styles.tableCol1}><Text style={[typography.labelSm, { fontWeight: 'bold' }]}>Marketing</Text></View>
              <View style={styles.tableColIcon}><MaterialIcons name="radio-button-unchecked" size={16} color={colors.outlineVariant} /></View>
              <View style={styles.tableColIcon}><MaterialIcons name="radio-button-unchecked" size={16} color={colors.outlineVariant} /></View>
              <View style={styles.tableColIcon}><MaterialIcons name="check-circle" size={16} color={colors.primary} /></View>
            </View>
          </View>
        </View>

        {/* Danger Zone */}
        <View style={styles.dangerSection}>
          <TouchableOpacity style={[styles.dangerBtn, { backgroundColor: 'rgba(186, 26, 26, 0.05)', borderColor: 'rgba(186, 26, 26, 0.2)' }]}>
            <View style={styles.dangerLeft}>
              <MaterialIcons name="warning" size={20} color={colors.error} />
              <Text style={[typography.labelCaps, { color: colors.error, marginLeft: 8 }]}>Purge Notification History</Text>
            </View>
            <MaterialIcons name="chevron-right" size={20} color={colors.error} />
          </TouchableOpacity>
        </View>

      </ScrollView>

      {/* Bottom Nav */}
      <View style={[styles.bottomNav, { backgroundColor: colors.surface, borderTopColor: colors.outlineVariant }]}>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="track-changes" size={24} color={colors.secondary} />
          <Text style={[typography.labelCaps, { color: colors.secondary, marginTop: 4 }]}>GOALS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="hub" size={24} color={colors.secondary} />
          <Text style={[typography.labelCaps, { color: colors.secondary, marginTop: 4 }]}>NETWORK</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="terminal" size={24} color={colors.secondary} />
          <Text style={[typography.labelCaps, { color: colors.secondary, marginTop: 4 }]}>LOGS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navItemActive, { borderTopColor: colors.primary }]}>
          <MaterialIcons name="settings-input-component" size={24} color={colors.primary} />
          <Text style={[typography.labelCaps, { color: colors.primary, marginTop: 4 }]}>CONFIG</Text>
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
    paddingHorizontal: 24,
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
    overflow: 'hidden',
    borderWidth: 1,
  },
  avatarImg: {
    width: '100%',
    height: '100%',
  },
  iconBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  container: {
    flexGrow: 1,
    padding: 24, // px-gutter
    paddingBottom: 100,
    gap: 32, // space-y-lg
  },
  section: {
    gap: 16,
  },
  sectionHeaderBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  autoSyncBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  cardsList: {
    gap: 8,
  },
  bentoCard: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 32, // p-lg
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16, // mb-md
  },
  toggleTrack: {
    width: 48,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    padding: 4,
  },
  toggleThumb: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  tagsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderRadius: 4,
  },
  quietHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  quietHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chartContainer: {
    height: 128, // h-32
    marginBottom: 16,
  },
  chartBarsBg: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    borderRadius: 4,
    padding: 4,
    gap: 2,
  },
  chartBar: {
    flex: 1,
    borderRadius: 2,
  },
  chartLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingHorizontal: 8,
  },
  quietFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
  },
  tableContainer: {
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  tableCol1: {
    flex: 2,
    padding: 8, // p-sm
  },
  tableColIcon: {
    flex: 1,
    padding: 8,
    alignItems: 'center',
  },
  dangerSection: {
    paddingTop: 32,
  },
  dangerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16, // p-md
    borderWidth: 1,
    borderRadius: 8,
  },
  dangerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 64,
    borderTopWidth: 1,
    zIndex: 50,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 8,
  },
  navItemActive: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 8,
    borderTopWidth: 2,
  }
});

export default NotificationPreferencesScreen;
