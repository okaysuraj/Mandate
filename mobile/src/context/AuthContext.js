import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_URL } from "../config";
import { auth } from "../config/firebase";
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  sendEmailVerification,
  updateProfile,
  sendPasswordResetEmail
} from "firebase/auth";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        if (!firebaseUser.emailVerified) {
          await signOut(auth);
          setUser(null);
          await AsyncStorage.removeItem("userInfo");
          delete axios.defaults.headers.common["Authorization"];
          setLoading(false);
          return;
        }

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
    
    if (!userCredential.user.emailVerified) {
      await signOut(auth);
      throw new Error("Please verify your email to log in.");
    }

    const token = await userCredential.user.getIdToken();
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    
    // Use sync on login in case this is their first login after verifying email
    const { data } = await axios.post(`${API_URL}/api/auth/sync`, { name: userCredential.user.displayName });
    setUser(data);
    await AsyncStorage.setItem("userInfo", JSON.stringify(data));
  };

  const register = async (name, email, password) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName: name });
    await sendEmailVerification(userCredential.user);
    await signOut(auth);
    throw new Error("VERIFICATION_EMAIL_SENT");
  };

  const logout = async () => {
    await signOut(auth);
  };

  const resetPassword = async (email) => {
    await sendPasswordResetEmail(auth, email);
  };

  const updateUser = async (data) => {
    const updatedUser = { ...user, ...data };
    setUser(updatedUser);
    await AsyncStorage.setItem("userInfo", JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, resetPassword, updateUser }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
