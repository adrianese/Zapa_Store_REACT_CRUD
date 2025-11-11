import React, { useEffect, useState } from 'react';
import './Buscador.css'; 

const Buscador = ({ productos, onFiltrar }) => {
  const [marcaSeleccionada, setMarcaSeleccionada] = useState('');
  const [actividadSeleccionada, setActividadSeleccionada] = useState('');
  const [ordenPrecio, setOrdenPrecio] = useState('');

  const [marcas, setMarcas] = useState([]);
  const [actividades, setActividades] = useState([]);

  // Cargar opciones únicas de marca y actividad
  useEffect(() => {
    const marcasUnicas = [...new Set(productos.map((p) => p.nombre))];
    const actividadesUnicas = [...new Set(productos.map((p) => p.actividad))];
    setMarcas(marcasUnicas);
    setActividades(actividadesUnicas);
  }, [productos]);

  // Aplicar filtros
  useEffect(() => {
    let filtrados = productos.filter(
      (p) =>
        (marcaSeleccionada === '' || p.nombre === marcaSeleccionada) &&
        (actividadSeleccionada === '' || p.actividad === actividadSeleccionada)
    );

    if (ordenPrecio === 'asc') {
      filtrados.sort((a, b) => a.precio - b.precio);
    } else if (ordenPrecio === 'desc') {
      filtrados.sort((a, b) => b.precio - a.precio);
    }

    onFiltrar(filtrados);
  }, [marcaSeleccionada, actividadSeleccionada, ordenPrecio, productos, onFiltrar]);

  return (
    <section className="formulario buscador">
      <h2>Encontrá los Mejores Precios en Zapatillas</h2>
      <h3>¿Qué Estás Buscando?</h3>

      <div className="input-buscador">
        <button
          className="boton-verde boton-redondeado"
          onClick={() => {
            setMarcaSeleccionada('');
            setActividadSeleccionada('');
            setOrdenPrecio('');
            onFiltrar(productos);
          }}
        >
          Todos los productos
        </button>

        <label>
          Marca:
          <select
            value={marcaSeleccionada}
            onChange={(e) => setMarcaSeleccionada(e.target.value)}
          >
            <option value="">Todas las marcas</option>
            {marcas.map((marca) => (
              <option key={marca} value={marca}>
                {marca}
              </option>
            ))}
          </select>
        </label>

        <label>
          Actividad:
          <select
            value={actividadSeleccionada}
            onChange={(e) => setActividadSeleccionada(e.target.value)}
          >
            <option value="">Todas las actividades</option>
            {actividades.map((act) => (
              <option key={act} value={act}>
                {act}
              </option>
            ))}
          </select>
        </label>

        <label>
          Precio:
          <select
            value={ordenPrecio}
            onChange={(e) => setOrdenPrecio(e.target.value)}
          >
            <option value="">Sin orden</option>
            <option value="asc">Menor a mayor</option>
            <option value="desc">Mayor a menor</option>
          </select>
        </label>
      </div>
    </section>
  );
};

export default Buscador;