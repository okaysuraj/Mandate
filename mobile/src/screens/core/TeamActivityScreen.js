import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';

const TeamActivityScreen = () => {
  const { colors, typography, spacing, borderRadius } = useTheme();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      {/* Top App Bar */}
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.outlineVariant }]}>
        <View style={styles.headerLeft}>
          <MaterialIcons name="terminal" size={24} color={colors.primary} />
          <Text style={[typography.labelCaps, { color: colors.primary, letterSpacing: 2, marginLeft: 8 }]}>MANDATE OS</Text>
        </View>
        <TouchableOpacity style={styles.iconBtn}>
          <MaterialIcons name="account-circle" size={24} color={colors.secondary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        
        {/* Title & View Mode */}
        <View style={styles.titleRow}>
          <View>
            <Text style={[typography.headlineLgMobile, { color: colors.primary }]}>Activity Stream</Text>
            <Text style={[typography.labelSm, { color: colors.secondary, textTransform: 'uppercase', letterSpacing: -0.5, marginTop: 4 }]}>Live Industrial Feed</Text>
          </View>
          <View style={[styles.viewModeToggle, { backgroundColor: colors.surfaceContainerHigh }]}>
            <View style={[styles.viewModeBtn, { backgroundColor: colors.surfaceContainerLowest }]}>
              <Text style={[typography.labelCaps, { color: colors.primary }]}>LIVE</Text>
            </View>
            <View style={styles.viewModeBtn}>
              <Text style={[typography.labelCaps, { color: colors.secondary, opacity: 0.5 }]}>HIST</Text>
            </View>
          </View>
        </View>

        {/* 24H Metrics */}
        <View style={styles.metricsGrid}>
          {/* Operations */}
          <View style={[styles.bentoCard, styles.metricCardWide, { backgroundColor: '#ffffff', borderColor: colors.surfaceDim }]}>
            <View>
              <Text style={[typography.labelCaps, { color: colors.secondary }]}>24H OPERATIONS</Text>
              <Text style={[typography.headlineLgMobile, { color: colors.primary }]}>4,812</Text>
            </View>
            <View style={styles.miniBarChart}>
              <View style={[styles.miniBar, { height: '50%', backgroundColor: colors.surfaceContainerHigh }]} />
              <View style={[styles.miniBar, { height: '75%', backgroundColor: colors.surfaceContainerHigh }]} />
              <View style={[styles.miniBar, { height: '100%', backgroundColor: colors.primary }]} />
              <View style={[styles.miniBar, { height: '66%', backgroundColor: colors.surfaceContainerHigh }]} />
              <View style={[styles.miniBar, { height: '80%', backgroundColor: colors.surfaceContainerHigh }]} />
            </View>
          </View>
          
          {/* Mandates */}
          <View style={[styles.bentoCard, styles.metricCardSmall, { backgroundColor: '#ffffff', borderColor: colors.surfaceDim }]}>
            <Text style={[typography.labelCaps, { color: colors.secondary }]}>ACTIVE MANDATES</Text>
            <Text style={[typography.headlineLgMobile, { color: colors.primary }]}>128</Text>
          </View>

          {/* Val Rate */}
          <View style={[styles.bentoCard, styles.metricCardSmall, { backgroundColor: '#ffffff', borderColor: colors.surfaceDim }]}>
            <Text style={[typography.labelCaps, { color: colors.secondary }]}>VAL. RATE</Text>
            <Text style={[typography.headlineLgMobile, { color: colors.tertiaryFixedDim }]}>99.8%</Text>
          </View>
        </View>

        {/* Timeline */}
        <View style={styles.timelineContainer}>
          <View style={[styles.timelineLine, { backgroundColor: colors.surfaceContainer }]} />

          {/* Entry 1 */}
          <View style={styles.timelineEntry}>
            <View style={[styles.timelineAvatarWrapper, { backgroundColor: colors.background }]}>
              <View style={[styles.avatarBox, { borderColor: colors.outline, backgroundColor: colors.surfaceContainer }]}>
                <Image source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAZqRgNhY8IVoIK7gwM0mpyjprpgH5UdeEkJ32x8ITjgefdTqyQQ1ldGfKpR6sSUD3rPVHfGUbhI6J_VkylbtRMW-jrjRj1_FMGv3tfVqd2bMuOvnFehcT6c3v8U_cwOqDyUbQjbO9QyrVXKaUTad-t9QzeNek05Bfk0hlBQcoIGYcQMfcfmEb_ktdTT6ENtIhkuu6hIA4SkssdbmBBBFleuy_njpAkUV8NDYpKg_aBzgsotpCmJxKHEA' }} style={styles.avatarImg} />
              </View>
            </View>
            <View style={[styles.bentoCard, styles.timelineCard, { backgroundColor: '#ffffff', borderColor: colors.surfaceDim }]}>
              <View style={styles.timelineCardHeader}>
                <Text style={[typography.labelCaps, { color: colors.primary }]}>OPERATOR_08</Text>
                <View style={[styles.statusBadge, { backgroundColor: 'rgba(0, 152, 61, 0.1)' }]}>
                  <Text style={[typography.labelSm, { color: colors.onTertiaryContainer, fontSize: 10 }]}>SUCCESS</Text>
                </View>
              </View>
              <Text style={[typography.bodyMd, { color: colors.onSurface, marginBottom: 16 }]}>Initialized Mandate: Core-Alpha</Text>
              <View style={styles.timelineMeta}>
                <Text style={[typography.labelSm, { color: colors.onSurfaceVariant, fontSize: 10 }]}>NODE-ID: 0x82A1</Text>
                <Text style={[typography.labelSm, { color: colors.onSurfaceVariant, fontSize: 10 }]}>14:22:01 UTC</Text>
              </View>
            </View>
          </View>

          {/* Entry 2 */}
          <View style={styles.timelineEntry}>
            <View style={[styles.timelineAvatarWrapper, { backgroundColor: colors.background }]}>
              <View style={[styles.avatarBox, { borderColor: colors.outline, backgroundColor: colors.surfaceContainer }]}>
                <Image source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA61e5g9479DAD690vvglFQkiqsponpBIU0AydR5gn4WVYaoWAwMAfBp8uvsibQQl-pjyuWr850eZfW35CGv_E0srt1wUgaCfKHukubvL03Q7J5hVCOHcKuQVlGPrqcolfdna8Wkw3OMncGGPYNKi-my6ZqNK7NLUD05iKi840U3NPg53X_u6ZzuixlgVQcHmqP8hYOQW4CwaaG6JBGBYhmNgfYrw4N2xbgQ8PolamARMA15bciTOxUGQ' }} style={styles.avatarImg} />
              </View>
            </View>
            <View style={[styles.bentoCard, styles.timelineCard, { backgroundColor: '#ffffff', borderColor: colors.surfaceDim }]}>
              <View style={styles.timelineCardHeader}>
                <Text style={[typography.labelCaps, { color: colors.primary }]}>SYSTEM_AUTO</Text>
                <View style={[styles.statusBadge, { backgroundColor: colors.secondaryContainer }]}>
                  <Text style={[typography.labelSm, { color: colors.secondary, fontSize: 10 }]}>ACTIVE</Text>
                </View>
              </View>
              <Text style={[typography.bodyMd, { color: colors.onSurface, marginBottom: 16 }]}>Relay Handshake Confirmed</Text>
              <View style={styles.timelineMeta}>
                <Text style={[typography.labelSm, { color: colors.onSurfaceVariant, fontSize: 10 }]}>NODE-ID: 0x99F4</Text>
                <Text style={[typography.labelSm, { color: colors.onSurfaceVariant, fontSize: 10 }]}>14:18:45 UTC</Text>
              </View>
            </View>
          </View>

          {/* Entry 3 Failed */}
          <View style={styles.timelineEntry}>
            <View style={[styles.timelineAvatarWrapper, { backgroundColor: colors.background }]}>
              <View style={[styles.avatarBox, { borderColor: colors.outline, backgroundColor: colors.surfaceContainer }]}>
                <Image source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD3-3LORFcUutNXWfY3vRwtKQ4RHSL8-mN-4lJXyfcQio9BUaKdQBFsl53xF20VycIaVM-p9D4I_9wYLqOykAcE3S1mshy8-EVD7YFSMYiZeSrcB2Pfrfy4w6apHzBmRXX4vzPQ6ajwz2vTMXXxUE4Gwov8UaH3JkJ1e4x_cJgNQDOSbsMf67R-4fRafB4M-H4oA5vpAayWgnDFgmpmyjFK6PiapJkCU8m6wNtt3SNimuk_F8c9FkrHXw' }} style={styles.avatarImg} />
              </View>
            </View>
            <View style={[styles.bentoCard, styles.timelineCard, { backgroundColor: '#ffffff', borderColor: 'rgba(186, 26, 26, 0.5)' }]}>
              <View style={styles.timelineCardHeader}>
                <Text style={[typography.labelCaps, { color: colors.primary }]}>OPERATOR_14</Text>
                <View style={[styles.statusBadge, { backgroundColor: colors.errorContainer }]}>
                  <Text style={[typography.labelSm, { color: colors.onErrorContainer, fontSize: 10 }]}>FAILED</Text>
                </View>
              </View>
              <Text style={[typography.bodyMd, { color: colors.onSurface, marginBottom: 16 }]}>Credential Handshake Timeout</Text>
              <View style={styles.timelineMeta}>
                <Text style={[typography.labelSm, { color: colors.error, fontSize: 10 }]}>ERR_CODE: 408</Text>
                <Text style={[typography.labelSm, { color: colors.onSurfaceVariant, fontSize: 10 }]}>14:12:10 UTC</Text>
              </View>
            </View>
          </View>

          {/* Entry 4 */}
          <View style={styles.timelineEntry}>
            <View style={[styles.timelineAvatarWrapper, { backgroundColor: colors.background }]}>
              <View style={[styles.avatarBox, { borderColor: colors.outline, backgroundColor: colors.surfaceContainer }]}>
                <Image source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBfwdKw5OK-YYj-lOAI12VSPMTojn6YppEBYgXfZZK1a2B53mqW6O3eXiSMsPRak-bjmcwYDZjRvXQQs3PfevVVFbfTrYFP6G__oSoHmD8d0aflXDIsGFnby6oklyxG-ulLmqteKJ99zLVCwREyhUmp0OAH0zTPkiiHq2OpIV3K4k8QsmAriYThTpSOGXai35iEgdaiFanUp6qX2uROpy3fpNOMwa-ZXhd45y6xt8_p0FkT6mdk0DhUwg' }} style={styles.avatarImg} />
              </View>
            </View>
            <View style={[styles.bentoCard, styles.timelineCard, { backgroundColor: '#ffffff', borderColor: colors.surfaceDim }]}>
              <View style={styles.timelineCardHeader}>
                <Text style={[typography.labelCaps, { color: colors.primary }]}>OPERATOR_22</Text>
                <View style={[styles.statusBadge, { backgroundColor: 'rgba(0, 152, 61, 0.1)' }]}>
                  <Text style={[typography.labelSm, { color: colors.onTertiaryContainer, fontSize: 10 }]}>SUCCESS</Text>
                </View>
              </View>
              <Text style={[typography.bodyMd, { color: colors.onSurface, marginBottom: 16 }]}>Log Stream Diverted to Hub-04</Text>
              <View style={styles.timelineMeta}>
                <Text style={[typography.labelSm, { color: colors.onSurfaceVariant, fontSize: 10 }]}>NODE-ID: 0xEE21</Text>
                <Text style={[typography.labelSm, { color: colors.onSurfaceVariant, fontSize: 10 }]}>13:59:02 UTC</Text>
              </View>
            </View>
          </View>
        </View>

        <TouchableOpacity style={[styles.loadMoreBtn, { borderColor: colors.outlineVariant }]}>
          <MaterialIcons name="expand-more" size={20} color={colors.secondary} />
          <Text style={[typography.labelCaps, { color: colors.secondary, marginLeft: 8 }]}>LOAD_PREVIOUS_CYCLES</Text>
        </TouchableOpacity>

      </ScrollView>

      {/* Bottom Nav */}
      <View style={[styles.bottomNav, { backgroundColor: colors.surface, borderTopColor: colors.outlineVariant }]}>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="track-changes" size={24} color={colors.secondary} />
          <Text style={[typography.labelCaps, { color: colors.secondary, marginTop: 4, fontSize: 10 }]}>Goals</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="hub" size={24} color={colors.secondary} />
          <Text style={[typography.labelCaps, { color: colors.secondary, marginTop: 4, fontSize: 10 }]}>Network</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navItem, styles.navItemActive, { borderTopColor: colors.primary }]}>
          <MaterialIcons name="list-alt" size={24} color={colors.primary} />
          <Text style={[typography.labelCaps, { color: colors.primary, marginTop: 4, fontSize: 10 }]}>Logs</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="settings-input-component" size={24} color={colors.secondary} />
          <Text style={[typography.labelCaps, { color: colors.secondary, marginTop: 4, fontSize: 10 }]}>Config</Text>
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
    paddingHorizontal: 24,
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
  },
  iconBtn: {
    padding: 8,
    marginRight: -8,
  },
  container: {
    paddingTop: 80, 
    paddingBottom: 112, 
    paddingHorizontal: 16,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 32,
  },
  viewModeToggle: {
    flexDirection: 'row',
    padding: 4,
    borderRadius: 16,
    gap: 4,
  },
  viewModeBtn: {
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 12,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 64,
  },
  bentoCard: {
    borderWidth: 1,
    padding: 16,
  },
  metricCardWide: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metricCardSmall: {
    flex: 1,
  },
  miniBarChart: {
    width: 96,
    height: 48,
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 4,
  },
  miniBar: {
    flex: 1,
  },
  timelineContainer: {
    position: 'relative',
    gap: 8,
  },
  timelineLine: {
    position: 'absolute',
    left: 20,
    top: 40,
    bottom: 0,
    width: 1,
  },
  timelineEntry: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'flex-start',
  },
  timelineAvatarWrapper: {
    zIndex: 10,
    paddingTop: 8,
  },
  avatarBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    overflow: 'hidden',
  },
  avatarImg: {
    width: '100%',
    height: '100%',
  },
  timelineCard: {
    flex: 1,
  },
  timelineCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  timelineMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    opacity: 0.6,
  },
  loadMoreBtn: {
    marginTop: 64,
    paddingVertical: 16,
    borderWidth: 1,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
    paddingHorizontal: 8,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 8,
  },
  navItemActive: {
    borderTopWidth: 2,
  }
});

export default TeamActivityScreen;
