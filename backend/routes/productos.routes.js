import express from "express";
import Producto from "../models/Producto.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const productos = await Producto.find();
  res.json(productos);
});

router.post("/", async (req, res) => {
  const nuevo = new Producto(req.body);
  await nuevo.save();
  res.json(nuevo);
});

export default router;
