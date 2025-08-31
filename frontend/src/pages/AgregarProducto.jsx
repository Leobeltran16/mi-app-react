import { useState } from "react";
import api from "../api";

function AgregarProducto() {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/productos", { nombre, precio });
      alert("Producto agregado correctamente");
      setNombre("");
      setPrecio("");
    } catch (error) {
      console.error(error);
      alert("Error al agregar producto");
    }
  };

  return (
    <div>
      <h2>Agregar nuevo producto</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre del producto"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Precio"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          required
        />
        <button type="submit">Agregar</button>
      </form>
    </div>
  );
}

export default AgregarProducto;
