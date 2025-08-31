import { createContext, useState, useEffect } from "react";
import api from "../api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  // undefined = cargando; null = no logueado; objeto = usuario
  const [usuario, setUsuario] = useState(undefined);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const usuarioGuardado = localStorage.getItem("usuario");

    if (usuarioGuardado) setUsuario(JSON.parse(usuarioGuardado));

    if (token) {
      api
        .get("/api/usuarios/perfil")
        .then((res) => {
          setUsuario(res.data);
          localStorage.setItem("usuario", JSON.stringify(res.data));
        })
        .catch((err) => {
          console.error("Error al verificar token:", err);
          setUsuario(null);
          localStorage.removeItem("usuario");
        });
    } else {
      setUsuario(null);
    }
  }, []);

  const login = (datos) => {
    setUsuario(datos);
    localStorage.setItem("usuario", JSON.stringify(datos));
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
