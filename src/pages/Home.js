import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    { src: 'chileworld.webp', alt: 'world' },
    { src: 'ofi1.webp', alt: 'ofi1' },
    { src: 'ofi2.webp', alt: 'ofi2' },
    { src: 'ofi3.webp', alt: 'ofi3' },
    { src: 'modern.webp', alt: 'Moderno' }
  ];

  const showSlide = (index) => {
    if (index >= slides.length) {
      setCurrentSlide(0);
    } else if (index < 0) {
      setCurrentSlide(slides.length - 1);
    } else {
      setCurrentSlide(index);
    }
  };

  const changeSlide = (direction) => {
    showSlide(currentSlide + direction);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      changeSlide(1);
    }, 3000); // Cambia de imagen cada 3 segundos
    return () => clearInterval(interval);
  }, [currentSlide]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blancoCremoso">
      <div className="slider-container-home">
        {slides.map((slide, index) => (
          <img
            key={index}
            className={`slider-item-home ${index === currentSlide ? 'active' : ''}`}
            src={slide.src}
            alt={slide.alt}
          />
        ))}
        <a className="prev" onClick={() => changeSlide(-1)}>&#10094;</a>
        <a className="next" onClick={() => changeSlide(1)}>&#10095;</a>
      </div>
      <h1 className="text-4xl font-bold text-azulOscuro mb-6">¡Bienvenido a Sur Digital Labs!</h1>
      <p className="text-lg text-azulGrisaceo mb-8 text-center">
        Explora nuestros Servicios, gestiona tu cita de consultoria y cotiza.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          to="/servicios"
          className="bg-azulOscuro text-blancoHueso py-4 px-6 rounded shadow-md hover:bg-azulProfundo transition text-center"
        >
          Ver Servicios
        </Link>
        <Link
          to="/usuarios"
          className="bg-azulGrisaceo text-blancoHueso py-4 px-6 rounded shadow-md hover:bg-azulProfundo transition text-center"
        >
          Ver Usuarios
        </Link>
        <Link
          to="/pedidos"
          className="bg-red-500 text-blancoHueso py-4 px-6 rounded shadow-md hover:bg-red-600 transition text-center"
        >
          Revisar Pedidos
        </Link>
      </div>
    </div>
  );
};

export default Home;