// pages/Footer.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Footer() {
  const { pathname } = useLocation();
  const isDatos = pathname === '/datos';

  return (
    <footer className={`text-white ${
      isDatos
        ? 'bg-gradient-to-r from-green-950 via-green-900 to-green-800'
        : 'bg-gradient-to-r from-blue-950 via-blue-900 to-blue-800'
    }`}>
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid gap-8 sm:gap-10 md:grid-cols-4">
          {/* Sobre */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 sm:gap-3">
              <img
                src="/logo_chico.jpg"
                alt="Sur Digital Labs"
                className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg sm:rounded-xl object-cover ring-1 ring-white/20 shrink-0"
              />
              <div className="leading-tight min-w-0">
                <div className="font-extrabold text-sm sm:text-base">Sur Digital Labs</div>
                <div className="text-xs text-white/70">Software · Datos · Automatización</div>
              </div>
            </div>
            <p className="mt-3 text-xs text-white/80">
              Software, datos y automatización. Coyhaique.
            </p>
          </div>

          {/* Enlaces */}
          <nav className="text-sm">
            <h4 className="mb-3 sm:mb-4 font-extrabold text-sm sm:text-base">Enlaces</h4>
            <ul className="space-y-1.5 sm:space-y-2 text-white/80">
              <li><Link className="hover:text-white transition touch-manipulation block py-0.5" to="/">Inicio</Link></li>
              <li><Link className="hover:text-white transition touch-manipulation block py-0.5" to="/software">Software</Link></li>
              <li><Link className="hover:text-white transition touch-manipulation block py-0.5" to="/datos">Datos</Link></li>
              <li><Link className="hover:text-white transition touch-manipulation block py-0.5" to="/nosotros">Nosotros</Link></li>
              <li><Link className="hover:text-white transition touch-manipulation block py-0.5" to="/contacto">Contacto</Link></li>
              <li>
                <a href="https://wa.me/56975204813?text=Hola!%20Quiero%20información%20sobre%20SDLabCar." target="_blank" rel="noopener noreferrer" className="hover:text-white transition touch-manipulation block py-0.5">
                  SDLabCar
                </a>
              </li>
            </ul>
          </nav>

          {/* Contacto */}
          <div className="text-sm">
            <h4 className="mb-3 font-extrabold text-sm">Contacto</h4>
            <Link to="/contacto" className="text-white/80 hover:text-white text-xs">Escríbenos</Link>
          </div>

          {/* Redes */}
          <div className="text-sm">
            <h4 className="mb-3 sm:mb-4 font-extrabold text-sm sm:text-base">Síguenos</h4>
            <div className="flex items-center gap-2 sm:gap-3">
              <a
                href="https://www.linkedin.com/company/sur-digital-labs/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="grid h-10 w-10 place-items-center rounded-full bg-white/10 ring-1 ring-white/15 hover:bg-white/15 transition touch-manipulation"
              >
                <svg viewBox="0 0 448 512" className="h-4 w-4 fill-current">
                  <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 1 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/surdigitallabs"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="grid h-10 w-10 place-items-center rounded-full bg-white/10 ring-1 ring-white/15 hover:bg-white/15 transition touch-manipulation"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4z" />
                </svg>
              </a>
            </div>
            <div className="mt-3 sm:mt-4 text-xs text-white/70 break-words">
              surdigitallabs@gmail.com<br className="sm:hidden" />
              <span className="hidden sm:inline"> · </span>
              +56 9 7520 4813
            </div>
          </div>
        </div>
      </div>

      {/* CTA FOOTER */}
      <div className={`border-t border-white/10 ${isDatos ? 'bg-green-900/50' : 'bg-blue-900/50'}`}>
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-sm text-white/90">¿Proyecto en mente?</p>
            <Link to="/contacto" className={`rounded-full bg-white px-5 py-2 text-sm font-extrabold hover:bg-white/90 transition ${isDatos ? 'text-green-700' : 'text-blue-700'}`}>
              Cotiza tu proyecto
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 sm:px-6 py-4 sm:py-5 text-xs text-white/70 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-center sm:text-left">Hecho en Coyhaique, Patagonia.</span>
          <span className="text-center sm:text-right">© {new Date().getFullYear()} Laboratorio de Soluciones del Sur S.L.</span>
        </div>
      </div>
    </footer>
  );
}
