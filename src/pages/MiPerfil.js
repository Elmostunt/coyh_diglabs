import React, { useState } from 'react';
import { useUsuario } from '../context/UsuarioContext';
import api from '../services/api';

const MiPerfil = () => {
  const { usuario } = useUsuario();
  const [contraseñaActual, setContraseñaActual] = useState('');
  const [nuevaContraseña, setNuevaContraseña] = useState('');
  const [mensaje, setMensaje] = useState(null);
  const [error, setError] = useState(null);

  const handleCambiarContraseña = async (e) => {
    e.preventDefault();
    setMensaje(null);
    setError(null);

    try {
      const response = await api.post('/usuarios/cambiar-contraseña/', {
        contraseña_actual: contraseñaActual,
        nueva_contraseña: nuevaContraseña,
      });

      setMensaje(response.data.message);
      setContraseñaActual('');
      setNuevaContraseña('');
    } catch (err) {
      setError(err.response?.data?.error || 'Error al cambiar la contraseña.');
    }
  };

  if (!usuario) {
    return <p>No has iniciado sesión.</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Mi Perfil</h1>
      <p>
        <strong>Nombre:</strong> {usuario.nombre}
      </p>
      <p>
        <strong>Email:</strong> {usuario.email}
      </p>
      <p>
        <strong>Rol:</strong> {usuario.rol}
      </p>

      <h2 className="text-xl font-bold mt-6">Cambiar Contraseña</h2>
      <form onSubmit={handleCambiarContraseña}>
        <label className="block mb-2">
          Contraseña Actual:
          <input
            type="password"
            value={contraseñaActual}
            onChange={(e) => setContraseñaActual(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </label>
        <label className="block mb-2">
          Nueva Contraseña:
          <input
            type="password"
            value={nuevaContraseña}
            onChange={(e) => setNuevaContraseña(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </label>
        {mensaje && <p className="text-green-500 mb-4">{mensaje}</p>}
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Cambiar Contraseña
        </button>
      </form>
    </div>
  );
};

export default MiPerfil;
