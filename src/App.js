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

const CALENDLY_URL = "https://calendly.com/surdigitallabs/30min";
const QUOTE_URL = "/contacto";

const TOPBAR_HEIGHT = 44;

function TopBar({ calendlyUrl, quoteUrl, whatsappUrl }) {
  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 border-b border-azulOscuro/10 bg-blancoHueso/95 backdrop-blur"
      style={{ height: TOPBAR_HEIGHT }}
    >
      <div className="mx-auto h-full w-full max-w-6xl px-4 flex items-center justify-between gap-3">
        {/* Mensaje */}
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-sm font-semibold text-azulOscuro whitespace-nowrap">
            🚀 Implementamos tu web en 7 días
          </span>
          <span className="text-xs text-azulGrisaceo">|</span>
          <span className="text-xs text-azulGrisaceo whitespace-nowrap">
            Coyhaique · Chile
          </span>
        </div>

        {/* CTAs */}
        <div className="flex items-center gap-2">
          <a
            href={calendlyUrl}
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold
                       border border-azulOscuro/20 text-azulOscuro hover:bg-blancoCremoso transition
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-azulOscuro/30"
            aria-label="Agendar 30 minutos"
          >
            Agenda 30 min
          </a>

          <a
            href={quoteUrl}
            className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-extrabold
                       bg-azulOscuro text-blancoHueso hover:bg-azulProfundo transition
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-azulOscuro/30"
            aria-label="Cotizar"
          >
            Cotiza
          </a>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold
                       border border-azulOscuro/20 text-azulOscuro hover:bg-blancoCremoso transition
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-azulOscuro/30"
            aria-label="Hablar por WhatsApp"
            title="WhatsApp"
          >
            WhatsApp
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
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
