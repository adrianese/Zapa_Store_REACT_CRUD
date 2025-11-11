// src/pages/MisCompras.jsx
import React, { useEffect, useState } from "react";
import "./MisCompras.css";
/*import { useAuth } from "../context/AuthProviderAuth";*/
import { useAuth } from "../context/AuthProvider";
import Swal from "sweetalert2";

const MisCompras = () => {
  const { usuario, isAuthenticated } = useAuth();
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const obtenerPedidos = async () => {
      if (!isAuthenticated) return;

      try {
        const res = await fetch(
          `https://68e448c88e116898997b75e3.mockapi.io/api/productos/users/${usuario.id}`
        );
        const data = await res.json();
        setPedidos(data.pedidos || []);
      } catch (error) {
        console.error("Error al obtener pedidos:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudieron cargar tus compras.",
        });
      }
    };

    obtenerPedidos();
  }, [usuario, isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="container">
      
        <p>Debes iniciar sesión para ver tus compras.</p>
        </div>
    );
  }

  return (
    <div className="container">
      <h2>Mis Compras</h2>
      {pedidos.length === 0 ? (
        <p>No tenés compras registradas.</p>
      ) : (
        pedidos.map((pedido) => (
          <div key={pedido.id} className="card-pedido">
            <h3>Factura: {pedido.factura}</h3>
            <p>Fecha: {pedido.fecha}</p>
            <p>Estado: {pedido.estado}</p>
            <p>Total: ${pedido.total.toLocaleString("es-AR")}</p>
            <ul>
              {console.log(pedido)}
              {pedido.productos.map((prod, index) => (
                <li key={index}>
                  {prod.nombre} - Modelo: {prod.imagen.split(".")[0]} -- Talle: {prod.talle} -
                  Cantidad: {prod.cantidad} - $
                  {prod.precio.toLocaleString("es-AR")}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default MisCompras;
