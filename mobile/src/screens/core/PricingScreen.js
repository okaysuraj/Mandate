import React,{useEffect,useState} from 'react';
import {View,Text,ScrollView,TouchableOpacity,Linking,ActivityIndicator} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTheme} from '../../context/ThemeContext';
import {useAuth} from '../../context/AuthContext';
import api from '../../services/api';
export default function PricingScreen({navigation}){
 const {colors}=useTheme(),{user}=useAuth(),[plans,setPlans]=useState(null),[error,setError]=useState(''),[busy,setBusy]=useState(false);
 useEffect(()=>{const c=new AbortController();api.get('/stripe/plans',{signal:c.signal}).then(r=>setPlans(r.data.plans)).catch(e=>{if(!c.signal.aborted)setError(e.response?.data?.message||'Could not load pricing');});return()=>c.abort();},[]);
 const subscribe=async plan=>{setBusy(true);setError('');try{const {data}=await api.post('/stripe/create-checkout-session',{plan});await Linking.openURL(data.url);}catch(e){setError(e.response?.data?.message||'Checkout unavailable');}finally{setBusy(false);}};
 return <SafeAreaView style={{flex:1,backgroundColor:colors.background}}><ScrollView contentContainerStyle={{padding:24,gap:20}}><TouchableOpacity onPress={()=>navigation.goBack()}><Text style={{color:colors.primary}}>Back</Text></TouchableOpacity><Text style={{color:colors.onSurface,fontSize:30,fontWeight:'700'}}>Plans</Text>{error&&<Text accessibilityRole="alert" style={{color:colors.error}}>{error}</Text>}{!plans&&!error&&<ActivityIndicator/>}{plans?.map(p=><View key={p.plan} style={{padding:20,gap:16,borderWidth:1,borderColor:colors.outlineVariant}}><Text style={{color:colors.onSurface,fontSize:20}}>{p.plan}</Text><Text style={{color:colors.onSurface}}>{p.available?new Intl.NumberFormat(undefined,{style:'currency',currency:p.currency}).format(p.amount/100)+' / '+p.interval:'Billing is not configured for this plan.'}</Text><TouchableOpacity disabled={busy||!!user&&!p.available} onPress={()=>user?subscribe(p.plan):navigation.navigate('Register')}><Text style={{color:colors.primary}}>{user?'Subscribe':'Create an account'}</Text></TouchableOpacity></View>)}</ScrollView></SafeAreaView>;
}
