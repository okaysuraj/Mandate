import {useDataStore} from "../../store/useDataStore";
import {useWorkspace} from "../../context/WorkspaceContext";
import {useAuth} from "../../context/AuthContext";
import api from "../../services/api";
import {Alert} from "react-native";
import React, {useState} from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, ScrollView } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useTheme } from "../../context/ThemeContext";
import { useDrawerActions } from "../../context/DrawerContext";

const AppHeader = ({ title, showBack = false, navigation }) => {
  const { colors, isDark, changeTheme } = useTheme();
  const {user,updateUser}=useAuth();
  const {error:workspaceError,workspaces,activeWorkspace,switchWorkspace,createWorkspace}=useWorkspace();
  const [picker,setPicker]=useState(false),[name,setName]=useState(''),[busy,setBusy]=useState(false);
  const choose=async id=>{setBusy(true);try{await switchWorkspace(id);setPicker(false);}catch(error){Alert.alert('Workspace',error.response?.data?.message||'Could not switch workspace');}finally{setBusy(false);}};
  const create=async()=>{if(!name.trim())return;setBusy(true);try{const workspace=await createWorkspace(name.trim());await switchWorkspace(workspace._id);setName('');setPicker(false);}catch(error){Alert.alert('Workspace',error.response?.data?.message||'Could not create workspace');}finally{setBusy(false);}};
  const dataError=useDataStore(state=>state.error);
  const toggleTheme=async()=>{const theme=isDark?'light':'dark';try{if(user){const {data}=await api.put('/users/profile',{preferences:{theme}});updateUser(data);}await changeTheme(theme);}catch(error){Alert.alert('Theme preference',error.response?.data?.message||'Could not save theme');}};
  const { openDrawer } = useDrawerActions();

  return (
    <View><View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.outlineVariant }]}>
      {/* Left: Brand or Back Button */}
      <View style={styles.headerLeft}>
        <TouchableOpacity accessibilityRole="button" accessibilityLabel="Open navigation" onPress={openDrawer} style={styles.navigationButton} activeOpacity={0.7}>
          <MaterialIcons name="menu" size={24} color={colors.onSurface} />
        </TouchableOpacity>
        {showBack ? (
          <TouchableOpacity
            onPress={() => navigation?.goBack()}
            style={styles.iconBtn}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <MaterialIcons name="arrow-back" size={22} color={colors.primary} />
          </TouchableOpacity>
        ) : null}

        <View style={styles.brandRow}>
          <View style={[styles.brandDot, { backgroundColor: colors.primary }]} />
          <Text style={[styles.brandText, { color: colors.primary }]}>
            {title ? title.toUpperCase() : "MANDATE"}
          </Text>
        </View>
      </View>

      <TouchableOpacity accessibilityRole="button" accessibilityLabel="Select workspace" disabled={busy} onPress={()=>setPicker(true)} style={{padding:8,maxWidth:100}}><Text numberOfLines={1} style={{color:colors.primary,fontSize:12}}>{activeWorkspace?.name||'Workspace'}</Text></TouchableOpacity>
      {/* Right Controls: Search, Theme Toggle, and Right Sidebar Menu Button */}
      <View style={styles.headerRight}>
        {/* Search */}
        <TouchableOpacity
          onPress={() => navigation?.navigate("GlobalSearch")}
          style={[styles.iconBtn, { backgroundColor: colors.surfaceContainerLow, borderColor: colors.outlineVariant }]}
          hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
        >
          <MaterialIcons name="search" size={18} color={colors.secondary} />
        </TouchableOpacity>

        {/* Theme Toggle (Dark / Light) */}
        <TouchableOpacity
          onPress={toggleTheme}
          style={[styles.iconBtn, { backgroundColor: colors.surfaceContainerLow, borderColor: colors.outlineVariant }]}
          hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
        >
          <MaterialIcons
            name={isDark ? "light-mode" : "dark-mode"}
            size={18}
            color={colors.primary}
          />
        </TouchableOpacity>

      </View>
    </View><Modal visible={picker} transparent animationType="slide" onRequestClose={()=>setPicker(false)}><View style={{flex:1,justifyContent:'center',backgroundColor:'rgba(0,0,0,0.7)',padding:24}}><View style={{backgroundColor:colors.surface,padding:20,borderRadius:12,gap:16}}><Text style={{color:colors.onSurface,fontSize:20}}>Workspaces</Text><ScrollView style={{maxHeight:300}}>{workspaces.map(workspace=><TouchableOpacity key={workspace._id} disabled={busy} onPress={()=>choose(workspace._id)} style={{padding:12}}><Text style={{color:colors.primary}}>{workspace.name}{workspace._id===activeWorkspace?._id?' (active)':''}</Text></TouchableOpacity>)}</ScrollView><TextInput accessibilityLabel="New workspace name" placeholder="New workspace name" placeholderTextColor={colors.onSurfaceVariant} value={name} onChangeText={setName} maxLength={200} style={{color:colors.onSurface,padding:12,borderWidth:1,borderColor:colors.outlineVariant}}/><TouchableOpacity disabled={busy||!name.trim()} onPress={create}><Text style={{color:colors.primary}}>Create workspace</Text></TouchableOpacity><TouchableOpacity onPress={()=>setPicker(false)}><Text style={{color:colors.primary}}>Close</Text></TouchableOpacity></View></View></Modal>{(workspaceError||dataError)&&<Text accessibilityRole="alert" style={{color:colors.error,padding:12}}>{workspaceError||dataError}</Text>}</View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    zIndex: 10,
  },
  headerLeft: {
    flex: 1,
    minWidth: 0,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  brandRow: {
    flexShrink: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  brandDot: {
    width: 6,
    height: 6,
    borderRadius: 2,
  },
  brandText: {
    flexShrink: 1,
    fontFamily: "HankenGrotesk-Bold",
    fontSize: 18,
    letterSpacing: -0.5,
    textTransform: "uppercase",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  iconBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  menuBtn: {
    width: 34,
    height: 34,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  navigationButton: {width: 44, height: 44, alignItems:'center', justifyContent:'center', marginLeft: -8},
});

export default AppHeader;
