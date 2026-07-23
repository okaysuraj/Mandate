import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Modal, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';

const DangerZoneScreen = ({ navigation }) => {
  const { colors, typography, spacing, borderRadius } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState('reset'); // 'reset' | 'delete'

  const openModal = (type) => {
    setModalType(type);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.surface }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: colors.outlineVariant, backgroundColor: colors.surface }]}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.iconBtn}>
            <MaterialIcons name="menu" size={24} color={colors.primary} />
          </TouchableOpacity>
          <Text style={[typography.headlineLgMobile, { color: colors.primary, fontWeight: 'bold', letterSpacing: -1, marginLeft: spacing.sm }]}>MANDATE</Text>
        </View>
        <TouchableOpacity style={styles.iconBtn}>
          <MaterialIcons name="account-circle" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {/* Background Gradient Mock */}
        <View style={[styles.gradientBg, { backgroundColor: 'rgba(186, 26, 26, 0.05)' }]} />

        <View style={[styles.mainContent, { paddingHorizontal: spacing.gutter, paddingTop: spacing.lg }]}>
          
          {/* Section Header */}
          <View style={{ marginBottom: spacing.lg }}>
            <View style={[styles.warningBadge, { backgroundColor: colors.errorContainer }]}>
              <MaterialIcons name="warning" size={16} color={colors.onErrorContainer} />
              <Text style={[typography.labelCaps, { color: colors.onErrorContainer, marginLeft: 4, textTransform: 'uppercase' }]}>Restricted Area</Text>
            </View>
            <Text style={[typography.headlineLgMobile, { color: colors.primary, marginBottom: spacing.xs }]}>Danger Zone</Text>
            <Text style={[typography.bodyMd, { color: colors.secondary }]}>These actions are irreversible and destructive. Proceed with extreme caution.</Text>
          </View>

          {/* Warning Bento Grid */}
          <View style={{ gap: spacing.md }}>
            
            {/* Full System Reset Card */}
            <View style={[styles.card, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
              <View style={styles.cardHeader}>
                <View>
                  <Text style={[typography.labelCaps, { color: colors.error }]}>CRITICAL OPERATION</Text>
                  <Text style={[typography.headlineLgMobile, { color: colors.primary, marginTop: 4 }]}>Full System Reset</Text>
                </View>
                <View style={[styles.iconCircle, { backgroundColor: colors.errorContainer }]}>
                  <MaterialIcons name="restart-alt" size={24} color={colors.error} />
                </View>
              </View>
              <Text style={[typography.bodyMd, { color: colors.secondary, marginTop: spacing.md }]}>
                Wipes all industrial telemetry data, active manifests, and hardware integration protocols. This cannot be undone.
              </Text>
              <View style={[styles.authRequired, { backgroundColor: colors.surfaceContainerLow, borderLeftColor: colors.error }]}>
                <Text style={[typography.labelSm, { color: colors.onSurfaceVariant, fontStyle: 'italic' }]}>Requires Level 5 Authorization</Text>
              </View>
              <TouchableOpacity 
                style={[styles.destructiveBtn, { backgroundColor: colors.error }]} 
                onPress={() => openModal('reset')}
              >
                <Text style={[typography.labelCaps, { color: colors.onError, letterSpacing: 2 }]}>INITIATE RESET</Text>
              </TouchableOpacity>
            </View>

            {/* Account Deletion Card */}
            <View style={[styles.card, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
              <View>
                <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant }]}>PERMANENT REMOVAL</Text>
                <Text style={[typography.headlineLgMobile, { color: colors.primary, marginTop: 4 }]}>Deactivate Account</Text>
              </View>
              <Text style={[typography.bodyMd, { color: colors.secondary, marginTop: spacing.md, marginBottom: spacing.md }]}>
                Your profile, access keys, and historical logs will be purged from the Mandate Industrial grid.
              </Text>
              <TouchableOpacity 
                style={[styles.outlineDestructiveBtn, { borderColor: colors.error }]}
                onPress={() => openModal('delete')}
              >
                <Text style={[typography.labelCaps, { color: colors.error, letterSpacing: 2 }]}>DELETE PERMANENTLY</Text>
              </TouchableOpacity>
            </View>

            {/* Danger Info Bento */}
            <View style={styles.rowGrid}>
              <View style={[styles.miniCard, { backgroundColor: colors.surfaceContainerLow }]}>
                <MaterialIcons name="cloud-off" size={24} color={colors.secondary} />
                <Text style={[typography.labelSm, { color: colors.primary, marginTop: spacing.sm }]}>Logs Purged</Text>
                <Text style={[typography.headlineLgMobile, { color: colors.primary, marginTop: spacing.xs }]}>100%</Text>
              </View>
              <View style={[styles.miniCard, { backgroundColor: colors.surfaceContainerLow }]}>
                <MaterialIcons name="lock-reset" size={24} color={colors.secondary} />
                <Text style={[typography.labelSm, { color: colors.primary, marginTop: spacing.sm }]}>Tokens Voided</Text>
                <Text style={[typography.headlineLgMobile, { color: colors.primary, marginTop: spacing.xs }]}>ALL</Text>
              </View>
            </View>

          </View>
        </View>
      </ScrollView>

      {/* Bottom Nav Mock */}
      <View style={[styles.bottomNav, { backgroundColor: colors.surface, borderTopColor: colors.outlineVariant }]}>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="grid-view" size={24} color={colors.secondary} />
          <Text style={[typography.labelSm, { color: colors.secondary, marginTop: 4 }]}>DASHBOARD</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="precision-manufacturing" size={24} color={colors.secondary} />
          <Text style={[typography.labelSm, { color: colors.secondary, marginTop: 4 }]}>ASSETS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="warning" size={24} color={colors.secondary} />
          <Text style={[typography.labelSm, { color: colors.secondary, marginTop: 4 }]}>ALERTS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navItemActive, { borderTopColor: colors.primary }]}>
          <MaterialIcons name="settings" size={24} color={colors.primary} />
          <Text style={[typography.labelSm, { color: colors.primary, marginTop: 4 }]}>SYSTEM</Text>
        </TouchableOpacity>
      </View>

      {/* Modal */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity style={styles.modalBg} onPress={closeModal} />
          <View style={[styles.modalContent, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.error }]}>
            <View style={styles.modalHeader}>
              <View style={[styles.modalIconCircle, { backgroundColor: colors.errorContainer }]}>
                <MaterialIcons name="report" size={32} color={colors.error} />
              </View>
              <Text style={[typography.headlineLgMobile, { color: colors.primary, marginBottom: 8 }]}>
                {modalType === 'reset' ? 'Confirm Reset' : 'Confirm Deletion'}
              </Text>
              <Text style={[typography.bodyMd, { color: colors.secondary, textAlign: 'center' }]}>
                To proceed, please type your organization ID into the verification field below.
              </Text>
            </View>

            <View style={styles.modalInputGroup}>
              <Text style={[typography.labelSm, { color: colors.onSurfaceVariant, marginBottom: 8 }]}>VERIFICATION REQUIRED</Text>
              <TextInput
                style={[typography.labelSm, styles.modalInput, { backgroundColor: colors.surfaceContainerLow, borderBottomColor: colors.outline, color: colors.primary }]}
                placeholder="MANDATE-####"
                placeholderTextColor={colors.outlineVariant}
              />
            </View>

            <View style={styles.modalActionGroup}>
              <TouchableOpacity style={[styles.modalPrimaryBtn, { backgroundColor: colors.error }]}>
                <Text style={[typography.labelCaps, { color: colors.onError }]}>AUTHORIZE DESTRUCTION</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalSecondaryBtn} onPress={closeModal}>
                <Text style={[typography.labelCaps, { color: colors.secondary }]}>CANCEL</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

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
    borderRadius: 20,
  },
  container: {
    flexGrow: 1,
    paddingBottom: 100, // For bottom nav
    position: 'relative',
  },
  gradientBg: {
    position: 'absolute',
    top: 0, left: 0, right: 0,
    height: 200,
  },
  mainContent: {
    zIndex: 1,
  },
  warningBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
    marginBottom: 8,
  },
  card: {
    padding: 32,
    borderRadius: 16,
    borderWidth: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  authRequired: {
    padding: 16,
    borderRadius: 16,
    borderLeftWidth: 4,
    marginTop: 16,
    marginBottom: 16,
  },
  destructiveBtn: {
    paddingVertical: 16,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outlineDestructiveBtn: {
    paddingVertical: 16,
    borderRadius: 32,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowGrid: {
    flexDirection: 'row',
    gap: 16,
  },
  miniCard: {
    flex: 1,
    padding: 16,
    borderRadius: 16,
    alignItems: 'flex-start',
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
    paddingBottom: 8,
  },
  navItemActive: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 8,
    paddingBottom: 8,
    borderTopWidth: 2,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  modalBg: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContent: {
    width: '100%',
    maxWidth: 384,
    padding: 32,
    borderRadius: 16,
    borderWidth: 2,
    gap: 32,
    zIndex: 10,
  },
  modalHeader: {
    alignItems: 'center',
  },
  modalIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  modalInputGroup: {
    width: '100%',
  },
  modalInput: {
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderBottomWidth: 2,
  },
  modalActionGroup: {
    gap: 8,
  },
  modalPrimaryBtn: {
    paddingVertical: 16,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalSecondaryBtn: {
    paddingVertical: 16,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default DangerZoneScreen;
