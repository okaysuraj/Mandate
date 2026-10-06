import {useIsFocused} from '@react-navigation/native';
import {useDataStore} from '../store/useDataStore';
import {useEffect} from 'react';
const empty = [];
export default function useVisibleTasks() {
  const focused = useIsFocused();
  useEffect(()=>focused?useDataStore.getState().retainTasks():undefined,[focused]);
  return useDataStore(state=>focused?state.tasks:empty);
}
