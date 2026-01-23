// pages/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-950 via-blue-900 to-blue-800 text-white">
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
                <div className="text-xs text-white/70">Software · Datos · Cloud</div>
              </div>
            </div>
            <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-white/80 leading-relaxed">
              Software y datos desde la Patagonia. Soluciones web, analítica y nube (GCP/AWS).
            </p>
          </div>

          {/* Enlaces */}
          <nav className="text-sm">
            <h4 className="mb-3 sm:mb-4 font-extrabold text-sm sm:text-base">Enlaces</h4>
            <ul className="space-y-1.5 sm:space-y-2 text-white/80">
              <li><Link className="hover:text-white transition touch-manipulation block py-0.5" to="/">Inicio</Link></li>
              <li><Link className="hover:text-white transition touch-manipulation block py-0.5" to="/servicios">Servicios</Link></li>
              <li><Link className="hover:text-white transition touch-manipulation block py-0.5" to="/galeria">Portafolio</Link></li>
              <li><Link className="hover:text-white transition touch-manipulation block py-0.5" to="/nosotros">Nosotros</Link></li>
              <li><Link className="hover:text-white transition touch-manipulation block py-0.5" to="/contacto">Contacto</Link></li>
            </ul>
          </nav>

          {/* Suscripción */}
          <div className="text-sm">
            <h4 className="mb-3 sm:mb-4 font-extrabold text-sm sm:text-base">Suscríbete</h4>
            <p className="text-white/80 text-xs sm:text-sm mb-2 sm:mb-0">Recibe nuestras novedades:</p>
            <form
              className="mt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Email"
                className="h-10 sm:h-10 w-full rounded-lg bg-white/10 px-3 text-white placeholder:text-white/50 ring-1 ring-white/15 focus:outline-none focus:ring-2 focus:ring-white/30 text-sm touch-manipulation"
              />
              <button
                type="submit"
                className="h-10 w-full sm:w-auto sm:shrink-0 rounded-lg bg-white px-4 font-extrabold text-blue-900 hover:bg-white/90 transition touch-manipulation text-sm"
              >
                Suscribir
              </button>
            </form>
            <div className="mt-2 text-xs text-white/60">Máximo 1 correo al mes.</div>
          </div>

          {/* Redes */}
          <div className="text-sm">
            <h4 className="mb-3 sm:mb-4 font-extrabold text-sm sm:text-base">Síguenos</h4>
            <div className="flex items-center gap-2 sm:gap-3">
              <a
                href="https://www.linkedin.com/company/surlabssl/"
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
                href="https://twitter.com/surlabs#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="grid h-10 w-10 place-items-center rounded-full bg-white/10 ring-1 ring-white/15 hover:bg-white/15 transition touch-manipulation"
              >
                <svg viewBox="0 0 512 512" className="h-4 w-4 fill-current">
                  <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
                </svg>
              </a>
            </div>
            <div className="mt-3 sm:mt-4 text-xs text-white/70 break-words">
              surdigitallabs@gmail.cl<br className="sm:hidden" />
              <span className="hidden sm:inline"> · </span>
              +56 9 7520 4813
            </div>
          </div>
        </div>
      </div>

      {/* CTA FOOTER */}
      <div className="border-t border-white/10 bg-blue-900/50">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 py-4 sm:py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
            <div className="text-center sm:text-left">
              <p className="text-sm sm:text-base font-extrabold text-white mb-1">
                ¿Listo para empezar tu proyecto?
              </p>
              <p className="text-xs text-white/80">
                Empresa regional de Coyhaique. Acompañamiento cercano.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 shrink-0">
              <a
                href="/contacto"
                className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2.5 text-sm font-extrabold text-blue-700 shadow-sm hover:bg-white/90 transition touch-manipulation"
              >
                Cotiza tu proyecto
              </a>
              <a
                href="https://calendly.com/surdigitallabs/30min"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-4 py-2.5 text-xs font-bold text-white hover:bg-white/15 transition touch-manipulation"
              >
                Agenda diagnóstico
              </a>
            </div>
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
