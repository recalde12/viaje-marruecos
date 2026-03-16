import Calendar from '../components/Calendar';
import Missions from '../components/Missions';

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-gray-100 p-4 md:p-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Cabecera del Dashboard */}
        <header className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-8 rounded-3xl shadow-lg text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-2">🇲🇦 Expedición Marruecos</h1>
          <p className="text-lg opacity-90">El cuartel general de nuestro viaje</p>
        </header>

        {/* Layout de 2 columnas para escritorio, 1 columna para móvil */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Calendar />
          <Missions />
        </div>

      </div>
    </main>
  );
}