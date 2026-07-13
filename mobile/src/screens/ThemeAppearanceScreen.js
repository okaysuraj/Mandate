import React, { useState } from "react";
import { 
  View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image, Slider
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";

const ModeCard = ({ title, subtitle, icon, isSelected, onPress, isRecommended }) => {
  const { colors, typography } = useTheme();
  
  return (
    <TouchableOpacity 
      style={[
        styles.modeCard, 
        isSelected 
          ? { borderColor: colors.primary, backgroundColor: colors.surfaceContainerLowest, borderWidth: 2 }
          : { borderColor: colors.outlineVariant, backgroundColor: colors.surfaceContainerLowest, borderWidth: 1 }
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.modeIconContainer, isSelected ? { backgroundColor: colors.primary } : { backgroundColor: colors.surfaceContainerHigh }]}>
        <MaterialIcons name={icon} size={20} color={isSelected ? colors.onPrimary : colors.secondary} />
      </View>
      <View style={styles.modeTextContainer}>
        <Text style={[typography.labelCaps, { color: isSelected ? colors.primary : colors.secondary }]}>{title}</Text>
        <Text style={[typography.labelSm, { color: colors.secondary, opacity: isSelected ? 1 : 0.6, marginTop: 4 }]}>{subtitle}</Text>
      </View>
    </TouchableOpacity>
  );
};

const DensityCard = ({ title, icon, isSelected, onPress }) => {
  const { colors, typography } = useTheme();
  
  return (
    <TouchableOpacity 
      style={[
        styles.densityCard, 
        isSelected 
          ? { borderColor: colors.primary, backgroundColor: colors.surfaceContainerLowest, borderWidth: 2 }
          : { borderColor: colors.outlineVariant, backgroundColor: colors.surfaceContainerLowest, borderWidth: 1 }
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <MaterialIcons name={icon} size={24} color={isSelected ? colors.primary : colors.secondary} style={{ marginBottom: 4 }} />
      <Text style={[typography.labelSm, { color: isSelected ? colors.primary : colors.secondary, fontWeight: isSelected ? '700' : '500' }]}>{title}</Text>
    </TouchableOpacity>
  );
};

const ThemeAppearanceScreen = ({ navigation }) => {
  const { colors, typography } = useTheme();

  const [mode, setMode] = useState('HIGH CONTRAST');
  const [density, setDensity] = useState('BALANCED');
  const [fontScale, setFontScale] = useState(100);
  const [contrastModulation, setContrastModulation] = useState(50);

  const getContrastLabel = (val) => {
    if (val > 80) return 'MAX';
    if (val < 20) return 'MIN';
    return 'DYNAMIC';
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* TopAppBar */}
      <View style={[styles.header, { borderBottomColor: colors.outlineVariant, backgroundColor: colors.surface }]}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.iconButton}>
            <MaterialIcons name="menu" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>
        <Text style={[typography.headlineLgMobile, { color: colors.primary, fontWeight: '900', letterSpacing: -1 }]}>
          MANDATE
        </Text>
        <TouchableOpacity style={styles.iconButton}>
          <MaterialIcons name="account-circle" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Header Section */}
        <View style={styles.pageHeader}>
          <Text style={[typography.labelCaps, { color: colors.secondary }]}>SYSTEM CONFIGURATION</Text>
          <Text style={[typography.headlineLgMobile, { color: colors.primary, marginTop: 4 }]}>Appearance Protocols</Text>
          <Text style={[typography.bodyMd, { color: colors.secondary, opacity: 0.8, marginTop: 4 }]}>Calibrate the visual parameters for high-density operational workflows.</Text>
        </View>

        {/* Operational Mode Selection */}
        <View style={styles.section}>
          <View style={styles.sectionTitleRow}>
            <Text style={[typography.labelCaps, { color: colors.primary }]}>OPERATIONAL MODE</Text>
            <View style={[styles.badge, { backgroundColor: colors.tertiaryFixed }]}>
              <Text style={[typography.labelSm, { color: colors.onTertiaryContainer, fontSize: 10 }]}>RECOMMENDED</Text>
            </View>
          </View>
          
          <View style={styles.modesContainer}>
            <ModeCard 
              title="HIGH CONTRAST" 
              subtitle="Maximum legibility for industrial environments with extreme lighting."
              icon="contrast"
              isSelected={mode === 'HIGH CONTRAST'}
              onPress={() => setMode('HIGH CONTRAST')}
            />
            <ModeCard 
              title="MINIMALIST RAW" 
              subtitle="Reduces visual noise by stripping away tonal layers and shadows."
              icon="filter-drama"
              isSelected={mode === 'MINIMALIST RAW'}
              onPress={() => setMode('MINIMALIST RAW')}
            />
            <ModeCard 
              title="NIGHT SURVEILLANCE" 
              subtitle="OLED-optimized dark protocol with suppressed luminance."
              icon="bedtime"
              isSelected={mode === 'NIGHT SURVEILLANCE'}
              onPress={() => setMode('NIGHT SURVEILLANCE')}
            />
          </View>
        </View>

        {/* Density Protocols */}
        <View style={styles.section}>
          <Text style={[typography.labelCaps, { color: colors.primary, marginBottom: 12 }]}>DENSITY PROTOCOLS</Text>
          <View style={styles.densityContainer}>
            <DensityCard 
              title="COMPACT" icon="view-comfy-alt" 
              isSelected={density === 'COMPACT'} onPress={() => setDensity('COMPACT')} 
            />
            <DensityCard 
              title="BALANCED" icon="view-agenda" 
              isSelected={density === 'BALANCED'} onPress={() => setDensity('BALANCED')} 
            />
            <DensityCard 
              title="SPACIOUS" icon="margin" 
              isSelected={density === 'SPACIOUS'} onPress={() => setDensity('SPACIOUS')} 
            />
          </View>
        </View>

        {/* Sliders */}
        <View style={[styles.slidersCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
          {/* Typography */}
          <View style={styles.sliderGroup}>
            <View style={styles.sliderHeader}>
              <View style={styles.sliderHeaderLeft}>
                <MaterialIcons name="text-fields" size={20} color={colors.secondary} />
                <Text style={[typography.labelCaps, { color: colors.primary, marginLeft: 8 }]}>TYPOGRAPHY SCALING</Text>
              </View>
              <Text style={[typography.labelSm, { color: colors.primary }]}>{fontScale}%</Text>
            </View>
            <View style={styles.fakeSliderContainer}>
              <View style={[styles.fakeSliderTrack, { backgroundColor: colors.surfaceDim }]} />
              <View style={[styles.fakeSliderFill, { backgroundColor: colors.primary, width: `${(fontScale - 80) / (140 - 80) * 100}%` }]} />
              <View style={[styles.fakeSliderThumb, { backgroundColor: colors.primary, left: `${(fontScale - 80) / (140 - 80) * 100}%` }]} />
              {/* Invisible touch area for fake slider would go here or use real Slider in actual RN */}
            </View>
            <View style={styles.sliderLabels}>
              <Text style={[typography.labelSm, { color: colors.secondary, opacity: 0.5, fontSize: 10 }]}>80%</Text>
              <Text style={[typography.labelSm, { color: colors.secondary, opacity: 0.5, fontSize: 10 }]}>ADAPTIVE</Text>
              <Text style={[typography.labelSm, { color: colors.secondary, opacity: 0.5, fontSize: 10 }]}>140%</Text>
            </View>
          </View>

          {/* Contrast */}
          <View style={[styles.sliderGroup, { marginTop: 24 }]}>
            <View style={styles.sliderHeader}>
              <View style={styles.sliderHeaderLeft}>
                <MaterialIcons name="tonality" size={20} color={colors.secondary} />
                <Text style={[typography.labelCaps, { color: colors.primary, marginLeft: 8 }]}>CONTRAST MODULATION</Text>
              </View>
              <Text style={[typography.labelSm, { color: colors.primary }]}>{getContrastLabel(contrastModulation)}</Text>
            </View>
            <View style={styles.fakeSliderContainer}>
              <View style={[styles.fakeSliderTrack, { backgroundColor: colors.surfaceDim }]} />
              <View style={[styles.fakeSliderFill, { backgroundColor: colors.primary, width: `${contrastModulation}%` }]} />
              <View style={[styles.fakeSliderThumb, { backgroundColor: colors.primary, left: `${contrastModulation}%` }]} />
            </View>
            <View style={styles.sliderLabels}>
              <Text style={[typography.labelSm, { color: colors.secondary, opacity: 0.5, fontSize: 10 }]}>SOFT</Text>
              <Text style={[typography.labelSm, { color: colors.secondary, opacity: 0.5, fontSize: 10 }]}>INDUSTRIAL</Text>
              <Text style={[typography.labelSm, { color: colors.secondary, opacity: 0.5, fontSize: 10 }]}>STARK</Text>
            </View>
          </View>
        </View>

        {/* Live Protocol Preview */}
        <View style={styles.section}>
          <Text style={[typography.labelCaps, { color: colors.primary, marginBottom: 12 }]}>LIVE PROTOCOL PREVIEW</Text>
          <View style={[styles.previewContainer, { backgroundColor: '#fff', borderColor: colors.outlineVariant }]}>
            <Image 
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBXiU4fJvBI50KwbRqeYXMQXrveE5Tpa0r-HNF9lnHoVO048e6cLRK6IqU7vxs3C6yAwBP_2skRNNMkZpQAf9wVARcInwgurUAOoyfZLOPm_9YUXLJVXKSsFTvusv5nFm0Sh8PZTfEpA_A1Mt0aykiW17xtoA6nCdLiKMbrPwXEbvrmqtdzPsCipLfVnchsMwK5I7D6aBx8oRZwHAQsiVl9mfySQu0lq5u-jw8evB4-__0KmDHpbfJu5Q' }}
              style={[styles.previewImage, { opacity: 0.1 }]}
            />
            <View style={styles.previewContent}>
              <View style={[styles.previewLine, { backgroundColor: colors.primary }]} />
              <Text style={[typography.labelCaps, { color: colors.primary, letterSpacing: 2, marginBottom: 4 }]}>SYSTEM STATUS: NOMINAL</Text>
              <Text style={[typography.labelSm, { color: colors.secondary, textTransform: 'uppercase', letterSpacing: -0.5 }]}>Latency: 2ms | Efficiency: 98.4%</Text>
              
              <View style={styles.previewDotsRow}>
                <View style={[styles.previewDot, { backgroundColor: colors.tertiaryFixed }]} />
                <View style={[styles.previewDot, { backgroundColor: colors.tertiaryFixed }]} />
                <View style={[styles.previewDot, { backgroundColor: colors.tertiaryFixed }]} />
              </View>
            </View>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 64,
    borderBottomWidth: 1,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: 8,
    borderRadius: 20,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 64,
    gap: 32,
  },
  pageHeader: {
    gap: 4,
  },
  section: {
    
  },
  sectionTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  modesContainer: {
    gap: 12,
  },
  modeCard: {
    flexDirection: 'row',
    padding: 24,
    borderRadius: 8,
    alignItems: 'flex-start',
    gap: 16,
  },
  modeIconContainer: {
    padding: 8,
    borderRadius: 4,
  },
  modeTextContainer: {
    flex: 1,
  },
  densityContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  densityCard: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  slidersCard: {
    padding: 24,
    borderWidth: 1,
    borderRadius: 8,
  },
  sliderGroup: {
    gap: 16,
  },
  sliderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sliderHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fakeSliderContainer: {
    height: 24,
    justifyContent: 'center',
    position: 'relative',
  },
  fakeSliderTrack: {
    height: 4,
    width: '100%',
    borderRadius: 2,
  },
  fakeSliderFill: {
    height: 4,
    position: 'absolute',
    borderRadius: 2,
  },
  fakeSliderThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#fff',
    position: 'absolute',
    marginLeft: -12, // center
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  previewContainer: {
    height: 192,
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewImage: {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
  },
  previewContent: {
    zIndex: 10,
    alignItems: 'center',
  },
  previewLine: {
    width: 48,
    height: 4,
    marginBottom: 16,
  },
  previewDotsRow: {
    flexDirection: 'row',
    gap: 4,
    marginTop: 16,
    justifyContent: 'center',
  },
  previewDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  }
});

export default ThemeAppearanceScreen;
