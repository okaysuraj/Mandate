import {useEffect} from 'react';
import {useDataStore} from '../store/useDataStore';
export default function useVisibleTasks() {
  useEffect(()=>useDataStore.getState().retainTasks(),[]);
  return useDataStore(state=>state.tasks);
}
