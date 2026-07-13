import React, { useState } from "react";
import { 
  View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image 
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";

const SecurityProtocolsScreen = ({ navigation }) => {
  const { colors, typography } = useTheme();

  const [isVerified, setIsVerified] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const handleVerify = () => {
    setVerifying(true);
    setTimeout(() => {
      setVerifying(false);
      setIsVerified(true);
    }, 1200);
  };

  const realCodes = ["MNDT-0921", "SEC-8812", "RECV-4420", "FLOW-9001"];
  const hiddenCodes = ["****-****", "****-****", "****-****", "****-****"];
  const displayCodes = isVerified ? realCodes : hiddenCodes;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* TopAppBar */}
      <View style={[styles.header, { borderBottomColor: colors.outlineVariant, backgroundColor: colors.surface }]}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>
        <Text style={[typography.headlineLgMobile, { color: colors.primary, fontWeight: '900', letterSpacing: -1 }]}>
          MANDATE
        </Text>
        <View style={styles.headerRight}>
          <MaterialIcons name="shield" size={24} color={colors.primary} />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Header Section */}
        <View style={styles.pageHeader}>
          <View style={[styles.badge, { backgroundColor: colors.tertiaryFixedDim }]}>
            <Text style={[typography.labelCaps, { color: colors.onTertiaryContainer }]}>LEVEL 4 CLEARANCE</Text>
          </View>
          <Text style={[typography.headlineLgMobile, { color: colors.primary, marginTop: 8 }]}>Security Protocol 2FA</Text>
          <Text style={[typography.bodyMd, { color: colors.secondary, marginTop: 4, maxWidth: 300 }]}>Initialization flow for multi-layered identity verification. Ensure your terminal is isolated before proceeding.</Text>
        </View>

        {/* Step Indicator */}
        <View style={styles.progressContainer}>
          <View>
            <Text style={[typography.labelCaps, { color: colors.secondary, marginBottom: 4 }]}>PROGRESS</Text>
            <View style={styles.progressBarRow}>
              <View style={[styles.progressSegment, { backgroundColor: colors.primary }]} />
              <View style={[styles.progressSegment, { backgroundColor: colors.outlineVariant }]} />
              <View style={[styles.progressSegment, { backgroundColor: colors.outlineVariant }]} />
            </View>
          </View>
          <Text style={[typography.labelSm, { color: colors.primary }]}>STEP 01 / 03</Text>
        </View>

        <View style={styles.stepsContainer}>
          {/* Step 1 */}
          <View style={[styles.stepCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
            <View style={styles.stepHeaderRow}>
              <View>
                <Text style={[typography.labelCaps, { color: colors.secondary, marginBottom: 4 }]}>INITIALIZE</Text>
                <Text style={[typography.headlineLgMobile, { color: colors.primary, fontSize: 18 }]}>Authenticator Sync</Text>
              </View>
              <MaterialIcons name="qr-code-2" size={32} color={colors.primary} />
            </View>
            
            <View style={[styles.qrContainer, { backgroundColor: colors.surface, borderColor: colors.outlineVariant }]}>
              <View style={[styles.qrBox, { borderColor: colors.outlineVariant }]}>
                <Image 
                  source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDEMk1zL7sA7d3xr1Rxd8GfQ9e9sMIETMyjU6WzZ6SAddVfkM1sIYx3AF-rH3P5e4dxS_x6k6ilvfp1N3bsDg74KktnQ0p5sfuisq814KDGBTo54PHu05Lh0L29ands6ORNu2grRL2enbz2JjYh1bF5wsLGr5rnIOZk8s7jVr-kbkfs6kSZWCEeVYzD9r213iJxnUql9G8PIWSmiTpUNp4M7AB8L26mYpbOdCXm3_9x1UOGapJono6hzg' }}
                  style={{ width: '100%', height: '100%' }}
                />
                {/* Fake scanning line */}
                <View style={[styles.scanLine, { backgroundColor: colors.primary }]} />
              </View>
              <Text style={[typography.labelSm, { color: colors.secondary, textTransform: 'uppercase', letterSpacing: 2, marginTop: 16 }]}>Scan with Auth App</Text>
            </View>

            <View style={[styles.secretBox, { backgroundColor: colors.surfaceContainer }]}>
              <Text style={[typography.labelSm, { color: colors.secondary }]}>MANUAL SECRET</Text>
              <Text style={[typography.labelSm, { color: colors.primary, fontWeight: '700', letterSpacing: 2 }]}>XJ72 - 91KL - 00MB</Text>
            </View>

            <TouchableOpacity 
              style={[styles.confirmBtn, isVerified ? { backgroundColor: colors.tertiaryContainer } : { backgroundColor: colors.primary }]} 
              onPress={handleVerify}
              disabled={isVerified || verifying}
              activeOpacity={0.9}
            >
              {verifying ? (
                <Text style={[typography.labelCaps, { color: colors.onPrimary }]}>VERIFYING...</Text>
              ) : isVerified ? (
                <MaterialIcons name="check-circle" size={20} color={colors.onPrimary} />
              ) : (
                <Text style={[typography.labelCaps, { color: colors.onPrimary, letterSpacing: 2 }]}>CONFIRM SYNC</Text>
              )}
            </TouchableOpacity>
          </View>

          {/* Step 2 */}
          <View style={[
            styles.stepCard, 
            isVerified ? { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant } : { backgroundColor: colors.surfaceContainerLow, borderColor: colors.outlineVariant, opacity: 0.5 }
          ]}>
            <View style={styles.stepHeaderRow}>
              <View>
                <Text style={[typography.labelCaps, { color: colors.secondary, marginBottom: 4 }]}>SAFEGUARD</Text>
                <Text style={[typography.headlineLgMobile, { color: isVerified ? colors.primary : colors.secondary, fontSize: 18 }]}>Recovery Protocol</Text>
              </View>
              <MaterialIcons name={isVerified ? "lock-reset" : "lock-open"} size={32} color={isVerified ? colors.primary : colors.secondary} />
            </View>

            <View style={styles.codesGrid}>
              {displayCodes.map((code, idx) => (
                <View key={idx} style={[styles.codeBox, { backgroundColor: colors.surface, borderColor: colors.outlineVariant }]}>
                  <Text style={[typography.labelSm, isVerified ? { color: colors.primary, fontWeight: '700' } : { color: colors.secondary }]}>{code}</Text>
                </View>
              ))}
            </View>

            <View style={styles.actionsRow}>
              <TouchableOpacity style={[styles.actionBtn, { borderColor: colors.outlineVariant }]} disabled={!isVerified}>
                <MaterialIcons name="download" size={24} color={isVerified ? colors.primary : colors.secondary} />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.actionBtn, { borderColor: colors.outlineVariant }]} disabled={!isVerified}>
                <MaterialIcons name="print" size={24} color={isVerified ? colors.primary : colors.secondary} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Security Warnings */}
          <View style={[styles.warningCard, { backgroundColor: colors.primaryContainer }]}>
            <View style={styles.warningHeader}>
              <MaterialIcons name="warning" size={20} color={colors.onPrimaryContainer} />
              <Text style={[typography.labelCaps, { color: colors.onPrimaryContainer, marginLeft: 8 }]}>MANDATORY PROTOCOL</Text>
            </View>
            <Text style={[typography.labelSm, { color: colors.onPrimaryContainer, opacity: 0.8, lineHeight: 20 }]}>
              NEVER SHARE THE QR CODE OR SECRET KEY WITH UNAUTHORIZED ENTITIES. MANDATE PERSONNEL WILL NEVER REQUEST THESE CREDENTIALS.
            </Text>
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
    width: 48,
  },
  headerRight: {
    width: 48,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  iconButton: {
    padding: 8,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 64,
  },
  pageHeader: {
    marginBottom: 32,
    alignItems: 'flex-start',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  progressBarRow: {
    flexDirection: 'row',
    gap: 4,
  },
  progressSegment: {
    width: 32,
    height: 4,
    borderRadius: 2,
  },
  stepsContainer: {
    gap: 16,
  },
  stepCard: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 24,
    gap: 16,
  },
  stepHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  qrContainer: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qrBox: {
    width: 192,
    height: 192,
    backgroundColor: '#fff',
    borderWidth: 1,
    padding: 16,
    position: 'relative',
    overflow: 'hidden',
  },
  scanLine: {
    position: 'absolute',
    top: '20%',
    left: 0,
    width: '100%',
    height: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },
  secretBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
  },
  confirmBtn: {
    paddingVertical: 16,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
  },
  codesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  codeBox: {
    flex: 1,
    minWidth: '40%',
    padding: 8,
    borderWidth: 1,
    borderRadius: 4,
    alignItems: 'center',
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  actionBtn: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  warningCard: {
    borderRadius: 16,
    padding: 24,
    gap: 8,
  },
  warningHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  }
});

export default SecurityProtocolsScreen;
