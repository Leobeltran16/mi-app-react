import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

const Registro = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegistro = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/api/usuarios/registro", { email, password });
      if (res.status === 201 || res.status === 200) {
        alert("Usuario registrado con éxito");
        navigate("/login");
      } else {
        alert("Ocurrió un error al registrar");
      }
    } catch (err) {
      console.error(err);
      alert("Error de red");
    }
  };

  return (
    <form onSubmit={handleRegistro}>
      <h2>Registro</h2>
      <input
        type="email"
        placeholder="Correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Registrarse</button>
    </form>
  );
};

export default Registro;
