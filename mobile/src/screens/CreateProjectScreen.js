import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, SafeAreaView, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { createProject } from '../services/projectService';
const CreateProjectScreen = ({ navigation }) => {
  const { colors, typography, spacing, borderRadius } = useTheme();
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;
  const [projectName, setProjectName] = useState('');
  const [priority, setPriority] = useState('LOW');
  const [loading, setLoading] = useState(false);

  const handleInitialize = async () => {
    if (!projectName) return;
    setLoading(true);
    try {
      await createProject({
        name: projectName,
        status: 'active',
        healthIndex: 100,
        workspaceId: user?.activeWorkspace,
        priority: priority
      });
      navigation.goBack();
    } catch (err) {
      console.error(err);
      alert('Failed to initialize project');
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      {/* Top Navigation Bar */}
      <View style={[styles.header, { borderBottomColor: colors.outlineVariant, backgroundColor: colors.background }]}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={24} color={colors.primary} />
          </TouchableOpacity>
          <Text style={[typography.headlineLgMobile, { color: colors.primary, fontWeight: '900', letterSpacing: -1, marginLeft: spacing.sm }]}>PROMETHEUS</Text>
        </View>
        <View style={[styles.avatarContainer, { borderColor: colors.outlineVariant }]}>
          <Image 
            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAuGy9A8Hf09UB4MvhErbPmlHjf3uqK81MPCEMitUij7sQ776ZqpwzHpalF4qMWBrbGKXL9dI53bSWTe6PItGn6FAqqp-0UqsIuzM7ysoix-0ODyyDLTXv8lqm2j7HZ-Udow28eue7KsjsEBJaJr271QyzPrANArXG7f9SZSSkyF0oSxaJQVFuFuXxb3eHM04rQR2nyG-GiCim_mY6ddtGOBUXWfmIy7C8Q2NT0psB45WksEG6y4utJEg' }} 
            style={styles.avatarImage} 
          />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <View style={[styles.mainContent, { paddingHorizontal: spacing.md, paddingTop: spacing.lg }]}>
          
          {/* Progress Stepper */}
          <View style={styles.stepperContainer}>
            {[1, 2, 3].map((step) => (
              <View 
                key={step} 
                style={[
                  styles.stepLine, 
                  { backgroundColor: step <= currentStep ? colors.primaryContainer : colors.surfaceContainerHigh }
                ]} 
              />
            ))}
          </View>

          {/* Form Content based on currentStep */}
          <View style={styles.formContainer}>
            
            {/* Step 1: Identity */}
            {currentStep === 1 && (
              <View>
                <View style={{ marginBottom: spacing.lg }}>
                  <Text style={[typography.headlineLgMobile, { color: colors.primary, marginBottom: spacing.xs }]}>Identity</Text>
                  <Text style={[typography.labelSm, { color: colors.secondary, textTransform: 'uppercase', letterSpacing: 2 }]}>Protocol Phase 01</Text>
                </View>

                <View style={{ gap: spacing.lg }}>
                  <View>
                    <Text style={[typography.labelCaps, { color: colors.secondary, marginBottom: spacing.sm }]}>Project Nomenclature</Text>
                    <TextInput 
                      style={[styles.textInput, typography.labelSm, { backgroundColor: colors.surfaceContainerLow, borderBottomColor: colors.outlineVariant, color: colors.primary, fontSize: 18, textTransform: 'uppercase' }]}
                      placeholder="e.g. PROJECT_AETHER"
                      placeholderTextColor={colors.outlineVariant}
                      value={projectName}
                      onChangeText={setProjectName}
                    />
                  </View>

                  <View>
                    <Text style={[typography.labelCaps, { color: colors.secondary, marginBottom: spacing.sm }]}>Executive Lead</Text>
                    <TouchableOpacity style={[styles.selectInput, { backgroundColor: colors.surfaceContainerLow, borderBottomColor: colors.outlineVariant }]}>
                      <Text style={[typography.bodyMd, { color: colors.primary }]}>Select Personnel</Text>
                      <MaterialIcons name="expand-more" size={24} color={colors.secondary} />
                    </TouchableOpacity>
                  </View>

                  <View style={[styles.card, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant, padding: spacing.md }]}>
                    <Text style={[typography.labelCaps, { color: colors.secondary, marginBottom: spacing.sm }]}>Aesthetic Anchor</Text>
                    <View style={[styles.imageContainer, { backgroundColor: colors.surfaceContainerHigh }]}>
                      <Image 
                        source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAfSncSDlI4cwiKFrDBoH0lFNBau8M1k0FWwkfFH4xlMe9npZ4kvdYEIQyTOyB_ZMS8amVQ2r42zX5EpegCLR_v7AjvziVVCQkVovDy3xG4t2ba8cc0hUX0gIr6ElIffMRtBigQoyH1BgtC-CdlKIQzvK6uC1FB6rvJjbKkPXEAILJbiyZkuVadTcBCUtI_pBWG3aAqi9ojbZWDBU55XLPkTN5c_fhNvBfbDzr3zjh6114YSJKocbLxIw' }} 
                        style={styles.aestheticImage} 
                      />
                    </View>
                    <Text style={[typography.labelSm, { color: colors.secondaryFixedVariant, fontSize: 10, fontStyle: 'italic', marginTop: spacing.sm }]}>Current style preset: "INDUSTRIAL_MINIMAL"</Text>
                  </View>
                </View>
              </View>
            )}

            {/* Step 2: Operational */}
            {currentStep === 2 && (
              <View>
                <View style={{ marginBottom: spacing.lg }}>
                  <Text style={[typography.headlineLgMobile, { color: colors.primary, marginBottom: spacing.xs }]}>Operational</Text>
                  <Text style={[typography.labelSm, { color: colors.secondary, textTransform: 'uppercase', letterSpacing: 2 }]}>Protocol Phase 02</Text>
                </View>

                <View style={{ gap: spacing.lg }}>
                  <View style={styles.row}>
                    <View style={{ flex: 1, marginRight: spacing.md }}>
                      <Text style={[typography.labelCaps, { color: colors.secondary, marginBottom: spacing.sm }]}>Inception</Text>
                      <TouchableOpacity style={[styles.selectInput, { backgroundColor: colors.surfaceContainerLow, borderBottomColor: colors.outlineVariant, paddingVertical: spacing.sm }]}>
                        <MaterialIcons name="calendar-today" size={16} color={colors.secondary} />
                        <Text style={[typography.labelSm, { color: colors.secondary, flex: 1, marginLeft: spacing.sm }]}>YYYY-MM-DD</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={[typography.labelCaps, { color: colors.secondary, marginBottom: spacing.sm }]}>Deployment</Text>
                      <TouchableOpacity style={[styles.selectInput, { backgroundColor: colors.surfaceContainerLow, borderBottomColor: colors.outlineVariant, paddingVertical: spacing.sm }]}>
                        <MaterialIcons name="event" size={16} color={colors.secondary} />
                        <Text style={[typography.labelSm, { color: colors.secondary, flex: 1, marginLeft: spacing.sm }]}>YYYY-MM-DD</Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View>
                    <Text style={[typography.labelCaps, { color: colors.secondary, marginBottom: spacing.sm }]}>Mission Priority</Text>
                    <View style={styles.priorityRow}>
                      <TouchableOpacity 
                        style={[styles.priorityBtn, priority === 'LOW' ? { backgroundColor: colors.primary, borderColor: colors.primary } : { borderColor: colors.outlineVariant }]}
                        onPress={() => setPriority('LOW')}
                      >
                        <Text style={[typography.labelCaps, { color: priority === 'LOW' ? colors.onPrimary : colors.primary }]}>LOW</Text>
                      </TouchableOpacity>
                      <TouchableOpacity 
                        style={[styles.priorityBtn, priority === 'CRITICAL' ? { backgroundColor: colors.primary, borderColor: colors.primary } : { borderColor: colors.outlineVariant }]}
                        onPress={() => setPriority('CRITICAL')}
                      >
                        <Text style={[typography.labelCaps, { color: priority === 'CRITICAL' ? colors.onPrimary : colors.primary }]}>CRITICAL</Text>
                      </TouchableOpacity>
                      <TouchableOpacity 
                        style={[styles.priorityBtn, priority === 'EVO' ? { backgroundColor: colors.primary, borderColor: colors.primary } : { borderColor: colors.outlineVariant }]}
                        onPress={() => setPriority('EVO')}
                      >
                        <Text style={[typography.labelCaps, { color: priority === 'EVO' ? colors.onPrimary : colors.primary }]}>EVO</Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View style={[styles.card, { backgroundColor: colors.surfaceContainerHigh, borderColor: colors.outlineVariant, padding: spacing.md }]}>
                    <View style={styles.toggleRow}>
                      <Text style={[typography.labelSm, { color: colors.primary, fontWeight: 'bold' }]}>STRICT_VALIDATION</Text>
                      <View style={[styles.toggle, { backgroundColor: colors.primary }]}>
                        <View style={styles.toggleKnobActive} />
                      </View>
                    </View>
                    <Text style={[typography.bodyMd, { color: colors.secondary, fontSize: 12, fontStyle: 'italic', marginTop: spacing.sm }]}>
                      Enabling strict validation requires cryptographic sign-off for all repository commits and architectural changes.
                    </Text>
                  </View>
                </View>
              </View>
            )}

            {/* Step 3: Resource */}
            {currentStep === 3 && (
              <View>
                <View style={{ marginBottom: spacing.lg }}>
                  <Text style={[typography.headlineLgMobile, { color: colors.primary, marginBottom: spacing.xs }]}>Resource</Text>
                  <Text style={[typography.labelSm, { color: colors.secondary, textTransform: 'uppercase', letterSpacing: 2 }]}>Protocol Phase 03</Text>
                </View>

                <View style={{ gap: spacing.lg }}>
                  <View>
                    <Text style={[typography.labelCaps, { color: colors.secondary, marginBottom: spacing.sm }]}>Resource Multiplier</Text>
                    <View style={[styles.sliderTrack, { backgroundColor: colors.surfaceContainerHigh }]}>
                      <View style={[styles.sliderFill, { backgroundColor: colors.primary, width: '50%' }]} />
                    </View>
                    <View style={styles.sliderLabels}>
                      <Text style={[typography.labelCaps, { color: colors.secondary }]}>MIN</Text>
                      <Text style={[typography.labelCaps, { color: colors.primary, fontWeight: 'bold' }]}>1.5x ACTIVE</Text>
                      <Text style={[typography.labelCaps, { color: colors.secondary }]}>MAX</Text>
                    </View>
                  </View>

                  <View>
                    <Text style={[typography.labelCaps, { color: colors.secondary, marginBottom: spacing.sm }]}>Assigned Units</Text>
                    <View style={styles.row}>
                      <View style={[styles.unitCard, { backgroundColor: colors.surfaceContainerLow, borderColor: colors.outlineVariant, marginRight: spacing.sm }]}>
                        <View style={[styles.unitIcon, { backgroundColor: colors.surfaceContainerHigh }]}>
                          <Text style={[typography.labelCaps, { color: colors.primary, fontWeight: 'bold' }]}>A</Text>
                        </View>
                        <Text style={[typography.labelSm, { color: colors.primary, marginLeft: spacing.sm }]}>Alpha Squad</Text>
                      </View>
                      <View style={[styles.unitCard, { backgroundColor: colors.surfaceContainerLow, borderColor: colors.outlineVariant }]}>
                        <View style={[styles.unitIcon, { backgroundColor: colors.surfaceContainerHigh }]}>
                          <Text style={[typography.labelCaps, { color: colors.primary, fontWeight: 'bold' }]}>V</Text>
                        </View>
                        <Text style={[typography.labelSm, { color: colors.primary, marginLeft: spacing.sm }]}>Vector Lab</Text>
                      </View>
                    </View>
                  </View>

                  <View style={[styles.card, { backgroundColor: colors.primary, overflow: 'hidden', height: 192 }]}>
                    <View style={styles.confirmationOverlay}>
                      <Text style={[typography.labelCaps, { color: colors.onPrimary, marginBottom: spacing.xs }]}>READY FOR INITIALIZATION</Text>
                      <Text style={[typography.labelSm, { color: 'rgba(255,255,255,0.6)', fontSize: 10, textTransform: 'uppercase' }]}>All parameters verified across local nodes</Text>
                    </View>
                  </View>

                </View>
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Action Bar */}
      <View style={[styles.footer, { backgroundColor: colors.surface, borderTopColor: colors.outlineVariant }]}>
        {currentStep > 1 && (
          <TouchableOpacity style={[styles.navBtn, { borderColor: colors.outlineVariant, flex: 1, marginRight: spacing.md }]} onPress={handlePrev}>
            <Text style={[typography.labelCaps, { color: colors.secondary }]}>BACK</Text>
          </TouchableOpacity>
        )}
        
        {currentStep < totalSteps ? (
          <TouchableOpacity style={[styles.primaryBtn, { backgroundColor: colors.primary, flex: 2 }]} onPress={handleNext}>
            <Text style={[typography.labelCaps, { color: colors.onPrimary, marginRight: spacing.sm }]}>PHASE 0{currentStep + 1}</Text>
            <MaterialIcons name="arrow-forward" size={16} color={colors.onPrimary} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity 
            style={[styles.primaryBtn, { backgroundColor: colors.primary, flex: 2 }, loading && { opacity: 0.7 }]} 
            onPress={handleInitialize}
            disabled={loading}
          >
            <Text style={[typography.labelCaps, { color: colors.onPrimary, marginRight: spacing.sm }]}>
              {loading ? 'INITIALIZING...' : 'INITIALIZE PROJECT'}
            </Text>
            <MaterialIcons name="rocket-launch" size={16} color={colors.onPrimary} />
          </TouchableOpacity>
        )}
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
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
  },
  avatarContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  container: {
    flexGrow: 1,
    paddingBottom: 120, // Space for footer
  },
  mainContent: {},
  stepperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 32,
    paddingHorizontal: 4,
  },
  stepLine: {
    flex: 1,
    height: 4,
    borderRadius: 2,
  },
  formContainer: {},
  textInput: {
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderBottomWidth: 2,
  },
  selectInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderBottomWidth: 2,
  },
  card: {
    borderWidth: 1,
    borderRadius: 8,
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 16/9,
    borderRadius: 6,
    overflow: 'hidden',
  },
  aestheticImage: {
    width: '100%',
    height: '100%',
  },
  row: {
    flexDirection: 'row',
  },
  priorityRow: {
    flexDirection: 'row',
    gap: 8,
  },
  priorityBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 32,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  toggle: {
    width: 48,
    height: 24,
    borderRadius: 12,
    position: 'relative',
  },
  toggleKnobActive: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
    position: 'absolute',
    right: 4,
    top: 4,
  },
  sliderTrack: {
    width: '100%',
    height: 4,
    borderRadius: 8,
  },
  sliderFill: {
    height: '100%',
    borderRadius: 8,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  unitCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderWidth: 1,
    borderRadius: 4,
  },
  unitIcon: {
    width: 32,
    height: 32,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmationOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.4)', // simulate gradient text contrast
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
  },
  navBtn: {
    paddingVertical: 16,
    borderRadius: 32,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryBtn: {
    flexDirection: 'row',
    paddingVertical: 16,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default CreateProjectScreen;
