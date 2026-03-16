"use client";

interface Mission {
  id: number;
  title: string;
  points: number;
  completed: boolean;
}

interface MissionsProps {
  missions: Mission[];
  toggleMission: (id: number) => void;
}

export default function Missions({ missions, toggleMission }: MissionsProps) {
  // Calculamos el porcentaje para la barra de progreso
  const progress = Math.round((missions.filter(m => m.completed).length / missions.length) * 100);

  return (
    <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100">
      <div className="flex justify-between items-end mb-5">
        <h2 className="text-2xl font-bold text-amber-600">📝 Checklist Reservas</h2>
        <span className="text-sm font-bold text-gray-400">{progress}% Completado</span>
      </div>
      
      {/* Barra de progreso */}
      <div className="w-full bg-gray-100 rounded-full h-2.5 mb-6">
        <div className="bg-amber-500 h-2.5 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
      </div>

      <ul className="space-y-3">
        {missions.map((mission) => (
          <li 
            key={mission.id} 
            onClick={() => toggleMission(mission.id)}
            className={`flex items-center justify-between p-4 rounded-xl cursor-pointer border transition-all duration-200 ${
              mission.completed 
                ? 'bg-gray-50 border-transparent opacity-60' 
                : 'bg-white border-amber-200 hover:border-amber-400 hover:shadow-md'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-6 h-6 flex-shrink-0 rounded-full border-2 flex items-center justify-center transition-colors ${
                mission.completed ? 'border-gray-400 bg-gray-400 text-white' : 'border-amber-500'
              }`}>
                {mission.completed && "✓"}
              </div>
              <span className={`font-medium text-sm md:text-base ${mission.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                {mission.title}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}