
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Formulario.css";

const Formulario = ({
  titulo,
  action,
  metodo = "POST",
  campos = [],
  mensaje = "",
  botonTexto = "Enviar",
  incluirSuscripcion = false,
  soloLectura = false,
  onSuccess,
}) => {
  const formRef = useRef(null);
  const navigate = useNavigate();
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);

    try {
      const response = await fetch(action, {
        method: metodo,
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setEnviado(true);
        if (onSuccess) onSuccess();
        navigate("/");
      } else {
        alert("Hubo un error al enviar el formulario.");
      }
    } catch (error) {
      console.error("Error al enviar:", error);
      alert("No se pudo enviar el formulario.");
    }
  };

  return (
    <section className="formulario-seccion">
      {titulo && <h3>{titulo}</h3>}

      <form ref={formRef} onSubmit={handleSubmit} className="formulario">
        <fieldset>
          <legend>Información Personal</legend>

          {campos.map((campo) => (
            <div key={campo.name}>
              <label htmlFor={campo.name}>{campo.label}</label>
              <input
                type={campo.type}
                name={campo.name}
                id={campo.name}
                placeholder={campo.placeholder}
                required={campo.required}
                autoComplete="on"
              />
            </div>
          ))}

          <label htmlFor="mensaje">Mensaje</label>
          <textarea
            name="mensaje"
            id="mensaje"
            rows="4"
            placeholder="Tu mensaje"
            defaultValue={mensaje}
            readOnly={soloLectura}
            required={!soloLectura}
          />
        </fieldset>

        {incluirSuscripcion && (
          <fieldset>
            <legend>Desea recibir novedades</legend>
            <p>Elija una opción</p>
            <div className="grupo-radio">
              <label className="radio-label" htmlFor="contacto-suscripcion">
                <input
                  type="radio"
                  value="suscribir"
                  name="contacto"
                  id="contacto-suscripcion"
                />
                Suscribirme
              </label>

              <label className="radio-label" htmlFor="contacto-desuscripcion">
                <input
                  type="radio"
                  value="desuscribir"
                  name="contacto"
                  id="contacto-desuscripcion"
                />
                Desuscribirme
              </label>
            </div>
          </fieldset>
        )}

        <input
          type="submit"
          value={botonTexto}
          className="boton-verde"
          disabled={enviado}
        />
      </form>
    </section>
  );
};

export default Formulario;
