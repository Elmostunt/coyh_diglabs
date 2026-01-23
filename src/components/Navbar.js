// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUsuario } from '../context/UsuarioContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { usuario, cerrarSesion } = useUsuario();

  const handleCerrarSesion = () => {
    cerrarSesion();
    alert('Has cerrado sesión.');
    navigate('/');
  };

  return (
    <nav className="sticky top-[44px] z-40 w-full border-b border-white/10 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800">
      <div className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between gap-4 px-4">
        {/* Marca */}
        <div className="flex items-center gap-3 min-w-0">
          <Link to="/" className="flex items-center gap-3">
            <img
              src="logo_chico.jpg"
              className="h-12 w-12 rounded-xl object-cover ring-1 ring-white/20"
              alt="logo"
            />
            <div className="leading-tight">
              <div className="text-white font-extrabold tracking-tight">Sur Digital Labs</div>
              <div className="text-xs text-white/80">Software · Datos · Cloud</div>
            </div>
          </Link>
        </div>

        {/* Links */}
        <div className="hidden md:flex items-center gap-6 text-sm font-semibold text-white/90">
          <Link className="hover:text-white" to="/">Inicio</Link>
          <Link className="hover:text-white" to="/servicios">Servicios</Link>
          <Link className="hover:text-white" to="/nosotros">Nosotros</Link>
          <Link className="hover:text-white" to="/empleos">Empleos</Link>
        </div>

        {/* Acciones */}
        <div className="flex items-center gap-3">
          {usuario ? (
            <>
              <span className="hidden lg:inline text-white/90 text-sm">
                Bienvenido, <strong className="text-white">{usuario.nombre}</strong>
              </span>
              <Link
                to="/mi-perfil"
                className="hidden sm:inline-flex items-center rounded-full border border-white/25 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
              >
                Mi Perfil
              </Link>
              <button
                onClick={handleCerrarSesion}
                className="inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-extrabold text-blue-700 shadow-sm hover:bg-white/90"
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <Link
              to="/contacto"
              className="inline-flex items-center rounded-full border border-white/25 px-5 py-2 text-sm font-extrabold text-white hover:bg-white/10"
            >
              Contáctanos
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
