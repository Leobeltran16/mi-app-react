import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { CarritoContext } from "../context/CarritoContext";

function ListaProductos() {
  const [productos, setProductos] = useState([]);
  const { agregarAlCarrito } = useContext(CarritoContext);

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/productos");
        setProductos(response.data);
      } catch (error) {
        console.error("Error al obtener productos", error);
      }
    };

    obtenerProductos();
  }, []);

  return (
    <div>
      <h2>🛍️ Lista de Productos</h2>
      <ul>
        {productos.map((producto) => (
          <li key={producto._id}>
            <strong>{producto.nombre}</strong> - ${producto.precio}
            <button onClick={() => agregarAlCarrito(producto)}>Agregar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaProductos;
