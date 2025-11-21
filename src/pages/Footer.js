// pages/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-azulOscuro text-blancoHueso">
      {/* contenedor */}
      <div className="mx-auto w-[min(1200px,92%)] py-10 grid gap-10 md:grid-cols-4">
        {/* Marca + texto */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <img src="/serio.webp" alt="Sur Digital Labs" className="h-10 w-auto rounded" />
            <span className="font-bold text-lg">Sur Digital Labs</span>
          </div>
          <p className="mt-3 text-blancoHueso/80">
            Software y datos desde la Patagonia. Soluciones web, analítica y nube (GCP/AWS).
          </p>

          {/* Redes */}
          <div className="mt-5 flex items-center gap-4" aria-label="Redes sociales">
            <a
              href="https://www.linkedin.com/company/surlabssl/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="opacity-90 hover:opacity-100"
            >
              <svg viewBox="0 0 448 512" className="w-5 h-5 fill-current">
                <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 1 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
              </svg>
              <span className="sr-only">LinkedIn</span>
            </a>
            <a
              href="https://twitter.com/surlabs#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="opacity-90 hover:opacity-100"
            >
              <svg viewBox="0 0 512 512" className="w-5 h-5 fill-current">
                <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
              </svg>
              <span className="sr-only">Twitter</span>
            </a>
          </div>

          <div className="mt-4 text-xs text-blancoHueso/70">
            © {new Date().getFullYear()} Laboratorio de Soluciones del Sur S.L. Todos los derechos reservados.
          </div>
        </div>

        {/* Separador vacío para simetría en grid grande */}
        <div className="hidden md:block" />

        {/* Legal */}
        <nav className="text-sm">
          <h3 className="font-semibold mb-3">Legal</h3>
          <ul className="space-y-2">
            <li><Link className="hover:underline" to="/privacy">Privacy Policy</Link></li>
            <li><Link className="hover:underline" to="/cookies">Cookies Policy</Link></li>
            <li><Link className="hover:underline" to="/legal">Legal Notice</Link></li>
          </ul>
        </nav>
      </div>

      {/* línea inferior */}
      <div className="border-t border-white/10">
        <div className="mx-auto w-[min(1200px,92%)] py-4 text-xs text-blancoHueso/70 flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
          <span>Hecho en Coyhaique, Patagonia.</span>
          <span>surdigitallabs@gmail.cl · +56 9 7520 4813</span>
        </div>
      </div>
    </footer>
  );
}
