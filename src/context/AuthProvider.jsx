import React, { useState, useEffect, useContext } from "react";
import AuthContext from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  // Cargar usuario desde localStorage al iniciar
  useEffect(() => {
    const storedUser = localStorage.getItem("usuario");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser?.email && parsedUser?.rol) {
          setUsuario(parsedUser);
        }
      } catch (error) {
        console.error("Error al parsear usuario:", error);
        localStorage.removeItem("usuario");
      }
    }
    setCargando(false);
  }, []);

  // Mostrar pantalla de carga mientras se verifica autenticación
  if (cargando) return <div>Cargando autenticación...</div>;

  const login = async (email, password) => {
    try {
      const res = await fetch(
        "https://68e448c88e116898997b75e3.mockapi.io/api/productos/users"
      );
      const usuarios = await res.json();

      const usuarioEncontrado = usuarios.find(
        (u) => u.email === email && u.password === password
      );

      if (usuarioEncontrado) {
        // Limpiar el objeto antes de guardar
        const usuarioLimpio = {
          id: usuarioEncontrado.id,
          nombre: usuarioEncontrado.nombre,
          email: usuarioEncontrado.email,
          rol: usuarioEncontrado.rol || "usuario",
        };

        setUsuario(usuarioLimpio);
        localStorage.setItem("usuario", JSON.stringify(usuarioLimpio));

        return {
          exito: true,
          rol: usuarioLimpio.rol,
          mensaje: "Inicio de sesión exitoso",
        };
      }

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
