import { itinerary } from '../data/tripData';

// Definimos qué recibe el componente
interface CalendarProps {
  missions: { id: number; title: string; points: number; completed: boolean }[];
}

export default function Calendar({ missions }: CalendarProps) {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100">
      <h2 className="text-2xl font-bold mb-5 text-blue-900">📅 Itinerario</h2>
      <div className="space-y-3">
        {itinerary.map((day, index) => {
          // Buscamos si este día tiene una misión de reserva vinculada
          const linkedMission = day.missionId ? missions.find(m => m.id === day.missionId) : null;

          return (
            <details key={index} className="group bg-white border border-gray-200 rounded-xl p-4 cursor-pointer hover:border-blue-300 open:border-blue-500 open:bg-blue-50/30 transition-all duration-200 shadow-sm">
              <summary className="font-semibold text-lg list-none flex justify-between items-center text-gray-800">
                <span>Día {day.day}: {day.title}</span>
                <span className="text-blue-600 group-open:rotate-180 transition-transform duration-300 ml-4">▼</span>
              </summary>
              <div className="mt-4 text-gray-700 border-t border-gray-100 pt-4">
                
                <div className="flex flex-wrap gap-2 items-center mb-3">
                  <span className="font-medium text-xs text-blue-800 bg-blue-100 px-3 py-1 rounded-full uppercase tracking-wider">{day.date}</span>
                  
                  {/* AQUÍ ESTÁ LA MAGIA: El estado de la reserva */}
                  {linkedMission && (
                    <span className={`font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider border ${
                      linkedMission.completed 
                        ? 'bg-emerald-50 text-emerald-600 border-emerald-200' 
                        : 'bg-red-50 text-red-600 border-red-200 animate-pulse'
                    }`}>
                      {linkedMission.completed ? '✅ Alojamiento Reservado' : '⚠️ Falta Reservar'}
                    </span>
                  )}
                </div>

                <p className="leading-relaxed text-gray-600">{day.details}</p>
                
                <div className="mt-4 flex items-center gap-2">
                  <span className="text-blue-500 text-lg">📍</span> 
                  <span className="text-sm font-semibold text-gray-700">{day.location}</span>
                </div>
              </div>
            </details>
          );
        })}
      </div>
    </div>
  );
}