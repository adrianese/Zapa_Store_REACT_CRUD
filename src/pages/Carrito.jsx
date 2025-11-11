import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CarritoContext } from "../context/CarritoContext";
import { useAuth } from "../context/AuthProvider";
import Swal from "sweetalert2";
import "./Producto.css";

const Carrito = () => {
  const { carrito, setCarrito } = useContext(CarritoContext);
  const { login, logout, isAuthenticated, usuario } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formEnviado, setFormEnviado] = useState(false);

  // Sincronizar carrito desde localStorage al montar
  useEffect(() => {
    const carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado) {
      setCarrito(JSON.parse(carritoGuardado));
    }
  }, []);

  const total = carrito.reduce((acc, item) => acc + item.precio, 0);

  const resumenPedido = carrito
    .map(
      (item, i) =>
        `${i + 1}. ${item.nombre} – ${item.imagen.split(".")[0]} – Talle: ${
          item.talle
        } – $${item.precio.toLocaleString("es-AR")}`
    )
    .join("\n");

  const handleLogin = async (e) => {
    e.preventDefault();
    const resultado = await login(email, password, "usuario");

    if (!resultado.exito) {
      Swal.fire({
        icon: "error",
        title: "Error de autenticación",
        text: resultado.mensaje || "Correo o contraseña incorrectos.",
      });
      return;
    }

    if (resultado.rol === "usuario") {
      Swal.fire({
        icon: "success",
        title: "¡Bienvenido!",
        text: "Ya podés confirmar tu compra.",
        timer: 1500,
        showConfirmButton: false,
      });
      // No redirigir, se mostrará el formulario automáticamente
    } else if (resultado.rol === "admin") {
      Swal.fire({
        icon: "error",
        title: "Acceso denegado",
        text: "Los administradores no pueden comprar. Redirigiendo al panel de admin...",
        timer: 2000,
        showConfirmButton: false,
      });
      navigate("/admin/loginAdmin");
    } else {
      Swal.fire({
        icon: "error",
        title: "Rol no reconocido",
        text: "Tu rol no tiene acceso a esta sección.",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!usuario || !usuario.id || !usuario.email) {
      Swal.fire("Error", "No se encontró el usuario autenticado.", "error");
      return;
    }

    const nuevoPedido = {
      id: `pedido${Date.now()}`,
      fecha: new Date().toISOString().split("T")[0],
      productos: carrito.map((item) => ({
        id: item.id,
        nombre: item.nombre,
        imagen: item.imagen,
        actividad: item.actividad,
        talle: item.talle,
        cantidad: item.cantidad,
        precio: item.precio,
      })),
      total,
      estado: "pendiente",
      factura: `F001-${Math.floor(Math.random() * 100000)
        .toString()
        .padStart(8, "0")}`,
    };

    try {
      const updateRes = await fetch(
        `https://68e448c88e116898997b75e3.mockapi.io/api/productos/users/${usuario.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...usuario,
            pedidos: [...(usuario.pedidos || []), nuevoPedido],
          }),
        }
      );

      if (updateRes.ok) {
        Swal.fire({
          title: "¡Compra confirmada!",
          icon: "success",
        });

        setCarrito([]);
        localStorage.removeItem("carrito");
        setFormEnviado(true);
        navigate("/mis-compras");
        setTimeout(() => logout(), 100000); // logout diferido
      } else {
        Swal.fire("Error", "No se pudo registrar el pedido.", "error");
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire("Error", "No se pudo registrar el pedido.", "error");
    }
  };

  if (formEnviado) return null;

  return (
    <div className="text-center div-base">
      <h2 className="carrito-titulo">Resumen de Compra</h2>

      {carrito.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <>
          <ul className="lista-carrito">
            {carrito.map((item, i) => (
              <li key={`${item.id}-${i}`} className="item-carrito">
                <strong>{i + 1}.</strong> {item.nombre} –{" "}
                {item.imagen.split(".")[0]} – Talle: {item.talle} – $
                {item.precio.toLocaleString("es-AR")}
              </li>
            ))}
          </ul>

          <p className="precio-item">
            <strong>Total:</strong> ${total.toLocaleString("es-AR")}
          </p>

          {!isAuthenticated ? (
            <form onSubmit={handleLogin} className="formulario">
              <fieldset>
                <h3 className="carrito-titulo">
                  Iniciá sesión para confirmar la compra
                </h3>

                <label htmlFor="email">Correo</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <label htmlFor="password">Contraseña</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <input
                  type="submit"
                  value="Continuar"
                  className="boton-verde"
                />
              </fieldset>
            </form>
          ) : (
            <form onSubmit={handleSubmit} className="formulario">
              <fieldset>
                <legend>Confirmación de Pedido</legend>
                <p>
                  <strong>Nombre:</strong> {usuario.nombre}
                </p>
                <p>
                  <strong>📧 Email:</strong> {usuario.email}
                </p>

                <label htmlFor="mensaje">Resumen del Pedido</label>
                <textarea
                  id="mensaje"
                  defaultValue={`Tu Pedido:\n\n${resumenPedido}\n\nTotal: $${total.toLocaleString(
                    "es-AR"
                  )}`}
                  readOnly
                  required
                  rows="6"
                />
              </fieldset>

              <input
                type="submit"
                value="Confirmar Compra"
                className="boton-verde"
              />
            </form>
          )}
        </>
      )}

      <p className="link-text">
        ¿No estás registrado?{" "}
        <Link to="/register" className="boton-verde">
          Registrate
        </Link>
      </p>
    </div>
  );
};

export default Carrito;
