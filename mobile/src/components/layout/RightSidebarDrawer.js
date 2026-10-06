import React, {useEffect, useMemo, useState} from 'react';
import {Alert, FlatList, Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {useAuth} from '../../context/AuthContext';
import {useTheme} from '../../context/ThemeContext';
import {useWorkspace} from '../../context/WorkspaceContext';
import {useDrawerActions} from '../../context/DrawerContext';
import {navigate, navigationRef} from '../../navigation/navigationRef';

const tabs = new Set(['Dashboard','Today','Kanban','Calendar']);
const mainItems = [
  {screen:'Dashboard',icon:'space-dashboard',label:'Overview'},
  {screen:'Today',icon:'event-available',label:'Today'},
  {screen:'Kanban',icon:'view-kanban',label:'Board'},
  {screen:'Calendar',icon:'calendar-today',label:'Calendar'},
  {screen:'Backlog',icon:'checklist',label:'All tasks'},
  {screen:'ProjectsMain',icon:'folder-open',label:'Projects'},
  {screen:'Inbox',icon:'inbox',label:'Inbox'},
];
const tools = [
  {screen:'Analytics',icon:'insights',label:'Analytics'},
  {screen:'TeamDashboard',icon:'people-outline',label:'Team'},
  {screen:'DailyPlanning',icon:'edit-calendar',label:'Daily plan'},
  {screen:'FocusSummary',icon:'timelapse',label:'Focus stats'},
  {screen:'FocusMode',icon:'center-focus-strong',label:'Focus mode'},
  {screen:'AutomationRules',icon:'bolt',label:'Automation'},
  {screen:'SavedViews',icon:'collections-bookmark',label:'Saved views'},
  {screen:'MonthlyReview',icon:'history',label:'Reviews'},
  {screen:'GoalProgressTracking',icon:'timeline',label:'Goal progress'},
  {screen:'KeyboardShortcuts',icon:'keyboard',label:'Shortcuts'},
  {screen:'Billing',icon:'credit-card',label:'Billing'},
  ...[
    ['sprint-board','view-timeline','Sprints'],['workstreams','splitscreen','Workstreams'],
    ['customer-journey','group-work','Customers'],['support-desk','support-agent','Support'],
    ['finance-overview','account-balance','Finance'],['executive-summary','leaderboard','Executive summary'],
    ['workspace-overview','apps','Workspace'],['status-center','monitor-heart','Status'],
  ].map(([featureKey,icon,label]) => ({screen:'Feature',featureKey,icon,label})),
];

export default function RightSidebarDrawer() {
  const {closeDrawer} = useDrawerActions();
  const {user, logout} = useAuth();
  const {activeWorkspace} = useWorkspace();
  const {colors} = useTheme();
  const [query,setQuery] = useState('');
  const [expanded,setExpanded] = useState(false);
  const [current,setCurrent] = useState(() => navigationRef.getCurrentRoute());
  useEffect(() => navigationRef.addListener('state', () => setCurrent(navigationRef.getCurrentRoute())), []);
  const items = useMemo(() => {
    const text = query.trim().toLowerCase();
    return (text || expanded ? [...mainItems,...tools] : mainItems).filter(item => !text || item.label.toLowerCase().includes(text));
  }, [expanded,query]);
  const go = (screen, featureKey) => {
    closeDrawer();
    if (tabs.has(screen)) navigate('Tabs',{screen});
    else navigate(screen, featureKey ? {featureKey} : undefined);
  };
  const row = (label,icon,onPress,selected=false) => <Pressable accessibilityRole="button" accessibilityLabel={label} accessibilityState={{selected}} onPress={onPress} style={({pressed}) => [styles.row,{backgroundColor:selected?colors.surfaceContainerHighest:pressed?colors.surfaceContainer:'transparent'}]}>
    <MaterialIcons name={icon} size={22} color={selected?colors.primary:colors.onSurfaceVariant}/>
    <Text numberOfLines={1} style={[styles.label,{color:colors.onSurface,fontFamily:selected?'HankenGrotesk-SemiBold':'HankenGrotesk-Medium'}]}>{label}</Text>
    {selected && <View style={[styles.dot,{backgroundColor:colors.primary}]}/>}
  </Pressable>;
  return <View style={[styles.drawer,{backgroundColor:colors.surfaceContainerLowest}]}>
    <View style={styles.header}><View style={{flex:1}}><Text style={[styles.brand,{color:colors.onSurface}]}>Mandate</Text><Text numberOfLines={1} style={[styles.caption,{color:colors.onSurfaceVariant}]}>{activeWorkspace?.name || 'Your workspace'}</Text></View>
      <Pressable accessibilityRole="button" accessibilityLabel="Close navigation" onPress={closeDrawer} style={styles.iconButton}><MaterialIcons name="close" size={23} color={colors.onSurfaceVariant}/></Pressable>
    </View>
    <Pressable accessibilityRole="button" accessibilityLabel="Create new task" onPress={()=>go('CreateTask')} style={({pressed})=>[styles.newTask,{backgroundColor:colors.surfaceContainerHighest,opacity:pressed?0.7:1}]}><MaterialIcons name="edit-square" size={23} color={colors.onSurface}/><Text style={[styles.label,{color:colors.onSurface}]}>New task</Text></Pressable>
    <View style={[styles.search,{backgroundColor:colors.surfaceContainerLow}]}><MaterialIcons name="search" size={20} color={colors.onSurfaceVariant}/><TextInput accessibilityLabel="Find a navigation item" placeholder="Find a page" placeholderTextColor={colors.onSurfaceVariant} value={query} onChangeText={setQuery} style={[styles.searchInput,{color:colors.onSurface}]} autoCorrect={false}/>{!!query&&<Pressable accessibilityRole="button" accessibilityLabel="Clear navigation search" onPress={()=>setQuery('')} style={styles.clear}><MaterialIcons name="close" size={18} color={colors.onSurfaceVariant}/></Pressable>}</View>
    <FlatList data={items} keyExtractor={item=>item.featureKey||item.screen} initialNumToRender={8} maxToRenderPerBatch={8} windowSize={3} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} contentContainerStyle={styles.list}
      renderItem={({item})=>row(item.label,item.icon,()=>go(item.screen,item.featureKey),current?.name===item.screen&&(!item.featureKey||current?.params?.featureKey===item.featureKey))}
      ListEmptyComponent={<Text style={[styles.empty,{color:colors.onSurfaceVariant}]}>No matching pages</Text>}
      ListFooterComponent={<View style={{marginTop:8}}>{!query&&row(expanded?'Fewer tools':'More tools',expanded?'expand-less':'expand-more',()=>setExpanded(value=>!value))}{row('All features','apps',()=>go('FeatureIndex'))}{row('Search workspace','manage-search',()=>go('GlobalSearch'))}</View>}/>
    <View style={[styles.footer,{borderTopColor:colors.outlineVariant}]}>
      <Pressable accessibilityRole="button" accessibilityLabel="Open profile settings" onPress={()=>go('ProfileSettings')} style={({pressed})=>[styles.account,{opacity:pressed?0.7:1}]}><View style={[styles.avatar,{backgroundColor:colors.surfaceContainerHighest}]}><Text style={[styles.initial,{color:colors.onSurface}]}>{(user?.name||user?.email||'?').slice(0,1).toUpperCase()}</Text></View><View style={{flex:1}}><Text numberOfLines={1} style={[styles.accountName,{color:colors.onSurface}]}>{user?.name||'Account'}</Text><Text numberOfLines={1} style={[styles.caption,{color:colors.onSurfaceVariant}]}>{user?.email}</Text></View></Pressable>
      <Pressable accessibilityRole="button" accessibilityLabel="Open settings" onPress={()=>go('SettingsMain')} style={styles.iconButton}><MaterialIcons name="settings" size={23} color={colors.onSurfaceVariant}/></Pressable>
      <Pressable accessibilityRole="button" accessibilityLabel="Sign out" onPress={()=>Alert.alert('Sign out?','You can sign in again at any time.',[{text:'Cancel',style:'cancel'},{text:'Sign out',onPress:async()=>{closeDrawer();try{await logout();}catch{Alert.alert('Sign out','Could not sign out. Please try again.');}}}])} style={styles.iconButton}><MaterialIcons name="logout" size={21} color={colors.onSurfaceVariant}/></Pressable>
    </View>
  </View>;
}
const styles=StyleSheet.create({
  drawer:{flex:1},header:{flexDirection:'row',alignItems:'center',paddingHorizontal:20,paddingTop:20,paddingBottom:18},
  brand:{fontFamily:'HankenGrotesk-Bold',fontSize:25,letterSpacing:-0.6},caption:{fontFamily:'HankenGrotesk-Regular',fontSize:12,marginTop:3},
  iconButton:{width:44,height:44,alignItems:'center',justifyContent:'center',borderRadius:22},
  newTask:{marginHorizontal:12,borderRadius:24,minHeight:52,paddingHorizontal:18,flexDirection:'row',alignItems:'center',gap:14},
  search:{marginHorizontal:16,marginTop:14,marginBottom:10,borderRadius:16,minHeight:44,paddingHorizontal:12,flexDirection:'row',alignItems:'center',gap:8},
  searchInput:{flex:1,minHeight:44,fontFamily:'HankenGrotesk-Regular',fontSize:14},clear:{minWidth:32,minHeight:44,justifyContent:'center',alignItems:'center'},
  list:{paddingHorizontal:12,paddingBottom:16},row:{minHeight:48,borderRadius:24,paddingHorizontal:16,flexDirection:'row',alignItems:'center',gap:14,marginBottom:3},
  label:{flex:1,fontFamily:'HankenGrotesk-Medium',fontSize:16},dot:{width:5,height:5,borderRadius:3},empty:{padding:16},
  footer:{flexDirection:'row',alignItems:'center',paddingHorizontal:12,paddingVertical:12,borderTopWidth:StyleSheet.hairlineWidth},
  account:{flex:1,minHeight:48,flexDirection:'row',alignItems:'center',gap:10},avatar:{width:36,height:36,borderRadius:18,alignItems:'center',justifyContent:'center'},initial:{fontFamily:'HankenGrotesk-SemiBold',fontSize:17},accountName:{fontFamily:'HankenGrotesk-SemiBold',fontSize:14},
});
