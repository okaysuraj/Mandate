import styles from "./LandingScreen.styles";
import useLoopAnimation from "../../hooks/useLoopAnimation";
import PublicDocumentModal from "../../components/common/PublicDocumentModal";
import { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Animated,
  Easing,
  useWindowDimensions,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import BrandLogo from "../../components/common/BrandLogo";

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
  }, [
    spinValue,
    fadeHero,
    slideHero,
    fadeCard1,
    slideCard1,
    fadeCard2,
    slideCard2,
    fadeCard3,
    slideCard3,
    fadeCard4,
    slideCard4,
  ]);

  useLoopAnimation(spinValue, 8000);
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
    <SafeAreaView
      edges={["top", "bottom", "left", "right"]}
      style={[styles.root, { backgroundColor: colors.surface }]}
    >
      {/* ── Top Header / Navbar (Matching Web Landing Navbar) ── */}
      <View
        style={[
          styles.navbar,
          {
            backgroundColor: colors.surface,
            borderBottomColor: colors.outlineVariant,
          },
        ]}
      >
        <View style={styles.navBrand}>
          <BrandLogo size={isCompact ? 28 : 32} decorative />
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
              {
                backgroundColor: isDark
                  ? "rgba(255,255,255,0.06)"
                  : "rgba(0,0,0,0.04)",
              },
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
              style={[
                styles.primaryNavBtn,
                { backgroundColor: colors.primary },
              ]}
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

            <Text
              style={[styles.heroSubtitle, { color: colors.onSurfaceVariant }]}
            >
              The simple, powerful task management and workspace platform.
              Organize your to-dos, manage team projects, and stay on top of
              your schedule.
            </Text>

            <TouchableOpacity
              style={[styles.heroCtaBtn, { backgroundColor: colors.primary }]}
              onPress={handlePrimaryCta}
              activeOpacity={0.9}
            >
              <Text
                style={[styles.heroCtaBtnText, { color: colors.onPrimary }]}
              >
                {user ? "GO TO DASHBOARD" : "GET STARTED"}
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* ── Bento Grid Features (Matching Web 4 Bento Cards) ── */}
        <View
          style={[styles.bentoSection, { backgroundColor: colors.surface }]}
        >
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
            <View
              style={[
                styles.cardMediaBox,
                { backgroundColor: colors.surfaceContainerHigh },
              ]}
            >
              <MaterialIcons
                name="sync"
                size={80}
                color={colors.onSurfaceVariant}
                style={styles.cardWatermarkIcon}
              />
            </View>
            <View style={styles.cardTextContent}>
              <Text style={[styles.cardTag, { color: colors.primary }]}>
                FEATURE-01
              </Text>
              <Text style={[styles.cardTitle, { color: colors.onSurface }]}>
                Real-Time Task Sync
              </Text>
              <Text
                style={[
                  styles.cardDescription,
                  { color: colors.onSurfaceVariant },
                ]}
              >
                Instant updates across all your devices and team members. Keep
                your task status, comments, and project boards in sync
                effortlessly.
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
              <Text
                style={[styles.cardTag, { color: colors.onSurfaceVariant }]}
              >
                FEATURE-02
              </Text>
              <Text style={[styles.cardTitle, { color: colors.onSurface }]}>
                Clean & Focused UI
              </Text>
            </View>

            {/* Rotating Graphic Ring Visual (8s linear spin) */}
            <View style={styles.interactiveRingContainer}>
              <View
                style={[
                  styles.outerCircle,
                  {
                    borderColor: isDark
                      ? "rgba(255,255,255,0.15)"
                      : "rgba(0,0,0,0.12)",
                  },
                ]}
              >
                <Animated.View
                  style={[
                    styles.spinningRing,
                    {
                      borderColor: isDark
                        ? "rgba(255,255,255,0.28)"
                        : "rgba(0,0,0,0.22)",
                      transform: [{ rotate: spin }],
                    },
                  ]}
                />
                <MaterialIcons
                  name="task-alt"
                  size={54}
                  color={colors.primary}
                />
              </View>
            </View>

            <Text
              style={[
                styles.cardDescription,
                { color: colors.onSurfaceVariant },
              ]}
            >
              Distraction-free interface designed to help you organize daily
              tasks, set priorities, and get things done.
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
              <Text
                style={[styles.cardTag, { color: colors.onSurfaceVariant }]}
              >
                FEATURE-03
              </Text>
              <Text style={[styles.cardTitle, { color: colors.onSurface }]}>
                Kanban & Calendar Views
              </Text>
            </View>

            <View
              style={[
                styles.cardMediaBox,
                styles.calendarMediaBox,
                {
                  backgroundColor: colors.surfaceContainerHigh,
                  borderColor: colors.outlineVariant,
                },
              ]}
            >
              <MaterialIcons
                name="calendar-view-month"
                size={64}
                color={colors.onSurfaceVariant}
                style={styles.cardWatermarkIcon}
              />
            </View>

            <Text
              style={[
                styles.cardDescription,
                { color: colors.onSurfaceVariant },
              ]}
            >
              Switch seamlessly between Today's to-do list, interactive Kanban
              boards, and monthly calendar views.
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
                <Text style={[styles.cardTag, { color: colors.primary }]}>
                  FEATURE-04
                </Text>
                <Text style={[styles.cardTitle, { color: colors.onSurface }]}>
                  Team Workspaces & Collaboration
                </Text>
                <Text
                  style={[
                    styles.cardDescription,
                    { color: colors.onSurfaceVariant },
                  ]}
                >
                  Organize projects with distinct team workspaces, shared task
                  lists, role permissions, and automated due-date reminders.
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
                  <Text
                    style={[styles.miniBadgeTitle, { color: colors.onSurface }]}
                  >
                    Real-Time
                  </Text>
                  <Text
                    style={[
                      styles.miniBadgeSubtitle,
                      { color: colors.onSurfaceVariant },
                    ]}
                  >
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
                  <Text
                    style={[styles.miniBadgeTitle, { color: colors.onSurface }]}
                  >
                    Multi-View
                  </Text>
                  <Text
                    style={[
                      styles.miniBadgeSubtitle,
                      { color: colors.onSurfaceVariant },
                    ]}
                  >
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
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
            >
              <BrandLogo size={32} decorative />
              <Text style={[styles.footerBrandText, { color: colors.primary }]}>
                MANDATE.
              </Text>
            </View>
            <Text
              style={[
                styles.footerCopyright,
                { color: colors.onSurfaceVariant },
              ]}
            >
              © {new Date().getFullYear()} MANDATE. ALL RIGHTS RESERVED.
            </Text>
          </View>

          <View style={styles.footerLinksGrid}>
            <TouchableOpacity
              accessibilityRole="link"
              style={styles.footerLinkBtn}
              onPress={() => setActiveDocKey("privacy")}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.footerLinkText,
                  { color: colors.onSurfaceVariant },
                ]}
              >
                Privacy Policy
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              accessibilityRole="link"
              style={styles.footerLinkBtn}
              onPress={() => setActiveDocKey("terms")}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.footerLinkText,
                  { color: colors.onSurfaceVariant },
                ]}
              >
                Terms of Service
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              accessibilityRole="link"
              style={styles.footerLinkBtn}
              onPress={() => setActiveDocKey("legal")}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.footerLinkText,
                  { color: colors.onSurfaceVariant },
                ]}
              >
                Legal
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              accessibilityRole="link"
              style={styles.footerLinkBtn}
              onPress={() => setActiveDocKey("security")}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.footerLinkText,
                  { color: colors.onSurfaceVariant },
                ]}
              >
                Security
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              accessibilityRole="link"
              style={styles.footerLinkBtn}
              onPress={() => navigation.navigate("Pricing")}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.footerLinkText,
                  { color: colors.primary, fontWeight: "600" },
                ]}
              >
                Pricing Plans
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <PublicDocumentModal
        slug={activeDocKey}
        onClose={() => setActiveDocKey(null)}
      />
    </SafeAreaView>
  );
};

export default LandingScreen;
