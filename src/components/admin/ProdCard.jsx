import React from "react";
import "./ProdCard.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ProdCard = ({ producto, onDelete }) => {
  const navigate = useNavigate();
  const {
    imagen,
    nombre,
    id,
    actividad,
    disponible,
    precio,
    actividadText,
    materialesText,
  } = producto;

  const modelo = imagen.replace(".jpg", "");

  const handleDelete = () => {
    Swal.fire({
      title: "¿Estás seguro de eliminar este producto?",
      html: `
        <div style="text-align:left;">
          <strong>Nombre:</strong> ${nombre}<br/>
          <strong>Modelo:</strong> ${modelo}<br/>
          <strong>Actividad:</strong> ${actividad}<br/>
          <strong>Disponible:</strong> ${disponible ? "✅ Sí" : "❌ No"}<br/>
          <strong>Precio:</strong> $${precio?.toLocaleString("es-AR")}
        </div>
      `,
      imageUrl: `/img/${imagen}`,
      imageWidth: 200,
      imageAlt: nombre,
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#999",
      confirmButtonText: "🗑️ Sí, borrar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await fetch(
            `https://68e448c88e116898997b75e3.mockapi.io/api/productos/products/${id}`,
            {
              method: "DELETE",
            }
          );
          Swal.fire("Eliminado", "El producto fue borrado.", "success");
          if (onDelete) onDelete(id); // actualiza la lista si se pasa función
        } catch (error) {
          Swal.fire("Error", "No se pudo borrar el producto.",{error});
        }
      }
    });
  };

  return (
    <div className="prod-card">
      {/* Imagen */}
      <div className="prod-img">
        <img src={`/img/${imagen}`} alt={nombre} />
      </div>

      {/* Datos */}
      <div className="prod-info">
        <h3 className="prod-nombre">{nombre}</h3>
        <p className="prod-label">
          Modelo: <strong>{modelo}</strong>
        </p>
        <p className="prod-label">Actividad: {actividad}</p>
        <p className="prod-label">
          Disponible:{" "}
          <span
            className={
              String(disponible).toLowerCase() === "true"
                ? "badge-disponible"
                : "badge-agotado"
            }
          >
            {String(disponible).toLowerCase() === "true" ? "✅ Sí" : "❌ No"}
          </span>
        </p>

        <p className="prod-label">
          Precio:{" "}
          <span className="precio-bold">
            ${precio?.toLocaleString("es-AR")}
          </span>
        </p>
      </div>

      {/* Acordeones */}
      <div className="prod-details">
        <details className="hover-expand">
          <summary>
            <span className="summary-arrow"></span> Actividad
          </summary>
          <p className="detalle-text">
            {actividadText || "Sin descripción disponible."}
          </p>
        </details>
        <details className="hover-expand">
          <summary>
            <span className="summary-arrow"></span> Materiales
          </summary>
          <p className="detalle-text">
            {materialesText || "Sin materiales especificados."}
          </p>
        </details>
      </div>

      {/* Botones */}
      <div className="acciones-card">
        <button onClick={() => navigate(`/admin/update/${id}`)}>Editar</button>
        <button onClick={handleDelete}>Borrar</button>
      </div>
    </div>
  );
};

export default ProdCard;
