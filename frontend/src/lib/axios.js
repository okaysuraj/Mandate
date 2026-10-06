import axios from 'axios';
import { auth } from '../config/firebase';
export const API_ORIGIN = (import.meta.env.VITE_API_BASE_URL || (import.meta.env.DEV ? 'http://localhost:5001' : window.location.origin)).replace(/\/api\/?$/, '').replace(/\/$/, '');
const api = axios.create({baseURL:API_ORIGIN+'/api',timeout:20000});
api.interceptors.request.use(async config=>{
 if(typeof config.url!=='string'||!config.url.startsWith('/')||config.url.startsWith('//')||config.url.includes('://'))throw new Error('API requests must use a relative path');
 const user=auth.currentUser;
 if(user)config.headers.Authorization='Bearer '+await user.getIdToken();
 return config;
});
export default api;
