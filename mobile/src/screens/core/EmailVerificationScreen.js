import React,{useState} from 'react';
import {View,Text,TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {sendEmailVerification} from 'firebase/auth';
import {auth} from '../../config/firebase';
import {useTheme} from '../../context/ThemeContext';
export default function EmailVerificationScreen({navigation}){const {colors}=useTheme(),[message,setMessage]=useState('Open the verification link sent to your email, then sign in.'),[busy,setBusy]=useState(false);const resend=async()=>{setBusy(true);try{if(!auth.currentUser)throw new Error('Sign in to resend the verification email.');await sendEmailVerification(auth.currentUser);setMessage('Verification email sent. Check your inbox.');}catch(e){setMessage(e.message);}finally{setBusy(false);}};return <SafeAreaView style={{flex:1,backgroundColor:colors.background}}><View style={{padding:24,gap:20}}><Text style={{color:colors.onSurface,fontSize:28}}>Verify your email</Text><Text style={{color:colors.onSurface}}>{message}</Text><TouchableOpacity disabled={busy} onPress={resend}><Text style={{color:colors.primary}}>Resend verification email</Text></TouchableOpacity><TouchableOpacity onPress={()=>navigation.navigate('Login')}><Text style={{color:colors.primary}}>Sign in</Text></TouchableOpacity></View></SafeAreaView>;}
