// src/api.js
import axios from "axios";

// fallback seguro por si VITE_API_URL no llega al build
const baseURL =
  (typeof import.meta !== "undefined" &&
    import.meta.env &&
    import.meta.env.VITE_API_URL) ||
  "https://mi-app-backend-4gfj.onrender.com";

// LOG para verificar en producción
console.log("API baseURL =>", baseURL);

const api = axios.create({
  baseURL,
  withCredentials: true,
});

// Si usás token en localStorage:
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
