import { Routes, Route } from "react-router-dom";
import Inicio from "./pages/Inicio";
import Carrito from "./pages/Carrito";
import Perfil from "./pages/Perfil";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import AgregarProducto from "./pages/AgregarProducto";
import Historial from "./pages/Historial";
import ProtectedRoute from "./components/ProtectedRoute";
import Productos from "./pages/Productos";
import PanelAdmin from "./pages/PanelAdmin"; // ✅ importamos la nueva página

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/carrito" element={<Carrito />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/productos" element={<Productos />} />

      <Route path="/perfil" element={
        <ProtectedRoute>
          <Perfil />
        </ProtectedRoute>
      } />

      <Route path="/agregar-producto" element={
        <ProtectedRoute>
          <AgregarProducto />
        </ProtectedRoute>
      } />

      <Route path="/historial" element={
        <ProtectedRoute>
          <Historial />
        </ProtectedRoute>
      } />

      {/* ✅ Ruta nueva para el panel de administrador */}
      <Route path="/admin" element={
        <ProtectedRoute>
          <PanelAdmin />
        </ProtectedRoute>
      } />
    </Routes>
  );
}

export default AppRoutes;
