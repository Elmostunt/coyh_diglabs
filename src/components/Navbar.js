// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUsuario } from '../context/UsuarioContext';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const { usuario, cerrarSesion } = useUsuario();

  const handleCerrarSesion = () => {
    cerrarSesion();
    alert('Has cerrado sesión.');
    navigate('/');
  };

  return (
    <nav className="bg-azulOscuro p-4 flex items-center justify-between h-20 w-full sticky top-0 z-50 shadow-lg">
      <div className="flex items-center space-x-4">
        <Link to="/">
          <img src="logo_chico.jpg" className="h-16 w-auto" alt="logo" />
        </Link>
        <span className="text-blancoHueso text-xl font-bold">Sur Digital Labs</span>
      </div>

      <div className="flex space-x-4 items-center">
        <Link to="/" className="text-blancoHueso hover:text-turquesaVibrante">Inicio</Link>
        <Link to="/servicios" className="text-blancoHueso hover:text-turquesaVibrante">Nuestros Servicios</Link>
        {/*<Link to="/galeria" className="text-blancoHueso hover:text-turquesaVibrante">Galeria</Link>*/}
        <Link to="/nosotros" className="text-blancoHueso hover:text-turquesaVibrante">Nosotros</Link>
        <Link to="/empleos" className="text-blancoHueso hover:text-turquesaVibrante">Empleos</Link>

        {usuario ? (
          <>
            <span className="text-blancoHueso">Bienvenido, <strong>{usuario.nombre}</strong></span>
            <Link to="/mi-perfil" className="text-blancoHueso hover:text-turquesaVibrante">Mi Perfil</Link>
            <button
              onClick={handleCerrarSesion}
              className="bg-verdeTurquesa text-blancoHueso px-4 py-2 rounded-lg hover:bg-turquesaVibrante"
            >
              Cerrar Sesión
            </button>
          </>
        ) : (
          <>
           {/* <Link to="/iniciar-sesion" className="text-blancoHueso hover:text-turquesaVibrante">Iniciar Sesión</Link>
            <Link to="/registrarse" className="text-blancoHueso hover:text-turquesaVibrante">Registrarse</Link>*/}
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
