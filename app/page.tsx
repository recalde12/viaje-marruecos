import { cookies } from 'next/headers';
import Login from '../src/components/Login';
import Leaderboard from '../src/components/Leaderboard';
import Missions from '../src/components/Missions';
import History from '../src/components/History';
import Calendar from '../src/components/Calendar';
import Map from '../src/components/Map';
import { getDashboardData, createMission } from './actions';

// Forzamos que la página se actualice siempre para ver los puntos al momento
export const revalidate = 0;

export default async function Dashboard() {
  const data = await getDashboardData();
  const cookieStore = await cookies();
  const user = cookieStore.get('marruecos_user')?.value;

  // Si no hay usuario o datos, mostramos la pantalla de Login/Registro
  if (!data || !user) return <Login />;

  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Cabecera Principal */}
        <header className="bg-blue-900 text-white p-8 md:p-12 rounded-[2rem] shadow-xl text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/az-subtle.png')]"></div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight">🇲🇦 Expedición Marruecos</h1>
          <p className="text-blue-200 text-lg md:text-xl font-medium max-w-2xl mx-auto">
            ¡Bienvenido, <span className="capitalize font-bold text-amber-400">{user}</span>! 
            Suma puntos completando misiones y prepárate para la aventura por la costa atlántica.
          </p>
        </header>

        {/* Ranking de Usuarios (Leaderboard) */}
        <Leaderboard currentUser={user} users={data.leaderboard} />

        {/* Panel de Administrador (Solo visible si is_admin es true en la DB) */}
        {data.isAdmin && (
          <section className="bg-blue-950 p-6 rounded-[2rem] text-white shadow-lg border-2 border-amber-500/30">
            <h3 className="font-bold mb-4 flex items-center gap-2 text-amber-400">🛠️ Panel de Control: Añadir Parada o Misión Global</h3>
            <form action={createMission} className="flex flex-wrap gap-3">
              <input 
                name="title" 
                placeholder="Nombre de la misión (ej: Reserva Riad Marrakech)" 
                className="flex-1 min-w-[250px] p-3 rounded-xl text-black focus:ring-2 focus:ring-amber-500 outline-none" 
                required 
              />
              <input 
                name="points" 
                type="number" 
                placeholder="Puntos XP" 
                className="w-28 p-3 rounded-xl text-black focus:ring-2 focus:ring-amber-500 outline-none" 
                required 
              />
              <input type="hidden" name="is_global" value="true" />
              <button className="bg-amber-500 hover:bg-amber-600 text-blue-950 px-8 py-3 rounded-xl font-black transition-all transform active:scale-95">
                PUBLICAR PARA TODOS
              </button>
            </form>
          </section>
        )}

        {/* Grid Principal de Contenido (3 Columnas en pantallas grandes) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
          
          {/* COLUMNA 1: Ruta e Itinerario */}
          <div className="space-y-8 order-2 lg:order-1">
            <Calendar missions={data.missions} />
            <Map />
          </div>

          {/* COLUMNA 2: Misiones Activas */}
          <div className="order-1 lg:order-2">
            <Missions missions={data.missions} />
          </div>

          {/* COLUMNA 3: Actividad Reciente */}
          <div className="order-3">
            <History logs={data.history} />
          </div>

        </div>

        {/* Footer sencillo */}
        <footer className="text-center py-8 text-gray-400 text-sm italic">
          Expedición 2024 · Creado para el equipo de ruta por Marruecos 🐪
        </footer>
      </div>
    </main>
  );
}