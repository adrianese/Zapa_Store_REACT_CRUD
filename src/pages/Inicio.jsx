
   import React from 'react';
   import SeccionProductos from '../components/SeccionProductos';
   import CarouselExclusivos from "../components/CarouselExclusivos";


const VideoBanner = () => {
  return (
    <>
      <div className="video">
        <div className="overlay">
          <video autoPlay muted loop poster="img/banner.png">
            <source src="video/zapastore.mp4" type="video/mp4" />
            Tu navegador no soporta el video HTML5.
          </video>
        </div>
      </div>

      <SeccionProductos />
      <CarouselExclusivos />
    </>
  );
};

export default VideoBanner;
