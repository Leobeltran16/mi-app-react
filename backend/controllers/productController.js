// backend/controllers/productController.js
import Producto from "../models/Producto.js";

export const obtenerProductos = async (req, res) => {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (err) {
    res.status(500).json({ mensaje: "Error al obtener productos" });
  }
};

export const crearProducto = async (req, res) => {
  try {
    const producto = new Producto(req.body);
    await producto.save();
    res.status(201).json(producto);
  } catch (err) {
    res.status(500).json({ mensaje: "Error al crear producto" });
  }
};
