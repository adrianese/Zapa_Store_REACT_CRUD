import Formulario from "../components/Formulario";
import estanteImg from "/img/estante3903371.jpg";

function Contacto() {
  return (
    <main className="contenedor seccion">
      <picture>
        <source srcSet={estanteImg} type="image/jpeg" />
        <img
          src={estanteImg}
          alt="Contacto"
          className="contacto-img"
          loading="lazy"
        />
      </picture>
      <Formulario
        titulo="Llene el Formulario de Contacto"
        action="https://formspree.io/f/xrbkooqa"
        campos={[
          {
            label: "Nombre",
            name: "nombre",
            type: "text",
            placeholder: "Tu Nombre",
            required: true,
          },
          {
            label: "E-mail",
            name: "email",
            type: "email",
            placeholder: "Tu Email",
            required: true,
          },
          {
            label: "Teléfono",
            name: "telefono",
            type: "tel",
            placeholder: "Tu Teléfono",
            required: false,
          },
        ]}
        mensaje=""
        botonTexto="Enviar"
        incluirSuscripcion={true}
      />
      {/* contenido del formulario */}
    </main>
  );
}

export default Contacto;
