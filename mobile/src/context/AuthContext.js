import {ActivityIndicator,View} from 'react-native';
import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import api from '../services/api';
import {useTheme} from './ThemeContext';
import { auth } from '../config/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, sendEmailVerification, updateProfile, sendPasswordResetEmail } from 'firebase/auth';
import {useDataStore} from '../store/useDataStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
const AuthContext=createContext();
export const useAuth=()=>useContext(AuthContext);
export const AuthProvider=({children})=>{
 const [user,setUser]=useState(null),[loading,setLoading]=useState(true),[authError,setAuthError]=useState(null);
 const generation=useRef(0);
 const {changeTheme}=useTheme();

 useEffect(()=>{
  AsyncStorage.removeItem('userInfo').catch(()=>{});
  return onAuthStateChanged(auth,async firebaseUser=>{
   const ticket=++generation.current;
   setUser(null);useDataStore.getState().reset();setAuthError(null);setLoading(true);
   if(!firebaseUser||!firebaseUser.emailVerified){setLoading(false);return;}
   try{
    const {data}=await api.post('/auth/sync',{name:firebaseUser.displayName||undefined});
    if(ticket===generation.current){setUser(data);await changeTheme(data.preferences?.theme||"system");}
   }catch(error){if(ticket===generation.current)setAuthError(error.response?.data?.message||'Cannot load your account. Please try signing in again.');}
   finally{if(ticket===generation.current)setLoading(false);}
  });
 },[]);
 const login=async(email,password)=>{
  const credential=await signInWithEmailAndPassword(auth,email,password);
  if(!credential.user.emailVerified){await signOut(auth);throw new Error('Please verify your email to log in.');}
  const {data}=await api.post('/auth/sync',{name:credential.user.displayName||undefined});
  setUser(data);
 };
 const register=async(name,email,password)=>{
  const credential=await createUserWithEmailAndPassword(auth,email,password);
  await updateProfile(credential.user,{displayName:name});await sendEmailVerification(credential.user);await signOut(auth);throw new Error('VERIFICATION_EMAIL_SENT');
 };
 const logout=async()=>{++generation.current;setUser(null);useDataStore.getState().reset();await signOut(auth);};
 const resetPassword=email=>sendPasswordResetEmail(auth,email);
 const updateUser=data=>setUser(current=>current?{...current,...data}:null);
 return <AuthContext.Provider value={{user,loading,authError,login,register,logout,resetPassword,updateUser}}>{loading?<View style={{flex:1,alignItems:'center',justifyContent:'center'}}><ActivityIndicator accessibilityLabel="Loading your account"/></View>:children}</AuthContext.Provider>;
};
