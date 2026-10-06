import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { createProject } from '../../services/projectService';
import AppHeader from '../../components/layout/AppHeader';
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
      alert('Failed to create project');
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
      <AppHeader title="CREATE PROJECT" showBack={true} navigation={navigation} />

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
                  <Text style={[typography.labelSm, { color: colors.secondary, textTransform: 'uppercase', letterSpacing: 2 }]}>Phase 01: Setup</Text>
                </View>

                <View style={{ gap: spacing.lg }}>
                  <View>
                    <Text style={[typography.labelCaps, { color: colors.secondary, marginBottom: spacing.sm }]}>Project Name</Text>
                    <TextInput 
                      style={[styles.textInput, typography.labelSm, { backgroundColor: colors.surfaceContainerLow, borderBottomColor: colors.outlineVariant, color: colors.primary, fontSize: 18 }]}
                      placeholder="e.g. Mobile App Redesign"
                      placeholderTextColor={colors.outlineVariant}
                      value={projectName}
                      onChangeText={setProjectName}
                    />
                  </View>

                  <View>
                    <Text style={[typography.labelCaps, { color: colors.secondary, marginBottom: spacing.sm }]}>Project Lead</Text>
                    <TouchableOpacity style={[styles.selectInput, { backgroundColor: colors.surfaceContainerLow, borderBottomColor: colors.outlineVariant }]}>
                      <Text style={[typography.bodyMd, { color: colors.primary }]}>Select Team Member</Text>
                      <MaterialIcons name="expand-more" size={24} color={colors.secondary} />
                    </TouchableOpacity>
                  </View>

                  <View style={[styles.card, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant, padding: spacing.md }]}>
                    <Text style={[typography.labelCaps, { color: colors.secondary, marginBottom: spacing.sm }]}>Project Theme</Text>
                    <View style={[styles.imageContainer, { backgroundColor: colors.surfaceContainerHigh }]}>
                      <Image 
                        source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAfSncSDlI4cwiKFrDBoH0lFNBau8M1k0FWwkfFH4xlMe9npZ4kvdYEIQyTOyB_ZMS8amVQ2r42zX5EpegCLR_v7AjvziVVCQkVovDy3xG4t2ba8cc0hUX0gIr6ElIffMRtBigQoyH1BgtC-CdlKIQzvK6uC1FB6rvJjbKkPXEAILJbiyZkuVadTcBCUtI_pBWG3aAqi9ojbZWDBU55XLPkTN5c_fhNvBfbDzr3zjh6114YSJKocbLxIw' }} 
                        style={styles.aestheticImage} 
                      />
                    </View>
                    <Text style={[typography.labelSm, { color: colors.secondaryFixedVariant, fontSize: 10, fontStyle: 'italic', marginTop: spacing.sm }]}>Style preset: "Clean Modern"</Text>
                  </View>
                </View>
              </View>
            )}

            {/* Step 2: Operational */}
            {currentStep === 2 && (
              <View>
                <View style={{ marginBottom: spacing.lg }}>
                  <Text style={[typography.headlineLgMobile, { color: colors.primary, marginBottom: spacing.xs }]}>Operational</Text>
                  <Text style={[typography.labelSm, { color: colors.secondary, textTransform: 'uppercase', letterSpacing: 2 }]}>Phase 02: Timeline</Text>
                </View>

                <View style={{ gap: spacing.lg }}>
                  <View style={styles.row}>
                    <View style={{ flex: 1, marginRight: spacing.md }}>
                      <Text style={[typography.labelCaps, { color: colors.secondary, marginBottom: spacing.sm }]}>Start Date</Text>
                      <TouchableOpacity style={[styles.selectInput, { backgroundColor: colors.surfaceContainerLow, borderBottomColor: colors.outlineVariant, paddingVertical: spacing.sm }]}>
                        <MaterialIcons name="calendar-today" size={16} color={colors.secondary} />
                        <Text style={[typography.labelSm, { color: colors.secondary, flex: 1, marginLeft: spacing.sm }]}>YYYY-MM-DD</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={[typography.labelCaps, { color: colors.secondary, marginBottom: spacing.sm }]}>Target Due Date</Text>
                      <TouchableOpacity style={[styles.selectInput, { backgroundColor: colors.surfaceContainerLow, borderBottomColor: colors.outlineVariant, paddingVertical: spacing.sm }]}>
                        <MaterialIcons name="event" size={16} color={colors.secondary} />
                        <Text style={[typography.labelSm, { color: colors.secondary, flex: 1, marginLeft: spacing.sm }]}>YYYY-MM-DD</Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View>
                    <Text style={[typography.labelCaps, { color: colors.secondary, marginBottom: spacing.sm }]}>Priority Level</Text>
                    <View style={styles.priorityRow}>
                      <TouchableOpacity 
                        style={[styles.priorityBtn, priority === 'LOW' ? { backgroundColor: colors.primary, borderColor: colors.primary } : { borderColor: colors.outlineVariant }]}
                        onPress={() => setPriority('LOW')}
                      >
                        <Text style={[typography.labelCaps, { color: priority === 'LOW' ? colors.onPrimary : colors.primary }]}>LOW</Text>
                      </TouchableOpacity>
                      <TouchableOpacity 
                        style={[styles.priorityBtn, priority === 'MEDIUM' ? { backgroundColor: colors.primary, borderColor: colors.primary } : { borderColor: colors.outlineVariant }]}
                        onPress={() => setPriority('MEDIUM')}
                      >
                        <Text style={[typography.labelCaps, { color: priority === 'MEDIUM' ? colors.onPrimary : colors.primary }]}>MEDIUM</Text>
                      </TouchableOpacity>
                      <TouchableOpacity 
                        style={[styles.priorityBtn, priority === 'HIGH' ? { backgroundColor: colors.primary, borderColor: colors.primary } : { borderColor: colors.outlineVariant }]}
                        onPress={() => setPriority('HIGH')}
                      >
                        <Text style={[typography.labelCaps, { color: priority === 'HIGH' ? colors.onPrimary : colors.primary }]}>HIGH</Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View style={[styles.card, { backgroundColor: colors.surfaceContainerHigh, borderColor: colors.outlineVariant, padding: spacing.md }]}>
                    <View style={styles.toggleRow}>
                      <Text style={[typography.labelSm, { color: colors.primary, fontWeight: 'bold' }]}>STRICT REVIEW</Text>
                      <View style={[styles.toggle, { backgroundColor: colors.primary }]}>
                        <View style={[styles.toggleKnobActive, { backgroundColor: colors.onPrimary }]} />
                      </View>
                    </View>
                    <Text style={[typography.bodyMd, { color: colors.secondary, fontSize: 12, fontStyle: 'italic', marginTop: spacing.sm }]}>
                      Enabling strict review requires team lead approval for key milestones and final deliverables.
                    </Text>
                  </View>
                </View>
              </View>
            )}

            {/* Step 3: Resource */}
            {currentStep === 3 && (
              <View>
                <View style={{ marginBottom: spacing.lg }}>
                  <Text style={[typography.headlineLgMobile, { color: colors.primary, marginBottom: spacing.xs }]}>Team & Resources</Text>
                  <Text style={[typography.labelSm, { color: colors.secondary, textTransform: 'uppercase', letterSpacing: 2 }]}>Phase 03: Allocation</Text>
                </View>

                <View style={{ gap: spacing.lg }}>
                  <View>
                    <Text style={[typography.labelCaps, { color: colors.secondary, marginBottom: spacing.sm }]}>Team Allocation</Text>
                    <View style={[styles.sliderTrack, { backgroundColor: colors.surfaceContainerHigh }]}>
                      <View style={[styles.sliderFill, { backgroundColor: colors.primary, width: '50%' }]} />
                    </View>
                    <View style={styles.sliderLabels}>
                      <Text style={[typography.labelCaps, { color: colors.secondary }]}>STANDARD</Text>
                      <Text style={[typography.labelCaps, { color: colors.primary, fontWeight: 'bold' }]}>1.5x DEDICATED</Text>
                      <Text style={[typography.labelCaps, { color: colors.secondary }]}>EXPANDED</Text>
                    </View>
                  </View>

                  <View>
                    <Text style={[typography.labelCaps, { color: colors.secondary, marginBottom: spacing.sm }]}>Assigned Teams</Text>
                    <View style={styles.row}>
                      <View style={[styles.unitCard, { backgroundColor: colors.surfaceContainerLow, borderColor: colors.outlineVariant, marginRight: spacing.sm }]}>
                        <View style={[styles.unitIcon, { backgroundColor: colors.surfaceContainerHigh }]}>
                          <Text style={[typography.labelCaps, { color: colors.primary, fontWeight: 'bold' }]}>E</Text>
                        </View>
                        <Text style={[typography.labelSm, { color: colors.primary, marginLeft: spacing.sm }]}>Core Engineering</Text>
                      </View>
                      <View style={[styles.unitCard, { backgroundColor: colors.surfaceContainerLow, borderColor: colors.outlineVariant }]}>
                        <View style={[styles.unitIcon, { backgroundColor: colors.surfaceContainerHigh }]}>
                          <Text style={[typography.labelCaps, { color: colors.primary, fontWeight: 'bold' }]}>D</Text>
                        </View>
                        <Text style={[typography.labelSm, { color: colors.primary, marginLeft: spacing.sm }]}>Product Design</Text>
                      </View>
                    </View>
                  </View>

                  <View style={[styles.card, { backgroundColor: colors.primary, overflow: 'hidden', height: 192 }]}>
                    <View style={styles.confirmationOverlay}>
                      <Text style={[typography.labelCaps, { color: colors.onPrimary, marginBottom: spacing.xs }]}>READY TO CREATE PROJECT</Text>
                      <Text style={[typography.labelSm, { color: 'rgba(255,255,255,0.6)', fontSize: 10, textTransform: 'uppercase' }]}>All project parameters verified and ready</Text>
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
            <Text style={[typography.labelCaps, { color: colors.onPrimary, marginRight: spacing.sm }]}>NEXT STEP</Text>
            <MaterialIcons name="arrow-forward" size={16} color={colors.onPrimary} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity 
            style={[styles.primaryBtn, { backgroundColor: colors.primary, flex: 2 }, loading && { opacity: 0.7 }]} 
            onPress={handleInitialize}
            disabled={loading}
          >
            <Text style={[typography.labelCaps, { color: colors.onPrimary, marginRight: spacing.sm }]}>
              {loading ? 'CREATING...' : 'CREATE PROJECT'}
            </Text>
            <MaterialIcons name="check" size={16} color={colors.onPrimary} />
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
    borderRadius: 12,
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 16/9,
    borderRadius: 8,
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
    borderRadius: 8,
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
    borderRadius: 8,
  },
  unitIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
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
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryBtn: {
    flexDirection: 'row',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default CreateProjectScreen;
