import React, { useState, useEffect } from "react";
import AuthContext from "./AuthContext";
import { useContext } from "react";


export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);

  // Cargar usuario desde localStorage al iniciar
  useEffect(() => {
    const storedUser = localStorage.getItem("usuario");
    if (storedUser) {
      setUsuario(JSON.parse(storedUser));
    }
  }, []);


  const login = async (email, password) => {
    const res = await fetch(
      "https://68e448c88e116898997b75e3.mockapi.io/api/productos/users"
    );
    const usuarios = await res.json();
    const usuario = usuarios.find(
      (u) => u.email === email && u.password === password
    );

    if (usuario) {
      setUsuario(usuario);
      localStorage.setItem("usuario", JSON.stringify(usuario));
      return true;
    }

    // Fallback for hardcoded admin user if not in mock API
    if (email === "admin@correo.com" && password === "admin") {
      const nuevoUsuario = {
        email,
        nombre: "Administrador",
        rol: "admin",
      };
      setUsuario(nuevoUsuario);
      localStorage.setItem("usuario", JSON.stringify(nuevoUsuario));
      return true;
    }

    return false;
  };

  const logout = () => {
    setUsuario(null);
    localStorage.removeItem("usuario");
  };

  const isAuthenticated = !!usuario;

  return (
    <AuthContext.Provider value={{ usuario, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};


// ...tu AuthProvider actual...

export const useAuth = () => useContext(AuthContext);
