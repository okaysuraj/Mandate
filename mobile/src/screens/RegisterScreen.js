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
  Animated
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const RegisterScreen = ({ navigation }) => {
  const [employeeId, setEmployeeId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();
  const { colors, typography, spacing, borderRadius } = useTheme();

  // Animation for the decorative loader
  const [loadingAnim] = useState(new Animated.Value(0));

  React.useEffect(() => {
    Animated.loop(
      Animated.timing(loadingAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: false,
      })
    ).start();
  }, [loadingAnim]);

  const loaderTranslateX = loadingAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['-100%', '300%']
  });

  const handleRegister = async () => {
    // In a real app, you might want to require terms agreement before allowing click
    if (!name || !email || !password || !employeeId || !agreeTerms) return;
    setLoading(true);
    try {
      // Using email for actual auth logic for now, employeeId could be stored in metadata
      await register(name, email, password);
    } catch (error) {
      // error handled in context
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.surface }]}>
      {/* Top Header */}
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.outlineVariant }]}>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
          <MaterialIcons name="menu" size={24} color={colors.primary} />
        </TouchableOpacity>
        <Text style={[typography.headlineLgMobile, { color: colors.primary, textAlign: 'center' }]}>MANDATE</Text>
        <TouchableOpacity style={styles.iconButton}>
          <MaterialIcons name="account-circle" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} bounces={false}>
          
          {/* Header Section */}
          <View style={styles.headerSection}>
            <Text style={[typography.labelCaps, { color: colors.secondary }]}>SECURE ENROLLMENT</Text>
            <Text style={[typography.headlineLgMobile, { color: colors.primary, marginTop: spacing.xs }]}>Register Asset</Text>
            <Text style={[typography.bodyMd, { color: colors.secondary, marginTop: spacing.xs }]}>
              Connect your industrial credentials to the Mandate network.
            </Text>
          </View>

          {/* Registration Form */}
          <View style={styles.formContainer}>
            {/* Employee ID */}
            <View style={styles.inputGroup}>
              <View style={styles.labelRow}>
                <MaterialIcons name="badge" size={14} color={colors.onSurfaceVariant} />
                <Text style={[typography.labelSm, { color: colors.onSurfaceVariant, marginLeft: spacing.xs, textTransform: 'uppercase' }]}>
                  EMPLOYEE ID
                </Text>
              </View>
              <TextInput
                style={[
                  styles.inputLine,
                  typography.labelCaps,
                  { 
                    backgroundColor: colors.surfaceContainerLow, 
                    borderBottomColor: colors.outlineVariant,
                    color: colors.onSurface,
                  }
                ]}
                placeholder="ID-0000-X"
                placeholderTextColor={colors.outline}
                value={employeeId}
                onChangeText={setEmployeeId}
                autoCapitalize="characters"
              />
            </View>

            {/* Full Name */}
            <View style={styles.inputGroup}>
              <View style={styles.labelRow}>
                <MaterialIcons name="person" size={14} color={colors.onSurfaceVariant} />
                <Text style={[typography.labelSm, { color: colors.onSurfaceVariant, marginLeft: spacing.xs, textTransform: 'uppercase' }]}>
                  FULL NAME
                </Text>
              </View>
              <TextInput
                style={[
                  styles.inputLine,
                  typography.bodyMd,
                  { 
                    backgroundColor: colors.surfaceContainerLow, 
                    borderBottomColor: colors.outlineVariant,
                    color: colors.onSurface,
                  }
                ]}
                placeholder="E.g. Marcus Aurelius"
                placeholderTextColor={colors.outline}
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
              />
            </View>

            {/* Work Email */}
            <View style={styles.inputGroup}>
              <View style={styles.labelRow}>
                <MaterialIcons name="mail" size={14} color={colors.onSurfaceVariant} />
                <Text style={[typography.labelSm, { color: colors.onSurfaceVariant, marginLeft: spacing.xs, textTransform: 'uppercase' }]}>
                  WORK EMAIL
                </Text>
              </View>
              <TextInput
                style={[
                  styles.inputLine,
                  typography.bodyMd,
                  { 
                    backgroundColor: colors.surfaceContainerLow, 
                    borderBottomColor: colors.outlineVariant,
                    color: colors.onSurface,
                  }
                ]}
                placeholder="name@mandate-industrial.com"
                placeholderTextColor={colors.outline}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>

            {/* Secure Password */}
            <View style={styles.inputGroup}>
              <View style={styles.labelRow}>
                <MaterialIcons name="lock" size={14} color={colors.onSurfaceVariant} />
                <Text style={[typography.labelSm, { color: colors.onSurfaceVariant, marginLeft: spacing.xs, textTransform: 'uppercase' }]}>
                  SECURE PASSWORD
                </Text>
              </View>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={[
                    styles.inputLine,
                    typography.bodyMd,
                    { 
                      backgroundColor: colors.surfaceContainerLow, 
                      borderBottomColor: colors.outlineVariant,
                      color: colors.onSurface,
                      flex: 1
                    }
                  ]}
                  placeholder="••••••••••••"
                  placeholderTextColor={colors.outline}
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

            {/* Checkbox Terms */}
            <View style={styles.termsContainer}>
              <TouchableOpacity 
                style={[
                  styles.checkbox,
                  { borderColor: colors.outlineVariant },
                  agreeTerms && { backgroundColor: colors.primary, borderColor: colors.primary }
                ]}
                onPress={() => setAgreeTerms(!agreeTerms)}
              >
                {agreeTerms && <MaterialIcons name="check" size={12} color={colors.onPrimary} />}
              </TouchableOpacity>
              <Text style={[typography.bodyMd, { color: colors.secondary, flex: 1, marginLeft: spacing.sm, fontSize: 12, lineHeight: 18 }]}>
                I agree to the <Text style={{ color: colors.primary, fontWeight: '700' }}>Security Protocols</Text> and data handling policies of Mandate Industrial.
              </Text>
            </View>

            {/* CTA Button */}
            <TouchableOpacity 
              style={[
                styles.primaryButton, 
                { backgroundColor: (!name || !email || !password || !employeeId || !agreeTerms) ? colors.surfaceVariant : colors.primary, borderRadius: borderRadius.full },
              ]}
              onPress={handleRegister}
              disabled={loading || !name || !email || !password || !employeeId || !agreeTerms}
            >
              {loading ? (
                <ActivityIndicator color={colors.onPrimary} />
              ) : (
                <>
                  <Text style={[typography.labelCaps, { color: (!name || !email || !password || !employeeId || !agreeTerms) ? colors.onSurfaceVariant : colors.onPrimary, letterSpacing: 1.5 }]}>REGISTER ASSET</Text>
                  <MaterialIcons name="arrow-forward" size={18} color={(!name || !email || !password || !employeeId || !agreeTerms) ? colors.onSurfaceVariant : colors.onPrimary} style={{ marginLeft: spacing.sm }} />
                </>
              )}
            </TouchableOpacity>
          </View>

          {/* Secondary Navigation */}
          <View style={[styles.secondaryNav, { marginTop: spacing.xl }]}>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={[typography.bodyMd, { color: colors.secondary, textAlign: 'center' }]}>
                Already registered? <Text style={{ color: colors.primary, fontWeight: '700' }}>Log in to Hub</Text>
              </Text>
            </TouchableOpacity>

            <View style={[styles.pillGrid, { marginTop: spacing.md }]}>
              <TouchableOpacity style={[styles.pill, { borderColor: colors.outlineVariant }]}>
                <Text style={[typography.labelCaps, { color: colors.secondary, fontSize: 10 }]}>SUPPORT TICKET</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.pill, { borderColor: colors.outlineVariant }]}>
                <Text style={[typography.labelCaps, { color: colors.secondary, fontSize: 10 }]}>LEGAL MANUAL</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Decorative Asset Visual */}
          <View style={[styles.decorativeVisual, { borderColor: colors.outlineVariant, marginTop: spacing.xl, padding: spacing.md }]}>
            <View style={[styles.decIconBox, { backgroundColor: colors.surfaceContainerHigh }]}>
              <MaterialIcons name="precision-manufacturing" size={32} color={colors.primary} />
            </View>
            <View style={{ flex: 1, marginLeft: spacing.md }}>
              <View style={[styles.loaderTrack, { backgroundColor: colors.surfaceContainerHigh, marginBottom: spacing.sm }]}>
                <Animated.View style={[
                  styles.loaderFill, 
                  { 
                    backgroundColor: colors.primary,
                    left: loaderTranslateX
                  }
                ]} />
              </View>
              <Text style={[typography.labelSm, { color: colors.secondary, fontSize: 10, textTransform: 'uppercase' }]}>
                System Calibration Required
              </Text>
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    zIndex: 50,
    height: 64,
  },
  iconButton: {
    padding: 4,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 48,
    paddingHorizontal: 24,
    paddingBottom: 64,
    maxWidth: 500,
    alignSelf: 'center',
    width: '100%',
  },
  headerSection: {
    marginBottom: 32,
  },
  formContainer: {
    gap: 24,
  },
  inputGroup: {
    gap: 8,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputLine: {
    height: 48,
    borderBottomWidth: 1,
    paddingHorizontal: 16,
  },
  passwordContainer: {
    position: 'relative',
    flexDirection: 'row',
  },
  visibilityToggle: {
    position: 'absolute',
    right: 16,
    top: '50%',
    transform: [{ translateY: -12 }],
    zIndex: 10,
    height: 24,
    justifyContent: 'center',
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingTop: 8,
  },
  checkbox: {
    width: 16,
    height: 16,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  primaryButton: {
    flexDirection: 'row',
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },
  secondaryNav: {
    alignItems: 'center',
  },
  pillGrid: {
    flexDirection: 'row',
    gap: 16,
    width: '100%',
  },
  pill: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderRadius: 9999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  decorativeVisual: {
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    opacity: 0.5,
  },
  decIconBox: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderTrack: {
    height: 4,
    width: '100%',
    overflow: 'hidden',
    position: 'relative',
  },
  loaderFill: {
    position: 'absolute',
    height: '100%',
    width: '33%',
    top: 0,
  }
});

export default RegisterScreen;
