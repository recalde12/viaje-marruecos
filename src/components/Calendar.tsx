"use client";

export default function Calendar({ missions }: any) {
  // Filtramos solo las misiones globales (itinerario)
  const itinerary = missions.filter((m: any) => m.type === 'global');

  return (
    <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100">
      <h2 className="text-2xl font-bold text-blue-900 mb-6 flex items-center gap-2">
        📅 Itinerario y Reservas
      </h2>
      
      <div className="space-y-6">
        {itinerary.length > 0 ? (
          itinerary.map((item: any) => (
            <div key={item.id} className="relative pl-8 border-l-2 border-blue-100 pb-2">
              <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-blue-500 border-4 border-white shadow-sm" />
              
              <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100">
                <div className="flex justify-between items-start mb-1">
                  <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">
                    Día {item.day_info} · {item.location}
                  </span>
                  <span className="text-[10px] font-bold bg-blue-200 text-blue-700 px-2 py-0.5 rounded-full">
                    +{item.points} XP
                  </span>
                </div>
                <h3 className="font-bold text-blue-900 text-base leading-tight mb-2">{item.title}</h3>
                <p className="text-xs text-blue-700/70 leading-relaxed italic">
                  {item.details}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400 text-sm py-10 italic">Todas las reservas completadas. ¡Buen viaje! ✈️</p>
        )}
      </div>
    </div>
  );
}