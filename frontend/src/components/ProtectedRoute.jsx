import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { usuario } = useContext(AuthContext);
  return usuario ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
