import React from "react";
import { Link } from "react-router-dom";

import { Carousel } from "react-bootstrap";
import './CarouselExclusivos.css';

const CarouselExclusivos = () => {
  const slides = [
    {
      img: "img/NI-9812.jpg",
      alt: "Zapatillas deportivas para running",
      titulo: "Desatá tu potencial.",
      descripcion: "Encontrá el impulso que necesitás en cada paso.",
      boton: { texto: "Explorá ahora", color: "#00CFFF" },
    },
    {
      img: "img/AD-1689.jpg",
      alt: "Zapatillas de training de alto rendimiento",
      titulo: "Corré sin límites.",
      descripcion: "Diseñadas para tu máximo rendimiento.",
      boton: { texto: "Ver modelos", color: "#FF5733" },
    },
    {
      img: "img/UN-0512.jpg",
      alt: "Calzado deportivo versátil",
      titulo: "Entrená más fuerte.",
      descripcion: "La comodidad y soporte que tus entrenamientos merecen.",
      boton: { texto: "Conocé más", color: "#7FFF00", textoColor: "#000000" },
    },
    {
      img: "img/NI-0983.jpg",
      alt: "Zapatillas con excelente amortiguación",
      titulo: "Dominá cada movimiento.",
      descripcion: "Amortiguación superior para tu mejor desempeño.",
      boton: { texto: "Comprar", color: "#00CFFF" },
    },
    {
      img: "img/AD-2241.jpg",
      alt: "Zapatillas para trail running",
      titulo: "Explorá cada camino.",
      descripcion: "Agarre y resistencia para tus aventuras outdoor.",
      boton: { texto: "Descubrí", color: "#FF5733" },
    },
    {
      img: "img/UN-7594.jpg",
      alt: "Zapatillas de moda deportiva",
      titulo: "Tu próxima meta te espera.",
      descripcion: "El estilo y la performance se unen en un solo calzado.",
      boton: {
        texto: "Ver colección",
        color: "#7FFF00",
        textoColor: "#000000",
      },
    },
  ];

  return (
    <section className="container exclusivos">
      <h2 className="text-center my-5">
        Modelos Exclusivos – Solo Venta On-line
      </h2>
      <div className="row justify-content-center">
        <div className="col-md-10 col-lg-8">
          <Carousel variant="dark">
            {slides.map((slide, index) => (
              <Carousel.Item key={index}>
                <img className="d-block w-75" src={slide.img} alt={slide.alt} />
                <Carousel.Caption className="carousel-caption-custom">
                  <h5>{slide.titulo}</h5>
                  <p>{slide.descripcion}</p>
                  <Link
                    to="/Productos"
                    className="btn btn-primary"
                    style={{
                      backgroundColor: slide.boton.color,
                      borderColor: slide.boton.color,
                      color: slide.boton.textoColor || "#fff",
                    }}
                  >
                    {slide.boton.texto}
                  </Link>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default CarouselExclusivos;
