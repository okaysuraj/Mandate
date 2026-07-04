import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { colors, typography, spacing, borderRadius } = useTheme();

  const handleLogin = async () => {
    if (!email || !password) return;
    setLoading(true);
    try {
      await login(email, password);
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
            <Text style={[typography.labelCaps, { color: colors.secondary, textAlign: 'center' }]}>SYSTEM ACCESS</Text>
          </View>

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

            <View style={styles.inputGroup}>
              <Text style={[typography.labelCaps, { color: colors.onSurfaceVariant, marginBottom: spacing.xs }]}>ACCESS KEY</Text>
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
                placeholder="••••••••••••"
                placeholderTextColor={colors.outline}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            <TouchableOpacity 
              style={styles.forgotPassword}
              onPress={() => navigation.navigate("ForgotPassword")}
            >
              <Text style={[typography.labelSm, { color: colors.onSurfaceVariant, textDecorationLine: 'underline' }]}>
                Forgot access key?
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[
                styles.primaryButton, 
                { backgroundColor: colors.primary, borderRadius: borderRadius.DEFAULT },
                loading && { opacity: 0.7 }
              ]}
              onPress={handleLogin}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color={colors.onPrimary} />
              ) : (
                <Text style={[typography.labelCaps, { color: colors.onPrimary }]}>AUTHENTICATE</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.footerLink}
              onPress={() => navigation.navigate("Register")}
            >
              <Text style={[typography.labelSm, { color: colors.onSurfaceVariant }]}>
                No credentials? <Text style={{ color: colors.primary, fontWeight: '700' }}>REQUEST ACCESS</Text>
              </Text>
            </TouchableOpacity>
          </View>
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
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: -8,
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

export default LoginScreen;
