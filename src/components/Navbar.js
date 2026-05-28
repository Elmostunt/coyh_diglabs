import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const NAV_LINKS = [
  { to: '/', label: 'Inicio' },
  { to: '/software', label: 'Software' },
  { to: '/datos', label: 'Datos & IA' },
  { to: '/nosotros', label: 'Nosotros' },
  { to: '/contacto', label: 'Contacto' },
];

const SunIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 7a5 5 0 100 10A5 5 0 0012 7z" />
  </svg>
);

const MoonIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
  </svg>
);

const Navbar = ({ isDark, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-slate-100 dark:border-slate-700 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">

        {/* Brand */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0" onClick={() => setIsOpen(false)}>
          <img
            src="/logo_chico.jpg"
            className="h-8 w-8 rounded-lg object-cover shrink-0"
            alt="Sur Digital Labs"
          />
          <span className="font-bold text-slate-900 dark:text-white text-sm tracking-tight">
            Sur Digital Labs
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `text-sm transition-colors duration-200 ${
                  isActive
                    ? 'text-blue-600 font-semibold'
                    : 'text-slate-600 dark:text-slate-300 font-medium hover:text-slate-900 dark:hover:text-white'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>

        {/* Desktop actions */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <button
            onClick={toggleTheme}
            className="h-9 w-9 grid place-items-center rounded-full border border-slate-200 dark:border-slate-600 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200"
            aria-label={isDark ? 'Activar modo claro' : 'Activar modo oscuro'}
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>
          <Link
            to="/contacto"
            className="rounded-full bg-slate-950 dark:bg-white px-5 py-2 text-sm font-semibold text-white dark:text-slate-950 hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors duration-200"
          >
            Hablemos
          </Link>
        </div>

        {/* Mobile toggle */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="h-9 w-9 grid place-items-center rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            aria-label={isDark ? 'Activar modo claro' : 'Activar modo oscuro'}
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>
          <button
            onClick={() => setIsOpen((v) => !v)}
            className="h-9 w-9 grid place-items-center rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={isOpen}
          >
            {isOpen ? (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-900">
          <div className="px-4 py-4 space-y-0.5">
            {NAV_LINKS.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="block py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition"
                onClick={() => setIsOpen(false)}
              >
                {label}
              </Link>
            ))}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-700 mt-2">
              <Link
                to="/contacto"
                className="block py-2.5 text-sm font-semibold text-blue-600"
                onClick={() => setIsOpen(false)}
              >
                Hablemos →
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
