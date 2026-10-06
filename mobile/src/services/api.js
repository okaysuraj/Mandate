import axios from 'axios';
import { auth } from '../config/firebase';
import { API_URL } from '../config';
export const API_ORIGIN = API_URL.replace(/\/api\/?$/, '').replace(/\/$/, '');
const api = axios.create({baseURL:API_ORIGIN+'/api',timeout:20000});
api.interceptors.request.use(async config=>{
 if(typeof config.url!=='string'||!config.url.startsWith('/')||config.url.startsWith('//')||config.url.includes('://'))throw new Error('API requests must use a relative path');
 const user=auth.currentUser;
 if(user)config.headers.Authorization='Bearer '+await user.getIdToken();
 return config;
});
export default api;
