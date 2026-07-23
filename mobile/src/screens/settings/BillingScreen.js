import React from "react";
import { 
  View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity 
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";

const BillingScreen = ({ navigation }) => {
  const { colors, typography } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* TopAppBar */}
      <View style={[styles.header, { borderBottomColor: colors.outlineVariant, backgroundColor: colors.surface }]}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.iconButton}>
            <MaterialIcons name="menu" size={24} color={colors.primary} />
          </TouchableOpacity>
          <Text style={[typography.headlineLgMobile, { color: colors.primary, fontWeight: '900', letterSpacing: -1, marginLeft: 8 }]}>
            MANDATE
          </Text>
        </View>
        <TouchableOpacity style={styles.iconButton}>
          <MaterialIcons name="account-circle" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Header Section */}
        <View style={styles.pageHeader}>
          <Text style={[typography.headlineLgMobile, { color: colors.primary }]}>Billing & Plan</Text>
          <Text style={[typography.bodyMd, { color: colors.secondary, marginTop: 4 }]}>Manage your industrial workspace subscription.</Text>
        </View>

        {/* Current Usage Bento Module */}
        <View style={[styles.bentoCard, { borderColor: colors.outlineVariant, backgroundColor: '#fff' }]}>
          <View style={styles.bentoHeaderRow}>
            <View>
              <Text style={[typography.labelCaps, { color: colors.secondary, marginBottom: 4 }]}>ESTIMATED TOTAL</Text>
              <Text style={[typography.headlineLgMobile, { color: colors.primary }]}>$1,248.42</Text>
            </View>
            <View style={[styles.statusBadge, { backgroundColor: colors.tertiaryFixed }]}>
              <Text style={[typography.labelSm, { color: colors.onTertiaryFixed, fontSize: 10 }]}>ACTIVE</Text>
            </View>
          </View>

          <View style={styles.progressSection}>
            <View style={styles.progressLabelRow}>
              <Text style={[typography.labelSm, { color: colors.secondary }]}>COMPUTE UNITS</Text>
              <Text style={[typography.labelSm, { color: colors.primary, fontWeight: '700' }]}>82%</Text>
            </View>
            <View style={[styles.progressBarTrack, { backgroundColor: colors.surfaceContainerHigh }]}>
              <View style={[styles.progressBarFill, { backgroundColor: colors.primary, width: '82%' }]} />
            </View>
            <View style={styles.progressLimitRow}>
              <Text style={[typography.labelSm, { color: colors.onSurfaceVariant, opacity: 0.6 }]}>0 CU</Text>
              <Text style={[typography.labelSm, { color: colors.onSurfaceVariant, opacity: 0.6 }]}>1000 CU Limit</Text>
            </View>
          </View>

          <View style={[styles.planDetailsRow, { borderTopColor: colors.surfaceContainer }]}>
            <View style={styles.planDetailItem}>
              <Text style={[typography.labelCaps, { color: colors.secondary }]}>NEXT BILL</Text>
              <Text style={[typography.labelSm, { color: colors.primary, fontWeight: '700', marginTop: 2 }]}>OCT 12, 2024</Text>
            </View>
            <View style={styles.planDetailItem}>
              <Text style={[typography.labelCaps, { color: colors.secondary }]}>PLAN TYPE</Text>
              <Text style={[typography.labelSm, { color: colors.primary, fontWeight: '700', marginTop: 2 }]}>ENTERPRISE</Text>
            </View>
          </View>
        </View>

        {/* Payment Methods */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <Text style={[typography.labelCaps, { color: colors.primary, letterSpacing: 2 }]}>PAYMENT METHODS</Text>
            <TouchableOpacity>
              <Text style={[typography.labelSm, { color: colors.primary, textDecorationLine: 'underline' }]}>ADD NEW</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.cardsContainer}>
            <TouchableOpacity style={[styles.paymentCard, { borderColor: colors.outlineVariant }]} activeOpacity={0.7}>
              <View style={styles.paymentCardLeft}>
                <View style={[styles.cardIconBox, { backgroundColor: colors.surfaceContainer, borderColor: colors.outlineVariant }]}>
                  <MaterialIcons name="credit-card" size={20} color={colors.secondary} />
                </View>
                <View>
                  <Text style={[typography.labelSm, { color: colors.primary, fontWeight: '700' }]}>VISA •••• 9012</Text>
                  <Text style={[typography.labelSm, { color: colors.secondary }]}>Expires 12/26</Text>
                </View>
              </View>
              <View style={styles.paymentCardRight}>
                <View style={[styles.defaultBadge, { backgroundColor: 'rgba(0, 152, 61, 0.1)' }]}>
                  <Text style={[typography.labelCaps, { color: colors.onTertiaryContainer, fontSize: 10 }]}>DEFAULT</Text>
                </View>
                <MaterialIcons name="more-vert" size={20} color={colors.secondary} style={{ marginLeft: 8 }} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.paymentCard, { borderColor: colors.outlineVariant, opacity: 0.6 }]} activeOpacity={0.7}>
              <View style={styles.paymentCardLeft}>
                <View style={[styles.cardIconBox, { backgroundColor: colors.surfaceContainer, borderColor: colors.outlineVariant }]}>
                  <MaterialIcons name="credit-card" size={20} color={colors.secondary} />
                </View>
                <View>
                  <Text style={[typography.labelSm, { color: colors.primary, fontWeight: '700' }]}>MASTERCARD •••• 4456</Text>
                  <Text style={[typography.labelSm, { color: colors.secondary }]}>Expires 04/25</Text>
                </View>
              </View>
              <MaterialIcons name="more-vert" size={20} color={colors.secondary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Usage Chart */}
        <View style={styles.section}>
          <Text style={[typography.labelCaps, { color: colors.primary, letterSpacing: 2, marginBottom: 16 }]}>PERFORMANCE INDEX (7D)</Text>
          <View style={[styles.chartCard, { borderColor: colors.outlineVariant }]}>
            {[
              { day: 'M', h: '40%', active: false },
              { day: 'T', h: '55%', active: false },
              { day: 'W', h: '70%', active: false },
              { day: 'T', h: '65%', active: false },
              { day: 'F', h: '90%', active: true },
              { day: 'S', h: '20%', active: false, dim: true },
              { day: 'S', h: '15%', active: false, dim: true },
            ].map((col, i) => (
              <View key={i} style={[styles.chartCol, col.dim && { opacity: 0.4 }]}>
                <View style={[styles.barTrack, { backgroundColor: col.active ? colors.primary : colors.surfaceContainerHigh, height: col.h }]} />
                <Text style={[typography.labelSm, { color: colors.primary, opacity: col.active ? 1 : 0.4, fontWeight: col.active ? '700' : '500' }]}>{col.day}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Invoicing Log */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <Text style={[typography.labelCaps, { color: colors.primary, letterSpacing: 2 }]}>INVOICING LOG</Text>
            <MaterialIcons name="filter-list" size={20} color={colors.secondary} />
          </View>
          
          <View style={[styles.invoicesList, { borderTopColor: 'rgba(196, 199, 199, 0.3)', borderBottomColor: 'rgba(196, 199, 199, 0.3)' }]}>
            {[
              { id: 'INV-2024-08', date: 'Aug 12, 2024', amount: '$1,102.50' },
              { id: 'INV-2024-07', date: 'Jul 12, 2024', amount: '$980.00' },
              { id: 'INV-2024-06', date: 'Jun 12, 2024', amount: '$1,240.20' },
            ].map((inv, idx) => (
              <TouchableOpacity key={idx} style={[styles.invoiceRow, { borderBottomColor: 'rgba(196, 199, 199, 0.3)' }]} activeOpacity={0.7}>
                <View style={styles.invoiceLeft}>
                  <MaterialIcons name="description" size={20} color={colors.primary} />
                  <View style={{ marginLeft: 12 }}>
                    <Text style={[typography.labelSm, { color: colors.primary, fontWeight: '700' }]}>{inv.id}</Text>
                    <Text style={[typography.labelSm, { color: colors.secondary }]}>{inv.date}</Text>
                  </View>
                </View>
                <View style={styles.invoiceRight}>
                  <Text style={[typography.labelSm, { color: colors.primary, fontWeight: '700' }]}>{inv.amount}</Text>
                  <Text style={[typography.labelSm, { color: colors.onTertiaryContainer }]}>Paid</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
          
          <TouchableOpacity style={[styles.viewAllBtn, { borderColor: colors.outlineVariant }]} activeOpacity={0.7}>
            <Text style={[typography.labelCaps, { color: colors.primary, letterSpacing: 2 }]}>VIEW ALL HISTORY</Text>
          </TouchableOpacity>
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
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 64,
    gap: 32,
  },
  pageHeader: {
    gap: 4,
  },
  bentoCard: {
    borderWidth: 1,
    padding: 24,
    gap: 16,
  },
  bentoHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  progressSection: {
    gap: 8,
    paddingTop: 8,
  },
  progressLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  progressBarTrack: {
    height: 4,
    borderRadius: 2,
    width: '100%',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
  },
  progressLimitRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  planDetailsRow: {
    flexDirection: 'row',
    borderTopWidth: 1,
    paddingTop: 16,
    gap: 16,
  },
  planDetailItem: {
    flex: 1,
  },
  section: {
    
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardsContainer: {
    gap: 8,
  },
  paymentCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  paymentCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  cardIconBox: {
    width: 48,
    height: 32,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paymentCardRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  defaultBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  chartCard: {
    height: 192,
    backgroundColor: '#fff',
    borderWidth: 1,
    padding: 24,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  chartCol: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
    height: '100%',
    justifyContent: 'flex-end',
  },
  barTrack: {
    width: '100%',
    borderRadius: 2,
  },
  invoicesList: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginBottom: 16,
  },
  invoiceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  invoiceLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  invoiceRight: {
    alignItems: 'flex-end',
  },
  viewAllBtn: {
    width: '100%',
    paddingVertical: 16,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default BillingScreen;
