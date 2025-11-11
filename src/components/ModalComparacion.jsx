import React from 'react';
import './ModalComparacion.css'; // estilos personalizados

const ModalComparacion = ({ productos, onCerrar }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-contenido">
        <button className="cerrar-modal" onClick={onCerrar}>
          X
        </button>
        <h2>Comparación de Productos</h2>
        <div className="comparacion-grid">
          {productos.map((p) => (
            <div key={p.id} className="comparacion-item">
              <img src={`img/${p.imagen}`} alt={p.nombre} />
              <h3>{p.nombre}</h3>
              <p>Actividad: {p.actividad}</p>
              <p>Precio: $ {p.precio.toLocaleString('es-AR')}</p>
              <p>Disponibilidad: {p.disponible ? 'Sí' : 'No'}</p>
            </div>
          ))}
        </div>
        <button className="boton-amarillo-block" onClick={onCerrar}>
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default ModalComparacion;