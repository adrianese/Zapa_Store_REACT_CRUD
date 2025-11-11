import React, { useEffect, useState, useRef } from "react";
import "./PedidosAdmin.css";

const PedidosAdmin = () => {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const clienteRefs = useRef({});

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const res = await fetch(
          "https://68e448c88e116898997b75e3.mockapi.io/api/productos/users"
        );
        if (!res.ok) throw new Error("Error al obtener pedidos");

        const usuarios = await res.json();

        const pedidosExtraidos = usuarios.flatMap((u) =>
          (u.pedidos || []).map((pedido) => ({
            ...pedido,
            cliente: u.nombre,
            email: u.email,
          }))
        );

        setPedidos(pedidosExtraidos);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPedidos();
  }, []);

  const clientesMap = pedidos.reduce((acc, pedido) => {
    if (!acc[pedido.cliente]) acc[pedido.cliente] = [];
    acc[pedido.cliente].push(pedido);
    return acc;
  }, {});

  // Crear refs de forma segura en cada render
  Object.keys(clientesMap).forEach((nombre) => {
    if (!clienteRefs.current[nombre]) {
      clienteRefs.current[nombre] = React.createRef();
    }
  });

  const scrollToCliente = (nombre) => {
    clienteRefs.current[nombre]?.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  if (loading) return <p className="loading-text">🔄 Cargando pedidos...</p>;
  if (error) return <p className="error-text">❌ Error: {error}</p>;

  return (
    <div className="product-list-container">
      <h1>Pedidos de Clientes</h1>

      <div className="clientes-resumen">
        {Object.keys(clientesMap).map((nombre) => (
          <div
            key={nombre}
            className="cliente-card"
            onClick={() => scrollToCliente(nombre)}
          >
            {nombre} ({clientesMap[nombre].length})
          </div>
        ))}
      </div>

      <div className="pedidos-lista">
        {Object.entries(clientesMap).map(([nombre, pedidos]) => (
          <div key={nombre} ref={clienteRefs.current[nombre]}>
            <div className="cliente-header">{nombre}</div>
            {pedidos.map((pedido) => (
              <div className="pedido-card">
                <div className="pedido-top">
                  <div className="pedido-left">
                    <p>
                      <strong>Cliente:</strong> {pedido.cliente}
                    </p>
                    <p>
                      <strong>Email:</strong> {pedido.email}
                    </p>
                  </div>
                  <div className="pedido-right">
                    <p>
                      <strong>Factura:</strong> {pedido.factura}
                    </p>
                    <p>
                      <strong>Fecha:</strong> {pedido.fecha}
                    </p>
                  </div>
                </div>

                <div className="pedido-bottom-left">
                  <ul>
                    {pedido.productos.map((prod, i) => (
                      <li key={i}>
                        {prod.nombre} – Modelo: {prod.imagen.split(".")[0]} –
                        Talle: {prod.talle} – Cantidad: {prod.cantidad} – $
                        {prod.precio.toLocaleString("es-AR")}
                      </li>
                    ))}
                  </ul>
                  <p>
                    <strong>Total:</strong> $
                    {pedido.total.toLocaleString("es-AR")}
                  </p>
                  <p>
                    <strong>Estado:</strong> {pedido.estado}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PedidosAdmin;
