import React, { useEffect, useState } from 'react';
import api from '../services/api';

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);

  // Fetch usuarios al cargar la página
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await api.get('/usuarios/');
        setUsuarios(response.data);
      } catch (error) {
        console.error('Error al cargar los usuarios', error);
      }
    };

    fetchUsuarios();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Lista de Usuarios</h1>
      {usuarios.length === 0 ? (
        <p>No hay usuarios disponibles.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">ID</th>
              <th className="border border-gray-300 p-2">Nombre</th>
              <th className="border border-gray-300 p-2">Email</th>
              <th className="border border-gray-300 p-2">Rol</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td className="border border-gray-300 p-2">{usuario.id}</td>
                <td className="border border-gray-300 p-2">{usuario.nombre}</td>
                <td className="border border-gray-300 p-2">{usuario.email}</td>
                <td className="border border-gray-300 p-2">{usuario.rol}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Usuarios;
