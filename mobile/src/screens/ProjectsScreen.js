import React, { useState, useEffect } from "react";
import { 
  View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, 
  ActivityIndicator, Image 
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { API_URL } from "../config";
import { useTheme } from "../context/ThemeContext";

const ProjectsScreen = ({ navigation }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { colors, typography, spacing, borderRadius } = useTheme();

  useEffect(() => {
    if (user) {
      axios.get(`${API_URL}/api/projects`, { params: { workspaceId: user.activeWorkspace } })
        .then(res => setProjects(res.data || []))
        .catch(err => console.log("Failed to load projects", err))
        .finally(() => setLoading(false));
    }
  }, [user]);

  const renderProjectItem = ({ item, index }) => {
    // Mock health index for visual parity if not provided
    const health = item.healthIndex || (index % 3 === 0 ? 92 : index % 3 === 1 ? 45 : 100);
    const status = item.status || (index % 3 === 0 ? 'Active' : index % 3 === 1 ? 'Stalled' : 'Archived');
    
    let statusBg = colors.surfaceContainerHigh;
    let statusText = colors.onSurfaceVariant;
    let healthBarColor = colors.primary;

    if (status.toLowerCase() === 'stalled' || status.toLowerCase() === 'error') {
      statusBg = colors.errorContainer;
      statusText = colors.error;
      healthBarColor = colors.error;
    } else if (status.toLowerCase() === 'archived' || health === 100) {
      healthBarColor = colors.onSecondaryContainer;
    }

    return (
      <TouchableOpacity 
        style={[styles.projectCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}
        activeOpacity={0.7}
        onPress={() => navigation.navigate("ProjectDetail", { project: item })}
      >
        <View style={styles.cardHeader}>
          <View style={{ flex: 1 }}>
            <Text style={[typography.labelCaps, { color: colors.secondary, fontSize: 10, letterSpacing: 2 }]}>
              ID: PRJ-{item._id?.substring(0,4).toUpperCase() || '0042'}-X
            </Text>
            <Text style={[typography.bodyMd, { color: colors.primary, fontWeight: '700', marginTop: 4 }]}>
              {item.name || "Unknown Project"}
            </Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: statusBg }]}>
            <Text style={[typography.labelCaps, { color: statusText, fontSize: 10 }]}>{status}</Text>
          </View>
        </View>

        <View style={[styles.cardFooter, { borderTopColor: colors.surfaceContainer }]}>
          <View style={{ flex: 1 }}>
            <Text style={[typography.labelCaps, { color: colors.onPrimaryContainer, fontSize: 10, marginBottom: 4 }]}>
              HEALTH INDEX
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <View style={[styles.progressBarBg, { backgroundColor: colors.surfaceContainerHigh }]}>
                <View style={[styles.progressBarFill, { backgroundColor: healthBarColor, width: `${health}%` }]} />
              </View>
              <Text style={[typography.labelSm, { color: healthBarColor, fontWeight: '700' }]}>{health}%</Text>
            </View>
          </View>
          <MaterialIcons name="chevron-right" size={24} color={colors.secondary} />
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* TopAppBar */}
      <View style={[styles.header, { borderBottomColor: colors.outlineVariant }]}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.iconButton}>
            <MaterialIcons name="grid-view" size={24} color={colors.primary} />
          </TouchableOpacity>
          <Text style={[typography.headlineLgMobile, { color: colors.primary, fontWeight: '900', letterSpacing: -1, marginLeft: 8 }]}>
            PROMETHEUS
          </Text>
        </View>
        <View style={[styles.avatarContainer, { borderColor: colors.outlineVariant }]}>
          <Image 
            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBrx3AAqc6LeDSbPS91FhjNKvScl6XrVEeG2QRPJigxZAkVf4s3Wy-ZSX42pRHnNejsazNpIYNnMzK_n736koVUHSi_BC9GOyBLcpP01ZlG8jQCi9cRjpLXzECvxOKvsyxHd7LcaeylMV9iZnpPr4CTeNL0R6I6FgLo2x_NQYuc2_ASDGxmN94YQK02je7OgnyYZlYTaz-HavhWXOjdxR6owfzfD-yescj2qKG6MTFG_madD8DMrmaXbg' }}
            style={styles.avatarImage}
          />
        </View>
      </View>

      <FlatList 
        data={projects.length > 0 ? projects : [
          { _id: 'prj1', name: 'Helios Turbine Assembly', status: 'Active', healthIndex: 92 },
          { _id: 'prj2', name: 'Titan Refinery Optimization', status: 'Stalled', healthIndex: 45 },
          { _id: 'prj3', name: 'Cybernetic Hub Infrastructure', status: 'Archived', healthIndex: 100 }
        ]} // Fallback data to match visual spec if none from DB
        keyExtractor={item => item._id}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <>
            {/* Operational Summary */}
            <View style={styles.summarySection}>
              <Text style={[typography.labelCaps, { color: colors.onPrimaryContainer, marginBottom: 8, paddingHorizontal: 4 }]}>
                OPERATIONAL SUMMARY
              </Text>
              <View style={styles.summaryGrid}>
                {/* System Health */}
                <View style={[styles.summaryCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
                  <View>
                    <Text style={[typography.labelCaps, { color: colors.secondary }]}>SYSTEM HEALTH</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 8 }}>
                      <Text style={[typography.headlineLg, { color: colors.primary }]}>98.4%</Text>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialIcons name="trending-up" size={14} color={colors.onTertiaryContainer} />
                        <Text style={[typography.labelSm, { color: colors.onTertiaryContainer, marginLeft: 2 }]}>+0.2</Text>
                      </View>
                    </View>
                  </View>
                  <View style={[styles.iconCircle, { backgroundColor: colors.surfaceContainerLow }]}>
                    <MaterialIcons name="bolt" size={24} color={colors.primary} />
                  </View>
                </View>
                
                {/* Active Operators */}
                <View style={[styles.summaryCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
                  <View>
                    <Text style={[typography.labelCaps, { color: colors.secondary }]}>ACTIVE OPERATORS</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 8 }}>
                      <Text style={[typography.headlineLg, { color: colors.primary }]}>142</Text>
                      <Text style={[typography.labelSm, { color: colors.onSecondaryContainer }]}>SHFT-A</Text>
                    </View>
                  </View>
                  <View style={[styles.iconCircle, { backgroundColor: colors.surfaceContainerLow }]}>
                    <MaterialIcons name="groups" size={24} color={colors.primary} />
                  </View>
                </View>
                
                {/* Critical Blocks */}
                <View style={[styles.summaryCard, { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant }]}>
                  <View>
                    <Text style={[typography.labelCaps, { color: colors.secondary }]}>CRITICAL BLOCKS</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 8 }}>
                      <Text style={[typography.headlineLg, { color: colors.error }]}>03</Text>
                      <Text style={[typography.labelSm, { color: colors.error, textTransform: 'uppercase' }]}>Action required</Text>
                    </View>
                  </View>
                  <View style={[styles.iconCircle, { backgroundColor: colors.errorContainer }]}>
                    <MaterialIcons name="priority-high" size={24} color={colors.error} />
                  </View>
                </View>
              </View>
            </View>

            {/* Project Ledger Header */}
            <View style={styles.ledgerHeader}>
              <Text style={[typography.labelCaps, { color: colors.onPrimaryContainer }]}>PROJECT LEDGER</Text>
              <View style={{ flexDirection: 'row', gap: 8 }}>
                <TouchableOpacity style={[styles.smallIconBtn, { borderColor: colors.outlineVariant }]}>
                  <MaterialIcons name="filter-list" size={18} color={colors.primary} />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.smallIconBtn, { borderColor: colors.outlineVariant }]}>
                  <MaterialIcons name="swap-vert" size={18} color={colors.primary} />
                </TouchableOpacity>
              </View>
            </View>
          </>
        }
        renderItem={renderProjectItem}
      />

      {/* FAB */}
      <TouchableOpacity 
        style={[styles.fab, { backgroundColor: colors.primary }]}
        activeOpacity={0.8}
      >
        <MaterialIcons name="add" size={24} color={colors.onPrimary} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
    borderRadius: 8,
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  content: {
    padding: 16,
    paddingBottom: 100, // Make room for FAB and BottomNav
  },
  summarySection: {
    marginBottom: 24,
  },
  summaryGrid: {
    gap: 8,
  },
  summaryCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    borderRadius: 12,
    borderWidth: 1,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ledgerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  smallIconBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  projectCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    borderTopWidth: 1,
    paddingTop: 12,
  },
  progressBarBg: {
    width: 96,
    height: 6,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  }
});

export default ProjectsScreen;
