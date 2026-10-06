import {create} from 'zustand';
import api from '../lib/axios';
import {createDataStore} from '../../../shared/dataStore';
export const useDataStore = createDataStore(create, api);
