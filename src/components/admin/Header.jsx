import React from "react";
import { useNavigate } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";
import "./Header.css";
import { useAuth } from "../../context/AuthProvider";

const Header = () => {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="header-top">
      <h1>Panel de Administración</h1>
      <button
        className={`logout-btn ${!usuario ? "disabled" : ""}`}
        onClick={() => {
          logout();
          navigate("/admin");
        }}
        disabled={!usuario}
      >
        Cerrar Sesión
      </button>

      <DarkModeToggle />
    </header>
  );
};

export default Header;
