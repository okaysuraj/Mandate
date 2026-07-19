import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Image, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

const OwnershipTransferScreen = ({ navigation }) => {
  const { colors, typography, spacing, borderRadius } = useTheme();

  const [justification, setJustification] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      {/* TopAppBar */}
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.outlineVariant }]}>
        <View style={styles.headerLeft}>
          <MaterialIcons name="terminal" size={24} color={colors.primary} />
          <Text style={[typography.labelCaps, { color: colors.primary, letterSpacing: 2, marginLeft: 8 }]}>MANDATE OS</Text>
        </View>
        <TouchableOpacity style={styles.iconBtn}>
          <MaterialIcons name="account-circle" size={24} color={colors.secondary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        
        {/* Page Title & Subtitle */}
        <View style={styles.titleSection}>
          <Text style={[typography.headlineLgMobile, { color: colors.primary, marginBottom: 4 }]}>Ownership Transfer</Text>
          <Text style={[typography.labelSm, { color: colors.secondary, textTransform: 'uppercase', letterSpacing: 1 }]}>Protocol ID: TX-9092-ALPHA</Text>
        </View>

        {/* 01 Entity Selection */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={[styles.stepBadge, { backgroundColor: colors.primary }]}>
              <Text style={[typography.labelCaps, { color: colors.onPrimary }]}>01</Text>
            </View>
            <Text style={[typography.labelCaps, { color: colors.secondary, marginLeft: 8 }]}>ENTITY SELECTION</Text>
          </View>

          {/* Source Card */}
          <View style={[styles.bentoCard, { borderColor: colors.outlineVariant }]}>
            <Text style={[typography.labelCaps, { color: colors.secondary, fontSize: 10, position: 'absolute', top: 16, right: 16, opacity: 0.5 }]}>SOURCE</Text>
            <View style={styles.cardRow}>
              <View style={[styles.avatarContainer, { borderColor: colors.outlineVariant }]}>
                <Image 
                  source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDXmglf8k5SIcCP_aCIUDXq6j34MAAsqb_w56633n98280NzlmCsBztUvKHKF8rJ94OGs_zHEBW5zmV3erjW8D4gMQMceP2_1GLdBvSkxTt_mHnoMe0ts-h3d3pnLypdXWB-rEhbr_lJ0d1fqqZwe8CKxxaqc4CMpyDNsJervvRBQeW_4iNPYtCfM--xZskqTIGuPBOCNYGFLrY5DFX4M_K_w0gc8hHbBYYt9lFW1Q5ipuxbED1ip8QtQ' }}
                  style={styles.avatarImg}
                />
              </View>
              <View style={styles.cardInfo}>
                <Text style={[typography.bodyMd, { fontWeight: 'bold', color: colors.primary }]}>Elias Thorne</Text>
                <Text style={[typography.labelSm, { color: colors.secondary }]}>Senior Architect · Node 04</Text>
              </View>
            </View>
          </View>

          {/* Transfer Visual */}
          <View style={styles.transferVisual}>
            <MaterialIcons name="south" size={32} color={colors.primary} />
          </View>

          {/* Destination Card */}
          <View style={[styles.bentoCard, { borderColor: colors.outlineVariant, borderStyle: 'dashed', backgroundColor: colors.surfaceContainerLowest }]}>
            <Text style={[typography.labelCaps, { color: colors.primary, fontSize: 10, position: 'absolute', top: 16, right: 16 }]}>DESTINATION</Text>
            <View style={styles.cardRow}>
              <View style={[styles.avatarIconPlaceholder, { borderColor: colors.primary, backgroundColor: colors.surfaceContainerHigh }]}>
                <MaterialIcons name="person-add" size={24} color={colors.primary} />
              </View>
              <View style={styles.cardInfo}>
                {/* Simplified dropdown for mobile using text to represent selected state */}
                <Text style={[typography.bodyMd, { fontWeight: 'bold', color: colors.primary }]}>Sarah Vance</Text>
                <Text style={[typography.labelSm, { color: colors.secondary }]}>System Admin · Global Core</Text>
              </View>
            </View>
          </View>
        </View>

        {/* 02 Justification */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={[styles.stepBadge, { backgroundColor: colors.primary }]}>
              <Text style={[typography.labelCaps, { color: colors.onPrimary }]}>02</Text>
            </View>
            <Text style={[typography.labelCaps, { color: colors.secondary, marginLeft: 8 }]}>TRANSFER JUSTIFICATION</Text>
          </View>

          <View style={[styles.textareaCard, { borderColor: colors.outlineVariant }]}>
            <TextInput 
              style={[styles.textarea, typography.labelSm, { color: colors.primary }]}
              placeholder="Enter technical rationale for ownership migration..."
              placeholderTextColor={colors.outline}
              multiline
              value={justification}
              onChangeText={setJustification}
              textAlignVertical="top"
              maxLength={500}
            />
            <View style={[styles.textareaFooter, { backgroundColor: colors.surfaceContainerLow, borderTopColor: colors.outlineVariant }]}>
              <Text style={[typography.labelCaps, { fontSize: 10, color: colors.secondary }]}>REQUIREMENT: MIN 50 CHARS</Text>
              <Text style={[typography.labelCaps, { fontSize: 10, color: colors.primary }]}>{justification.length}/500</Text>
            </View>
          </View>
        </View>

        {/* 03 Impact Analysis */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={[styles.stepBadge, { backgroundColor: colors.primary }]}>
              <Text style={[typography.labelCaps, { color: colors.onPrimary }]}>03</Text>
            </View>
            <Text style={[typography.labelCaps, { color: colors.secondary, marginLeft: 8 }]}>IMPACT ANALYSIS</Text>
          </View>

          <View style={styles.impactGrid}>
            <View style={[styles.impactCard, { borderColor: colors.outlineVariant }]}>
              <Text style={[typography.labelCaps, { fontSize: 10, color: colors.secondary, marginBottom: 8 }]}>AFFECTED MANDATES</Text>
              <Text style={[typography.headlineLgMobile, { color: colors.primary }]}>14</Text>
              <View style={[styles.impactBadge, { backgroundColor: colors.tertiaryFixedDim, marginTop: 8 }]}>
                <Text style={[typography.labelSm, { color: colors.onTertiaryContainer }]}>+2 New</Text>
              </View>
            </View>
            
            <View style={[styles.impactCard, { borderColor: colors.outlineVariant }]}>
              <Text style={[typography.labelCaps, { fontSize: 10, color: colors.secondary, marginBottom: 8 }]}>SYSTEM RISK</Text>
              <View style={styles.riskRow}>
                <View style={[styles.riskDot, { backgroundColor: colors.error }]} />
                <Text style={[typography.labelCaps, { color: colors.error }]}>CRITICAL</Text>
              </View>
              <Text style={[typography.labelSm, { fontSize: 10, color: colors.secondary, marginTop: 8 }]}>PROTOCOL 8 VIOLATION</Text>
            </View>
          </View>

          {/* Mandatory Checkbox */}
          <TouchableOpacity 
            style={[styles.checkboxRow, { backgroundColor: colors.surfaceContainerHigh }]}
            onPress={() => setIsChecked(!isChecked)}
          >
            <View style={[styles.checkbox, isChecked ? { backgroundColor: colors.primary, borderColor: colors.primary } : { borderColor: colors.outlineVariant }]}>
              {isChecked && <MaterialIcons name="check" size={16} color={colors.onPrimary} />}
            </View>
            <Text style={[typography.labelSm, { color: colors.onSurfaceVariant, flex: 1, marginLeft: 16, lineHeight: 20 }]}>
              I acknowledge that transferring these mandates may result in temporary system instability and requires secondary authorization.
            </Text>
          </TouchableOpacity>
        </View>

      </ScrollView>

      {/* Footer Actions */}
      <View style={[styles.footerActions, { backgroundColor: colors.surface, borderTopColor: colors.outlineVariant }]}>
        <TouchableOpacity style={[styles.abortBtn, { borderColor: colors.outlineVariant }]}>
          <Text style={[typography.labelCaps, { color: colors.secondary, textTransform: 'uppercase' }]}>Abort</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.executeBtn, { backgroundColor: colors.primary }]}>
          <Text style={[typography.labelCaps, { color: colors.onPrimary, textTransform: 'uppercase' }]}>Execute Transfer</Text>
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
  iconBtn: {
    padding: 8,
    marginHorizontal: -8,
  },
  container: {
    flexGrow: 1,
    padding: 16, // px-md
    paddingTop: 32, // pt-24 conceptually
    paddingBottom: 120, // pb-32 conceptually + space for footer
  },
  titleSection: {
    marginBottom: 32,
  },
  section: {
    marginBottom: 64, // mb-xl
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  stepBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  bentoCard: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 32,
    backgroundColor: '#ffffff',
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    overflow: 'hidden',
    marginRight: 16,
  },
  avatarImg: {
    width: '100%',
    height: '100%',
  },
  avatarIconPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  cardInfo: {
    flex: 1,
  },
  transferVisual: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  textareaCard: {
    borderWidth: 1,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
  },
  textarea: {
    height: 128, // h-32
    padding: 32, // p-lg
  },
  textareaFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderTopWidth: 1,
  },
  impactGrid: {
    flexDirection: 'row',
    gap: 16,
  },
  impactCard: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  impactBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 16,
  },
  riskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  riskDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 4,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 16,
    padding: 16,
    borderRadius: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  footerActions: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    padding: 24, // p-gutter
    gap: 16,
    borderTopWidth: 1,
    zIndex: 50,
  },
  abortBtn: {
    flex: 1,
    paddingVertical: 16,
    borderWidth: 1,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  executeBtn: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  }
});

export default OwnershipTransferScreen;
