// routes/compras.routes.js

import express from "express";
import { verificarToken, esAdmin } from "../middleware/authMiddleware.js";
import Historial from "../models/Historial.js";
import Usuario from "../models/Usuario.js";

const router = express.Router();

// Guardar una compra (usuario logueado)
router.post("/", verificarToken, async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.usuario.id); // usamos req.usuario.id gracias al middleware
    if (!usuario) return res.status(404).json({ mensaje: "Usuario no encontrado" });

    const nuevaCompra = new Historial({
      usuario: usuario._id,
      productos: req.body.productos,
    });

    await nuevaCompra.save();

    res.status(201).json({ mensaje: "Compra guardada correctamente" });
  } catch (error) {
    console.error("Error al guardar compra:", error);
    res.status(500).json({ mensaje: "Error al guardar la compra" });
  }
});

// Obtener historial de compras del usuario logueado
router.get("/", verificarToken, async (req, res) => {
  try {
    const historial = await Historial.find({ usuario: req.usuario.id }).sort({ fecha: -1 });
    res.json(historial);
  } catch (error) {
    console.error("Error al obtener historial:", error);
    res.status(500).json({ mensaje: "Error al obtener historial" });
  }
});

// 🛡️ Ruta exclusiva para administradores: ver todas las compras
router.get("/todas", verificarToken, esAdmin, async (req, res) => {
  try {
    const compras = await Historial.find()
      .populate("usuario", "nombre email") // mostramos info del usuario
      .sort({ fecha: -1 });

    res.json(compras);
  } catch (error) {
    console.error("Error al obtener todas las compras:", error);
    res.status(500).json({ mensaje: "Error al obtener todas las compras" });
  }
});

export default router;
