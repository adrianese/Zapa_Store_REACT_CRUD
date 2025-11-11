import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import "./RegisterLogin.css";

const Register = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const verificarEmailExistente = async (email) => {
    const res = await fetch(
      "https://68e448c88e116898997b75e3.mockapi.io/api/productos/users"
    );
    const usuarios = await res.json();
    return usuarios.find((u) => u.email === email);
  };

  const registrarUsuario = async (usuario) => {
    const res = await fetch(
      "https://68e448c88e116898997b75e3.mockapi.io/api/productos/users",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(usuario),
      }
    );
    return res.ok ? await res.json() : null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nuevoUsuario = {
      nombre,
      email,
      password,
      rol: "usuario",
      pedidos: [],
    };

    try {
      const existe = await verificarEmailExistente(email);
      if (existe) {
        Swal.fire({
          icon: "warning",
          title: "Correo ya registrado",
          text: "Iniciá sesión para continuar.",
          confirmButtonText: "Ir al login",
        }).then(() => navigate("/login"));
        return;
      }

      const resultado = await registrarUsuario(nuevoUsuario);
      if (resultado?.id) {
        Swal.fire({
          icon: "success",
          title: "Registro exitoso",
          text: "Ya podés iniciar sesión.",
          confirmButtonText: "Ir al login",
        }).then(() => navigate("/login"));
      } else {
        throw new Error("No se pudo registrar");
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Error de conexión",
        text: "No se pudo completar el registro.",
      });
    }
  };

  return (
    <div className="formulario-seccion">
      <h2>Registro</h2>
      <form className="formulario" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
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
          <button type="submit" className="boton-verde">
            Registrarse
          </button>
        </div>
      </form>
      <p className="link-text">
        ¿Ya tenés una cuenta? <Link to="/login">Ingresá</Link>
      </p>
    </div>
  );
};

export default Register;
