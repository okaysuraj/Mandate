import {create} from 'zustand';
import api from '../services/api';
import {createDataStore} from '../../../shared/dataStore';
export const useDataStore = createDataStore(create, api);
