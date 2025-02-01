import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Productos from './pages/Productos';
import Carrito from './pages/Carrito';
import Usuarios from './pages/Usuarios';
import ConfirmacionCompra from './pages/ConfirmacionCompra';
import IniciarSesion from './pages/IniciarSesion';
import Registrarse from './pages/Registrarse';
import MiPerfil from './pages/MiPerfil'; // Importa la nueva página

const App = () => {
  return (
    <Router>
      <div className="bg-blancoHueso min-h-screen text-azulOscuro">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Home />
              </>
            }
          />
          <Route path="/productos" element={<Productos />} />
          <Route
            path="/carrito"
            element={
              <>
                <Navbar />
                <Carrito />
              </>
            }
          />
          <Route
            path="/usuarios"
            element={
              <>
                <Navbar />
                <Usuarios />
              </>
            }
          />
          <Route
            path="/confirmacion-compra"
            element={
              <>
                <Navbar />
                <ConfirmacionCompra />
              </>
            }
          />
          <Route
            path="/iniciar-sesion"
            element={
              <>
                <Navbar />
                <IniciarSesion />
              </>
            }
          />
          <Route
            path="/registrarse"
            element={
              <>
                <Navbar />
                <Registrarse />
              </>
            }
          />
          {/* Ruta para "Mi Perfil" */}
          <Route
            path="/mi-perfil"
            element={
              <>
                <Navbar />
                <MiPerfil />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
