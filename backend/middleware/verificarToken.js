import jwt from "jsonwebtoken";

const verificarToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // "Bearer token"

  if (!token) {
    return res.status(401).json({ mensaje: "Token no proporcionado" });
  }

  try {
    const verificado = jwt.verify(token, process.env.JWT_SECRET);
    req.usuarioId = verificado.id; // 👈 lo usás en la ruta de compra
    next();
  } catch (error) {
    res.status(403).json({ mensaje: "Token inválido" });
  }
};

export default verificarToken;
