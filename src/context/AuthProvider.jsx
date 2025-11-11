import React, { useState, useEffect, useContext } from "react";
import AuthContext from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);

  // Cargar usuario desde localStorage al iniciar
useEffect(() => {
  const storedUser = localStorage.getItem("usuario");
  if (storedUser) {
    const parsedUser = JSON.parse(storedUser);
    setUsuario(parsedUser);
  }
}, []);

  const login = async (email, password) => {
    try {
      const res = await fetch(
        "https://68e448c88e116898997b75e3.mockapi.io/api/productos/users"
      );
      const usuarios = await res.json();

      const usuarioEncontrado = usuarios.find(
        (u) => u.email === email && u.password === password
      );

      // Usuario válido en MockAPI
      if (usuarioEncontrado) {
        setUsuario(usuarioEncontrado);
        localStorage.setItem("usuario", JSON.stringify(usuarioEncontrado));
        return {
          exito: true,
          rol: usuarioEncontrado.rol || "usuario",
          mensaje: "Inicio de sesión exitoso",
        };
      }

      // Fallback para admin hardcodeado
      if (email === "admin@correo.com" && password === "admin") {
        const admin = {
          email,
          nombre: "Administrador",
          rol: "admin",
        };
        setUsuario(admin);
        localStorage.setItem("usuario", JSON.stringify(admin));
        return {
          exito: true,
          rol: "admin",
          mensaje: "Inicio de sesión como administrador",
        };
      }

      // Credenciales incorrectas
      return {
        exito: false,
        mensaje: "Correo o contraseña incorrectos",
      };
    } catch (error) {
      console.error("Error en login:", error);
      return {
        exito: false,
        mensaje: "Error al conectar con el servidor",
      };
    }
  };

  const logout = () => {
    setUsuario(null);
    localStorage.removeItem("usuario");
  };

  const isAuthenticated = !!usuario?.email;

  return (
    <AuthContext.Provider value={{ usuario, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
