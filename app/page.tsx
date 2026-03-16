"use client";
import { useState } from 'react';
import Calendar from '../src/components/Calendar';
import Missions from '../src/components/Missions';
import { initialMissions } from '../src/data/tripData';

export default function Dashboard() {
  // El estado de las misiones ahora vive aquí, en la página principal
  const [missions, setMissions] = useState(initialMissions);

  // Función para marcar/desmarcar misiones
  const toggleMission = (id: number) => {
    setMissions(missions.map(m => 
      m.id === id ? { ...m, completed: !m.completed } : m
    ));
  };

  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Cabecera del Dashboard */}
        <header className="bg-blue-900 text-white p-10 rounded-3xl shadow-xl text-center relative overflow-hidden">
          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-3 tracking-tight">🇲🇦 Expedición Marruecos</h1>
            <p className="text-blue-200 text-lg font-medium">Cuartel general de la ruta y preparativos</p>
          </div>
        </header>

        {/* Layout de 2 columnas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Pasamos las misiones al calendario para que sepa si están completadas */}
          <Calendar missions={missions} />
          
          {/* Pasamos las misiones y la función para marcarlas */}
          <Missions missions={missions} toggleMission={toggleMission} />
        </div>

      </div>
    </main>
  );
}