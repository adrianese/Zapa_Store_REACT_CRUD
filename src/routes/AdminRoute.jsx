import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const AdminRoute = ({ children }) => {
  const { isAuthenticated, usuario } = useAuth();

  if (!isAuthenticated) return <Navigate to="/admin" />;

  if (usuario.rol !== "admin") return <Navigate to="/mis-compras" />;

  return children;
};

export default AdminRoute;
