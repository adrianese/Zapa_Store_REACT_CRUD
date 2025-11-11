import React from "react";
import "./SeccionProductos.css";

const SeccionProductos = () => {
  return (
    <section id="productos">
      <div className="container text-center py-5">
        <h2>Nuestros Productos</h2>
        <div className="row productos">
          {/* Exclusivos */}
          <div className="col-12 col-md-4 columna">
            <h3 className="titulo">Exclusivos</h3>
            <i className="bi bi-award"></i>
            <p className="titulo-descripcion">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolores
              nobis doloribus itaque. Repudiandae corporis quod repellendus,
              aperiam, molestias aut sapiente sint veniam accusamus officiis
              excepturi iste suscipit exercitationem ullam voluptatum, totam sit
              est dolorum reiciendis?
            </p>
            <div className="badges-contenedor">
              <span className="badge rounded-pill text-bg-success">
                NUEVOS DISEÑOS
              </span>
              <span className="badge rounded-pill text-bg-dark">
                RECIÉN LLEGADOS
              </span>
            </div>
          </div>

          {/* Todos */}
          <div className="col-12 col-md-4 columna">
            <h3 className="titulo">Todos</h3>
            <i className="bi bi-align-center"></i>
            <p className="titulo-descripcion">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolores
              nobis doloribus itaque. Repudiandae corporis quod repellendus,
              aperiam, molestias aut sapiente sint veniam accusamus officiis
              excepturi iste suscipit exercitationem ullam voluptatum, totam sit
              est dolorum reiciendis?
            </p>
            <div className="badges-contenedor d-flex no-wrap">
              <span className="badge rounded-pill text-bg-success">
                TODAS LAS MARCAS
              </span>
              <span className="badge rounded-pill text-bg-dark">
                TODOS LOS MODELOS
              </span>
            </div>
          </div>

          {/* Discontinuos */}
          <div className="col-12 col-md-4 columna">
            <h3 className="titulo">Discontinuos</h3>
            <i className="bi bi-slash-circle"></i>
            <p className="parrafo">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolores
              nobis doloribus itaque. Repudiandae corporis quod repellendus,
              aperiam, molestias aut sapiente sint veniam accusamus officiis
              excepturi iste suscipit exercitationem ullam voluptatum, totam sit
              est dolorum reiciendis?
            </p>
            <div className="badges-contenedor">
              <span className="badge rounded-pill text-bg-success">
                MEJORES PRECIOS
              </span>
              <span className="badge rounded-pill text-bg-dark">
                VARIOS TALLES
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SeccionProductos;
