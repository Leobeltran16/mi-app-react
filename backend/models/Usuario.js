// backend/models/Usuario.js
import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
  nombre: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  rol: { type: String, default: "usuario" }, // ✅ rol de usuario o admin
  carrito: [
    {
      nombre: String,
      precio: Number,
      _id: String,
    },
  ],
});

export default mongoose.model("Usuario", usuarioSchema);
