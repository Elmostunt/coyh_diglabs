import React, { useState } from 'react';

const ConfirmacionCompra = () => {
  const [datosInvitado, setDatosInvitado] = useState({
    correo: '',
    nombre: '',
    direccion: '',
  });

  const [datosSesion, setDatosSesion] = useState({
    email: '',
    password: '',
  });

  const handleInvitadoChange = (e) => {
    const { name, value } = e.target;
    setDatosInvitado({ ...datosInvitado, [name]: value });
  };

  const handleSesionChange = (e) => {
    const { name, value } = e.target;
    setDatosSesion({ ...datosSesion, [name]: value });
  };

  const handleCompraInvitado = () => {
    console.log('Compra como invitado:', datosInvitado);
    alert('Compra confirmada como invitado.');
  };

  const handleInicioSesion = () => {
    console.log('Inicio de sesión:', datosSesion);
    alert('Inicio de sesión exitoso.');
  };

  const handleRegistro = () => {
    console.log('Registro de usuario:', datosSesion);
    alert('Usuario registrado exitosamente.');
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Compra como invitado */}
      <div className="w-full md:w-1/2 bg-gray-100 p-6">
        <h2 className="text-xl font-bold mb-4">Compra como Invitado</h2>
        <form>
          <label className="block mb-2">
            Correo Electrónico:
            <input
              type="email"
              name="correo"
              value={datosInvitado.correo}
              onChange={handleInvitadoChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </label>
          <label className="block mb-2">
            Nombre:
            <input
              type="text"
              name="nombre"
              value={datosInvitado.nombre}
              onChange={handleInvitadoChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </label>
          <label className="block mb-2">
            Dirección:
            <input
              type="text"
              name="direccion"
              value={datosInvitado.direccion}
              onChange={handleInvitadoChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </label>
          <button
            type="button"
            onClick={handleCompraInvitado}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Confirmar Compra
          </button>
        </form>
      </div>

      {/* Inicio de sesión o registro */}
      <div className="w-full md:w-1/2 bg-white p-6">
        <h2 className="text-xl font-bold mb-4">Iniciar Sesión o Registrarse</h2>
        <form>
          <label className="block mb-2">
            Correo Electrónico:
            <input
              type="email"
              name="email"
              value={datosSesion.email}
              onChange={handleSesionChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </label>
          <label className="block mb-2">
            Contraseña:
            <input
              type="password"
              name="password"
              value={datosSesion.password}
              onChange={handleSesionChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </label>
          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={handleInicioSesion}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            >
              Iniciar Sesión
            </button>
            <button
              type="button"
              onClick={handleRegistro}
              className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
            >
              Registrarse
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConfirmacionCompra;
