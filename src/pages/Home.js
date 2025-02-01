import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blancoCremoso">
      <h1 className="text-4xl font-bold text-azulOscuro mb-6">¡Bienvenido a Sur Digital Labs!</h1>
      <p className="text-lg text-azulGrisaceo mb-8 text-center">
        Explora nuestros Servicios, gestiona tu cita de consultoria y cotiza.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          to="/productos"
          className="bg-azulOscuro text-blancoHueso py-4 px-6 rounded shadow-md hover:bg-azulProfundo transition text-center"
        >
          Ver Productos
        </Link>
        <Link
          to="/carrito"
          className="bg-verdeTurquesa text-blancoHueso py-4 px-6 rounded shadow-md hover:bg-turquesaVibrante transition text-center"
        >
          Ir al Carrito
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