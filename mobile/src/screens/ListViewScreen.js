import React from "react";
import { 
  View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image 
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";

const ListViewScreen = ({ navigation }) => {
  const { colors, typography } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* TopAppBar */}
      <View style={[styles.header, { borderBottomColor: colors.surfaceDim, backgroundColor: colors.surface }]}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
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
        
        {/* Summary Metrics: Compact Grid */}
        <View style={styles.metricsGrid}>
          {/* Main Status */}
          <View style={[styles.bentoCard, styles.colSpan2, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
            <View style={styles.bentoHeader}>
              <Text style={[typography.labelCaps, { color: colors.secondaryFixedDim }]}>SYSTEM STATUS</Text>
              <MaterialIcons name="bolt" size={20} color={colors.onTertiaryContainer} />
            </View>
            <View>
              <Text style={[typography.headlineLgMobile, { color: colors.primary, fontWeight: '800' }]}>STABLE STATE</Text>
              <View style={[styles.progressBarBg, { backgroundColor: colors.surfaceContainer }]}>
                <View style={[styles.progressBarFill, { backgroundColor: colors.primary, width: '88%' }]} />
              </View>
            </View>
          </View>

          {/* Active Tasks */}
          <View style={[styles.bentoCard, { flex: 1, backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
            <Text style={[typography.labelCaps, { color: colors.secondaryFixedDim }]}>ACTIVE TASKS</Text>
            <Text style={[typography.headlineLgMobile, { color: colors.primary, fontWeight: '700', marginTop: 16 }]}>142</Text>
          </View>

          {/* Critical Path */}
          <View style={[styles.bentoCard, { flex: 1, backgroundColor: colors.surfaceContainerLowest, borderColor: colors.primary }]}>
            <Text style={[typography.labelCaps, { color: colors.secondaryFixedDim }]}>CRITICAL PATH</Text>
            <Text style={[typography.headlineLgMobile, { color: colors.error, fontWeight: '700', marginTop: 16 }]}>09</Text>
          </View>
        </View>

        {/* Task Ledger Filter / Title */}
        <View style={styles.ledgerHeader}>
          <Text style={[typography.labelCaps, { color: colors.secondary, letterSpacing: 2 }]}>ACTIVE LEDGER</Text>
          <View style={styles.actionButtons}>
            <TouchableOpacity style={[styles.actionBtn, { backgroundColor: colors.surfaceContainerLow }]}>
              <MaterialIcons name="filter-list" size={20} color={colors.primary} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionBtn, { backgroundColor: colors.surfaceContainerLow }]}>
              <MaterialIcons name="search" size={20} color={colors.primary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Task Cards Ledger */}
        <View style={styles.tasksList}>
          
          {/* Task 1 */}
          <TouchableOpacity style={[styles.taskCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]} activeOpacity={0.9}>
            <View style={styles.taskHeader}>
              <Text style={[typography.labelSm, { color: colors.secondaryFixedDim }]}>ID: #SYS-7729</Text>
              <View style={[styles.statusChip, { backgroundColor: colors.tertiaryContainer }]}>
                <Text style={[typography.labelCaps, { color: colors.onTertiaryContainer, fontSize: 10 }]}>IN_PROGRESS</Text>
              </View>
            </View>
            <Text style={[typography.bodyMd, { color: colors.primary, fontWeight: '700', marginBottom: 16 }]}>
              Initialize Kernel Hardening Protocol for Core Segment A
            </Text>
            <View style={[styles.taskFooter, { borderTopColor: colors.surfaceContainer }]}>
              <View style={styles.assignee}>
                <View style={[styles.avatar, { backgroundColor: colors.surfaceDim }]}>
                  <Image source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCAc9jeLzOTuFvhjwHpZ7ECaS1-AueXbz94bY4EnBUVv0JgQ2xyBnC7QJy1ngBko4b4M8XHth4o0pptTIi_WGbpcVEdbvfDcqbg-zFu0Em3e2pyyW1CDCnENvreEw0m84tNLCVAzTCYCt-9E3ZBowPSn__02gCPaHhHZAgueMEfbbhP1Sxe9z2IzFc0z6intLXIqhzneiMqepWTwpjbhprnVSeVL_fE4_zVhD9f8oZ0G_2lV01x58tD7Q' }} style={{ width: '100%', height: '100%' }} />
                </View>
                <Text style={[typography.labelSm, { color: colors.primary }]}>UNIT_04</Text>
              </View>
              <Text style={[typography.labelSm, { color: colors.secondary }]}>12:45 UTC</Text>
            </View>
          </TouchableOpacity>

          {/* Task 2 */}
          <TouchableOpacity style={[styles.taskCard, { backgroundColor: `${colors.error}0D`, borderColor: `${colors.error}4D` }]} activeOpacity={0.9}>
            <View style={styles.taskHeader}>
              <Text style={[typography.labelSm, { color: colors.secondaryFixedDim }]}>ID: #SYS-8812</Text>
              <View style={[styles.statusChip, { backgroundColor: colors.errorContainer }]}>
                <Text style={[typography.labelCaps, { color: colors.onErrorContainer, fontSize: 10 }]}>CRITICAL</Text>
              </View>
            </View>
            <Text style={[typography.bodyMd, { color: colors.primary, fontWeight: '700', marginBottom: 16 }]}>
              Uplink Failure in Sub-Grid 09: Automated Rectification Required
            </Text>
            <View style={[styles.taskFooter, { borderTopColor: colors.surfaceContainer }]}>
              <View style={styles.assignee}>
                <View style={[styles.avatar, { backgroundColor: colors.surfaceDim }]}>
                  <Image source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuByd0b06mWPNNA0DbJT2bzMWXIscXfuIUfYXkXT8RQs_6c5iDuxvqRZ5RvEG1Gqae9CIv-_w5YwB6AQB53jqNEmIoa4wccGYVErureeC2ViRc2QlFe4YTlHgVdxqJOv4O_EoSD52tcLkeYS3ohJ_rgptvYHtVQG39JRWB_Zks3wLIEYZqwIOIZ9Xxk2OcjMwvNmoJ6d_AcF-NRj9toi-tkTbjIGZm6hvWZQ-NAX-iHNyOffFdvAuuo0gw' }} style={{ width: '100%', height: '100%' }} />
                </View>
                <Text style={[typography.labelSm, { color: colors.primary }]}>UNIT_ALPHA</Text>
              </View>
              <Text style={[typography.labelSm, { color: colors.secondary }]}>13:02 UTC</Text>
            </View>
          </TouchableOpacity>

          {/* Task 3 */}
          <TouchableOpacity style={[styles.taskCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]} activeOpacity={0.9}>
            <View style={styles.taskHeader}>
              <Text style={[typography.labelSm, { color: colors.secondaryFixedDim }]}>ID: #SYS-9001</Text>
              <View style={[styles.statusChip, { backgroundColor: colors.surfaceContainerHighest }]}>
                <Text style={[typography.labelCaps, { color: colors.secondary, fontSize: 10 }]}>QUEUED</Text>
              </View>
            </View>
            <Text style={[typography.bodyMd, { color: colors.primary, fontWeight: '700', marginBottom: 16 }]}>
              Batch Processing: Historical Data Archival to Cold Storage
            </Text>
            <View style={[styles.taskFooter, { borderTopColor: colors.surfaceContainer }]}>
              <View style={styles.assignee}>
                <View style={[styles.avatar, { backgroundColor: colors.surfaceDim }]}>
                  <Image source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZRpVZgomXMjKDhC_xy-beYo-HAqo_7ovU1wXyv1mlwHzg3tK7g2tBUqy5e5Vcm82H5iA53F30EFYF_mfesSP7ktshLRQRekxsVkHj-FGt3ufGIhBtxiwmHekhSDF_iRegzWmToVwceOWo6CbF9BYkeCqqRxJ7Asrxln7VI7OAqhRhd9uwHNFJGTBtr9lhr1VU5ZsF_RoADfD01pEzgarvHf1k_RElbRIeqTjTLcDmHBK9zW7BArCR1g' }} style={{ width: '100%', height: '100%' }} />
                </View>
                <Text style={[typography.labelSm, { color: colors.primary }]}>UNIT_LEAD</Text>
              </View>
              <Text style={[typography.labelSm, { color: colors.secondary }]}>13:15 UTC</Text>
            </View>
          </TouchableOpacity>

          {/* Task 4 */}
          <TouchableOpacity style={[styles.taskCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]} activeOpacity={0.9}>
            <View style={styles.taskHeader}>
              <Text style={[typography.labelSm, { color: colors.secondaryFixedDim }]}>ID: #SYS-7735</Text>
              <View style={[styles.statusChip, { backgroundColor: colors.tertiaryContainer }]}>
                <Text style={[typography.labelCaps, { color: colors.onTertiaryContainer, fontSize: 10 }]}>IN_PROGRESS</Text>
              </View>
            </View>
            <Text style={[typography.bodyMd, { color: colors.primary, fontWeight: '700', marginBottom: 16 }]}>
              Neural Link Calibration for Remote Diagnostics Module
            </Text>
            <View style={[styles.taskFooter, { borderTopColor: colors.surfaceContainer }]}>
              <View style={styles.assignee}>
                <View style={[styles.avatar, { backgroundColor: colors.surfaceDim }]}>
                  <Image source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDMYHvnstsHYZ6zZ96L2SbkKeJbLLYaNzH00dURfLRF8ryVwoTXLtMNsQysCR25khrUwe6XuRAuwFOImP1ylpa9Qobl62MNtTRRcldvFS5Hmh79sOWQkY7DD6K_8uOSS3aDs6hFWVevOac7ZH2b1d7l_42ocb8i7Jj727ULH4clKbcKJtvY88VJjA_qKH6ClXq_3aKZQEt7N0nuzQ_wHn7kCzcRQ-6UufOocKX3SpNyxsmw46-LouNtow' }} style={{ width: '100%', height: '100%' }} />
                </View>
                <Text style={[typography.labelSm, { color: colors.primary }]}>UNIT_09</Text>
              </View>
              <Text style={[typography.labelSm, { color: colors.secondary }]}>14:00 UTC</Text>
            </View>
          </TouchableOpacity>

        </View>

      </ScrollView>

      {/* FAB: New Entry */}
      <TouchableOpacity style={[styles.fab, { backgroundColor: colors.primary }]} activeOpacity={0.9}>
        <MaterialIcons name="add" size={24} color={colors.onPrimary} />
      </TouchableOpacity>

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
    paddingBottom: 96,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 32,
  },
  colSpan2: {
    width: '100%',
    height: 128,
  },
  bentoCard: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 24,
    justifyContent: 'space-between',
  },
  bentoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  progressBarBg: {
    height: 4,
    width: '100%',
    borderRadius: 4,
    marginTop: 8,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
  },
  ledgerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  actionBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tasksList: {
    gap: 16,
  },
  taskCard: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 20,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  statusChip: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  taskFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    paddingTop: 16,
  },
  assignee: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    overflow: 'hidden',
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    zIndex: 50,
  }
});

export default ListViewScreen;
