import React, { useState, useEffect } from "react";

const bucketName = "surdigilabs_images";
const folderName = "fotos-vacaciones-1";
const apiUrl = `https://storage.googleapis.com/storage/v1/b/${bucketName}/o?prefix=${folderName}/&fields=items(name)`;

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
      if (!imagenSeleccionada) return;
      if (e.key === "Escape") cerrarVisor();
      if (e.key === "ArrowLeft") navegar(-1);
      if (e.key === "ArrowRight") navegar(1);
    };
    window.addEventListener("keydown", manejarTecla);
    return () => window.removeEventListener("keydown", manejarTecla);
  }, [indiceActual, imagenSeleccionada]);

  return (
    <div className="w-full">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800">
        <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-white/10 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-28 -right-24 h-72 w-72 rounded-full bg-white/10 blur-2xl" />

        <div className="mx-auto w-full max-w-6xl px-4 py-16 md:py-20">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold leading-tight text-white md:text-5xl">
              Galería
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-white/90 text-lg">
              Explora nuestros proyectos y momentos destacados
            </p>
          </div>
        </div>
      </section>

      {/* BÚSQUEDA */}
      <section className="bg-white border-b border-azulOscuro/10 sticky top-[104px] z-30 shadow-sm">
        <div className="mx-auto w-full max-w-6xl px-4 py-4">
          <input
            type="text"
            placeholder="Buscar imágenes..."
            value={busqueda}
            onChange={(e) => filtrarImagenes(e.target.value)}
            className="w-full h-11 rounded-lg border border-azulOscuro/20 bg-white px-4 text-azulOscuro placeholder:text-azulGrisaceo focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition"
          />
        </div>
      </section>

      {/* GALERÍA */}
      <section className="bg-blancoCremoso/40 py-14">
        <div className="mx-auto w-full max-w-6xl px-4">
          {loading ? (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-azulOscuro/10 mb-4">
                <svg className="w-8 h-8 text-azulGrisaceo animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <p className="text-azulGrisaceo">Cargando imágenes...</p>
            </div>
          ) : imagenesFiltradas.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {imagenesFiltradas.map((img, index) => (
                <article
                  key={index}
                  onClick={() => abrirVisor(index)}
                  className="group relative aspect-square overflow-hidden rounded-2xl border border-azulOscuro/10 bg-white cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <img
                    src={img.url}
                    alt={img.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="text-white font-semibold text-sm">{img.name}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-azulOscuro/10 mb-4">
                <svg className="w-8 h-8 text-azulGrisaceo" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-extrabold text-azulOscuro mb-2">No se encontraron imágenes</h3>
              <p className="text-azulGrisaceo">Intenta con otros términos de búsqueda.</p>
            </div>
          )}
        </div>
      </section>

      {/* VISOR DE IMAGEN MODAL */}
      {imagenSeleccionada && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
          onClick={cerrarVisor}
        >
          {/* Botón cerrar */}
          <button
            onClick={cerrarVisor}
            className="absolute top-4 right-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition"
            aria-label="Cerrar"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Flecha izquierda */}
          <button
            className="absolute left-4 z-10 grid h-12 w-12 place-items-center rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition"
            onClick={(e) => {
              e.stopPropagation();
              navegar(-1);
            }}
            aria-label="Imagen anterior"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Imagen en grande */}
          <div className="relative max-w-[90vw] max-h-[90vh] flex items-center justify-center">
            <img
              src={imagenSeleccionada.url}
              alt={imagenSeleccionada.name}
              className="max-w-full max-h-[90vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <p className="text-white font-semibold text-center">{imagenSeleccionada.name}</p>
              <p className="text-white/70 text-sm text-center mt-1">
                {indiceActual + 1} de {imagenesFiltradas.length}
              </p>
            </div>
          </div>

          {/* Flecha derecha */}
          <button
            className="absolute right-4 z-10 grid h-12 w-12 place-items-center rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition"
            onClick={(e) => {
              e.stopPropagation();
              navegar(1);
            }}
            aria-label="Imagen siguiente"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default Galeria;
