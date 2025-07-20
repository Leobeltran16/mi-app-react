// backend/controllers/userController.js
import Usuario from "../models/Usuario.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registrarUsuario = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existe = await Usuario.findOne({ email });
    if (existe) return res.status(400).json({ mensaje: "Usuario ya existe" });

    const hashed = await bcrypt.hash(password, 10);
    const nuevoUsuario = new Usuario({ email, password: hashed });
    await nuevoUsuario.save();

    res.status(201).json({ mensaje: "Usuario registrado con éxito" });
  } catch (err) {
    res.status(500).json({ mensaje: "Error en el servidor" });
  }
};

export const loginUsuario = async (req, res) => {
  const { email, password } = req.body;
  try {
    const usuario = await Usuario.findOne({ email });
    if (!usuario) return res.status(404).json({ mensaje: "Usuario no encontrado" });

    const passwordValida = await bcrypt.compare(password, usuario.password);
    if (!passwordValida) return res.status(401).json({ mensaje: "Contraseña incorrecta" });

    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ mensaje: "Error al iniciar sesión" });
  }
};
