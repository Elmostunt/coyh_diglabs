// App.js (solo para referencia de estructura)
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Footer from './pages/Footer';
import Servicios from './pages/Servicios';
import Usuarios from './pages/Usuarios';
import ConfirmacionCompra from './pages/ConfirmacionCompra';
import IniciarSesion from './pages/IniciarSesion';
import Registrarse from './pages/Registrarse';
import MiPerfil from './pages/MiPerfil';
import Nosotros from './pages/Nosotros';
import Empleos from './pages/Empleos';
import Galeria from './pages/Galeria';
import { BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-blancoHueso text-azulOscuro">
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
