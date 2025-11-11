import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const PrivateRoute = ({
  children,
  rolRequerido = "usuario",
  redireccion = "/login",
}) => {
  const { isAuthenticated, usuario } = useAuth();

  if (!isAuthenticated) return <Navigate to={redireccion} />;

  if (rolRequerido && usuario.rol !== rolRequerido) {
    const destino =
      usuario.rol === "admin" ? "/admin" : "/mis-compras";
    return <Navigate to={destino} />;
  }

  return children;
};

export default PrivateRoute;
