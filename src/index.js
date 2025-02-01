import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
//import { CarritoProvider } from './context/CarritoContext';
import { UsuarioProvider } from './context/UsuarioContext'; // Importa el UsuarioProvider
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UsuarioProvider> {/* Contexto del usuario */}
     {/* <CarritoProvider>  Contexto del carrito */}
        <App />
        <ToastContainer /> {/* Contenedor para las notificaciones */}
      {/* </CarritoProvider>*/}
    </UsuarioProvider>
  </React.StrictMode>
);
