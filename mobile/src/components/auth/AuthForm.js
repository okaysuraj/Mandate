import React from 'react';
import {
  ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView,
  StyleSheet, Text, TextInput, TouchableOpacity, View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useTheme } from '../../context/ThemeContext';

export function AuthLayout({ navigation, title, description, children }) {
  const { colors } = useTheme();
  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: colors.surface }]}>
      <View style={styles.header}>
        <TouchableOpacity
          accessibilityRole="link"
          accessibilityLabel="Mandate home"
          onPress={() => navigation.navigate('Landing')}
          style={styles.brandLink}
        >
          <Text style={[styles.brand, { color: colors.primary }]}>Mandate</Text>
        </TouchableOpacity>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.screen}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.intro}>
            <Text accessibilityRole="header" style={[styles.title, { color: colors.onSurface }]}>{title}</Text>
            <Text style={[styles.body, { color: colors.onSurfaceVariant }]}>{description}</Text>
          </View>
          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export function AuthField({ label, password = false, showPassword, onTogglePassword, inputRef, ...props }) {
  const { colors } = useTheme();
  return (
    <View style={styles.field}>
      <Text style={[styles.label, { color: colors.onSurface }]}>{label}</Text>
      <View style={styles.inputRow}>
        <TextInput
          ref={inputRef}
          accessibilityLabel={label}
          placeholderTextColor={colors.outline}
          style={[
            styles.input,
            { color: colors.onSurface, backgroundColor: colors.surfaceContainerLow, borderColor: colors.outlineVariant },
            password && styles.passwordInput,
          ]}
          {...props}
          secureTextEntry={password && !showPassword}
        />
        {password && (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel={showPassword ? 'Hide password' : 'Show password'}
            onPress={onTogglePassword}
            style={styles.passwordToggle}
          >
            <MaterialIcons name={showPassword ? 'visibility-off' : 'visibility'} size={22} color={colors.onSurfaceVariant} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

export function AuthButton({ label, busyLabel, loading, disabled, onPress }) {
  const { colors } = useTheme();
  const unavailable = disabled || loading;
  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityState={{ disabled: unavailable, busy: loading }}
      disabled={unavailable}
      onPress={onPress}
      style={[styles.button, { backgroundColor: colors.primary, opacity: unavailable ? 0.5 : 1 }]}
    >
      {loading && <ActivityIndicator color={colors.onPrimary} />}
      <Text style={[styles.buttonLabel, { color: colors.onPrimary }]}>{loading ? busyLabel : label}</Text>
    </TouchableOpacity>
  );
}

export function AuthError({ message }) {
  const { colors } = useTheme();
  if (!message) return null;
  return <Text accessibilityRole="alert" accessibilityLiveRegion="polite" style={[styles.body, { color: colors.error }]}>{message}</Text>;
}

export const authStyles = StyleSheet.create({
  form: { gap: 20 },
  link: { minHeight: 44, justifyContent: 'center' },
  switchLink: { minHeight: 48, justifyContent: 'center', alignItems: 'center', marginTop: 24 },
  linkText: { fontFamily: 'HankenGrotesk-SemiBold', fontSize: 15, lineHeight: 22 },
  body: { fontFamily: 'HankenGrotesk-Regular', fontSize: 15, lineHeight: 23 },
});

const styles = StyleSheet.create({
  screen: { flex: 1 },
  header: { paddingHorizontal: 24, paddingVertical: 8 },
  brandLink: { alignSelf: 'flex-start', minHeight: 44, justifyContent: 'center' },
  brand: { fontFamily: 'HankenGrotesk-Bold', fontSize: 22, letterSpacing: -0.5 },
  content: { flexGrow: 1, width: '100%', maxWidth: 440, alignSelf: 'center', paddingHorizontal: 24, paddingTop: 32, paddingBottom: 32 },
  intro: { gap: 8, marginBottom: 32 },
  title: { fontFamily: 'HankenGrotesk-Bold', fontSize: 30, lineHeight: 36, letterSpacing: -0.6 },
  body: { fontFamily: 'HankenGrotesk-Regular', fontSize: 15, lineHeight: 23 },
  field: { gap: 8 },
  label: { fontFamily: 'HankenGrotesk-SemiBold', fontSize: 15, lineHeight: 20 },
  inputRow: { position: 'relative' },
  input: { fontFamily: 'HankenGrotesk-Regular', fontSize: 16, minHeight: 52, borderWidth: 1, borderRadius: 10, paddingHorizontal: 14, paddingVertical: 14 },
  passwordInput: { paddingRight: 56 },
  passwordToggle: { position: 'absolute', right: 4, top: 0, bottom: 0, width: 48, alignItems: 'center', justifyContent: 'center' },
  button: { minHeight: 52, paddingVertical: 14, paddingHorizontal: 16, borderRadius: 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10 },
  buttonLabel: { fontFamily: 'HankenGrotesk-SemiBold', fontSize: 16, lineHeight: 22 },
});
