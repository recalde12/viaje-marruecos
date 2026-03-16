export const itinerary = [
  {
    day: "10 - 13",
    title: "Marrakech y rumbo a Agafay",
    date: "Fechas por definir", 
    details: "Estancia en Marrakech disfrutando de la Medina. El día 13 por la tarde cogemos el coche para ir a Agafay (aprox. 45 min de trayecto).",
    location: "Marrakech",
    missionId: 3 // Vinculado a "Reservar Riad Marrakech"
  },
  {
    day: "14",
    title: "Quads y Noche en el Desierto",
    date: "Fechas por definir",
    details: "Mañana de pura adrenalina con ruta en Quads por el desierto de piedra (hamada). Tarde de relax en la piscina del campamento y noche durmiendo en Haima bajo las estrellas.",
    location: "Desierto de Agafay",
    missionId: 4 // Vinculado a "Reservar Campamento Agafay"
  },
  {
    day: "15",
    title: "Rumbo a la Costa",
    date: "Fechas por definir",
    details: "Salida de Agafay directos hacia Agadir (unas 3h 30min de coche). Tarde libre para relajarnos en la playa y ver el atardecer.",
    location: "Agadir",
    missionId: 5 // Vinculado a "Reservar Agadir"
  },
  {
    day: "16",
    title: "Relax o Paradise Valley",
    date: "Fechas por definir",
    details: "Día completo en Agadir. Podemos quedarnos disfrutando de la costa o hacer una excursión a las piscinas naturales de Paradise Valley.",
    location: "Agadir",
    missionId: 5 // También usa la reserva de Agadir
  },
  {
    day: "17",
    title: "Subida a la Ciudad del Viento",
    date: "Fechas por definir",
    details: "Conducimos por la costa atlántica hasta Essaouira (unas 3 horas). Check-in y primera toma de contacto con la ciudad.",
    location: "Essaouira",
    missionId: 6 // Vinculado a "Reservar Essaouira"
  },
  {
    day: "18",
    title: "Esencia Pesquera en Essaouira",
    date: "Fechas por definir",
    details: "Día para perdernos por la Medina (mucho más tranquila que la de Marrakech), ver el puerto pesquero y las murallas donde se grabó Juego de Tronos.",
    location: "Essaouira",
    missionId: 6 // También usa la reserva de Essaouira
  },
  {
    day: "19",
    title: "La Capital de la Cerámica",
    date: "Fechas por definir",
    details: "Salida hacia Safi (aprox. 2 horas). Visita a la Colina de los Alfareros para ver los talleres de cerámica tradicional.",
    location: "Safi",
    missionId: 7 // Vinculado a "Reservar Safi"
  },
  {
    day: "20",
    title: "Cruce hacia el Norte",
    date: "Fechas por definir",
    details: "Día de ruta larga. Subida por autopista hacia Tánger (unas 6 horas). Llegada, descanso y cena por la ciudad.",
    location: "Tánger",
    missionId: 8 // Vinculado a "Reservar Tánger"
  },
  {
    day: "21",
    title: "Despedida de Marruecos",
    date: "Fechas por definir",
    details: "Últimas compras por Tánger, té de menta de despedida y fin del viaje. ¡Vuelta a casa!",
    location: "Tánger",
    missionId: 8 // También usa la reserva de Tánger
  }
];

export const initialMissions = [
  { id: 1, title: "✈️ Comprar Vuelos (Ida MAR / Vuelta TNG)", points: 500, completed: false },
  { id: 2, title: "🚗 Alquilar coche para toda la ruta", points: 300, completed: false },
  { id: 3, title: "🏨 Reservar Riad en Marrakech (Días 10-13)", points: 150, completed: false },
  { id: 4, title: "⛺ Reservar Campamento y Quads en Agafay (Día 14)", points: 200, completed: false },
  { id: 5, title: "🌊 Reservar alojamiento en Agadir (Días 15-16)", points: 100, completed: false },
  { id: 6, title: "🏰 Reservar Riad en Essaouira (Días 17-18)", points: 100, completed: false },
  { id: 7, title: "🏺 Reservar alojamiento en Safi (Día 19)", points: 80, completed: false },
  { id: 8, title: "⛴️ Reservar alojamiento en Tánger (Días 20-21)", points: 100, completed: false }
];