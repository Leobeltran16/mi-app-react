// backend/middleware/authMiddleware.js
import jwt from "jsonwebtoken";
import Usuario from "../models/Usuario.js";

// Middleware para verificar el token y obtener el usuario real
export const verificarToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({ mensaje: "Token no válido" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // 🛠 Buscar el usuario real y guardarlo completo en req.usuario
    const usuario = await Usuario.findById(decoded.id).select("-password");
    if (!usuario) return res.status(404).json({ mensaje: "Usuario no encontrado" });

    req.usuario = usuario;
    next();
  } catch (err) {
    res.status(401).json({ mensaje: "Token inválido" });
  }
};

// Middleware para verificar si es admin
export const esAdmin = (req, res, next) => {
  if (req.usuario && req.usuario.rol === "admin") {
    next();
  } else {
    res.status(403).json({ mensaje: "Acceso solo para administradores" });
  }
};
