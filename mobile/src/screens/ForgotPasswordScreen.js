import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

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
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <MaterialIcons name="arrow-back" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <View style={styles.brandContainer}>
            <Text style={[typography.headlineLg, { color: colors.primary, textAlign: 'center', marginBottom: spacing.sm }]}>MANDATE</Text>
            <Text style={[typography.labelCaps, { color: colors.secondary, textAlign: 'center' }]}>CREDENTIAL RECOVERY</Text>
          </View>

          {isSent ? (
            <View style={[styles.successContainer, { backgroundColor: colors.surfaceContainerLow, borderColor: colors.outlineVariant, borderRadius: borderRadius.DEFAULT }]}>
              <MaterialIcons name="mark-email-read" size={48} color={colors.primary} style={{ marginBottom: spacing.md }} />
              <Text style={[typography.headlineLgMobile, { color: colors.primary, marginBottom: spacing.sm, textAlign: 'center' }]}>
                TRANSMISSION COMPLETE
              </Text>
              <Text style={[typography.bodyMd, { color: colors.onSurfaceVariant, textAlign: 'center', marginBottom: spacing.xl }]}>
                Instructions for resetting your access key have been transmitted to{"\n"}
                <Text style={{ fontWeight: '700', color: colors.primary }}>{email}</Text>.
              </Text>
              <TouchableOpacity 
                style={[styles.primaryButton, { backgroundColor: colors.primary, borderRadius: borderRadius.DEFAULT, width: '100%' }]}
                onPress={() => navigation.navigate("Login")}
              >
                <Text style={[typography.labelCaps, { color: colors.onPrimary }]}>RETURN TO AUTHENTICATION</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.formContainer}>
              <View style={styles.inputGroup}>
                <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant, marginBottom: spacing.xs }]}>EMAIL ADDRESS</Text>
                <TextInput
                  style={[
                    styles.input, 
                    typography.bodyMd, 
                    { 
                      backgroundColor: colors.surfaceContainerLowest, 
                      borderColor: colors.outlineVariant,
                      color: colors.onSurface
                    }
                  ]}
                  placeholder="operator@mandate.systems"
                  placeholderTextColor={colors.outline}
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              </View>

              <TouchableOpacity 
                style={[
                  styles.primaryButton, 
                  { backgroundColor: colors.primary, borderRadius: borderRadius.DEFAULT },
                  loading && { opacity: 0.7 }
                ]}
                onPress={handleReset}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color={colors.onPrimary} />
                ) : (
                  <Text style={[typography.labelCaps, { color: colors.onPrimary }]}>INITIATE RECOVERY</Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.footerLink}
                onPress={() => navigation.navigate("Login")}
              >
                <Text style={[typography.labelSm, { color: colors.onSurfaceVariant }]}>
                  Remember your access key? <Text style={{ color: colors.primary, fontWeight: '700' }}>AUTHENTICATE</Text>
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
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
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "center",
  },
  brandContainer: {
    marginBottom: 48,
  },
  successContainer: {
    padding: 24,
    borderWidth: 1,
    alignItems: 'center',
  },
  formContainer: {
    gap: 24,
  },
  inputGroup: {
    gap: 4,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  primaryButton: {
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  footerLink: {
    alignItems: "center",
    marginTop: 24,
  }
});

export default ForgotPasswordScreen;
