import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useCarrito } from '../context/CarritoContext';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [busqueda, setBusqueda] = useState(''); // Estado para el texto de búsqueda
  const { añadirAlCarrito } = useCarrito();

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await api.get('/productos/');
        setProductos(response.data);
        setProductosFiltrados(response.data); // Mostrar todos los productos inicialmente
      } catch (error) {
        console.error('Error al cargar los productos:', error);
      }
    };

    const fetchCategorias = async () => {
      try {
        const response = await api.get('/categorias/');
        setCategorias(response.data);
      } catch (error) {
        console.error('Error al cargar las categorías:', error);
      }
    };

    fetchProductos();
    fetchCategorias();
  }, []);

  // Filtra productos cuando cambian la búsqueda o la categoría seleccionada
  useEffect(() => {
    const textoBusqueda = busqueda.toLowerCase();
    const productosFiltrados = productos.filter((producto) => {
      const cumpleTexto = producto.nombre.toLowerCase().includes(textoBusqueda);
      const cumpleCategoria = categoriaSeleccionada
        ? producto.categoria === categoriaSeleccionada
        : true;
      return cumpleTexto && cumpleCategoria;
    });
    setProductosFiltrados(productosFiltrados);
  }, [busqueda, categoriaSeleccionada, productos]);

  const handleBuscar = (texto) => {
    setBusqueda(texto); // Actualiza el texto de búsqueda
  };

  const handleSeleccionarCategoria = (categoriaId) => {
    setCategoriaSeleccionada(categoriaId); // Actualiza la categoría seleccionada
  };

  const handleAñadirAlCarrito = (producto) => {
    añadirAlCarrito(producto);
    toast.success(`${producto.nombre} añadido al carrito`, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return (
    <div>
      <Navbar onBuscar={handleBuscar} />

      <div className="flex flex-col md:flex-row p-4">
        {/* Barra lateral */}
        <aside className="w-full md:w-1/4 bg-gray-100 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Filtros</h2>
          <div>
            <h3 className="font-semibold mb-2">Categorías</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => handleSeleccionarCategoria(null)}
                  className={`${
                    !categoriaSeleccionada ? 'font-bold text-blue-500' : 'text-gray-500'
                  } hover:underline`}
                >
                  Todas
                </button>
              </li>
              {categorias.map((categoria) => (
                <li key={categoria.id}>
                  <button
                    onClick={() => handleSeleccionarCategoria(categoria.id)}
                    className={`${
                      categoriaSeleccionada === categoria.id
                        ? 'font-bold text-blue-500'
                        : 'text-gray-500'
                    } hover:underline`}
                  >
                    {categoria.nombre}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Sección principal */}
        <main className="w-full md:w-3/4 p-4">
          <h1 className="text-2xl font-bold mb-6">Productos</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {productosFiltrados.length > 0 ? (
              productosFiltrados.map((producto) => (
                <div
                  key={producto.id}
                  className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center text-center"
                >
                  <img
                    src={producto.imagen_url}
                    alt={producto.nombre}
                    className="w-full h-32 object-cover mb-4 rounded-lg"
                  />
                  <h3 className="text-lg font-bold">{producto.nombre}</h3>
                  <p className="text-gray-600 mb-2">{producto.descripcion}</p>
                  <p className="text-green-500 font-bold">${producto.precio}</p>
                  <button
                    onClick={() => handleAñadirAlCarrito(producto)}
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                  >
                    Agregar al Carrito
                  </button>
                </div>
              ))
            ) : (
              <p>No hay productos disponibles.</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Productos;
