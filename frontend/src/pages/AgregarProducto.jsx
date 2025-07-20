import React, { useState } from "react";
import axios from "axios";

function AgregarProducto() {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:3001/api/productos",
        { nombre, precio },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Producto agregado correctamente");
      setNombre("");
      setPrecio("");
    } catch (error) {
      alert("Error al agregar producto");
      console.error(error);
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
