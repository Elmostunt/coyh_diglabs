import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const NAV_LINKS = [
  { to: '/', label: 'Inicio' },
  { to: '/software', label: 'Software' },
  { to: '/datos', label: 'Datos & IA' },
  { to: '/nosotros', label: 'Nosotros' },
  { to: '/blog', label: 'Blog' },
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
    <nav className="sticky top-0 z-40 w-full border-b border-ink/10 bg-paper/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">

        {/* Marca */}
        <Link to="/" className="flex items-center gap-3 shrink-0" onClick={() => setIsOpen(false)}>
          <img
            src="/logo_chico.jpg"
            className="h-8 w-8 rounded-sm object-cover shrink-0 border border-ink/15"
            alt="Sur Digital Labs"
          />
          <span className="leading-none">
            <span className="block font-display font-semibold text-ink text-[15px] tracking-tight">
              Sur Digital Labs
            </span>
            <span className="block mt-0.5 font-mono text-[9px] uppercase tracking-[0.22em] text-ink/50">
              Patagonia · Chile
            </span>
          </span>
        </Link>

        {/* Nav escritorio */}
        <div className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `text-sm transition-colors duration-200 ${
                  isActive
                    ? 'font-display italic font-semibold text-petrol dark:text-aqua'
                    : 'font-medium text-ink/70 hover:text-ink'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>

        {/* Acciones escritorio */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <button
            onClick={toggleTheme}
            className="h-9 w-9 grid place-items-center rounded-full border border-ink/15 text-ink/60 hover:bg-paper2 hover:text-ink transition-colors duration-200"
            aria-label={isDark ? 'Activar modo claro' : 'Activar modo oscuro'}
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>
          <Link
            to="/contacto"
            className="rounded-sm bg-ink px-5 py-2.5 text-sm font-semibold text-paper hover:bg-petrol dark:hover:bg-aqua dark:hover:text-night transition-colors duration-200"
          >
            Conversemos
          </Link>
        </div>

        {/* Toggle móvil */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="h-9 w-9 grid place-items-center rounded-sm text-ink/60 hover:bg-paper2 transition"
            aria-label={isDark ? 'Activar modo claro' : 'Activar modo oscuro'}
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>
          <button
            onClick={() => setIsOpen((v) => !v)}
            className="h-9 w-9 grid place-items-center rounded-sm text-ink/70 hover:bg-paper2 transition"
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

      {/* Menú móvil editorial */}
      {isOpen && (
        <div className="md:hidden border-t border-ink/10 bg-paper">
          <div className="px-4 py-5">
            {NAV_LINKS.map(({ to, label }, i) => (
              <Link
                key={to}
                to={to}
                className="flex items-baseline justify-between border-b border-ink/10 py-3.5 group"
                onClick={() => setIsOpen(false)}
              >
                <span className="font-display text-2xl text-ink group-hover:italic">{label}</span>
                <span className="font-mono text-[10px] text-ink/40">0{i + 1}</span>
              </Link>
            ))}
            <Link
              to="/contacto"
              className="mt-5 flex items-center justify-center gap-2 rounded-sm bg-ink py-3.5 text-sm font-semibold text-paper"
              onClick={() => setIsOpen(false)}
            >
              Conversemos sobre tu proyecto →
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
