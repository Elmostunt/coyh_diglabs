// src/App.js
import React, { Suspense, lazy, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import WhatsAppWidget from "./components/WhatsAppWidget";
import Home from "./pages/Home";
import Footer from "./pages/Footer";
import ServiciosSoftware from "./pages/ServiciosSoftware";
import ServiciosDatos from "./pages/ServiciosDatos";
import Nosotros from "./pages/Nosotros";
import Empleos from "./pages/Empleos";
import Contactanos from "./pages/Contactanos";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import NotFound from "./pages/NotFound";

// El admin se descarga solo al entrar a /admin
const AdminApp = lazy(() => import("./pages/admin/AdminApp"));

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

function Layout({ isDark, toggleTheme }) {
  const { pathname } = useLocation();

  if (pathname === '/admin' || pathname.startsWith('/admin/')) {
    return (
      <Suspense fallback={<div className="min-h-screen bg-paper" />}>
        <Routes>
          <Route path="/admin/*" element={<AdminApp />} />
        </Routes>
      </Suspense>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-paper text-ink">
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
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppWidget
        phone="56975204813"
        message="Hola! Quiero conversar sobre un proyecto para mi empresa. ¿Me pueden ayudar?"
      />
    </div>
  );
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
      <Layout isDark={isDark} toggleTheme={toggleTheme} />
    </BrowserRouter>
  );
};

export default App;
