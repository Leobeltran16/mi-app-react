// context/AuthContext.jsx
import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  // 🔄 IMPORTANTE: usamos `undefined` para saber si ya cargó o no
  const [usuario, setUsuario] = useState(undefined);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const usuarioGuardado = localStorage.getItem("usuario");

    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
    }

    if (token) {
      axios
        .get("http://localhost:3001/api/usuarios/perfil", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
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
      // No hay token ni usuario guardado
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
