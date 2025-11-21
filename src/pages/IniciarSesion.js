import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUsuario } from '../context/UsuarioContext';
import './styles/Forms.css';

const IniciarSesion = () => {
  const { iniciarSesion } = useUsuario();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      // Llama al contexto para iniciar sesión
      const success = await iniciarSesion(email, contraseña);
      if (success) {
        alert(`Bienvenido!`);
        navigate('/'); // Redirige al inicio
      }
    } catch (err) {
      console.error('Error en el inicio de sesión:', err);
      setError(err.response?.data?.error || 'Error al iniciar sesión.');
    }
  };

  return (
    <div className="contenedor">
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Iniciar Sesión</h1>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">
          Correo Electrónico:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </label>
        <label className="block mb-4">
          Contraseña:
          <input
            type="password"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </label>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Iniciar Sesión
        </button>
      </form>
    </div>
    </div>
  );
};

export default IniciarSesion;
