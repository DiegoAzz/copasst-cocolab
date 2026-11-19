'use client';

import { CompanyProfile, Member, Evidence, Acta, QuejaCocolab, ProcesoEleccion, UserAccount, UserSession, Empleado } from '@/types';

export const DEMO_USERS: UserAccount[] = [
  {
    id: 'u-wendy',
    nombre: 'ANGULO WENDY VANESA',
    email: 'rrhhsysnet@gmail.com',
    password: '123',
    cedula: '1143415065',
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
    nombre: 'ZUNIGA PLAZAS DIEGO ALEJANDRO',
    email: 'diego.zuniga.plazas@gmail.com',
    password: '123',
    cedula: '9147199',
    cargo: 'Director General & Líder SG-SST',
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
    nombre: 'OSORIO CHICO JAIDER LINCOLN',
    email: 'gerencia@sysnet.com.co',
    password: '123',
    cedula: '1143342664',
    cargo: 'Gerente de Operaciones y Planta',
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
    nombre: 'MERLANO FLOREZ TOMAS ENRIQUE',
    email: 'tmerlano@hotmail.com',
    password: '123',
    cedula: '9284360',
    cargo: 'Coordinador Comercial y Logística',
    area: 'Comercial y Logística',
    rol: 'COCOLAB',
    accesoCopasst: false,
    accesoCocolab: true,
    cargoEnComite: 'Presidente COCOLAB',
    activo: true,
    createdAt: '2026-01-15T09:00:00Z',
  },
  {
    id: 'u-colaborador',
    nombre: 'NELSY PALACIO PARDO',
    email: 'nelsypalacio2@gmail.com',
    password: '123',
    cedula: '45496412',
    cargo: 'Asistente de Servicio al Cliente y PQR',
    area: 'Servicio al Cliente',
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
    nombre: 'ACOSTA BARROS EDDIE JHOHANER',
    tipoDocumento: 'CC',
    cedula: '84083810',
    fechaExpedicion: '20/02/1996',
    eps: 'SANITAS',
    cargo: 'Técnico de Soporte e Infraestructura',
    area: 'Soporte y Redes',
    sede: 'Sede Principal SYSNET',
    nivelRiesgo: 5,
    email: 'soporte10@sysnet.com.co',
    telefono: '310 458 9901',
    fechaIngreso: '2019-11-05',
    estado: 'activo',
    tieneAccesoSistema: true,
    comiteAsignado: 'COPASST',
  },
  {
    id: 'emp-2',
    nombre: 'ANGULO WENDY VANESA',
    tipoDocumento: 'CC',
    cedula: '1143415065',
    fechaExpedicion: '17/10/2017',
    eps: 'SALUD TOTAL',
    cargo: 'Encargada de Recursos Humanos',
    area: 'Gestión Humana y Talento',
    sede: 'Sede Principal SYSNET (Oficinas)',
    nivelRiesgo: 1,
    email: 'rrhhsysnet@gmail.com',
    telefono: '310 458 9921',
    fechaIngreso: '2020-05-18',
    estado: 'activo',
    tieneAccesoSistema: true,
    comiteAsignado: 'AMBOS',
  },
  {
    id: 'emp-3',
    nombre: 'BETANCOURT ALVAREZ CLAUDIA ROXANA',
    tipoDocumento: 'CC',
    cedula: '1042422007',
    fechaExpedicion: '8/06/2005',
    eps: 'SANITAS',
    cargo: 'Contadora General y Facturación',
    area: 'Administración y Finanzas',
    sede: 'Sede Principal SYSNET (Oficinas)',
    nivelRiesgo: 1,
    email: 'soporte16@sysnet.com.co',
    telefono: '311 445 6615',
    fechaIngreso: '2020-03-20',
    estado: 'activo',
    tieneAccesoSistema: false,
    comiteAsignado: 'COCOLAB',
  },
  {
    id: 'emp-4',
    nombre: 'BOSSIO LEAL STEVEN',
    tipoDocumento: 'CC',
    cedula: '1042577636',
    fechaExpedicion: '11/08/2022',
    eps: 'EPS MUTUAL SER',
    cargo: 'Técnico Instalador de Redes',
    area: 'Operaciones y Planta Externa',
    sede: 'Sede Operativa SYSNET',
    nivelRiesgo: 5,
    email: 'sbossio.sysnet@gmail.com',
    telefono: '313 445 1111',
    fechaIngreso: '2022-08-15',
    estado: 'activo',
    tieneAccesoSistema: false,
    comiteAsignado: 'NINGUNO',
  },
  {
    id: 'emp-5',
    nombre: 'DE LA PUENTE GARCIA LEIDI DANIELA',
    tipoDocumento: 'CC',
    cedula: '1047380215',
    fechaExpedicion: '15/05/2023',
    eps: 'COOSALUD',
    cargo: 'Auxiliar Administrativa y Documentación',
    area: 'Administración y Finanzas',
    sede: 'Sede Principal SYSNET (Oficinas)',
    nivelRiesgo: 1,
    email: 'leididelapuente3@gmail.com',
    telefono: '315 221 8813',
    fechaIngreso: '2023-05-20',
    estado: 'activo',
    tieneAccesoSistema: false,
    comiteAsignado: 'NINGUNO',
  },
  {
    id: 'emp-6',
    nombre: 'DIAZ VITOLA ELKIN MARIO',
    tipoDocumento: 'CC',
    cedula: '1047447746',
    fechaExpedicion: '7/07/2010',
    eps: 'EPS SURA',
    cargo: 'Técnico de Conectividad y Fibra Óptica',
    area: 'Operaciones y Redes',
    sede: 'Sede Operativa SYSNET',
    nivelRiesgo: 5,
    email: 'kinel-21@hotmail.com',
    telefono: '316 223 8822',
    fechaIngreso: '2021-02-10',
    estado: 'activo',
    tieneAccesoSistema: false,
    comiteAsignado: 'NINGUNO',
  },
  {
    id: 'emp-7',
    nombre: 'MARTINEZ CERDA YANELIS VANESSA',
    tipoDocumento: 'CC',
    cedula: '1235038842',
    fechaExpedicion: '11/12/2015',
    eps: 'NUEVA EPS',
    cargo: 'Recepcionista y Atención al Cliente',
    area: 'Administración y Servicio al Cliente',
    sede: 'Sede Principal SYSNET',
    nivelRiesgo: 1,
    email: 'ymartinez.sysnet@gmail.com',
    telefono: '315 778 2220',
    fechaIngreso: '2022-03-01',
    estado: 'activo',
    tieneAccesoSistema: false,
    comiteAsignado: 'NINGUNO',
  },
  {
    id: 'emp-8',
    nombre: 'MERLANO FLOREZ TOMAS ENRIQUE',
    tipoDocumento: 'CC',
    cedula: '9284360',
    fechaExpedicion: '16/03/1981',
    eps: 'SANITAS',
    cargo: 'Coordinador Comercial y Logística',
    area: 'Comercial y Logística',
    sede: 'Sede Principal SYSNET',
    nivelRiesgo: 1,
    email: 'tmerlano@hotmail.com',
    telefono: '312 889 4402',
    fechaIngreso: '2020-01-15',
    estado: 'activo',
    tieneAccesoSistema: true,
    comiteAsignado: 'COCOLAB',
  },
  {
    id: 'emp-9',
    nombre: 'MOLINA LOZANO RONALD',
    tipoDocumento: 'CC',
    cedula: '1047364726',
    fechaExpedicion: '27/11/2003',
    eps: 'SANITAS',
    cargo: 'Técnico de Soporte Nivel 2 y Redes',
    area: 'Soporte Técnico y Mantenimiento',
    sede: 'Sede Operativa SYSNET',
    nivelRiesgo: 5,
    email: 'soporte5@sysnet.com.co',
    telefono: '312 443 8819',
    fechaIngreso: '2021-09-15',
    estado: 'activo',
    tieneAccesoSistema: false,
    comiteAsignado: 'NINGUNO',
  },
  {
    id: 'emp-10',
    nombre: 'NELSY PALACIO PARDO',
    tipoDocumento: 'CC',
    cedula: '45496412',
    fechaExpedicion: '29/08/1983',
    eps: 'SALUD TOTAL',
    cargo: 'Asistente de Servicio al Cliente y PQR',
    area: 'Servicio al Cliente',
    sede: 'Sede Principal SYSNET',
    nivelRiesgo: 1,
    email: 'nelsypalacio2@gmail.com',
    telefono: '318 662 3304',
    fechaIngreso: '2021-06-01',
    estado: 'activo',
    tieneAccesoSistema: true,
    comiteAsignado: 'NINGUNO',
  },
  {
    id: 'emp-11',
    nombre: 'OLIVERA GUZMAN CARLOS DAVID',
    tipoDocumento: 'CC',
    cedula: '1043640671',
    fechaExpedicion: '6/12/2022',
    eps: 'SALUD TOTAL',
    cargo: 'Supervisor Técnico de Redes y Despachos',
    area: 'Operaciones y Redes',
    sede: 'Sede Operativa SYSNET',
    nivelRiesgo: 5,
    email: 'carlosdavidoliverag@gmail.com',
    telefono: '319 778 5510',
    fechaIngreso: '2022-12-10',
    estado: 'activo',
    tieneAccesoSistema: false,
    comiteAsignado: 'NINGUNO',
  },
  {
    id: 'emp-12',
    nombre: 'OSORIO CHICO JAIDER LINCOLN',
    tipoDocumento: 'CC',
    cedula: '1143342664',
    fechaExpedicion: '29/05/2008',
    eps: 'SANITAS',
    cargo: 'Gerente de Operaciones y Planta',
    area: 'Operaciones',
    sede: 'Sede Principal SYSNET',
    nivelRiesgo: 5,
    email: 'gerencia@sysnet.com.co',
    telefono: '310 458 9901',
    fechaIngreso: '2018-06-01',
    estado: 'activo',
    tieneAccesoSistema: true,
    comiteAsignado: 'COPASST',
  },
  {
    id: 'emp-13',
    nombre: 'PACHECO CUADRO ANDRES DAVID',
    tipoDocumento: 'CC',
    cedula: '1043637062',
    fechaExpedicion: '27/10/2022',
    eps: 'EPS MUTUAL SER',
    cargo: 'Técnico Electromecánico y de Redes',
    area: 'Mantenimiento e Infraestructura',
    sede: 'Sede Operativa SYSNET',
    nivelRiesgo: 5,
    email: 'andresdavidpachecocuadro@gmail.com',
    telefono: '314 332 9912',
    fechaIngreso: '2022-11-01',
    estado: 'activo',
    tieneAccesoSistema: false,
    comiteAsignado: 'NINGUNO',
  },
  {
    id: 'emp-14',
    nombre: 'PARDO ARIZA YENISSE',
    tipoDocumento: 'CC',
    cedula: '1143370660',
    fechaExpedicion: '23/01/2012',
    eps: 'EPS MUTUAL SER',
    cargo: 'Asistente de Talento Humano y Bienestar',
    area: 'Gestión Humana y Talento',
    sede: 'Sede Principal SYSNET',
    nivelRiesgo: 1,
    email: 'ypardo.sysnet@gmail.com',
    telefono: '311 990 4409',
    fechaIngreso: '2022-02-15',
    estado: 'activo',
    tieneAccesoSistema: false,
    comiteAsignado: 'NINGUNO',
  },
  {
    id: 'emp-15',
    nombre: 'PEÑA NAVARRO SAMUEL ANTONIO',
    tipoDocumento: 'CC',
    cedula: '8641302',
    fechaExpedicion: '25/08/1993',
    eps: 'EPS SURA',
    cargo: 'Técnico de Mantenimiento y Alturas',
    area: 'Operaciones y Mantenimiento',
    sede: 'Sede Operativa SYSNET',
    nivelRiesgo: 5,
    email: 'spena@sysnet.com.co',
    telefono: '317 889 2208',
    fechaIngreso: '2019-09-01',
    estado: 'activo',
    tieneAccesoSistema: false,
    comiteAsignado: 'COPASST',
  },
  {
    id: 'emp-16',
    nombre: 'RIVERO LEIVA CESAR ANTONIO',
    tipoDocumento: 'CC',
    cedula: '16831081',
    fechaExpedicion: '26/04/1991',
    eps: 'SANITAS',
    cargo: 'Coordinador Técnico de Infraestructura',
    area: 'Mantenimiento e Infraestructura',
    sede: 'Sede Operativa SYSNET',
    nivelRiesgo: 5,
    email: 'crivero@sysnet.com.co',
    telefono: '301 554 8805',
    fechaIngreso: '2018-04-15',
    estado: 'activo',
    tieneAccesoSistema: true,
    comiteAsignado: 'COCOLAB',
  },
  {
    id: 'emp-17',
    nombre: 'VARGAS MACIAS FABIAN EDUARDO',
    tipoDocumento: 'CC',
    cedula: '1143379621',
    fechaExpedicion: '18/01/2013',
    eps: 'SANITAS',
    cargo: 'Técnico de Enlaces y Conectividad',
    area: 'Operaciones y Redes',
    sede: 'Sede Operativa SYSNET',
    nivelRiesgo: 5,
    email: 'fabian_evm@live.com',
    telefono: '316 998 7714',
    fechaIngreso: '2021-04-10',
    estado: 'activo',
    tieneAccesoSistema: false,
    comiteAsignado: 'NINGUNO',
  },
  {
    id: 'emp-18',
    nombre: 'ZUNIGA PLAZAS DIEGO ALEJANDRO',
    tipoDocumento: 'CC',
    cedula: '9147199',
    fechaExpedicion: '29/01/1999',
    eps: 'EPS SURA',
    cargo: 'Director General & Líder SG-SST',
    area: 'Alta Dirección',
    sede: 'Sede Principal SYSNET',
    nivelRiesgo: 1,
    email: 'diego.zuniga.plazas@gmail.com',
    telefono: '316 445 6607',
    fechaIngreso: '2017-01-10',
    estado: 'activo',
    tieneAccesoSistema: true,
    comiteAsignado: 'AMBOS',
  },
  {
    id: 'emp-19',
    nombre: 'RAMOS NAJERA ANDRES FELIPE',
    tipoDocumento: 'CC',
    cedula: '1043642227',
    fechaExpedicion: '13/12/2023',
    eps: 'SALUD TOTAL',
    cargo: 'Técnico de Instalaciones y Enlaces',
    area: 'Operaciones y Redes',
    sede: 'Sede Operativa SYSNET',
    nivelRiesgo: 5,
    email: 'aramos.sysnet@gmail.com',
    telefono: '318 334 1116',
    fechaIngreso: '2023-12-15',
    estado: 'activo',
    tieneAccesoSistema: false,
    comiteAsignado: 'NINGUNO',
  },
  {
    id: 'emp-20',
    nombre: 'MARIMON SIMARRA CAROLINA',
    tipoDocumento: 'CC',
    cedula: '1001833348',
    fechaExpedicion: '21/05/2019',
    eps: 'SALUD TOTAL',
    cargo: 'Coordinadora de Facturación y Compras',
    area: 'Administración y Finanzas',
    sede: 'Sede Principal SYSNET (Oficinas)',
    nivelRiesgo: 1,
    email: 'cmarimon.sysnet@gmail.com',
    telefono: '304 223 9906',
    fechaIngreso: '2020-06-01',
    estado: 'activo',
    tieneAccesoSistema: true,
    comiteAsignado: 'COPASST',
  },
  {
    id: 'emp-21',
    nombre: 'MUÑOZ BECERRA GUSTAVO ANTONIO',
    tipoDocumento: 'CC',
    cedula: '1148701475',
    fechaExpedicion: '9/05/2014',
    eps: 'FAMISANAR',
    cargo: 'Técnico de Infraestructura y Planta Externa',
    area: 'Operaciones y Mantenimiento',
    sede: 'Sede Operativa SYSNET',
    nivelRiesgo: 5,
    email: 'gmunoz.sysnet@gmail.com',
    telefono: '300 445 9921',
    fechaIngreso: '2021-07-01',
    estado: 'activo',
    tieneAccesoSistema: false,
    comiteAsignado: 'NINGUNO',
  },
  {
    id: 'emp-22',
    nombre: 'LUIS MONTES CHAMORRO',
    tipoDocumento: 'CC',
    cedula: '1047472592',
    fechaExpedicion: '12/10/2012',
    eps: 'SALUD TOTAL',
    cargo: 'Técnico de Conectividad y Cableado',
    area: 'Operaciones y Redes',
    sede: 'Sede Operativa SYSNET',
    nivelRiesgo: 5,
    email: 'lfmontesch94@gmail.com',
    telefono: '310 998 4417',
    fechaIngreso: '2022-04-18',
    estado: 'activo',
    tieneAccesoSistema: false,
    comiteAsignado: 'NINGUNO',
  },
  {
    id: 'emp-23',
    nombre: 'DILAN RICO GONZALES',
    tipoDocumento: 'CC',
    cedula: '1043300509',
    fechaExpedicion: '14/05/2025',
    eps: 'SALUD TOTAL',
    cargo: 'Auxiliar de Logística y Despachos',
    area: 'Logística y Almacén',
    sede: 'Sede Operativa SYSNET',
    nivelRiesgo: 5,
    email: 'srico.sysnet@gmail.com',
    telefono: '319 887 3326',
    fechaIngreso: '2024-01-10',
    estado: 'activo',
    tieneAccesoSistema: false,
    comiteAsignado: 'NINGUNO',
  },
  {
    id: 'emp-24',
    nombre: 'LUZ DARY CRESPO',
    tipoDocumento: 'CC',
    cedula: '1237440696',
    fechaExpedicion: '25/11/2026',
    eps: 'SALUD TOTAL',
    cargo: 'Servicios Generales y Saneamiento',
    area: 'Servicios Generales',
    sede: 'Sede Principal SYSNET',
    nivelRiesgo: 1,
    email: 'lcrespo.sysnet@gmail.com',
    telefono: '311 223 7725',
    fechaIngreso: '2022-01-15',
    estado: 'activo',
    tieneAccesoSistema: false,
    comiteAsignado: 'NINGUNO',
  },
];

const INITIAL_COMPANY: CompanyProfile = {
  razonSocial: 'SYSNET S.A.S.',
  nit: '900.852.147-3',
  actividadEconomica: 'Telecomunicaciones, Soluciones de Conectividad, Internet y Redes de Datos',
  codigoCIIU: '6110 / 6202',
  arl: 'Seguros Bolívar / ARL SURA',
  nivelRiesgo: 5,
  nivelesRiesgo: [1, 5],
  totalTrabajadores: 24,
  sedePrincipal: 'Sede Principal SYSNET',
  direccion: 'Calle Principal # 45 - 28',
  ciudad: 'Cartagena / Bolívar, Colombia',
  representanteLegal: 'Diego Alejandro Zúñiga Plazas',
  responsableSST: 'Diego Alejandro Zúñiga Plazas & Wendy Vanesa Angulo',
  licenciaSST: 'Resolución SDS-34821 de 2021',
  vigenciaComitesDesde: '2026-06-25',
  vigenciaComitesHasta: '2028-06-24',
  logoUrl: '',
};

export const INITIAL_MEMBERS: Member[] = [];

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
    consecutivo: 'ACTA-COP-2026-001',
    tipo: 'ordinaria_copasst',
    comite: 'COPASST',
    titulo: 'Acta #01: Primera Reunión Oficial Ordinaria del COPASST',
    fecha: '2026-11-18',
    horaInicio: '09:00 AM',
    horaFin: '11:00 AM',
    lugar: 'Sede Principal SYSNET - Sala de Juntas',
    asistentes: [],
    ordenDelDia: [
      '1. Verificación del quórum reglamentario de instalación.',
      '2. Instalación formal del COPASST periodo 2026-2028 (Elecciones 20-junio, resultados 25-junio).',
      '3. Asignación y ratificación de roles (Presidente designado por Empleador, Secretario por el Comité).',
      '4. Definición del horario de trabajo del comité (4 horas semanales reglamentarias Dec. Ley 1295/94).',
      '5. Revisión y aprobación del Cronograma Anual de Seguridad y Salud en el Trabajo 2026-2027.',
      '6. Definición de compromisos iniciales y fecha de la siguiente reunión ordinaria.',
    ],
    desarrolloPuntos: [
      {
        punto: '1. Verificación del Quórum',
        desarrollo: 'Se verifica la asistencia de los miembros principales del COPASST elegidos y designados. Se declara quórum legal deliberatorio y decisorio según Res. 2013/1986.',
      },
      {
        punto: '2. Instalación Formal del Comité',
        desarrollo: 'Siendo el 18 de noviembre de 2026, se declara formalmente instalado el Comité Paritario de Seguridad y Salud en el Trabajo (COPASST) de SYSNET para el periodo estatutario 2026-2028, como culminación del proceso electoral de votaciones del 20 de junio y escrutinio del 25 de junio de 2026.',
      },
      {
        punto: '3. Ratificación de Roles y Funciones',
        desarrollo: 'Se ratifican los cargos del comité: Presidente en representación de la empresa, Secretario en representación de los trabajadores y Vocales, comprometiéndose a velar por la prevención de riesgos laborales.',
      },
      {
        punto: '4. Tiempo Laboral Remunerado',
        desarrollo: 'Se recuerda que la empresa SYSNET garantiza por mandato legal un mínimo de cuatro (4) horas semanales dentro de la jornada laboral ordinaria para el cumplimiento de las funciones del comité.',
      },
      {
        punto: '5. Plan y Cronograma de Trabajo',
        desarrollo: 'Se aprueba la matriz preliminar de inspecciones mensuales de seguridad locativa, orden y aseo, botiquines, extintores y señalización en sedes operativas.',
      },
    ],
    compromisos: [
      {
        id: 'c1',
        descripcion: 'Realizar la primera inspección locativa y de extintores en las instalaciones operativas.',
        responsable: 'Comité en pleno',
        fechaLimite: '2026-11-30',
        estado: 'en_proceso',
      },
      {
        id: 'c2',
        descripcion: 'Socializar a todos los colaboradores de SYSNET la conformación oficial del COPASST.',
        responsable: 'Secretario COPASST',
        fechaLimite: '2026-11-25',
        estado: 'pendiente',
      },
    ],
    evidenciasIds: ['ev-01', 'ev-02'],
    firmasDigitales: [],
    estado: 'aprobada',
    creadoPor: 'Secretario COPASST SYSNET',
    createdAt: '2026-11-18T11:00:00Z',
  },
  {
    id: 'acta-col-01',
    consecutivo: 'ACTA-COL-2026-001',
    tipo: 'ordinaria_cocolab',
    comite: 'COCOLAB',
    titulo: 'Acta #01: Primera Reunión Oficial Ordinaria de COCOLAB',
    fecha: '2026-11-18',
    horaInicio: '02:00 PM',
    horaFin: '03:30 PM',
    lugar: 'Sede Principal SYSNET - Sala de Juntas',
    asistentes: [],
    ordenDelDia: [
      '1. Verificación del quórum reglamentario y llamado a lista.',
      '2. Instalación formal del Comité de Convivencia Laboral (COCOLAB) periodo 2026-2028.',
      '3. Firma de acuerdo de estricta confidencialidad y reserva legal (Ley 1010/2006 y Ley 2365/2024).',
      '4. Establecimiento del canal confidencial para radicación de quejas.',
      '5. Aprobación del plan trimestral de prevención de acoso laboral y fomento del clima organizacional.',
    ],
    desarrolloPuntos: [
      {
        punto: '1. Verificación del Quórum',
        desarrollo: 'Se constata la asistencia de los delegados principales del empleador y de los trabajadores. Se declara legalmente constituida la sesión.',
      },
      {
        punto: '2. Instalación del Comité',
        desarrollo: 'Queda instalado el COCOLAB de SYSNET para el periodo 2026-2028 conforme a la Resolución 652 de 2012 y 1356 de 2012 del Ministerio del Trabajo.',
      },
      {
        punto: '3. Compromiso de Confidencialidad',
        desarrollo: 'Todos los integrantes suscriben el compromiso de guardar absoluta reserva legal sobre los hechos, quejas y audiencias conciliatorias que conozcan.',
      },
    ],
    compromisos: [
      {
        id: 'cc1',
        descripcion: 'Habilitar y divulgar el canal confidencial de recepción de quejas en SYSNET.',
        responsable: 'Comité de Convivencia Laboral',
        fechaLimite: '2026-11-30',
        estado: 'en_proceso',
      },
    ],
    evidenciasIds: [],
    firmasDigitales: [],
    estado: 'aprobada',
    creadoPor: 'Secretario COCOLAB SYSNET',
    createdAt: '2026-11-18T15:30:00Z',
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
  fechaConvocatoria: '2026-06-01',
  fechaVotacionInicio: '2026-06-20',
  fechaVotacionFin: '2026-06-20',
  estado: 'cerrada_escrutinio',
  candidatos: [],
  designadosEmpleador: [],
  totalVotosEmitidos: 24,
  votosEnBlanco: 0,
  jurados: ['Comité Electoral SYSNET'],
};

// Storage keys
const KEYS = {
  COMPANY: 'cocopasst_company_profile',
  MEMBERS: 'cocopasst_members_sysnet_user_v1',
  EVIDENCES: 'cocopasst_evidences',
  ACTAS: 'cocopasst_actas_sysnet_v1',
  QUEJAS: 'cocopasst_quejas',
  ELECCIONES: 'cocopasst_elecciones_sysnet_v1',
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
      if (!parsed.razonSocial?.toUpperCase().includes('SYSNET')) {
        const updated: CompanyProfile = {
          ...parsed,
          razonSocial: 'SYSNET S.A.S.',
          totalTrabajadores: 24,
          representanteLegal: 'Diego Alejandro Zúñiga Plazas',
          responsableSST: 'Diego Alejandro Zúñiga Plazas & Wendy Vanesa Angulo',
          email: 'contacto@sysnet.com.co',
          actividadEconomica: 'Telecomunicaciones, Soluciones de Conectividad, Internet y Redes de Datos',
          nivelesRiesgo: [1, 5],
          sedePrincipal: 'Sede Principal SYSNET',
          ciudad: 'Cartagena / Bolívar, Colombia',
        };
        localStorage.setItem(KEYS.COMPANY, JSON.stringify(updated));
        return updated;
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
    if (typeof window === 'undefined') return [];
    const val = localStorage.getItem(KEYS.MEMBERS);
    if (!val) {
      localStorage.setItem(KEYS.MEMBERS, JSON.stringify([]));
      return [];
    }
    try {
      return JSON.parse(val);
    } catch {
      return [];
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
  deleteEvidence: (id: string) => {
    const list = storage.getEvidences();
    const updated = list.filter(e => e.id !== id);
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
    const val = localStorage.getItem('cocopasst_users_sysnet_v1');
    if (!val) {
      localStorage.setItem('cocopasst_users_sysnet_v1', JSON.stringify(DEMO_USERS));
      return DEMO_USERS;
    }
    try {
      const parsed = JSON.parse(val);
      if (!parsed.some((u: UserAccount) => u.email === 'diego.zuniga.plazas@gmail.com' || u.email === 'rrhhsysnet@gmail.com')) {
        localStorage.setItem('cocopasst_users_sysnet_v1', JSON.stringify(DEMO_USERS));
        return DEMO_USERS;
      }
      return parsed;
    } catch {
      return DEMO_USERS;
    }
  },
  saveUsers: (data: UserAccount[]) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cocopasst_users_sysnet_v1', JSON.stringify(data));
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
    const key = 'cocopasst_empleados_sysnet_v1';
    const val = localStorage.getItem(key);
    if (!val) {
      localStorage.setItem(key, JSON.stringify(INITIAL_EMPLEADOS));
      try {
        localStorage.removeItem('cocopasst_empleados');
        localStorage.removeItem('cocopasst_empleados_v2');
        localStorage.removeItem('cocopasst_empleados_v3');
      } catch {}
      return INITIAL_EMPLEADOS;
    }
    try {
      const parsed = JSON.parse(val);
      if (!Array.isArray(parsed) || parsed.length !== 24 || !parsed.some((e: Empleado) => e.nombre.includes('ACOSTA BARROS EDDIE JHOHANER'))) {
        localStorage.setItem(key, JSON.stringify(INITIAL_EMPLEADOS));
        return INITIAL_EMPLEADOS;
      }
      return parsed;
    } catch {
      localStorage.setItem(key, JSON.stringify(INITIAL_EMPLEADOS));
      return INITIAL_EMPLEADOS;
    }
  },
  saveEmpleados: (data: Empleado[]) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cocopasst_empleados_sysnet_v1', JSON.stringify(data));
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
