import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CarritoContext } from "../context/CarritoContext";

import { useAuth } from "../context/AuthProvider";
import "./Header.css";

const Header = () => {

  const navigate = useNavigate();
  const handleLogout = async () => {
  await logout(); // espera que se complete el logout
  navigate("/"); // redirige al inicio
  };
  const { carrito } = useContext(CarritoContext);
  const { isAuthenticated, usuario, logout } = useAuth();


  return (
    <header className="header">
      <div className="contenedor contenido-header">
        <div className="barra">
          <NavLink to="/" className="link-h1">
            <h1 className="titulo-header">
              ZAPA <span className="estilo-titulo">Store</span>
            </h1>
          </NavLink>
          <nav className="navegacion">
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "activo" : "")}
              end
            >
              Inicio
            </NavLink>
            <NavLink
              to="/productos"
              className={({ isActive }) => (isActive ? "activo" : "")}
            >
              Productos
            </NavLink>
            <NavLink
              to="/nosotros"
              className={({ isActive }) => (isActive ? "activo" : "")}
            >
              Nosotros
            </NavLink>
            <NavLink
              to="/contacto"
              className={({ isActive }) => (isActive ? "activo" : "")}
            >
              Contacto
            </NavLink>
            <NavLink
              to="/carrito"
              className={({ isActive }) =>
                isActive ? "carrito activo" : "carrito"
              }
              id="icono-carrito"
            >
              Carrito 🛒 <span id="carrito-contador">{carrito.length}</span>
            </NavLink>
          </nav>
          <>
            {isAuthenticated && (
              <button className="btn btn-danger" onClick={handleLogout}>
                Cerrar sesión ({usuario.email})
              </button>
            )}
          </>
        </div>
      </div>
    </header>
  );
};

export default Header;
