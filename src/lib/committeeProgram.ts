import { CronogramaItem, FuncionCargo } from '@/types';

export const TIEMPO_DEDICACION_LEGAL = {
  periodoVigencia: '2 años (2026 - 2028)',
  fechaInicio: '15 de enero de 2026',
  fechaFin: '14 de enero de 2028',
  horasSemanalesCopasst: 'Al menos 4 horas semanales reglamentadas dentro de la jornada laboral (Art. 189 Decreto Ley 1295/1994 y Decreto 1072/2015).',
  frecuenciaCopasst: 'Reunión ordinaria mensual obligatoria. Reunión extraordinaria dentro de los 2 días hábiles siguientes a un accidente grave o mortal, o ante riesgo inminente.',
  frecuenciaCocolab: 'Reunión ordinaria cada tres (3) meses (Resolución 1356 de 2012). Reunión extraordinaria inmediata cuando se radique una queja de presunto acoso laboral o sexual (Ley 1010/2006 y Ley 2365/2024).',
  archivoActas: 'Custodia obligatoria física y digital durante mínimo 20 años posteriores a la reunión (Decreto 1072 de 2015 Art. 2.2.4.6.13).',
  proteccionFueroSst: 'Garantía de no represalias y protección legal en el ejercicio de las funciones del comité.',
};

export const FUNCIONES_CARGOS_COPASST: FuncionCargo[] = [
  {
    cargo: 'Presidente del COPASST',
    comite: 'COPASST',
    titularActual: 'OSORIO CHICO JAIDER LINCOLN',
    cedula: '1143342664',
    normativa: 'Resolución 2013 de 1986 (Art. 12) y Decreto 1072 de 2015',
    tiempoDedicacion: '4 horas semanales dentro de la jornada laboral',
    funciones: [
      'Presidir y orientar las reuniones del Comité en forma dinámica, eficaz y participativa.',
      'Convocar por escrito a los miembros del Comité a las reuniones ordinarias mensuales y extraordinarias.',
      'Tramitar formalmente ante la Gerencia de SYSNET las recomendaciones aprobadas por el Comité y hacer seguimiento a su adopción.',
      'Coordinar con el Líder de SG-SST (Diego Zuñiga) los recursos humanos, técnicos y locativos necesarios para el funcionamiento del Comité.',
      'Liderar la inspección planeada de riesgos de campo (trabajo en alturas, cuadrillas de redes y telecomunicaciones).',
      'Rendir cuentas del desempeño del COPASST ante la Gerencia al menos una vez al año.',
    ],
    responsabilidadesLegales: [
      'Garantizar que se sesione como mínimo una vez al mes con quórum reglamentario.',
      'Firmar oportunamente todas las actas de reunión y planes de mejora concertados.',
      'Convocar a reunión extraordinaria dentro de los 2 días posteriores a un accidente grave o mortal.',
    ],
  },
  {
    cargo: 'Secretario(a) del COPASST',
    comite: 'COPASST',
    titularActual: 'MARIMON SIMARRA CAROLINA',
    cedula: '1001833348',
    normativa: 'Resolución 2013 de 1986 (Art. 13) y Decreto 1072 de 2015',
    tiempoDedicacion: '4 horas semanales dentro de la jornada laboral',
    funciones: [
      'Verificar el quórum reglamentario al inicio de cada sesión mensual.',
      'Redactar, levantar y foliar consecutivamente las actas oficiales de cada reunión.',
      'Someter las actas a lectura, aprobación y firma de todos los asistentes.',
      'Llevar el archivo y custodia física y digital de actas, soportes fotográficos e informes de investigación durante 20 años.',
      'Enviar la citación con orden del día y documentación previa a los miembros con mínimo 3 días de antelación.',
      'Hacer seguimiento a los compromisos de las actas anteriores y verificar su grado de cumplimiento.',
    ],
    responsabilidadesLegales: [
      'Mantener al día el libro foliado o consecutivo digital de actas del COPASST.',
      'Registrar con veracidad los acuerdos, votos y recomendaciones del Comité.',
      'Suministrar copias de actas a las entidades de control (Ministerio del Trabajo / ARL) en auditorías.',
    ],
  },
  {
    cargo: 'Vocales y Miembros Principales / Suplentes COPASST',
    comite: 'COPASST',
    titularActual: 'PEÑA NAVARRO SAMUEL ANTONIO / ACOSTA BARROS EDDIE JHOHANER',
    cedula: '8641302 / 84083810',
    normativa: 'Resolución 2013 de 1986 (Art. 11), Res. 1401 de 2007 y Decreto 1072 de 2015',
    tiempoDedicacion: '4 horas semanales dentro de la jornada laboral',
    funciones: [
      'Asistir puntualmente a las reuniones mensuales programadas por el Comité.',
      'Participar en las inspecciones de seguridad a instalaciones, bodegas, vehículos, escaleras y herramientas de red.',
      'Integrar el equipo investigador de todos los accidentes e incidentes de trabajo dentro de los 15 días posteriores al suceso.',
      'Proponer medidas preventivas y de control para la matriz de riesgos (Riesgo I en oficinas y Riesgo V en alturas y redes).',
      'Servir como canal de comunicación directo entre los colaboradores de cuadrilla y el Comité.',
      'Los suplentes deben asistir y relevar a los principales en caso de vacaciones, licencias o fuerza mayor.',
    ],
    responsabilidadesLegales: [
      'Reportar de inmediato a SST cualquier condición de peligro inminente detectada en campo.',
      'Firmar los informes de investigación de accidentes de trabajo con la ARL.',
      'Promover el autocuidado y el uso estricto de EPP en todo el personal técnico de SYSNET.',
    ],
  },
];

export const FUNCIONES_CARGOS_COCOLAB: FuncionCargo[] = [
  {
    cargo: 'Presidente del COCOLAB',
    comite: 'COCOLAB',
    titularActual: 'MERLANO FLOREZ TOMAS ENRIQUE',
    cedula: '9284360',
    normativa: 'Resolución 652 de 2012 (Art. 7) y Ley 1010 de 2006',
    tiempoDedicacion: 'Sesiones trimestrales ordinarias y sesiones extraordinarias inmediatas ante quejas',
    funciones: [
      'Convocar a los miembros del Comité a las sesiones ordinarias trimestrales y extraordinarias.',
      'Presidir y conducir las sesiones con estricta neutralidad, objetividad y respeto por el debido proceso.',
      'Tramitar ante la Dirección de SYSNET y Recursos Humanos las recomendaciones preventivas formuladas por el Comité.',
      'Gestionar los recursos logísticos y espacios privados necesarios para el desarrollo seguro de las audiencias.',
      'Liderar el informe anual de gestión de convivencia laboral para la alta dirección de la empresa.',
    ],
    responsabilidadesLegales: [
      'Garantizar la imparcialidad total: abstenerse de emitir juicios de valor antes de oír a las partes.',
      'Activar de inmediato el protocolo ante casos de presunto acoso sexual bajo la Ley 2365 de 2024.',
      'Guardar reserva absoluta: la revelación de hechos confidenciales acarrea sanciones disciplinarias y penales.',
    ],
  },
  {
    cargo: 'Secretario(a) del COCOLAB',
    comite: 'COCOLAB',
    titularActual: 'RIVERO LEIVA CESAR ANTONIO',
    cedula: '16831081',
    normativa: 'Resolución 652 de 2012 (Art. 8) y Ley 1010 de 2006',
    tiempoDedicacion: 'Sesiones trimestrales ordinarias y trámite de quejas radicadas',
    funciones: [
      'Recibir y radicar bajo estricta reserva las quejas escritas presentadas por presunto acoso laboral o afectación a la convivencia.',
      'Citar individualmente a la parte quejosa y a la parte denunciada a las entrevistas privadas de descargos.',
      'Elaborar el orden del día y levantar las actas confidenciales de cada sesión y mesa de diálogo.',
      'Llevar el archivo y custodia del buzón de quejas en carpeta bajo llave y encriptación digital por 20 años.',
      'Elaborar las estadísticas trimestrales de quejas y seguimiento a los compromisos de convivencia.',
      'Redactar y archivar los acuerdos mutuos de conciliación firmados por las partes.',
    ],
    responsabilidadesLegales: [
      'Custodiar la documentación reservada. Ningún dato de COCOLAB puede ser divulgado a COPASST ni terceros.',
      'Citar a las partes dentro de los plazos establecidos por el reglamento interno.',
      'Emitir la constancia de cierre o no conciliación cuando las partes no logren un acuerdo amigable.',
    ],
  },
  {
    cargo: 'Vocales y Miembros del COCOLAB',
    comite: 'COCOLAB',
    titularActual: 'ANGULO WENDY VANESA / BETANCOURT ALVAREZ CLAUDIA ROXANA',
    cedula: '1143415065 / 1042422007',
    normativa: 'Resolución 652 de 2012 (Art. 6) y Ley 2365 de 2024',
    tiempoDedicacion: 'Sesiones trimestrales ordinarias y mesas de concertación',
    funciones: [
      'Escuchar a las partes involucradas de manera individual y neutral en audiencias reservadas.',
      'Facilitar la comunicación respetuosa y proponer fórmulas amigables de concertación.',
      'Formular planes de mejora concertados entre las partes para restaurar el clima armónico de trabajo.',
      'Hacer seguimiento periódico a los compromisos pactados en las actas de conciliación.',
      'Participar en las campañas de prevención de violencia laboral, estrés y salud mental de la empresa.',
    ],
    responsabilidadesLegales: [
      'Deber de reserva estricto (Art. 13 Res. 652/2012). La violación a la confidencialidad es falta gravísima.',
      'Garantizar la no revictimización de los trabajadores que radiquen quejas.',
      'Promover ambientes de trabajo libres de discriminación, acoso y hostigamiento en SYSNET.',
    ],
  },
];

export const INITIAL_CRONOGRAMA: CronogramaItem[] = [
  {
    id: 'cron-01',
    mes: 'Enero 2026',
    numeroMes: 1,
    comite: 'AMBOS',
    titulo: 'Instalación Oficial, Posesión y Aprobación del Plan de Trabajo Anual',
    descripcion: 'Posesión formal de miembros electos y designados para el período 2026-2028. Definición de cronograma anual de reuniones, asignación de responsabilidades y revisión de matrices.',
    cargoResponsable: 'Presidentes y Secretarios de COPASST y COCOLAB',
    responsableNombre: 'Jaider Osorio / Tomas Merlano / Diego Zuñiga',
    tareas: [
      'Firma del Acta de Posesión de miembros del COPASST y del COCOLAB período 2026-2028.',
      'Aprobación formal del Plan Anual de Trabajo de Seguridad y Salud en el Trabajo (SST) para SYSNET.',
      'Revisión inicial de la Matriz de Identificación de Peligros (Riesgo I en oficinas y Riesgo V en campo).',
      'Definición de fechas fijas para reuniones ordinarias mensuales de COPASST y trimestrales de COCOLAB.',
    ],
    entregable: 'Acta Oficial de Posesión ACTA-POS-2026-001 y Plan de Trabajo Anual firmado',
    completada: true,
    fechaEjecucion: '2026-01-15',
  },
  {
    id: 'cron-02',
    mes: 'Febrero 2026',
    numeroMes: 2,
    comite: 'COPASST',
    titulo: 'Inspección Planeada de Puestos de Trabajo y Oficinas (Riesgo I)',
    descripcion: 'Inspección de condiciones ergonómicas, iluminación, ventilación, pantallas de visualización y rutas de evacuación en sede administrativa de SYSNET.',
    cargoResponsable: 'Vocales COPASST & Secretaria COPASST',
    responsableNombre: 'Samuel Peña / Carolina Marimon',
    tareas: [
      'Aplicación de lista de chequeo ergonómica en oficinas de Recursos Humanos, Contabilidad y Gerencia.',
      'Verificación de cableado de computadores, iluminación y orden y aseo en puestos de atención al cliente.',
      'Revisión de botiquín de primeros auxilios y señalización de evacuación en sede principal.',
      'Sesión ordinaria mensual del COPASST para consolidar hallazgos y emitir compromisos de mejora.',
    ],
    entregable: 'Lista de chequeo locativa e informe fotográfico adjunto al Acta Mensual 02',
    completada: true,
    fechaEjecucion: '2026-02-18',
  },
  {
    id: 'cron-03',
    mes: 'Marzo 2026',
    numeroMes: 3,
    comite: 'AMBOS',
    titulo: 'Inspección de Equipos de Alturas (Riesgo V) + 1ª Sesión Trimestral COCOLAB',
    descripcion: 'Revisión técnica de arneses, eslingas, escaleras y EPP para trabajo en postes y torres de telecomunicaciones. Primera sesión ordinaria trimestral del Comité de Convivencia.',
    cargoResponsable: 'Presidente COPASST & Presidente COCOLAB',
    responsableNombre: 'Jaider Lincoln Osorio / Tomas Enrique Merlano',
    tareas: [
      'Inspección detallada de arneses de cuerpo entero, eslingas de posicionamiento y líneas de vida para técnicos.',
      'Verificación del estado de escaleras dieléctricas y equipos de protección contra caídas.',
      'Primera sesión trimestral ordinaria de COCOLAB: revisión de buzón de quejas y estado del clima laboral.',
      'Divulgación de la política de desconexión laboral y prevención de acoso (Ley 1010/2006).',
    ],
    entregable: 'Ficha de inspección de equipos de alturas y Acta Ordinaria Trimestral 01 de COCOLAB',
    completada: false,
  },
  {
    id: 'cron-04',
    mes: 'Abril 2026',
    numeroMes: 4,
    comite: 'AMBOS',
    titulo: 'Mes de la Seguridad y Salud: Taller de Reportes y Protocolo Ley 2365',
    descripcion: 'Conmemoración del Día Mundial de la SST (28 de abril). Capacitación interactiva a todo el personal en reporte de condiciones inseguras por app y prevención de acoso sexual laboral.',
    cargoResponsable: 'Secretaria COPASST & Vocales COCOLAB',
    responsableNombre: 'Carolina Marimon / Wendy Angulo',
    tareas: [
      'Capacitación a técnicos y personal administrativo: Cómo tomar foto-evidencias de peligros desde el celular.',
      'Socialización del nuevo protocolo de prevención y atención integral al acoso sexual laboral (Ley 2365/2024).',
      'Reunión mensual ordinaria del COPASST: evaluación de reportes fotográficos subsanados.',
      'Jornada de pausas activas y autocuidado en cuadrillas de campo.',
    ],
    entregable: 'Registro de asistencia y evaluación de la capacitación + Acta Mensual 04 COPASST',
    completada: false,
  },
  {
    id: 'cron-05',
    mes: 'Mayo 2026',
    numeroMes: 5,
    comite: 'COPASST',
    titulo: 'Auditoría de Equipos de Emergencia y Kits de Primeros Auxilios',
    descripcion: 'Inspección técnica de extintores portátiles, fechas de recarga, gabinetes, botiquines y kits de emergencia en vehículos de soporte técnico.',
    cargoResponsable: 'Vocales COPASST',
    responsableNombre: 'Eddie Acosta Barros / Samuel Peña Navarro',
    tareas: [
      'Revisión física del 100% de los extintores de la empresa (presión, precinto, tarjeta de recarga y ubicación).',
      'Inspección de botiquines de primeros auxilios en vehículos y sede de operaciones SYSNET.',
      'Verificación de la conformación de la brigada de emergencias de la empresa.',
      'Reunión mensual ordinaria del COPASST para revisar cumplimiento de inspecciones previas.',
    ],
    entregable: 'Registro consolidado de inspección de extintores y botiquines + Acta Mensual 05 COPASST',
    completada: false,
  },
  {
    id: 'cron-06',
    mes: 'Junio 2026',
    numeroMes: 6,
    comite: 'AMBOS',
    titulo: 'Balance Semestral de Indicadores SST + 2ª Sesión Trimestral COCOLAB',
    descripcion: 'Cierre del primer semestre: evaluación de indicadores de accidentalidad, incidentes y ausentismo. Sesión trimestral de convivencia y taller de comunicación asertiva.',
    cargoResponsable: 'Presidente COPASST & Secretaria COCOLAB',
    responsableNombre: 'Jaider Osorio / Cesar Rivero / Diego Zuñiga',
    tareas: [
      'Cálculo y análisis de indicadores de frecuencia, severidad y proporción de accidentes de trabajo (Res. 0312/2019).',
      'Evaluación del porcentaje de cumplimiento de los compromisos adquiridos en actas de enero a mayo.',
      'Segunda sesión ordinaria trimestral de COCOLAB: seguimiento a quejas y compromisos de convivencia.',
      'Taller lúdico de comunicación asertiva y resolución de conflictos interpersonales.',
    ],
    entregable: 'Informe Estadístico Semestral de SST a Gerencia + Acta Ordinaria Trimestral 02 de COCOLAB',
    completada: false,
  },
  {
    id: 'cron-07',
    mes: 'Julio 2026',
    numeroMes: 7,
    comite: 'COPASST',
    titulo: 'Inspección de Seguridad Vial y Flota de Vehículos / Motocicletas',
    descripcion: 'Revisión del estado mecánico, frenos, luces, llantas, SOAT y tecnomecánica de las motocicletas y camionetas usadas para soporte e instalación de redes.',
    cargoResponsable: 'Vocales COPASST (Operaciones)',
    responsableNombre: 'Eddie Acosta / Ronald Molina',
    tareas: [
      'Inspección preoperacional de vehículos y motocicletas asignadas a técnicos de planta externa.',
      'Verificación de cascos de seguridad vial reglamentarios y chalecos reflectivos.',
      'Campaña de concientización sobre límites de velocidad y no uso del celular mientras se conduce.',
      'Reunión ordinaria mensual del COPASST para tramitar solicitudes de mantenimiento vehicular.',
    ],
    entregable: 'Checklist de inspección vehicular y Acta Mensual 07 COPASST',
    completada: false,
  },
  {
    id: 'cron-08',
    mes: 'Agosto 2026',
    numeroMes: 8,
    comite: 'COCOLAB',
    titulo: 'Bienestar Emocional, Prevención de Estrés Laboral y Burnout',
    descripcion: 'Campaña orientada a la salud mental de los colaboradores de SYSNET, prevención de sobrecarga de trabajo y monitoreo de factores de riesgo psicosocial.',
    cargoResponsable: 'Vocales COCOLAB & Recursos Humanos',
    responsableNombre: 'Wendy Vanesa Angulo / Claudia Betancourt',
    tareas: [
      'Difusión de infografía sobre señales de alerta de estrés laboral, ansiedad y agotamiento crónico (Burnout).',
      'Revisión del cumplimiento de pausas activas y horarios de almuerzo en áreas de alta demanda.',
      'Espacio de escucha abierto en Gestión Humana para recibir inquietudes sobre relaciones de equipo.',
      'Reunión de seguimiento del COCOLAB para evaluar clima laboral del área de soporte técnico.',
    ],
    entregable: 'Informe de campaña de bienestar emocional + Acta de seguimiento COCOLAB',
    completada: false,
  },
  {
    id: 'cron-09',
    mes: 'Septiembre 2026',
    numeroMes: 9,
    comite: 'AMBOS',
    titulo: 'Inspección de Riesgo Eléctrico y Servidores + 3ª Sesión Trimestral COCOLAB',
    descripcion: 'Inspección rigurosa de cuartos de servidores, tableros eléctricos, puesta a tierra y centros de datos de SYSNET. Tercera sesión ordinaria de COCOLAB.',
    cargoResponsable: 'Presidente COPASST & Secretario COCOLAB',
    responsableNombre: 'Jaider Osorio / Cesar Rivero',
    tareas: [
      'Inspección técnica de tableros eléctricos principales, cables encauchetados y conexiones en cuartos de telecomunicaciones.',
      'Verificación del uso de tapetes aislantes y guantes dieléctricos en mantenimientos de red eléctrica.',
      'Tercera sesión ordinaria trimestral de COCOLAB: revisión de compromisos de convivencia pactados.',
      'Monitoreo a casos de quejas conciliadas previamente para asegurar que la armonía persista.',
    ],
    entregable: 'Reporte técnico de inspección eléctrica y Acta Ordinaria Trimestral 03 de COCOLAB',
    completada: false,
  },
  {
    id: 'cron-10',
    mes: 'Octubre 2026',
    numeroMes: 10,
    comite: 'COPASST',
    titulo: 'Simulacro Nacional de Evacuación y Respuesta a Emergencias',
    descripcion: 'Planificación, ejecución y evaluación de la participación de SYSNET en el Simulacro Nacional de Respuesta a Emergencias de Colombia.',
    cargoResponsable: 'Presidente y Miembros COPASST + Director SST',
    responsableNombre: 'Jaider Osorio / Diego Zuñiga',
    tareas: [
      'Socialización previa a los colaboradores de las rutas de evacuación, punto de encuentro y brigadistas.',
      'Ejecución del simulacro de evacuación: cronometraje de tiempos de salida y conteo de personal.',
      'Evaluación del comportamiento de los colaboradores y efectividad de las alarmas.',
      'Reunión mensual ordinaria del COPASST para redactar el informe técnico del simulacro.',
    ],
    entregable: 'Informe de Evaluación del Simulacro Nacional con tiempos y fotos + Acta Mensual 10 COPASST',
    completada: false,
  },
  {
    id: 'cron-11',
    mes: 'Noviembre 2026',
    numeroMes: 11,
    comite: 'AMBOS',
    titulo: 'Campaña de Higiene Postural y Preparación de Informes de Cierre',
    descripcion: 'Jornada práctica de estiramientos e higiene postural para técnicos que cargan escaleras y personal sentado frente a pantallas. Consolidación de datos anuales.',
    cargoResponsable: 'Secretaria COPASST & Secretaria COCOLAB',
    responsableNombre: 'Carolina Marimon / Cesar Rivero',
    tareas: [
      'Jornada de capacitación en higiene postural: técnica correcta de levantamiento de cargas pesadas.',
      'Inspección de sillas ergonómicas y descansapiés en puestos administrativos.',
      'Consolidación preliminar del informe anual de gestión del COPASST para la Gerencia.',
      'Preparación del balance final de quejas atendidas por el Comité de Convivencia Laboral.',
    ],
    entregable: 'Registro fotográfico de jornada postural + Acta Mensual 11 COPASST',
    completada: false,
  },
  {
    id: 'cron-12',
    mes: 'Diciembre 2026',
    numeroMes: 12,
    comite: 'AMBOS',
    titulo: 'Rendición de Cuentas a Gerencia, 4ª Sesión COCOLAB y Cierre de Año',
    descripcion: 'Presentación del informe final de gestión y rendición de cuentas del COPASST y COCOLAB ante la Gerencia General de SYSNET. Evaluación de estándares mínimos (Res. 0312).',
    cargoResponsable: 'Presidentes de COPASST y COCOLAB + Director SST',
    responsableNombre: 'Jaider Lincoln Osorio / Tomas Merlano / Diego Zuñiga',
    tareas: [
      'Presentación formal del Informe Anual de Rendición de Cuentas ante la Gerencia de SYSNET.',
      'Evaluación de los Estándares Mínimos del SG-SST según la Resolución 0312 de 2019.',
      'Cuarta sesión ordinaria trimestral de COCOLAB: acta de balance anual de convivencia.',
      'Proyección del Plan Anual de Trabajo para el segundo año del mandato (2027).',
    ],
    entregable: 'Informe Anual de Rendición de Cuentas a Gerencia + Actas de Cierre Anual COPASST y COCOLAB',
    completada: false,
  },
];

export const committeeProgramStorage = {
  getCronograma: (): CronogramaItem[] => {
    if (typeof window === 'undefined') return INITIAL_CRONOGRAMA;
    const val = localStorage.getItem('cocopasst_cronograma_sysnet_v1');
    if (!val) {
      localStorage.setItem('cocopasst_cronograma_sysnet_v1', JSON.stringify(INITIAL_CRONOGRAMA));
      return INITIAL_CRONOGRAMA;
    }
    try {
      const parsed = JSON.parse(val);
      if (!Array.isArray(parsed) || parsed.length !== 12) {
        localStorage.setItem('cocopasst_cronograma_sysnet_v1', JSON.stringify(INITIAL_CRONOGRAMA));
        return INITIAL_CRONOGRAMA;
      }
      return parsed;
    } catch {
      return INITIAL_CRONOGRAMA;
    }
  },

  saveCronograma: (data: CronogramaItem[]) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cocopasst_cronograma_sysnet_v1', JSON.stringify(data));
      window.dispatchEvent(new Event('cocopasst_cronograma_changed'));
    }
  },

  toggleItemCompletado: (id: string): CronogramaItem[] => {
    const list = committeeProgramStorage.getCronograma();
    const updated = list.map((item) => {
      if (item.id === id) {
        const nextState = !item.completada;
        return {
          ...item,
          completada: nextState,
          fechaEjecucion: nextState ? (item.fechaEjecucion || new Date().toISOString().split('T')[0]) : undefined,
        };
      }
      return item;
    });
    committeeProgramStorage.saveCronograma(updated);
    return updated;
  },

  resetCronograma: (): CronogramaItem[] => {
    committeeProgramStorage.saveCronograma(INITIAL_CRONOGRAMA);
    return INITIAL_CRONOGRAMA;
  },
};
