import React, { createContext, useState, useContext } from 'react';
import axios from 'axios'; // Reemplaza api si no es Axios

const UsuarioContext = createContext();

export const UsuarioProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null); // Estado del usuario

  // Inicia sesión
  const iniciarSesion = async (email, contraseña) => {
    try {
      const response = await axios.post('http://localhost:8000/api/usuarios/login/', {
        email: email.trim(),
        contraseña: contraseña.trim(),
      }, {
        headers: {
          'Content-Type': 'application/json', // Asegúrate de enviar este encabezado
        },
      });

      setUsuario(response.data); // Guarda el usuario autenticado en el estado
      return true; // Devuelve éxito
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      throw error; // Lanza el error para manejarlo desde el componente
    }
  };

  // Cierra sesión
  const cerrarSesion = () => {
    setUsuario(null); // Limpia el estado del usuario
  };

  return (
    <UsuarioContext.Provider value={{ usuario, iniciarSesion, cerrarSesion }}>
      {children}
    </UsuarioContext.Provider>
  );
};

// Hook para usar el contexto
export const useUsuario = () => useContext(UsuarioContext);
