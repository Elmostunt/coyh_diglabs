import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useUsuario } from '../context/UsuarioContext';
import personal from './personal.png'; // Importa la imagen

const Navbar = ({ onBuscar }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { usuario, cerrarSesion } = useUsuario();
  const [busqueda, setBusqueda] = useState('');

  // Monitorear cambios en el usuario autenticado
  useEffect(() => {
    console.log('Estado del usuario:', usuario);
  }, [usuario]);

  const handleInputChange = (e) => {
    const valor = e.target.value;
    setBusqueda(valor);
    if (onBuscar) {
      onBuscar(valor);
    }
  };

  const handleCerrarSesion = () => {
    cerrarSesion();
    alert('Has cerrado sesión.');
    navigate('/');
  };

  return (
    <nav className="bg-azulOscuro p-6 flex items-center justify-between h-24">
      {/* Logo y nombre */}
      <div className="flex items-center space-x-4">
        <Link to="/">
          <img src={personal} className="h-20 w-auto" alt="logo" />
        </Link>
        <span className="text-blancoHueso text-2xl font-bold">Sur Digital Labs</span>
      </div>

      {/* Mostrar el buscador solo en la ruta /productos */}
      {location.pathname === '/productos' && (
        <div className="w-full max-w-md mx-4">
          <input
            type="text"
            placeholder="Buscar productos..."
            value={busqueda}
            onChange={handleInputChange}
            className="w-full p-2 rounded-md border border-azulGrisaceo text-azulOscuro"
          />
        </div>
      )}

      {/* Menú de Navegación */}
      <div className="flex space-x-4 items-center">
        <Link to="/" className="text-blancoHueso hover:text-turquesaVibrante">
          Inicio
        </Link>
        <Link to="/productos" className="text-blancoHueso hover:text-turquesaVibrante">
          Productos
        </Link>
        <Link to="/carrito" className="text-blancoHueso hover:text-turquesaVibrante">
          Carrito
        </Link>

        {/* Si el usuario está autenticado */}
        {usuario ? (
          <>
            <span className="text-blancoHueso">
              Bienvenido, <strong>{usuario.nombre}</strong>
            </span>
            <Link to="/mi-perfil" className="text-blancoHueso hover:text-turquesaVibrante">
              Mi Perfil
            </Link>
            <button
              onClick={handleCerrarSesion}
              className="bg-verdeTurquesa text-blancoHueso px-4 py-2 rounded-lg hover:bg-turquesaVibrante"
            >
              Cerrar Sesión
            </button>
          </>
        ) : (
          <>
            {/* Si el usuario NO está autenticado */}
            <Link to="/iniciar-sesion" className="text-blancoHueso hover:text-turquesaVibrante">
              Iniciar Sesión
            </Link>
            <Link to="/registrarse" className="text-blancoHueso hover:text-turquesaVibrante">
              Registrarse
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
