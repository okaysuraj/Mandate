import React, { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  KeyboardAvoidingView, 
  Platform, 
  ActivityIndicator,
  ScrollView,
  ImageBackground
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const { resetPassword } = useAuth();
  const { colors, typography, spacing, borderRadius } = useTheme();

  const handleReset = async () => {
    if (!email) return;
    setLoading(true);
    try {
      await resetPassword(email);
      setIsSent(true);
      
      // Auto-navigate back or let user know. For now just show success state in place.
      setTimeout(() => {
        // Option to go back to login automatically
        // navigation.navigate("Login");
      }, 3000);
    } catch (error) {
      // error handled in context
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.surface }]}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} bounces={false}>
          
          {/* Header Branding Section */}
          <View style={styles.headerSection}>
            <TouchableOpacity 
              style={[styles.backButton, { marginBottom: spacing.md }]} 
              onPress={() => navigation.goBack()}
            >
              <MaterialIcons name="arrow-back" size={24} color={colors.primary} />
            </TouchableOpacity>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.md, gap: spacing.sm }}>
              <MaterialIcons name="lock-reset" size={32} color={colors.primary} />
              <Text style={[typography.headlineLgMobile, { color: colors.primary, textTransform: 'uppercase' }]}>
                MANDATE
              </Text>
            </View>
            <Text style={[typography.headlineLgMobile, { color: colors.primary, marginBottom: spacing.sm }]}>
              CREDENTIAL RECOVERY
            </Text>
            <Text style={[typography.bodyMd, { color: colors.secondary, maxWidth: 320 }]}>
              Initiate a secure handshake to reset your industrial access parameters.
            </Text>
          </View>

          <View style={styles.contentArea}>
            {/* Recovery Canvas (Bento Module) */}
            <View style={[styles.bentoCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.surfaceDim, padding: spacing.lg }]}>
              {isSent ? (
                <View style={styles.successContainer}>
                  <MaterialIcons name="check-circle" size={48} color={colors.primary} style={{ marginBottom: spacing.md }} />
                  <Text style={[typography.labelCaps, { color: colors.primary, marginBottom: spacing.sm, textAlign: 'center' }]}>
                    PROTOCOL INITIATED
                  </Text>
                  <Text style={[typography.bodyMd, { color: colors.secondary, textAlign: 'center' }]}>
                    Recovery link transmitted to authorized terminal at {email}.
                  </Text>
                </View>
              ) : (
                <View style={styles.formContainer}>
                  <View style={styles.inputGroup}>
                    <Text style={[typography.labelCaps, { color: colors.secondary }]}>
                      AUTHORIZED WORK EMAIL
                    </Text>
                    <TextInput
                      style={[
                        styles.inputUnderline, 
                        typography.labelSm, 
                        { 
                          borderBottomColor: colors.surfaceDim,
                          color: colors.primary,
                          paddingVertical: spacing.md
                        }
                      ]}
                      placeholder="OPERATOR@MANDATE.SYS"
                      placeholderTextColor={colors.outlineVariant}
                      value={email}
                      onChangeText={setEmail}
                      autoCapitalize="none"
                      keyboardType="email-address"
                    />
                    <Text style={[typography.labelSm, { color: colors.secondary, fontSize: 10, textTransform: 'uppercase', opacity: 0.6, marginTop: spacing.xs }]}>
                      System identity verification required
                    </Text>
                  </View>

                  <TouchableOpacity 
                    style={[
                      styles.primaryButton, 
                      { backgroundColor: colors.primary, borderRadius: borderRadius.full },
                      loading && { opacity: 0.7 }
                    ]}
                    onPress={handleReset}
                    disabled={loading || !email}
                  >
                    {loading ? (
                      <ActivityIndicator color={colors.onPrimary} />
                    ) : (
                      <>
                        <Text style={[typography.labelCaps, { color: colors.onPrimary }]}>REQUEST RESET PROTOCOL</Text>
                        <MaterialIcons name="security-update-good" size={18} color={colors.onPrimary} />
                      </>
                    )}
                  </TouchableOpacity>
                </View>
              )}
            </View>

            {/* Technical Sidebar Content (Stacked Mobile Format) */}
            <View style={styles.sidebarContent}>
              {/* Security Protocol Card */}
              <View style={[styles.bentoCard, { backgroundColor: colors.surfaceContainerLow, borderLeftWidth: 4, borderLeftColor: colors.primary, padding: spacing.md }]}>
                <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: spacing.md }}>
                  <MaterialIcons name="verified-user" size={24} color={colors.primary} style={{ marginTop: 2 }} />
                  <View style={{ flex: 1 }}>
                    <Text style={[typography.labelCaps, { color: colors.primary }]}>ENCRYPTION LEVEL 7</Text>
                    <Text style={[typography.bodyMd, { color: colors.secondary, fontSize: 12, lineHeight: 16, marginTop: spacing.xs }]}>
                      All recovery requests are processed via end-to-end hardware-isolated modules (HSM) to ensure credential integrity.
                    </Text>
                  </View>
                </View>
              </View>

              {/* Asset Recovery Image Module */}
              <View style={[styles.bentoCard, styles.imageModule]}>
                <ImageBackground 
                  source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD86vli8THQNz76t9TzftVxhDW58pEmgI4yiffsPSIwcv7B4eaMdmM7WR6NGmZSteX8QrmYT-XMSVO7M2Ii3v29jhnEyh-fANZSsF0nR156OPHQQI7a3wltS_j3l37Dzvc5ORGohocbrmNZQ2J2zkYCmz1Eooedwwwey7-oO5rslF76SUPEjRTDIcph1LbUfrvUdJKOurHxHabLYf6hwkTxrSTRFr694W6WrvjX-aiWwenuApKm-Bccqg' }}
                  style={StyleSheet.absoluteFillObject}
                >
                  <View style={[StyleSheet.absoluteFillObject, { backgroundColor: 'rgba(0,0,0,0.6)' }]} />
                </ImageBackground>
                <View style={{ position: 'absolute', bottom: spacing.md, left: spacing.md }}>
                  <Text style={[typography.labelCaps, { color: colors.onPrimary }]}>NODE: RECOVERY-04</Text>
                </View>
              </View>

              {/* Assistance Card */}
              <View style={[styles.bentoCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.surfaceDim, padding: spacing.md, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
                <Text style={[typography.labelCaps, { color: colors.secondary }]}>HAVE AN ISSUE?</Text>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={[typography.labelSm, { color: colors.primary, textDecorationLine: 'underline' }]}>CONTACT ARCHITECT</Text>
                  <MaterialIcons name="arrow-outward" size={14} color={colors.primary} style={{ marginLeft: spacing.xs }} />
                </TouchableOpacity>
              </View>
            </View>

          </View>

          {/* System Footer */}
          <View style={[styles.footer, { marginTop: spacing.xl, paddingBottom: spacing.lg }]}>
            <Text style={[typography.labelSm, { color: colors.secondary, opacity: 0.6, textAlign: 'center', marginBottom: spacing.md }]}>
              © 2024 MANDATE INDUSTRIAL — ALL SYSTEMS SECURED
            </Text>
            <View style={styles.footerLinks}>
              <Text style={[typography.labelCaps, { color: colors.secondary, fontSize: 10 }]}>PRIVACY</Text>
              <Text style={[typography.labelCaps, { color: colors.secondary, fontSize: 10 }]}>TERMS</Text>
              <Text style={[typography.labelCaps, { color: colors.secondary, fontSize: 10 }]}>SUPPORT</Text>
            </View>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 48,
    paddingHorizontal: 24,
    paddingBottom: 48,
    maxWidth: 500,
    alignSelf: 'center',
    width: '100%',
  },
  headerSection: {
    marginBottom: 48,
  },
  backButton: {
    alignSelf: 'flex-start',
    padding: 8,
    marginLeft: -8,
  },
  contentArea: {
    gap: 24,
  },
  bentoCard: {
    borderWidth: 1,
    borderColor: 'transparent',
  },
  successContainer: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  formContainer: {
    gap: 32,
  },
  inputGroup: {
    gap: 4,
  },
  inputUnderline: {
    borderBottomWidth: 1,
    paddingHorizontal: 0,
  },
  primaryButton: {
    flexDirection: 'row',
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  sidebarContent: {
    gap: 16,
  },
  imageModule: {
    height: 192,
    position: 'relative',
    overflow: 'hidden',
  },
  footer: {
    alignItems: 'center',
  },
  footerLinks: {
    flexDirection: 'row',
    gap: 24,
  }
});

export default ForgotPasswordScreen;
