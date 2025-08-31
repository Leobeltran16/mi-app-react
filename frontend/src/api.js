// src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // <- viene de Vercel/.env local
  withCredentials: true,                 // deja true si usás cookies
});

// (Opcional) si guardás el token en localStorage:
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
