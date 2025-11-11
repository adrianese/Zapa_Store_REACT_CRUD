// src/pages/Checkout.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthProviderAuth";
import { useContext } from "react";
import { CarritoContext } from "../context/CarritoContext";
import Swal from "sweetalert2";

const Checkout = () => {
  const { usuario, isAuthenticated } = useAuth();
  const { carrito, setCarrito } = useContext(CarritoContext);
  const navigate = useNavigate();

  const confirmarCompra = async () => {
    if (!isAuthenticated) {
      Swal.fire({
        icon: "warning",
        title: "Inicia sesión",
        text: "Debes iniciar sesión para confirmar tu compra.",
      });
      return;
    }

    const nuevoPedido = {
      id: `pedido${Date.now()}`,
      fecha: new Date().toISOString().split("T")[0],
      productos: carrito.map((p) => ({
        id: p.id,
        nombre: p.nombre,
        imagen: p.imagen,
        actividad: p.actividad,
        talle: p.talle,
        cantidad: p.cantidad,
        precio: p.precio,
      })),
      total: carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0),
      estado: "pendiente",
      factura: `F001-${Math.floor(Math.random() * 100000)
        .toString()
        .padStart(8, "0")}`,
    };

    try {
      const res = await fetch(
        `https://68e448c88e116898997b75e3.mockapi.io/api/productos/users/${usuario.id}`
      );
      const data = await res.json();
      const pedidosActualizados = [...(data.pedidos || []), nuevoPedido];

      const updateRes = await fetch(
        `https://68e448c88e88e116898997b75e3.mockapi.io/api/productos/users/${usuario.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ pedidos: pedidosActualizados }),
        }
      );

      if (updateRes.ok) {
        Swal.fire({
          icon: "success",
          title: "Compra confirmada",
          text: "Tu pedido fue registrado correctamente.",
        });
        setCarrito([]);
        navigate("/mis-compras");
      } else {
        throw new Error("Error al registrar pedido");
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo registrar tu pedido.",
      });
    }
  };

  return (
    <div className="container">
      <h2>Confirmar Compra</h2>
      {carrito.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <div>
          <ul>
            {carrito.map((p, i) => (
              <li key={i}>
                {p.nombre} - Talle: {p.talle} - Cantidad: {p.cantidad} - $
                {p.precio.toLocaleString("es-AR")}
              </li>
            ))}
          </ul>
          <p>
            <strong>Total:</strong> $
            {carrito
              .reduce((acc, p) => acc + p.precio * p.cantidad, 0)
              .toLocaleString("es-AR")}
          </p>
          <button className="submit-btn" onClick={confirmarCompra}>
            Confirmar Pedido
          </button>
        </div>
      )}
    </div>
  );
};

export default Checkout;
