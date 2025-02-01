import React from 'react';
import { useCarrito } from '../context/CarritoContext';
import { useNavigate } from 'react-router-dom';

const Carrito = () => {
  const { carrito, eliminarDelCarrito } = useCarrito();
  const navigate = useNavigate();

  const handleConfirmarCompra = () => {
    if (carrito.length === 0) {
      alert('El carrito está vacío. Agrega productos antes de confirmar la compra.');
      return;
    }
    navigate('/confirmacion-compra'); // Redirige a la página de confirmación
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Carrito de Compras</h1>
      {carrito.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {carrito.map((item) => (
              <li key={item.id} className="flex justify-between items-center bg-gray-100 p-4 rounded-lg">
                <div>
                  <h3 className="font-bold">{item.nombre}</h3>
                  <p>Cantidad: {item.cantidad}</p>
                  <p className="text-green-500 font-bold">
                    Total: ${(item.precio * item.cantidad).toFixed(2)}
                  </p>
                </div>
                <button
                  onClick={() => eliminarDelCarrito(item.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleConfirmarCompra}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
            >
              Confirmar Compra
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Carrito;
