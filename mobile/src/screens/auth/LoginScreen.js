import React, { useRef, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { AuthLayout, AuthField, AuthButton, AuthError, authStyles } from '../../components/auth/AuthForm';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const passwordRef = useRef(null);
  const { login, authError } = useAuth();
  const { colors } = useTheme();
  const disabled = !email.trim() || !password;
  const handleLogin = async () => {
    if (disabled || loading) return;
    setLoading(true);
    setError('');
    try {
      await login(email.trim(), password);
    } catch (failure) {
      setError(failure.message || 'Could not sign in. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <AuthLayout navigation={navigation} title="Welcome back" description="Sign in to your Mandate account.">
      <View style={authStyles.form}>
        <AuthField
          label="Email" placeholder="you@example.com" value={email} onChangeText={setEmail}
          keyboardType="email-address" autoCapitalize="none" autoCorrect={false}
          autoComplete="email" textContentType="emailAddress" returnKeyType="next"
          onSubmitEditing={() => passwordRef.current?.focus()} submitBehavior="submit" editable={!loading}
        />
        <AuthField
          label="Password" placeholder="Enter your password" value={password} onChangeText={setPassword}
          password showPassword={showPassword} onTogglePassword={() => setShowPassword(value => !value)}
          inputRef={passwordRef} autoCapitalize="none" autoCorrect={false}
          autoComplete="current-password" textContentType="password" returnKeyType="go"
          onSubmitEditing={handleLogin} editable={!loading}
        />
        <TouchableOpacity accessibilityRole="link" style={authStyles.link} onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={[authStyles.linkText, { color: colors.primary }]}>Forgot password?</Text>
        </TouchableOpacity>
        <AuthError message={error || authError} />
        <AuthButton label="Sign in" busyLabel="Signing in…" loading={loading} disabled={disabled} onPress={handleLogin} />
      </View>
      <TouchableOpacity accessibilityRole="link" style={authStyles.switchLink} onPress={() => navigation.navigate('Register')}>
        <Text style={[authStyles.body, { color: colors.onSurfaceVariant, textAlign: 'center' }]}>
          New to Mandate? <Text style={[authStyles.linkText, { color: colors.primary }]}>Create an account</Text>
        </Text>
      </TouchableOpacity>
    </AuthLayout>
  );
}
