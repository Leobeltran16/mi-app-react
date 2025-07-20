import mongoose from "mongoose";

const historialSchema = new mongoose.Schema(
  {
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },
    productos: [
      {
        nombre: String,
        precio: Number,
        _id: false, // evita que Mongoose agregue un _id por defecto a cada producto
      },
    ],
    fecha: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Historial", historialSchema);
