import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_URL } from "../config";
import { auth } from "../config/firebase";
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from "firebase/auth";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const token = await firebaseUser.getIdToken();
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          
          const { data } = await axios.get(`${API_URL}/api/auth/me`);
          setUser(data);
          await AsyncStorage.setItem("userInfo", JSON.stringify(data));
        } catch (error) {
          console.error("Failed to sync auth state with backend", error);
          if (error.response?.status === 401) {
             // Let it be, maybe user is just registering
          }
        }
      } else {
        setUser(null);
        await AsyncStorage.removeItem("userInfo");
        delete axios.defaults.headers.common["Authorization"];
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const token = await userCredential.user.getIdToken();
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    
    // Explicitly sync just in case onAuthStateChanged is slow
    const { data } = await axios.get(`${API_URL}/api/auth/me`);
    setUser(data);
    await AsyncStorage.setItem("userInfo", JSON.stringify(data));
  };

  const register = async (name, email, password) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const token = await userCredential.user.getIdToken();
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    
    // Sync with backend immediately to create MongoDB profile
    const { data } = await axios.post(`${API_URL}/api/auth/sync`, { name });
    setUser(data);
    await AsyncStorage.setItem("userInfo", JSON.stringify(data));
  };

  const logout = async () => {
    await signOut(auth);
  };

  const updateUser = async (data) => {
    const updatedUser = { ...user, ...data };
    setUser(updatedUser);
    await AsyncStorage.setItem("userInfo", JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateUser }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
