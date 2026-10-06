import { initializeApp, getApps, getApp } from "firebase/app";
import { initializeAuth, getAuth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import {Platform} from "react-native";

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Firebase persistence in Keychain/Keystore. Only non-sensitive theme settings use AsyncStorage.
class ReactNativePersistenceStorage {
  static type = "LOCAL";
  constructor() {
    this.type = "LOCAL";
  }
  async _isAvailable(){return Platform.OS!=='web'&&await SecureStore.isAvailableAsync();}
  _key(key){return 'mandate.'+key.replace(/[^a-zA-Z0-9._-]/g,'_');}
  async _set(key,value){
    const name=this._key(key),text=JSON.stringify(value),parts=[];
    let part='',size=0;
    for(const character of text){const point=character.codePointAt(0),bytes=point<=127?1:point<=2047?2:point<=65535?3:4;if(size+bytes>1800){parts.push(part);part='';size=0;}part+=character;size+=bytes;}
    if(part)parts.push(part);
    const chunks=parts.length;
    const old=Number(await SecureStore.getItemAsync(name+'.count')||0);
    for(let index=0;index<chunks;index++)await SecureStore.setItemAsync(name+'.'+index,parts[index]);
    await SecureStore.setItemAsync(name+'.count',String(chunks));
    for(let index=chunks;index<old;index++)await SecureStore.deleteItemAsync(name+'.'+index);
    await AsyncStorage.removeItem(key);
  }
  async _get(key){
    await AsyncStorage.removeItem(key);
    const name=this._key(key),count=Number(await SecureStore.getItemAsync(name+'.count')||0);if(!count)return null;
    let text='';for(let index=0;index<count;index++){const chunk=await SecureStore.getItemAsync(name+'.'+index);if(chunk===null)return null;text+=chunk;}
    try{return JSON.parse(text);}catch{return null;}
  }
  async _remove(key){const name=this._key(key),count=Number(await SecureStore.getItemAsync(name+'.count')||0);await SecureStore.deleteItemAsync(name+'.count');for(let index=0;index<count;index++)await SecureStore.deleteItemAsync(name+'.'+index);await AsyncStorage.removeItem(key);}
  _addListener() {}
  _removeListener() {}
}

let authInstance;
try {
  authInstance = initializeAuth(app, {
    persistence: ReactNativePersistenceStorage,
  });
} catch (e) {
  authInstance = getAuth(app);
}

export const auth = authInstance;
export default app;
