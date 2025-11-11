import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

const Register = () => {
  return (
    <div className="container">
      <h2>Registro</h2>
      <form>
        <input type="text" placeholder="Nombre" required />
        <input type="email" placeholder="Correo" required />
        <input type="password" placeholder="Contraseña" required />
        <div className="form-actions">
          <button type="submit" className="submit-btn">
            Registrarse
          </button>
        </div>
      </form>
      <p className="link-text">
        ¿Ya tienes una cuenta? <Link to="/login">Ingresa</Link>
      </p>
    </div>
  );
};

export default Register;
