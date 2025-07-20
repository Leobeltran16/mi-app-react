// pages/Historial.jsx
import { useEffect, useState } from "react";
import axios from "axios";

function Historial() {
  const [compras, setCompras] = useState([]);

  useEffect(() => {
    const fetchHistorial = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:3001/api/compras", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setCompras(res.data);
      } catch (error) {
        console.error("Error al obtener historial:", error.response?.data || error.message);
      }
    };

    fetchHistorial();
  }, []);

  return (
    <div>
      <h2>🧾 Historial de compras</h2>
      {compras.length === 0 ? (
        <p>No hay compras registradas.</p>
      ) : (
        <ul>
          {compras.map((compra, index) => (
            <li key={index}>
              <strong>Fecha:</strong> {new Date(compra.fecha).toLocaleString()}<br />
              <strong>Productos:</strong>
              <ul>
                {compra.productos.map((producto, i) => (
                  <li key={i}>{producto.nombre} - ${producto.precio}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Historial;
