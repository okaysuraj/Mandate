import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  Easing,
  Modal,
  Pressable,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";

const LEGAL_DOCS = {
  privacy: {
    title: "Privacy Policy",
    content:
      "At Mandate, we prioritize your data privacy and operational security. Your task data, team structures, and workspace preferences are strictly protected under modern encryption standards. We do not sell your personal data to third parties.",
  },
  terms: {
    title: "Terms of Service",
    content:
      "By using Mandate, you agree to adhere to these terms. Mandate provides real-time workspace coordination, task tracking, and team collaboration tooling. You retain ownership over your content while Mandate provides uninterrupted uptime guarantees.",
  },
  legal: {
    title: "Legal Information",
    content:
      "Mandate is a productivity and task orchestration platform designed for focused teams and disciplined execution. All registered trademarks, logos, and service marks belong to Mandate Inc.",
  },
  security: {
    title: "Security Protocols",
    content:
      "Mandate enforces role-based access control, cryptographic session handling, and real-time socket verification. Routine penetration testing and automated security audits ensure maximum uptime and zero unauthorized data access.",
  },
};

const LandingScreen = ({ navigation }) => {
  const { user } = useAuth();
  const { colors, isDark, toggleTheme } = useTheme();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const isCompact = width < 375;

  // Slow spin animation for Feature 2 ring (matching web's animate-spin-slow 8s)
  const spinValue = useRef(new Animated.Value(0)).current;

  // Staggered reveal animations for hero & bento cards (matching web's intersection observer)
  const fadeHero = useRef(new Animated.Value(0)).current;
  const slideHero = useRef(new Animated.Value(20)).current;

  const fadeCard1 = useRef(new Animated.Value(0)).current;
  const slideCard1 = useRef(new Animated.Value(24)).current;

  const fadeCard2 = useRef(new Animated.Value(0)).current;
  const slideCard2 = useRef(new Animated.Value(24)).current;

  const fadeCard3 = useRef(new Animated.Value(0)).current;
  const slideCard3 = useRef(new Animated.Value(24)).current;

  const fadeCard4 = useRef(new Animated.Value(0)).current;
  const slideCard4 = useRef(new Animated.Value(24)).current;

  // Active legal modal state
  const [activeDocKey, setActiveDocKey] = useState(null);

  useEffect(() => {
    // 8s continuous spin loop
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 8000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    // Staggered entrance animation
    Animated.parallel([
      Animated.timing(fadeHero, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideHero, {
        toValue: 0,
        duration: 600,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start();

    const animateCard = (fadeAnim, slideAnim, delay) => {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 650,
          delay,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 650,
          delay,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
      ]).start();
    };

    animateCard(fadeCard1, slideCard1, 150);
    animateCard(fadeCard2, slideCard2, 300);
    animateCard(fadeCard3, slideCard3, 450);
    animateCard(fadeCard4, slideCard4, 600);
  }, [spinValue, fadeHero, slideHero, fadeCard1, slideCard1, fadeCard2, slideCard2, fadeCard3, slideCard3, fadeCard4, slideCard4]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const handlePrimaryCta = () => {
    if (user) {
      // If user is already authenticated
      if (navigation.canGoBack()) {
        navigation.goBack();
      } else {
        navigation.navigate("HomeDashboard");
      }
    } else {
      navigation.navigate("Register");
    }
  };

  return (
    <SafeAreaView edges={["top", "bottom", "left", "right"]} style={[styles.root, { backgroundColor: colors.surface }]}>
      {/* ── Top Header / Navbar (Matching Web Landing Navbar) ── */}
      <View style={[styles.navbar, { backgroundColor: colors.surface, borderBottomColor: colors.outlineVariant }]}>
        <View style={styles.navBrand}>
          <Text
            style={[
              styles.brandText,
              { color: colors.primary, fontSize: isCompact ? 17 : 19 },
            ]}
            numberOfLines={1}
            allowFontScaling={false}
          >
            MANDATE
          </Text>
        </View>

        <View style={styles.navActions}>
          {/* Dark / Light Mode Toggle */}
          <TouchableOpacity
            onPress={toggleTheme}
            style={[
              styles.iconBtn,
              { backgroundColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)" },
            ]}
            activeOpacity={0.7}
            accessibilityLabel="Toggle theme"
          >
            <MaterialIcons
              name={isDark ? "light-mode" : "dark-mode"}
              size={18}
              color={colors.primary}
            />
          </TouchableOpacity>

          {user ? (
            <TouchableOpacity
              onPress={handlePrimaryCta}
              style={[styles.primaryNavBtn, { backgroundColor: colors.primary }]}
              activeOpacity={0.85}
            >
              <Text
                style={[styles.primaryNavBtnText, { color: colors.onPrimary }]}
                numberOfLines={1}
                allowFontScaling={false}
              >
                DASHBOARD
              </Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.authButtonsRow}>
              <TouchableOpacity
                onPress={() => navigation.navigate("Login")}
                style={[styles.loginBtn, isCompact && { paddingHorizontal: 5 }]}
                activeOpacity={0.7}
                hitSlop={{ top: 8, bottom: 8, left: 4, right: 4 }}
              >
                <Text
                  style={[
                    styles.loginBtnText,
                    { color: colors.onSurfaceVariant },
                    isCompact && { fontSize: 10 },
                  ]}
                  numberOfLines={1}
                  allowFontScaling={false}
                >
                  LOG IN
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate("Register")}
                style={[
                  styles.primaryNavBtn,
                  { backgroundColor: colors.primary },
                  isCompact && { paddingHorizontal: 9, paddingVertical: 5 },
                ]}
                activeOpacity={0.85}
              >
                <Text
                  style={[
                    styles.primaryNavBtnText,
                    { color: colors.onPrimary },
                    isCompact && { fontSize: 10 },
                  ]}
                  numberOfLines={1}
                  allowFontScaling={false}
                >
                  GET STARTED
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: Math.max(insets.bottom, 24) },
        ]}
        showsVerticalScrollIndicator={false}
        bounces={true}
      >
        {/* ── Hero Section (Matching Web Hero) ── */}
        <Animated.View
          style={[
            styles.heroSection,
            {
              backgroundColor: colors.surfaceContainerLowest,
              opacity: fadeHero,
              transform: [{ translateY: slideHero }],
            },
          ]}
        >
          <View style={styles.heroInner}>
            <Text style={[styles.heroHeadline, { color: colors.onSurface }]}>
              {"FOCUS.\nEXECUTE.\nMANDATE."}
            </Text>

            <Text style={[styles.heroSubtitle, { color: colors.onSurfaceVariant }]}>
              The simple, powerful task management and workspace platform. Organize your to-dos, manage team projects, and stay on top of your schedule.
            </Text>

            <TouchableOpacity
              style={[styles.heroCtaBtn, { backgroundColor: colors.primary }]}
              onPress={handlePrimaryCta}
              activeOpacity={0.9}
            >
              <Text style={[styles.heroCtaBtnText, { color: colors.onPrimary }]}>
                {user ? "GO TO DASHBOARD" : "GET STARTED"}
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* ── Bento Grid Features (Matching Web 4 Bento Cards) ── */}
        <View style={[styles.bentoSection, { backgroundColor: colors.surface }]}>
          {/* Feature 1: Real-Time Task Sync */}
          <Animated.View
            style={[
              styles.bentoCard,
              {
                backgroundColor: colors.surfaceContainerLowest,
                borderColor: colors.outlineVariant,
                opacity: fadeCard1,
                transform: [{ translateY: slideCard1 }],
              },
            ]}
          >
            <View style={[styles.cardMediaBox, { backgroundColor: colors.surfaceContainerHigh }]}>
              <MaterialIcons
                name="sync"
                size={80}
                color={colors.onSurfaceVariant}
                style={styles.cardWatermarkIcon}
              />
            </View>
            <View style={styles.cardTextContent}>
              <Text style={[styles.cardTag, { color: colors.primary }]}>FEATURE-01</Text>
              <Text style={[styles.cardTitle, { color: colors.onSurface }]}>Real-Time Task Sync</Text>
              <Text style={[styles.cardDescription, { color: colors.onSurfaceVariant }]}>
                Instant updates across all your devices and team members. Keep your task status, comments, and project boards in sync effortlessly.
              </Text>
            </View>
          </Animated.View>

          {/* Feature 2: Clean & Focused UI */}
          <Animated.View
            style={[
              styles.bentoCard,
              {
                backgroundColor: colors.surfaceContainerLow,
                borderColor: colors.outlineVariant,
                opacity: fadeCard2,
                transform: [{ translateY: slideCard2 }],
              },
            ]}
          >
            <View style={styles.cardTextContentTop}>
              <Text style={[styles.cardTag, { color: colors.onSurfaceVariant }]}>FEATURE-02</Text>
              <Text style={[styles.cardTitle, { color: colors.onSurface }]}>Clean & Focused UI</Text>
            </View>

            {/* Rotating Graphic Ring Visual (8s linear spin) */}
            <View style={styles.interactiveRingContainer}>
              <View
                style={[
                  styles.outerCircle,
                  { borderColor: isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.12)" },
                ]}
              >
                <Animated.View
                  style={[
                    styles.spinningRing,
                    {
                      borderColor: isDark ? "rgba(255,255,255,0.28)" : "rgba(0,0,0,0.22)",
                      transform: [{ rotate: spin }],
                    },
                  ]}
                />
                <MaterialIcons name="task-alt" size={54} color={colors.primary} />
              </View>
            </View>

            <Text style={[styles.cardDescription, { color: colors.onSurfaceVariant }]}>
              Distraction-free interface designed to help you organize daily tasks, set priorities, and get things done.
            </Text>
          </Animated.View>

          {/* Feature 3: Kanban & Calendar Views */}
          <Animated.View
            style={[
              styles.bentoCard,
              {
                backgroundColor: colors.surfaceContainerLowest,
                borderColor: colors.outlineVariant,
                opacity: fadeCard3,
                transform: [{ translateY: slideCard3 }],
              },
            ]}
          >
            <View style={styles.cardTextContentTop}>
              <Text style={[styles.cardTag, { color: colors.onSurfaceVariant }]}>FEATURE-03</Text>
              <Text style={[styles.cardTitle, { color: colors.onSurface }]}>Kanban & Calendar Views</Text>
            </View>

            <View
              style={[
                styles.cardMediaBox,
                styles.calendarMediaBox,
                { backgroundColor: colors.surfaceContainerHigh, borderColor: colors.outlineVariant },
              ]}
            >
              <MaterialIcons
                name="calendar-view-month"
                size={64}
                color={colors.onSurfaceVariant}
                style={styles.cardWatermarkIcon}
              />
            </View>

            <Text style={[styles.cardDescription, { color: colors.onSurfaceVariant }]}>
              Switch seamlessly between Today's to-do list, interactive Kanban boards, and monthly calendar views.
            </Text>
          </Animated.View>

          {/* Feature 4: Team Workspaces & Collaboration */}
          <Animated.View
            style={[
              styles.bentoCard,
              styles.teamCard,
              {
                backgroundColor: colors.surfaceContainerLow,
                borderColor: colors.outlineVariant,
                opacity: fadeCard4,
                transform: [{ translateY: slideCard4 }],
              },
            ]}
          >
            {/* Background watermark icon */}
            <View style={styles.teamWatermarkContainer} pointerEvents="none">
              <MaterialIcons
                name="groups"
                size={170}
                color={colors.onSurface}
                style={{ opacity: 0.08 }}
              />
            </View>

            <View style={styles.teamContentWrapper}>
              <View style={styles.cardTextContent}>
                <Text style={[styles.cardTag, { color: colors.primary }]}>FEATURE-04</Text>
                <Text style={[styles.cardTitle, { color: colors.onSurface }]}>
                  Team Workspaces & Collaboration
                </Text>
                <Text style={[styles.cardDescription, { color: colors.onSurfaceVariant }]}>
                  Organize projects with distinct team workspaces, shared task lists, role permissions, and automated due-date reminders.
                </Text>
              </View>

              {/* Mini Bento Badges */}
              <View style={styles.miniBadgesRow}>
                <View
                  style={[
                    styles.miniBadge,
                    {
                      backgroundColor: colors.surfaceContainerHigh,
                      borderColor: colors.outlineVariant,
                    },
                  ]}
                >
                  <Text style={[styles.miniBadgeTitle, { color: colors.onSurface }]}>Real-Time</Text>
                  <Text style={[styles.miniBadgeSubtitle, { color: colors.onSurfaceVariant }]}>
                    SOCKETS
                  </Text>
                </View>

                <View
                  style={[
                    styles.miniBadge,
                    {
                      backgroundColor: colors.surfaceContainerHigh,
                      borderColor: colors.outlineVariant,
                    },
                  ]}
                >
                  <Text style={[styles.miniBadgeTitle, { color: colors.onSurface }]}>Multi-View</Text>
                  <Text style={[styles.miniBadgeSubtitle, { color: colors.onSurfaceVariant }]}>
                    KANBAN / CAL
                  </Text>
                </View>
              </View>
            </View>
          </Animated.View>
        </View>

        {/* ── Quote Section (Matching Web Quote Section) ── */}
        <View
          style={[
            styles.quoteSection,
            {
              backgroundColor: colors.surfaceContainerLowest,
              borderTopColor: colors.outlineVariant,
              borderBottomColor: colors.outlineVariant,
            },
          ]}
        >
          <Text style={[styles.quoteText, { color: colors.onSurface }]}>
            “ORGANIZATION IS THE FOUNDATION OF EFFICIENCY AND PEACE OF MIND.”
          </Text>
          <Text style={[styles.quoteAttribution, { color: colors.primary }]}>
            — MANDATE PRODUCTIVITY PHILOSOPHY
          </Text>
        </View>

        {/* ── Footer (Matching Web Footer) ── */}
        <View
          style={[
            styles.footerSection,
            {
              backgroundColor: colors.surfaceContainerLow,
              borderTopColor: colors.outlineVariant,
            },
          ]}
        >
          <View style={styles.footerBrandCol}>
            <Text style={[styles.footerBrandText, { color: colors.primary }]}>MANDATE.</Text>
            <Text style={[styles.footerCopyright, { color: colors.onSurfaceVariant }]}>
              © {new Date().getFullYear()} MANDATE. ALL RIGHTS RESERVED.
            </Text>
          </View>

          <View style={styles.footerLinksGrid}>
            <TouchableOpacity
              style={styles.footerLinkBtn}
              onPress={() => setActiveDocKey("privacy")}
              activeOpacity={0.7}
            >
              <Text style={[styles.footerLinkText, { color: colors.onSurfaceVariant }]}>
                Privacy Policy
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.footerLinkBtn}
              onPress={() => setActiveDocKey("terms")}
              activeOpacity={0.7}
            >
              <Text style={[styles.footerLinkText, { color: colors.onSurfaceVariant }]}>
                Terms of Service
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.footerLinkBtn}
              onPress={() => setActiveDocKey("legal")}
              activeOpacity={0.7}
            >
              <Text style={[styles.footerLinkText, { color: colors.onSurfaceVariant }]}>
                Legal
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.footerLinkBtn}
              onPress={() => setActiveDocKey("security")}
              activeOpacity={0.7}
            >
              <Text style={[styles.footerLinkText, { color: colors.onSurfaceVariant }]}>
                Security
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.footerLinkBtn}
              onPress={() => navigation.navigate("Pricing")}
              activeOpacity={0.7}
            >
              <Text style={[styles.footerLinkText, { color: colors.primary, fontWeight: "600" }]}>
                Pricing Plans
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* ── Legal / Policy Document Modal ── */}
      <Modal
        visible={!!activeDocKey}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setActiveDocKey(null)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setActiveDocKey(null)}>
          <Pressable
            style={[
              styles.modalCard,
              {
                backgroundColor: colors.surfaceContainerLowest,
                borderColor: colors.outlineVariant,
              },
            ]}
          >
            <View style={[styles.modalHeader, { borderBottomColor: colors.outlineVariant }]}>
              <Text style={[styles.modalTitle, { color: colors.primary }]}>
                {activeDocKey ? LEGAL_DOCS[activeDocKey]?.title : ""}
              </Text>
              <TouchableOpacity
                onPress={() => setActiveDocKey(null)}
                style={styles.modalCloseBtn}
              >
                <MaterialIcons name="close" size={22} color={colors.onSurfaceVariant} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody}>
              <Text style={[styles.modalContentText, { color: colors.onSurfaceVariant }]}>
                {activeDocKey ? LEGAL_DOCS[activeDocKey]?.content : ""}
              </Text>
            </ScrollView>

            <TouchableOpacity
              style={[styles.modalActionBtn, { backgroundColor: colors.primary }]}
              onPress={() => setActiveDocKey(null)}
              activeOpacity={0.85}
            >
              <Text style={[styles.modalActionBtnText, { color: colors.onPrimary }]}>CLOSE</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
};

export default LandingScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  // ── Navbar ──
  navbar: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    zIndex: 10,
  },
  navBrand: {
    flexDirection: "row",
    alignItems: "center",
    flexShrink: 0,
    marginRight: 6,
  },
  brandText: {
    fontFamily: "HankenGrotesk-Bold",
    fontSize: 19,
    letterSpacing: -0.6,
    textTransform: "uppercase",
  },
  navActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    flexShrink: 0,
  },
  iconBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  authButtonsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  loginBtn: {
    paddingHorizontal: 6,
    paddingVertical: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  loginBtnText: {
    fontFamily: "JetBrainsMono-SemiBold",
    fontSize: 10.5,
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  primaryNavBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 9999,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryNavBtnText: {
    fontFamily: "JetBrainsMono-SemiBold",
    fontSize: 10.5,
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },

  // ── Scroll Content ──
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },

  // ── Hero Section ──
  heroSection: {
    paddingVertical: 56,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  heroInner: {
    maxWidth: 420,
    width: "100%",
    alignItems: "center",
  },
  heroHeadline: {
    fontFamily: "HankenGrotesk-ExtraBold",
    fontSize: 44,
    lineHeight: 46,
    letterSpacing: -1.8,
    textTransform: "uppercase",
    textAlign: "center",
    marginBottom: 18,
  },
  heroSubtitle: {
    fontFamily: "HankenGrotesk-Regular",
    fontSize: 15,
    lineHeight: 23,
    textAlign: "center",
    opacity: 0.85,
    marginBottom: 28,
    maxWidth: 320,
  },
  heroCtaBtn: {
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 9999,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  heroCtaBtnText: {
    fontFamily: "JetBrainsMono-SemiBold",
    fontSize: 12,
    letterSpacing: 1.8,
    textTransform: "uppercase",
  },

  // ── Bento Grid Features ──
  bentoSection: {
    paddingHorizontal: 16,
    paddingVertical: 32,
  },
  bentoCard: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    overflow: "hidden",
  },
  cardMediaBox: {
    height: 160,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
    overflow: "hidden",
  },
  calendarMediaBox: {
    height: 140,
    borderWidth: 1,
  },
  cardWatermarkIcon: {
    opacity: 0.22,
  },
  cardTextContent: {
    width: "100%",
  },
  cardTextContentTop: {
    width: "100%",
    marginBottom: 16,
  },
  cardTag: {
    fontFamily: "JetBrainsMono-SemiBold",
    fontSize: 11,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    marginBottom: 6,
  },
  cardTitle: {
    fontFamily: "HankenGrotesk-Bold",
    fontSize: 22,
    lineHeight: 28,
    letterSpacing: -0.5,
    marginBottom: 10,
  },
  cardDescription: {
    fontFamily: "HankenGrotesk-Regular",
    fontSize: 14,
    lineHeight: 22,
  },

  // Feature 2: Interactive Ring
  interactiveRingContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 16,
    height: 180,
  },
  outerCircle: {
    width: 170,
    height: 170,
    borderRadius: 85,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  spinningRing: {
    position: "absolute",
    width: 136,
    height: 136,
    borderRadius: 68,
    borderWidth: 1.5,
    borderStyle: "dashed",
  },

  // Feature 4: Team Workspaces
  teamCard: {
    position: "relative",
  },
  teamWatermarkContainer: {
    position: "absolute",
    right: -15,
    bottom: -20,
  },
  teamContentWrapper: {
    position: "relative",
    zIndex: 2,
  },
  miniBadgesRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 20,
  },
  miniBadge: {
    flex: 1,
    aspectRatio: 1.4,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  miniBadgeTitle: {
    fontFamily: "JetBrainsMono-SemiBold",
    fontSize: 12,
    letterSpacing: 0.5,
    marginBottom: 4,
    textAlign: "center",
  },
  miniBadgeSubtitle: {
    fontFamily: "JetBrainsMono-Medium",
    fontSize: 10,
    letterSpacing: 0.5,
    textAlign: "center",
  },

  // ── Quote Section ──
  quoteSection: {
    paddingVertical: 48,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  quoteText: {
    fontFamily: "HankenGrotesk-Bold",
    fontStyle: "italic",
    fontSize: 18,
    lineHeight: 26,
    letterSpacing: -0.3,
    textAlign: "center",
    maxWidth: 340,
    marginBottom: 14,
  },
  quoteAttribution: {
    fontFamily: "JetBrainsMono-SemiBold",
    fontSize: 11,
    letterSpacing: 1.8,
    textAlign: "center",
    textTransform: "uppercase",
  },

  // ── Footer ──
  footerSection: {
    paddingVertical: 36,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    alignItems: "center",
  },
  footerBrandCol: {
    alignItems: "center",
    marginBottom: 20,
  },
  footerBrandText: {
    fontFamily: "JetBrainsMono-Bold",
    fontSize: 14,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    marginBottom: 4,
  },
  footerCopyright: {
    fontFamily: "JetBrainsMono-Medium",
    fontSize: 10,
    letterSpacing: 0.5,
    textTransform: "uppercase",
    textAlign: "center",
  },
  footerLinksGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    maxWidth: 340,
  },
  footerLinkBtn: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    marginHorizontal: 3,
    marginVertical: 3,
  },
  footerLinkText: {
    fontFamily: "JetBrainsMono-Medium",
    fontSize: 11,
    lineHeight: 16,
    textDecorationLine: "underline",
  },

  // ── Legal Document Modal ──
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalCard: {
    width: "100%",
    maxWidth: 380,
    borderRadius: 16,
    borderWidth: 1,
    padding: 20,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 14,
    borderBottomWidth: 1,
    marginBottom: 16,
  },
  modalTitle: {
    fontFamily: "HankenGrotesk-Bold",
    fontSize: 18,
    letterSpacing: -0.3,
  },
  modalCloseBtn: {
    padding: 4,
  },
  modalBody: {
    maxHeight: 220,
    marginBottom: 20,
  },
  modalContentText: {
    fontFamily: "HankenGrotesk-Regular",
    fontSize: 14,
    lineHeight: 22,
  },
  modalActionBtn: {
    paddingVertical: 12,
    borderRadius: 9999,
    alignItems: "center",
    justifyContent: "center",
  },
  modalActionBtnText: {
    fontFamily: "JetBrainsMono-SemiBold",
    fontSize: 11,
    letterSpacing: 1.2,
  },
});
