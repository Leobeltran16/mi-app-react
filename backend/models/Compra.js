import mongoose from "mongoose";

const compraSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
  productos: [
    {
      nombre: String,
      precio: Number,
      _id: false,
    },
  ],
  fecha: {
    type: Date,
    default: Date.now,
  },
});

const Compra = mongoose.model("Compra", compraSchema);
export default Compra;
