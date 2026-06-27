import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
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
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const token = await firebaseUser.getIdToken();
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          
          const { data } = await axios.get("/api/auth/me");
          setUser(data);
          localStorage.setItem("userInfo", JSON.stringify(data));
        } catch (error) {
          console.error("Failed to sync auth state with backend", error);
        }
      } else {
        setUser(null);
        localStorage.removeItem("userInfo");
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
    
    const { data } = await axios.get("/api/auth/me");
    setUser(data);
    localStorage.setItem("userInfo", JSON.stringify(data));
  };

  const register = async (name, email, password) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const token = await userCredential.user.getIdToken();
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    
    const { data } = await axios.post("/api/auth/sync", { name });
    setUser(data);
    localStorage.setItem("userInfo", JSON.stringify(data));
  };

  const logout = async () => {
    await signOut(auth);
    navigate("/");
  };

  const updateUser = (data) => {
    const updatedUser = { ...user, ...data };
    setUser(updatedUser);
    localStorage.setItem("userInfo", JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateUser }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
