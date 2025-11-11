import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "./CarritoModal.css";

const CarritoModal = ({
  carrito,
  setCarrito,
  onEliminar,
  onVaciar,
  onCerrar,
  onConfirmar,
}) => {
  const [visible, setVisible] = useState(false);
  const total = carrito.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  useEffect(() => {
    setVisible(true);
    const timeout = setTimeout(() => {
      setVisible(false);
      setTimeout(onCerrar, 300);
    }, 4000);
    return () => clearTimeout(timeout);
  }, [onCerrar]);

  const agregarItem = (item) => {
    Swal.fire({
      title: "Seleccioná el talle",
      input: "select",
      inputOptions: Object.fromEntries(
        Array.from({ length: 11 }, (_, i) => {
          const talle = (35 + i).toString();
          return [talle, talle];
        })
      ),
      inputPlaceholder: "Talle",
      showCancelButton: true,
      confirmButtonText: "Agregar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const talleNuevo = result.value;
        const existe = carrito.find(
          (p) => p.id === item.id && p.talle === talleNuevo
        );
        if (existe) {
          existe.cantidad += 1;
          setCarrito([...carrito]);
        } else {
          setCarrito([...carrito, { ...item, talle: talleNuevo, cantidad: 1 }]);
        }
      }
    });
  };

  const quitarItem = (item) => {
    const index = carrito.findIndex(
      (p) => p.id === item.id && p.talle === item.talle
    );
    if (index !== -1) {
      const nuevoCarrito = [...carrito];
      if (nuevoCarrito[index].cantidad > 1) {
        nuevoCarrito[index].cantidad -= 1;
      } else {
        nuevoCarrito.splice(index, 1);
      }
      setCarrito(nuevoCarrito);
    }
  };

  return (
    <div
      className={`modal-carrito-overlay ${visible ? "fade-in" : "fade-out"}`}
    >
      <div
        className={`modal-carrito-contenido ${
          visible ? "slide-in" : "slide-out"
        }`}
      >
        <button className="cerrar-modal" onClick={onCerrar}>
          ×
        </button>
        <h2>Resumen del Carrito</h2>

        {carrito.length === 0 ? (
          <p>No hay productos en el carrito.</p>
        ) : (
          <>
            <ul className="lista-carrito">
              {carrito.map((item, i) => (
                <li key={`${item.id}-${item.talle}`} className="item-carrito">
                  <img
                    src={`img/${item.imagen}`}
                    alt={item.nombre}
                    className="miniatura-carrito"
                    title={`Modelo: ${item.imagen.split(".")[0]}`}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "img/default.png";
                    }}
                  />
                  <div className="detalle-carrito-linea">
                    <span className="marca-modelo">
                      <strong>{i + 1}.</strong> {item.nombre} {" "}
                      {item.imagen.split(".")[0]}
                    </span>
                    <span className="precio-item">
                      ${item.precio.toLocaleString("es-AR")}
                    </span>
                    <span className="talle-item">Talle: {item.talle}</span>
                    <span className="cantidad-item">
                      Cantidad: {item.cantidad}
                    </span>

                    <div className="acciones-item">
                      <button
                        className="boton-cantidad"
                        onClick={() => agregarItem(item)}
                      >
                        ➕ 
                      </button>
                      <button
                        className="boton-cantidad"
                        onClick={() => quitarItem(item)}
                      >
                        ➖ 
                      </button>
                    </div>
                  </div>
                  <button
                    className="boton-eliminar"
                    onClick={() => onEliminar(item.id, item.talle)}
                  >
                    🗑️
                  </button>
                </li>
              ))}
            </ul>

            <p className="total-carrito">
              <strong>Total:</strong>{" "}
              <span className="precio-total">
                ${total.toLocaleString("es-AR")}
              </span>
            </p>

            <div className="acciones-carrito">
              <button className="boton-verde" onClick={onVaciar}>
                Vaciar Carrito
              </button>
              <button className="boton-verde" onClick={onConfirmar}>
                Confirmar Compra
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CarritoModal;
