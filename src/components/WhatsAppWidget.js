import React, { useState } from 'react';

const WhatsAppWidget = ({
  phone = '56975204813',
  message = 'Hola! Quisiera consultar sobre sus servicios.',
  position = 'bottom-right'
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6'
  };

  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`fixed ${positionClasses[position]} z-50 flex items-center gap-3 transition-all duration-300`}
    >
      {/* Tooltip */}
      {isHovered && (
        <div className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap">
          ¿Preguntas? Escríbenos
        </div>
      )}

      {/* Botón WhatsApp */}
      <button
        className="bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
        aria-label="Chat por WhatsApp"
      >
        {/* Icono WhatsApp */}
        <svg
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.255.949c-1.238.504-2.337 1.236-3.256 2.154-.92.918-1.646 2.008-2.146 3.206-.5 1.197-.737 2.482-.734 3.78.003 1.644.213 3.268.644 4.85l.7 2.627-2.993-.981a9.9 9.9 0 01-1.441-2.152c-.34-.63-.63-1.284-.857-1.957-.226-.673-.384-1.36-.471-2.055a9.87 9.87 0 01-.047-1.965c.054-1.28.31-2.528.75-3.702.44-1.174 1.056-2.27 1.822-3.245.766-.975 1.675-1.829 2.68-2.52 1.005-.69 2.095-1.203 3.229-1.507 1.134-.304 2.31-.42 3.476-.347 1.167.073 2.314.344 3.417.81 1.103.465 2.15 1.122 3.118 1.95.968.827 1.831 1.806 2.56 2.896.73 1.09 1.324 2.268 1.757 3.508.433 1.24.691 2.542.758 3.858.068 1.316-.064 2.622-.38 3.887-.316 1.266-.833 2.476-1.531 3.589-.698 1.113-1.566 2.127-2.575 3.01-1.009.882-2.158 1.631-3.408 2.215-1.25.584-2.597.999-3.996 1.227-1.4.228-2.851.25-4.27.065-1.419-.185-2.805-.599-4.124-1.223-.566.182-1.12.376-1.657.581l-3.122 1.026.827-3.1c.4-1.5.596-3.045.58-4.592.017-1.546-.159-3.08-.516-4.576z" />
        </svg>
      </button>
    </a>
  );
};

export default WhatsAppWidget;
