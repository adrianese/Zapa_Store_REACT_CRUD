import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import Swal from "sweetalert2";

const LoginAdmin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { exito, rol, mensaje } = await login(email, password);

    if (exito && rol === "admin") {
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
        title: "Acceso denegado",
        text: "Solo administradores pueden ingresar al panel.",
        icon: "error",
      });
    }
  };

  return (
    <div className="cont-formulario">
      <h2>Iniciar Sesión como Administrador</h2>
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
