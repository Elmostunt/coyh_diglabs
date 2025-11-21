import React, { useState, useEffect } from "react";
import EXIF from "exif-js";

const bucketName = "surdigilabs_images"; // Reemplaza con el nombre de tu bucket en GCS
//const apiUrl = `https://storage.googleapis.com/storage/v1/b/${bucketName}/o?fields=items(name)`;
//
//const bucketName = "sdl_inicio"; // Nombre de tu bucket en GCS
const folderName = "fotos-vacaciones-1"; // Carpeta específica dentro del bucket
const apiUrl = `https://storage.googleapis.com/storage/v1/b/${bucketName}/o?prefix=${folderName}/&fields=items(name)`; // Filtrar imágenes por carpeta

const Galeria = () => {
  const [imagenes, setImagenes] = useState([]);
  const [imagenesFiltradas, setImagenesFiltradas] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [loading, setLoading] = useState(true);
  const [imagenSeleccionada, setImagenSeleccionada] = useState(null);
  const [indiceActual, setIndiceActual] = useState(0);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.items) {
          const archivos = data.items.map((item, index) => ({
            url: `https://storage.googleapis.com/${bucketName}/${item.name}`,
            name: extraerNombre(item.name),
            index,
          }));

          setImagenes(archivos);
          setImagenesFiltradas(archivos);
        }
      } catch (error) {
        console.error("Error al obtener imágenes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const filtrarImagenes = (criterio) => {
    setBusqueda(criterio);
    const filtradas = imagenes.filter((img) =>
      img.name.toLowerCase().includes(criterio.toLowerCase())
    );
    setImagenesFiltradas(filtradas);
  };

  const extraerNombre = (filename) => {
    const sinExtension = filename.replace(/\.[^/.]+$/, "");
    return sinExtension.replace(/_/g, " ");
  };

  // Abrir visor de imagen
  const abrirVisor = (index) => {
    setImagenSeleccionada(imagenesFiltradas[index]);
    setIndiceActual(index);
  };

  // Cerrar visor
  const cerrarVisor = () => {
    setImagenSeleccionada(null);
  };

  // Navegar entre imágenes
  const navegar = (direccion) => {
    let nuevoIndice = indiceActual + direccion;
    if (nuevoIndice < 0) nuevoIndice = imagenesFiltradas.length - 1;
    if (nuevoIndice >= imagenesFiltradas.length) nuevoIndice = 0;
    setIndiceActual(nuevoIndice);
    setImagenSeleccionada(imagenesFiltradas[nuevoIndice]);
  };

  useEffect(() => {
    const manejarTecla = (e) => {
      if (e.key === "Escape") cerrarVisor();
      if (e.key === "ArrowLeft") navegar(-1);
      if (e.key === "ArrowRight") navegar(1);
    };
    window.addEventListener("keydown", manejarTecla);
    return () => window.removeEventListener("keydown", manejarTecla);
  }, [indiceActual]);

  return (
    <div className="flex flex-col md:flex-row p-4">
      <main className="w-full md:w-4/4 p-4">
        <h1 className="text-2xl font-bold mb-6">Galería</h1>

        <input
          type="text"
          placeholder="Buscar imágenes..."
          value={busqueda}
          onChange={(e) => filtrarImagenes(e.target.value)}
          className="mb-6 p-2 border border-gray-300 rounded-lg w-full md:w-1/2"
        />

        {loading ? (
          <p>Cargando imágenes...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {imagenesFiltradas.map((img, index) => (
              <div
                key={index}
                onClick={() => abrirVisor(index)}
                className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center text-center transition-transform duration-300 hover:scale-105 cursor-pointer"
              >
                <img
                  src={img.url}
                  alt={img.name}
                  className="w-full h-48 object-cover mb-4 rounded-lg"
                />
                <p className="text-gray-600">{img.name}</p>
              </div>
            ))}
          </div>
        )}

        {/* Visor de imagen en grande */}
        {imagenSeleccionada && (
          <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-90 z-50" onClick={cerrarVisor}>
            {/* Flecha izquierda */}
            <button
              className="absolute left-5 text-white text-4xl cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                navegar(-1);
              }}
            >
              ⬅️
            </button>

            {/* Imagen en grande con ajuste dinámico */}
            <img
              src={imagenSeleccionada.url}
              alt={imagenSeleccionada.name}
              className="max-w-[90vw] max-h-[90vh] object-contain"
            />

            {/* Flecha derecha */}
            <button
              className="absolute right-5 text-white text-4xl cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                navegar(1);
              }}
            >
              ➡️
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Galeria;
