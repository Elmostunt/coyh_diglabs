// src/components/Navbar.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUsuario } from '../context/UsuarioContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { usuario, cerrarSesion } = useUsuario();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleCerrarSesion = () => {
    cerrarSesion();
    alert('Has cerrado sesión.');
    navigate('/');
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="sticky top-[44px] z-40 w-full border-b border-white/10 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800">
      <div className="mx-auto flex h-16 sm:h-20 w-full max-w-6xl items-center justify-between gap-2 sm:gap-4 px-3 sm:px-4">
        {/* Marca */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
          <Link to="/" className="flex items-center gap-2 sm:gap-3" onClick={closeMenu}>
            <img
              src="logo_chico.jpg"
              className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg sm:rounded-xl object-cover ring-1 ring-white/20 shrink-0"
              alt="logo"
            />
            <div className="leading-tight min-w-0">
              <div className="text-white font-extrabold tracking-tight text-sm sm:text-base truncate">Sur Digital Labs</div>
              <div className="text-xs text-white/80 hidden xs:block">Software · Datos · Cloud</div>
            </div>
          </Link>
        </div>

        {/* Links Desktop */}
        <div className="hidden md:flex items-center gap-6 text-sm font-semibold text-white/90">
          <Link className="hover:text-white transition" to="/">Inicio</Link>
          <Link className="hover:text-white transition" to="/servicios">Servicios</Link>
          <Link className="hover:text-white transition" to="/nosotros">Nosotros</Link>
          <Link className="hover:text-white transition" to="/empleos">Empleos</Link>
        </div>

        {/* Acciones Desktop */}
        <div className="hidden md:flex items-center gap-3">
          {usuario ? (
            <>
              <span className="hidden lg:inline text-white/90 text-sm">
                Bienvenido, <strong className="text-white">{usuario.nombre}</strong>
              </span>
              <Link
                to="/mi-perfil"
                className="hidden sm:inline-flex items-center rounded-full border border-white/25 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10 transition touch-manipulation"
              >
                Mi Perfil
              </Link>
              <button
                onClick={handleCerrarSesion}
                className="inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-extrabold text-blue-700 shadow-sm hover:bg-white/90 transition touch-manipulation"
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <Link
              to="/contacto"
              className="inline-flex items-center rounded-full border border-white/25 px-4 sm:px-5 py-2 text-sm font-extrabold text-white hover:bg-white/10 transition touch-manipulation"
            >
              Contáctanos
            </Link>
          )}
        </div>

        {/* Botón Menú Móvil */}
        <button
          onClick={toggleMenu}
          className="md:hidden grid h-10 w-10 place-items-center rounded-lg text-white hover:bg-white/10 transition touch-manipulation"
          aria-label="Menú"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? (
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Menú Móvil */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-blue-800">
          <div className="px-4 py-4 space-y-3">
            <Link
              to="/"
              className="block py-2 text-white font-semibold hover:text-white/80 transition touch-manipulation"
              onClick={closeMenu}
            >
              Inicio
            </Link>
            <Link
              to="/servicios"
              className="block py-2 text-white font-semibold hover:text-white/80 transition touch-manipulation"
              onClick={closeMenu}
            >
              Servicios
            </Link>
            <Link
              to="/nosotros"
              className="block py-2 text-white font-semibold hover:text-white/80 transition touch-manipulation"
              onClick={closeMenu}
            >
              Nosotros
            </Link>
            <Link
              to="/empleos"
              className="block py-2 text-white font-semibold hover:text-white/80 transition touch-manipulation"
              onClick={closeMenu}
            >
              Empleos
            </Link>
            {usuario ? (
              <>
                <Link
                  to="/mi-perfil"
                  className="block py-2 text-white font-semibold hover:text-white/80 transition touch-manipulation"
                  onClick={closeMenu}
                >
                  Mi Perfil
                </Link>
                <button
                  onClick={handleCerrarSesion}
                  className="w-full text-left py-2 text-white font-extrabold hover:text-white/80 transition touch-manipulation"
                >
                  Cerrar sesión
                </button>
              </>
            ) : (
              <Link
                to="/contacto"
                className="block py-2 text-white font-extrabold hover:text-white/80 transition touch-manipulation"
                onClick={closeMenu}
              >
                Contáctanos
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
