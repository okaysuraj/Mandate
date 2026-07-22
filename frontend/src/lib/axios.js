import axios from "axios";
import { auth } from "../config/firebase";

// in production, there's no localhost so we have to make this dynamic
const BASE_URL = import.meta.env.VITE_API_BASE_URL ? import.meta.env.VITE_API_BASE_URL + "/api" : (import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "https://mandate-ry4d.onrender.com/api");

const api = axios.create({
  baseURL: BASE_URL,
});

const attachAuthToken = async (config) => {
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

api.interceptors.request.use(attachAuthToken, (error) => Promise.reject(error));
axios.interceptors.request.use(attachAuthToken, (error) => Promise.reject(error));

export default api;
