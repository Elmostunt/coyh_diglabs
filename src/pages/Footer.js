// pages/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-indigo-950 via-violet-950 to-fuchsia-950 text-white">
      <div className="mx-auto w-full max-w-6xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Sobre */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3">
              <img
                src="/serio.webp"
                alt="Sur Digital Labs"
                className="h-10 w-10 rounded-xl object-cover ring-1 ring-white/20"
              />
              <div className="leading-tight">
                <div className="font-extrabold">Sur Digital Labs</div>
                <div className="text-xs text-white/70">Software · Datos · Cloud</div>
              </div>
            </div>
            <p className="mt-4 text-sm text-white/80">
              Software y datos desde la Patagonia. Soluciones web, analítica y nube (GCP/AWS).
            </p>
          </div>

          {/* Enlaces */}
          <nav className="text-sm">
            <h4 className="mb-4 font-extrabold">Enlaces</h4>
            <ul className="space-y-2 text-white/80">
              <li><Link className="hover:text-white" to="/">Inicio</Link></li>
              <li><Link className="hover:text-white" to="/servicios">Servicios</Link></li>
              <li><Link className="hover:text-white" to="/galeria">Portafolio</Link></li>
              <li><Link className="hover:text-white" to="/nosotros">Nosotros</Link></li>
              <li><Link className="hover:text-white" to="/contacto">Contacto</Link></li>
            </ul>
          </nav>

          {/* Suscripción */}
          <div className="text-sm">
            <h4 className="mb-4 font-extrabold">Suscríbete</h4>
            <p className="text-white/80">Recibe nuestras novedades:</p>
            <form
              className="mt-3 flex items-center gap-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Email"
                className="h-10 w-full rounded-lg bg-white/10 px-3 text-white placeholder:text-white/50 ring-1 ring-white/15 focus:outline-none focus:ring-2 focus:ring-white/30"
              />
              <button
                type="submit"
                className="h-10 shrink-0 rounded-lg bg-white px-4 font-extrabold text-indigo-900 hover:bg-white/90"
              >
                Suscribir
              </button>
            </form>
            <div className="mt-2 text-xs text-white/60">Máximo 1 correo al mes.</div>
          </div>

          {/* Redes */}
          <div className="text-sm">
            <h4 className="mb-4 font-extrabold">Síguenos</h4>
            <div className="flex items-center gap-3">
              <a
                href="https://www.linkedin.com/company/surlabssl/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="grid h-10 w-10 place-items-center rounded-full bg-white/10 ring-1 ring-white/15 hover:bg-white/15"
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
                className="grid h-10 w-10 place-items-center rounded-full bg-white/10 ring-1 ring-white/15 hover:bg-white/15"
              >
                <svg viewBox="0 0 512 512" className="h-4 w-4 fill-current">
                  <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
                </svg>
              </a>
            </div>
            <div className="mt-4 text-xs text-white/70">
              surdigitallabs@gmail.cl · +56 9 7520 4813
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-5 text-xs text-white/70 sm:flex-row sm:items-center sm:justify-between">
          <span>Hecho en Coyhaique, Patagonia.</span>
          <span>© {new Date().getFullYear()} Laboratorio de Soluciones del Sur S.L.</span>
        </div>
      </div>
    </footer>
  );
}
