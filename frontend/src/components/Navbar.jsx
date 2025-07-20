import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { CarritoContext } from "../context/CarritoContext";

function Navbar() {
  const { usuario, logout } = useContext(AuthContext);
  const { carrito } = useContext(CarritoContext);
  const navigate = useNavigate();

  const cerrarSesion = () => {
    logout();
    navigate("/login");
  };

  // 🛑 Mientras no se sepa si hay usuario, no mostramos nada (evita el bug de render temprano)
  if (usuario === undefined) return null;

  return (
    <nav style={{ background: "#eee", padding: "10px" }}>
      <Link to="/">Inicio</Link>{" "}
      <Link to="/carrito">Carrito ({carrito.length})</Link>{" "}
      {usuario ? (
        <>
          <Link to="/perfil">Perfil</Link>{" "}
          <Link to="/historial">Historial</Link>{" "}
          <Link to="/productos">Productos</Link>{" "}
          <Link to="/agregar-producto">Agregar Producto</Link>{" "}

          {/* ✅ Panel admin solo si el usuario es admin */}
          {usuario.rol === "admin" && (
            <Link to="/admin">Panel Admin</Link>
          )}

          <button onClick={cerrarSesion}>Cerrar sesión</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>{" "}
          <Link to="/registro">Registro</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
