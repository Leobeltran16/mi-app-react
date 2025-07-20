import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Registro = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegistro = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:3001/api/usuarios/registro", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Usuario registrado con éxito");
      navigate("/login");
    } else {
      alert("Error: " + data.mensaje);
    }
  };

  return (
    <form onSubmit={handleRegistro}>
      <h2>Registro</h2>
      <input type="email" placeholder="Correo" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Registrarse</button>
    </form>
  );
};

export default Registro;
