import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, TextInput, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

const NaturalLanguageInputScreen = ({ navigation }) => {
  const { colors, typography, spacing, borderRadius } = useTheme();

  const [inputText, setInputText] = useState('');
  const [lines, setLines] = useState(1);
  const [cols, setCols] = useState(0);

  const handleTextChange = (text) => {
    setInputText(text);
    setLines(text.split('\n').length);
    setCols(text.length); // Rough approximation for cols without exact selection
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      {/* TopAppBar */}
      <View style={[styles.header, { backgroundColor: colors.background, borderBottomColor: colors.outlineVariant }]}>
        <View style={styles.headerLeft}>
          <View style={[styles.avatarContainer, { backgroundColor: colors.surfaceContainerHigh }]}>
            <Image 
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQixviwcvkGUD1BYvnKKGFfBatrpuZwMMLpaQrcZFx93LoTvWZC2W2MnhjpwonWSmR_hETPCb3Ht_ap7ReAjb_pzmp4aH8JcjM6sM2SFkLrOOWz6jMA1UruLy1S0W0l45fyr82bFLD5jh9Tf0ah2v36x0v58T1CnSR09y_QJz_W-5f25KOlDQfoTvrDft2x4dNZ6ECr-7YKlFTTXODfCML5RluXiQmHTkXwV5py0D0wvYzax_KPnhTmA' }}
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
        
        {/* Terminal Section */}
        <View style={styles.section}>
          <View style={styles.terminalHeader}>
            <Text style={[typography.labelCaps, { color: colors.secondary, letterSpacing: 2 }]}>NATURAL LANGUAGE INPUT</Text>
            <Text style={[typography.labelSm, { color: colors.onSurfaceVariant, fontFamily: 'monospace' }]}>
              LN: {lines.toString().padStart(2, '0')} COL: {cols.toString().padStart(2, '0')}
            </Text>
          </View>
          
          <View style={[styles.terminalBox, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
            <TextInput
              style={[styles.terminalInput, typography.bodyMd, { color: colors.primary, fontFamily: 'monospace' }]}
              placeholder="Enter operator mandate (e.g., Deploy infrastructure for Project Aurora with high priority by Friday)..."
              placeholderTextColor={colors.outlineVariant}
              multiline
              value={inputText}
              onChangeText={handleTextChange}
            />
            <View style={styles.terminalFooter}>
              <View style={[styles.cursorBlink, { backgroundColor: colors.primary }]} />
              <Text style={[typography.labelSm, { color: colors.outline, textTransform: 'uppercase', letterSpacing: -0.5, marginLeft: 4 }]}>
                READY FOR EXECUTION_
              </Text>
            </View>
          </View>
        </View>

        {/* Live Parsed Parameters */}
        <View style={styles.section}>
          <Text style={[typography.labelCaps, { color: colors.secondary, letterSpacing: 2, marginBottom: 8 }]}>LIVE EXTRACTION</Text>
          <View style={styles.paramsList}>
            
            <View style={[styles.paramRow, { backgroundColor: colors.surfaceContainerLow, borderColor: colors.outlineVariant }]}>
              <View style={styles.paramLeft}>
                <MaterialIcons name="priority-high" size={20} color={colors.primary} />
                <Text style={[typography.labelSm, { color: colors.primary, textTransform: 'uppercase', fontFamily: 'monospace' }]}>Priority</Text>
              </View>
              <View style={[styles.paramValueBadge, { backgroundColor: colors.primary }]}>
                <Text style={[typography.labelSm, { color: colors.onPrimary, fontFamily: 'monospace' }]}>CRITICAL</Text>
              </View>
            </View>

            <View style={[styles.paramRow, { backgroundColor: colors.surfaceContainerLow, borderColor: colors.outlineVariant }]}>
              <View style={styles.paramLeft}>
                <MaterialIcons name="person" size={20} color={colors.primary} />
                <Text style={[typography.labelSm, { color: colors.primary, textTransform: 'uppercase', fontFamily: 'monospace' }]}>Assignee</Text>
              </View>
              <Text style={[typography.labelSm, { color: colors.secondary, fontFamily: 'monospace' }]}>AUTO-ROUTED: @SYS_ARCH</Text>
            </View>

            <View style={[styles.paramRow, { backgroundColor: colors.surfaceContainerLow, borderColor: colors.outlineVariant }]}>
              <View style={styles.paramLeft}>
                <MaterialIcons name="folder-open" size={20} color={colors.primary} />
                <Text style={[typography.labelSm, { color: colors.primary, textTransform: 'uppercase', fontFamily: 'monospace' }]}>Project</Text>
              </View>
              <Text style={[typography.labelSm, { color: colors.onSurface, fontFamily: 'monospace' }]}>AURORA-IX</Text>
            </View>

            <View style={[styles.paramRow, { backgroundColor: colors.surfaceContainerLow, borderColor: colors.outlineVariant }]}>
              <View style={styles.paramLeft}>
                <MaterialIcons name="event" size={20} color={colors.primary} />
                <Text style={[typography.labelSm, { color: colors.primary, textTransform: 'uppercase', fontFamily: 'monospace' }]}>Deadline</Text>
              </View>
              <Text style={[typography.labelSm, { color: colors.onSurface, fontFamily: 'monospace' }]}>FRI 18:00 UTC</Text>
            </View>

          </View>
        </View>

        {/* Network Status / Map Context */}
        <View style={styles.section}>
          <View style={styles.networkHeader}>
            <Text style={[typography.labelCaps, { color: colors.secondary, letterSpacing: 2 }]}>GLOBAL NETWORK STATUS</Text>
            <View style={[styles.networkBadge, { backgroundColor: 'rgba(60, 227, 106, 0.2)' }]}>
              <View style={[styles.networkBadgeDot, { backgroundColor: colors.onTertiaryContainer }]} />
              <Text style={[typography.labelSm, { color: colors.onTertiaryContainer, fontSize: 10, fontFamily: 'monospace' }]}>ACTIVE_SYNC</Text>
            </View>
          </View>

          <View style={[styles.mapCard, { backgroundColor: colors.surfaceContainer, borderColor: colors.outlineVariant }]}>
            <Image
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA5pEo3sq5290ae0WRB0VkcHwPaHAjDzUrYU5lrtxGzPhkidJ0TQjzf_4BRCpWJpXAgOY_Ct6cWByCYaIA498TZhPKhPCFae3cb0vkUhkORGsDOkKQl34tQbPkvJq0xm6UWbOvOdsgs8X3176z6RG4aBnYRjRX80Iw1Ndm3VNyFX9rHtVcTDhVvs5NtvjcIAn6arctrhyC-_DjFAbAmNACulJLUI_wE-q87mP2Lxvx7i72aUTmLwiaHgQ' }}
              style={styles.mapImg}
            />
            <View style={styles.mapOverlay} />
            <View style={styles.mapContent}>
              <View style={styles.mapStatsGrid}>
                <View style={[styles.mapStatBox, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
                  <Text style={[typography.labelSm, { color: colors.outline, fontFamily: 'monospace', marginBottom: 4 }]}>LATENCY</Text>
                  <Text style={[typography.headlineLgMobile, { color: colors.primary, fontFamily: 'monospace' }]}>14ms</Text>
                </View>
                <View style={[styles.mapStatBox, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
                  <Text style={[typography.labelSm, { color: colors.outline, fontFamily: 'monospace', marginBottom: 4 }]}>NODES</Text>
                  <Text style={[typography.headlineLgMobile, { color: colors.primary, fontFamily: 'monospace' }]}>2,104</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

      </ScrollView>

      {/* Execute Button */}
      <View style={styles.executeContainer}>
        <TouchableOpacity style={[styles.executeBtn, { backgroundColor: colors.primary, shadowColor: colors.primary }]}>
          <Text style={[typography.labelCaps, { color: colors.onPrimary, letterSpacing: 2, marginRight: 8 }]}>COMMIT_MANDATE</Text>
          <MaterialIcons name="arrow-forward-ios" size={16} color={colors.onPrimary} />
        </TouchableOpacity>
      </View>

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
        <TouchableOpacity style={[styles.navItemActive, { borderTopColor: colors.primary }]}>
          <MaterialIcons name="terminal" size={24} color={colors.primary} />
          <Text style={[typography.labelCaps, { color: colors.primary, marginTop: 4 }]}>LOGS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="settings-input-component" size={24} color={colors.secondary} />
          <Text style={[typography.labelCaps, { color: colors.secondary, marginTop: 4 }]}>CONFIG</Text>
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
    width: 32,
    height: 32,
    borderRadius: 16,
    overflow: 'hidden',
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
    paddingBottom: 160,
    gap: 32,
  },
  section: {
    gap: 16,
  },
  terminalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  terminalBox: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    minHeight: 180,
  },
  terminalInput: {
    flex: 1,
    textAlignVertical: 'top',
  },
  terminalFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  cursorBlink: {
    width: 8,
    height: 16,
  },
  paramsList: {
    gap: 8,
  },
  paramRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
    borderRadius: 8,
  },
  paramLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  paramValueBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
  },
  networkHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  networkBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    gap: 4,
  },
  networkBadgeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  mapCard: {
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
    height: 192, // h-48
  },
  mapImg: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.8,
  },
  mapOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(237, 238, 240, 0.4)', // surface-containerish with opacity
  },
  mapContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  mapStatsGrid: {
    flexDirection: 'row',
    gap: 8,
  },
  mapStatBox: {
    flex: 1,
    padding: 8,
    borderWidth: 1,
    borderRadius: 4,
  },
  executeContainer: {
    position: 'absolute',
    bottom: 80, // Above bottom nav
    left: 24,
    right: 24,
    zIndex: 40,
  },
  executeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    borderRadius: 28,
    elevation: 8,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
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

export default NaturalLanguageInputScreen;
