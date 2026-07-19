import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, TextInput, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

const FirstMandateCreationScreen = ({ navigation }) => {
  const { colors, typography, spacing, borderRadius } = useTheme();
  
  const [priority, setPriority] = useState('MID');
  const [allocation, setAllocation] = useState('50');

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      {/* TopAppBar (Transactional) */}
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.outlineVariant }]}>
        <TouchableOpacity style={styles.iconBtn}>
          <MaterialIcons name="close" size={24} color={colors.primary} />
        </TouchableOpacity>
        <Text style={[typography.headlineLgMobile, { color: colors.primary, fontWeight: 'bold', letterSpacing: -1 }]}>MANDATE</Text>
        <View style={{ width: 40 }} /> {/* Spacer */}
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <View style={[styles.mainContent, { paddingHorizontal: spacing.gutter, paddingTop: spacing.lg }]}>
          
          {/* Header Section */}
          <View style={{ marginBottom: spacing.xl }}>
            <View style={{ marginBottom: spacing.sm }}>
              <Text style={[typography.labelCaps, { color: colors.secondary, textTransform: 'uppercase' }]}>System Onboarding / Step 01</Text>
            </View>
            <Text style={[typography.headlineLgMobile, { color: colors.onBackground, marginBottom: spacing.sm }]}>INITIALIZE FIRST MANDATE</Text>
            <Text style={[typography.bodyMd, { color: colors.secondary, fontSize: 14 }]}>
              Define the core parameters for your first operational directive. This configuration will calibrate the resource allocation engine.
            </Text>
          </View>

          {/* Form Stack */}
          <View style={styles.formStack}>
            
            {/* Mandate Name */}
            <View style={styles.inputGroup}>
              <Text style={[typography.labelCaps, { color: colors.primary, marginBottom: spacing.xs }]}>MANDATE NAME</Text>
              <View style={[styles.bentoCard, { borderColor: colors.outlineVariant }]}>
                <TextInput 
                  style={[styles.textInput, typography.labelSm, { color: colors.primary, borderBottomColor: colors.outlineVariant }]}
                  placeholder="e.g. PROJECT_OMEGA_2024"
                  placeholderTextColor={colors.outlineVariant}
                />
              </View>
            </View>

            {/* Priority Classification */}
            <View style={styles.inputGroup}>
              <Text style={[typography.labelCaps, { color: colors.primary, marginBottom: spacing.xs }]}>PRIORITY CLASSIFICATION</Text>
              <View style={[styles.segmentedControl, { backgroundColor: colors.surfaceContainer, borderColor: colors.outlineVariant }]}>
                {['LOW', 'MID', 'CRITICAL'].map((level) => (
                  <TouchableOpacity
                    key={level}
                    style={[
                      styles.segmentBtn,
                      priority === level ? { backgroundColor: colors.primary } : { backgroundColor: 'transparent' }
                    ]}
                    onPress={() => setPriority(level)}
                  >
                    <Text style={[
                      typography.labelCaps,
                      priority === level ? { color: colors.onPrimary } : { color: colors.secondary }
                    ]}>{level}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Deployment Schedule */}
            <View style={styles.inputGroup}>
              <Text style={[typography.labelCaps, { color: colors.primary, marginBottom: spacing.xs }]}>DEPLOYMENT SCHEDULE</Text>
              <View style={[styles.bentoCard, styles.dateRow, { borderColor: colors.outlineVariant }]}>
                <MaterialIcons name="calendar-today" size={20} color={colors.secondary} style={{ marginRight: spacing.md }} />
                <Text style={[typography.labelSm, { color: colors.primary }]}>Select Date & Time</Text>
                {/* Native datetime picker would go here */}
              </View>
            </View>

            {/* Resource Allocation */}
            <View style={styles.inputGroup}>
              <View style={styles.allocationHeader}>
                <Text style={[typography.labelCaps, { color: colors.primary }]}>RESOURCE ALLOCATION</Text>
                <View style={[styles.allocationBadge, { backgroundColor: colors.secondaryContainer }]}>
                  <Text style={[typography.labelSm, { color: colors.primaryContainer }]}>{allocation}%</Text>
                </View>
              </View>
              <View style={[styles.bentoCard, { borderColor: colors.outlineVariant, padding: spacing.lg, gap: spacing.md }]}>
                {/* Simulated Slider */}
                <View style={styles.sliderTrack}>
                  <View style={[styles.sliderFill, { backgroundColor: colors.primary, width: `${allocation}%` }]} />
                  <View style={[styles.sliderThumb, { borderColor: '#FFFFFF', backgroundColor: colors.primary, left: `${allocation}%` }]} />
                </View>
                <View style={styles.sliderLabels}>
                  <Text style={[typography.labelCaps, { color: colors.outline, fontSize: 10 }]}>MINIMAL</Text>
                  <Text style={[typography.labelCaps, { color: colors.outline, fontSize: 10 }]}>MAXIMUM</Text>
                </View>
              </View>
            </View>

            {/* Visualization / Atmosphere */}
            <View style={[styles.vizCard, { borderColor: colors.outlineVariant }]}>
              <Image 
                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAIVicWZm9yJQ6PDR87Jweq2Ok2DvNksjn_ijnibtMUDBuLr3WFcmr-r2DAR652ykuOTVvDhRJ0nt0vQXPRrYvkp6lX_b5GwTIj2BjOu45G5C4tD8GQIG6QWb-08agqbrN8oZTEUg5WRaOEg7FolqyxMkDeYYGu_CKcw7upAS0Aln5bLUBkGPd1ijey9MSTJowX_TN2opeu1rK4NcoKaXywFK9XIr3VvAo13PcIs7fN0uJWI2csic_xig' }}
                style={styles.vizImage}
              />
              <View style={styles.vizOverlay} />
              <View style={styles.badgeContainer}>
                <View style={[styles.vizBadge, { backgroundColor: 'rgba(255,255,255,0.9)' }]}>
                  <View style={[styles.statusDot, { backgroundColor: colors.tertiaryFixedDim }]} />
                  <Text style={[typography.labelCaps, { color: colors.primary, fontSize: 10 }]}>ENGINE READY</Text>
                </View>
              </View>
            </View>

            {/* Deploy Button */}
            <View style={{ paddingTop: spacing.md, paddingBottom: spacing.xl }}>
              <TouchableOpacity style={[styles.deployBtn, { backgroundColor: colors.primary }]}>
                <Text style={[typography.labelCaps, { color: colors.onPrimary, letterSpacing: 2, marginRight: 8 }]}>DEPLOY MANDATE</Text>
                <MaterialIcons name="bolt" size={20} color={colors.onPrimary} />
              </TouchableOpacity>
            </View>

          </View>
        </View>

        {/* Footer */}
        <View style={[styles.footer, { backgroundColor: colors.surfaceContainer }]}>
          <Text style={[typography.labelCaps, { color: colors.secondary, opacity: 0.8 }]}>© 2024 MANDATE INDUSTRIAL</Text>
          <View style={styles.footerLinks}>
            <Text style={[typography.labelSm, { color: colors.secondary }]}>Privacy</Text>
            <Text style={[typography.labelSm, { color: colors.secondary }]}>Terms</Text>
            <Text style={[typography.labelSm, { color: colors.secondary }]}>Support</Text>
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
    height: 64,
    borderBottomWidth: 1,
  },
  iconBtn: {
    padding: 8,
  },
  container: {
    flexGrow: 1,
  },
  mainContent: {},
  formStack: {
    gap: 32,
  },
  inputGroup: {
    gap: 8,
  },
  bentoCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    padding: 16,
    borderRadius: 16,
  },
  textInput: {
    paddingVertical: 8,
    borderBottomWidth: 1,
  },
  segmentedControl: {
    flexDirection: 'row',
    padding: 4,
    borderRadius: 9999,
    borderWidth: 1,
  },
  segmentBtn: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9999,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  allocationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  allocationBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  sliderTrack: {
    height: 4,
    backgroundColor: '#EDEEF0',
    borderRadius: 2,
    position: 'relative',
    justifyContent: 'center',
  },
  sliderFill: {
    height: '100%',
    borderRadius: 2,
  },
  sliderThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    position: 'absolute',
    transform: [{ translateX: -12 }],
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  vizCard: {
    height: 160,
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
    position: 'relative',
  },
  vizImage: {
    width: '100%',
    height: '100%',
    opacity: 0.8,
  },
  vizOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.2)', // Simulated gradient
  },
  badgeContainer: {
    position: 'absolute',
    bottom: 16,
    left: 16,
  },
  vizBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    gap: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  deployBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 9999,
  },
  footer: {
    paddingVertical: 32,
    alignItems: 'center',
    gap: 16,
  },
  footerLinks: {
    flexDirection: 'row',
    gap: 16,
  },
});

export default FirstMandateCreationScreen;
