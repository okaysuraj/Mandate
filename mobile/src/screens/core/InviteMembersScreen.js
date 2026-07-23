import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';

const InviteMembersScreen = ({ navigation }) => {
  const { colors, typography, spacing, borderRadius } = useTheme();

  const [clearanceLevel, setClearanceLevel] = useState('L1_READ');

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      {/* Top Navigation Shell */}
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.outlineVariant }]}>
        <View style={styles.headerLeft}>
          <MaterialIcons name="terminal" size={24} color={colors.primary} />
          <Text style={[typography.labelCaps, { color: colors.primary, letterSpacing: 2, marginLeft: 8 }]}>MANDATE OS</Text>
        </View>
        <TouchableOpacity style={styles.iconBtn}>
          <MaterialIcons name="close" size={24} color={colors.secondary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        
        {/* Header */}
        <View style={styles.pageHeader}>
          <Text style={[typography.headlineLgMobile, { color: colors.primary, marginBottom: 4 }]}>Invite Operator</Text>
          <Text style={[typography.bodyMd, { color: colors.secondary, opacity: 0.7 }]}>Initialize credential provisioning protocol.</Text>
        </View>

        {/* Progress Indicator */}
        <View style={styles.progressIndicator}>
          <View style={styles.progressStep}>
            <View style={[styles.stepCircle, { backgroundColor: colors.primary }]}>
              <Text style={[typography.labelCaps, { color: colors.onPrimary }]}>01</Text>
            </View>
            <Text style={[typography.labelCaps, { color: colors.primary, marginTop: 8 }]}>AUTH</Text>
          </View>
          <View style={[styles.progressLine, { backgroundColor: colors.outlineVariant }]} />
          
          <View style={styles.progressStep}>
            <View style={[styles.stepCircle, { backgroundColor: colors.surfaceContainerHigh }]}>
              <Text style={[typography.labelCaps, { color: colors.secondary }]}>02</Text>
            </View>
            <Text style={[typography.labelCaps, { color: colors.secondary, opacity: 0.5, marginTop: 8 }]}>ASSETS</Text>
          </View>
          <View style={[styles.progressLine, { backgroundColor: colors.outlineVariant }]} />

          <View style={styles.progressStep}>
            <View style={[styles.stepCircle, { backgroundColor: colors.surfaceContainerHigh }]}>
              <Text style={[typography.labelCaps, { color: colors.secondary }]}>03</Text>
            </View>
            <Text style={[typography.labelCaps, { color: colors.secondary, opacity: 0.5, marginTop: 8 }]}>REVIEW</Text>
          </View>
        </View>

        {/* Onboarding Steps Container */}
        <View style={styles.stepsContainer}>
          
          {/* STEP 01: Credential Provisioning */}
          <View style={[styles.bentoCard, { borderColor: colors.outlineVariant }]}>
            <View style={styles.stepHeader}>
              <MaterialIcons name="badge" size={20} color={colors.primary} />
              <Text style={[typography.labelCaps, { color: colors.primary }]}>01 CREDENTIAL PROVISIONING</Text>
            </View>
            
            <View style={styles.stepContent}>
              {/* Email Input */}
              <View style={styles.inputGroup}>
                <Text style={[typography.labelCaps, { color: colors.secondary, fontSize: 10, marginBottom: 4 }]}>OPERATOR IDENTIFIER (EMAIL)</Text>
                <TextInput 
                  style={[styles.textInput, typography.labelSm, { borderBottomColor: colors.outlineVariant, color: colors.primary }]}
                  placeholder="OPERATOR@MANDATE.SYS"
                  placeholderTextColor={colors.surfaceDim}
                />
              </View>

              {/* Cluster Dropdown Mock */}
              <View style={styles.inputGroup}>
                <Text style={[typography.labelCaps, { color: colors.secondary, fontSize: 10, marginBottom: 4 }]}>SYSTEM CLUSTER</Text>
                <View style={[styles.dropdownMock, { backgroundColor: colors.surfaceContainerLow }]}>
                  <Text style={[typography.labelSm, { color: colors.primary }]}>CORE_INFRA_NORTH</Text>
                  <MaterialIcons name="expand-more" size={20} color={colors.secondary} />
                </View>
              </View>

              {/* Clearance Level */}
              <View style={styles.inputGroup}>
                <Text style={[typography.labelCaps, { color: colors.secondary, fontSize: 10, marginBottom: 12 }]}>CLEARANCE LEVEL</Text>
                <View style={styles.clearanceGrid}>
                  <TouchableOpacity 
                    style={[
                      styles.clearanceBtn, 
                      clearanceLevel === 'L1_READ' ? { backgroundColor: colors.primary, borderColor: colors.primary } : { borderColor: colors.outlineVariant }
                    ]}
                    onPress={() => setClearanceLevel('L1_READ')}
                  >
                    <Text style={[typography.labelCaps, { color: clearanceLevel === 'L1_READ' ? colors.onPrimary : colors.secondary }]}>L1_READ</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[
                      styles.clearanceBtn, 
                      clearanceLevel === 'L2_EXEC' ? { backgroundColor: colors.primary, borderColor: colors.primary } : { borderColor: colors.outlineVariant }
                    ]}
                    onPress={() => setClearanceLevel('L2_EXEC')}
                  >
                    <Text style={[typography.labelCaps, { color: clearanceLevel === 'L2_EXEC' ? colors.onPrimary : colors.secondary }]}>L2_EXEC</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[
                      styles.clearanceBtn, 
                      clearanceLevel === 'L3_ADMIN' ? { backgroundColor: colors.primary, borderColor: colors.primary } : { borderColor: colors.outlineVariant }
                    ]}
                    onPress={() => setClearanceLevel('L3_ADMIN')}
                  >
                    <Text style={[typography.labelCaps, { color: clearanceLevel === 'L3_ADMIN' ? colors.onPrimary : colors.secondary }]}>L3_ADMIN</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          {/* STEP 02: Protocol Preview */}
          <View style={[styles.bentoCard, { borderColor: colors.outlineVariant }]}>
            <View style={[styles.stepHeader, { justifyContent: 'space-between' }]}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <MaterialIcons name="checklist" size={20} color={colors.primary} />
                <Text style={[typography.labelCaps, { color: colors.primary }]}>02 PROTOCOL PREVIEW</Text>
              </View>
              <View style={[styles.autoGenBadge, { backgroundColor: colors.surfaceContainerHigh }]}>
                <Text style={[typography.labelCaps, { color: colors.secondary, fontSize: 10 }]}>AUTO-GEN</Text>
              </View>
            </View>

            <View style={styles.protocolList}>
              <View style={[styles.protocolItem, { borderBottomColor: colors.surfaceContainer }]}>
                <View style={styles.protocolItemLeft}>
                  <MaterialIcons name="vpn-key" size={16} color={colors.secondary} />
                  <Text style={[typography.labelSm, { color: colors.onSurface }]}>SSH RSA-4096 Key</Text>
                </View>
                <MaterialIcons name="check-circle" size={16} color={colors.tertiaryFixedDim} />
              </View>
              <View style={[styles.protocolItem, { borderBottomColor: colors.surfaceContainer }]}>
                <View style={styles.protocolItemLeft}>
                  <MaterialIcons name="cloud-sync" size={16} color={colors.secondary} />
                  <Text style={[typography.labelSm, { color: colors.onSurface }]}>Cloud Enclave Access</Text>
                </View>
                <MaterialIcons name="check-circle" size={16} color={colors.tertiaryFixedDim} />
              </View>
              <View style={[styles.protocolItem, { borderBottomColor: colors.surfaceContainer }]}>
                <View style={styles.protocolItemLeft}>
                  <MaterialIcons name="terminal" size={16} color={colors.secondary} />
                  <Text style={[typography.labelSm, { color: colors.onSurface }]}>CLI Toolbelt v4.0</Text>
                </View>
                <MaterialIcons name="check-circle" size={16} color={colors.tertiaryFixedDim} />
              </View>
            </View>
          </View>

          {/* STEP 03: Pending Approvals */}
          <View style={[styles.bentoCard, { borderColor: colors.outlineVariant }]}>
            <View style={styles.stepHeader}>
              <MaterialIcons name="hourglass-top" size={20} color={colors.primary} />
              <Text style={[typography.labelCaps, { color: colors.primary }]}>03 PENDING APPROVALS</Text>
            </View>

            <View style={[styles.approvalBox, { backgroundColor: colors.surfaceContainerLow }]}>
              <View style={[styles.approvalIconBg, { backgroundColor: colors.surface, borderColor: colors.outlineVariant }]}>
                <MaterialIcons name="security" size={20} color={colors.secondary} />
              </View>
              <View style={styles.approvalContent}>
                <Text style={[typography.labelSm, { color: colors.primary }]}>Security Lead Approval</Text>
                <Text style={[typography.labelCaps, { color: colors.secondary, opacity: 0.6, fontSize: 10, marginTop: 4 }]}>REQUIRED FOR LEVEL 1+</Text>
              </View>
              <View style={[styles.pendingBadge, { backgroundColor: colors.surfaceContainerHigh }]}>
                <Text style={[typography.labelCaps, { color: colors.secondary, fontSize: 9 }]}>PENDING</Text>
              </View>
            </View>
          </View>

          {/* Decorative Visual Spacer */}
          <View style={[styles.spacerBox, { borderColor: colors.outlineVariant }]}>
            <View style={styles.spacerContent}>
              <Text style={[typography.labelCaps, { color: colors.primary, letterSpacing: 2, fontSize: 9, marginBottom: 8 }]}>SYSTEM READY</Text>
              <View style={styles.dotsContainer}>
                <View style={[styles.pulseDot, { backgroundColor: colors.primary }]} />
                <View style={[styles.pulseDot, { backgroundColor: colors.primary }]} />
                <View style={[styles.pulseDot, { backgroundColor: colors.primary }]} />
              </View>
            </View>
          </View>

        </View>
      </ScrollView>

      {/* Bottom Action Bar */}
      <View style={[styles.bottomActionBar, { backgroundColor: colors.surface, borderTopColor: colors.outlineVariant }]}>
        <TouchableOpacity style={[styles.executeBtn, { backgroundColor: colors.primary }]}>
          <Text style={[typography.labelCaps, { color: colors.onPrimary, letterSpacing: 2 }]}>EXECUTE INVITE</Text>
          <MaterialIcons name="send" size={16} color={colors.onPrimary} style={{ marginLeft: 8 }} />
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
    paddingHorizontal: 24, // px-gutter
    height: 64, // h-16
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
    padding: 16, // px-md
    paddingTop: 32, // pt-24 approx
    paddingBottom: 128, // pb-32 approx
    maxWidth: 600,
    alignSelf: 'center',
    width: '100%',
  },
  pageHeader: {
    marginBottom: 32, // mb-lg
  },
  progressIndicator: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 32,
    paddingHorizontal: 4,
  },
  progressStep: {
    alignItems: 'center',
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressLine: {
    flex: 1,
    height: 1,
    marginHorizontal: 16,
    marginTop: 16, // Align with center of circles
  },
  stepsContainer: {
    gap: 16, // space-y-md
  },
  bentoCard: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 32, // p-lg
    backgroundColor: '#ffffff',
  },
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16, // mb-md
  },
  stepContent: {
    gap: 32, // space-y-lg
  },
  inputGroup: {
    width: '100%',
  },
  textInput: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    width: '100%',
  },
  dropdownMock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderRadius: 4,
    marginTop: 4,
  },
  clearanceGrid: {
    flexDirection: 'row',
    gap: 8,
  },
  clearanceBtn: {
    flex: 1,
    paddingVertical: 8,
    borderWidth: 1,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  autoGenBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  protocolList: {
    gap: 8,
  },
  protocolItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
  },
  protocolItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  approvalBox: {
    flexDirection: 'row',
    padding: 16, // p-md
    borderRadius: 8,
    alignItems: 'flex-start',
    gap: 16,
  },
  approvalIconBg: {
    width: 40,
    height: 40,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  approvalContent: {
    flex: 1,
  },
  pendingBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  spacerBox: {
    height: 128, // h-32
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spacerContent: {
    alignItems: 'center',
  },
  dotsContainer: {
    flexDirection: 'row',
    gap: 4,
  },
  pulseDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
  },
  bottomActionBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24, // p-gutter
    borderTopWidth: 1,
  },
  executeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 56, // h-14
    borderRadius: 28,
  }
});

export default InviteMembersScreen;
