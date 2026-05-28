// src/App.js
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./pages/Footer";
import ServiciosSoftware from "./pages/ServiciosSoftware";
import ServiciosDatos from "./pages/ServiciosDatos";
import Nosotros from "./pages/Nosotros";
import Empleos from "./pages/Empleos";
import Contactanos from "./pages/Contactanos";

// Aplica el tema antes del primer render para evitar flash
const stored = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
if (stored === 'dark' || (!stored && prefersDark)) {
  document.documentElement.classList.add('dark');
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, [pathname]);
  return null;
}

const App = () => {
  const [isDark, setIsDark] = useState(
    () => document.documentElement.classList.contains('dark')
  );

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 text-slate-950 dark:text-white">
        <ScrollToTop />
        <Navbar isDark={isDark} toggleTheme={toggleTheme} />
        <main id="main-content" className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/software" element={<ServiciosSoftware />} />
            <Route path="/datos" element={<ServiciosDatos />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/empleos" element={<Empleos />} />
            <Route path="/contacto" element={<Contactanos />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
