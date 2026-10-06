import {createContext,useContext,useEffect,useState} from 'react';
import {auth} from '../config/firebase';
import {API_ORIGIN} from '../lib/axios';
import {useAuth} from './AuthContext';
import {useWorkspace} from './WorkspaceContext';
import {useDataStore} from '../store/useDataStore';
const SocketContext=createContext();
export const useSocket=()=>useContext(SocketContext);
export const SocketProvider=({children})=>{
 const [socket,setSocket]=useState(null);
 const {user}=useAuth(),{activeWorkspace}=useWorkspace();
 useEffect(()=>{
  if(!user?._id){setSocket(null);return;}
  let active=true,connection,unsubscribe;
  import('socket.io-client').then(({default:io})=>{
   if(!active)return;
   connection=io(API_ORIGIN,{auth:async callback=>{try{callback({token:await auth.currentUser.getIdToken()});}catch{callback({token:''});}}});
   setSocket(connection);unsubscribe=useDataStore.getState().subscribeToSocket(connection);
  }).catch(()=>{if(active)setSocket(null);});
  return()=>{active=false;unsubscribe?.();connection?.close();setSocket(null);};
 },[user?._id]);
 useEffect(()=>{
  const workspaceId=activeWorkspace?._id;
  useDataStore.getState().setWorkspace(workspaceId||null);
  if(workspaceId)useDataStore.getState().loadNotifications();
  if(!socket||!workspaceId)return;
  const join=()=>{socket.emit('joinWorkspace',workspaceId);if(useDataStore.getState().taskDataReady)useDataStore.getState().loadTasks({force:true});};
  join();socket.on('connect',join);
  return()=>{socket.off('connect',join);socket.emit('leaveWorkspace',workspaceId);};
 },[socket,activeWorkspace?._id]);
 return <SocketContext.Provider value={{socket}}>{children}</SocketContext.Provider>;
};
