import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";

import Swal from "sweetalert2";

const LoginAdmin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  localStorage.setItem("isLoggedIn", "true");
  localStorage.setItem("role", "admin"); // o "user"

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(email, password, "admin");
    if (success) {
      Swal.fire({
        title: "Bienvenido",
        text: "Acceso concedido al panel de administración.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
      navigate("/admin/board");
    } else {
      Swal.fire({
        title: "Credenciales incorrectas",
        text: "Verificá tu correo y contraseña.",
        icon: "error",
      });
    }
  };

  return (
    <div className="cont-formulario">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className="form-actions">
          <button className="boton-verde" type="submit">
            Ingresar
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginAdmin;
