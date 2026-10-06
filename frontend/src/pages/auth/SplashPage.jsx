import {useEffect} from 'react';
import {useNavigate} from 'react-router';
import {useAuth} from '../../context/AuthContext';
export default function SplashPage(){const {user,loading}=useAuth();const navigate=useNavigate();useEffect(()=>{if(!loading)navigate(user?'/dashboard':'/login',{replace:true});},[user,loading,navigate]);return <div role="status" className="p-8">Loading your workspace?</div>;}
