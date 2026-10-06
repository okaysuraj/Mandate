import { Platform } from 'react-native';
import Constants from 'expo-constants';
const explicit=process.env.EXPO_PUBLIC_API_URL;
const port=process.env.EXPO_PUBLIC_API_PORT||'5001';
if(!__DEV__ && (!explicit||!explicit.startsWith('https://')))throw new Error('A production HTTPS API URL is required');
const local=process.env.EXPO_PUBLIC_API_IP||Constants.expoConfig?.hostUri?.split(':')[0]||Platform.select({android:'10.0.2.2',default:'localhost'});
export const API_URL=(explicit||'http://'+local+':'+port).replace(/\/$/,'');
