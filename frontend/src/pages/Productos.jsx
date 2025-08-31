import { useEffect, useState, useContext } from "react";
import api from "../api";
import { CarritoContext } from "../context/CarritoContext";

function Productos() {
  const [productos, setProductos] = useState([]);
  const { agregarAlCarrito } = useContext(CarritoContext);

  useEffect(() => {
    api
      .get("/api/productos")
      .then((res) => setProductos(res.data))
      .catch((error) => console.error("Error al obtener productos:", error));
  }, []);

  return (
    <div>
      <h2>🛍️ Productos disponibles</h2>
      {productos.length === 0 ? (
        <p>No hay productos disponibles.</p>
      ) : (
        <ul>
          {productos.map((producto) => (
            <li key={producto._id}>
              <strong>{producto.nombre}</strong> - ${producto.precio}
              <button onClick={() => agregarAlCarrito(producto)}>Agregar al carrito</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Productos;
