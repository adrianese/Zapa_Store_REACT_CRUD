import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
/*import { useAuth } from "../context/AuthProviderAuth";*/
import { useAuth } from "../context/AuthProvider";
import Swal from "sweetalert2";
import "./RegisterLogin.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  localStorage.setItem("isLoggedIn", "true");
  localStorage.setItem("role", "user"); // o "user"

  const obtenerUsuarioPorCredenciales = async (email, password) => {
    const res = await fetch(
      "https://68e448c88e116898997b75e3.mockapi.io/api/productos/users"
    );
    const usuarios = await res.json();
    return usuarios.find((u) => u.email === email && u.password === password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const usuario = await obtenerUsuarioPorCredenciales(email, password);

      if (!usuario) {
        Swal.fire({
          icon: "warning",
          title: "Usuario no encontrado",
          text: "¿Querés registrarte?",
          showCancelButton: true,
          confirmButtonText: "Ir al registro",
          cancelButtonText: "Cancelar",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/register");
          }
        });
        return;
      }

      const ok = await login(email, password);
      if (!ok) {
        Swal.fire({
          icon: "error",
          title: "Error de autenticación",
          text: "No se pudo iniciar sesión.",
        });
        return;
      }

      // Redirección según rol
      if (usuario.rol === "admin") {
        navigate("/admin/board");
      } else {
        navigate("/carrito");
      }
    } catch (error) {
      console.error("Error de login:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo verificar el usuario.",
      });
    }
  };

  return (
    <div className="formulario-seccion">
      <h2>Iniciar Sesión</h2>
      <form className="formulario" onSubmit={handleSubmit}>
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
      <p className="link-text">¿No estás registrado?</p>
      <button className="boton-azul">
        <Link to="/register">Registrate</Link>
      </button>
    </div>
  );
};

export default Login;
