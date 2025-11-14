import React, { useEffect, useState } from "react";
import "./MisCompras.css";
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
      <div className="miscompras-container">
        <p className="error-text">Debes iniciar sesión para ver tus compras.</p>
      </div>
    );
  }

  return (
    <div className="miscompras-container">
      <h2 className="miscompras-title">Mis Compras</h2>
      {pedidos.length === 0 ? (
        <p className="loading-text">No tenés compras registradas.</p>
      ) : (
        <div className="pedidos-lista">
          {pedidos.map((pedido) => (
            <div key={pedido.id} className="pedido-card">
              <div className="pedido-top">
                <div className="pedido-left">
                  <p>
                    <strong>Factura:</strong> {pedido.factura}
                  </p>
                  <p>
                    <strong>Fecha:</strong> {pedido.fecha}
                  </p>
                </div>
                <div className="pedido-right">
                  <p>
                    <strong>Estado:</strong> {pedido.estado}
                  </p>
                  <p>
                    <strong>Total:</strong> $
                    {pedido.total.toLocaleString("es-AR")}
                  </p>
                </div>
              </div>
              <ul>
                {pedido.productos.map((prod, index) => (
                  <li key={index}>
                    {prod.nombre} - Modelo: {prod.imagen.split(".")[0]} — Talle:{" "}
                    {prod.talle} — Cantidad: {prod.cantidad} — $
                    {prod.precio.toLocaleString("es-AR")}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MisCompras;
