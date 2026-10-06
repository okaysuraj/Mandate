import React, { useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { AuthLayout, AuthField, AuthButton, AuthError, authStyles } from '../../components/auth/AuthForm';
import PublicDocumentModal from '../../components/common/PublicDocumentModal';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [document, setDocument] = useState(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const { register } = useAuth();
  const { colors } = useTheme();
  const disabled = !name.trim() || !email.trim() || !password || !agreeTerms;
  const handleRegister = async () => {
    if (disabled || loading) return;
    setLoading(true);
    setError('');
    try {
      await register(name.trim(), email.trim(), password);
      setSubmitted(true);
    } catch (failure) {
      if (failure.message === 'VERIFICATION_EMAIL_SENT') setSubmitted(true);
      else setError(failure.message || 'Could not create your account. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <AuthLayout
      navigation={navigation}
      title={submitted ? 'Check your email' : 'Create your account'}
      description={submitted ? `We sent a verification link to ${email.trim()}. Open it, then sign in.` : 'Keep your tasks, projects, and team in one place.'}
    >
      {submitted ? (
        <AuthButton label="Back to sign in" onPress={() => navigation.navigate('Login')} />
      ) : (
        <>
          <View style={authStyles.form}>
            <AuthField
              label="Full name" placeholder="Your name" value={name} onChangeText={setName}
              autoCapitalize="words" autoComplete="name" textContentType="name" returnKeyType="next"
              onSubmitEditing={() => emailRef.current?.focus()} submitBehavior="submit" editable={!loading}
            />
            <AuthField
              label="Email" placeholder="you@example.com" value={email} onChangeText={setEmail}
              inputRef={emailRef} keyboardType="email-address" autoCapitalize="none" autoCorrect={false}
              autoComplete="email" textContentType="emailAddress" returnKeyType="next"
              onSubmitEditing={() => passwordRef.current?.focus()} submitBehavior="submit" editable={!loading}
            />
            <AuthField
              label="Password" placeholder="Create a password" value={password} onChangeText={setPassword}
              password showPassword={showPassword} onTogglePassword={() => setShowPassword(value => !value)}
              inputRef={passwordRef} autoCapitalize="none" autoCorrect={false}
              autoComplete="new-password" textContentType="newPassword" returnKeyType="done" editable={!loading}
            />
            <View style={styles.agreement}>
              <TouchableOpacity
                accessibilityRole="checkbox" accessibilityLabel="I agree to the Terms of Service and Privacy Policy"
                accessibilityState={{ checked: agreeTerms, disabled: loading }} disabled={loading}
                style={styles.checkboxTarget} onPress={() => setAgreeTerms(value => !value)}
              >
                <View style={[styles.checkbox, { borderColor: colors.outline, backgroundColor: agreeTerms ? colors.primary : colors.surface }]}>
                  {agreeTerms && <MaterialIcons name="check" size={16} color={colors.onPrimary} />}
                </View>
              </TouchableOpacity>
              <Text style={[authStyles.body, styles.agreementText, { color: colors.onSurfaceVariant }]}>
                I agree to the{' '}
                <Text accessibilityRole="link" style={{ color: colors.primary, textDecorationLine: 'underline' }} onPress={() => setDocument('terms')}>Terms of Service</Text>
                {' '}and{' '}
                <Text accessibilityRole="link" style={{ color: colors.primary, textDecorationLine: 'underline' }} onPress={() => setDocument('privacy')}>Privacy Policy</Text>.
              </Text>
            </View>
            <AuthError message={error} />
            <AuthButton label="Create account" busyLabel="Creating account…" loading={loading} disabled={disabled} onPress={handleRegister} />
          </View>
          <TouchableOpacity accessibilityRole="link" style={authStyles.switchLink} onPress={() => navigation.navigate('Login')}>
            <Text style={[authStyles.body, { color: colors.onSurfaceVariant, textAlign: 'center' }]}>
              Already have an account? <Text style={[authStyles.linkText, { color: colors.primary }]}>Sign in</Text>
            </Text>
          </TouchableOpacity>
        </>
      )}
      <PublicDocumentModal slug={document} onClose={() => setDocument(null)} />
    </AuthLayout>
  );
}
const styles = StyleSheet.create({
  agreement: { flexDirection: 'row', alignItems: 'flex-start', marginLeft: -10 },
  checkboxTarget: { width: 44, minHeight: 44, alignItems: 'center', justifyContent: 'center' },
  checkbox: { width: 20, height: 20, borderWidth: 1, borderRadius: 4, alignItems: 'center', justifyContent: 'center' },
  agreementText: { flex: 1, paddingTop: 10 },
});
