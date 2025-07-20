// routes/usuarios.routes.js
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Usuario from "../models/Usuario.js";

const router = express.Router();

// Registro
router.post("/registro", async (req, res) => {
  const { nombre, email, password } = req.body;

  const existe = await Usuario.findOne({ email });
  if (existe) return res.status(400).json({ mensaje: "Ya existe el usuario" });

  const hashed = await bcrypt.hash(password, 10);

  const nuevo = new Usuario({ nombre, email, password: hashed });
  await nuevo.save();

  res.json({ mensaje: "Usuario registrado correctamente" });
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const usuario = await Usuario.findOne({ email });
  if (!usuario) return res.status(400).json({ mensaje: "Usuario no encontrado" });

  const valida = await bcrypt.compare(password, usuario.password);
  if (!valida) return res.status(400).json({ mensaje: "Contraseña incorrecta" });

  const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

  res.json({
    token,
    usuario: {
      id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email,
      rol: usuario.rol, // ✅ Agregado para mostrar el Panel Admin sin recargar
    },
  });
});

// Obtener perfil desde token
router.get("/perfil", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ mensaje: "Token faltante" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const usuario = await Usuario.findById(decoded.id).select("-password");
    if (!usuario) return res.status(404).json({ mensaje: "Usuario no encontrado" });

    res.json(usuario);
  } catch (error) {
    console.error("Error al obtener perfil:", error);
    res.status(500).json({ mensaje: "Error al obtener perfil" });
  }
});

// Guardar carrito
router.post("/guardar-carrito", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ mensaje: "Token faltante" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const usuario = await Usuario.findById(decoded.id);
    if (!usuario) return res.status(404).json({ mensaje: "Usuario no encontrado" });

    usuario.carrito = req.body.carrito;
    await usuario.save();

    res.json({ mensaje: "Carrito guardado correctamente" });
  } catch (error) {
    console.error("Error al guardar carrito:", error);
    res.status(500).json({ mensaje: "Error al guardar el carrito" });
  }
});

// Obtener carrito
router.get("/carrito", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ mensaje: "Token faltante" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const usuario = await Usuario.findById(decoded.id);
    if (!usuario) return res.status(404).json({ mensaje: "Usuario no encontrado" });

    res.json(usuario.carrito || []);
  } catch (error) {
    console.error("Error al obtener carrito:", error);
    res.status(500).json({ mensaje: "Error al obtener el carrito" });
  }
});

export default router;
