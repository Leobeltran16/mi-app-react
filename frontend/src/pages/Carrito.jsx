import React, { useContext } from "react";
import axios from "axios";
import { CarritoContext } from "../context/CarritoContext";

function Carrito() {
  const {
    carrito,
    eliminarDelCarrito,
    vaciarCarrito,
    setCarrito,
  } = useContext(CarritoContext);

  const calcularTotal = () => {
    return carrito.reduce((total, item) => total + item.precio, 0);
  };

  const finalizarCompra = async () => {
    if (carrito.length === 0) {
      alert("Tu carrito está vacío");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const respuesta = await axios.post(
        "http://localhost:3001/api/compras",
        { productos: carrito },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Compra realizada con éxito");
      setCarrito([]); // Limpia el estado global
      localStorage.removeItem("carrito"); // Limpia el localStorage
    } catch (err) {
      console.error("Error al finalizar compra:", err.response?.data || err.message);
      alert("Error al finalizar la compra");
    }
  };

  return (
    <div>
      <h2>🛒 Carrito</h2>

      {carrito.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <ul>
          {carrito.map((producto, index) => (
            <li key={index}>
              {producto.nombre} - ${producto.precio}
              <button onClick={() => eliminarDelCarrito(producto._id)}>Eliminar</button>
            </li>
          ))}
        </ul>
      )}

      <p><strong>Total:</strong> ${calcularTotal()}</p>

      {carrito.length > 0 && (
        <>
          <button onClick={vaciarCarrito}>Vaciar carrito</button>
          <button onClick={finalizarCompra}>Finalizar compra</button>
        </>
      )}
    </div>
  );
}

export default Carrito;
