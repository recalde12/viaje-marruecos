"use client";
import { useTransition } from 'react';
import { completeMission, farmMission } from '../../app/actions';
import confetti from 'canvas-confetti'; // Importamos el confeti

export default function Missions({ missions }: any) {
  const [isPending, startTransition] = useTransition();

  const handleComplete = (id: number, points: number, title: string) => {
    // 💥 Efecto de Confeti
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#fbbf24', '#3b82f6', '#ffffff']
    });

    startTransition(async () => {
      await completeMission(id, points, title);
    });
  };

  return (
    <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-blue-900">🎯 Misiones Disponibles</h2>
        <button 
          onClick={() => startTransition(() => farmMission())}
          className="text-xs bg-blue-100 text-blue-600 font-bold px-3 py-1 rounded-full hover:bg-blue-200 transition-colors"
        >
          + Misión Extra
        </button>
      </div>

      <div className="space-y-4">
        {missions.length > 0 ? (
          missions.map((m: any) => (
            <div key={m.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-transparent hover:border-blue-100 transition-all">
              <div className="flex-1">
                <p className="font-bold text-gray-800 text-sm">{m.title}</p>
                <div className="flex gap-2 mt-1">
                  <span className="text-[10px] font-black text-amber-500 uppercase">{m.points} XP</span>
                  <span className={`text-[10px] font-bold px-2 rounded-md ${m.type === 'global' ? 'bg-purple-100 text-purple-600' : 'bg-green-100 text-green-600'}`}>
                    {m.type === 'global' ? '🌍 Grupo' : '👤 Individual'}
                  </span>
                </div>
              </div>
              <button
                onClick={() => handleComplete(m.id, m.points, m.title)}
                disabled={isPending}
                className="ml-4 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-xl shadow-md transition-transform active:scale-90 disabled:opacity-50"
              >
                ✅
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400 text-sm py-4 italic">No hay misiones por ahora. ¡A descansar!</p>
        )}
      </div>
    </div>
  );
}