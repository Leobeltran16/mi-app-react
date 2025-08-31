import { createContext, useState, useEffect } from "react";
import api from "../api";

export const CarritoContext = createContext();

const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  // Cargar carrito desde localStorage y desde la base si hay token
  useEffect(() => {
    const token = localStorage.getItem("token");
    const carritoLocal = localStorage.getItem("carrito");

    if (carritoLocal) setCarrito(JSON.parse(carritoLocal));

    if (token) {
      api
        .get("/api/usuarios/carrito")
        .then((res) => setCarrito(res.data))
        .catch((err) => console.error("Error al cargar carrito:", err));
    }
  }, []);

  // Guardar carrito en localStorage y en la base si hay token
  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));

    const token = localStorage.getItem("token");
    if (token) {
      api
        .post("/api/usuarios/guardar-carrito", { carrito })
        .catch((err) => console.error("Error al guardar carrito:", err));
    }
  }, [carrito]);

  const agregarAlCarrito = (producto) => setCarrito([...carrito, producto]);
  const eliminarDelCarrito = (id) =>
    setCarrito(carrito.filter((p) => p._id !== id));
  const vaciarCarrito = () => setCarrito([]);

  return (
    <CarritoContext.Provider
      value={{ carrito, setCarrito, agregarAlCarrito, eliminarDelCarrito, vaciarCarrito }}
    >
      {children}
    </CarritoContext.Provider>
  );
};

export default CarritoProvider;
