import { createContext, useContext, useState, useEffect, useRef } from 'react';
import api from '../lib/axios';
import { auth } from '../config/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, sendEmailVerification, updateProfile, sendPasswordResetEmail } from 'firebase/auth';
import {useDataStore} from '../store/useDataStore';
import {useNavigate} from 'react-router';
const AuthContext=createContext();
export const useAuth=()=>useContext(AuthContext);
export const AuthProvider=({children})=>{
 const [user,setUser]=useState(null),[loading,setLoading]=useState(true),[authError,setAuthError]=useState(null);
 const generation=useRef(0);
 const navigate=useNavigate();
 useEffect(()=>{
  localStorage.removeItem('userInfo');
  return onAuthStateChanged(auth,async firebaseUser=>{
   const ticket=++generation.current;
   setUser(null);useDataStore.getState().reset();setAuthError(null);setLoading(true);
   if(!firebaseUser||!firebaseUser.emailVerified){setLoading(false);return;}
   try{
    const {data}=await api.post('/auth/sync',{name:firebaseUser.displayName||undefined});
    if(ticket===generation.current)setUser(data);
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
 const logout=async()=>{++generation.current;setUser(null);useDataStore.getState().reset();await signOut(auth);navigate('/');};
 const resetPassword=email=>sendPasswordResetEmail(auth,email);
 const updateUser=data=>setUser(current=>current?{...current,...data}:null);
 return <AuthContext.Provider value={{user,loading,authError,login,register,logout,resetPassword,updateUser}}>{loading?<main className="p-8" role="status">Loading your account...</main>:children}</AuthContext.Provider>;
};
