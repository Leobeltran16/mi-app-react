import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import usuarioRoutes from "./routes/usuarios.routes.js";
import productosRoutes from "./routes/productos.routes.js";
import comprasRoutes from "./routes/compras.routes.js";


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("✅ Conectado a MongoDB Atlas"))
  .catch((err) => console.error("❌ Error al conectar MongoDB", err));

app.use("/api/usuarios", usuarioRoutes);
app.use("/api/productos", productosRoutes);
app.use("/api/compras", comprasRoutes);

// Ruta base opcional
app.get("/", (req, res) => {
  res.send("Backend funcionando correctamente");
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`✅ Servidor corriendo en http://localhost:${PORT}`));
