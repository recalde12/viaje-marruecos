"use client";

export default function Map() {
  // Esta URL fuerza a Google Maps a buscar la ruta entre los puntos clave de vuestro viaje
  // Desde el sur (Marrakech) subiendo por la costa hasta el norte (Tánger)
  const locations = "Marrakech+to:Agafay+to:Agadir+to:Essaouira+to:Safi+to:Tangier";
  const mapUrl = `https://www.google.com/maps/embed/v1/directions?key=NO_API_KEY_NEEDED&origin=Marrakech&destination=Tangier&waypoints=Agafay|Agadir|Essaouira|Safi&mode=driving`;
  
  // Como la API de Embed estricta pide Key, usamos el truco de la búsqueda pública que es más fiable:
  const fallbackUrl = "https://www.google.com/maps?q=Marrakech,Agafay,Agadir,Essaouira,Safi,Tangier&output=embed";

  return (
    <div className="bg-white p-4 rounded-3xl shadow-lg border border-gray-100 w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-blue-900 flex items-center gap-2">
          📍 Ruta de la Expedición
        </h2>
        <a 
          href="https://www.google.com/maps/dir/Marrakech/Agafay/Agadir/Essaouira/Safi/T%C3%A1nger/" 
          target="_blank" 
          className="text-[10px] bg-blue-600 text-white px-2 py-1 rounded-full font-bold hover:bg-blue-700 transition-colors"
        >
          ABRIR EN GOOGLE MAPS
        </a>
      </div>

      <div className="overflow-hidden rounded-2xl aspect-square border border-gray-200 shadow-inner">
        <iframe
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          src={fallbackUrl}
        ></iframe>
      </div>

      <div className="mt-4">
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Escalas de la ruta</p>
        <div className="flex flex-wrap gap-1">
          {['Marrakech', 'Agafay', 'Agadir', 'Essaouira', 'Safi', 'Tánger'].map((city, i) => (
            <div key={city} className="flex items-center">
              <span className="text-[9px] bg-blue-50 text-blue-600 px-2 py-1 rounded-md font-bold border border-blue-100">
                {city}
              </span>
              {i < 5 && <span className="mx-1 text-gray-300 text-xs">→</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}