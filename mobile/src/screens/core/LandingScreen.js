import React, { useEffect, useRef } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ImageBackground, 
  ScrollView, 
  Animated 
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";

const LandingScreen = ({ navigation }) => {
  const { colors, typography, spacing, borderRadius } = useTheme();
  
  // Scanner line animation
  const scanAnim = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scanAnim, {
          toValue: 1,
          duration: 4000,
          useNativeDriver: true,
        })
      ])
    ).start();
  }, [scanAnim]);

  const translateY = scanAnim.interpolate({
    inputRange: [0, 0.1, 0.9, 1],
    outputRange: [0, 0, 530, 530], // 530 is approx hero section height
  });

  const opacity = scanAnim.interpolate({
    inputRange: [0, 0.1, 0.9, 1],
    outputRange: [0, 1, 1, 0],
  });

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.surface }]}>
      {/* Top Header */}
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.outlineVariant }]}>
        <View style={styles.headerLeft}>
          <MaterialIcons name="menu" size={24} color={colors.primary} />
          <Text style={[typography.headlineLgMobile, { color: colors.primary, marginLeft: spacing.sm }]}>MANDATE</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <MaterialIcons name="account-circle" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} bounces={false}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <ImageBackground 
            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB-xNhkuyC1acMJ8lZGa-CYyda3wY5_Vw8azFiye7nrLpUSC5A_KDdm2HjXYWUgaHUf65gKTnViwpD0r0FqFJWUpZNVEGwZf_2x2fIDnQ_3xI9a1iu_InRrAXtARpbQOSAXzbdHRnXMy-0dKMnZ0En4zcE9tI9jU7DeMZmFjpovqP0yswEPwhjJMcMGOKZ4UIvkV4pafjiIAR_Uhhdk7hxs2tKcHuX_nRX1Wes0aapiRHzyKGlatSxugw' }}
            style={StyleSheet.absoluteFillObject}
          >
            {/* Dark overlay fallback for gradient */}
            <View style={[StyleSheet.absoluteFillObject, { backgroundColor: 'rgba(25, 28, 30, 0.4)' }]} />
            
            {/* Animated Scanner Line */}
            <Animated.View style={[
              styles.scannerLine, 
              { 
                backgroundColor: colors.primary, 
                transform: [{ translateY }],
                opacity 
              }
            ]} />
          </ImageBackground>

          <View style={[styles.heroContent, { padding: spacing.gutter, marginBottom: spacing.lg }]}>
            <View style={[styles.systemActiveBadge, { backgroundColor: colors.primary, paddingHorizontal: spacing.sm, paddingVertical: spacing.xs, marginBottom: spacing.sm }]}>
              <Text style={[typography.labelCaps, { color: colors.onPrimary }]}>SYSTEM: ACTIVE</Text>
            </View>
            <Text style={[typography.displayLg, { color: colors.primary, fontSize: 40, lineHeight: 40, marginBottom: spacing.md }]}>
              COMMAND THE{"\n"}INDUSTRIAL FRONT
            </Text>
            <Text style={[typography.bodyMd, { color: colors.secondary, maxWidth: 280 }]}>
              Integrated operational intelligence for the modern factory floor. Precision-engineered for absolute control.
            </Text>
          </View>
        </View>

        {/* Primary CTA Area */}
        <View style={[styles.ctaSection, { paddingHorizontal: spacing.gutter, paddingBottom: spacing.xl, gap: spacing.md }]}>
          <TouchableOpacity 
            style={[styles.primaryBtn, { backgroundColor: colors.primary, paddingVertical: spacing.md, borderRadius: borderRadius.full }]}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={[typography.labelCaps, { color: colors.onPrimary }]}>INITIALIZE ACCESS</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.secondaryBtn, { borderColor: colors.outlineVariant, borderWidth: 1, paddingVertical: spacing.md, borderRadius: borderRadius.full }]}
            onPress={() => navigation.navigate("Register")}
          >
            <Text style={[typography.labelCaps, { color: colors.primary }]}>VIEW PROTOCOLS</Text>
          </TouchableOpacity>
        </View>

        {/* Industrial Bento Summary */}
        <View style={[styles.bentoSection, { backgroundColor: colors.surfaceContainerLow, paddingHorizontal: spacing.gutter, paddingVertical: spacing.xl }]}>
          <View style={{ marginBottom: spacing.lg }}>
            <Text style={[typography.labelCaps, { color: colors.secondary, marginBottom: spacing.xs }]}>CORE MODULES</Text>
            <View style={{ height: 1, width: 48, backgroundColor: colors.primary }} />
          </View>
          
          <View style={styles.bentoGrid}>
            {/* Module 1 */}
            <View style={[styles.bentoCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant, padding: spacing.md }]}>
              <MaterialIcons name="grid-view" size={32} color={colors.primary} />
              <View style={{ marginTop: spacing.md }}>
                <Text style={[typography.labelCaps, { color: colors.primary }]}>DASHBOARD</Text>
                <Text style={[typography.labelSm, { color: colors.secondary }]}>Real-time vitals</Text>
              </View>
            </View>
            {/* Module 2 */}
            <View style={[styles.bentoCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant, padding: spacing.md }]}>
              <MaterialIcons name="precision-manufacturing" size={32} color={colors.primary} />
              <View style={{ marginTop: spacing.md }}>
                <Text style={[typography.labelCaps, { color: colors.primary }]}>ASSETS</Text>
                <Text style={[typography.labelSm, { color: colors.secondary }]}>Unit tracking</Text>
              </View>
            </View>
            {/* Module 3 */}
            <View style={[styles.bentoCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant, padding: spacing.md }]}>
              <MaterialIcons name="error-outline" size={32} color={colors.error} />
              <View style={{ marginTop: spacing.md }}>
                <Text style={[typography.labelCaps, { color: colors.error }]}>ALERTS</Text>
                <Text style={[typography.labelSm, { color: colors.secondary }]}>Critical status</Text>
              </View>
            </View>
            {/* Module 4 */}
            <View style={[styles.bentoCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant, padding: spacing.md }]}>
              <MaterialIcons name="settings" size={32} color={colors.primary} />
              <View style={{ marginTop: spacing.md }}>
                <Text style={[typography.labelCaps, { color: colors.primary }]}>SYSTEM</Text>
                <Text style={[typography.labelSm, { color: colors.secondary }]}>Configuration</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Trust / Compliance */}
        <View style={[styles.trustSection, { paddingHorizontal: spacing.gutter, paddingVertical: spacing.xl, borderTopColor: colors.outlineVariant, borderTopWidth: 1 }]}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.md }}>
            <View style={[styles.trustIconContainer, { backgroundColor: colors.surfaceDim, width: 48, height: 48, borderRadius: borderRadius.full }]}>
              <MaterialIcons name="security" size={24} color={colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[typography.labelCaps, { color: colors.primary }]}>ENCRYPTED NODE</Text>
              <Text style={[typography.labelSm, { color: colors.secondary }]}>End-to-end industrial security standards. ISO-27001 Compliant.</Text>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={[styles.footer, { backgroundColor: colors.surfaceContainer, paddingHorizontal: spacing.gutter, paddingVertical: spacing.lg }]}>
          <Text style={[typography.labelSm, { color: colors.secondary, marginBottom: spacing.md }]}>© 2024 MANDATE INDUSTRIAL</Text>
          <View style={styles.footerLinks}>
            <Text style={[typography.labelSm, { color: colors.secondary, opacity: 0.8 }]}>Privacy</Text>
            <Text style={[typography.labelSm, { color: colors.secondary, opacity: 0.8 }]}>Terms</Text>
            <Text style={[typography.labelSm, { color: colors.secondary, opacity: 0.8 }]}>Support</Text>
          </View>
        </View>
      </ScrollView>
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  heroSection: {
    width: '100%',
    height: 530,
    justifyContent: 'flex-end',
    position: 'relative',
  },
  scannerLine: {
    height: 2,
    width: '100%',
    position: 'absolute',
    top: 0,
    zIndex: 10,
  },
  heroContent: {
    position: 'relative',
    zIndex: 10,
  },
  systemActiveBadge: {
    alignSelf: 'flex-start',
  },
  ctaSection: {
    flexDirection: 'col',
  },
  primaryBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  secondaryBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  bentoSection: {
    width: '100%',
  },
  bentoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  bentoCard: {
    width: '48%', // Approx 2 columns minus gap
    aspectRatio: 1,
    justifyContent: 'space-between',
    borderWidth: 1,
  },
  trustSection: {
    width: '100%',
  },
  trustIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    alignItems: 'center',
  },
  footerLinks: {
    flexDirection: 'row',
    gap: 16,
  }
});

export default LandingScreen;
