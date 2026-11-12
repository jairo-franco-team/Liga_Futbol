// DT Manager Pro v21 · Arbitraje Oficial $170 MXN por partido + División Exacta entre Presentes + Fútbol 7 Ocalos & Fútbol 11
(function () {
  'use strict';

  const STORAGE_KEY = 'dt_manager_franco_v21_arbitraje_170';
  const PREV_KEYS = ['dt_manager_franco_v20_fut7_ocalos_fut11', 'dt_manager_franco_v19_stable'];
  const DEFAULT_REFEREE_COST = 170;
  const DEFAULT_PLAYER_FEE = 20;
  const NS = 'http://www.w3.org/2000/svg';
  const TODAY = new Date().toISOString().slice(0, 10);

  function getLuzLogo() {
    return localStorage.getItem('CUSTOM_LUZ_CREST_OVERRIDE') || window.ATLETICO_LA_LUZ_REAL_LOGO || './assets/official-logos/dep-la-luz.png';
  }

  const SOCIAL_REASONS = [
    '', 'Trabajo / Turno laboral', 'Lesión médica / Molestia física', 'Compromiso familiar / Personal',
    'Estudios / Escuela', 'Transporte / Fuera de la ciudad', 'Sanción deportiva', 'Sin avisar / Falta injustificada'
  ];

  const OFFICIAL_FIELDS = [
    { name: 'Campo Ocalos (COMUDE Juventino Rosas)', lat: 20.64420, lon: -100.99410, maps: 'Cancha Ocalos, Santa Cruz de Juventino Rosas, Guanajuato' },
    { name: 'Campo La Luz', lat: 20.64337, lon: -100.99286, maps: 'Campo de futbol La Luz, Guanajuato' },
    { name: 'Campo 1 · Unidad Deportiva Sur', lat: 20.63753, lon: -100.99297, maps: 'Unidad Deportiva Sur, Juventino Rosas, Guanajuato' },
    { name: 'Campo 2 · Unidad Deportiva Sur', lat: 20.63753, lon: -100.99297, maps: 'Unidad Deportiva Sur, Juventino Rosas, Guanajuato' },
    { name: 'Campo 3 · Unidad Deportiva Sur', lat: 20.63753, lon: -100.99297, maps: 'Unidad Deportiva Sur, Juventino Rosas, Guanajuato' },
    { name: 'Campo 4 · Emiliano Zapata', lat: 20.64337, lon: -100.99286, maps: 'Campo de futbol prolongacion Emiliano Zapata, Juventino Rosas' },
    { name: 'Campo Cerrito de Gasca', lat: 20.61778, lon: -101.06250, maps: 'Campo de futbol Cerrito de Gasca, Guanajuato' },
    { name: 'Campo de Tavera', lat: 20.60839, lon: -100.93238, maps: 'Campo de futbol Franco Tavera, Juventino Rosas, Guanajuato' },
    { name: 'Unidad Deportiva Santiago de Cuenda', lat: 20.59793, lon: -100.99663, maps: 'Unidad Deportiva Santiago de Cuenda, Guanajuato' },
    { name: 'Campo de Fútbol de Pozos', lat: 20.61767, lon: -100.90033, maps: '20.61767,-100.90033' }
  ];

  const OCALOS_FUT7_RIVALS = [
    'Dep. Santos', 'Atletico SJ', 'Barrio FC', 'Dep. 176', 'Carneros MX', 'DRM FC', 'Selección Pelusa',
    'Valencia', 'Los Piratas', 'Amaranto FC', 'Galaxy', 'Cuervos', 'Club Imperial', 'Mulas Viejas',
    'Union de Curtidores', 'Jauria FC', 'Cebolleros', 'Celticos FC', 'Linda Vista', 'Pieleros FC',
    'Borussia', 'Chivas LF', 'Bufalos FC'
  ];

  const AMERICA_FUT11_RIVALS = [
    'C. de Gasca', 'Juventus', 'Cuenda', 'Pozos FC', 'Boavista', 'PSV', 'A. Santiago', 'F. Tavera', 'Huracán'
  ];

  const LUZ_OCALOS_FIXTURES = [
    { opponent: 'Dep. Santos', date: '2026-11-10', time: '19:00', venue: '🚌 Visita', field: 'Campo Ocalos (COMUDE Juventino Rosas)', uniform: 'Negro con Dorado' },
    { opponent: 'DRM FC', date: '2026-11-17', time: '20:00', venue: '🏠 Local', field: 'Campo Ocalos (COMUDE Juventino Rosas)', uniform: 'Negro con Dorado' },
    { opponent: 'Selección Pelusa', date: '2026-11-24', time: '19:00', venue: '🚌 Visita', field: 'Campo Ocalos (COMUDE Juventino Rosas)', uniform: 'Negro con Dorado' },
    { opponent: 'Valencia', date: '2026-12-01', time: '21:00', venue: '🏠 Local', field: 'Campo Ocalos (COMUDE Juventino Rosas)', uniform: 'Negro con Dorado' },
    { opponent: 'Los Piratas', date: '2026-12-08', time: '20:00', venue: '🚌 Visita', field: 'Campo Ocalos (COMUDE Juventino Rosas)', uniform: 'Alternativo Blanco/Oro' },
    { opponent: 'Barrio FC', date: '2026-12-15', time: '19:00', venue: '🏠 Local', field: 'Campo Ocalos (COMUDE Juventino Rosas)', uniform: 'Negro con Dorado' },
    { opponent: 'Carneros MX', date: '2026-12-22', time: '20:00', venue: '🚌 Visita', field: 'Campo Ocalos (COMUDE Juventino Rosas)', uniform: 'Negro con Dorado' },
    { opponent: 'Amaranto FC', date: '2026-12-29', time: '19:00', venue: '🏠 Local', field: 'Campo Ocalos (COMUDE Juventino Rosas)', uniform: 'Negro con Dorado' },
    { opponent: 'Galaxy', date: '2027-01-05', time: '20:00', venue: '🚌 Visita', field: 'Campo Ocalos (COMUDE Juventino Rosas)', uniform: 'Negro con Dorado' },
    { opponent: 'Club Imperial', date: '2027-01-12', time: '21:00', venue: '🏠 Local', field: 'Campo Ocalos (COMUDE Juventino Rosas)', uniform: 'Alternativo Blanco/Oro' },
    { opponent: 'Borussia', date: '2027-01-19', time: '19:00', venue: '🏠 Local', field: 'Campo Ocalos (COMUDE Juventino Rosas)', uniform: 'Negro con Dorado' },
    { opponent: 'Visoría / Nuevos Refuerzos Fútbol 7 (J12)', date: '2027-01-26', time: '19:00', venue: '🏠 Local', field: 'Campo Ocalos (COMUDE Juventino Rosas)', uniform: 'Libre / Casacas' }
  ];

  const AMERICA_FIXTURES = [
    { opponent: 'C. de Gasca', date: '2026-11-14', time: '16:00', venue: '🚌 Visita', field: 'Campo Cerrito de Gasca', uniform: 'Amarillo Oficial' },
    { opponent: 'Juventus', date: '2026-11-21', time: '16:00', venue: '🏠 Local', field: 'Campo 1 · Unidad Deportiva Sur', uniform: 'Amarillo Oficial' },
    { opponent: 'Cuenda', date: '2026-11-28', time: '16:00', venue: '🚌 Visita', field: 'Unidad Deportiva Santiago de Cuenda', uniform: 'Azul Visita' },
    { opponent: 'Pozos FC', date: '2026-12-05', time: '16:00', venue: '🏠 Local', field: 'Campo de Fútbol de Pozos', uniform: 'Amarillo Oficial' },
    { opponent: 'Boavista', date: '2026-12-12', time: '16:00', venue: '🏠 Local', field: 'Campo 2 · Unidad Deportiva Sur', uniform: 'Amarillo Oficial' },
    { opponent: 'PSV', date: '2026-12-19', time: '16:00', venue: '🚌 Visita', field: 'Campo 3 · Unidad Deportiva Sur', uniform: 'Azul Visita' },
    { opponent: 'A. Santiago', date: '2026-12-26', time: '16:00', venue: '🏠 Local', field: 'Unidad Deportiva Santiago de Cuenda', uniform: 'Amarillo Oficial' },
    { opponent: 'F. Tavera', date: '2027-01-02', time: '16:00', venue: '🚌 Visita', field: 'Campo de Tavera', uniform: 'Amarillo Oficial' }
  ];

  const FORMATIONS_FUT7 = {
    '231': [
      { code: 'POR', x: 10, y: 50 },
      { code: 'DFD', x: 30, y: 72 }, { code: 'DFI', x: 30, y: 28 },
      { code: 'MD', x: 56, y: 82 }, { code: 'MC', x: 54, y: 50 }, { code: 'MI', x: 56, y: 18 },
      { code: 'DC', x: 84, y: 50 }
    ],
    '321': [
      { code: 'POR', x: 10, y: 50 },
      { code: 'LD', x: 28, y: 80 }, { code: 'DFC', x: 26, y: 50 }, { code: 'LI', x: 28, y: 20 },
      { code: 'MCD', x: 55, y: 67 }, { code: 'MCI', x: 55, y: 33 },
      { code: 'DC', x: 84, y: 50 }
    ],
    '222': [
      { code: 'POR', x: 10, y: 50 },
      { code: 'DFD', x: 29, y: 70 }, { code: 'DFI', x: 29, y: 30 },
      { code: 'MD', x: 55, y: 74 }, { code: 'MI', x: 55, y: 26 },
      { code: 'DCD', x: 83, y: 66 }, { code: 'DCI', x: 83, y: 34 }
    ],
    '312': [
      { code: 'POR', x: 10, y: 50 },
      { code: 'DFD', x: 28, y: 80 }, { code: 'LIB', x: 25, y: 50 }, { code: 'DFI', x: 28, y: 20 },
      { code: 'ENG', x: 55, y: 50 },
      { code: 'DCD', x: 83, y: 68 }, { code: 'DCI', x: 83, y: 32 }
    ],
    '132': [
      { code: 'POR', x: 10, y: 50 },
      { code: 'LIB', x: 26, y: 50 },
      { code: 'MD', x: 52, y: 82 }, { code: 'MC', x: 50, y: 50 }, { code: 'MI', x: 52, y: 18 },
      { code: 'DCD', x: 83, y: 66 }, { code: 'DCI', x: 83, y: 34 }
    ]
  };

  const FORMATIONS_FUT11 = {
    '433': [
      { code: 'POR', x: 10, y: 50 },
      { code: 'LD', x: 26, y: 84 }, { code: 'DFC', x: 24, y: 62 }, { code: 'DFC', x: 24, y: 38 }, { code: 'LI', x: 26, y: 16 },
      { code: 'MCD', x: 46, y: 50 }, { code: 'MC', x: 58, y: 68 }, { code: 'MC', x: 58, y: 32 },
      { code: 'ED', x: 82, y: 82 }, { code: 'DC', x: 86, y: 50 }, { code: 'EI', x: 82, y: 18 }
    ],
    '442': [
      { code: 'POR', x: 10, y: 50 },
      { code: 'LD', x: 26, y: 84 }, { code: 'DFC', x: 24, y: 62 }, { code: 'DFC', x: 24, y: 38 }, { code: 'LI', x: 26, y: 16 },
      { code: 'MD', x: 54, y: 85 }, { code: 'MC', x: 52, y: 62 }, { code: 'MC', x: 52, y: 38 }, { code: 'MI', x: 54, y: 15 },
      { code: 'DC', x: 84, y: 63 }, { code: 'DC', x: 84, y: 37 }
    ],
    '4231': [
      { code: 'POR', x: 10, y: 50 },
      { code: 'LD', x: 26, y: 84 }, { code: 'DFC', x: 24, y: 62 }, { code: 'DFC', x: 24, y: 38 }, { code: 'LI', x: 26, y: 16 },
      { code: 'MCD', x: 44, y: 63 }, { code: 'MCD', x: 44, y: 37 },
      { code: 'MD', x: 67, y: 82 }, { code: 'MCO', x: 67, y: 50 }, { code: 'MI', x: 67, y: 18 },
      { code: 'DC', x: 87, y: 50 }
    ],
    '352': [
      { code: 'POR', x: 10, y: 50 },
      { code: 'DFC', x: 25, y: 72 }, { code: 'LIB', x: 23, y: 50 }, { code: 'DFC', x: 25, y: 28 },
      { code: 'CAD', x: 54, y: 86 }, { code: 'MC', x: 52, y: 66 }, { code: 'MCD', x: 46, y: 50 }, { code: 'MC', x: 52, y: 34 }, { code: 'CAI', x: 54, y: 14 },
      { code: 'DC', x: 85, y: 63 }, { code: 'DC', x: 85, y: 37 }
    ],
    '532': [
      { code: 'POR', x: 10, y: 50 },
      { code: 'CAD', x: 30, y: 88 }, { code: 'DFC', x: 24, y: 68 }, { code: 'LIB', x: 22, y: 50 }, { code: 'DFC', x: 24, y: 32 }, { code: 'CAI', x: 30, y: 12 },
      { code: 'MC', x: 55, y: 68 }, { code: 'MCD', x: 53, y: 50 }, { code: 'MC', x: 55, y: 32 },
      { code: 'DC', x: 85, y: 62 }, { code: 'DC', x: 85, y: 38 }
    ]
  };

  function getFormationsForTeam(team) {
    return Number(team.startersRequired || 11) === 7 ? FORMATIONS_FUT7 : FORMATIONS_FUT11;
  }

  const DEFAULT_DRILLS = [
    { id: 'dr1', title: 'Rondo de Presión Rápida', category: 'Posesión y Salida', duration: '15 min', desc: 'Toque rápido a 1-2 intenciones y presión inmediata tras pérdida.', done: true },
    { id: 'dr2', title: 'Coberturas y Transición Defensiva', category: 'Táctica Defensiva', duration: '20 min', desc: 'Basculación rápida cerrando carriles interiores y disparo de media distancia.', done: false },
    { id: 'dr3', title: 'Integración de Nuevos Jugadores', category: 'Visoría / Altas', duration: '20 min', desc: 'Partido interescuadras para acoplar a los refuerzos con el cuadro base.', done: false },
    { id: 'dr4', title: 'Jugadas de Balón Parado / Shootout', category: 'Táctica Fija', duration: '15 min', desc: 'Tiros libres, saques de banda al área, córners y definición.', done: true }
  ];

  const LUZ_INITIAL_PLAYERS = [
    { id: 'll1', number: '1', name: 'Kana', phone: '+52 412 143 8352', position: 'Portero', note: 'Admin. grupo WhatsApp', goals: 0, assists: 1, yellows: 0, suspended: false, injured: false, joinWeek: 1 },
    { id: 'll2', number: '2', name: 'Daniel', phone: '+52 729 549 1948', position: 'Defensa Central', note: 'Titular constante', goals: 1, assists: 1, yellows: 0, suspended: false, injured: false, joinWeek: 1 },
    { id: 'll3', number: '3', name: 'Giovannicp', phone: '+52 412 243 8717', position: 'Defensa Central', note: 'Central', goals: 1, assists: 0, yellows: 0, suspended: false, injured: false, joinWeek: 1 },
    { id: 'll4', number: '4', name: 'Jesús Solache', phone: '+52 412 168 0005', position: 'Defensa Lateral', note: 'Banda derecha', goals: 0, assists: 2, yellows: 0, suspended: false, injured: false, joinWeek: 1 },
    { id: 'll5', number: '5', name: 'Juan Barrera', phone: '+52 412 262 8009', position: 'Defensa Lateral', note: 'Banda izquierda', goals: 1, assists: 2, yellows: 0, suspended: false, injured: false, joinWeek: 1 },
    { id: 'll6', number: '6', name: 'Kevin', phone: '+52 412 200 2289', position: 'Mediocampista', note: 'Contención', goals: 2, assists: 3, yellows: 0, suspended: false, injured: false, joinWeek: 1 },
    { id: 'll7', number: '7', name: 'Leonel Luna', phone: '+52 412 125 3538', position: 'Mediocampista', note: 'Mixto', goals: 3, assists: 4, yellows: 0, suspended: false, injured: false, joinWeek: 1 },
    { id: 'll8', number: '8', name: 'Mau', phone: '+52 412 111 8197', position: 'Extremo Derecho', note: 'Velocidad', goals: 4, assists: 3, yellows: 0, suspended: false, injured: false, joinWeek: 1 },
    { id: 'll9', number: '9', name: 'Aaron (~ Aaron)', phone: '+52 412 131 6317', position: 'Delantero', note: 'Atacante', goals: 5, assists: 2, yellows: 0, suspended: false, injured: false, joinWeek: 1 },
    { id: 'll10', number: '10', name: 'Ángel (~ Ángel)', phone: '+52 412 142 6861', position: 'Enganche / 10', note: 'Creativo', goals: 6, assists: 6, yellows: 0, suspended: false, injured: false, joinWeek: 1 },
    { id: 'll11', number: '11', name: 'Gabo (~ Gabo)', phone: '+52 412 120 0007', position: 'Extremo Izquierdo', note: 'Banda izquierda', goals: 4, assists: 4, yellows: 0, suspended: false, injured: false, joinWeek: 1 },
    { id: 'll12', number: '12', name: 'Iván GG (~ Ivan Gg)', phone: '+52 412 100 0166', position: 'Mediocampista', note: 'Medio campo', goals: 2, assists: 2, yellows: 0, suspended: false, injured: false, joinWeek: 1 },
    { id: 'll13', number: '13', name: 'José Salvador Rodríguez', phone: '+52 412 167 8276', position: 'Delantero', note: 'Definidor', goals: 7, assists: 2, yellows: 0, suspended: false, injured: false, joinWeek: 1 },
    { id: 'll14', number: '14', name: 'Rogelio (~ Rogelio)', phone: '+52 412 143 1094', position: 'Defensa', note: 'Defensa', goals: 0, assists: 1, yellows: 0, suspended: false, injured: false, joinWeek: 1 },
    { id: 'll15', number: '15', name: 'Villafuerte (~ Villafuerte)', phone: '+52 412 172 9510', position: 'Mediocampista', note: 'Volante', goals: 2, assists: 3, yellows: 0, suspended: false, injured: false, joinWeek: 1 },
    { id: 'll16', number: '16', name: 'A G L (~ A G L)', phone: '+52 412 128 3831', position: 'Delantero', note: 'Avisar turno', goals: 1, assists: 1, yellows: 0, suspended: false, injured: false, joinWeek: 1, initJ1Absent: true, initReason: 'Trabajo / Turno laboral' },
    { id: 'll17', number: '17', name: 'Jugador (~ .)', phone: '+52 412 122 0872', position: 'Defensa', note: 'Pendiente confirmar', goals: 0, assists: 1, yellows: 0, suspended: false, injured: false, joinWeek: 1, initJ1Absent: true, initReason: 'Sin avisar / Falta injustificada' },
    { id: 'll18', number: '18', name: 'Josué Franco (Dueño)', phone: '', position: 'Mediocampista', note: 'Dueño de Atlético La Luz', goals: 5, assists: 7, yellows: 0, suspended: false, injured: false, joinWeek: 1 },
    { id: 'll19', number: '19', name: 'Franco (DT)', phone: '', position: 'Mediocampista', note: 'Director Técnico', goals: 3, assists: 5, yellows: 0, suspended: false, injured: false, joinWeek: 1 }
  ];

  const AM_INITIAL_PLAYERS = [
    { id: 'am_franco', number: '10', name: 'Franco (Dueño, Capitán y DT)', phone: '', position: 'Enganche / 10', note: 'Dueño, Capitán y DT · América 35+', goals: 8, assists: 9, yellows: 0, suspended: false, injured: false, joinWeek: 1 },
    { id: 'am1', number: '14', name: 'J. Refugio Zarazúa Agostadero', phone: '', position: 'Mediocampista', note: 'Registrado Oficial Eq. 5', goals: 11, assists: 6, yellows: 0, suspended: false, injured: false, joinWeek: 1 },
    { id: 'am2', number: '9', name: 'Francisco Javier Valdez Corrales', phone: '', position: 'Delantero', note: 'Registrado Oficial Eq. 5 · Goleador', goals: 7, assists: 4, yellows: 0, suspended: false, injured: false, joinWeek: 1 },
    { id: 'am3', number: '8', name: 'Óscar Vargas Tovar', phone: '', position: 'Mediocampista', note: 'Registrado Oficial Eq. 5', goals: 6, assists: 5, yellows: 0, suspended: false, injured: false, joinWeek: 1 },
    { id: 'am4', number: '4', name: 'Eric Fernando Dongu Guerrero', phone: '', position: 'Defensa Central', note: 'Registrado Oficial Eq. 5', goals: 1, assists: 1, yellows: 0, suspended: false, injured: false, joinWeek: 1 },
    { id: 'am5', number: '5', name: 'Luis Jiménez Zárate', phone: '', position: 'Mediocampista', note: 'Registrado Oficial Eq. 5', goals: 2, assists: 3, yellows: 0, suspended: false, injured: false, joinWeek: 1 },
    { id: 'am6', number: '1', name: 'Guillermo Franco (POR)', phone: '', position: 'Portero', note: 'Portero Titular América 35+', goals: 0, assists: 0, yellows: 0, suspended: false, injured: false, joinWeek: 1 },
    { id: 'am7', number: '2', name: 'Roberto Garduño', phone: '', position: 'Defensa Lateral', note: 'Banda derecha', goals: 1, assists: 2, yellows: 0, suspended: false, injured: false, joinWeek: 1 },
    { id: 'am8', number: '3', name: 'Arturo Tavera', phone: '', position: 'Defensa Central', note: 'Central', goals: 1, assists: 0, yellows: 0, suspended: false, injured: false, joinWeek: 1 },
    { id: 'am9', number: '6', name: 'Miguel Ángel Cervantes', phone: '', position: 'Defensa Lateral', note: 'Lateral izquierdo', goals: 0, assists: 2, yellows: 0, suspended: false, injured: false, joinWeek: 1 },
    { id: 'am10', number: '7', name: 'Héctor Morales', phone: '', position: 'Extremo Derecho', note: 'Desborde', goals: 4, assists: 4, yellows: 0, suspended: false, injured: false, joinWeek: 1 },
    { id: 'am11', number: '11', name: 'Raúl Mendoza', phone: '', position: 'Extremo Izquierdo', note: 'Avisó permiso de trabajo', goals: 3, assists: 3, yellows: 0, suspended: false, injured: false, joinWeek: 1, initJ1Absent: true, initReason: 'Trabajo / Turno laboral' }
  ];

  function nowStamp() {
    const d = new Date();
    return d.toLocaleDateString('es-MX') + ' ' + d.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' });
  }

  function shortDateEs(iso) {
    if (!iso) return 'Por definir';
    const parts = iso.split('-').map(Number);
    if (parts.length !== 3) return iso;
    const d = new Date(parts[0], parts[1] - 1, parts[2]);
    return d.toLocaleDateString('es-MX', { weekday: 'short', day: '2-digit', month: 'short' });
  }

  function addDaysIso(iso, days) {
    const parts = iso.split('-').map(Number);
    const dt = new Date(parts[0], parts[1] - 1, parts[2]);
    dt.setDate(dt.getDate() + days);
    return dt.toISOString().slice(0, 10);
  }

  function buildScheduledEvents(fixtures, isLuz, initialPlayers) {
    return fixtures.map((fx, idx) => {
      const j = idx + 1;
      const isExtraNew = isLuz && j === 12;
      const records = {};
      if (j === 1) {
        initialPlayers.forEach(p => {
          const isAbs = p.initJ1Absent === true;
          records[p.id] = {
            status: isAbs ? 'absent' : 'present',
            reason: isAbs ? (p.initReason || 'Trabajo / Turno laboral') : '',
            note: p.note || '',
            feePaid: !isAbs
          };
        });
      }
      return {
        id: 'jornada_' + j, jNum: j, weekLabel: 'Jornada ' + j, isExtraNew,
        opponent: fx.opponent, date: fx.date, time: fx.time, venue: fx.venue,
        field: fx.field, uniform: fx.uniform, resultType: '',
        scoreText: '',
        refereeCost: DEFAULT_REFEREE_COST,
        playerFee: DEFAULT_PLAYER_FEE,
        savedAt: j === 1 ? 'Rol Oficial J-1 ($170 Arbitraje)' : null,
        coachNotes: isExtraNew ? 'Jornada 12 abierta para meter y evaluar nuevos jugadores.' : '',
        records
      };
    });
  }

  function buildDefaultState() {
    return {
      activeTeamId: 'atletico_luz',
      motionEnabled: true,
      teams: {
        atletico_luz: {
          id: 'atletico_luz',
          name: 'Atlético La Luz',
          startersRequired: 7,
          halfMinutes: 25,
          totalJornadas: 12,
          ownerName: 'Josué Franco (Dueño Atlético La Luz)',
          subtitle: 'Liga de Fútbol 7 Torneo Ocalos · COMUDE · Arbitraje $170 por partido',
          coachName: 'Franco',
          logo: getLuzLogo(),
          kitPrimary: '#1ee87a',
          kitSecondary: '#f7c948',
          formation: '231',
          tacticalStyle: 'Fútbol 7 dinámico: rotaciones intensas, presión en salida y disparo exterior',
          roles: { captain: 'll18', penalty: 'll13', freekick: 'll10' },
          activeEventId: 'jornada_1',
          events: buildScheduledEvents(LUZ_OCALOS_FIXTURES, true, LUZ_INITIAL_PLAYERS),
          liveMatch: { scoreHome: 0, scoreAway: 0, mvpId: 'll18', log: [
            { id: 'lg_ll1', min: "J-1", text: '📌 Torneo de Copa J-1: Dep. Santos vs Atlético La Luz · Martes 07:00 p.m. · Campo Ocalos · Arbitraje $170' }
          ]},
          drills: JSON.parse(JSON.stringify(DEFAULT_DRILLS)),
          lineupSlots: {},
          customCoords: {},
          players: JSON.parse(JSON.stringify(LUZ_INITIAL_PLAYERS))
        },
        america_vet: {
          id: 'america_vet',
          name: 'Club América Veteranos 35 y más',
          startersRequired: 11,
          halfMinutes: 45,
          totalJornadas: 8,
          ownerName: 'Franco (Dueño y DT Club América Veteranos 35 y más)',
          subtitle: 'Fútbol 11 · Categoría Veteranos 35 y más · Sábados 4:00 PM · Arbitraje $170',
          coachName: 'Franco (Dueño, Capitán y DT)',
          logo: './assets/branding/america-veteranos-35-user.png',
          kitPrimary: '#1ee87a',
          kitSecondary: '#f7c948',
          formation: '433',
          tacticalStyle: 'Fútbol 11: orden en líneas, salida limpia por bandas y control de medio campo',
          roles: { captain: 'am_franco', penalty: 'am2', freekick: 'am3' },
          activeEventId: 'jornada_1',
          events: buildScheduledEvents(AMERICA_FIXTURES, false, AM_INITIAL_PLAYERS),
          liveMatch: { scoreHome: 2, scoreAway: 1, mvpId: 'am_franco', log: [
            { id: 'lg1', min: "18'", text: '⚽ Gol de J. Refugio Zarazúa Agostadero (Asist: Franco)' }
          ]},
          drills: JSON.parse(JSON.stringify(DEFAULT_DRILLS)),
          lineupSlots: {},
          customCoords: {},
          players: JSON.parse(JSON.stringify(AM_INITIAL_PLAYERS))
        }
      }
    };
  }

  let state = (function () {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const p = JSON.parse(raw);
        if (p && p.teams && p.teams.america_vet && p.teams.atletico_luz) return p;
      }
      const fresh = buildDefaultState();
      for (const k of PREV_KEYS) {
        const prevRaw = localStorage.getItem(k);
        if (prevRaw) {
          const prev = JSON.parse(prevRaw);
          if (prev && prev.teams) {
            ['atletico_luz', 'america_vet'].forEach(tid => {
              if (prev.teams[tid] && Array.isArray(prev.teams[tid].players)) {
                fresh.teams[tid].players = prev.teams[tid].players;
                (prev.teams[tid].events || []).forEach((oldEv, idx) => {
                  if (fresh.teams[tid].events[idx] && oldEv.records) {
                    fresh.teams[tid].events[idx].records = oldEv.records;
                    fresh.teams[tid].events[idx].refereeCost = DEFAULT_REFEREE_COST;
                    fresh.teams[tid].events[idx].playerFee = DEFAULT_PLAYER_FEE;
                  }
                });
              }
            });
            break;
          }
        }
      }
      return fresh;
    } catch (_) { return buildDefaultState(); }
  })();

  let currentFilter = 'all';
  let searchQuery = '';
  let sortMode = 'number';
  let draggingSlotIndex = null;
  let timerSeconds = 0;
  let timerInterval = null;
  let lastPngBlob = null;

  function saveState(msg) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); if (msg) showToast(msg); } catch (_) {}
  }
  function activeTeam() { return state.teams[state.activeTeamId] || state.teams.atletico_luz; }
  function startersGoal(team) { const t = team || activeTeam(); return Number(t.startersRequired || (t.id === 'atletico_luz' ? 7 : 11)); }
  function teamJornadas(team) { const t = team || activeTeam(); return Math.max(1, Number(t.totalJornadas || (t.id === 'america_vet' ? 8 : 12))); }

  function syncTeamEventsLength(team) {
    const total = teamJornadas(team);
    const isFut7 = startersGoal(team) === 7;
    if (!Array.isArray(team.events)) team.events = [];
    while (team.events.length < total) {
      const j = team.events.length + 1;
      const prevDate = team.events[j - 2] ? team.events[j - 2].date : TODAY;
      team.events.push({
        id: 'jornada_' + j, jNum: j, weekLabel: 'Jornada ' + j, isExtraNew: team.id === 'atletico_luz' && j >= 12,
        opponent: 'Rival Jornada ' + j, date: addDaysIso(prevDate, 7),
        time: isFut7 ? '19:00' : '16:00', venue: '🏠 Local',
        field: isFut7 ? 'Campo Ocalos (COMUDE Juventino Rosas)' : 'Campo 1 · Unidad Deportiva Sur',
        uniform: isFut7 ? 'Negro con Dorado' : 'Amarillo Oficial',
        resultType: '', scoreText: '', refereeCost: DEFAULT_REFEREE_COST, playerFee: DEFAULT_PLAYER_FEE, savedAt: null, coachNotes: '', records: {}
      });
    }
    if (team.events.length > total) team.events = team.events.slice(0, total);
    team.events.forEach((ev, i) => { ev.jNum = i + 1; if (!ev.records) ev.records = {}; });
  }

  function activeEvent(team) {
    const t = team || activeTeam();
    syncTeamEventsLength(t);
    return t.events.find(e => e.id === t.activeEventId) || t.events[0];
  }

  function getRecord(ev, p) {
    if (!ev.records) ev.records = {};
    const jNum = Number(ev.jNum || 1);
    const joinW = Number(p.joinWeek || 1);
    if (jNum < joinW) return { status: 'new_later', reason: '', note: 'Entró en J' + joinW, feePaid: false };
    if (!ev.records[p.id]) ev.records[p.id] = { status: 'unrecorded', reason: '', note: p.note || '', feePaid: false };
    return ev.records[p.id];
  }

  function getPlayerStats(p, team) {
    const t = team || activeTeam();
    syncTeamEventsLength(t);
    const joinW = Number(p.joinWeek || 1);
    let playedJornadas = 0, attended = 0, absences = 0, lastReason = '';
    (t.events || []).forEach((ev, idx) => {
      if ((idx + 1) < joinW) return;
      const rec = ev.records ? ev.records[p.id] : null;
      if (!rec || rec.status === 'unrecorded' || rec.status === 'doubt' || rec.status === 'new_later') return;
      playedJornadas++;
      if (rec.status === 'present' || rec.status === 'late') attended++;
      else if (rec.status === 'absent') { absences++; if (rec.reason) lastReason = rec.reason; }
    });
    const rate = playedJornadas === 0 ? 100 : Math.round((attended / playedJornadas) * 100);
    const discard = absences >= 3 || lastReason === 'Sin avisar / Falta injustificada';
    return { playedJornadas, attended, absences, rate, lastReason, discard };
  }

  function getMapsUrl(fieldName) {
    const match = OFFICIAL_FIELDS.find(f => f.name.toLowerCase() === String(fieldName || '').toLowerCase());
    const q = match ? match.maps : (fieldName || 'Santa Cruz de Juventino Rosas, Guanajuato');
    return 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(q);
  }

  async function updateFieldWeather(fieldName) {
    const pill = document.getElementById('pillWeather');
    if (!pill) return;
    const match = OFFICIAL_FIELDS.find(f => f.name.toLowerCase() === String(fieldName || '').toLowerCase()) || OFFICIAL_FIELDS[0];
    try {
      const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=' + match.lat + '&longitude=' + match.lon + '&current=temperature_2m,precipitation_probability&timezone=auto');
      if (!res.ok) return;
      const data = await res.json();
      const temp = Math.round((data && data.current && data.current.temperature_2m) || 22);
      const rain = (data && data.current && data.current.precipitation_probability) || 0;
      pill.textContent = '🌤️ Cancha: ' + temp + '°C · Lluvia ' + rain + '%';
    } catch (_) {
      pill.textContent = '🌤️ Clima listo para juego';
    }
  }

  function esc(v) {
    return String(v == null ? '' : v).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function cleanPhone(ph) { return String(ph || '').replace(/\D+/g, ''); }
  function showToast(txt) {
    const t = document.getElementById('mgrToast'); if (!t) return;
    t.textContent = txt; t.classList.add('show'); clearTimeout(window.__toastT);
    window.__toastT = setTimeout(() => t.classList.remove('show'), 2600);
  }
  function svgEl(tag, attrs) {
    const el = document.createElementNS(NS, tag);
    Object.entries(attrs || {}).forEach(([k, v]) => el.setAttribute(k, String(v)));
    return el;
  }

  function copyTextSafe(txt) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(txt).then(() => showToast('📋 Copiado al portapapeles')).catch(() => fallbackCopy(txt));
    } else { fallbackCopy(txt); }
  }
  function fallbackCopy(txt) {
    const ta = document.createElement('textarea');
    ta.value = txt; ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); showToast('📋 Copiado al portapapeles'); } catch (_) {}
    document.body.removeChild(ta);
  }

  function switchView(v, scrollUp) {
    document.querySelectorAll('.view').forEach(s => s.classList.toggle('active', s.id === 'view-' + v));
    document.querySelectorAll('[data-nav-view]').forEach(b => b.classList.toggle('active', b.dataset.navView === v));
    if (scrollUp) {
      const navEl = document.getElementById('mainTabsNav');
      if (navEl) navEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function buildPitchSvg(team, ev, available) {
    const isFut7 = startersGoal(team) === 7;
    const svg = svgEl('svg', { viewBox: '-3 -3 74 111', role: 'img' });
    svg.appendChild(svgEl('rect', { x: -3, y: -3, width: 74, height: 111, fill: isFut7 ? '#093420' : '#0b3822' }));
    const stripes = isFut7 ? 7 : 10;
    const stripeH = 105 / (stripes * 2);
    for (let i = 0; i < stripes; i++) {
      svg.appendChild(svgEl('rect', { x: 0, y: i * (stripeH * 2), width: 68, height: stripeH, fill: 'rgba(30,232,122,0.06)' }));
    }
    const lines = svgEl('g', { stroke: '#a3e8c1', 'stroke-width': isFut7 ? 0.45 : 0.35, fill: 'none' });
    lines.appendChild(svgEl('rect', { x: 0, y: 0, width: 68, height: 105 }));
    lines.appendChild(svgEl('line', { x1: 0, y1: 52.5, x2: 68, y2: 52.5 }));
    lines.appendChild(svgEl('circle', { cx: 34, cy: 52.5, r: isFut7 ? 7.5 : 9.15 }));
    lines.appendChild(svgEl('circle', { cx: 34, cy: 52.5, r: 0.55, fill: '#a3e8c1' }));
    lines.appendChild(svgEl('rect', { x: isFut7 ? 17 : 13.84, y: 0, width: isFut7 ? 34 : 40.32, height: isFut7 ? 14 : 16.5 }));
    lines.appendChild(svgEl('rect', { x: isFut7 ? 17 : 13.84, y: isFut7 ? 91 : 88.5, width: isFut7 ? 34 : 40.32, height: isFut7 ? 14 : 16.5 }));
    svg.appendChild(lines);

    const formCatalog = getFormationsForTeam(team);
    if (!formCatalog[team.formation]) team.formation = isFut7 ? '231' : '433';
    const coords = formCatalog[team.formation];
    const customMap = (team.customCoords && team.customCoords[team.formation]) || {};
    const eligible = available.filter(p => !p.suspended && !p.injured);
    const tokenR = isFut7 ? 3.0 : 2.45;

    coords.forEach((p, idx) => {
      const c = customMap[idx];
      const x = c ? c.x : p.y * 0.68;
      const y = c ? c.y : (100 - p.x) * 1.05;
      const assignedId = team.lineupSlots ? team.lineupSlots[idx] : null;
      const pl = (team.players || []).find(item => item.id === assignedId) || eligible[idx] || null;
      const isWarn = pl && (getRecord(ev, pl).status === 'absent' || pl.suspended);
      const isCap = pl && team.roles && team.roles.captain === pl.id;

      const g = svgEl('g', { transform: 'translate(' + x + ' ' + y + ')', style: 'cursor:grab', 'data-slot-idx': String(idx) });
      g.appendChild(svgEl('circle', { r: tokenR + 0.75, fill: isWarn ? 'rgba(255,71,105,0.3)' : 'rgba(30,232,122,0.24)' }));
      g.appendChild(svgEl('circle', { r: tokenR, fill: isWarn ? '#ff4769' : (idx === 0 ? (team.kitSecondary || '#f7c948') : (team.kitPrimary || '#1ee87a')), stroke: '#04140c', 'stroke-width': 0.42 }));
      const num = svgEl('text', { 'text-anchor': 'middle', 'dominant-baseline': 'central', fill: '#04190e', 'font-family': 'Sora, sans-serif', 'font-size': isFut7 ? 2.5 : 2.15, 'font-weight': 800 });
      num.textContent = pl ? String(pl.number) : String(idx + 1);
      g.appendChild(num);
      const lbl = svgEl('text', { y: tokenR + 2.2, 'text-anchor': 'middle', fill: '#fff', 'font-family': 'Manrope, sans-serif', 'font-size': isFut7 ? 2.25 : 2.0, 'font-weight': 800, 'paint-order': 'stroke', stroke: '#04190e', 'stroke-width': 0.8 });
      const clean = pl ? pl.name.replace(/\(.*\)/g, '').trim() : p.code;
      lbl.textContent = (isCap ? '© ' : '') + (clean.length > 14 ? clean.slice(0, 13) + '…' : clean);
      g.appendChild(lbl);
      svg.appendChild(g);
    });

    const pt = svg.createSVGPoint();
    function cursorPt(evt) {
      const e = evt.touches ? evt.touches[0] : evt;
      pt.x = e.clientX; pt.y = e.clientY;
      return pt.matrixTransform(svg.getScreenCTM().inverse());
    }
    svg.addEventListener('pointerdown', e => {
      const node = e.target.closest('[data-slot-idx]');
      if (!node) return;
      draggingSlotIndex = Number(node.getAttribute('data-slot-idx'));
      e.preventDefault();
    });
    svg.addEventListener('pointermove', e => {
      if (draggingSlotIndex === null) return;
      const loc = cursorPt(e);
      const cx = Math.max(3, Math.min(65, loc.x));
      const cy = Math.max(5, Math.min(101, loc.y));
      if (!team.customCoords) team.customCoords = {};
      if (!team.customCoords[team.formation]) team.customCoords[team.formation] = {};
      team.customCoords[team.formation][draggingSlotIndex] = { x: Number(cx.toFixed(2)), y: Number(cy.toFixed(2)) };
      const node = svg.querySelector('[data-slot-idx="' + draggingSlotIndex + '"]');
      if (node) node.setAttribute('transform', 'translate(' + cx + ' ' + cy + ')');
    });
    const stop = () => { if (draggingSlotIndex !== null) { draggingSlotIndex = null; saveState(); } };
    svg.addEventListener('pointerup', stop);
    svg.addEventListener('pointerleave', stop);
    return svg;
  }

  function renderAll() {
    const team = activeTeam();
    syncTeamEventsLength(team);
    const totalJ = teamJornadas(team);
    const reqStarters = startersGoal(team);
    const isFut7 = reqStarters === 7;
    const ev = activeEvent(team);
    const isAmerica = team.id === 'america_vet';
    const currentLuzLogo = getLuzLogo();

    const formCat = getFormationsForTeam(team);
    if (!formCat[team.formation]) team.formation = isFut7 ? '231' : '433';

    const rivalsList = isAmerica ? AMERICA_FUT11_RIVALS : OCALOS_FUT7_RIVALS;
    document.getElementById('rivalsDatalist').innerHTML = rivalsList.map(r => '<option value="' + esc(r) + '"></option>').join('');

    document.body.classList.toggle('motion-off', state.motionEnabled === false);
    const motionBtn = document.getElementById('btnToggleMotion');
    if (motionBtn) motionBtn.textContent = state.motionEnabled === false ? '🎬 Movimiento: OFF' : '🎬 Movimiento: ON';

    const rCost = Number(ev.refereeCost != null ? ev.refereeCost : DEFAULT_REFEREE_COST);
    const pFee = Number(ev.playerFee != null ? ev.playerFee : DEFAULT_PLAYER_FEE);

    const leagueBanner = document.getElementById('leagueSpecificBanner');
    if (leagueBanner) {
      leagueBanner.innerHTML = isAmerica
        ? ('<div><span class="badge-coach">🏟️ FÚTBOL 11 (11 VS 11) · VETERANOS 35 Y MÁS · ARBITRAJE $' + rCost + ' / PARTIDO</span>' +
           '<h3 style="font-family:Sora,sans-serif;font-size:15px;color:#fff;margin-top:4px">Club América Veteranos 35 y más · Dueño, Capitán y DT: Franco</h3></div>' +
           '<div style="display:flex;gap:8px;flex-wrap:wrap"><button type="button" class="btn-ghost" id="btnAddExtraJornadaAm">➕ Habilitar 12 Jornadas</button>' +
           '<a href="https://www.juventinorosasliga.com/reportes/registro/?categoria=2&temporada=6&equipo=5" target="_blank" rel="noopener" class="btn-gold">🌐 Ver Registro Oficial Eq. #5</a></div>')
        : ('<div><span class="badge-coach">⚡ LIGA DE FÚTBOL 7 TORNEO OCALOS · COMUDE · ARBITRAJE $' + rCost + ' / PARTIDO</span>' +
           '<h3 style="font-family:Sora,sans-serif;font-size:15px;color:#fff;margin-top:4px">Atlético La Luz · Torneo de Copa (Segunda Fuerza Ocalos · Lunes a Viernes 7:00–9:00 PM)</h3></div>' +
           '<a href="' + getMapsUrl('Campo Ocalos (COMUDE Juventino Rosas)') + '" target="_blank" rel="noopener" class="btn-gold">📍 Ubicación GPS Campo Ocalos</a>');
    }

    const swLuz = document.getElementById('swLogoLuz'); if (swLuz) swLuz.src = currentLuzLogo;
    const swAm = document.getElementById('swLogoAmerica'); if (swAm) swAm.src = state.teams.america_vet.logo;

    document.querySelectorAll('[data-switch-team]').forEach(b => {
      b.classList.toggle('active', b.dataset.switchTeam === team.id);
      const sp = b.querySelector('span:last-child');
      if (sp && b.dataset.switchTeam === 'atletico_luz') sp.textContent = 'Atlético La Luz · F7 (' + teamJornadas(state.teams.atletico_luz) + 'J)';
      if (sp && b.dataset.switchTeam === 'america_vet') sp.textContent = 'Club América 35+ · F11 (' + teamJornadas(state.teams.america_vet) + 'J)';
    });

    document.getElementById('heroTeamLogo').src = isAmerica ? team.logo : currentLuzLogo;
    document.getElementById('heroTeamName').innerHTML = esc(team.name) + ' <span class="electric">' + (isFut7 ? 'FÚTBOL 7' : 'FÚTBOL 11') + '</span>';
    document.getElementById('heroTeamSubtitle').textContent = team.subtitle;
    document.getElementById('heroOwnerBanner').textContent = '👑 Dueño: ' + team.ownerName + ' · DT: ' + team.coachName;
    document.getElementById('heroEventBadge').textContent = (isFut7 ? 'FÚTBOL 7 OCALOS · ' : 'FÚTBOL 11 · ') + (ev.weekLabel || 'JORNADA 1').toUpperCase() + ' · ' + shortDateEs(ev.date).toUpperCase() + ' ' + ev.time;

    const evWeekSelect = document.getElementById('evWeekLabel');
    const joinWeekSelect = document.getElementById('newPlayerJoinWeek');
    const currentJNum = Number(ev.jNum || 1);
    if (evWeekSelect) {
      evWeekSelect.innerHTML = '';
      for (let j = 1; j <= totalJ; j++) {
        const jEv = team.events[j - 1];
        evWeekSelect.add(new Option('Jornada ' + j + ' (' + shortDateEs(jEv ? jEv.date : '') + ' · ' + (jEv ? jEv.time : '') + ') vs ' + (jEv ? jEv.opponent : ''), 'Jornada ' + j));
      }
      evWeekSelect.value = ev.weekLabel || 'Jornada 1';
    }
    if (joinWeekSelect) {
      joinWeekSelect.innerHTML = '';
      for (let j = 1; j <= totalJ; j++) {
        const jEv = team.events[j - 1];
        joinWeekSelect.add(new Option('Entra en Jornada ' + j + ' (' + shortDateEs(jEv ? jEv.date : '') + ')', String(j)));
      }
      joinWeekSelect.value = String(currentJNum);
    }

    const players = team.players || [];
    const present = [], late = [], absent = [], pending = [];
    let paidPlayersCount = 0;
    players.forEach(p => {
      const rec = getRecord(ev, p);
      if (rec.feePaid) paidPlayersCount++;
      if (rec.status === 'present') present.push(p);
      else if (rec.status === 'late') late.push(p);
      else if (rec.status === 'absent') absent.push(p);
      else if (rec.status !== 'new_later') pending.push(p);
    });

    const available = present.concat(late);
    const collectedCash = paidPlayersCount * pFee;

    let wCnt = 0, dCnt = 0, lCnt = 0;
    (team.events || []).forEach(item => {
      if (item.resultType === 'W') wCnt++;
      else if (item.resultType === 'D') dCnt++;
      else if (item.resultType === 'L') lCnt++;
    });
    const totalPts = wCnt * 3 + dCnt;
    const topScorer = players.slice().sort((a, b) => Number(b.goals || 0) - Number(a.goals || 0))[0];

    document.getElementById('pillModality').textContent = isFut7
      ? ('⚽ Fútbol 7 (' + team.formation.split('').join('-') + ') · 7 en cancha')
      : ('🏟️ Fútbol 11 (' + team.formation.split('').join('-') + ') · 11 en cancha');
    document.getElementById('pillRefereeHero').textContent = '💲 Arbitraje: $' + rCost + ' / partido';
    document.getElementById('pillOpponent').textContent = '🆚 vs ' + (ev.opponent || 'Por definir') + (ev.scoreText ? ' (' + ev.scoreText + ')' : '');
    const mapsLink = document.getElementById('pillFieldMaps');
    mapsLink.textContent = '📍 ' + (ev.field || 'Cancha') + ' · GPS ↗';
    mapsLink.href = getMapsUrl(ev.field);
    document.getElementById('pillRecordPts').textContent = '🏆 ' + (wCnt + dCnt + lCnt) + ' PJ (' + wCnt + 'G-' + dCnt + 'E-' + lCnt + 'P) · ' + totalPts + ' Pts';

    document.getElementById('kpiTotal').textContent = String(players.length);
    document.getElementById('kpiPresent').textContent = String(available.length);
    document.getElementById('kpiAbsent').textContent = String(absent.length);
    document.getElementById('kpiCash').textContent = '$' + collectedCash + ' / $' + rCost;
    document.getElementById('kpiTopScorer').textContent = topScorer ? (topScorer.name.split(' ')[0] + ' (' + topScorer.goals + '⚽)') : '-';

    document.getElementById('quorumLabel').textContent = 'Quórum ' + (isFut7 ? 'Fútbol 7' : 'Fútbol 11') + ' (Meta: ' + reqStarters + ' titulares que SÍ VIENEN)';
    const pct = Math.min(100, Math.round((available.length / reqStarters) * 100));
    document.getElementById('quorumFill').style.width = pct + '%';
    document.getElementById('quorumCount').textContent = available.length >= reqStarters
      ? ('✅ ' + available.length + ' SÍ VIENEN (' + reqStarters + ' titulares completos + ' + (available.length - reqStarters) + ' cambios)')
      : ('⚠️ ' + available.length + ' / ' + reqStarters + ' confirmados (Faltan ' + (reqStarters - available.length) + ' para completar ' + reqStarters + ')');

    const rsvpSel = document.getElementById('rsvpPlayerSelect');
    if (rsvpSel) rsvpSel.innerHTML = players.map(p => '<option value="' + esc(p.id) + '">#' + esc(p.number) + ' ' + esc(p.name) + ' (' + esc(p.position) + ')</option>').join('');

    updateFieldWeather(ev.field);
    renderAttendanceView(team, ev, present, late, absent, pending, totalJ, paidPlayersCount, collectedCash, isFut7, rCost, pFee);
    renderCalendarView(team, ev, totalJ, isFut7);
    renderConstancyView(team, totalJ);
    renderTacticsView(team, ev, available, isFut7, reqStarters);
    renderMatchLiveView(team, ev, isFut7);
    renderSquadView(team);
    renderSettingsView(team, totalJ, reqStarters);
  }

  function renderAttendanceView(team, ev, present, late, absent, pending, totalJ, paidPlayersCount, collectedCash, isFut7, rCost, pFee) {
    document.getElementById('jornadasHeaderEyebrow').textContent = isFut7
      ? ('LIGA DE FÚTBOL 7 TORNEO OCALOS · ARBITRAJE $' + rCost + ' POR PARTIDO')
      : ('CLUB AMÉRICA VETERANOS 35+ · FÚTBOL 11 · ARBITRAJE $' + rCost + ' POR PARTIDO');
    document.getElementById('jornadasHeaderTitle').textContent = ev.weekLabel + ' (' + shortDateEs(ev.date) + ' · ' + ev.time + ') vs ' + ev.opponent;

    const strip = document.getElementById('jornadasStrip');
    if (strip) {
      strip.innerHTML = (team.events || []).map((item, idx) => {
        const jNum = idx + 1;
        const isExtra = isFut7 && jNum >= 12;
        const recs = Object.values(item.records || {});
        const yesCnt = recs.filter(r => r.status === 'present' || r.status === 'late').length;
        const noCnt = recs.filter(r => r.status === 'absent').length;
        return '<button type="button" class="j-pill ' + (isExtra ? 'extra-new ' : '') + (item.savedAt ? 'is-saved ' : '') + (item.id === ev.id ? 'active' : '') + '" data-select-event="' + esc(item.id) + '">' +
          '<small><span>' + (isExtra ? ('🌟 J' + jNum + ' NUEVOS') : ('JORNADA ' + jNum)) + '</span> <span>' + (item.savedAt ? '💾' : '📅') + '</span></small>' +
          '<strong>vs ' + esc(item.opponent || ('Rival J' + jNum)) + '</strong>' +
          '<span class="j-date-lbl">📅 ' + esc(shortDateEs(item.date)) + ' · ' + esc(item.time) + '</span>' +
          '<span class="j-mini-stat">' + (item.savedAt ? ('✅ ' + yesCnt + ' vienen · ❌ ' + noCnt + ' faltan') : 'Arbitraje $' + (item.refereeCost || 170)) + '</span>' +
          '</button>';
      }).join('');
    }

    document.getElementById('savedStatusBanner').innerHTML = ev.savedAt
      ? ('<div><strong style="color:var(--green-neon)">💾 Registro Guardado · ' + esc(ev.weekLabel) + ' vs ' + esc(ev.opponent) + '</strong><div style="font-size:12px;color:var(--text-muted)">Guardado: ' + esc(ev.savedAt) + ' · 📍 ' + esc(ev.field) + ' · 💲 Arbitraje $' + rCost + '</div></div>' +
         '<div style="display:flex;gap:7px;flex-wrap:wrap"><a href="' + getMapsUrl(ev.field) + '" target="_blank" rel="noopener" class="btn-ghost">🗺️ Mapa GPS Cancha</a><button type="button" class="btn-danger" id="btnClearJornadaRecord">🗑️ Reiniciar Jornada</button></div>')
      : ('<div><strong style="color:var(--gold)">📅 ' + esc(ev.weekLabel) + ' vs ' + esc(ev.opponent) + ' (' + esc(shortDateEs(ev.date)) + ' · ' + esc(ev.time) + ') · Arbitraje $' + rCost + '</strong><div style="font-size:12px;color:var(--text-muted)">Toca el botón verde para iniciar con todos presentes y luego pasa a "No Viene" solo a quienes falten.</div></div>' +
         '<button type="button" class="btn-green" id="btnQuickStartJornada">⚡ Iniciar Lista (Todos Vienen)</button>');

    [['matchOpponent', ev.opponent || ''], ['matchDate', ev.date || ''], ['matchTime', ev.time || ''],
     ['matchVenueType', ev.venue || '🏠 Local'], ['matchField', ev.field || ''], ['matchUniform', ev.uniform || ''],
     ['matchResultType', ev.resultType || ''], ['matchScoreInput', ev.scoreText || ''],
     ['refereeCostInput', rCost], ['playerFeeInput', pFee],
     ['matchCoachNotes', ev.coachNotes || '']].forEach(([id, val]) => {
      const el = document.getElementById(id); if (el && document.activeElement !== el) el.value = val;
    });

    // CÁLCULO EXACTO DE COOPERACIÓN DE LOS $170 ENTRE LOS JUGADORES QUE SÍ VIENEN
    const comingAll = present.concat(late);
    const exactSplit = comingAll.length > 0 ? Math.ceil(rCost / comingAll.length) : rCost;
    const diffCash = collectedCash - rCost;

    document.getElementById('cashSummaryBox').innerHTML =
      '<div><small style="color:var(--gold);font-size:11px;font-weight:800">💲 ARBITRAJE POR PARTIDO</small><div style="font-family:Sora,sans-serif;font-size:22px;font-weight:800;color:#fff">$' + rCost + ' MXN</div><div style="font-size:11px;color:var(--text-muted)">Costo fijo oficial del juego</div></div>' +
      '<div><small style="color:var(--green-neon);font-size:11px;font-weight:800">⚖️ DIVISIÓN ENTRE ' + comingAll.length + ' PRESENTES</small><div style="font-family:Sora,sans-serif;font-size:20px;font-weight:800;color:#fef08a">$' + exactSplit + ' MXN c/u</div>' +
      '<button type="button" class="btn-ghost" id="btnApplyExactSplit" data-split-val="' + exactSplit + '" style="padding:4px 9px;font-size:10.5px;margin-top:4px">⚡ Fijar cuota en $' + exactSplit + '</button></div>' +
      '<div><small style="color:var(--text-muted);font-size:11px;font-weight:800">COOPERACIÓN RECAUDADA</small><div style="font-family:Sora,sans-serif;font-size:20px;font-weight:800;color:var(--green-electric)">$' + collectedCash + ' MXN</div><div style="font-size:11px;color:var(--text-muted)">' + paidPlayersCount + ' pagaron ($' + pFee + ' c/u)</div></div>' +
      '<div><small style="color:var(--text-muted);font-size:11px;font-weight:800">ESTADO DEL ARBITRAJE ($' + rCost + ')</small><div style="font-family:Sora,sans-serif;font-size:19px;font-weight:800;color:' + (diffCash >= 0 ? 'var(--green-neon)' : 'var(--danger)') + '">' + (diffCash >= 0 ? ('✅ Pagado (+$' + diffCash + ' Caja)') : ('⚠️ Faltan $' + Math.abs(diffCash) + ' MXN')) + '</div>' +
      '<button type="button" class="btn-gold" id="btnMarkPresentPaid" style="padding:4px 9px;font-size:10.5px;margin-top:4px">💲 Marcar Presentes Pagados</button></div>';

    document.getElementById('whoComesBanner').innerHTML =
      '<h4><span>✅ JUGADORES QUE SÍ VIENEN (' + comingAll.length + ')</span> <small style="font-size:11px;color:#dcf2e5">$' + exactSplit + ' c/u para cubrir $' + rCost + '</small></h4>' +
      '<div class="interactive-roster-list">' +
      (comingAll.length ? comingAll.map(p =>
        '<div class="roster-row-yes"><span>#' + esc(p.number) + ' ' + esc(p.name) + ' <small style="color:var(--text-muted)">(' + esc(p.position) + ')' + (getRecord(ev, p).status === 'late' ? ' · ⏰ Tarde' : '') + '</small></span>' +
        '<button type="button" class="btn-danger" style="padding:4px 8px;font-size:10.5px" data-set-status="absent" data-id="' + esc(p.id) + '">❌ No Viene</button></div>'
      ).join('') : '<p style="font-size:12px;color:var(--text-muted)">Nadie confirmado aún en ' + esc(ev.weekLabel) + '.</p>') +
      '</div>';

    document.getElementById('whoNotComesBanner').innerHTML =
      '<h4><span>❌ JUGADORES QUE NO VIENEN / FALTARON (' + absent.length + ')</span> <small style="font-size:11px;color:#fecdd3">Bajas</small></h4>' +
      '<div class="interactive-roster-list">' +
      (absent.length ? absent.map(p => {
        const r = getRecord(ev, p);
        return '<div class="roster-row-no"><span>#' + esc(p.number) + ' ' + esc(p.name) + ' — <b style="color:#fef08a">' + esc(r.reason || 'Sin avisar') + '</b></span>' +
          '<button type="button" class="btn-green" style="padding:4px 8px;font-size:10.5px" data-set-status="present" data-id="' + esc(p.id) + '">✅ Sí Viene</button></div>';
      }).join('') : '<p style="font-size:12px;color:var(--text-muted)">Ninguna falta registrada en ' + esc(ev.weekLabel) + '.</p>') +
      '</div>';

    const pendBox = document.getElementById('pendingConfirmBox');
    if (!pending.length) {
      pendBox.style.display = 'none';
    } else {
      pendBox.style.display = 'block';
      pendBox.innerHTML =
        '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;flex-wrap:wrap;gap:6px">' +
        '<strong style="color:var(--gold);font-size:13px">⏳ FALTAN POR CONFIRMAR EN ' + esc(ev.weekLabel).toUpperCase() + ' (' + pending.length + ' jugadores)</strong>' +
        '<span style="font-size:11.5px;color:var(--text-muted)">Toca ✅ o ❌ para clasificarlos rápido:</span></div>' +
        '<div style="display:flex;flex-wrap:wrap;gap:8px">' +
        pending.map(p =>
          '<span style="display:inline-flex;align-items:center;gap:6px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.14);padding:5px 9px;border-radius:10px;font-size:12px;font-weight:700">' +
          '#' + esc(p.number) + ' ' + esc(p.name) +
          ' <button type="button" class="btn-green" style="padding:4px 8px;font-size:10.5px" data-set-status="present" data-id="' + esc(p.id) + '">✅ Viene</button>' +
          ' <button type="button" class="btn-danger" style="padding:4px 8px;font-size:10.5px" data-set-status="absent" data-id="' + esc(p.id) + '">❌ Falta</button></span>'
        ).join('') + '</div>';
    }

    document.querySelectorAll('[data-att-filter]').forEach(b => b.classList.toggle('active', b.dataset.attFilter === currentFilter));

    let list = (team.players || []).slice();
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(p => p.name.toLowerCase().includes(q) || String(p.number).toLowerCase().includes(q));
    }
    if (currentFilter === 'present') list = list.filter(p => ['present', 'late'].includes(getRecord(ev, p).status));
    else if (currentFilter === 'absent') list = list.filter(p => getRecord(ev, p).status === 'absent');
    else if (currentFilter === 'unpaid') list = list.filter(p => !getRecord(ev, p).feePaid && getRecord(ev, p).status !== 'new_later');
    else if (currentFilter === 'new') list = list.filter(p => Number(p.joinWeek || 1) > 1);

    list.sort((a, b) => {
      if (sortMode === 'constancy') return getPlayerStats(b, team).rate - getPlayerStats(a, team).rate;
      if (sortMode === 'goals') return Number(b.goals || 0) - Number(a.goals || 0);
      if (sortMode === 'name') return a.name.localeCompare(b.name, 'es');
      return (parseInt(a.number, 10) || 99) - (parseInt(b.number, 10) || 99);
    });

    document.getElementById('attendancePlayersGrid').innerHTML = list.map(p => {
      const rec = getRecord(ev, p);
      const st = getPlayerStats(p, team);
      const isNewSigning = Number(p.joinWeek || 1) > 1;
      const notJoinedYet = rec.status === 'new_later';
      return '<article class="p-card status-' + esc(rec.status) + ' ' + (p.suspended ? 'suspended-alert' : '') + '">' +
        '<div class="p-top"><div class="p-id"><div class="dorsal">#' + esc(p.number) + '</div><div><div class="p-name">' + esc(p.name) + '</div><div class="p-badges">' +
        '<span class="pos-badge">' + esc(p.position) + '</span>' +
        (isNewSigning ? '<span class="new-badge">🆕 Entró J' + esc(p.joinWeek) + '</span>' : '') +
        '<span class="' + (st.rate >= 85 ? 'constancy-Constant' : 'rate-badge') + '">📊 ' + st.rate + '% (' + st.attended + '/' + (st.playedJornadas || 0) + 'J)</span>' +
        (p.suspended ? '<span class="discard-badge">🚫 SUSPENDIDO</span>' : '') +
        (p.injured ? '<span class="phone-badge">🩹 LESIONADO</span>' : '') +
        (p.phone ? '<span class="phone-badge">📱 ' + esc(p.phone) + '</span>' : '') +
        '</div></div></div>' +
        '<div style="display:flex;gap:5px"><button type="button" class="btn-ghost" style="padding:5px 8px" data-ping-player="' + esc(p.id) + '" title="WhatsApp directo">📲</button>' +
        '<button type="button" class="btn-danger" data-delete-player="' + esc(p.id) + '" title="Baja">✕</button></div></div>' +
        (notJoinedYet
          ? '<div style="padding:8px 10px;border-radius:10px;background:rgba(247,201,72,0.14);border:1px solid var(--border-gold);font-size:12px;color:#fef08a;font-weight:700">🆕 Ingresó hasta la Jornada ' + esc(p.joinWeek) + '.</div>'
          : '<div class="status-grid-main">' +
            '<button type="button" class="st-btn ' + (rec.status === 'present' ? 'on-present' : '') + '" data-set-status="present" data-id="' + esc(p.id) + '">✅ SÍ VIENE</button>' +
            '<button type="button" class="st-btn ' + (rec.status === 'absent' ? 'on-absent' : '') + '" data-set-status="absent" data-id="' + esc(p.id) + '">❌ NO VIENE</button>' +
            '<button type="button" class="st-btn ' + (rec.status === 'late' ? 'on-late' : '') + '" data-set-status="late" data-id="' + esc(p.id) + '">⏰ Tarde</button>' +
            '<button type="button" class="st-btn ' + (rec.status === 'doubt' ? 'on-doubt' : '') + '" data-set-status="doubt" data-id="' + esc(p.id) + '">⏳ Duda</button></div>') +
        '<div class="p-mini-weeks">' +
        (team.events || []).map((item, idx) => {
          const rJ = getRecord(item, p);
          const cls = rJ.status === 'present' ? 'j-P' : rJ.status === 'late' ? 'j-L' : rJ.status === 'absent' ? 'j-A' : rJ.status === 'new_later' ? 'j-N' : '';
          const sym = rJ.status === 'present' ? '✓' : rJ.status === 'late' ? '⏰' : rJ.status === 'absent' ? '✕' : rJ.status === 'new_later' ? '🆕' : '·';
          return '<button type="button" class="mini-j-btn ' + cls + '" data-toggle-week="' + esc(p.id) + '" data-wk-idx="' + idx + '">J' + (idx + 1) + ':' + sym + '</button>';
        }).join('') + '</div>' +
        '<div class="absence-row"><select data-absence-reason="' + esc(p.id) + '">' +
        SOCIAL_REASONS.map(r => '<option value="' + esc(r) + '" ' + (rec.reason === r ? 'selected' : '') + '>' + (r ? ('Razón: ' + esc(r)) : 'Motivo si no viene...') + '</option>').join('') +
        '</select><input type="text" data-player-note="' + esc(p.id) + '" value="' + esc(rec.note || '') + '" placeholder="Nota en esta jornada..." /></div>' +
        '<div class="p-foot"><div style="display:flex;gap:4px;align-items:center;flex-wrap:wrap">' +
        '<span>⚽<b>' + Number(p.goals || 0) + '</b> <button type="button" class="disc-btn" data-add-goal="' + esc(p.id) + '">+1</button></span>' +
        '<span>🟨<b>' + Number(p.yellows || 0) + '</b> <button type="button" class="disc-btn" data-add-yellow="' + esc(p.id) + '">+1</button></span>' +
        '<button type="button" class="disc-btn ' + (p.suspended ? 'active-susp' : '') + '" data-toggle-susp="' + esc(p.id) + '">' + (p.suspended ? '🚫 Susp.' : '🚫') + '</button>' +
        '<button type="button" class="disc-btn ' + (p.injured ? 'active-inj' : '') + '" data-toggle-inj="' + esc(p.id) + '">' + (p.injured ? '🩹 Lesión' : '🩹') + '</button></div>' +
        '<button type="button" class="fee-btn ' + (rec.feePaid ? 'paid' : '') + '" data-toggle-fee="' + esc(p.id) + '">' +
        (rec.feePaid ? ('💲 Pagó $' + pFee) : ('💲 Debe $' + pFee)) + '</button></div></article>';
    }).join('');
  }

  function renderCalendarView(team, activeEv, totalJ, isFut7) {
    document.getElementById('calendarEyebrow').textContent = isFut7
      ? 'LIGA DE FÚTBOL 7 TORNEO OCALOS · ARBITRAJE $170 POR PARTIDO'
      : 'LIGA VETERANOS 35 Y MÁS · FÚTBOL 11 · ARBITRAJE $170 POR PARTIDO';
    document.getElementById('calendarTitle').textContent = 'Calendario Semanal · ' + team.name + ' (' + totalJ + ' Jornadas)';
    const startInput = document.getElementById('autoStartDateInput');
    if (startInput && document.activeElement !== startInput && team.events[0] && team.events[0].date) {
      startInput.value = team.events[0].date;
    }
    const grid = document.getElementById('weeklyCalendarGrid');
    if (!grid) return;
    grid.innerHTML = (team.events || []).map(item => {
      const players = team.players || [];
      const yesCnt = players.filter(p => ['present', 'late'].includes(getRecord(item, p).status)).length;
      const noCnt = players.filter(p => getRecord(item, p).status === 'absent').length;
      return '<article class="cal-card ' + (item.id === activeEv.id ? 'current-j' : '') + '">' +
        '<div style="display:flex;justify-content:space-between;align-items:center"><span class="badge-coach">' + esc(item.weekLabel) + ' · ' + esc(shortDateEs(item.date)) + '</span>' +
        '<span style="font-size:11px;font-weight:800;color:' + (item.savedAt ? 'var(--green-neon)' : 'var(--gold)') + '">💲 Arbitraje $' + (item.refereeCost || 170) + '</span></div>' +
        '<div class="field"><label>🆚 Equipo Rival (elige o escribe)</label><input type="text" list="rivalsDatalist" data-cal-edit="opponent" data-ev-id="' + esc(item.id) + '" value="' + esc(item.opponent || '') + '" /></div>' +
        '<div style="display:grid;grid-template-columns:1.1fr 0.9fr;gap:8px">' +
        '<div class="field"><label>📅 Fecha</label><input type="date" data-cal-edit="date" data-ev-id="' + esc(item.id) + '" value="' + esc(item.date || '') + '" /></div>' +
        '<div class="field"><label>🕒 Hora</label><input type="time" data-cal-edit="time" data-ev-id="' + esc(item.id) + '" value="' + esc(item.time || '') + '" /></div></div>' +
        '<div class="field"><label>📍 Cancha Oficial</label><input type="text" list="fieldsDatalist" data-cal-edit="field" data-ev-id="' + esc(item.id) + '" value="' + esc(item.field || '') + '" /></div>' +
        '<div style="display:flex;justify-content:space-between;font-size:12px;color:var(--text-muted);padding-top:2px">' +
        '<span>✅ Vienen: <b style="color:var(--green-neon)">' + yesCnt + '</b> · ❌ Faltan: <b style="color:var(--danger)">' + noCnt + '</b></span>' +
        '<a href="' + getMapsUrl(item.field) + '" target="_blank" rel="noopener" style="color:#fef08a;font-weight:800;text-decoration:none">🗺️ GPS ↗</a></div>' +
        '<div style="display:flex;gap:7px;margin-top:4px">' +
        '<button type="button" class="btn-green" style="flex:1;padding:8px" data-open-cal-j="' + esc(item.id) + '">📋 Pasar Lista</button>' +
        '<button type="button" class="btn-gold" style="flex:1;padding:8px" data-png-cal-j="' + esc(item.id) + '">🖼️ PNG</button></div></article>';
    }).join('');
  }

  function renderConstancyView(team, totalJ) {
    document.getElementById('constancyTitle').textContent = 'Matriz General de las ' + totalJ + ' Jornadas (' + team.name + ')';
    const players = (team.players || []).slice().sort((a, b) => getPlayerStats(b, team).rate - getPlayerStats(a, team).rate);
    const discards = players.filter(p => getPlayerStats(p, team).discard);

    document.getElementById('discardAlertBox').innerHTML = !discards.length
      ? '<h4 style="color:var(--green-electric)">🏆 Todo el plantel cumple en las jornadas registradas</h4>'
      : '<h4><span>⚠️ JUGADORES INCONSTANTES (' + discards.length + ')</span></h4><div style="display:flex;flex-wrap:wrap;gap:7px">' +
        discards.map(p => {
          const s = getPlayerStats(p, team);
          return '<span class="roster-row-no">#' + esc(p.number) + ' ' + esc(p.name) + ' (' + s.absences + ' faltas) <button type="button" class="btn-danger" style="padding:2px 6px" data-delete-player="' + esc(p.id) + '">Baja</button></span>';
        }).join('') + '</div>';

    let hCols = '<tr style="border-bottom:1px solid var(--border-green);text-align:left;color:var(--green-neon)"><th style="padding:8px 5px">#</th><th style="padding:8px 6px;min-width:140px">Jugador</th>';
    for (let j = 1; j <= totalJ; j++) {
      const opp = team.events[j - 1] ? team.events[j - 1].opponent : '';
      hCols += '<th style="padding:6px 3px;text-align:center" title="vs ' + esc(opp) + '">J' + j + '</th>';
    }
    hCols += '<th style="padding:8px 6px">% Real</th><th style="padding:8px 6px">Última Razón</th><th style="padding:8px 6px">Veredicto</th></tr>';
    document.getElementById('constancyTableHead').innerHTML = hCols;

    document.getElementById('constancyTableBody').innerHTML = players.map(p => {
      const st = getPlayerStats(p, team);
      return '<tr style="border-bottom:1px solid rgba(255,255,255,0.07);background:' + (st.discard ? 'rgba(255,71,105,0.1)' : 'transparent') + '">' +
        '<td style="padding:6px 5px;font-weight:800;color:var(--green-electric)">#' + esc(p.number) + '</td>' +
        '<td style="padding:6px;font-weight:800;color:#fff">' + esc(p.name) + '</td>' +
        (team.events || []).map((item, idx) => {
          const rJ = getRecord(item, p);
          const cls = rJ.status === 'present' ? 'wk-present' : rJ.status === 'late' ? 'wk-late' : rJ.status === 'absent' ? 'wk-absent' : rJ.status === 'new_later' ? 'wk-new' : '';
          const sym = rJ.status === 'present' ? '✅' : rJ.status === 'late' ? '⏰' : rJ.status === 'absent' ? '❌' : rJ.status === 'new_later' ? '🆕' : '➖';
          return '<td style="padding:2px;text-align:center"><button type="button" class="wk-btn ' + cls + '" data-toggle-week="' + esc(p.id) + '" data-wk-idx="' + idx + '" title="' + esc(item.weekLabel) + ' vs ' + esc(item.opponent) + '">' + sym + '</button></td>';
        }).join('') +
        '<td style="padding:6px;font-weight:800;white-space:nowrap;color:' + (st.rate >= 80 ? 'var(--green-neon)' : 'var(--danger)') + '">' + st.rate + '% (' + st.attended + '/' + st.playedJornadas + ')</td>' +
        '<td style="padding:6px;font-size:11.5px;color:var(--text-muted)">' + esc(st.lastReason || 'Cumple') + '</td>' +
        '<td style="padding:6px;white-space:nowrap">' + (st.discard ? '<span class="discard-badge">⚠️ Descartar</span>' : '<span class="constancy-Constant">🏆 Constante</span>') + '</td></tr>';
    }).join('');
  }

  function renderTacticsView(team, ev, available, isFut7, reqStarters) {
    document.getElementById('tacticsEyebrow').textContent = isFut7
      ? 'PIZARRA TÁCTICA FÚTBOL 7 (7 EN CANCHA · TORNEO OCALOS)'
      : 'PIZARRA TÁCTICA FÚTBOL 11 (11 EN CANCHA · CLUB AMÉRICA 35+)';
    document.getElementById('tacticsMainTitle').textContent = isFut7
      ? 'Siete Inicial (1 Portero + 6 de Campo) y Rotaciones'
      : 'Once Titular (1 Portero + 10 de Campo) y Banca';
    document.getElementById('btnAutoFillPresent').textContent = '⚡ Armar ' + reqStarters + ' con los que SÍ VIENEN';
    document.getElementById('startersHeadingLabel').textContent = isFut7
      ? 'Siete Titular en Cancha (Fútbol 7)'
      : 'Once Titular en Cancha (Fútbol 11)';
    document.getElementById('benchHeadingLabel').textContent = isFut7
      ? 'BANCA DE CAMBIOS ROTATIVOS FÚTBOL 7 (ILIMITADOS)'
      : 'BANCO DE SUPLENTES FÚTBOL 11';
    document.getElementById('pitchDimensionsBadge').textContent = isFut7
      ? 'Cancha Fútbol 7 · Campo Ocalos (7 vs 7)'
      : 'Cancha Reglamentaria Fútbol 11 (11 vs 11)';

    const formCat = getFormationsForTeam(team);
    const fSel = document.getElementById('tacticsFormationSelect');
    if (fSel) {
      fSel.innerHTML = '';
      Object.keys(formCat).forEach(k => fSel.add(new Option((isFut7 ? 'F7 · ' : 'F11 · ') + k.split('').join('-'), k)));
      fSel.value = team.formation;
    }

    const stIn = document.getElementById('tacticsStyleInput'); if (stIn && document.activeElement !== stIn) stIn.value = team.tacticalStyle || '';
    const optsHtml = selectedId => '<option value="">-- Seleccionar --</option>' + (team.players || []).map(p => '<option value="' + esc(p.id) + '" ' + (p.id === selectedId ? 'selected' : '') + '>#' + esc(p.number) + ' ' + esc(p.name) + '</option>').join('');
    document.getElementById('roleCaptainSelect').innerHTML = optsHtml(team.roles && team.roles.captain);
    document.getElementById('rolePenaltySelect').innerHTML = optsHtml(team.roles && team.roles.penalty);
    document.getElementById('roleFreekickSelect').innerHTML = optsHtml(team.roles && team.roles.freekick);
    document.getElementById('tacticsPitchContainer').replaceChildren(buildPitchSvg(team, ev, available));

    const coords = formCat[team.formation];
    const all = team.players || []; const starterIds = new Set();
    const eligible = available.filter(p => !p.suspended && !p.injured);

    document.getElementById('tacticsLineupSlots').innerHTML = coords.map((pos, idx) => {
      const cur = (team.lineupSlots && team.lineupSlots[idx]) || (eligible[idx] ? eligible[idx].id : '');
      if (cur) starterIds.add(cur);
      return '<div class="slot-item"><span class="slot-badge">' + (idx + 1) + '·' + esc(pos.code) + '</span>' +
        '<select data-lineup-slot="' + idx + '"><option value="">-- Vacío --</option>' +
        '<optgroup label="✅ Aptos que SÍ VIENEN (' + eligible.length + ')">' + eligible.map(p => '<option value="' + esc(p.id) + '" ' + (p.id === cur ? 'selected' : '') + '>#' + esc(p.number) + ' ' + esc(p.name) + '</option>').join('') + '</optgroup>' +
        '<optgroup label="❌ No vienen / 🚫 Susp. / 🩹 Lesión">' + all.filter(p => !eligible.includes(p)).map(p => '<option value="' + esc(p.id) + '" ' + (p.id === cur ? 'selected' : '') + '>' + (p.suspended ? '🚫 ' : p.injured ? '🩹 ' : '❌ ') + '#' + esc(p.number) + ' ' + esc(p.name) + '</option>').join('') + '</optgroup></select></div>';
    }).join('');
    const bench = eligible.filter(p => !starterIds.has(p.id));
    document.getElementById('benchPlayersList').innerHTML = bench.length ? bench.map(p => '<span class="bench-chip">🔄 #' + esc(p.number) + ' ' + esc(p.name) + ' (' + esc(p.position) + ')</span>').join('') : '<span style="font-size:12px;color:var(--text-muted)">Sin suplentes adicionales confirmados en ' + esc(ev.weekLabel) + '.</span>';
  }

  function renderMatchLiveView(team, ev, isFut7) {
    if (!team.liveMatch) team.liveMatch = { scoreHome: 0, scoreAway: 0, log: [] };
    if (!team.drills) team.drills = JSON.parse(JSON.stringify(DEFAULT_DRILLS));
    document.getElementById('liveMyTeamLabel').textContent = team.name.toUpperCase() + (isFut7 ? ' (F7)' : ' (F11)');
    document.getElementById('liveOpponentLabel').textContent = (ev.opponent || 'RIVAL').toUpperCase();
    document.getElementById('scoreHome').textContent = String(team.liveMatch.scoreHome || 0);
    document.getElementById('scoreAway').textContent = String(team.liveMatch.scoreAway || 0);
    const halfBtn = document.getElementById('btnTimerHalf');
    if (halfBtn) halfBtn.textContent = isFut7 ? "⏱️ 2º Tiempo (25')" : "⏱️ 2º Tiempo (45')";

    const pOpts = (team.players || []).map(p => '<option value="' + esc(p.name) + '">#' + esc(p.number) + ' ' + esc(p.name) + '</option>').join('');
    document.getElementById('livePlayerPrimary').innerHTML = pOpts;
    document.getElementById('livePlayerSecondary').innerHTML = '<option value="">-- Ninguno / Sin asistencia --</option>' + pOpts;
    document.getElementById('liveTimelineList').innerHTML = (team.liveMatch.log || []).map(item => '<div class="timeline-item"><span><b style="color:var(--green-electric)">' + esc(item.min) + '</b> · ' + esc(item.text) + '</span><button type="button" class="btn-danger" data-del-log="' + esc(item.id) + '" style="padding:3px 7px">✕</button></div>').join('');
    document.getElementById('drillsGrid').innerHTML = (team.drills || []).map(d => '<article class="drill-card ' + (d.done ? 'done' : '') + '"><div style="display:flex;justify-content:space-between;align-items:center"><span class="pos-badge">' + esc(d.category) + ' · ' + esc(d.duration) + '</span><button type="button" class="fee-btn ' + (d.done ? 'paid' : '') + '" data-toggle-drill="' + esc(d.id) + '">' + (d.done ? '✅ Completado' : '⏳ Pendiente') + '</button></div><h4 style="font-family:Sora,sans-serif;font-size:14.5px;color:#fff">' + esc(d.title) + '</h4><p style="font-size:12px;color:var(--text-muted)">' + esc(d.desc) + '</p></article>').join('');
  }

  function renderSquadView(team) {
    const positions = ['Portero', 'Defensa Central', 'Defensa Lateral', 'Defensa', 'Mediocampista', 'Enganche / 10', 'Extremo Derecho', 'Extremo Izquierdo', 'Delantero'];
    document.getElementById('squadTableBody').innerHTML = (team.players || []).map(p => {
      const st = getPlayerStats(p, team);
      return '<tr style="border-bottom:1px solid rgba(255,255,255,0.06)">' +
        '<td style="padding:6px"><input type="text" data-edit-field="number" data-id="' + esc(p.id) + '" value="' + esc(p.number) + '" style="width:46px;padding:5px;border-radius:7px;border:1px solid var(--border-green);background:#04120b;color:#fff;text-align:center;font-weight:800" /></td>' +
        '<td style="padding:6px"><input type="text" data-edit-field="name" data-id="' + esc(p.id) + '" value="' + esc(p.name) + '" style="width:100%;min-width:140px;padding:6px 8px;border-radius:7px;border:1px solid var(--border-green);background:#04120b;color:#fff;font-weight:700" /></td>' +
        '<td style="padding:6px"><input type="tel" data-edit-field="phone" data-id="' + esc(p.id) + '" value="' + esc(p.phone || '') + '" placeholder="+52 412..." style="width:132px;padding:6px 8px;border-radius:7px;border:1px solid var(--border-green);background:#04120b;color:#fef08a;font-size:12px" /></td>' +
        '<td style="padding:6px"><select data-edit-field="position" data-id="' + esc(p.id) + '" style="padding:6px;border-radius:7px;border:1px solid var(--border-green);background:#04120b;color:#fff">' + positions.map(pos => '<option value="' + esc(pos) + '" ' + (p.position === pos ? 'selected' : '') + '>' + esc(pos) + '</option>').join('') + '</select></td>' +
        '<td style="padding:6px;font-weight:800;color:var(--green-neon)">' + st.rate + '% (' + st.attended + '/' + st.playedJornadas + ')</td>' +
        '<td style="padding:6px"><input type="number" min="0" data-edit-field="goals" data-id="' + esc(p.id) + '" value="' + Number(p.goals || 0) + '" style="width:50px;padding:5px;border-radius:7px;border:1px solid var(--border-green);background:#04120b;color:#fff;text-align:center" /></td>' +
        '<td style="padding:6px"><input type="number" min="0" data-edit-field="assists" data-id="' + esc(p.id) + '" value="' + Number(p.assists || 0) + '" style="width:50px;padding:5px;border-radius:7px;border:1px solid var(--border-green);background:#04120b;color:#fff;text-align:center" /></td>' +
        '<td style="padding:6px"><input type="number" min="0" data-edit-field="yellows" data-id="' + esc(p.id) + '" value="' + Number(p.yellows || 0) + '" style="width:48px;padding:5px;border-radius:7px;border:1px solid var(--border-gold);background:#04120b;color:#fef08a;text-align:center" /></td>' +
        '<td style="padding:6px"><button type="button" class="btn-danger" data-delete-player="' + esc(p.id) + '">Baja</button></td></tr>';
    }).join('');
  }

  function renderSettingsView(team, totalJ, reqStarters) {
    [['cfgTeamName', team.name || ''], ['cfgStartersRequired', String(reqStarters)], ['cfgTotalJornadas', totalJ], ['cfgOwnerName', team.ownerName || ''], ['cfgTeamSubtitle', team.subtitle || ''], ['cfgCoachName', team.coachName || 'Franco'], ['cfgKitPrimary', team.kitPrimary || '#1ee87a'], ['cfgKitSecondary', team.kitSecondary || '#f7c948']].forEach(([id, val]) => {
      const el = document.getElementById(id); if (el && document.activeElement !== el) el.value = val;
    });
  }

  function buildJornadaReport(team, ev) {
    const t = team || activeTeam();
    const e = ev || activeEvent(t);
    const totalJ = teamJornadas(t);
    const req = startersGoal(t);
    const rCost = Number(e.refereeCost != null ? e.refereeCost : DEFAULT_REFEREE_COST);
    const pFee = Number(e.playerFee != null ? e.playerFee : DEFAULT_PLAYER_FEE);
    const players = t.players || [];
    const present = players.filter(p => getRecord(e, p).status === 'present');
    const late = players.filter(p => getRecord(e, p).status === 'late');
    const absent = players.filter(p => getRecord(e, p).status === 'absent');
    const comingCnt = present.length + late.length;
    const exactSplit = comingCnt > 0 ? Math.ceil(rCost / comingCnt) : rCost;
    const paidCnt = players.filter(p => getRecord(e, p).feePaid).length;
    const cash = paidCnt * pFee;

    return [
      '⚽ *ROL SEMANAL (' + (req === 7 ? 'FÚTBOL 7 OCALOS' : 'FÚTBOL 11') + ') · ' + e.weekLabel.toUpperCase() + ' (DE ' + totalJ + ')*',
      '🏆 *' + t.name.toUpperCase() + '* (' + (e.venue || 'Local') + ') vs *' + (e.opponent || 'Por definir').toUpperCase() + '*',
      '📅 *Fecha:* ' + shortDateEs(e.date) + ' (' + e.date + ') · 🕒 *Hora:* ' + e.time,
      '📍 *Cancha:* ' + e.field + ' · 👕 *Uniforme:* ' + (e.uniform || 'Oficial'),
      '🗺️ *Mapa GPS:* ' + getMapsUrl(e.field),
      '💲 *Arbitraje Oficial:* $' + rCost + ' MXN por partido (~$' + exactSplit + ' c/u entre ' + comingCnt + ' presentes · Recaudado: $' + cash + ')',
      '',
      '✅ *JUGADORES QUE SÍ VIENEN (' + comingCnt + ' — Meta ' + req + ' en cancha):*',
      ...present.map(p => '  • #' + p.number + ' ' + p.name),
      ...late.map(p => '  • #' + p.number + ' ' + p.name + ' (⏰ Tarde)'),
      '',
      '❌ *JUGADORES QUE NO VIENEN / FALTARON (' + absent.length + '):*',
      ...(absent.length ? absent.map(p => { const r = getRecord(e, p); return '  • #' + p.number + ' ' + p.name + ' — Motivo: ' + (r.reason || 'Sin avisar') + (r.note ? ' (' + r.note + ')' : ''); }) : ['  • Sin faltas en esta jornada'])
    ].join('\n');
  }

  function generateWhoCameAndMissedPng(targetEv) {
    const team = activeTeam();
    const ev = targetEv || activeEvent(team);
    const req = startersGoal(team);
    const isFut7 = req === 7;
    const rCost = Number(ev.refereeCost != null ? ev.refereeCost : DEFAULT_REFEREE_COST);
    const pFee = Number(ev.playerFee != null ? ev.playerFee : DEFAULT_PLAYER_FEE);
    const players = team.players || [];
    const coming = players.filter(p => ['present', 'late'].includes(getRecord(ev, p).status));
    const missing = players.filter(p => getRecord(ev, p).status === 'absent');
    const exactSplit = coming.length > 0 ? Math.ceil(rCost / coming.length) : rCost;
    const paidCnt = players.filter(p => getRecord(ev, p).feePaid).length;
    const cash = paidCnt * pFee;

    const rowsNeeded = Math.max(coming.length, missing.length, 10);
    const listHeight = Math.max(640, rowsNeeded * 46 + 90);
    const totalHeight = 400 + listHeight + 120;

    const canvas = document.createElement('canvas');
    canvas.width = 1200; canvas.height = totalHeight;
    const ctx = canvas.getContext('2d');

    const grad = ctx.createLinearGradient(0, 0, 1200, totalHeight);
    grad.addColorStop(0, '#03170e'); grad.addColorStop(0.5, '#072818'); grad.addColorStop(1, '#020a06');
    ctx.fillStyle = grad; ctx.fillRect(0, 0, 1200, totalHeight);

    ctx.strokeStyle = '#f7c948'; ctx.lineWidth = 5; ctx.strokeRect(26, 26, 1148, totalHeight - 52);
    ctx.strokeStyle = 'rgba(30,232,122,0.4)'; ctx.lineWidth = 2; ctx.strokeRect(38, 38, 1124, totalHeight - 76);

    const heroImg = document.getElementById('heroTeamLogo');
    let textLeft = 72;
    if (heroImg && heroImg.complete && heroImg.naturalWidth > 0) {
      try {
        ctx.fillStyle = '#070b08'; ctx.strokeStyle = '#f7c948'; ctx.lineWidth = 4;
        ctx.fillRect(68, 68, 150, 150); ctx.strokeRect(68, 68, 150, 150);
        ctx.drawImage(heroImg, 74, 74, 138, 138);
        textLeft = 244;
      } catch (_) {}
    }

    ctx.fillStyle = '#f7c948'; ctx.font = '800 25px sans-serif';
    ctx.fillText('⚽ ' + (isFut7 ? 'LIGA FÚTBOL 7 TORNEO OCALOS' : 'FÚTBOL 11 VETERANOS 35+') + ' · ' + ev.weekLabel.toUpperCase(), textLeft, 102);
    ctx.fillStyle = '#ffffff'; ctx.font = '900 52px sans-serif';
    ctx.fillText(team.name.toUpperCase(), textLeft, 160);
    ctx.fillStyle = '#1ee87a'; ctx.font = '800 32px sans-serif';
    ctx.fillText('🆚 RIVAL: ' + (ev.opponent || 'POR DEFINIR').toUpperCase() + (ev.scoreText ? ('  (' + ev.scoreText + ')') : ''), textLeft, 206);

    ctx.fillStyle = 'rgba(255,255,255,0.07)'; ctx.fillRect(68, 244, 1064, 96);
    ctx.strokeStyle = 'rgba(247,201,72,0.45)'; ctx.lineWidth = 2; ctx.strokeRect(68, 244, 1064, 96);
    ctx.fillStyle = '#fef08a'; ctx.font = '800 23px sans-serif';
    ctx.fillText('📅 ' + shortDateEs(ev.date).toUpperCase() + ' (' + ev.date + ')   |   🕒 ' + ev.time + ' HRS   |   📍 ' + ev.field, 92, 284);
    ctx.fillStyle = '#dcf2e5'; ctx.font = '700 21px sans-serif';
    ctx.fillText('💲 Arbitraje: $' + rCost + ' / partido (~$' + exactSplit + ' c/u · Recaudado: $' + cash + ')   |   👕 ' + (ev.uniform || 'Oficial') + '   |   DT: ' + team.coachName, 92, 322);

    const topY = 368, colW = 518, rightX = 614;
    ctx.fillStyle = 'rgba(10, 48, 29, 0.92)'; ctx.fillRect(68, topY, colW, listHeight);
    ctx.strokeStyle = '#1ee87a'; ctx.lineWidth = 3; ctx.strokeRect(68, topY, colW, listHeight);
    ctx.fillStyle = '#1ee87a'; ctx.fillRect(68, topY, colW, 58);
    ctx.fillStyle = '#021c0f'; ctx.font = '900 25px sans-serif';
    ctx.fillText('✅ SÍ VINIERON A JUGAR (' + coming.length + ')', 90, topY + 38);

    if (!coming.length) {
      ctx.fillStyle = '#9abaa9'; ctx.font = '600 22px sans-serif'; ctx.fillText('Sin jugadores confirmados aún.', 92, topY + 108);
    } else {
      coming.forEach((p, idx) => {
        const y = topY + 96 + idx * 45;
        const r = getRecord(ev, p);
        ctx.fillStyle = idx % 2 === 0 ? 'rgba(30,232,122,0.1)' : 'rgba(255,255,255,0.03)';
        ctx.fillRect(80, y - 30, colW - 24, 38);
        ctx.fillStyle = '#5bf59e'; ctx.font = '800 22px sans-serif'; ctx.fillText('#' + p.number, 92, y - 4);
        ctx.fillStyle = '#ffffff'; ctx.font = '700 22px sans-serif';
        const tag = r.status === 'late' ? ' (Tarde)' : (Number(p.joinWeek || 1) > 1 ? (' [J' + p.joinWeek + ']') : '');
        ctx.fillText(p.name.slice(0, 23) + tag, 152, y - 4);
      });
    }

    ctx.fillStyle = 'rgba(52, 11, 22, 0.92)'; ctx.fillRect(rightX, topY, colW, listHeight);
    ctx.strokeStyle = '#ff4769'; ctx.lineWidth = 3; ctx.strokeRect(rightX, topY, colW, listHeight);
    ctx.fillStyle = '#ff4769'; ctx.fillRect(rightX, topY, colW, 58);
    ctx.fillStyle = '#ffffff'; ctx.font = '900 25px sans-serif';
    ctx.fillText('❌ FALTARON / NO VINIERON (' + missing.length + ')', rightX + 22, topY + 38);

    if (!missing.length) {
      ctx.fillStyle = '#fecdd3'; ctx.font = '700 22px sans-serif'; ctx.fillText('🎉 Ninguna falta registrada hoy.', rightX + 24, topY + 108);
    } else {
      missing.forEach((p, idx) => {
        const y = topY + 96 + idx * 45;
        const r = getRecord(ev, p);
        ctx.fillStyle = idx % 2 === 0 ? 'rgba(255,71,105,0.14)' : 'rgba(255,255,255,0.03)';
        ctx.fillRect(rightX + 12, y - 30, colW - 24, 38);
        ctx.fillStyle = '#fda4af'; ctx.font = '800 21px sans-serif'; ctx.fillText('#' + p.number, rightX + 22, y - 4);
        ctx.fillStyle = '#ffffff'; ctx.font = '700 20px sans-serif';
        const reasonShort = (r.reason || 'Sin avisar').split('/')[0].trim();
        ctx.fillText(p.name.slice(0, 16) + ' · ' + reasonShort.slice(0, 14), rightX + 78, y - 4);
      });
    }

    ctx.fillStyle = '#9abaa9'; ctx.font = '700 21px sans-serif';
    ctx.fillText('Quórum ' + (isFut7 ? 'Fútbol 7' : 'Fútbol 11') + ': ' + (coming.length >= req ? ('Completo (' + req + ' titulares + ' + (coming.length - req) + ' cambios)') : ('Incompleto (' + coming.length + '/' + req + ')')) + '   ·   Arbitraje $' + rCost + ' / partido', 72, topY + listHeight + 50);

    const dataUrl = canvas.toDataURL('image/png');
    canvas.toBlob(blob => { lastPngBlob = blob; }, 'image/png');
    const previewImg = document.getElementById('pngPreviewElement');
    const dlLink = document.getElementById('btnDownloadPngDirect');
    const fileName = 'asistencia-' + team.id + '-' + ev.id + '.png';
    previewImg.src = dataUrl; dlLink.href = dataUrl; dlLink.download = fileName;
    document.getElementById('pngModal').classList.add('open');
    showToast('🖼️ Imagen PNG generada');
  }

  function printOfficialCedula() {
    const team = activeTeam(); const ev = activeEvent(team); const isFut7 = startersGoal(team) === 7;
    const rCost = Number(ev.refereeCost != null ? ev.refereeCost : DEFAULT_REFEREE_COST);
    const pFee = Number(ev.playerFee != null ? ev.playerFee : DEFAULT_PLAYER_FEE);
    const rowsHtml = (team.players || []).map(p => {
      const r = getRecord(ev, p);
      const stTxt = r.status === 'present' ? '✅ SÍ VINO' : r.status === 'late' ? '⏰ TARDE' : r.status === 'absent' ? '❌ NO VINO' : '⏳ S/R';
      return '<tr><td><b>#' + esc(p.number) + '</b></td><td>' + esc(p.name) + '</td><td>' + esc(p.position) + '</td><td>' + stTxt + '</td><td>' + esc(r.reason || '-') + '</td><td>' + (r.feePaid ? ('PAGÓ $' + pFee) : 'PEND.') + '</td></tr>';
    }).join('');
    const w = window.open('', '_blank');
    if (!w) { showToast('Permite ventanas emergentes para imprimir PDF'); return; }
    w.document.write('<!doctype html><html><head><meta charset="utf-8"><title>Cedula ' + esc(team.name) + '</title>' +
      '<style>body{font-family:Arial,sans-serif;padding:24px;color:#111}table{width:100%;border-collapse:collapse;margin-top:16px}th,td{border:1px solid #999;padding:7px 9px;font-size:12.5px;text-align:left}th{background:#0b3822;color:#fff}</style></head>' +
      '<body><h2>⚽ CÉDULA ' + (isFut7 ? 'FÚTBOL 7 TORNEO OCALOS' : 'FÚTBOL 11') + ' — ' + esc(team.name.toUpperCase()) + '</h2>' +
      '<p><b>' + esc(ev.weekLabel) + '</b> vs <b>' + esc(ev.opponent) + '</b> | Fecha: ' + esc(ev.date) + ' ' + esc(ev.time) + ' | Cancha: ' + esc(ev.field) + ' | Arbitraje: <b>$' + rCost + ' MXN</b> | DT: ' + esc(team.coachName) + '</p>' +
      '<table><thead><tr><th>#</th><th>Jugador</th><th>Posición</th><th>¿Vino?</th><th>Motivo si faltó</th><th>Arbitraje ($' + rCost + ')</th></tr></thead><tbody>' + rowsHtml + '</tbody></table></body></html>');
    w.document.close();
    setTimeout(() => { try { w.focus(); w.print(); } catch (_) {} }, 350);
  }

  function exportAttendanceCsv() {
    const team = activeTeam(); const totalJ = teamJornadas(team);
    const header = ['Dorsal', 'Jugador', 'Telefono_WhatsApp', 'Posicion', 'Ingreso'];
    for (let j = 1; j <= totalJ; j++) header.push('J' + j + '_' + (team.events[j - 1] ? team.events[j - 1].opponent : ''));
    header.push('Constancia_Real', 'Faltas', 'Goles', 'Asistencias');
    const rows = [header];
    (team.players || []).forEach(p => {
      const st = getPlayerStats(p, team);
      const r = [p.number, p.name, p.phone || '', p.position, 'J' + (p.joinWeek || 1)];
      (team.events || []).forEach(ev => {
        const rec = getRecord(ev, p);
        r.push(rec.status === 'present' ? 'SI VINO' : rec.status === 'late' ? 'TARDE' : rec.status === 'absent' ? ('FALTO (' + (rec.reason || 'S/A') + ')') : '-');
      });
      r.push(st.rate + '%', st.absences, p.goals || 0, p.assists || 0);
      rows.push(r);
    });
    const csv = rows.map(r => r.map(v => '"' + String(v).replace(/"/g, '""') + '"').join(',')).join('\n');
    const url = URL.createObjectURL(new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' }));
    const a = document.createElement('a'); a.href = url; a.download = 'calendario-asistencia-' + team.id + '-' + TODAY + '.csv'; a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000); showToast('📊 Excel/CSV descargado');
  }

  function updateTimerDisplay() {
    document.getElementById('matchTimerDisplay').textContent = String(Math.floor(timerSeconds / 60)).padStart(2, '0') + ':' + String(timerSeconds % 60).padStart(2, '0');
  }

  function initApp() {
    document.getElementById('fieldsDatalist').innerHTML = OFFICIAL_FIELDS.map(f => '<option value="' + esc(f.name) + '"></option>').join('');

    document.addEventListener('click', function (e) {
      const sw = e.target.closest('[data-switch-team]');
      if (sw) { state.activeTeamId = sw.dataset.switchTeam; saveState('⚽ ' + activeTeam().name + ' (' + (startersGoal() === 7 ? 'Fútbol 7' : 'Fútbol 11') + ')'); renderAll(); return; }

      const nv = e.target.closest('[data-nav-view]');
      if (nv) { switchView(nv.dataset.navView, true); return; }

      const evCard = e.target.closest('[data-select-event]');
      if (evCard) { activeTeam().activeEventId = evCard.dataset.selectEvent; saveState('📅 ' + activeEvent().weekLabel + ' abierta'); renderAll(); return; }

      const openCal = e.target.closest('[data-open-cal-j]');
      if (openCal) { activeTeam().activeEventId = openCal.dataset.openCalJ; switchView('attendance', true); renderAll(); return; }

      const pngCal = e.target.closest('[data-png-cal-j]');
      if (pngCal) { const targetEv = (activeTeam().events || []).find(x => x.id === pngCal.dataset.pngCalJ); if (targetEv) generateWhoCameAndMissedPng(targetEv); return; }

      // Botón rápido para aplicar la división exacta de los $170 entre los presentes
      const splitBtn = e.target.closest('#btnApplyExactSplit');
      if (splitBtn) {
        const ev = activeEvent();
        ev.playerFee = Number(splitBtn.dataset.splitVal || DEFAULT_PLAYER_FEE);
        saveState('⚡ Cuota ajustada a $' + ev.playerFee + ' c/u para cubrir $' + (ev.refereeCost || 170));
        renderAll(); return;
      }

      // Botón rápido para marcar pagados a todos los que sí vinieron
      if (e.target.closest('#btnMarkPresentPaid')) {
        const team = activeTeam(); const ev = activeEvent(team);
        (team.players || []).forEach(p => {
          const rec = getRecord(ev, p);
          if (rec.status === 'present' || rec.status === 'late') rec.feePaid = true;
        });
        ev.savedAt = nowStamp();
        saveState('💲 Presentes marcados como pagados'); renderAll(); return;
      }

      if (e.target.closest('#btnToggleMotion')) {
        state.motionEnabled = state.motionEnabled === false ? true : false;
        saveState(state.motionEnabled ? '🎬 Movimiento activado' : '🎬 Movimiento pausado'); renderAll(); return;
      }

      if (e.target.closest('#btnQuickStartJornada') || e.target.closest('#btnMarkAllPresent')) {
        const team = activeTeam(); const ev = activeEvent(team);
        (team.players || []).forEach(p => { if (Number(ev.jNum || 1) >= Number(p.joinWeek || 1)) { const rec = getRecord(ev, p); rec.status = 'present'; rec.reason = ''; } });
        ev.savedAt = nowStamp(); saveState('✅ Todos marcados en SÍ VIENEN (' + ev.weekLabel + ')'); renderAll(); return;
      }

      if (e.target.closest('#btnClearJornadaRecord')) {
        const ev = activeEvent();
        if (confirm('¿Reiniciar la lista únicamente de ' + ev.weekLabel + ' vs ' + ev.opponent + '?')) {
          ev.records = {}; ev.savedAt = null; saveState('Lista de ' + ev.weekLabel + ' reiniciada'); renderAll();
        }
        return;
      }

      if (e.target.closest('#btnCopyPrevJornada')) {
        const team = activeTeam(); const ev = activeEvent(team); const idx = (ev.jNum || 1) - 1;
        if (idx <= 0) { showToast('Estás en la Jornada 1'); return; }
        const prev = team.events[idx - 1];
        ev.records = JSON.parse(JSON.stringify(prev.records || {}));
        Object.values(ev.records).forEach(r => { r.feePaid = false; });
        ev.savedAt = nowStamp(); saveState('📋 Lista copiada de ' + prev.weekLabel); renderAll(); return;
      }

      if (e.target.closest('#btnSaveWeekSnapshot')) {
        const ev = activeEvent(); ev.savedAt = nowStamp();
        saveState('💾 Registro guardado (' + ev.weekLabel + ' vs ' + ev.opponent + ')'); renderAll(); return;
      }

      if (e.target.closest('#btnAddOneJornada')) {
        const team = activeTeam(); team.totalJornadas = teamJornadas(team) + 1; syncTeamEventsLength(team);
        team.activeEventId = 'jornada_' + team.totalJornadas; saveState('✅ Abierta Jornada ' + team.totalJornadas); renderAll(); return;
      }

      if (e.target.closest('#btnAddExtraJornadaAm')) {
        const am = state.teams.america_vet; am.totalJornadas = 12; syncTeamEventsLength(am);
        saveState('✅ Club América ampliado a 12 Jornadas'); renderAll(); return;
      }

      if (e.target.closest('#btnRecalcWeeklyDates')) {
        const team = activeTeam();
        const baseDate = (document.getElementById('autoStartDateInput') && document.getElementById('autoStartDateInput').value) || TODAY;
        (team.events || []).forEach((ev, idx) => { ev.date = addDaysIso(baseDate, idx * 7); });
        saveState('🔄 Fechas semanales recalculadas (+7 días)'); renderAll(); return;
      }

      if (e.target.closest('#btnGeneratePosterPng') || e.target.closest('#btnGeneratePosterTop') || e.target.closest('#btnGeneratePosterTactics')) {
        generateWhoCameAndMissedPng(); return;
      }

      if (e.target.closest('#btnClosePngModal')) { document.getElementById('pngModal').classList.remove('open'); return; }

      if (e.target.closest('#btnShareNativePng')) {
        const team = activeTeam(); const ev = activeEvent(team);
        if (lastPngBlob && navigator.canShare) {
          const file = new File([lastPngBlob], 'asistencia-' + ev.id + '.png', { type: 'image/png' });
          if (navigator.canShare({ files: [file] })) {
            navigator.share({ files: [file], title: team.name + ' · ' + ev.weekLabel, text: team.name + ' · ' + ev.weekLabel + ' vs ' + ev.opponent }).catch(() => {});
            return;
          }
        }
        document.getElementById('btnDownloadPngDirect').click();
        showToast('⬇️ Imagen descargada: envíala como foto en WhatsApp');
        return;
      }

      if (e.target.closest('#btnPrintCedula')) { printOfficialCedula(); return; }
      if (e.target.closest('#btnExportCsv') || e.target.closest('#btnExportCsvSquad')) { exportAttendanceCsv(); return; }
      if (e.target.closest('#btnShareWa') || e.target.closest('#btnShareConstancyWa')) {
        window.open('https://wa.me/?text=' + encodeURIComponent(buildJornadaReport()), '_blank', 'noopener'); return;
      }
      if (e.target.closest('#btnCopyReport')) { copyTextSafe(buildJornadaReport()); return; }

      if (e.target.closest('#btnRemindDoubtWa')) {
        const team = activeTeam(); const ev = activeEvent(team);
        window.open('https://wa.me/?text=' + encodeURIComponent('🔔 *CONFIRMAR SI VIENES O NO VIENES (' + team.name + ')*\n' + ev.weekLabel + ' vs *' + ev.opponent + '* el ' + shortDateEs(ev.date) + ' a las ' + ev.time + ' en ' + ev.field + ' (Arbitraje $' + (ev.refereeCost || 170) + ' por partido):\n' + location.origin + location.pathname + '?team=' + team.id + '&rsvp=1'), '_blank', 'noopener');
        return;
      }

      if (e.target.closest('#btnOpenRsvpModal')) { document.getElementById('rsvpModal').classList.add('open'); return; }
      if (e.target.closest('#btnCloseRsvp')) { document.getElementById('rsvpModal').classList.remove('open'); return; }
      if (e.target.closest('#btnRsvpYes')) {
        const team = activeTeam(); const ev = activeEvent(team);
        const p = (team.players || []).find(x => x.id === document.getElementById('rsvpPlayerSelect').value);
        if (p) { const rec = getRecord(ev, p); rec.status = 'present'; rec.reason = ''; ev.savedAt = nowStamp(); saveState('✅ ' + p.name + ' SÍ VIENE'); document.getElementById('rsvpModal').classList.remove('open'); renderAll(); }
        return;
      }
      if (e.target.closest('#btnRsvpNo')) {
        const team = activeTeam(); const ev = activeEvent(team);
        const p = (team.players || []).find(x => x.id === document.getElementById('rsvpPlayerSelect').value);
        const reason = document.getElementById('rsvpReasonInput').value.trim() || 'Compromiso familiar / Personal';
        if (p) { const rec = getRecord(ev, p); rec.status = 'absent'; rec.reason = reason; ev.savedAt = nowStamp(); saveState('❌ ' + p.name + ' NO VIENE'); document.getElementById('rsvpModal').classList.remove('open'); renderAll(); }
        return;
      }

      if (e.target.closest('#btnAutoFillPresent')) {
        const team = activeTeam(); const ev = activeEvent(team); const req = startersGoal(team);
        const avail = (team.players || []).filter(p => ['present', 'late'].includes(getRecord(ev, p).status) && !p.suspended && !p.injured).sort((a, b) => getPlayerStats(b, team).rate - getPlayerStats(a, team).rate);
        team.lineupSlots = {}; avail.slice(0, req).forEach((p, idx) => { team.lineupSlots[idx] = p.id; });
        saveState('⚡ ' + req + ' titulares armados con presentes'); renderAll(); return;
      }
      if (e.target.closest('#btnResetPitchCoords')) {
        const team = activeTeam(); if (team.customCoords && team.customCoords[team.formation]) delete team.customCoords[team.formation];
        saveState('🔄 Formación centrada'); renderAll(); return;
      }
      if (e.target.closest('#btnDownloadPitchSvg')) {
        const svg = document.querySelector('#tacticsPitchContainer svg'); if (!svg) return;
        const url = URL.createObjectURL(new Blob([new XMLSerializer().serializeToString(svg)], { type: 'image/svg+xml;charset=utf-8' }));
        const a = document.createElement('a'); a.href = url; a.download = 'pizarra-' + activeTeam().id + '.svg'; a.click(); return;
      }

      if (e.target.closest('#btnTimerToggle')) {
        if (timerInterval) { clearInterval(timerInterval); timerInterval = null; showToast('⏸️ Cronómetro pausado'); }
        else { timerInterval = setInterval(() => { timerSeconds++; updateTimerDisplay(); }, 1000); showToast('▶️ Cronómetro en marcha'); }
        return;
      }
      if (e.target.closest('#btnTimerHalf')) {
        const mins = startersGoal() === 7 ? 25 : 45;
        timerSeconds = mins * 60; updateTimerDisplay(); showToast('⏱️ 2º Tiempo (' + mins + ':00)'); return;
      }
      if (e.target.closest('#btnTimerReset')) { clearInterval(timerInterval); timerInterval = null; timerSeconds = 0; updateTimerDisplay(); return; }
      if (e.target.closest('#btnHomePlus')) { activeTeam().liveMatch.scoreHome++; saveState('⚽ Gol a favor'); renderAll(); return; }
      if (e.target.closest('#btnHomeMinus')) { activeTeam().liveMatch.scoreHome = Math.max(0, activeTeam().liveMatch.scoreHome - 1); saveState(); renderAll(); return; }
      if (e.target.closest('#btnAwayPlus')) { activeTeam().liveMatch.scoreAway++; saveState('Gol rival'); renderAll(); return; }
      if (e.target.closest('#btnAwayMinus')) { activeTeam().liveMatch.scoreAway = Math.max(0, activeTeam().liveMatch.scoreAway - 1); saveState(); renderAll(); return; }
      if (e.target.closest('#btnShareLiveWa')) {
        const team = activeTeam(); const ev = activeEvent(team); const lm = team.liveMatch || { scoreHome: 0, scoreAway: 0, log: [] };
        window.open('https://wa.me/?text=' + encodeURIComponent('⏱️ *' + team.name + ' ' + lm.scoreHome + ' - ' + lm.scoreAway + ' ' + ev.opponent + '*\n' + (lm.log || []).map(l => '• ' + l.min + ' ' + l.text).join('\n')), '_blank', 'noopener');
        return;
      }

      if (e.target.closest('#btnExportBackup')) {
        const url = URL.createObjectURL(new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' }));
        const a = document.createElement('a'); a.href = url; a.download = 'respaldo-manager-v21-' + TODAY + '.json'; a.click(); return;
      }
      if (e.target.closest('#btnResetFactory')) {
        if (confirm('¿Restaurar calendario oficial con Arbitraje de $170 por partido?')) {
          state = buildDefaultState(); saveState('✅ Datos restaurados ($170 Arbitraje)'); renderAll();
        }
        return;
      }

      const flt = e.target.closest('[data-att-filter]');
      if (flt) { currentFilter = flt.dataset.attFilter; renderAll(); return; }

      const wkBtn = e.target.closest('[data-toggle-week]');
      if (wkBtn) {
        const team = activeTeam(); const p = (team.players || []).find(x => x.id === wkBtn.dataset.toggleWeek);
        const idx = Number(wkBtn.dataset.wkIdx); const targetEv = team.events ? team.events[idx] : null;
        if (p && targetEv && (idx + 1) >= Number(p.joinWeek || 1)) {
          const rec = getRecord(targetEv, p);
          rec.status = rec.status === 'present' ? 'absent' : rec.status === 'absent' ? 'late' : rec.status === 'late' ? 'unrecorded' : 'present';
          if (rec.status === 'absent' && !rec.reason) rec.reason = 'Sin avisar / Falta injustificada';
          if (rec.status === 'present') rec.reason = '';
          targetEv.savedAt = nowStamp(); saveState('💾 ' + targetEv.weekLabel + ' guardada'); renderAll();
        }
        return;
      }

      const st = e.target.closest('[data-set-status]');
      if (st) {
        const team = activeTeam(); const ev = activeEvent(team);
        const p = (team.players || []).find(x => x.id === st.dataset.id);
        if (p) {
          const rec = getRecord(ev, p);
          rec.status = st.dataset.setStatus;
          if (rec.status === 'present') rec.reason = '';
          if (rec.status === 'absent' && !rec.reason) rec.reason = 'Sin avisar / Falta injustificada';
          ev.savedAt = nowStamp();
          saveState('💾 ' + p.name + ': ' + (rec.status === 'present' ? '✅ SÍ VIENE' : rec.status === 'absent' ? '❌ NO VIENE' : rec.status));
          renderAll();
        }
        return;
      }

      const fee = e.target.closest('[data-toggle-fee]');
      if (fee) {
        const team = activeTeam(); const ev = activeEvent(team);
        const p = (team.players || []).find(x => x.id === fee.dataset.toggleFee);
        if (p) { const rec = getRecord(ev, p); rec.feePaid = !rec.feePaid; ev.savedAt = nowStamp(); saveState('💲 Pago actualizado'); renderAll(); }
        return;
      }

      const yBtn = e.target.closest('[data-add-yellow]');
      if (yBtn) { const p = (activeTeam().players || []).find(x => x.id === yBtn.dataset.addYellow); if (p) { p.yellows = Number(p.yellows || 0) + 1; saveState('🟨 Amarilla a ' + p.name); renderAll(); } return; }
      const sBtn = e.target.closest('[data-toggle-susp]');
      if (sBtn) { const p = (activeTeam().players || []).find(x => x.id === sBtn.dataset.toggleSusp); if (p) { p.suspended = !p.suspended; saveState(p.suspended ? '🚫 Suspendido' : '✅ Habilitado'); renderAll(); } return; }
      const iBtn = e.target.closest('[data-toggle-inj]');
      if (iBtn) { const p = (activeTeam().players || []).find(x => x.id === iBtn.dataset.toggleInj); if (p) { p.injured = !p.injured; saveState(p.injured ? '🩹 Lesionado' : '✅ Al 100%'); renderAll(); } return; }
      const drBtn = e.target.closest('[data-toggle-drill]');
      if (drBtn) { const d = (activeTeam().drills || []).find(x => x.id === drBtn.dataset.toggleDrill); if (d) { d.done = !d.done; saveState(); renderAll(); } return; }
      const delLog = e.target.closest('[data-del-log]');
      if (delLog) { const team = activeTeam(); team.liveMatch.log = (team.liveMatch.log || []).filter(x => x.id !== delLog.dataset.delLog); saveState(); renderAll(); return; }
      const ping = e.target.closest('[data-ping-player]');
      if (ping) {
        const team = activeTeam(); const ev = activeEvent(team); const p = (team.players || []).find(x => x.id === ping.dataset.pingPlayer);
        if (p) {
          const rsvpUrl = location.origin + location.pathname + '?team=' + team.id + '&rsvp=1';
          const msg = 'Hola *' + p.name + '* (#' + p.number + '), juego de *' + team.name + '* en ' + ev.weekLabel + ' vs *' + ev.opponent + '* el ' + shortDateEs(ev.date) + ' a las ' + ev.time + ' en *' + ev.field + '* (Arbitraje $' + (ev.refereeCost || 170) + ' por partido). Confirma si vienes aquí: ' + rsvpUrl;
          const digits = cleanPhone(p.phone); window.open((digits ? ('https://wa.me/' + digits) : 'https://wa.me/') + '?text=' + encodeURIComponent(msg), '_blank', 'noopener');
        }
        return;
      }
      const gBtn = e.target.closest('[data-add-goal]');
      if (gBtn) { const p = (activeTeam().players || []).find(x => x.id === gBtn.dataset.addGoal); if (p) { p.goals = Number(p.goals || 0) + 1; saveState('⚽ Gol para ' + p.name); renderAll(); } return; }
      const del = e.target.closest('[data-delete-player]');
      if (del) { const team = activeTeam(); const idx = (team.players || []).findIndex(x => x.id === del.dataset.deletePlayer); if (idx >= 0) { const rem = team.players.splice(idx, 1)[0]; saveState('Baja: ' + rem.name); renderAll(); } }
    });

    document.getElementById('addPlayerForm').addEventListener('submit', function (e) {
      e.preventDefault();
      const team = activeTeam(); const totalJ = teamJornadas(team);
      const name = document.getElementById('newPlayerName').value.trim(); if (!name) return;
      const number = document.getElementById('newPlayerNumber').value.trim() || String((team.players.length || 0) + 1);
      const phone = document.getElementById('newPlayerPhone').value.trim();
      const position = document.getElementById('newPlayerPos').value;
      const joinWeek = Math.min(totalJ, Math.max(1, Number(document.getElementById('newPlayerJoinWeek').value || 1)));
      const status = document.getElementById('newPlayerStatus').value;
      const newId = 'pl_' + Date.now();
      team.players.unshift({ id: newId, number, name, phone, position, joinWeek, note: 'Nuevo ingreso J' + joinWeek, goals: 0, assists: 0, yellows: 0, suspended: false, injured: false });
      const joinEv = team.events[joinWeek - 1];
      if (joinEv) {
        if (!joinEv.records) joinEv.records = {};
        joinEv.records[newId] = { status, reason: status === 'absent' ? 'Sin avisar / Falta injustificada' : '', note: 'Debut J' + joinWeek, feePaid: false };
        joinEv.savedAt = nowStamp();
        team.activeEventId = joinEv.id;
      }
      e.target.reset(); saveState('🆕 Agregado en Jornada ' + joinWeek + ': #' + number + ' ' + name); renderAll();
    });

    document.getElementById('liveActionForm').addEventListener('submit', function (e) {
      e.preventDefault(); const team = activeTeam();
      const sec = document.getElementById('livePlayerSecondary').value;
      const desc = document.getElementById('liveActionType').value + ': ' + document.getElementById('livePlayerPrimary').value + (sec ? (' (' + sec + ')') : '');
      team.liveMatch.log.unshift({ id: 'lg_' + Date.now(), min: document.getElementById('liveMinuteInput').value.trim() || (Math.floor(timerSeconds / 60) + "'"), text: desc });
      document.getElementById('liveMinuteInput').value = ''; saveState('➕ Acción registrada'); renderAll();
    });

    document.getElementById('teamConfigForm').addEventListener('submit', function (e) {
      e.preventDefault(); const team = activeTeam();
      team.name = document.getElementById('cfgTeamName').value.trim() || team.name;
      team.startersRequired = Number(document.getElementById('cfgStartersRequired').value || 11);
      team.formation = team.startersRequired === 7 ? '231' : '433';
      team.totalJornadas = Math.min(38, Math.max(1, Number(document.getElementById('cfgTotalJornadas').value || team.totalJornadas)));
      team.ownerName = document.getElementById('cfgOwnerName').value.trim() || team.ownerName;
      team.subtitle = document.getElementById('cfgTeamSubtitle').value.trim() || team.subtitle;
      team.coachName = document.getElementById('cfgCoachName').value.trim() || team.coachName;
      team.kitPrimary = document.getElementById('cfgKitPrimary').value || '#1ee87a';
      team.kitSecondary = document.getElementById('cfgKitSecondary').value || '#f7c948';
      syncTeamEventsLength(team); saveState('💾 Configuración guardada'); renderAll();
    });

    document.getElementById('quickHeroLogoInput').addEventListener('change', function (e) {
      const file = e.target.files && e.target.files[0]; if (!file) return;
      const r = new FileReader();
      r.onload = () => {
        const dataUrl = String(r.result || '');
        const team = activeTeam(); team.logo = dataUrl;
        if (team.id === 'atletico_luz') { localStorage.setItem('CUSTOM_LUZ_CREST_OVERRIDE', dataUrl); window.ATLETICO_LA_LUZ_REAL_LOGO = dataUrl; }
        saveState('✅ Escudo actualizado'); renderAll();
      };
      r.readAsDataURL(file);
    });

    document.getElementById('inputImportBackup').addEventListener('change', function (e) {
      const f = e.target.files && e.target.files[0]; if (!f) return;
      const r = new FileReader();
      r.onload = () => { try { const parsed = JSON.parse(String(r.result || '')); if (parsed && parsed.teams) { state = parsed; saveState('✅ Respaldo cargado'); renderAll(); } } catch (_) { showToast('Archivo inválido'); } };
      r.readAsText(f);
    });

    document.getElementById('playerSearchInput').addEventListener('input', e => { searchQuery = e.target.value; renderAll(); });
    document.getElementById('playerSortSelect').addEventListener('change', e => { sortMode = e.target.value; renderAll(); });
    document.getElementById('tacticsStyleInput').addEventListener('input', e => { activeTeam().tacticalStyle = e.target.value; saveState(); });

    document.addEventListener('change', function (e) {
      const team = activeTeam(); const ev = activeEvent(team);
      if (e.target.matches('[data-cal-edit]')) {
        const targetEv = (team.events || []).find(x => x.id === e.target.dataset.evId);
        if (targetEv) { targetEv[e.target.dataset.calEdit] = e.target.value; saveState('📅 Calendario actualizado'); renderAll(); }
        return;
      }
      if (e.target.id === 'evWeekLabel') { const matchEv = (team.events || []).find(x => x.weekLabel === e.target.value); if (matchEv) { team.activeEventId = matchEv.id; saveState(); renderAll(); return; } }
      if (e.target.id === 'matchVenueType') { ev.venue = e.target.value; saveState(); renderAll(); return; }
      if (e.target.id === 'matchResultType') { ev.resultType = e.target.value; saveState('🏆 Resultado actualizado'); renderAll(); return; }
      if (e.target.matches('[data-absence-reason]')) {
        const p = (team.players || []).find(x => x.id === e.target.dataset.absenceReason);
        if (p) { const rec = getRecord(ev, p); rec.reason = e.target.value; if (rec.reason) rec.status = 'absent'; ev.savedAt = nowStamp(); saveState('💾 Motivo guardado'); renderAll(); }
        return;
      }
      if (e.target.matches('[data-player-note]')) {
        const p = (team.players || []).find(x => x.id === e.target.dataset.playerNote);
        if (p) { getRecord(ev, p).note = e.target.value; ev.savedAt = nowStamp(); saveState(); }
        return;
      }
      if (e.target.id === 'tacticsFormationSelect') { team.formation = e.target.value; saveState('📋 Formación cambiada'); renderAll(); return; }
      if (e.target.id === 'roleCaptainSelect') { team.roles = Object.assign({}, team.roles, { captain: e.target.value }); saveState(); renderAll(); return; }
      if (e.target.id === 'rolePenaltySelect') { team.roles = Object.assign({}, team.roles, { penalty: e.target.value }); saveState(); return; }
      if (e.target.id === 'roleFreekickSelect') { team.roles = Object.assign({}, team.roles, { freekick: e.target.value }); saveState(); return; }
      if (e.target.matches('[data-lineup-slot]')) { if (!team.lineupSlots) team.lineupSlots = {}; team.lineupSlots[Number(e.target.dataset.lineupSlot)] = e.target.value; saveState(); renderAll(); return; }
      if (e.target.matches('[data-edit-field]')) {
        const p = (team.players || []).find(x => x.id === e.target.dataset.id); const f = e.target.dataset.editField;
        if (p && f) { p[f] = ['goals', 'assists', 'yellows'].includes(f) ? Math.max(0, Number(e.target.value || 0)) : e.target.value; saveState(); renderAll(); }
        return;
      }
      if (e.target.id === 'cfgLogoUpload') {
        const file = e.target.files && e.target.files[0]; if (!file) return;
        const r = new FileReader();
        r.onload = () => {
          const dataUrl = String(r.result || team.logo); team.logo = dataUrl;
          if (team.id === 'atletico_luz') { localStorage.setItem('CUSTOM_LUZ_CREST_OVERRIDE', dataUrl); window.ATLETICO_LA_LUZ_REAL_LOGO = dataUrl; }
          saveState('✅ Escudo actualizado'); renderAll();
        };
        r.readAsDataURL(file);
      }
    });

    ['matchOpponent', 'matchDate', 'matchTime', 'matchField', 'matchUniform', 'matchScoreInput', 'refereeCostInput', 'playerFeeInput', 'matchCoachNotes'].forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      el.addEventListener('input', function (e) {
        const ev = activeEvent();
        if (id === 'matchOpponent') ev.opponent = e.target.value;
        if (id === 'matchDate') ev.date = e.target.value;
        if (id === 'matchTime') ev.time = e.target.value;
        if (id === 'matchField') ev.field = e.target.value;
        if (id === 'matchUniform') ev.uniform = e.target.value;
        if (id === 'matchScoreInput') ev.scoreText = e.target.value;
        if (id === 'refereeCostInput') ev.refereeCost = Math.max(0, Number(e.target.value || 0));
        if (id === 'playerFeeInput') ev.playerFee = Math.max(0, Number(e.target.value || 0));
        if (id === 'matchCoachNotes') ev.coachNotes = e.target.value;
        saveState(); renderAll();
      });
    });

    const params = new URLSearchParams(location.search);
    if (params.get('team') && state.teams[params.get('team')]) state.activeTeamId = params.get('team');
    if (params.get('rsvp') === '1') setTimeout(() => document.getElementById('rsvpModal').classList.add('open'), 250);

    renderAll();
    const stage = document.getElementById('mgrBallStage');
    if (stage && window.JRBallModelV38 && window.JRBallModelV38.fallback) {
      try { const fb = window.JRBallModelV38.fallback(stage); window.addEventListener('resize', () => fb.draw()); } catch (_) {}
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }
})();
