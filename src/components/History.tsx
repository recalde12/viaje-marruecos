export default function History({ logs }: any) {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100">
      <h2 className="text-2xl font-bold text-blue-900 mb-6">🕒 Actividad</h2>
      <div className="space-y-4">
        {logs.map((log: any) => (
          <div key={log.id} className="flex gap-3 border-l-4 border-amber-400 pl-4 py-1">
            <div className="flex-1">
              <p className="text-sm text-gray-800">
                <span className="font-bold capitalize">{log.username}</span> {log.action_text}
              </p>
              <p className="text-[10px] text-gray-400 uppercase font-bold tracking-tighter">
                {new Date(log.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
            <div className="text-amber-500 font-black text-sm">+{log.points_earned} XP</div>
          </div>
        ))}
        {logs.length === 0 && <p className="text-gray-400 italic text-sm text-center">Nadie ha hecho nada todavía...</p>}
      </div>
    </div>
  );
}