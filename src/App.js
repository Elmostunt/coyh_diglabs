// src/App.js
import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./pages/Footer";
import ServiciosSoftware from "./pages/ServiciosSoftware";
import ServiciosDatos from "./pages/ServiciosDatos";
import Nosotros from "./pages/Nosotros";
import Empleos from "./pages/Empleos";
import Contactanos from "./pages/Contactanos";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, [pathname]);
  return null;
}

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-white text-slate-950">
        <ScrollToTop />
        <Navbar />
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
