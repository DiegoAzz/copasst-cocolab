'use client';

import { CompanyProfile, Member, Evidence, Acta, QuejaCocolab, ProcesoEleccion, UserAccount, UserSession, Empleado } from '@/types';

export const DEMO_USERS: UserAccount[] = [
  {
    id: 'u-wendy',
    nombre: 'Wendy Angulo',
    email: 'wendy@empresa.co',
    password: '123',
    cedula: '1.028.456.789',
    cargo: 'Encargada de Recursos Humanos',
    area: 'Gestión Humana y Talento',
    rol: 'SUPER_ADMIN_RRHH',
    accesoCopasst: true,
    accesoCocolab: true,
    cargoEnComite: 'Validadora COPASST & COCOLAB',
    activo: true,
    createdAt: '2026-01-10T08:00:00Z',
  },
  {
    id: 'u-diego',
    nombre: 'Diego Zuñiga',
    email: 'diego@empresa.co',
    password: '123',
    cedula: '1.045.892.331',
    cargo: 'Dirección General & Líder SG-SST',
    area: 'Alta Dirección',
    rol: 'ADMIN_SST',
    accesoCopasst: true,
    accesoCocolab: true,
    cargoEnComite: 'Representante Legal / SST',
    activo: true,
    createdAt: '2026-01-10T08:00:00Z',
  },
  {
    id: 'u-copasst',
    nombre: 'Jaider Osorio Chico',
    email: 'jaider@empresa.co',
    password: '123',
    cedula: '1.018.452.331',
    cargo: 'Líder de Operaciones y Planta',
    area: 'Operaciones',
    rol: 'COPASST',
    accesoCopasst: true,
    accesoCocolab: false,
    cargoEnComite: 'Presidente COPASST',
    activo: true,
    createdAt: '2026-01-15T09:00:00Z',
  },
  {
    id: 'u-cocolab',
    nombre: 'Tomas Merlano Florez',
    email: 'tomas@empresa.co',
    password: '123',
    cedula: '1.022.341.552',
    cargo: 'Coordinador de Logística y Abastecimiento',
    area: 'Logística',
    rol: 'COCOLAB',
    accesoCopasst: false,
    accesoCocolab: true,
    cargoEnComite: 'Presidente COCOLAB',
    activo: true,
    createdAt: '2026-01-15T09:00:00Z',
  },
  {
    id: 'u-colaborador',
    nombre: 'Nelsy Palacio',
    email: 'nelsy@empresa.co',
    password: '123',
    cedula: '1.014.558.990',
    cargo: 'Servicio al Cliente y Cartera',
    area: 'Administración y Ventas',
    rol: 'COLABORADOR',
    accesoCopasst: false,
    accesoCocolab: false,
    activo: true,
    createdAt: '2026-02-01T10:00:00Z',
  },
];

export const INITIAL_EMPLEADOS: Empleado[] = [
  {
    id: 'emp-1',
    nombre: 'JAIDER OSORIO CHICO',
    cedula: '1.018.452.331',
    cargo: 'Líder de Operaciones y Planta',
    area: 'Operaciones',
    sede: 'Sede Principal - Planta Operativa',
    nivelRiesgo: 5,
    email: 'jaider@empresa.co',
    telefono: '310 458 9901',
    fechaIngreso: '2021-03-15',
    estado: 'activo',
    tieneAccesoSistema: true,
    comiteAsignado: 'COPASST',
  },
  {
    id: 'emp-2',
    nombre: 'TOMAS MERLANO FLOREZ',
    cedula: '1.022.341.552',
    cargo: 'Coordinador de Logística y Abastecimiento',
    area: 'Logística',
    sede: 'Sede Principal - Cazucá',
    nivelRiesgo: 1,
    email: 'tomas@empresa.co',
    telefono: '312 889 4402',
    fechaIngreso: '2022-01-10',
    estado: 'activo',
    tieneAccesoSistema: true,
    comiteAsignado: 'COCOLAB',
  },
  {
    id: 'emp-3',
    nombre: 'WENDY ANGULO',
    cedula: '1.028.456.789',
    cargo: 'Encargada de Recursos Humanos',
    area: 'Gestión Humana y Talento',
    sede: 'Sede Principal - Cazucá (Oficinas)',
    nivelRiesgo: 1,
    email: 'wendy@empresa.co',
    telefono: '310 458 9921',
    fechaIngreso: '2020-05-18',
    estado: 'activo',
    tieneAccesoSistema: true,
    comiteAsignado: 'AMBOS',
  },
  {
    id: 'emp-4',
    nombre: 'NELSY PALACIO',
    cedula: '1.014.558.990',
    cargo: 'Servicio al Cliente y Cartera',
    area: 'Administración y Ventas',
    sede: 'Sede Principal - Cazucá (Oficinas)',
    nivelRiesgo: 1,
    email: 'nelsy@empresa.co',
    telefono: '318 662 3304',
    fechaIngreso: '2023-08-20',
    estado: 'activo',
    tieneAccesoSistema: true,
    comiteAsignado: 'NINGUNO',
  },
  {
    id: 'emp-5',
    nombre: 'CESAR ANTONIO RIVERO LEIVA',
    cedula: '80.231.995',
    cargo: 'Técnico de Mantenimiento y Soldadura',
    area: 'Mantenimiento Industrial',
    sede: 'Planta de Operaciones - Taller',
    nivelRiesgo: 5,
    email: 'cesar@empresa.co',
    telefono: '301 554 8805',
    fechaIngreso: '2021-11-12',
    estado: 'activo',
    tieneAccesoSistema: true,
    comiteAsignado: 'COCOLAB',
  },
  {
    id: 'emp-6',
    nombre: 'CAROLINA MARIMON SIMARRA',
    cedula: '53.112.879',
    cargo: 'Coordinadora de Facturación y Compras',
    area: 'Administración y Finanzas',
    sede: 'Sede Principal - Cazucá (Oficinas)',
    nivelRiesgo: 1,
    email: 'carolina@empresa.co',
    telefono: '304 223 9906',
    fechaIngreso: '2022-04-01',
    estado: 'activo',
    tieneAccesoSistema: true,
    comiteAsignado: 'COPASST',
  },
  {
    id: 'emp-7',
    nombre: 'DIEGO ZUÑIGA',
    cedula: '1.045.892.331',
    cargo: 'Dirección General & Líder SG-SST',
    area: 'Alta Dirección',
    sede: 'Sede Principal - Cazucá (Oficinas y Planta)',
    nivelRiesgo: 1,
    email: 'diego@empresa.co',
    telefono: '316 445 6607',
    fechaIngreso: '2019-02-01',
    estado: 'activo',
    tieneAccesoSistema: true,
    comiteAsignado: 'AMBOS',
  },
  {
    id: 'emp-8',
    nombre: 'SAMUEL PEÑA',
    cedula: '1.030.551.487',
    cargo: 'Operador de Bodega y Montacargas',
    area: 'Logística y Almacén',
    sede: 'Centro de Distribución - Patio Operativo',
    nivelRiesgo: 5,
    email: 'samuel@empresa.co',
    telefono: '317 889 2208',
    fechaIngreso: '2022-09-10',
    estado: 'activo',
    tieneAccesoSistema: false,
    comiteAsignado: 'COPASST',
  },
  {
    id: 'emp-9',
    nombre: 'YENISSE PARDO ARIZA',
    cedula: '52.981.440',
    cargo: 'Asistente de Gestión Humana y Bienestar',
    area: 'Gestión Humana y Talento',
    sede: 'Sede Principal - Cazucá (Oficinas)',
    nivelRiesgo: 1,
    email: 'yenisse@empresa.co',
    telefono: '311 990 4409',
    fechaIngreso: '2023-06-15',
    estado: 'activo',
    tieneAccesoSistema: false,
    comiteAsignado: 'COCOLAB',
  },
  {
    id: 'emp-10',
    nombre: 'CARLOS OLIVERA GUZMAN',
    cedula: '79.845.120',
    cargo: 'Supervisor de Despachos y Transporte',
    area: 'Logística y Transporte',
    sede: 'Centro de Distribución - Patio Operativo',
    nivelRiesgo: 5,
    email: 'colivera@empresa.co',
    telefono: '319 778 5510',
    fechaIngreso: '2020-01-18',
    estado: 'activo',
    tieneAccesoSistema: false,
    comiteAsignado: 'COPASST',
  },
  {
    id: 'emp-11',
    nombre: 'STEVEN BOSIO LEAL',
    cedula: '1.020.448.910',
    cargo: 'Operario de Ensamble y Producción',
    area: 'Operaciones y Planta',
    sede: 'Planta de Operaciones',
    nivelRiesgo: 5,
    email: 'sbosio@empresa.co',
    telefono: '313 445 1111',
    fechaIngreso: '2023-07-22',
    estado: 'activo',
    tieneAccesoSistema: false,
    comiteAsignado: 'NINGUNO',
  },
  {
    id: 'emp-12',
    nombre: 'ANDRES DAVID PACHECO',
    cedula: '1.018.992.345',
    cargo: 'Técnico de Mantenimiento Electromecánico',
    area: 'Mantenimiento Industrial',
    sede: 'Planta de Operaciones - Taller',
    nivelRiesgo: 5,
    email: 'apacheco@empresa.co',
    telefono: '314 332 9912',
    fechaIngreso: '2022-10-05',
    estado: 'activo',
    tieneAccesoSistema: false,
    comiteAsignado: 'NINGUNO',
  },
  {
    id: 'emp-13',
    nombre: 'LEIDI DANIELA DE LA PUENTE GARCIA',
    cedula: '1.014.223.901',
    cargo: 'Auxiliar Administrativa y Documentación',
    area: 'Administración y Finanzas',
    sede: 'Sede Principal - Cazucá (Oficinas)',
    nivelRiesgo: 1,
    email: 'ldelapuente@empresa.co',
    telefono: '315 221 8813',
    fechaIngreso: '2024-01-15',
    estado: 'activo',
    tieneAccesoSistema: false,
    comiteAsignado: 'COCOLAB',
  },
  {
    id: 'emp-14',
    nombre: 'FABIAN VARGAS',
    cedula: '19.458.120',
    cargo: 'Conductor de Reparto y Logística',
    area: 'Logística y Transporte',
    sede: 'Centro de Distribución - Patio Operativo',
    nivelRiesgo: 5,
    email: 'fvargas@empresa.co',
    telefono: '316 998 7714',
    fechaIngreso: '2021-04-10',
    estado: 'activo',
    tieneAccesoSistema: false,
    comiteAsignado: 'COPASST',
  },
  {
    id: 'emp-15',
    nombre: 'CLAUDIA BETANCOURT ALVAREZ',
    cedula: '52.441.980',
    cargo: 'Contadora General',
    area: 'Administración y Finanzas',
    sede: 'Sede Principal - Cazucá (Oficinas)',
    nivelRiesgo: 1,
    email: 'cbetancourt@empresa.co',
    telefono: '311 445 6615',
    fechaIngreso: '2020-03-20',
    estado: 'activo',
    tieneAccesoSistema: false,
    comiteAsignado: 'COCOLAB',
  },
  {
    id: 'emp-16',
    nombre: 'ANDRES RAMOS',
    cedula: '1.019.882.440',
    cargo: 'Operario de Almacén y Control de Inventarios',
    area: 'Logística y Bodega',
    sede: 'Centro de Distribución - Patio Operativo',
    nivelRiesgo: 5,
    email: 'aramos@empresa.co',
    telefono: '318 334 1116',
    fechaIngreso: '2023-02-18',
    estado: 'activo',
    tieneAccesoSistema: false,
    comiteAsignado: 'NINGUNO',
  },
  {
    id: 'emp-17',
    nombre: 'LUIS FERNANDO MONTES CHAMORRO',
    cedula: '1.017.554.120',
    cargo: 'Operario de Ensamble y Empaque',
    area: 'Operaciones y Planta',
    sede: 'Planta de Operaciones',
    nivelRiesgo: 5,
    email: 'lmontes@empresa.co',
    telefono: '310 998 4417',
    fechaIngreso: '2022-08-01',
    estado: 'activo',
    tieneAccesoSistema: false,
    comiteAsignado: 'NINGUNO',
  },
  {
    id: 'emp-18',
    nombre: 'EDDIE ACOSTA BARROS',
    cedula: '72.334.890',
    cargo: 'Supervisor de Planta y Seguridad Operativa',
    area: 'Operaciones',
    sede: 'Planta de Operaciones',
    nivelRiesgo: 5,
    email: 'eacosta@empresa.co',
    telefono: '314 556 2218',
    fechaIngreso: '2019-11-05',
    estado: 'activo',
    tieneAccesoSistema: false,
    comiteAsignado: 'COPASST',
  },
  {
    id: 'emp-19',
    nombre: 'RONALD MOLINA LOZANO',
    cedula: '1.023.771.200',
    cargo: 'Técnico Electricista Industrial',
    area: 'Mantenimiento Industrial',
    sede: 'Planta de Operaciones - Taller',
    nivelRiesgo: 5,
    email: 'rmolina@empresa.co',
    telefono: '312 443 8819',
    fechaIngreso: '2021-09-15',
    estado: 'activo',
    tieneAccesoSistema: false,
    comiteAsignado: 'NINGUNO',
  },
  {
    id: 'emp-20',
    nombre: 'YANELIS VANESSA MARTINEZ CERDA',
    cedula: '1.015.667.890',
    cargo: 'Recepcionista y Auxiliar de Compras',
    area: 'Administración',
    sede: 'Sede Principal - Cazucá (Oficinas)',
    nivelRiesgo: 1,
    email: 'ymartinez@empresa.co',
    telefono: '315 778 2220',
    fechaIngreso: '2023-11-01',
    estado: 'activo',
    tieneAccesoSistema: false,
    comiteAsignado: 'NINGUNO',
  },
  {
    id: 'emp-21',
    nombre: 'GUSTAVO ANTONIO MUÑOZ BECERRA',
    cedula: '79.445.890',
    cargo: 'Operador de Montacargas y Patio',
    area: 'Logística y Bodega',
    sede: 'Centro de Distribución - Patio Operativo',
    nivelRiesgo: 5,
    email: 'gmunoz@empresa.co',
    telefono: '300 445 9921',
    fechaIngreso: '2020-07-12',
    estado: 'activo',
    tieneAccesoSistema: false,
    comiteAsignado: 'NINGUNO',
  },
  {
    id: 'emp-22',
    nombre: 'ELKIN DIAZ',
    cedula: '1.018.334.567',
    cargo: 'Operario de Cargue y Descargue',
    area: 'Operaciones',
    sede: 'Centro de Distribución - Patio Operativo',
    nivelRiesgo: 5,
    email: 'ediaz@empresa.co',
    telefono: '316 223 8822',
    fechaIngreso: '2022-05-20',
    estado: 'activo',
    tieneAccesoSistema: false,
    comiteAsignado: 'NINGUNO',
  },
  {
    id: 'emp-23',
    nombre: 'ROBERT ANDRES GULLOSO GULLOSO',
    cedula: '1.024.556.789',
    cargo: 'Operario de Producción y Acabados',
    area: 'Operaciones y Planta',
    sede: 'Planta de Operaciones',
    nivelRiesgo: 5,
    email: 'rgulloso@empresa.co',
    telefono: '317 990 4423',
    fechaIngreso: '2023-03-10',
    estado: 'activo',
    tieneAccesoSistema: false,
    comiteAsignado: 'NINGUNO',
  },
  {
    id: 'emp-24',
    nombre: 'MIKE DAVID ARROYO HERRERA',
    cedula: '1.026.889.001',
    cargo: 'Control y Seguridad de Instalaciones',
    area: 'Seguridad y Salud (SST)',
    sede: 'Sede Principal - Cazucá',
    nivelRiesgo: 1,
    email: 'marroyo@empresa.co',
    telefono: '313 778 1124',
    fechaIngreso: '2022-12-01',
    estado: 'activo',
    tieneAccesoSistema: false,
    comiteAsignado: 'NINGUNO',
  },
  {
    id: 'emp-25',
    nombre: 'LUZ DARI CRESPO GOMEZ',
    cedula: '52.778.441',
    cargo: 'Servicios Generales y Saneamiento',
    area: 'Servicios Generales',
    sede: 'Sede Principal - Cazucá (Oficinas)',
    nivelRiesgo: 1,
    email: 'lcrespo@empresa.co',
    telefono: '311 223 7725',
    fechaIngreso: '2021-06-15',
    estado: 'activo',
    tieneAccesoSistema: false,
    comiteAsignado: 'NINGUNO',
  },
  {
    id: 'emp-26',
    nombre: 'DYLAN SANTIAGO RICO GONZALEZ',
    cedula: '1.032.445.678',
    cargo: 'Auxiliar de Despachos y Logística',
    area: 'Logística y Transporte',
    sede: 'Centro de Distribución - Patio Operativo',
    nivelRiesgo: 5,
    email: 'drico@empresa.co',
    telefono: '319 887 3326',
    fechaIngreso: '2024-03-01',
    estado: 'activo',
    tieneAccesoSistema: false,
    comiteAsignado: 'NINGUNO',
  },
];

const INITIAL_COMPANY: CompanyProfile = {
  razonSocial: 'Logística & Soluciones Industriales Andina S.A.S.',
  nit: '901.458.789-2',
  actividadEconomica: 'Transporte de carga, almacenamiento y logística integral',
  codigoCIIU: '4923 / 5210',
  arl: 'Seguros Bolívar / ARL SURA',
  nivelRiesgo: 5,
  nivelesRiesgo: [1, 5],
  totalTrabajadores: 26,
  sedePrincipal: 'Sede Principal - Cazucá',
  direccion: 'Calle 17 # 68D - 45',
  ciudad: 'Bogotá D.C., Colombia',
  representanteLegal: 'Diego Zuñiga',
  responsableSST: 'Diego Zuñiga & Wendy Angulo',
  licenciaSST: 'Resolución SDS-34821 de 2021',
  vigenciaComitesDesde: '2026-01-15',
  vigenciaComitesHasta: '2028-01-14',
};

const INITIAL_MEMBERS: Member[] = [
  // COPASST
  {
    id: 'm1',
    nombre: 'JAIDER OSORIO CHICO',
    cedula: '1.018.452.331',
    cargo: 'Líder de Operaciones y Planta',
    comite: 'COPASST',
    representacion: 'Trabajadores',
    rol: 'Presidente',
    condicion: 'Principal',
    telefono: '3104589901',
    email: 'jaider@empresa.co',
    fechaPosesion: '2026-01-15',
  },
  {
    id: 'm2',
    nombre: 'CAROLINA MARIMON SIMARRA',
    cedula: '53.112.879',
    cargo: 'Coordinadora de Facturación y Compras',
    comite: 'COPASST',
    representacion: 'Empleador',
    rol: 'Secretario',
    condicion: 'Principal',
    telefono: '3042239906',
    email: 'carolina@empresa.co',
    fechaPosesion: '2026-01-15',
  },
  {
    id: 'm3',
    nombre: 'SAMUEL PEÑA',
    cedula: '1.030.551.487',
    cargo: 'Operador de Bodega y Montacargas',
    comite: 'COPASST',
    representacion: 'Trabajadores',
    rol: 'Vocal / Miembro',
    condicion: 'Suplente',
    telefono: '3178892208',
    email: 'samuel@empresa.co',
    fechaPosesion: '2026-01-15',
  },
  {
    id: 'm4',
    nombre: 'EDDIE ACOSTA BARROS',
    cedula: '72.334.890',
    cargo: 'Supervisor de Planta y Seguridad Operativa',
    comite: 'COPASST',
    representacion: 'Empleador',
    rol: 'Vocal / Miembro',
    condicion: 'Suplente',
    telefono: '3145562218',
    email: 'eacosta@empresa.co',
    fechaPosesion: '2026-01-15',
  },
  // COCOLAB
  {
    id: 'm5',
    nombre: 'TOMAS MERLANO FLOREZ',
    cedula: '1.022.341.552',
    cargo: 'Coordinador de Logística y Abastecimiento',
    comite: 'COCOLAB',
    representacion: 'Empleador',
    rol: 'Presidente',
    condicion: 'Principal',
    telefono: '3128894402',
    email: 'tomas@empresa.co',
    fechaPosesion: '2026-01-15',
  },
  {
    id: 'm6',
    nombre: 'CESAR ANTONIO RIVERO LEIVA',
    cedula: '80.231.995',
    cargo: 'Técnico de Mantenimiento y Soldadura',
    comite: 'COCOLAB',
    representacion: 'Trabajadores',
    rol: 'Secretario',
    condicion: 'Principal',
    telefono: '3015548805',
    email: 'cesar@empresa.co',
    fechaPosesion: '2026-01-15',
  },
  {
    id: 'm7',
    nombre: 'WENDY ANGULO',
    cedula: '1.028.456.789',
    cargo: 'Encargada de Recursos Humanos',
    comite: 'COCOLAB',
    representacion: 'Empleador',
    rol: 'Vocal / Miembro',
    condicion: 'Suplente',
    telefono: '3104589921',
    email: 'wendy@empresa.co',
    fechaPosesion: '2026-01-15',
  },
  {
    id: 'm8',
    nombre: 'CLAUDIA BETANCOURT ALVAREZ',
    cedula: '52.441.980',
    cargo: 'Contadora General',
    comite: 'COCOLAB',
    representacion: 'Trabajadores',
    rol: 'Vocal / Miembro',
    condicion: 'Suplente',
    telefono: '3114456615',
    email: 'cbetancourt@empresa.co',
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

export const formatRiesgos = (company: CompanyProfile): string => {
  const riesgos = company.nivelesRiesgo && company.nivelesRiesgo.length > 0 
    ? company.nivelesRiesgo 
    : [company.nivelRiesgo || 1];
  
  const romanos: Record<number, string> = { 1: 'I', 2: 'II', 3: 'III', 4: 'IV', 5: 'V' };
  const uniqueRiesgos = riesgos.filter((item, index) => riesgos.indexOf(item) === index);
  const sorted = uniqueRiesgos.sort((a, b) => a - b);
  return sorted.map(r => romanos[r] || String(r)).join(' y ');
};

export const storage = {
  getCompany: (): CompanyProfile => {
    if (typeof window === 'undefined') return INITIAL_COMPANY;
    const val = localStorage.getItem(KEYS.COMPANY);
    if (!val) {
      localStorage.setItem(KEYS.COMPANY, JSON.stringify(INITIAL_COMPANY));
      return INITIAL_COMPANY;
    }
    try {
      const parsed = JSON.parse(val);
      if (!parsed.nivelesRiesgo || !Array.isArray(parsed.nivelesRiesgo) || parsed.nivelesRiesgo.length === 0) {
        parsed.nivelesRiesgo = [1, 5];
      }
      if (parsed.totalTrabajadores !== 26 && !parsed.representanteLegal?.includes('Diego')) {
        parsed.totalTrabajadores = 26;
        parsed.representanteLegal = 'Diego Zuñiga';
        localStorage.setItem(KEYS.COMPANY, JSON.stringify(parsed));
      }
      return parsed;
    } catch {
      return INITIAL_COMPANY;
    }
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
    if (!val) {
      localStorage.setItem(KEYS.MEMBERS, JSON.stringify(INITIAL_MEMBERS));
      return INITIAL_MEMBERS;
    }
    try {
      const parsed = JSON.parse(val);
      if (!parsed.some((m: Member) => m.nombre.toUpperCase().includes('JAIDER'))) {
        localStorage.setItem(KEYS.MEMBERS, JSON.stringify(INITIAL_MEMBERS));
        return INITIAL_MEMBERS;
      }
      return parsed;
    } catch {
      return INITIAL_MEMBERS;
    }
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

  getUsers: (): UserAccount[] => {
    if (typeof window === 'undefined') return DEMO_USERS;
    const val = localStorage.getItem('cocopasst_users');
    if (!val) {
      localStorage.setItem('cocopasst_users', JSON.stringify(DEMO_USERS));
      return DEMO_USERS;
    }
    try {
      const parsed = JSON.parse(val);
      if (!parsed.some((u: UserAccount) => u.email === 'diego@empresa.co')) {
        localStorage.setItem('cocopasst_users', JSON.stringify(DEMO_USERS));
        return DEMO_USERS;
      }
      return parsed;
    } catch {
      return DEMO_USERS;
    }
  },
  saveUsers: (data: UserAccount[]) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cocopasst_users', JSON.stringify(data));
      window.dispatchEvent(new Event('cocopasst_users_changed'));
    }
  },
  addUser: (user: UserAccount) => {
    const list = storage.getUsers();
    const updated = [user, ...list];
    storage.saveUsers(updated);
    return updated;
  },
  updateUser: (id: string, updates: Partial<UserAccount>) => {
    const list = storage.getUsers();
    const updated = list.map(u => u.id === id ? { ...u, ...updates } : u);
    storage.saveUsers(updated);
    return updated;
  },
  deleteUser: (id: string) => {
    const list = storage.getUsers();
    const updated = list.filter(u => u.id !== id);
    storage.saveUsers(updated);
    return updated;
  },

  getEmpleados: (): Empleado[] => {
    if (typeof window === 'undefined') return INITIAL_EMPLEADOS;
    const val = localStorage.getItem('cocopasst_empleados');
    if (!val) {
      localStorage.setItem('cocopasst_empleados', JSON.stringify(INITIAL_EMPLEADOS));
      return INITIAL_EMPLEADOS;
    }
    try {
      const parsed = JSON.parse(val);
      if (parsed.length !== INITIAL_EMPLEADOS.length || !parsed.some((e: Empleado) => e.nombre.toUpperCase().includes('JAIDER'))) {
        localStorage.setItem('cocopasst_empleados', JSON.stringify(INITIAL_EMPLEADOS));
        return INITIAL_EMPLEADOS;
      }
      return parsed;
    } catch {
      return INITIAL_EMPLEADOS;
    }
  },
  saveEmpleados: (data: Empleado[]) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cocopasst_empleados', JSON.stringify(data));
      window.dispatchEvent(new Event('cocopasst_empleados_changed'));
    }
  },
  addEmpleado: (emp: Empleado) => {
    const list = storage.getEmpleados();
    const updated = [emp, ...list];
    storage.saveEmpleados(updated);
    return updated;
  },
  updateEmpleado: (id: string, updates: Partial<Empleado>) => {
    const list = storage.getEmpleados();
    const updated = list.map(e => e.id === id ? { ...e, ...updates } : e);
    storage.saveEmpleados(updated);
    return updated;
  },
  deleteEmpleado: (id: string) => {
    const list = storage.getEmpleados();
    const updated = list.filter(e => e.id !== id);
    storage.saveEmpleados(updated);
    return updated;
  },

  getSession: (): UserSession | null => {
    if (typeof window === 'undefined') return null;
    const val = localStorage.getItem('cocopasst_session');
    return val ? JSON.parse(val) : null;
  },
  setSession: (user: UserSession | null) => {
    if (typeof window !== 'undefined') {
      if (user) {
        localStorage.setItem('cocopasst_session', JSON.stringify(user));
      } else {
        localStorage.removeItem('cocopasst_session');
      }
      window.dispatchEvent(new Event('cocopasst_session_changed'));
    }
  },
};
