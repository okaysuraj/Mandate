import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Image, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { API_URL } from '../../config/config';

const NotificationPreferencesScreen = ({ navigation }) => {
  const { colors, typography, spacing, borderRadius } = useTheme();
  const { user } = useAuth();

  const [notificationLevel, setNotificationLevel] = useState(user?.preferences?.notifications || 'normal');
  const [workStart, setWorkStart] = useState(user?.preferences?.workHours?.start || '09:00');
  const [workEnd, setWorkEnd] = useState(user?.preferences?.workHours?.end || '17:00');
  
  const [isSaving, setIsSaving] = useState(false);

  const savePreferences = async (level, start, end) => {
    setIsSaving(true);
    try {
      await axios.put(`${API_URL}/api/users/profile`, {
        preferences: {
          ...user?.preferences,
          notifications: level,
          workHours: { start, end }
        }
      });
      setNotificationLevel(level);
      setWorkStart(start);
      setWorkEnd(end);
    } catch (error) {
      console.error('Failed to update notification preferences', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      {/* TopAppBar */}
      <View style={[styles.header, { backgroundColor: colors.background, borderBottomColor: colors.outlineVariant }]}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={24} color={colors.primary} />
          </TouchableOpacity>
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
          <Text style={[typography.headlineLgMobile, { color: colors.primary, marginBottom: 8 }]}>Global Notifications</Text>
          <Text style={[typography.bodyMd, { color: colors.secondary }]}>Calibrate notification density and delivery protocols across all operational channels.</Text>
        </View>

        {/* Mandate Transitions (Notification Level) */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderBetween}>
            <Text style={[typography.labelCaps, { color: colors.primary }]}>VERBOSITY LEVEL</Text>
            {isSaving && (
              <ActivityIndicator size="small" color={colors.primary} />
            )}
          </View>

          <View style={styles.cardsList}>
            {['strict', 'normal', 'light'].map((level) => {
              const isActive = notificationLevel === level;
              
              let title, desc, tag1, tag2;
              if (level === 'strict') {
                title = 'Critical Priority (Strict)';
                desc = 'Direct bypass for all quiet hours. High verbosity.';
                tag1 = 'HAPTIC: HIGH';
                tag2 = 'AUDIO: OVERRIDE';
              } else if (level === 'normal') {
                title = 'Standard Sync (Normal)';
                desc = 'Batch delivery based on standard operating logic.';
                tag1 = 'HAPTIC: NORMAL';
                tag2 = 'AUDIO: STANDARD';
              } else {
                title = 'Minimal Alerts (Light)';
                desc = 'Only urgent notifications are pushed. Low verbosity.';
                tag1 = 'HAPTIC: OFF';
                tag2 = 'AUDIO: OFF';
              }

              return (
                <View key={level} style={[styles.bentoCard, { backgroundColor: isActive ? colors.surfaceContainerLow : colors.surfaceContainerLowest, borderColor: isActive ? colors.primary : colors.outlineVariant }]}>
                  <View style={styles.cardHeaderRow}>
                    <View style={{ flex: 1 }}>
                      <Text style={[typography.headlineLgMobile, { fontSize: 18, color: isActive ? colors.primary : colors.secondary }]}>{title}</Text>
                      <Text style={[typography.labelSm, { color: colors.secondary, marginTop: 4 }]}>{desc}</Text>
                    </View>
                    <TouchableOpacity 
                      style={[styles.toggleTrack, isActive ? { backgroundColor: colors.primary } : { backgroundColor: colors.surfaceContainerHigh, borderColor: colors.outlineVariant, borderWidth: 1 }]}
                      onPress={() => savePreferences(level, workStart, workEnd)}
                    >
                      <View style={[styles.toggleThumb, isActive ? { backgroundColor: '#ffffff', alignSelf: 'flex-end' } : { backgroundColor: colors.outline, alignSelf: 'flex-start' }]} />
                    </TouchableOpacity>
                  </View>
                  
                  <View style={styles.tagsRow}>
                    <View style={[styles.tag, { borderColor: colors.outlineVariant }]}>
                      <Text style={[typography.labelSm, { color: colors.secondary, fontSize: 10 }]}>{tag1}</Text>
                    </View>
                    <View style={[styles.tag, { borderColor: colors.outlineVariant }]}>
                      <Text style={[typography.labelSm, { color: colors.secondary, fontSize: 10 }]}>{tag2}</Text>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        {/* Work Hours Scheduling */}
        <View style={[styles.bentoCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
          <View style={styles.quietHeaderRow}>
            <View style={styles.quietHeaderLeft}>
              <MaterialIcons name="work-history" size={20} color={colors.primary} />
              <Text style={[typography.labelCaps, { color: colors.primary, marginLeft: 8 }]}>Work Hours (Active Range)</Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 }}>
            <View style={{ flex: 1, marginRight: 8 }}>
              <Text style={[typography.labelSm, { color: colors.secondary, marginBottom: 8 }]}>START TIME</Text>
              <View style={[styles.timeInputBox, { borderColor: colors.outlineVariant }]}>
                <Text style={[typography.bodyMd, { color: colors.primary }]}>{workStart}</Text>
              </View>
            </View>
            <View style={{ flex: 1, marginLeft: 8 }}>
              <Text style={[typography.labelSm, { color: colors.secondary, marginBottom: 8 }]}>END TIME</Text>
              <View style={[styles.timeInputBox, { borderColor: colors.outlineVariant }]}>
                <Text style={[typography.bodyMd, { color: colors.primary }]}>{workEnd}</Text>
              </View>
            </View>
          </View>

          <View style={[styles.quietFooter, { borderTopColor: colors.outlineVariant }]}>
            <Text style={[typography.bodyMd, { fontSize: 14, color: colors.secondary }]}>Push notifications are suppressed outside these hours unless priority is Strict.</Text>
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
  iconBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  container: {
    flexGrow: 1,
    padding: 24, 
    paddingBottom: 40,
    gap: 32, 
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
  cardsList: {
    gap: 12,
  },
  bentoCard: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 24, 
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16, 
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
    marginBottom: 24,
  },
  quietHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeInputBox: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  quietFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
  },
  dangerSection: {
    paddingTop: 16,
  },
  dangerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16, 
    borderWidth: 1,
    borderRadius: 8,
  },
  dangerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  }
});

export default NotificationPreferencesScreen;
