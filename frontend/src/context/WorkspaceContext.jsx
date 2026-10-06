import {createContext,useContext,useState,useEffect,useCallback,useRef} from 'react';
import {useAuth} from './AuthContext';
import api from '../lib/axios';
const WorkspaceContext=createContext();
export const useWorkspace=()=>useContext(WorkspaceContext);
export const WorkspaceProvider=({children})=>{
 const {user,updateUser}=useAuth();
 const userId=user?._id, preferred=user?.activeWorkspace;
 const [workspaces,setWorkspaces]=useState([]),[activeWorkspace,setActiveWorkspace]=useState(null),[loading,setLoading]=useState(true),[error,setError]=useState('');
 const generation=useRef(0);
 const fetchWorkspaces=useCallback(async()=>{
  const request=++generation.current;setLoading(true);setError('');
  if(!userId){setWorkspaces([]);setActiveWorkspace(null);setLoading(false);return;}
  try{const {data}=await api.get('/workspaces');if(request!==generation.current)return;const items=Array.isArray(data)?data:[];setWorkspaces(items);setActiveWorkspace(items.find(w=>w._id===preferred)||items[0]||null);}
  catch(err){if(request===generation.current){setWorkspaces([]);setActiveWorkspace(null);setError(err.response?.data?.message||'Cannot load workspaces');}}
  finally{if(request===generation.current)setLoading(false);}
 },[userId,preferred]);
 useEffect(()=>{setWorkspaces([]);setActiveWorkspace(null);fetchWorkspaces();const ticket=generation.current;return()=>{if(generation.current===ticket)generation.current=ticket+1;};},[fetchWorkspaces]);
 const createWorkspace=async(name)=>{const {data}=await api.post('/workspaces',{name});await fetchWorkspaces();return data;};
 const switchWorkspace=async(id)=>{const {data}=await api.put('/workspaces/'+id+'/active');setActiveWorkspace(workspaces.find(w=>w._id===data.activeWorkspace)||null);updateUser({activeWorkspace:data.activeWorkspace});};
 return <WorkspaceContext.Provider value={{workspaces,activeWorkspace,loading,error,createWorkspace,switchWorkspace,fetchWorkspaces}}>{children}</WorkspaceContext.Provider>;
};
