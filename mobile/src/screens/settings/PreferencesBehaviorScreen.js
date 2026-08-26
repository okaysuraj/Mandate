import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { API_URL } from '../../config/config';

const PreferencesBehaviorScreen = ({ navigation }) => {
  const { colors, typography } = useTheme();
  const { user, login } = useAuth(); // login function from context acts as a way to update local user state if needed, or we can just update via API.
  
  const [theme, setTheme] = useState(user?.preferences?.theme || 'system');
  const [timezone, setTimezone] = useState(user?.timezone || 'UTC');
  const [isSaving, setIsSaving] = useState(false);

  const savePreferences = async (newTheme, newTz) => {
    setIsSaving(true);
    try {
      const { data } = await axios.put(`${API_URL}/api/users/profile`, {
        timezone: newTz,
        preferences: {
          ...user?.preferences,
          theme: newTheme,
        }
      });
      // Updating auth context might require a reload or context function if exposed, but we just rely on next load for now or assume app handles it
      setTheme(newTheme);
      setTimezone(newTz);
    } catch (error) {
      console.error('Failed to update preferences', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleThemeChange = (t) => {
    savePreferences(t, timezone);
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.surface }]}>
      {/* TopAppBar */}
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.outlineVariant }]}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={24} color={colors.primary} />
          </TouchableOpacity>
          <Text style={[typography.headlineLgMobile, { color: colors.primary, fontWeight: 'bold', letterSpacing: -1, marginLeft: 8 }]}>MANDATE</Text>
        </View>
        <View style={styles.headerRight}>
          <View style={[styles.syncBadge, { backgroundColor: isSaving ? colors.tertiaryFixedDim : colors.surfaceContainerLow }]}>
            {isSaving ? (
              <ActivityIndicator size="small" color={colors.onTertiaryContainer} style={{ transform: [{ scale: 0.6 }] }} />
            ) : (
              <MaterialIcons name="sync" size={14} color={colors.onTertiaryContainer} />
            )}
            <Text style={[typography.labelCaps, { color: colors.onTertiaryContainer, marginLeft: 4 }]}>
              {isSaving ? 'SYNCING...' : 'LIVE'}
            </Text>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        
        {/* Configuration Status Header */}
        <View style={[styles.configHeader, { backgroundColor: colors.surfaceContainerLowest }]}>
          <View style={styles.configHeaderContent}>
            <View>
              <Text style={[typography.labelCaps, { color: colors.secondary, marginBottom: 4 }]}>SYSTEM PARAMETERS</Text>
              <Text style={[typography.headlineLgMobile, { color: colors.primary }]}>Preferences & Behavior</Text>
            </View>
            <View>
              <Text style={[typography.labelSm, { color: colors.onTertiaryContainer }]}>CONFIG_SYNC_OK</Text>
            </View>
          </View>
          <View style={[styles.progressBar, { backgroundColor: colors.surfaceContainer }]}>
            <View style={[styles.progressFill, { backgroundColor: colors.primary, width: '100%' }]} />
          </View>
        </View>

        {/* Dense Vertical Stack */}
        <View style={[styles.stackContainer, { borderTopColor: colors.outlineVariant }]}>
          
          {/* Theme Views */}
          <View style={[styles.bentoCard, { borderBottomColor: colors.outlineVariant }]}>
            <View style={styles.cardHeader}>
              <View style={styles.cardHeaderLeft}>
                <MaterialIcons name="palette" size={20} color={colors.primary} />
                <Text style={[typography.labelCaps, { color: colors.primary, marginLeft: 8 }]}>INTERFACE THEME</Text>
              </View>
            </View>

            <View style={styles.toggleList}>
              {['light', 'dark', 'system'].map((t) => (
                <TouchableOpacity 
                  key={t}
                  style={[styles.toggleRow, { borderColor: colors.outlineVariant, backgroundColor: theme === t ? colors.surfaceContainerLow : 'transparent' }]}
                  onPress={() => handleThemeChange(t)}
                >
                  <Text style={[typography.bodyMd, { color: theme === t ? colors.primary : colors.secondary, textTransform: 'capitalize' }]}>{t} Mode</Text>
                  <View style={[styles.toggleTrack, theme === t ? { backgroundColor: colors.primary } : { backgroundColor: colors.secondaryContainer }]}>
                    <View style={[styles.toggleThumb, theme === t ? { alignSelf: 'flex-end' } : { alignSelf: 'flex-start' }]} />
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Timezone Polling */}
          <View style={[styles.bentoCard, { borderBottomColor: colors.outlineVariant }]}>
            <View style={styles.cardHeader}>
              <View style={styles.cardHeaderLeft}>
                <MaterialIcons name="language" size={20} color={colors.primary} />
                <Text style={[typography.labelCaps, { color: colors.primary, marginLeft: 8 }]}>GLOBAL TIMEZONE</Text>
              </View>
              <Text style={[typography.labelSm, { color: colors.onTertiaryContainer }]}>{timezone}</Text>
            </View>

            <View style={styles.sliderSection}>
              <Text style={[typography.bodyMd, { color: colors.secondary, marginBottom: 16 }]}>Currently syncing timestamps with {timezone}. Updating this will restart the client interface.</Text>
            </View>
          </View>

          {/* Visual Feedback Animation */}
          <View style={[styles.feedbackSection, { backgroundColor: colors.surface, borderBottomColor: colors.outlineVariant }]}>
            <MaterialIcons name="cloud-sync" size={64} color={colors.primaryFixedDim} style={{ marginBottom: 16 }} />
            <Text style={[typography.labelCaps, { color: colors.secondary, marginBottom: 4 }]}>REAL-TIME SYNC ENGINE</Text>
            <Text style={[typography.bodyMd, { color: colors.onSurfaceVariant, textAlign: 'center', maxWidth: 280 }]}>
              Your configuration is mirrored across all active terminal instances automatically.
            </Text>
          </View>
          
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
    paddingHorizontal: 16,
    height: 56,
    borderBottomWidth: 1,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  syncBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
  },
  iconBtn: {
    padding: 4,
  },
  container: {
    flexGrow: 1,
    paddingBottom: 80, 
  },
  configHeader: {
    paddingHorizontal: 16, 
    paddingVertical: 32, 
  },
  configHeaderContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 8, 
  },
  progressBar: {
    height: 2,
    width: '100%',
  },
  progressFill: {
    height: '100%',
  },
  stackContainer: {
    borderTopWidth: 1,
  },
  bentoCard: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    padding: 16, 
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16, 
  },
  cardHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggleList: {
    gap: 8, 
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12, 
    borderWidth: 1,
    borderRadius: 8,
  },
  toggleTrack: {
    width: 40,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    padding: 4,
  },
  toggleThumb: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#ffffff',
  },
  sliderSection: {
    paddingVertical: 8,
  },
  feedbackSection: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 200,
    borderBottomWidth: 1,
  }
});

export default PreferencesBehaviorScreen;
