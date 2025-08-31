import { useEffect, useState, useContext } from "react";
import api from "../api";
import { AuthContext } from "../context/AuthContext";

const PanelAdmin = () => {
  const [compras, setCompras] = useState([]);
  const [cargando, setCargando] = useState(true);
  const { usuario } = useContext(AuthContext);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token || !usuario || usuario.rol !== "admin") {
      console.warn("No autorizado para ver este panel.");
      setCargando(false);
      return;
    }

    api
      .get("/api/compras/todas")
      .then((res) => setCompras(res.data))
      .catch((err) => console.error("Error al cargar compras:", err))
      .finally(() => setCargando(false));
  }, [usuario]);

  if (cargando) return <p style={{ padding: "20px" }}>Cargando...</p>;

  if (!usuario || usuario.rol !== "admin") {
    return (
      <div style={{ padding: "20px", color: "red" }}>
        🚫 No tenés permisos para acceder a este panel.
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>📦 Panel de Administración</h2>
      <p>Listado de todas las compras registradas:</p>

      {compras.length === 0 ? (
        <p>No hay compras aún.</p>
      ) : (
        compras.map((compra, i) => (
          <div
            key={i}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "10px",
              marginBottom: "12px",
              background: "#f9f9f9",
            }}
          >
            <p><strong>🧑 Usuario:</strong> {compra.usuario?.email || "Sin info"}</p>
            <p><strong>🛒 Productos:</strong></p>
            <ul>
              {compra.productos.map((p, j) => (
                <li key={j}>
                  {p.nombre} - ${p.precio}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default PanelAdmin;
