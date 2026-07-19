import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, TextInput, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

const QuickCreateScreen = ({ navigation }) => {
  const { colors, typography, spacing, borderRadius } = useTheme();

  const [priority, setPriority] = useState('CRITICAL');
  const [objective, setObjective] = useState('');

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      {/* Top App Bar (Behind Modal) */}
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.outlineVariant }]}>
        <View style={styles.headerLeft}>
          <View style={[styles.avatarContainer, { backgroundColor: colors.surfaceContainer }]}>
            <Image 
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD1joAogdw7R2Kr9Z_wDoQxQl3UvNo_Hrm516VHGJzcQ9v3UdD4nGYHnN4nBhhtkWA_WZGQaLYRLIt3YsZmEtrKqYrAHwu0VuUfNaGNTXkKGb5pDoyTDYmYNFN2sgICtxYQS-Y1v4aDjuHRkRN3SMpuJNChZL6sNgMMUouB-BYK4-nIn_7CFtWQgskPx4sTNWvlI7InvgtTKI5GIxJUJNLSUN7yW3BDszbJSNsEOuN2Bn-Av9de2WT0Vg' }}
              style={styles.avatarImg}
            />
          </View>
          <Text style={[typography.labelCaps, { color: colors.primary, fontWeight: '900', letterSpacing: 2, marginLeft: 12 }]}>CORE_OS_v1.0</Text>
        </View>
        <TouchableOpacity style={styles.iconBtn}>
          <MaterialIcons name="settings" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={[styles.modalOverlay, { backgroundColor: 'rgba(25, 28, 30, 0.1)' }]}
      >
        <View style={[styles.modalContainer, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
          
          {/* Modal Header */}
          <View style={[styles.modalHeader, { backgroundColor: colors.surfaceContainerLow, borderBottomColor: colors.outlineVariant }]}>
            <Text style={[typography.headlineLgMobile, { fontSize: 20, color: colors.primary, textTransform: 'uppercase' }]}>QUICK_DEPLOY</Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <MaterialIcons name="close" size={24} color={colors.onSurfaceVariant} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalScroll} contentContainerStyle={styles.modalContent}>
            
            {/* Objective Identity */}
            <View style={styles.section}>
              <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant, marginBottom: 8 }]}>OBJECTIVE IDENTITY</Text>
              <TextInput
                style={[
                  styles.inputArea, 
                  typography.labelCaps,
                  { backgroundColor: colors.surfaceContainerLowest, color: colors.primary, borderBottomColor: colors.outlineVariant }
                ]}
                placeholder="DEFINE PRIMARY OBJECTIVE DATA..."
                placeholderTextColor={colors.outline}
                multiline
                textAlignVertical="top"
                value={objective}
                onChangeText={setObjective}
              />
            </View>

            {/* Priority Protocol */}
            <View style={styles.section}>
              <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant, marginBottom: 8 }]}>PRIORITY PROTOCOL</Text>
              <View style={styles.priorityRow}>
                {['CRITICAL', 'STABLE', 'BACKLOG'].map((p) => {
                  const isActive = priority === p;
                  return (
                    <TouchableOpacity
                      key={p}
                      style={[
                        styles.priorityBtn,
                        { borderColor: colors.outlineVariant },
                        isActive && { backgroundColor: colors.primary, borderColor: colors.primary }
                      ]}
                      onPress={() => setPriority(p)}
                    >
                      <Text style={[
                        typography.labelCaps,
                        { color: isActive ? colors.onPrimary : colors.onSurface }
                      ]}>{p}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* Configuration Grid */}
            <View style={styles.gridSection}>
              {/* Allocation */}
              <View style={styles.gridCol}>
                <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant, marginBottom: 8 }]}>ALLOCATION</Text>
                <TouchableOpacity style={[styles.configCard, { backgroundColor: colors.surfaceContainerLow, borderColor: colors.outlineVariant }]}>
                  <MaterialIcons name="hub" size={24} color={colors.primary} />
                  <Text style={[typography.labelSm, { color: colors.primary, marginTop: 4 }]}>SYSTEM_AUTO</Text>
                </TouchableOpacity>
              </View>

              {/* Timeline */}
              <View style={styles.gridCol}>
                <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant, marginBottom: 8 }]}>TIMELINE</Text>
                <TouchableOpacity style={[styles.configCard, { backgroundColor: colors.surfaceContainerLow, borderColor: colors.outlineVariant }]}>
                  <MaterialIcons name="schedule" size={24} color={colors.primary} />
                  <Text style={[typography.labelSm, { color: colors.primary, marginTop: 4 }]}>24H_CYCLE</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Visual Context */}
            <View style={[styles.visualContext, { backgroundColor: colors.surfaceContainer }]}>
              <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant, opacity: 0.4, letterSpacing: 3 }]}>INITIALIZING_PROTOCOL...</Text>
            </View>

          </ScrollView>

          {/* Modal Footer */}
          <View style={[styles.modalFooter, { backgroundColor: colors.surface, borderTopColor: colors.outlineVariant }]}>
            <TouchableOpacity style={[styles.deployBtn, { backgroundColor: colors.primary }]}>
              <Text style={[typography.labelCaps, { color: colors.onPrimary, letterSpacing: 2, marginRight: 8 }]}>EXECUTE_DEPLOYMENT</Text>
              <MaterialIcons name="rocket-launch" size={16} color={colors.onPrimary} />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>

      {/* Bottom Nav */}
      <View style={[styles.bottomNav, { backgroundColor: colors.surface, borderTopColor: colors.outlineVariant }]}>
        <TouchableOpacity style={[styles.navItem, { borderRightColor: colors.outlineVariant }]}>
          <MaterialIcons name="dashboard" size={24} color={colors.onSurfaceVariant} />
          <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant, marginTop: 4, fontSize: 10 }]}>DASHBOARD</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navItem, { borderRightColor: colors.outlineVariant }]}>
          <MaterialIcons name="inventory-2" size={24} color={colors.onSurfaceVariant} />
          <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant, marginTop: 4, fontSize: 10 }]}>ASSETS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navItem, { borderRightColor: colors.outlineVariant }]}>
          <MaterialIcons name="notifications-active" size={24} color={colors.onSurfaceVariant} />
          <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant, marginTop: 4, fontSize: 10 }]}>ALERTS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navItem, { backgroundColor: colors.primary }]}>
          <MaterialIcons name="settings-input-component" size={24} color={colors.onPrimary} />
          <Text style={[typography.labelCaps, { color: colors.onPrimary, marginTop: 4, fontSize: 10 }]}>SYSTEM</Text>
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
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
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
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    padding: 16, // p-4
    paddingTop: 64, // to clear header conceptually if needed
    paddingBottom: 80, // to clear bottom nav
    zIndex: 40,
  },
  modalContainer: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
    maxHeight: '100%',
    flexShrink: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 32, // p-lg
    borderBottomWidth: 1,
  },
  modalScroll: {
    flexShrink: 1,
  },
  modalContent: {
    padding: 32, // p-lg
    gap: 64, // space-y-xl
  },
  section: {
    // space-y-sm
  },
  inputArea: {
    height: 128, // h-32
    borderBottomWidth: 1,
    padding: 16, // p-md
  },
  priorityRow: {
    flexDirection: 'row',
    gap: 8,
  },
  priorityBtn: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridSection: {
    flexDirection: 'row',
    gap: 16, // gap-md
  },
  gridCol: {
    flex: 1,
  },
  configCard: {
    padding: 16,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  visualContext: {
    height: 96, // h-24
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalFooter: {
    padding: 32, // p-lg
    borderTopWidth: 1,
  },
  deployBtn: {
    flexDirection: 'row',
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    height: 80, // h-20
    borderTopWidth: 1,
    zIndex: 50,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
  }
});

export default QuickCreateScreen;
