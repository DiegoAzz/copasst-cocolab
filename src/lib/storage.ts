'use client';

import { CompanyProfile, Member, Evidence, Acta, QuejaCocolab, ProcesoEleccion } from '@/types';

const INITIAL_COMPANY: CompanyProfile = {
  razonSocial: 'Logística & Soluciones Industriales Andina S.A.S.',
  nit: '901.458.789-2',
  actividadEconomica: 'Transporte de carga, almacenamiento y logística integral',
  codigoCIIU: '4923 / 5210',
  arl: 'Seguros Bolívar / ARL SURA',
  nivelRiesgo: 3,
  totalTrabajadores: 48,
  sedePrincipal: 'Sede Principal - Zona Industrial Cazucá',
  direccion: 'Calle 17 # 68D - 45',
  ciudad: 'Bogotá D.C., Colombia',
  representanteLegal: 'Carlos Andrés Mendoza Vargas',
  responsableSST: 'Ing. Laura Marcela Gómez Pardo',
  licenciaSST: 'Resolución SDS-34821 de 2021',
  vigenciaComitesDesde: '2026-01-15',
  vigenciaComitesHasta: '2028-01-14',
};

const INITIAL_MEMBERS: Member[] = [
  // COPASST
  {
    id: 'm1',
    nombre: 'Ing. Laura Marcela Gómez Pardo',
    cedula: '1.018.452.331',
    cargo: 'Coordinadora de Seguridad y Salud en el Trabajo',
    comite: 'COPASST',
    representacion: 'Empleador',
    rol: 'Presidente',
    condicion: 'Principal',
    telefono: '3104589211',
    email: 'sst@logisticaandina.co',
    fechaPosesion: '2026-01-15',
  },
  {
    id: 'm2',
    nombre: 'Ricardo Antonio Beltrán Peña',
    cedula: '79.845.120',
    cargo: 'Jefe de Mantenimiento de Flota',
    comite: 'COPASST',
    representacion: 'Empleador',
    rol: 'Vocal / Miembro',
    condicion: 'Suplente',
    telefono: '3158941203',
    email: 'mantenimiento@logisticaandina.co',
    fechaPosesion: '2026-01-15',
  },
  {
    id: 'm3',
    nombre: 'Diana Milena Rincón Castro',
    cedula: '52.981.440',
    cargo: 'Supervisora de Operaciones Bodega',
    comite: 'COPASST',
    representacion: 'Trabajadores',
    rol: 'Secretario',
    condicion: 'Principal',
    telefono: '3207712399',
    email: 'operaciones@logisticaandina.co',
    fechaPosesion: '2026-01-15',
  },
  {
    id: 'm4',
    nombre: 'Javier Orlando Pinzón Silva',
    cedula: '80.231.995',
    cargo: 'Operador de Montacargas',
    comite: 'COPASST',
    representacion: 'Trabajadores',
    rol: 'Vocal / Miembro',
    condicion: 'Suplente',
    telefono: '3186634120',
    email: 'jpinzon@logisticaandina.co',
    fechaPosesion: '2026-01-15',
  },
  // COCOLAB
  {
    id: 'm5',
    nombre: 'Felipe Andrés Salamanca Ruiz',
    cedula: '1.022.341.552',
    cargo: 'Director de Gestión Humana',
    comite: 'COCOLAB',
    representacion: 'Empleador',
    rol: 'Presidente',
    condicion: 'Principal',
    telefono: '3114529088',
    email: 'gh@logisticaandina.co',
    fechaPosesion: '2026-01-15',
  },
  {
    id: 'm6',
    nombre: 'Claudia Patricia Hoyos Meza',
    cedula: '53.112.879',
    cargo: 'Coordinadora de Nómina y Bienestar',
    comite: 'COCOLAB',
    representacion: 'Empleador',
    rol: 'Vocal / Miembro',
    condicion: 'Suplente',
    telefono: '3128905541',
    email: 'bienestar@logisticaandina.co',
    fechaPosesion: '2026-01-15',
  },
  {
    id: 'm7',
    nombre: 'Esteban Morales Cárdenas',
    cedula: '1.030.551.487',
    cargo: 'Líder de Facturación y Despachos',
    comite: 'COCOLAB',
    representacion: 'Trabajadores',
    rol: 'Secretario',
    condicion: 'Principal',
    telefono: '3197743201',
    email: 'despachos@logisticaandina.co',
    fechaPosesion: '2026-01-15',
  },
  {
    id: 'm8',
    nombre: 'Nathalia Sofía Vargas Peña',
    cedula: '1.014.223.901',
    cargo: 'Auxiliar Contable',
    comite: 'COCOLAB',
    representacion: 'Trabajadores',
    rol: 'Vocal / Miembro',
    condicion: 'Suplente',
    telefono: '3168894125',
    email: 'contabilidad@logisticaandina.co',
    fechaPosesion: '2026-01-15',
  },
];

// Helper to generate sample image SVG data URI
function generateSampleSvg(label: string, color: string, iconType: 'hazard' | 'check' | 'camera') {
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400" fill="%231e293b"><rect width="600" height="400" rx="16" fill="%230f172a"/><rect x="20" y="20" width="560" height="360" rx="12" fill="%231e293b" stroke="%23334155" stroke-width="2"/><circle cx="300" cy="160" r="50" fill="${encodeURIComponent(color)}" fill-opacity="0.2" stroke="${encodeURIComponent(color)}" stroke-width="4"/><text x="300" y="170" font-family="Arial, sans-serif" font-size="32" font-weight="bold" fill="${encodeURIComponent(color)}" text-anchor="middle">⚠️</text><text x="300" y="260" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="%23f8fafc" text-anchor="middle">${encodeURIComponent(label)}</text><text x="300" y="295" font-family="Arial, sans-serif" font-size="14" fill="%2394a3b8" text-anchor="middle">EVIDENCIA SG-SST REGISTRADA</text></svg>`;
}

const INITIAL_EVIDENCES: Evidence[] = [
  {
    id: 'ev-01',
    titulo: 'Obstrucción de Gabinete Contra Incendios y Extintor',
    descripcion: 'Durante la ronda de inspección en Bodega 2, se detectó apilamiento de estibas de madera que obstaculizan totalmente el acceso al extintor multipropósito y al gabinete de manguera.',
    peligroGTC45: 'Seguridad - Tecnológico (Explosión, Fuga, Incendio)',
    clasificacion: 'Condición Insegura',
    fecha: '2026-11-10',
    hora: '09:45 AM',
    sede: 'Sede Principal - Cazucá',
    areaLugar: 'Bodega 2 - Pasillo Central 4',
    reportadoPor: 'Diana Milena Rincón (Secretaria COPASST)',
    estado: 'subsanado',
    imagenAntes: generateSampleSvg('Extintor Obstruido con Estibas', '#f59e0b', 'hazard'),
    imagenDespues: generateSampleSvg('Área Despejada y Señalizada', '#10b981', 'check'),
    medidaCorrectiva: 'Reubicación inmediata de estibas en racks autorizados y demarcación de franja amarilla de 1x1m de despeje.',
    responsableAccion: 'Ricardo Beltrán (Jefe de Mantenimiento)',
    fechaCompromiso: '2026-11-11',
    actaIdRelacionada: 'acta-cop-01',
    fechaCierre: '2026-11-11',
  },
  {
    id: 'ev-02',
    titulo: 'Cable Eléctrico Expuesto en Estación de Carga',
    descripcion: 'Acometida eléctrica de 220V para cargador de batería de montacargas con aislamiento desgastado y cables expuestos con riesgo inminente de contacto eléctrico directo.',
    peligroGTC45: 'Seguridad - Eléctrico (Alta/baja tensión, Tableros)',
    clasificacion: 'Condición Insegura',
    fecha: '2026-11-14',
    hora: '03:15 PM',
    sede: 'Sede Principal - Cazucá',
    areaLugar: 'Taller de Mantenimiento - Bahía de Baterías',
    reportadoPor: 'Javier Pinzón (Operador Montacargas)',
    estado: 'en_proceso',
    imagenAntes: generateSampleSvg('Cableado 220V Expuesto', '#ef4444', 'hazard'),
    medidaCorrectiva: 'Desenergización preventiva, canalización en tubería conduit metálica y reemplazo de encauchetado.',
    responsableAccion: 'Ing. Electricista Externo / Ricardo Beltrán',
    fechaCompromiso: '2026-11-21',
    actaIdRelacionada: 'acta-cop-01',
  },
  {
    id: 'ev-03',
    titulo: 'Derrame de Aceite Hidráulico en Rampa de Despachos',
    descripcion: 'Piso con película resbaladiza por fuga en bomba de gato hidráulico, generando alto riesgo de caída al mismo nivel y pérdida de adherencia en ruedas de transpaletas.',
    peligroGTC45: 'Seguridad - Locativo (Pisos, Caídas, Orden y aseo)',
    clasificacion: 'Condición Insegura',
    fecha: '2026-11-18',
    hora: '11:20 AM',
    sede: 'Sede Principal - Cazucá',
    areaLugar: 'Muelle de Carga 3',
    reportadoPor: 'Laura Gómez (Presidente COPASST)',
    estado: 'abierto',
    imagenAntes: generateSampleSvg('Derrame de Aceite en Muelle 3', '#eab308', 'hazard'),
    medidaCorrectiva: 'Aplicación de material absorbente biodegradable del kit de derrames, limpieza profunda y revisión mecánica del equipo.',
    responsableAccion: 'Líder de Aseo & Operaciones',
    fechaCompromiso: '2026-11-19',
  },
];

const INITIAL_ACTAS: Acta[] = [
  {
    id: 'acta-cop-01',
    consecutivo: 'ACTA-COP-2026-011',
    tipo: 'ordinaria_copasst',
    comite: 'COPASST',
    titulo: 'Reunión Ordinaria Mensual de COPASST - Noviembre 2026',
    fecha: '2026-11-15',
    horaInicio: '08:30 AM',
    horaFin: '10:30 AM',
    lugar: 'Sala de Juntas Principal & Enlace Virtual Teams',
    asistentes: [
      {
        nombre: 'Ing. Laura Marcela Gómez Pardo',
        cedula: '1.018.452.331',
        cargo: 'Coordinadora SST',
        rolEnComite: 'Presidente',
        representacion: 'Empleador',
        asistio: true,
      },
      {
        nombre: 'Ricardo Antonio Beltrán Peña',
        cedula: '79.845.120',
        cargo: 'Jefe Mantenimiento',
        rolEnComite: 'Vocal / Miembro',
        representacion: 'Empleador',
        asistio: true,
      },
      {
        nombre: 'Diana Milena Rincón Castro',
        cedula: '52.981.440',
        cargo: 'Supervisora Bodega',
        rolEnComite: 'Secretario',
        representacion: 'Trabajadores',
        asistio: true,
      },
      {
        nombre: 'Javier Orlando Pinzón Silva',
        cedula: '80.231.995',
        cargo: 'Operador Montacargas',
        rolEnComite: 'Vocal / Miembro',
        representacion: 'Trabajadores',
        asistio: true,
      },
    ],
    ordenDelDia: [
      '1. Verificación del quórum reglamentario y lectura del orden del día.',
      '2. Revisión de compromisos del acta anterior (ACTA-COP-2026-010).',
      '3. Análisis estadístico de accidentalidad e incidentes del mes de octubre.',
      '4. Resultados de la inspección de seguridad en Bodega 2 y taller (revisión de evidencias fotográficas).',
      '5. Seguimiento a recomendaciones de la ARL SURA.',
      '6. Asignación de nuevos compromisos y cierre.',
    ],
    desarrolloPuntos: [
      {
        punto: '1. Verificación del Quórum',
        desarrollo: 'Se verifica la asistencia del 100% de los miembros principales del COPASST por ambas partes. Se declara quórum legal deliberatorio y decisorio según Res. 2013/1986.',
      },
      {
        punto: '2. Revisión de Compromisos Anteriores',
        desarrollo: 'Se cumplió la recarga de los 14 extintores de CO2 del área administrativa. Queda pendiente la calibración de sonómetros para el estudio higiénico de ruido en bodega.',
      },
      {
        punto: '3. Estadística de Accidentalidad',
        desarrollo: 'Durante octubre se presentaron cero (0) accidentes de trabajo con tiempo perdido y dos (2) incidentes leves (atrapamiento menor de guante y tropiezo sin lesión). Se mantiene índice de severidad en cero.',
      },
      {
        punto: '4. Inspección de Seguridad y Evidencias',
        desarrollo: 'Se proyectan en pantalla las fotografías registradas en el sistema: 1) Obstrucción de extintor en bodega (subsanada exitosamente al día siguiente) y 2) Cableado expuesto en estación de baterías. Se decide priorizar su aislamiento eléctrico esta semana.',
      },
      {
        punto: '5. Recomendaciones ARL SURA',
        desarrollo: 'La ARL programó capacitación virtual sobre "Manipulación Segura de Cargas y Pausas Activas" para el 25 de noviembre.',
      },
    ],
    compromisos: [
      {
        id: 'c1',
        descripcion: 'Canalizar en tubería conduit metálica y reemplazar cableado de estación de baterías de montacargas.',
        responsable: 'Ricardo Beltrán (Mantenimiento)',
        fechaLimite: '2026-11-21',
        estado: 'en_proceso',
      },
      {
        id: 'c2',
        descripcion: 'Coordinar con ARL la asistencia de las cuadrillas de bodega a la capacitación ergonómica del 25-nov.',
        responsable: 'Diana Rincón (Secretaria)',
        fechaLimite: '2026-11-24',
        estado: 'pendiente',
      },
      {
        id: 'c3',
        descripcion: 'Realizar inspección preoperacional de transpaletas manuales y marcar equipos fuera de servicio.',
        responsable: 'Javier Pinzón',
        fechaLimite: '2026-11-28',
        estado: 'pendiente',
      },
    ],
    evidenciasIds: ['ev-01', 'ev-02'],
    firmasDigitales: [
      {
        nombre: 'Ing. Laura Marcela Gómez Pardo',
        cargo: 'Coordinadora SST',
        rol: 'Presidente COPASST',
        fechaFirma: '2026-11-15 10:45 AM',
      },
      {
        nombre: 'Diana Milena Rincón Castro',
        cargo: 'Supervisora Bodega',
        rol: 'Secretaria COPASST',
        fechaFirma: '2026-11-15 10:46 AM',
      },
    ],
    estado: 'aprobada',
    creadoPor: 'Diana Milena Rincón Castro',
    createdAt: '2026-11-15T10:50:00Z',
  },
  {
    id: 'acta-col-01',
    consecutivo: 'ACTA-COL-2026-003',
    tipo: 'ordinaria_cocolab',
    comite: 'COCOLAB',
    titulo: 'Reunión Ordinaria Trimestral de COCOLAB - Q3 2026',
    fecha: '2026-10-18',
    horaInicio: '02:00 PM',
    horaFin: '03:45 PM',
    lugar: 'Sala de Bienestar & Teleconferencia Privada',
    asistentes: [
      {
        nombre: 'Felipe Andrés Salamanca Ruiz',
        cedula: '1.022.341.552',
        cargo: 'Director Gestión Humana',
        rolEnComite: 'Presidente',
        representacion: 'Empleador',
        asistio: true,
      },
      {
        nombre: 'Claudia Patricia Hoyos Meza',
        cedula: '53.112.879',
        cargo: 'Coordinadora Nómina',
        rolEnComite: 'Vocal / Miembro',
        representacion: 'Empleador',
        asistio: true,
      },
      {
        nombre: 'Esteban Morales Cárdenas',
        cedula: '1.030.551.487',
        cargo: 'Líder Despachos',
        rolEnComite: 'Secretario',
        representacion: 'Trabajadores',
        asistio: true,
      },
      {
        nombre: 'Nathalia Sofía Vargas Peña',
        cedula: '1.014.223.901',
        cargo: 'Auxiliar Contable',
        rolEnComite: 'Vocal / Miembro',
        representacion: 'Trabajadores',
        asistio: true,
      },
    ],
    ordenDelDia: [
      '1. Verificación de quórum y reiteración del deber estricto de confidencialidad (Res. 652/2012).',
      '2. Balance trimestral de radicación y trámite de quejas en el sistema.',
      '3. Socialización del protocolo institucional de prevención de Acoso Sexual Laboral bajo la Ley 2365 de 2024.',
      '4. Plan de talleres de comunicación asertiva y resolución pacífica de conflictos.',
      '5. Conclusiones y cierre.',
    ],
    desarrolloPuntos: [
      {
        punto: '1. Quórum y Deber de Confidencialidad',
        desarrollo: 'Presentes todos los miembros. El Presidente recuerda el deber de reserva legal que cobija a las actuaciones y deliberaciones del comité.',
      },
      {
        punto: '2. Balance de Quejas',
        desarrollo: 'Durante el último trimestre se radicó un (1) caso tipificado como presunto trato interpersonal descortés / desentendimiento operativo. Tras la sesión de escucha y concertación bilateral, las partes firmaron acta de acuerdo amistoso con resultado satisfactorio y sin reincidencia.',
      },
      {
        punto: '3. Adopción Ley 2365 de 2024',
        desarrollo: 'Se aprueba remitir a Gerencia General la política actualizada de Cero Tolerancia al Acoso Sexual y Violencias Basadas en Género, junto con el flujograma de atención inmediata y canales anónimos de orientación.',
      },
    ],
    compromisos: [
      {
        id: 'col-c1',
        descripcion: 'Desplegar campaña digital por correo y cartelera física sobre la Ley 2365/2024 y canales de atención de COCOLAB.',
        responsable: 'Felipe Salamanca / Claudia Hoyos',
        fechaLimite: '2026-11-30',
        estado: 'en_proceso',
      },
      {
        id: 'col-c2',
        descripcion: 'Agendar taller lúdico presencial de inteligencia emocional con el apoyo de la caja de compensación Compensar.',
        responsable: 'Esteban Morales',
        fechaLimite: '2026-12-10',
        estado: 'pendiente',
      },
    ],
    evidenciasIds: [],
    firmasDigitales: [
      {
        nombre: 'Felipe Andrés Salamanca Ruiz',
        cargo: 'Director Gestión Humana',
        rol: 'Presidente COCOLAB',
        fechaFirma: '2026-10-18 03:50 PM',
      },
      {
        nombre: 'Esteban Morales Cárdenas',
        cargo: 'Líder Despachos',
        rol: 'Secretario COCOLAB',
        fechaFirma: '2026-10-18 03:52 PM',
      },
    ],
    estado: 'aprobada',
    creadoPor: 'Esteban Morales Cárdenas',
    createdAt: '2026-10-18T16:00:00Z',
  },
];

const INITIAL_QUEJAS: QuejaCocolab[] = [
  {
    id: 'q-01',
    radicado: 'QUEJA-COL-2026-001',
    fechaRadicacion: '2026-09-05',
    quejoso: {
      nombre: 'Marcela Castro Rodríguez',
      cedula: '1.026.448.120',
      cargo: 'Auxiliar de Inventarios',
      area: 'Logística',
      email: 'mcastro@empresa.com',
      telefono: '3134552099',
    },
    denunciado: {
      nombre: 'Gonzalo Silva P.',
      cargo: 'Coordinador de Despacho Nocturno',
      area: 'Operaciones',
    },
    tipologia: 'Maltrato laboral (Violencia física, verbal o moral)',
    hechosNarrados: 'Reiteradas llamadas de atención en tono elevado delante de terceros en el patio de maniobras, descalificando públicamente los informes de inventario sin justa causa.',
    pruebasAportadas: 'Copia de correos electrónicos y testimonios de dos compañeros de turno.',
    evidenciasAdjuntasIds: [],
    estado: 'cerrada_conciliada',
    acuerdosConvivencia: 'Ambas partes concertaron canales formales de retroalimentación en privado, con respeto y enfoque técnico. Seguimiento a 60 días sin incidentes.',
    fechaAudiencia: '2026-09-18',
    actasRelacionadasIds: ['acta-col-01'],
    esPrioritariaLey2365: false,
  },
];

const INITIAL_ELECCION: ProcesoEleccion = {
  id: 'elec-2026-01',
  periodo: '2026-2028',
  comite: 'COPASST',
  fechaConvocatoria: '2025-12-01',
  fechaVotacionInicio: '2026-01-10',
  fechaVotacionFin: '2026-01-12',
  estado: 'cerrada_escrutinio',
  candidatos: [
    {
      id: 'c-1',
      nombre: 'Diana Milena Rincón Castro',
      cedula: '52.981.440',
      cargo: 'Supervisora de Operaciones Bodega',
      area: 'Operaciones',
      comite: 'COPASST',
      numeroTarjeton: 1,
      votos: 28,
    },
    {
      id: 'c-2',
      nombre: 'Javier Orlando Pinzón Silva',
      cedula: '80.231.995',
      cargo: 'Operador de Montacargas',
      area: 'Logística',
      comite: 'COPASST',
      numeroTarjeton: 2,
      votos: 16,
    },
  ],
  designadosEmpleador: [
    {
      nombre: 'Ing. Laura Marcela Gómez Pardo',
      cedula: '1.018.452.331',
      cargo: 'Coordinadora SST',
      condicion: 'Principal',
    },
    {
      nombre: 'Ricardo Antonio Beltrán Peña',
      cedula: '79.845.120',
      cargo: 'Jefe de Mantenimiento',
      condicion: 'Suplente',
    },
  ],
  totalVotosEmitidos: 46,
  votosEnBlanco: 2,
  jurados: ['Andrea Carolina Torres (Nómina)', 'Santiago Ospina (Sistemas)'],
};

// Storage keys
const KEYS = {
  COMPANY: 'cocopasst_company_profile',
  MEMBERS: 'cocopasst_members',
  EVIDENCES: 'cocopasst_evidences',
  ACTAS: 'cocopasst_actas',
  QUEJAS: 'cocopasst_quejas',
  ELECCIONES: 'cocopasst_elecciones',
};

export const storage = {
  getCompany: (): CompanyProfile => {
    if (typeof window === 'undefined') return INITIAL_COMPANY;
    const val = localStorage.getItem(KEYS.COMPANY);
    return val ? JSON.parse(val) : INITIAL_COMPANY;
  },
  saveCompany: (data: CompanyProfile) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(KEYS.COMPANY, JSON.stringify(data));
      window.dispatchEvent(new Event('cocopasst_data_changed'));
    }
  },

  getMembers: (): Member[] => {
    if (typeof window === 'undefined') return INITIAL_MEMBERS;
    const val = localStorage.getItem(KEYS.MEMBERS);
    return val ? JSON.parse(val) : INITIAL_MEMBERS;
  },
  saveMembers: (data: Member[]) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(KEYS.MEMBERS, JSON.stringify(data));
      window.dispatchEvent(new Event('cocopasst_data_changed'));
    }
  },

  getEvidences: (): Evidence[] => {
    if (typeof window === 'undefined') return INITIAL_EVIDENCES;
    const val = localStorage.getItem(KEYS.EVIDENCES);
    return val ? JSON.parse(val) : INITIAL_EVIDENCES;
  },
  saveEvidences: (data: Evidence[]) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(KEYS.EVIDENCES, JSON.stringify(data));
      window.dispatchEvent(new Event('cocopasst_data_changed'));
    }
  },
  addEvidence: (evidence: Evidence) => {
    const list = storage.getEvidences();
    const updated = [evidence, ...list];
    storage.saveEvidences(updated);
    return updated;
  },
  updateEvidence: (id: string, updates: Partial<Evidence>) => {
    const list = storage.getEvidences();
    const updated = list.map(e => e.id === id ? { ...e, ...updates } : e);
    storage.saveEvidences(updated);
    return updated;
  },

  getActas: (): Acta[] => {
    if (typeof window === 'undefined') return INITIAL_ACTAS;
    const val = localStorage.getItem(KEYS.ACTAS);
    return val ? JSON.parse(val) : INITIAL_ACTAS;
  },
  saveActas: (data: Acta[]) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(KEYS.ACTAS, JSON.stringify(data));
      window.dispatchEvent(new Event('cocopasst_data_changed'));
    }
  },
  addActa: (acta: Acta) => {
    const list = storage.getActas();
    const updated = [acta, ...list];
    storage.saveActas(updated);
    return updated;
  },
  updateActa: (id: string, updates: Partial<Acta>) => {
    const list = storage.getActas();
    const updated = list.map(a => a.id === id ? { ...a, ...updates } : a);
    storage.saveActas(updated);
    return updated;
  },

  getQuejas: (): QuejaCocolab[] => {
    if (typeof window === 'undefined') return INITIAL_QUEJAS;
    const val = localStorage.getItem(KEYS.QUEJAS);
    return val ? JSON.parse(val) : INITIAL_QUEJAS;
  },
  saveQuejas: (data: QuejaCocolab[]) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(KEYS.QUEJAS, JSON.stringify(data));
      window.dispatchEvent(new Event('cocopasst_data_changed'));
    }
  },
  addQueja: (queja: QuejaCocolab) => {
    const list = storage.getQuejas();
    const updated = [queja, ...list];
    storage.saveQuejas(updated);
    return updated;
  },
  updateQueja: (id: string, updates: Partial<QuejaCocolab>) => {
    const list = storage.getQuejas();
    const updated = list.map(q => q.id === id ? { ...q, ...updates } : q);
    storage.saveQuejas(updated);
    return updated;
  },

  getEleccion: (): ProcesoEleccion => {
    if (typeof window === 'undefined') return INITIAL_ELECCION;
    const val = localStorage.getItem(KEYS.ELECCIONES);
    return val ? JSON.parse(val) : INITIAL_ELECCION;
  },
  saveEleccion: (data: ProcesoEleccion) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(KEYS.ELECCIONES, JSON.stringify(data));
      window.dispatchEvent(new Event('cocopasst_data_changed'));
    }
  },
};
