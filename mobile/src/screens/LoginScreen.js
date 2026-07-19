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
  ImageBackground,
  ScrollView
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const { colors, typography, spacing, borderRadius } = useTheme();

  const handleLogin = async () => {
    if (!email || !password) return;
    setLoading(true);
    try {
      await login(email, password);
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.surface }]}>
      {/* Top Header */}
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.outlineVariant }]}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="menu" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>
        <Text style={[typography.headlineLgMobile, { color: colors.primary, textAlign: 'center' }]}>MANDATE</Text>
        <View style={styles.headerRight}>
          <MaterialIcons name="account-circle" size={24} color={colors.primary} />
        </View>
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} bounces={false}>
          
          {/* Hero Branding Section */}
          <View style={styles.heroSection}>
            <View style={[styles.securityBadge, { backgroundColor: colors.surfaceContainerLow, borderColor: colors.outlineVariant }]}>
              <MaterialIcons name="security" size={20} color={colors.onTertiaryContainer} />
              <Text style={[typography.labelCaps, { color: colors.onTertiaryContainer, marginLeft: spacing.xs }]}>
                ENCRYPTED SESSION
              </Text>
            </View>
            <Text style={[typography.headlineLgMobile, { color: colors.primary, marginBottom: spacing.xs }]}>
              Login to Portal
            </Text>
            <Text style={[typography.bodyMd, { color: colors.secondary, textAlign: 'center', maxWidth: 300 }]}>
              Authorized personnel access only. Please provide your credentials to proceed.
            </Text>
          </View>

          {/* Login Form Bento Module */}
          <View style={[styles.bentoCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.surfaceDim, borderRadius: borderRadius.DEFAULT, padding: spacing.lg }]}>
            {/* Visual Branding Element */}
            <View style={[styles.imageContainer, { borderRadius: spacing.md, marginBottom: spacing.md }]}>
              <ImageBackground 
                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCELbSCHAbWiC3qv97uEn4qMhBtV9YIay9ZYzKhAy6i0OqEU_8RqW0jEKcWY5kB8JC8Atk4Asa2VD1FjbSR8C6Pozwi5hjZAuttutERK-mr9cd5u-76VCjN0HPMNalq0GCki7qpbSJfwDZofFjrqCN7G4OGFY8eGFMjtBjJt1fOEncrexWn_9Vt12_WnF96W3oZ06RBSxYo3P7xDljNRkJMhlYAyGpmG2wDm1I00udx_dRQIp5IcgaxTQ' }}
                style={StyleSheet.absoluteFillObject}
                imageStyle={{ opacity: 0.9 }}
              >
                <View style={[StyleSheet.absoluteFillObject, { backgroundColor: 'rgba(255,255,255,0.2)' }]} />
              </ImageBackground>
            </View>

            <View style={styles.formGroup}>
              {/* Employee ID Field */}
              <View style={styles.inputGroup}>
                <View style={styles.labelRow}>
                  <MaterialIcons name="email" size={14} color={colors.secondary} />
                  <Text style={[typography.labelCaps, { color: colors.secondary, marginLeft: spacing.xs }]}>
                    EMAIL ADDRESS
                  </Text>
                </View>
                <TextInput
                  style={[
                    styles.inputUnderline,
                    typography.labelSm,
                    { 
                      backgroundColor: colors.surfaceContainerLow, 
                      borderBottomColor: colors.surfaceDim,
                      color: colors.onSurface,
                      paddingHorizontal: spacing.md,
                      paddingVertical: spacing.md,
                      letterSpacing: 2
                    }
                  ]}
                  placeholder="operator@mandate.com"
                  placeholderTextColor={colors.outlineVariant}
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              </View>

              {/* Password Field */}
              <View style={styles.inputGroup}>
                <View style={styles.labelRow}>
                  <MaterialIcons name="lock" size={14} color={colors.secondary} />
                  <Text style={[typography.labelCaps, { color: colors.secondary, marginLeft: spacing.xs }]}>
                    PASSWORD
                  </Text>
                </View>
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={[
                      styles.inputUnderline,
                      typography.labelSm,
                      { 
                        backgroundColor: colors.surfaceContainerLow, 
                        borderBottomColor: colors.surfaceDim,
                        color: colors.onSurface,
                        paddingHorizontal: spacing.md,
                        paddingVertical: spacing.md,
                        letterSpacing: 2,
                        flex: 1
                      }
                    ]}
                    placeholder="••••••••••••"
                    placeholderTextColor={colors.outlineVariant}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                  />
                  <TouchableOpacity 
                    style={styles.visibilityToggle}
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <MaterialIcons name={showPassword ? "visibility-off" : "visibility"} size={20} color={colors.secondary} />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Action Group */}
              <View style={{ paddingTop: spacing.md, gap: spacing.md }}>
                <TouchableOpacity 
                  style={[
                    styles.primaryButton, 
                    { backgroundColor: colors.primary, borderRadius: borderRadius.full },
                    loading && { opacity: 0.7 }
                  ]}
                  onPress={handleLogin}
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator color={colors.onPrimary} />
                  ) : (
                    <>
                      <Text style={[typography.labelCaps, { color: colors.onPrimary }]}>ACCESS SYSTEM</Text>
                      <MaterialIcons name="arrow-forward" size={18} color={colors.onPrimary} style={{ marginLeft: spacing.sm }} />
                    </>
                  )}
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.forgotPasswordButton}
                  onPress={() => navigation.navigate("ForgotPassword")}
                >
                  <Text style={[typography.labelSm, { color: colors.secondary, textDecorationLine: 'underline', textDecorationColor: colors.outlineVariant }]}>
                    Forgot credentials?
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Secondary Info Section */}
          <View style={[styles.secondaryInfoSection, { marginTop: spacing.xl }]}>
            <View style={[styles.infoCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.surfaceDim, borderRadius: borderRadius.DEFAULT, padding: spacing.md }]}>
              <MaterialIcons name="contact-support" size={24} color={colors.secondary} style={{ marginBottom: spacing.xs }} />
              <Text style={[typography.labelCaps, { color: colors.secondary, fontSize: 10 }]}>IT SUPPORT</Text>
            </View>
            <View style={[styles.infoCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.surfaceDim, borderRadius: borderRadius.DEFAULT, padding: spacing.md }]}>
              <MaterialIcons name="verified-user" size={24} color={colors.secondary} style={{ marginBottom: spacing.xs }} />
              <Text style={[typography.labelCaps, { color: colors.secondary, fontSize: 10 }]}>TRUSTED DEV</Text>
            </View>
          </View>

          {/* Industrial Status Indicator */}
          <View style={[styles.statusIndicator, { paddingTop: spacing.xl, paddingBottom: spacing.xl }]}>
            <View style={styles.statusRow}>
              <View style={[styles.statusDot, { backgroundColor: '#00983d' }]} />
              <Text style={[typography.labelSm, { color: colors.secondary, marginLeft: spacing.sm }]}>NODE STATUS: ACTIVE</Text>
            </View>
            <View style={[styles.statusLine, { backgroundColor: colors.outlineVariant }]} />
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    zIndex: 50,
  },
  headerLeft: {
    flex: 1,
    alignItems: 'flex-start',
  },
  headerRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 64,
    paddingHorizontal: 24,
    paddingBottom: 64,
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 64,
  },
  securityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 9999,
    padding: 8,
    marginBottom: 16,
  },
  bentoCard: {
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  imageContainer: {
    width: '100%',
    height: 96,
    overflow: 'hidden',
    position: 'relative',
  },
  formGroup: {
    gap: 32,
  },
  inputGroup: {
    gap: 8,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputUnderline: {
    borderBottomWidth: 2,
    borderRadius: 4,
  },
  passwordContainer: {
    position: 'relative',
    flexDirection: 'row',
  },
  visibilityToggle: {
    position: 'absolute',
    right: 16,
    top: '50%',
    transform: [{ translateY: -10 }],
    zIndex: 10,
  },
  primaryButton: {
    flexDirection: 'row',
    paddingVertical: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  forgotPasswordButton: {
    alignItems: "center",
    paddingVertical: 8,
  },
  secondaryInfoSection: {
    flexDirection: 'row',
    gap: 16,
    justifyContent: 'space-between',
    maxWidth: 400,
    alignSelf: 'center',
    width: '100%',
  },
  infoCard: {
    flex: 1,
    alignItems: 'center',
    borderWidth: 1,
  },
  statusIndicator: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusLine: {
    width: 128,
    height: 1,
  }
});

export default LoginScreen;
