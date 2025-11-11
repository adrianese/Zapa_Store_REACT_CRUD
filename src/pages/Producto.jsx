import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Producto.css";

function Producto() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [detallesMarca, setDetallesMarca] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const obtenerProducto = async () => {
      try {
        const res = await fetch(
          `https://68e448c88e116898997b75e3.mockapi.io/api/productos/products/${id}`
        );
        if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
        const data = await res.json();
        setProducto(data);
      } catch (err) {
        console.error("Error al obtener el producto:", err);
        setError(true);
      }
    };

    obtenerProducto();
  }, [id]);

  useEffect(() => {
    if (!producto) return;

    fetch("/detalles.json")
      .then((res) => res.json())
      .then((data) => {
        const detalle = data.productos_deportivos.find(
          (d) => d.marca === producto.nombre
        );
        setDetallesMarca(detalle);
      })
      .catch((err) => console.error("Error al obtener detalles:", err));
  }, [producto]);

  if (error) return <div>Producto no encontrado.</div>;
  if (!producto) return <div>Cargando...</div>;

  const { nombre, precio, imagen, actividad, disponible } = producto;

  return (
    <main className="contenedor seccion contenido-principal">
      <div className="producto-detalle">
        <div className="producto-info">
          <h1>{nombre.toUpperCase()}</h1>
          <p className="precio">$ {precio.toLocaleString("es-AR")}</p>
          <p>
            <strong>Modelo:</strong> {imagen.split(".")[0]}
          </p>
          <div className="producto-inf">
            <p>
              <strong>Actividad:</strong> {actividad}
            </p>
            <p>
              <strong>Disponibilidad:</strong>{" "}
              {disponible ? "En stock" : "Agotado"}
            </p>
            <p>
              <strong>Talles disponibles:</strong>{" "}
              {disponible ? "35 al 44" : "ninguno!"}
            </p>
          </div>
        </div>

        <div className="producto-contenido">
          <div className="producto-imagen">
            <img src={`/img/${imagen}`} alt={nombre} />
          </div>
          <div className="producto-descripcion">
            {detallesMarca && (
              <div className="producto-detalles-extra">
                <p>
                  <strong>Actividad más recomendada</strong>
                </p>
                {detallesMarca.actividad_apta.map((texto, index) => (
                  <p className="p-producto" key={`act-${index}`}>
                    {texto}
                  </p>
                ))}
                <p>
                  <strong>Beneficios y materiales</strong>
                </p>
                {detallesMarca.beneficios_materiales.map((texto, index) => (
                  <p className="p-producto" key={`mat-${index}`}>
                    {texto}
                  </p>
                ))}
              </div>
            )}
            <button
              className="boton-verde"
              onClick={() => window.history.back()}
            >
              ← Volver a productos
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Producto;
