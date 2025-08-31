import { useContext } from "react";
import api from "../api";
import { CarritoContext } from "../context/CarritoContext";

function Carrito() {
  const { carrito, eliminarDelCarrito, vaciarCarrito, setCarrito } =
    useContext(CarritoContext);

  const calcularTotal = () =>
    carrito.reduce((total, item) => total + item.precio, 0);

  const finalizarCompra = async () => {
    if (carrito.length === 0) {
      alert("Tu carrito está vacío");
      return;
    }
    try {
      await api.post("/api/compras", { productos: carrito });
      alert("Compra realizada con éxito");
      setCarrito([]);
      localStorage.removeItem("carrito");
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
