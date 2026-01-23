// src/App.js
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./pages/Footer";
import Servicios from "./pages/Servicios";
import Usuarios from "./pages/Usuarios";
import ConfirmacionCompra from "./pages/ConfirmacionCompra";
import IniciarSesion from "./pages/IniciarSesion";
import Registrarse from "./pages/Registrarse";
import MiPerfil from "./pages/MiPerfil";
import Nosotros from "./pages/Nosotros";
import Empleos from "./pages/Empleos";
import Galeria from "./pages/Galeria";
import Contactanos from "./pages/Contactanos";

const CALENDLY_URL = "https://calendly.com/surdigitallabs/30min";
const QUOTE_URL = "/contacto";

const TOPBAR_HEIGHT = 44;

function TopBar({ calendlyUrl, quoteUrl, whatsappUrl }) {
  return (
    <div
      className="
        fixed top-0 left-0 right-0 z-50
        bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700
        text-white shadow-lg
        border-b border-white/10
      "
      style={{ height: TOPBAR_HEIGHT }}
    >
      <div className="mx-auto h-full w-full max-w-6xl px-2 sm:px-4 flex items-center justify-between gap-1 sm:gap-3 overflow-hidden">
        {/* MENSAJE */}
        <div className="flex items-center gap-1 sm:gap-2 min-w-0 flex-1">
          <span className="text-xs sm:text-sm font-semibold whitespace-nowrap truncate">
            <span className="hidden sm:inline">🚀 Tu web online en 7 días</span>
            <span className="sm:hidden">🚀 Tu web en 7 días</span>
          </span>
          <span className="text-xs text-white/60 hidden sm:inline shrink-0">|</span>
          <span className="text-xs text-white/80 whitespace-nowrap hidden sm:inline shrink-0">
            Coyhaique · Chile
          </span>
        </div>

        {/* CTAs */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          <a
            href={calendlyUrl}
            target="_blank"
            rel="noreferrer"
            className="
              hidden md:inline-flex items-center
              px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs font-semibold
              border border-white/30 text-white
              hover:bg-white/10 transition
              focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30
              touch-manipulation
            "
          >
            Agenda 30 min
          </a>

          <a
            href={quoteUrl}
            className="
              inline-flex items-center
              px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs font-extrabold
              bg-white text-blue-700
              hover:bg-white/90 transition
              focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40
              touch-manipulation
            "
          >
            Cotiza
          </a>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="
              inline-flex items-center
              px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs font-semibold
              border border-white/30 text-white
              hover:bg-white/10 transition
              focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30
              touch-manipulation
            "
            title="WhatsApp"
          >
            <span className="hidden sm:inline">WhatsApp</span>
            <span className="sm:hidden">WA</span>
          </a>
        </div>
      </div>
    </div>
  );
}



const App = () => {
  return (
    <BrowserRouter>
      <TopBar
        calendlyUrl={CALENDLY_URL}
        quoteUrl={QUOTE_URL}
        whatsappUrl={
          "https://wa.me/56975204813?text=" +
          encodeURIComponent("Hola! Quiero cotizar un sitio web / servicio. ¿Me ayudas?")
        }
      />

      {/* Baja todo el layout para que el Navbar no quede tapado */}
      <div
        className="min-h-screen flex flex-col bg-blancoHueso text-azulOscuro"
        style={{ paddingTop: TOPBAR_HEIGHT }}
      >
        <Navbar />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/usuarios" element={<Usuarios />} />
            <Route path="/confirmacion-compra" element={<ConfirmacionCompra />} />
            <Route path="/iniciar-sesion" element={<IniciarSesion />} />
            <Route path="/registrarse" element={<Registrarse />} />
            <Route path="/mi-perfil" element={<MiPerfil />} />
            <Route path="/servicios" element={<Servicios />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/empleos" element={<Empleos />} />
            <Route path="/galeria" element={<Galeria />} />
            <Route path="/contacto" element={<Contactanos />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
