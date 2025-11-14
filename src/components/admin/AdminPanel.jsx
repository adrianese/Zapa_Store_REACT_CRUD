import { NavLink } from "react-router-dom";
import "./AdminPanel.css";

const AdminNav = () => {
  return (
    <nav className="tabs-admin">
      <NavLink
        to="/admin/board"
        className={({ isActive }) => (isActive ? "tab-btn active" : "tab-btn")}
      >
        Listado de Productos
      </NavLink>
      <NavLink
        to="/admin/create"
        className={({ isActive }) => (isActive ? "tab-btn active" : "tab-btn")}
      >
        Crear Producto
      </NavLink>
      <NavLink
        to="/admin/orders"
        className={({ isActive }) => (isActive ? "tab-btn active" : "tab-btn")}
      >
        Ver Órdenes
      </NavLink>
    </nav>
  );
};

export default AdminNav;
