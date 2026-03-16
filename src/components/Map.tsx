"use client";
import { useState } from 'react';

export default function Map() {
  const [activeCity, setActiveCity] = useState("Ruta Marruecos");
  
  // Lista de destinos de vuestra ruta
  const destinations = [
    { name: 'Ruta Completa', query: 'Marrakech,Agafay,Agadir,Essaouira,Safi,Tangier' },
    { name: 'Marrakech', query: 'Marrakech,Morocco' },
    { name: 'Agafay', query: 'Agafay+Desert,Morocco' },
    { name: 'Agadir', query: 'Agadir,Morocco' },
    { name: 'Essaouira', query: 'Essaouira,Morocco' },
    { name: 'Safi', query: 'Safi,Morocco' },
    { name: 'Tánger', query: 'Tangier,Morocco' }
  ];

  // URL base de Google Maps Embed (Modo búsqueda)
  const getMapUrl = (query: string) => {
    return `https://www.google.com/maps/embed/v1/search?key=YOUR_API_KEY_OPTIONAL&q=${query}&zoom=6&maptype=roadmap`;
    // Nota: Si no tienes API Key, Google permite un uso limitado o podemos usar esta alternativa:
  };

  const fallbackUrl = (query: string) => 
    `https://maps.google.com/maps?q=${query}&t=&z=6&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="bg-white p-5 rounded-[2rem] shadow-lg border border-gray-100 w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
        <h2 className="text-xl font-bold text-blue-900 flex items-center gap-2">
          📍 {activeCity}
        </h2>
        <a 
          href={`https://www.google.com/maps/dir/Marrakech/Agafay/Agadir/Essaouira/Safi/Tangier`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-[10px] bg-blue-600 text-white px-3 py-1.5 rounded-full font-black hover:bg-blue-700 transition-all shadow-md"
        >
          ABRIR RUTA GPS 🚗
        </a>
      </div>

      <div className="overflow-hidden rounded-2xl aspect-video sm:aspect-square border border-gray-200 shadow-inner bg-gray-100">
        <iframe
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          src={fallbackUrl(destinations.find(d => d.name === activeCity)?.query || destinations[0].query)}
        ></iframe>
      </div>

      <div className="mt-4">
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-1">Selecciona destino para ver en mapa:</p>
        <div className="flex flex-wrap gap-2">
          {destinations.map((dest) => (
            <button
              key={dest.name}
              onClick={() => setActiveCity(dest.name)}
              className={`text-[10px] px-3 py-2 rounded-xl font-bold transition-all border ${
                activeCity === dest.name 
                ? 'bg-blue-600 text-white border-blue-600 shadow-md scale-105' 
                : 'bg-white text-blue-600 border-blue-100 hover:bg-blue-50'
              }`}
            >
              {dest.name === 'Ruta Completa' ? '🗺️ Ver Todo' : dest.name}
            </button>
          ))}
        </div>
      </div>
      
      <p className="mt-4 text-[9px] text-gray-400 italic leading-tight">
        * Si el mapa no carga todos los puntos a la vez, pulsa el botón azul superior para ver la navegación real en Google Maps.
      </p>
    </div>
  );
}