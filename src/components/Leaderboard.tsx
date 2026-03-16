"use client";
import { useState, useTransition } from 'react';
import { logoutUser, updateProfile } from '../../app/actions';

interface User {
  username: string;
  points: number;
  avatar_url: string;
  status: string;
}

interface LeaderboardProps {
  currentUser: string;
  users: User[];
}

export default function Leaderboard({ currentUser, users }: LeaderboardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isPending, startTransition] = useTransition();
  
  const myData = users.find(u => u.username === currentUser);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      await updateProfile(formData);
      setIsEditing(false);
    });
  };

  return (
    <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-blue-900">🏆 Expedicionarios</h2>
        <form action={logoutUser}>
          <button type="submit" className="text-sm font-medium text-red-500 hover:text-red-700 transition-colors bg-red-50 px-3 py-1 rounded-full">
            Salir ({currentUser})
          </button>
        </form>
      </div>
      
      {isEditing && myData && (
        <form onSubmit={handleSubmit} className="mb-6 p-4 bg-blue-50 rounded-2xl border border-blue-100 space-y-4">
          <p className="font-bold text-blue-900 text-sm">Actualiza tu perfil</p>
          <div>
            <label className="block text-xs font-semibold text-blue-800 mb-1">Estado</label>
            <input type="text" name="status" defaultValue={myData.status} maxLength={40} className="w-full p-2 rounded-lg border border-blue-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-blue-800 mb-1">Foto de perfil</label>
            <input type="file" name="avatar_file" accept="image/*" className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer" />
          </div>
          <div className="flex gap-2 pt-2">
            <button type="submit" disabled={isPending} className="bg-amber-500 text-white text-sm font-bold px-5 py-2 rounded-lg hover:bg-amber-600 disabled:opacity-50">
              {isPending ? 'Guardando...' : 'Guardar'}
            </button>
            <button type="button" onClick={() => setIsEditing(false)} className="bg-gray-200 text-gray-700 text-sm font-bold px-5 py-2 rounded-lg hover:bg-gray-300">
              Cancelar
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {users.map((user, index) => (
          <div key={user.username} className={`flex items-center gap-4 p-4 rounded-2xl border transition-all ${user.username === currentUser ? 'bg-amber-50 border-amber-300 shadow-sm' : 'bg-gray-50 border-transparent hover:border-gray-200'}`}>
            <div className="relative flex-shrink-0">
              <img src={user.avatar_url} alt={user.username} className="w-14 h-14 rounded-full border-2 border-white shadow-sm bg-white object-cover" />
              <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-0.5 shadow-sm text-lg">
                {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '👤'}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline mb-1">
                <span className="font-bold capitalize text-gray-800 truncate">{user.username}</span>
                <span className="text-sm font-black text-amber-500">{user.points} <span className="text-xs font-medium text-amber-400">pts</span></span>
              </div>
              <p className="text-xs text-gray-500 italic truncate italic">"{user.status}"</p>
              {user.username === currentUser && !isEditing && (
                <button onClick={() => setIsEditing(true)} className="text-xs text-blue-500 mt-1 hover:underline font-medium">Editar perfil</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}