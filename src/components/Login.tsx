"use client";
import { useState, useTransition } from 'react';
import { loginUser, registerUser } from '../../app/actions';

export default function Login() {
  const [isPending, startTransition] = useTransition();
  const [errorMsg, setErrorMsg] = useState('');
  const [isRegistering, setIsRegistering] = useState(false); // Controla si estamos en Login o Registro

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg(''); 
    const formData = new FormData(e.currentTarget);
    
    startTransition(async () => {
      // Dependiendo de en qué modo estemos, llamamos a una función u otra
      const result = isRegistering 
        ? await registerUser(formData) 
        : await loginUser(formData);
        
      if (result?.error) {
        setErrorMsg(result.error);
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
      <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full text-center border border-gray-100">
        <h1 className="text-4xl font-extrabold mb-2 text-blue-900">🇲🇦 Expedición</h1>
        <p className="text-gray-500 mb-6">
          {isRegistering ? 'Crea tu cuenta de expedicionario.' : 'Inicia sesión en el cuartel general.'}
        </p>
        
        {errorMsg && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm font-medium">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="text" 
            name="username"
            placeholder="Tu nombre (ej: Toni)" 
            required
            className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-center text-lg capitalize"
          />
          <input 
            type="password" 
            name="password"
            placeholder="Contraseña" 
            required
            className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-center text-lg"
          />
          <button 
            type="submit" 
            disabled={isPending}
            className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 rounded-xl transition-colors shadow-md disabled:opacity-50"
          >
            {isPending 
              ? 'Procesando...' 
              : (isRegistering ? 'Registrarse' : 'Entrar')}
          </button>
        </form>

        {/* Botón para cambiar entre Login y Registro */}
        <div className="mt-6 border-t pt-4">
          <button 
            type="button"
            onClick={() => {
              setIsRegistering(!isRegistering);
              setErrorMsg(''); // Limpiamos errores al cambiar de pestaña
            }}
            className="text-sm text-blue-600 hover:underline font-medium"
          >
            {isRegistering 
              ? '¿Ya tienes cuenta? Inicia sesión aquí.' 
              : '¿No tienes cuenta? Regístrate aquí.'}
          </button>
        </div>

      </div>
    </div>
  );
}