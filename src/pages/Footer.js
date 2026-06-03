// pages/Footer.js
import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-slate-950 dark:ring-1 dark:ring-white/10 text-white">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid gap-8 sm:gap-10 md:grid-cols-4">

          {/* Marca */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5">
              <img
                src="/logo_chico.jpg"
                alt="Sur Digital Labs"
                className="h-9 w-9 rounded-lg object-cover shrink-0"
              />
              <div className="leading-tight">
                <div className="font-bold text-sm">Sur Digital Labs</div>
                <div className="text-xs text-slate-400">Software · Datos · Automatización</div>
              </div>
            </div>
            <p className="mt-4 text-sm text-slate-400 leading-relaxed">
              Tecnología hecha con criterio, desde Coyhaique.
            </p>
          </div>

          {/* Servicios */}
          <nav className="text-sm">
            <h4 className="mb-4 font-semibold text-slate-200">Servicios</h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <Link className="hover:text-white transition-colors duration-200" to="/software">
                  Software a Medida
                </Link>
              </li>
              <li>
                <Link className="hover:text-white transition-colors duration-200" to="/datos">
                  Datos & Analítica
                </Link>
              </li>
              <li>
                <Link className="hover:text-white transition-colors duration-200" to="/software">
                  Automatización
                </Link>
              </li>
              <li>
                <Link className="hover:text-white transition-colors duration-200" to="/blog">
                  Blog
                </Link>
              </li>
            </ul>
          </nav>

          {/* Compañía */}
          <nav className="text-sm">
            <h4 className="mb-4 font-semibold text-slate-200">Compañía</h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <Link className="hover:text-white transition-colors duration-200" to="/">
                  Inicio
                </Link>
              </li>
              <li>
                <Link className="hover:text-white transition-colors duration-200" to="/nosotros">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link className="hover:text-white transition-colors duration-200" to="/empleos">
                  Empleos
                </Link>
              </li>
              <li>
                <Link className="hover:text-white transition-colors duration-200" to="/contacto">
                  Contacto
                </Link>
              </li>
            </ul>
          </nav>

          {/* Contacto + Redes */}
          <div className="text-sm">
            <h4 className="mb-4 font-semibold text-slate-200">Contacto</h4>
            <div className="space-y-2 text-slate-400">
              <p>surdigitallabs@gmail.com</p>
              <p>+56 9 7520 4813</p>
            </div>
            <div className="mt-5 flex items-center gap-3">
              <a
                href="https://www.linkedin.com/company/sur-digital-labs/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="h-9 w-9 grid place-items-center rounded-full bg-slate-800 hover:bg-slate-700 transition-colors duration-200"
              >
                <svg viewBox="0 0 448 512" className="h-3.5 w-3.5 fill-current">
                  <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 1 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/surdigitallabs"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="h-9 w-9 grid place-items-center rounded-full bg-slate-800 hover:bg-slate-700 transition-colors duration-200"
              >
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 sm:px-6 py-5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <span>Hecho en Coyhaique, Patagonia.</span>
          <span>© {new Date().getFullYear()} Laboratorio de Soluciones del Sur S.L.</span>
        </div>
      </div>
    </footer>
  );
}
