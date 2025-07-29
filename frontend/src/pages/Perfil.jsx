import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Perfil = () => {
  const { usuario } = useContext(AuthContext);

  return (
    <div>
      <h2>Perfil usuario</h2>
      <p>Email: {usuario?.email}</p>
    </div>
  );
};

export default Perfil;
