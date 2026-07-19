import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

const EmailVerificationScreen = ({ navigation }) => {
  const { colors, typography, spacing, borderRadius } = useTheme();

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputs = useRef([]);

  const handleChangeText = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < 5) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.outlineVariant }]}>
        <TouchableOpacity style={styles.iconBtn}>
          <MaterialIcons name="arrow-back" size={24} color={colors.primary} />
        </TouchableOpacity>
        <Text style={[typography.headlineLgMobile, { color: colors.primary, fontWeight: 'bold', letterSpacing: -1 }]}>MANDATE</Text>
        <View style={{ width: 40 }} /> {/* Spacer */}
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <View style={[styles.mainContent, { paddingHorizontal: spacing.gutter, paddingVertical: spacing.xl }]}>
          
          {/* Branding Icon Section */}
          <View style={styles.iconContainer}>
            <View style={[styles.iconBox, { backgroundColor: colors.surfaceContainerLow, borderColor: colors.outlineVariant }]}>
              <MaterialIcons name="lock" size={36} color={colors.primary} />
              {/* Scanline overlay mocked */}
              <View style={styles.scanline} />
            </View>
          </View>

          {/* Verification Header */}
          <View style={styles.headerTextContainer}>
            <Text style={[typography.headlineLgMobile, { color: colors.primary, textTransform: 'uppercase', marginBottom: spacing.sm }]}>VERIFICATION REQUIRED</Text>
            <Text style={[typography.bodyMd, { color: colors.secondary, textAlign: 'center', maxWidth: 280 }]}>
              Enter the 6-digit industrial authorization code sent to your registered secure device.
            </Text>
          </View>

          {/* Verification Code Inputs */}
          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                style={[
                  typography.headlineLgMobile,
                  styles.otpInput,
                  { 
                    backgroundColor: colors.surfaceContainerLow, 
                    borderBottomColor: colors.outlineVariant,
                    color: colors.primary 
                  }
                ]}
                keyboardType="numeric"
                maxLength={1}
                value={digit}
                onChangeText={(text) => handleChangeText(text, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                ref={(ref) => inputs.current[index] = ref}
              />
            ))}
          </View>

          {/* Action Section */}
          <View style={styles.actionContainer}>
            <TouchableOpacity style={[styles.authorizeBtn, { backgroundColor: colors.primary }]}>
              <Text style={[typography.labelCaps, { color: colors.onPrimary, letterSpacing: 2, marginRight: 8 }]}>AUTHORIZE ACCESS</Text>
              <MaterialIcons name="lock-open" size={16} color={colors.onPrimary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.resendBtn}>
              <Text style={[typography.labelSm, { color: colors.secondary, textTransform: 'uppercase', letterSpacing: 1 }]}>RESEND SECURE CODE</Text>
            </TouchableOpacity>
          </View>

          {/* Security Badge */}
          <View style={[styles.securityBadge, { backgroundColor: colors.surfaceContainerHigh, borderColor: colors.outlineVariant }]}>
            <MaterialIcons name="verified-user" size={16} color={colors.onTertiaryContainer} />
            <Text style={[typography.labelSm, { color: colors.secondary, textTransform: 'uppercase', marginLeft: 8 }]}>Encrypted Session Terminal</Text>
          </View>

        </View>

        {/* Terminal Info */}
        <View style={[styles.terminalSection, { paddingHorizontal: spacing.gutter, marginBottom: spacing.xl }]}>
          <View style={[styles.terminalCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
            <View>
              <Text style={[typography.labelCaps, { color: colors.secondary }]}>TERMINAL ID</Text>
              <Text style={[typography.labelSm, { color: colors.primary, fontWeight: 'bold' }]}>MAN-992-ALPHA</Text>
            </View>
            <View style={[styles.waveformContainer, { backgroundColor: colors.surfaceContainer }]}>
              {/* Mock Waveform */}
              <View style={styles.waveBars}>
                {[2, 4, 6, 3, 5, 7, 4].map((h, i) => (
                  <View key={i} style={[styles.waveBar, { height: h * 4, backgroundColor: colors.primaryContainer }]} />
                ))}
              </View>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={[styles.footer, { backgroundColor: colors.surfaceContainer }]}>
          <View style={styles.footerLinks}>
            <Text style={[typography.labelSm, { color: colors.secondary }]}>Privacy</Text>
            <Text style={[typography.labelSm, { color: colors.secondary }]}>Terms</Text>
            <Text style={[typography.labelSm, { color: colors.secondary }]}>Support</Text>
          </View>
          <Text style={[typography.labelSm, { color: colors.secondary, opacity: 0.8, textTransform: 'uppercase' }]}>© 2024 MANDATE INDUSTRIAL</Text>
        </View>
      </ScrollView>
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
    height: 64,
    borderBottomWidth: 1,
  },
  iconBtn: {
    padding: 8,
  },
  container: {
    flexGrow: 1,
  },
  mainContent: {
    flex: 1,
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 32,
    alignItems: 'center',
  },
  iconBox: {
    width: 80,
    height: 80,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  scanline: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(25, 28, 30, 0.03)',
  },
  headerTextContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 32,
  },
  otpInput: {
    width: 48,
    height: 64,
    textAlign: 'center',
    borderBottomWidth: 2,
    borderRadius: 4,
  },
  actionContainer: {
    width: '100%',
    gap: 16,
  },
  authorizeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 32,
  },
  resendBtn: {
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  securityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    marginTop: 32,
  },
  terminalSection: {
    width: '100%',
  },
  terminalCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
  waveformContainer: {
    height: 40,
    width: 96,
    borderRadius: 4,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    paddingHorizontal: 4,
    paddingBottom: 4,
  },
  waveBars: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    height: '100%',
  },
  waveBar: {
    width: 4,
  },
  footer: {
    paddingVertical: 32,
    alignItems: 'center',
    gap: 16,
  },
  footerLinks: {
    flexDirection: 'row',
    gap: 16,
  }
});

export default EmailVerificationScreen;
