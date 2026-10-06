import TaskTools from './TaskTools';
import RecordPicker from './RecordPicker';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, ActivityIndicator, Alert, Linking, Share } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '../layout/AppHeader';
import { useTheme } from '../../context/ThemeContext';
import { useFeature, featureClient } from '../../hooks/useFeature';
import api from '../../services/api';
import { catalog, labelFor, enumFor, referenceFields, jsonFields } from '../../../../shared/featureData';
import {useIsFocused} from '@react-navigation/native';

const titleOf = item => item.title || item.name || item.user?.name || item.taskId?.title || (item.date?'Plan '+item.date:null) || item.agent || labelFor(item.action || item.entityType || 'Record');
const Choice = ({ values, value, onChange, colors }) => <View style={{flexDirection:'row',flexWrap:'wrap',gap:8}}>{values.map(option=>{
  const item=typeof option==='string'?{label:option||'None',value:option}:option;
  return <TouchableOpacity key={item.value} accessibilityRole="button" accessibilityState={{selected:value===item.value}} onPress={()=>onChange(item.value)} style={{padding:10,borderRadius:8,borderWidth:1,borderColor:colors.outlineVariant,backgroundColor:value===item.value?colors.primary:colors.surface}}><Text style={{color:value===item.value?colors.onPrimary:colors.onSurface}}>{item.label}</Text></TouchableOpacity>;
})}</View>;

export default function FeatureScreen({navigation,route,featureKey,autoEdit}) {
  const focused = useIsFocused();
  const { colors, changeTheme }=useTheme();
  const state=useFeature(featureKey||route?.params?.featureKey,route?.params?.id||route?.params?.taskId||route?.params?.projectId||route?.params?.goalId||route?.params?.task?._id||route?.params?.project?._id||route?.params?.goal?._id);
  const {feature,data,error,loading,busy,act,reload,canEdit,canAdmin}=state;
  const autoOpened=React.useRef('');
  useEffect(()=>{if(!focused)autoOpened.current='';},[focused]);
  useEffect(()=>{if(!focused||!autoEdit||!state.canEdit||!state.data||autoOpened.current===state.workspaceId)return;autoOpened.current=state.workspaceId;state.openForm(featureKey==='create-task'?{...(route?.params?.dueDate?{dueDate:route.params.dueDate}:{}),...(route?.params?.status?{status:route.params.status}:{})}:state.data.items?.[0]);},[focused,autoEdit,state.data,state.workspaceId,featureKey,state.canEdit,route?.params?.dueDate,route?.params?.status]);
  const [viewTasks,setViewTasks]=useState(null);
  useEffect(()=>{if(data?.active){setSession(data.active);setTaskId(data.active.taskId?._id||data.active.taskId);}},[data?.active]);
  const [query,setQuery]=useState(''),[results,setResults]=useState([]),[searchError,setSearchError]=useState('');
  const [email,setEmail]=useState(''),[inviteRole,setInviteRole]=useState('Viewer'),[selected,setSelected]=useState([]),[taskId,setTaskId]=useState(''),[session,setSession]=useState(null),[notes,setNotes]=useState(''),[profile,setProfile]=useState(null);
  useEffect(()=>setProfile(data?.profile||null),[data?.profile]);
  useEffect(()=>{setViewTasks(null);setSelected([]);setTaskId('');setSession(null);setResults([]);setQuery('');},[feature?.key,state.workspaceId,focused]);
  useEffect(()=>{
    if(!focused||feature?.mode!=='search')return;
    const controller=new AbortController();if(!query.trim()){setResults([]);return;}
    const timer=setTimeout(()=>featureClient.search(query,controller.signal).then(result=>{setSearchError('');setResults(Object.entries(result).flatMap(([type,list])=>list.map(item=>({...item,type}))));}).catch(err=>{if(!controller.signal.aborted)setSearchError(err.response?.data?.message||'Search failed');}),250);
    return()=>{clearTimeout(timer);controller.abort();};
  },[feature?.mode,query,focused]);
  const text={color:colors.onSurface,fontSize:15,lineHeight:22};
  const input={borderWidth:1,borderColor:colors.outlineVariant,borderRadius:8,padding:12,color:colors.onSurface,backgroundColor:colors.surface};
  const card={borderWidth:1,borderColor:colors.outlineVariant,borderRadius:12,padding:16,gap:12,backgroundColor:colors.surfaceContainerLowest};
  const button=(label,callback,disabled=false)=><TouchableOpacity accessibilityRole="button" accessibilityState={{disabled}} disabled={disabled} onPress={callback} style={{padding:12,borderWidth:1,borderColor:colors.outlineVariant,borderRadius:8,opacity:disabled?.5:1,alignSelf:'flex-start'}}><Text style={{...text,fontWeight:'600'}}>{label}</Text></TouchableOpacity>;
  if(!feature)return <SafeAreaView style={{flex:1,backgroundColor:colors.background}}><AppHeader title="FEATURE" showBack navigation={navigation}/><Text style={text}>Feature not found.</Text></SafeAreaView>;
  const mode=feature.mode;
  const editable=!!feature.fields.length&&canEdit;
  const items=(data?.items||[]).filter(item=>mode==='priorities'||mode==='reschedule'?['urgent','high'].includes(item.priority)&&!['completed','archived'].includes(item.status):true).filter(item=>mode==='search'||!query||JSON.stringify(item).toLowerCase().includes(query.toLowerCase()));
  const setField=(field,value)=>state.setForm(current=>({...current,[field]:value}));
  const choices=(values,value,onChange)=><Choice values={values} value={value} onChange={onChange} colors={colors}/>;
  const jsonControl=field=>{
    let value;try{value=JSON.parse(state.form[field]||'{}');}catch{value={};}
    if(field==='condition')return <View style={{gap:10}}>{choices(['','status','priority','title','tags','energyLevel'],value.field||'',fieldValue=>setField(field,JSON.stringify({...value,field:fieldValue})))}{choices(['equals','not_equals','contains'],value.operator||'equals',operator=>setField(field,JSON.stringify({...value,operator})))}<TextInput accessibilityLabel="Condition value" style={input} value={value.value||''} onChangeText={conditionValue=>setField(field,JSON.stringify({...value,value:conditionValue}))}/></View>;
    if(field==='filters')return <View style={{gap:10}}>{['status','priority'].map(key=><View key={key}><Text style={text}>{labelFor(key)}</Text>{choices(['',...enumFor(key,'tasks')],value[key]||'',nextValue=>{const next={...value};if(nextValue)next[key]=nextValue;else delete next[key];setField(field,JSON.stringify(next));})}</View>)}</View>;
    if(field==='sort')return choices(['','dueDate','createdAt','orderIndex','priority'],Object.keys(value)[0]||'',next=>setField(field,JSON.stringify(next?{[next]:1}:{})));
    return null;
  };
  const saveProfile=()=>act(async()=>{
    const payload=mode==='profile'?{name:profile.name,avatar:profile.avatar,timezone:profile.timezone}:{preferences:profile.preferences};
    const {data}=await api.put('/users/profile',payload);state.updateUser(data);await changeTheme(data.preferences?.theme||'system');
  });
  const openResult=item=>navigation.navigate(item.type==='tasks'?'TaskDetail':item.type==='projects'?'ProjectDetail':item.type==='goals'?'GoalDetail':'Docs',{id:item._id,taskId:item._id,projectId:item._id,goalId:item._id});
  return <SafeAreaView style={{flex:1,backgroundColor:colors.background}} edges={['top','left','right']}><AppHeader title={feature.title.toUpperCase()} showBack navigation={navigation}/>
    <FlatList data={mode==='search'?[]:items} keyExtractor={item=>item._id||item.user?._id} initialNumToRender={6} maxToRenderPerBatch={6} windowSize={5} contentContainerStyle={{padding:20,paddingBottom:100,gap:18}} keyboardShouldPersistTaps="handled" ListHeaderComponent={<View style={{gap:18}}>
      <Text style={{...text,fontSize:28,lineHeight:34,fontWeight:'700'}}>{feature.title}</Text>
      <View style={{flexDirection:'row',gap:10,flexWrap:'wrap'}}>{button('All features',()=>navigation.navigate('FeatureIndex'))}{button('Refresh',reload,busy||loading)}{editable&&button('Create',()=>state.openForm(),busy)}</View>
      {(error||searchError)&&<View accessibilityRole="alert" style={card}><Text style={{...text,color:colors.error}}>{error||searchError}</Text>{button('Retry',reload)}</View>}
      {loading&&<ActivityIndicator accessibilityLabel="Loading data" color={colors.primary}/>}
      {state.editing&&<View style={card}><Text style={{...text,fontWeight:'700'}}>{state.editing._id?'Edit':'Create'} {feature.title}</Text>
        {feature.fields.map(field=>{
          const values=enumFor(field,mode),related=referenceFields[field];
          return <View key={field} style={{gap:8}}><Text style={text}>{labelFor(field)}</Text>{jsonFields.has(field)?jsonControl(field):related?<RecordPicker label={labelFor(field)} options={(state.references[related]||[]).filter(item=>item._id!==state.editing?._id).map(item=>({label:titleOf(item),value:item._id}))} value={state.form[field]} onChange={value=>setField(field,value)}/>:
            ['linkedTasks','attendees'].includes(field)?<RecordPicker multiple label={labelFor(field)} options={(state.references[field==='linkedTasks'?'tasks':'members']||[]).map(item=>({label:titleOf(item),value:item._id}))} value={state.form[field].split(',').map(v=>v.trim()).filter(Boolean)} onChange={values=>setField(field,values.join(', '))}/>:
            values?choices(values,state.form[field],value=>setField(field,value)):<TextInput accessibilityLabel={labelFor(field)} style={input} multiline={['description','content','notes'].includes(field)} keyboardType={['amount','rating','timeEstimate'].includes(field)?'decimal-pad':'default'} maxLength={['title','name'].includes(field)?200:20000} value={state.form[field]} onChangeText={value=>setField(field,value)} placeholder={/Date|Time|^date$/.test(field)?'YYYY-MM-DD or ISO date and time':''} placeholderTextColor={colors.onSurfaceVariant}/>}</View>;
        })}<View style={{flexDirection:'row',gap:10}}>{button('Save',state.save,busy)}{button('Cancel',()=>state.setEditing(null),busy)}</View></View>}
      {data?.metrics&&<View style={card}>{Object.entries(data.metrics).map(([key,value])=><View key={key}><Text style={{...text,color:colors.onSurfaceVariant}}>{labelFor(key)}</Text><Text style={{...text,fontSize:22,fontWeight:'600'}}>{String(value)}</Text></View>)}</View>}
      {['profile','preferences'].includes(mode)&&profile&&<View style={card}>{mode==='profile'?['name','avatar','timezone'].map(field=><View key={field}><Text style={text}>{labelFor(field)}</Text><TextInput accessibilityLabel={labelFor(field)} style={input} value={profile[field]||''} onChangeText={value=>setProfile({...profile,[field]:value})}/></View>):<>
        {Object.entries({theme:['system','light','dark'],notifications:['light','normal','strict']}).map(([field,values])=><View key={field}><Text style={text}>{labelFor(field)}</Text>{choices(values,profile.preferences?.[field]||values[0],value=>setProfile({...profile,preferences:{...profile.preferences,[field]:value}}))}</View>)}
        {['start','end'].map(field=><View key={field}><Text style={text}>Work hours {field}</Text><TextInput accessibilityLabel={'Work hours '+field} style={input} value={profile.preferences?.workHours?.[field]||''} placeholder="HH:mm" placeholderTextColor={colors.onSurfaceVariant} onChangeText={value=>setProfile({...profile,preferences:{...profile.preferences,workHours:{...profile.preferences.workHours,[field]:value}}})}/></View>)}</>}{button('Save preferences',saveProfile,busy)}</View>}
      {mode==='security'&&data&&<View style={card}><Text style={text}>Email verified: {state.user.email}</Text>{button('Send password reset email',()=>act(()=>state.resetPassword(state.user.email)),busy)}{button('Manage sessions',()=>navigation.navigate('DeviceManagement'))}{button('Revoke all sessions',()=>act(async()=>{await api.post('/account/revoke-sessions');await state.logout();}),busy)}<Text style={text}>Sign in within the last five minutes before revoking all sessions. Multi-factor settings are managed by your authentication provider.</Text></View>}
      {mode==='members'&&data&&canAdmin&&<View style={card}><Text style={text}>Add a registered member</Text><TextInput accessibilityLabel="Member email" style={input} keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail}/>{choices(['Viewer','Editor','Admin'],inviteRole,setInviteRole)}{button('Add member',()=>act(async()=>{await api.post('/workspaces/'+state.workspaceId+'/members',{email,role:inviteRole});setEmail('');}),busy||!email)}</View>}
      {mode==='billing'&&data&&<View style={card}><Text style={text}>Current plan: {data.profile?.subscriptionPlan||'free'} · {data.profile?.subscriptionStatus||'none'}</Text>{data.billing.plans.map(plan=><View key={plan.plan} style={{gap:8}}><Text style={text}>{labelFor(plan.plan)} · {plan.available?new Intl.NumberFormat(undefined,{style:'currency',currency:plan.currency}).format(plan.amount/100)+' / '+plan.interval:'Unavailable until billing is configured'}</Text>{button('Subscribe',()=>act(async()=>{const {data}=await api.post('/stripe/create-checkout-session',{plan:plan.plan});await Linking.openURL(data.url);}),busy||!plan.available)}</View>)}</View>}
      {mode==='integrations'&&data&&<View style={card}>{Object.entries(data.workspace.integrations||{}).map(([name,connected])=><Text style={text} key={name}>{labelFor(name)}: {connected?'Connection preference stored; provider verification required':'No provider connection configured'}</Text>)}</View>}
      {mode==='health'&&data&&<View style={card}>{Object.entries(data.health).map(([key,value])=><Text style={text} key={key}>{labelFor(key)}: {typeof value==='boolean'?(value?'Configured':'Not configured'):value}</Text>)}</View>}
      {mode==='export'&&data&&<View style={card}><Text style={text}>Share your workspace records as a JSON archive.</Text>{button(busy?'Preparing archive…':'Share JSON archive',()=>act(async()=>{const {data:archive}=await api.get('/account/export',{params:{workspaceId:state.workspaceId}});await Share.share({message:JSON.stringify(archive,null,2),title:'Mandate workspace export'});}),busy)}</View>}
      {mode==='search'&&<TextInput accessibilityLabel="Search workspace data" style={input} placeholder="Search tasks, projects, goals, documents" placeholderTextColor={colors.onSurfaceVariant} value={query} onChangeText={setQuery} maxLength={100}/>}
      {mode==='search'&&results.map(item=><TouchableOpacity key={item.type+item._id} style={card} onPress={()=>openResult(item)}><Text style={text}>{titleOf(item)}</Text><Text style={{...text,color:colors.onSurfaceVariant}}>{item.type}</Text></TouchableOpacity>)}
      {mode==='parse-task'&&data&&<View style={card}><TextInput accessibilityLabel="Task description" style={input} value={query} onChangeText={setQuery} placeholder="Describe a task" placeholderTextColor={colors.onSurfaceVariant}/>{button('Parse and create task',()=>act(async()=>{const parsed=await api.post('/ai/parse-task',{input:query});await api.post('/tasks',{...parsed.data,source:undefined,workspaceId:state.workspaceId});setQuery('');}),busy||!query||!canEdit)}</View>}
      {mode==='focus'&&data&&<View style={card}><Text style={text}>Select a task</Text>{choices([{label:'Select task',value:''},...items.map(t=>({label:t.title,value:t._id}))],taskId,setTaskId)}<TextInput accessibilityLabel="Focus notes" style={input} value={notes} onChangeText={setNotes} multiline placeholder="Session notes" placeholderTextColor={colors.onSurfaceVariant}/>{button(session?'Finish and save session':'Start focus session',()=>act(async()=>{if(session){await api.put('/productivity/focus/'+session._id,{notes});setSession(null);}else{const {data}=await api.post('/productivity/focus',{taskId});setSession(data);}}),busy||!canEdit||!taskId)}{session&&<Text style={text}>Started {new Date(session.startedAt).toLocaleString()}. Elapsed time is recorded when you finish.</Text>}</View>}
      {mode==='planning'&&data&&<View style={card}><Text style={text}>{data.plan.locked?'Today’s plan is saved with '+data.plan.tasks.length+' tasks.':'No plan saved for today.'}</Text>{button('Save selected tasks as today’s plan',()=>act(()=>api.post('/planning/lock',{taskIds:selected,date:data.plan.date,workspaceId:state.workspaceId})),busy||!canEdit||!selected.length)}</View>}
      {(items.length>0||query)&&mode!=='search'&&<TextInput accessibilityLabel="Filter this page" style={input} value={query} onChangeText={setQuery} placeholder="Filter this page" placeholderTextColor={colors.onSurfaceVariant}/>}
      </View>} renderItem={({item})=><View style={card} key={item._id||item.user?._id}>
        {mode==='planning'&&<TouchableOpacity accessibilityRole="checkbox" accessibilityState={{checked:selected.includes(item._id)}} onPress={()=>setSelected(selected.includes(item._id)?selected.filter(id=>id!==item._id):[...selected,item._id])}><Text style={text}>{selected.includes(item._id)?'☑ Selected':'☐ Select task'}</Text></TouchableOpacity>}
        <Text style={{...text,fontWeight:'700',fontSize:18}}>{titleOf(item)}</Text><Text style={{...text,color:colors.onSurfaceVariant}}>{item.status||item.role||item.period||item.action||''}{item.createdAt?' · '+new Date(item.createdAt).toLocaleString():''}</Text>
        {(item.description||item.content||item.notes||item.message)&&<Text style={text}>{item.description||item.content||item.notes||item.message}</Text>}
        {mode==='mandates'&&<Text style={text}>{(item.tasks||[]).map(t=>t?.title).filter(Boolean).join(', ')||'No remaining tasks in this plan'}</Text>}
        {item.amount!=null&&<Text style={text}>{new Intl.NumberFormat(undefined,{style:'currency',currency:item.currency}).format(item.amount)}</Text>}
        {item.durationMinutes!=null&&<Text style={text}>{item.durationMinutes.toFixed(1)} minutes{item.endedAt?' · completed':' · in progress'}</Text>}
        {mode==='task-detail'&&state.selectedId&&<TaskTools task={item} canEdit={canEdit} onChange={reload}/>}
        {mode==='sessions'&&<Text style={text}>Last API activity: {new Date(item.lastSeenAt).toLocaleString()}{item.current?' · current session':''}</Text>}
        <View style={{flexDirection:'row',flexWrap:'wrap',gap:10}}>
          {editable&&button('Edit',()=>state.openForm(item),busy)}{editable&&button('Delete',()=>Alert.alert('Delete record?','This removes the record.',[{text:'Cancel',style:'cancel'},{text:'Delete',style:'destructive',onPress:()=>state.remove(item._id)}]),busy)}
          {['tasks','task-detail','priorities','reschedule','breakdown','focus','planning'].includes(mode)&&button('Open task',()=>navigation.navigate('TaskDetail',{taskId:item._id,id:item._id}))}
          {['task-templates','workspace-templates'].includes(feature.key)&&button(feature.key==='task-templates'?'Create task from template':'Create project and task from template',()=>act(()=>api.post('/features/'+feature.key+'/'+item._id+'/apply')),busy||!canEdit)}
          {mode==='saved-views'&&button('Apply saved view',()=>act(async()=>{const items=await featureClient.all('/productivity/saved-views/'+item._id+'/tasks',{workspaceId:state.workspaceId});setViewTasks(items);}),busy)}
          {mode==='focus-log'&&!item.endedAt&&button('Finish session',()=>act(()=>api.put('/productivity/focus/'+item._id,{notes:item.notes})),busy||!canEdit)}
          {mode==='notifications'&&button(item.isRead?'Read':'Mark read',()=>act(()=>api.patch('/notifications/'+item._id+'/read')),busy||item.isRead)}
          {mode==='sessions'&&button(item.revokedAt?'Revoked':item.current?'Revoke current session':'Revoke session',()=>act(()=>api.delete('/account/sessions/'+item._id)),busy||!!item.revokedAt)}
          {mode==='breakdown'&&button('Generate subtasks',()=>act(()=>api.post('/ai/task-breakdown',{taskId:item._id})),busy||!canEdit)}
          {mode==='reschedule'&&button('Move due date to tomorrow',()=>act(()=>api.put('/tasks/'+item._id,{dueDate:new Date(Date.now()+86400000).toISOString()})),busy||!canEdit)}
        </View>
        {mode==='members'&&canAdmin&&choices(['Viewer','Editor','Admin'],item.role,role=>act(()=>api.put('/workspaces/'+state.workspaceId+'/members/'+item.user._id,{role})))}
        {mode==='members'&&state.role==='Owner'&&button('Transfer ownership',()=>Alert.alert('Transfer ownership?','The selected member will become the workspace owner.',[{text:'Cancel',style:'cancel'},{text:'Transfer',onPress:()=>act(()=>api.put('/workspaces/'+state.workspaceId+'/owner',{userId:item.user._id}))}]),busy)}
      </View>} ListFooterComponent={<View style={{gap:18}}>
      {data?.pagination&&<View style={{flexDirection:'row',alignItems:'center',gap:12}}>{button('Previous',()=>state.setPage(state.page-1),busy||loading||state.page===1)}<Text style={text}>Page {state.page}</Text>{button('Next',()=>state.setPage(state.page+1),busy||loading||!data.pagination.hasNext)}</View>}
      {!loading&&!error&&data&&items.length===0&&!['profile','preferences','security','billing','integrations','health','export','search'].includes(mode)&&<Text style={text}>No records yet.{editable?' Create your first record to get started.':''}</Text>}
      {viewTasks&&<View style={card}><Text style={text}>Saved view results: {viewTasks.length} tasks</Text>{viewTasks.map(task=><TouchableOpacity key={task._id} onPress={()=>navigation.navigate('TaskDetail',{taskId:task._id})}><Text style={text}>{task.title} / {task.status}</Text></TouchableOpacity>)}</View>}
      {mode==='shortcuts'&&<Text style={text}>Use the application navigation to open your tasks and projects. Keyboard shortcuts are provided by your operating system.</Text>}
      </View>}/>
  </SafeAreaView>;
}

export function FeatureIndexScreen({navigation}) {
  const {colors}=useTheme();
  return <SafeAreaView style={{flex:1,backgroundColor:colors.background}}><AppHeader title="ALL FEATURES" showBack navigation={navigation}/><FlatList data={catalog} keyExtractor={feature=>feature.key} initialNumToRender={10} maxToRenderPerBatch={8} windowSize={5} contentContainerStyle={{padding:20,gap:12}} renderItem={({item:feature})=><TouchableOpacity key={feature.key} accessibilityRole="button" onPress={()=>navigation.navigate('Feature',{featureKey:feature.key})} style={{borderWidth:1,borderColor:colors.outlineVariant,borderRadius:12,padding:16}}><Text style={{color:colors.onSurface,fontSize:16}}>{feature.title}</Text></TouchableOpacity>}/></SafeAreaView>;
}
