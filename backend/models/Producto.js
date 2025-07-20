// backend/models/Producto.js
import mongoose from "mongoose";

const productoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: String,
  precio: Number,
  imagen: String
});

export default mongoose.model("Producto", productoSchema);
