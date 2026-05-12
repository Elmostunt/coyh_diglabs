import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

const NAV_LINKS = [
  { to: '/', label: 'Inicio' },
  { to: '/software', label: 'Software' },
  { to: '/datos', label: 'Datos' },
  { to: '/nosotros', label: 'Nosotros' },
  { to: '/empleos', label: 'Empleos' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();
  const isDatos = pathname === '/datos';

  return (
    <nav className={`sticky top-[44px] z-40 w-full border-b border-white/10 ${
      isDatos
        ? 'bg-gradient-to-r from-green-600 via-green-700 to-green-800'
        : 'bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800'
    }`}>
      <div className="mx-auto flex h-16 sm:h-20 w-full max-w-6xl items-center justify-between gap-2 sm:gap-4 px-3 sm:px-4">

        {/* Brand */}
        <Link to="/" className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1" onClick={() => setIsOpen(false)}>
          <img
            src="/logo_chico.jpg"
            className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg sm:rounded-xl object-cover ring-1 ring-white/20 shrink-0"
            alt="Sur Digital Labs"
          />
          <div className="leading-tight min-w-0">
            <div className="text-white font-extrabold tracking-tight text-sm sm:text-base truncate">Sur Digital Labs</div>
            <div className="text-xs text-white/80 hidden xs:block">Software · Datos · Automatización</div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-5 text-sm font-semibold text-white/90">
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                isActive
                  ? 'text-white border-b-2 border-white/60 pb-0.5'
                  : 'hover:text-white transition'
              }
            >
              {label}
            </NavLink>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex shrink-0">
          <Link
            to="/contacto"
            className="inline-flex items-center rounded-full bg-white/15 border border-white/25 px-4 sm:px-5 py-2 text-sm font-extrabold text-white hover:bg-white/25 transition touch-manipulation"
          >
            Cotiza tu proyecto
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden grid h-10 w-10 place-items-center rounded-lg text-white hover:bg-white/10 transition touch-manipulation"
          aria-label="Menú"
          aria-expanded={isOpen}
        >
          {isOpen ? (
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

      {/* Mobile Menu */}
      {isOpen && (
        <div className={`md:hidden border-t border-white/10 ${isDatos ? 'bg-green-800' : 'bg-blue-800'}`}>
          <div className="px-4 py-4 space-y-1">
            {NAV_LINKS.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="block py-2.5 text-white font-semibold hover:text-white/80 transition touch-manipulation"
                onClick={() => setIsOpen(false)}
              >
                {label}
              </Link>
            ))}
            <div className="pt-3 border-t border-white/10">
              <Link
                to="/contacto"
                className="block py-2.5 text-white font-extrabold hover:text-white/80 transition touch-manipulation"
                onClick={() => setIsOpen(false)}
              >
                Contáctanos
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
