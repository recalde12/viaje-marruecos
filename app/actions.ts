'use server'
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { supabase } from '../src/lib/supabase';

/** --- AUTH & USUARIOS --- **/

export async function loginUser(formData: FormData) {
  const username = formData.get('username')?.toString().trim().toLowerCase();
  const password = formData.get('password')?.toString().trim();
  if (!username || !password) return { error: 'Faltan datos.' };

  const { data: user } = await supabase.from('users').select('*').eq('username', username).single();
  if (!user) return { error: 'No existe el usuario.' };
  if (user.password !== password) return { error: 'Contraseña incorrecta.' };

  const cookieStore = await cookies();
  cookieStore.set('marruecos_user', username, { maxAge: 60 * 60 * 24 * 30 });
  revalidatePath('/');
  return { success: true };
}

export async function registerUser(formData: FormData) {
  const username = formData.get('username')?.toString().trim().toLowerCase();
  const password = formData.get('password')?.toString().trim();
  if (!username || !password) return { error: 'Faltan datos.' };

  const { data: existing } = await supabase.from('users').select('username').eq('username', username).single();
  if (existing) return { error: 'El nombre ya existe.' };

  const defaultAvatar = `https://api.dicebear.com/7.x/adventurer/svg?seed=${username}`;
  
  // 1. Crear usuario
  await supabase.from('users').insert([{ 
    username, password, points: 0, avatar_url: defaultAvatar, status: 'Preparando la mochila...' 
  }]);

  // 2. Asignar misión individual inicial (Vuelos)
  await supabase.from('missions').insert([{
    title: '✈️ Comprar Vuelos (Ida MAR / Vuelta TNG)',
    points: 500,
    type: 'individual',
    assigned_to: username,
    is_completed: false,
    day_info: 'Pre-viaje',
    location: 'Aeropuerto',
    details: 'Asegura tu plaza comprando los billetes de avión.'
  }]);

  const cookieStore = await cookies();
  cookieStore.set('marruecos_user', username, { maxAge: 60 * 60 * 24 * 30 });
  revalidatePath('/');
  return { success: true };
}

export async function logoutUser() {
  const cookieStore = await cookies();
  cookieStore.delete('marruecos_user');
  revalidatePath('/');
}

export async function updateProfile(formData: FormData) {
  const cookieStore = await cookies();
  const currentUser = cookieStore.get('marruecos_user')?.value;
  if (!currentUser) return;

  const status = formData.get('status')?.toString().trim();
  const file = formData.get('avatar_file') as File;
  const updates: any = {};
  
  if (status) updates.status = status;

  if (file && file.size > 0) {
    const fileExt = file.name.split('.').pop();
    const fileName = `${currentUser}-${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(fileName, file);

    if (!uploadError) {
      const { data } = supabase.storage.from('avatars').getPublicUrl(fileName);
      updates.avatar_url = data.publicUrl;
    } else {
      console.error("Error subiendo foto:", uploadError);
    }
  }

  if (Object.keys(updates).length > 0) {
    await supabase.from('users').update(updates).eq('username', currentUser);
    revalidatePath('/');
  }
}

/** --- LÓGICA DE MISIONES --- **/

export async function createMission(formData: FormData) {
  const cookieStore = await cookies();
  const currentUser = cookieStore.get('marruecos_user')?.value;
  
  const title = formData.get('title')?.toString();
  const points = parseInt(formData.get('points')?.toString() || '0');
  const isGlobal = formData.get('is_global') === 'true';

  if (!title || !currentUser) return;

  await supabase.from('missions').insert([{
    title,
    points,
    type: isGlobal ? 'global' : 'individual',
    assigned_to: isGlobal ? null : currentUser,
    is_completed: false
  }]);

  revalidatePath('/');
}

export async function farmMission() {
  const cookieStore = await cookies();
  const currentUser = cookieStore.get('marruecos_user')?.value;
  if (!currentUser) return;

  const pool = [
    { t: "Aprender 3 palabras en árabe", p: 30 },
    { t: "Ver un documental de Marruecos", p: 25 },
    { t: "Planear playlist para el coche", p: 50 },
    { t: "Revisar cambio de moneda", p: 15 }
  ];
  const res = pool[Math.floor(Math.random() * pool.length)];

  await supabase.from('missions').insert([{
    title: res.t, points: res.p, type: 'individual', assigned_to: currentUser, is_completed: false
  }]);
  revalidatePath('/');
}

export async function completeMission(id: number, points: number, title: string) {
  const cookieStore = await cookies();
  const currentUser = cookieStore.get('marruecos_user')?.value;
  if (!currentUser) return;

  // 1. Marcar como hecha
  await supabase.from('missions').update({ is_completed: true }).eq('id', id);

  // 2. Sumar puntos al usuario
  const { data: user } = await supabase.from('users').select('points').eq('username', currentUser).single();
  await supabase.from('users').update({ points: (user?.points || 0) + points }).eq('username', currentUser);

  // 3. Registrar en Historial
  await supabase.from('history').insert([{
    username: currentUser,
    action_text: `completó: ${title}`,
    points_earned: points
  }]);

  revalidatePath('/');
}

/** --- OBTENER DATOS --- **/

export async function getDashboardData() {
  const cookieStore = await cookies();
  const user = cookieStore.get('marruecos_user')?.value;
  if (!user) return null;

  const [users, missions, history, me] = await Promise.all([
    supabase.from('users').select('*').order('points', { ascending: false }),
    supabase.from('missions').select('*').eq('is_completed', false).or(`type.eq.global,assigned_to.eq.${user}`),
    supabase.from('history').select('*').order('created_at', { ascending: false }).limit(10),
    supabase.from('users').select('is_admin').eq('username', user).single()
  ]);

  return {
    leaderboard: users.data || [],
    missions: missions.data || [],
    history: history.data || [],
    isAdmin: me.data?.is_admin || false
  };
}