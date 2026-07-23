import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, ImageBackground, Animated } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';

const WelcomeScreen = () => {
  const { colors, typography, spacing, borderRadius } = useTheme();
  const scanAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(scanAnim, {
        toValue: 1,
        duration: 4000,
        useNativeDriver: true,
      })
    ).start();
  }, [scanAnim]);

  const scanTranslateY = scanAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 530]
  });

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      {/* Top App Bar */}
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.outlineVariant }]}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.iconBtn}>
            <MaterialIcons name="menu" size={24} color={colors.primary} />
          </TouchableOpacity>
          <Text style={[typography.headlineLgMobile, { color: colors.primary, fontWeight: 'bold', letterSpacing: -0.5 }]}>MANDATE</Text>
        </View>
        <TouchableOpacity style={styles.iconBtn}>
          <MaterialIcons name="account-circle" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <ImageBackground 
            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB-xNhkuyC1acMJ8lZGa-CYyda3wY5_Vw8azFiye7nrLpUSC5A_KDdm2HjXYWUgaHUf65gKTnViwpD0r0FqFJWUpZNVEGwZf_2x2fIDnQ_3xI9a1iu_InRrAXtARpbQOSAXzbdHRnXMy-0dKMnZ0En4zcE9tI9jU7DeMZmFjpovqP0yswEPwhjJMcMGOKZ4UIvkV4pafjiIAR_Uhhdk7hxs2tKcHuX_nRX1Wes0aapiRHzyKGlatSxugw' }} 
            style={styles.heroBgImage}
          >
            <View style={styles.gradientOverlay} />
            <Animated.View style={[styles.scannerLine, { transform: [{ translateY: scanTranslateY }] }]} />
            
            <View style={styles.heroContent}>
              <View style={[styles.activeBadge, { backgroundColor: colors.primary }]}>
                <Text style={[typography.labelCaps, { color: colors.onPrimary }]}>SYSTEM: ACTIVE</Text>
              </View>
              <Text style={[typography.headlineLgMobile, { color: colors.primary, fontSize: 40, lineHeight: 40, fontWeight: '900', letterSpacing: -1, marginBottom: 16 }]}>
                COMMAND THE{"\n"}INDUSTRIAL FRONT
              </Text>
              <Text style={[typography.bodyMd, { color: colors.secondary, maxWidth: 280 }]}>
                Integrated operational intelligence for the modern factory floor. Precision-engineered for absolute control.
              </Text>
            </View>
          </ImageBackground>
        </View>

        {/* Primary CTA Area */}
        <View style={styles.ctaSection}>
          <TouchableOpacity style={[styles.primaryBtn, { backgroundColor: colors.primary }]}>
            <Text style={[typography.labelCaps, { color: colors.onPrimary, letterSpacing: 2 }]}>INITIALIZE ACCESS</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.secondaryBtn, { borderColor: colors.outlineVariant }]}>
            <Text style={[typography.labelCaps, { color: colors.primary, letterSpacing: 2 }]}>VIEW PROTOCOLS</Text>
          </TouchableOpacity>
        </View>

        {/* Industrial Bento Summary */}
        <View style={[styles.bentoSection, { backgroundColor: colors.surfaceContainerLow }]}>
          <View style={styles.bentoHeader}>
            <Text style={[typography.labelCaps, { color: colors.secondary, marginBottom: 4 }]}>CORE MODULES</Text>
            <View style={[styles.dividerLine, { backgroundColor: colors.primary }]} />
          </View>
          
          <View style={styles.bentoGrid}>
            {/* Module 1 */}
            <View style={[styles.bentoCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
              <MaterialIcons name="grid-view" size={32} color={colors.primary} />
              <View>
                <Text style={[typography.labelCaps, { color: colors.primary }]}>DASHBOARD</Text>
                <Text style={[typography.labelSm, { color: colors.secondary }]}>Real-time vitals</Text>
              </View>
            </View>

            {/* Module 2 */}
            <View style={[styles.bentoCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
              <MaterialIcons name="precision-manufacturing" size={32} color={colors.primary} />
              <View>
                <Text style={[typography.labelCaps, { color: colors.primary }]}>ASSETS</Text>
                <Text style={[typography.labelSm, { color: colors.secondary }]}>Unit tracking</Text>
              </View>
            </View>

            {/* Module 3 */}
            <View style={[styles.bentoCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
              <MaterialIcons name="error" size={32} color={colors.error} />
              <View>
                <Text style={[typography.labelCaps, { color: colors.error }]}>ALERTS</Text>
                <Text style={[typography.labelSm, { color: colors.secondary }]}>Critical status</Text>
              </View>
            </View>

            {/* Module 4 */}
            <View style={[styles.bentoCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
              <MaterialIcons name="settings" size={32} color={colors.primary} />
              <View>
                <Text style={[typography.labelCaps, { color: colors.primary }]}>SYSTEM</Text>
                <Text style={[typography.labelSm, { color: colors.secondary }]}>Configuration</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Trust / Compliance */}
        <View style={[styles.trustSection, { borderTopColor: colors.outlineVariant }]}>
          <View style={[styles.trustIconWrapper, { backgroundColor: colors.surfaceDim }]}>
            <MaterialIcons name="security" size={24} color={colors.onSurface} />
          </View>
          <View style={styles.trustText}>
            <Text style={[typography.labelCaps, { color: colors.primary }]}>ENCRYPTED NODE</Text>
            <Text style={[typography.labelSm, { color: colors.secondary }]}>End-to-end industrial security standards. ISO-27001 Compliant.</Text>
          </View>
        </View>

        {/* Footer */}
        <View style={[styles.footer, { backgroundColor: colors.surfaceContainer }]}>
          <Text style={[typography.labelSm, { color: colors.secondary, marginBottom: 16 }]}>© 2024 MANDATE INDUSTRIAL</Text>
          <View style={styles.footerLinks}>
            <Text style={[typography.labelSm, { color: colors.secondary }]}>Privacy</Text>
            <Text style={[typography.labelSm, { color: colors.secondary }]}>Terms</Text>
            <Text style={[typography.labelSm, { color: colors.secondary }]}>Support</Text>
          </View>
        </View>

      </ScrollView>

      {/* Bottom Nav */}
      <View style={[styles.bottomNav, { backgroundColor: colors.surface, borderTopColor: colors.outlineVariant }]}>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="grid-view" size={24} color={colors.secondary} />
          <Text style={[typography.labelSm, { color: colors.secondary, marginTop: 4, fontSize: 10, textTransform: 'uppercase' }]}>DASHBOARD</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="precision-manufacturing" size={24} color={colors.secondary} />
          <Text style={[typography.labelSm, { color: colors.secondary, marginTop: 4, fontSize: 10, textTransform: 'uppercase' }]}>ASSETS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="error" size={24} color={colors.secondary} />
          <Text style={[typography.labelSm, { color: colors.secondary, marginTop: 4, fontSize: 10, textTransform: 'uppercase' }]}>ALERTS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="settings" size={24} color={colors.secondary} />
          <Text style={[typography.labelSm, { color: colors.secondary, marginTop: 4, fontSize: 10, textTransform: 'uppercase' }]}>SYSTEM</Text>
        </TouchableOpacity>
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
    height: 64,
    borderBottomWidth: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconBtn: {
    padding: 8,
  },
  container: {
    paddingTop: 64, 
    paddingBottom: 80,
  },
  heroSection: {
    height: 530,
    width: '100%',
    overflow: 'hidden',
  },
  heroBgImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(249, 249, 251, 0.4)', // Approx background gradient fade
  },
  scannerLine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: '#000000',
    opacity: 0.3,
    zIndex: 10,
  },
  heroContent: {
    paddingHorizontal: 24,
    paddingBottom: 32,
    zIndex: 10,
  },
  activeBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginBottom: 8,
  },
  ctaSection: {
    paddingHorizontal: 24,
    paddingBottom: 64,
    gap: 16,
  },
  primaryBtn: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  secondaryBtn: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: 24,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bentoSection: {
    paddingHorizontal: 24,
    paddingVertical: 64,
  },
  bentoHeader: {
    marginBottom: 32,
  },
  dividerLine: {
    height: 1,
    width: 48,
  },
  bentoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  bentoCard: {
    width: '48%',
    aspectRatio: 1,
    borderWidth: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  trustSection: {
    paddingHorizontal: 24,
    paddingVertical: 64,
    borderTopWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  trustIconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trustText: {
    flex: 1,
  },
  footer: {
    paddingVertical: 32,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  footerLinks: {
    flexDirection: 'row',
    gap: 16,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'stretch',
    height: 80,
    borderTopWidth: 1,
    zIndex: 50,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 8,
  }
});

export default WelcomeScreen;
