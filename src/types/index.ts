export type RiesgoGTC45 = 
  | 'Biológico (Virus, Bacterias, Hongos)'
  | 'Físico (Ruido, Iluminación, Temperaturas)'
  | 'Químico (Gases, Vapores, Polvos, Líquidos)'
  | 'Psicosocial (Estrés, Carga mental, Turnos)'
  | 'Biomecánico (Posturas, Esfuerzo, Movimiento repetitivo)'
  | 'Seguridad - Locativo (Pisos, Caídas, Orden y aseo)'
  | 'Seguridad - Eléctrico (Alta/baja tensión, Tableros)'
  | 'Seguridad - Mecánico (Máquinas, Herramientas, Atrapamiento)'
  | 'Seguridad - Tecnológico (Explosión, Fuga, Incendio)'
  | 'Fenómenos Naturales (Sismo, Inundación, Precipitaciones)';

export type ClasificacionPeligro = 'Condición Insegura' | 'Acto Inseguro' | 'Incidente' | 'Accidente de Trabajo' | 'Hallazgo de Inspección';

export interface CompanyProfile {
  razonSocial: string;
  nit: string;
  actividadEconomica: string;
  codigoCIIU: string;
  arl: string;
  nivelRiesgo: 1 | 2 | 3 | 4 | 5;
  totalTrabajadores: number;
  sedePrincipal: string;
  direccion: string;
  ciudad: string;
  representanteLegal: string;
  responsableSST: string;
  licenciaSST: string;
  vigenciaComitesDesde: string;
  vigenciaComitesHasta: string;
}

export interface Member {
  id: string;
  nombre: string;
  cedula: string;
  cargo: string;
  comite: 'COPASST' | 'COCOLAB' | 'VIGIA';
  representacion: 'Empleador' | 'Trabajadores';
  rol: 'Presidente' | 'Secretario' | 'Vocal / Miembro' | 'Vigía Principal' | 'Vigía Suplente';
  condicion: 'Principal' | 'Suplente';
  telefono?: string;
  email?: string;
  fechaPosesion: string;
}

export interface Evidence {
  id: string;
  titulo: string;
  descripcion: string;
  peligroGTC45: RiesgoGTC45;
  clasificacion: ClasificacionPeligro;
  fecha: string;
  hora: string;
  sede: string;
  areaLugar: string;
  reportadoPor: string;
  estado: 'abierto' | 'en_proceso' | 'subsanado';
  imagenAntes: string; // Base64 o URL
  imagenDespues?: string; // Base64 o URL al corregir
  medidaCorrectiva: string;
  responsableAccion: string;
  fechaCompromiso?: string;
  actaIdRelacionada?: string;
  fechaCierre?: string;
}

export type TipoActa = 
  | 'ordinaria_copasst' 
  | 'extraordinaria_copasst' 
  | 'inspeccion_copasst' 
  | 'investigacion_copasst' 
  | 'ordinaria_cocolab' 
  | 'conciliacion_cocolab' 
  | 'elecciones_apertura' 
  | 'elecciones_escrutinio' 
  | 'posesion_comite';

export interface CompromisoActa {
  id: string;
  descripcion: string;
  responsable: string;
  fechaLimite: string;
  estado: 'pendiente' | 'en_proceso' | 'cumplido';
  fechaVerificacion?: string;
}

export interface AsistenteActa {
  nombre: string;
  cedula: string;
  cargo: string;
  rolEnComite: string;
  representacion: 'Empleador' | 'Trabajadores' | 'Invitado / Asesor';
  asistio: boolean;
  firmaBase64?: string;
}

export interface PuntoOrdenDia {
  punto: string;
  desarrollo: string;
}

export interface Acta {
  id: string;
  consecutivo: string; // ej. ACTA-COP-2026-001
  tipo: TipoActa;
  comite: 'COPASST' | 'COCOLAB' | 'VIGIA' | 'CONJUNTO';
  titulo: string;
  fecha: string;
  horaInicio: string;
  horaFin: string;
  lugar: string;
  asistentes: AsistenteActa[];
  ordenDelDia: string[];
  desarrolloPuntos: PuntoOrdenDia[];
  compromisos: CompromisoActa[];
  evidenciasIds: string[];
  firmasDigitales: Array<{
    nombre: string;
    cargo: string;
    rol: string;
    firmaBase64?: string;
    fechaFirma?: string;
  }>;
  estado: 'borrador' | 'aprobada' | 'archivada';
  creadoPor: string;
  createdAt: string;
}

export type TipologiaAcoso = 
  | 'Maltrato laboral (Violencia física, verbal o moral)'
  | 'Persecución laboral (Sobrecarga injustificada, cambios bruscos de horario)'
  | 'Discriminación laboral (Por género, raza, origen, religión, política)'
  | 'Entorpecimiento laboral (Ocultamiento de insumos, sabotaje)'
  | 'Inequidad laboral (Asignación de funciones con menosprecio)'
  | 'Desprotección laboral (Exposición a riesgos sin protección legal)'
  | 'Acoso Sexual en el Ámbito Laboral (Ley 2365 de 2024)';

export interface QuejaCocolab {
  id: string;
  radicado: string; // ej. Q-COL-2026-001
  fechaRadicacion: string;
  quejoso: {
    nombre: string;
    cedula: string;
    cargo: string;
    area: string;
    email: string;
    telefono: string;
  };
  denunciado: {
    nombre: string;
    cargo: string;
    area: string;
  };
  tipologia: TipologiaAcoso;
  hechosNarrados: string;
  pruebasAportadas: string;
  evidenciasAdjuntasIds: string[];
  estado: 'radicada' | 'evaluacion' | 'sesion_individual' | 'mesa_dialogo' | 'compromisos_acordados' | 'seguimiento' | 'cerrada_conciliada' | 'remitida_sin_acuerdo';
  acuerdosConvivencia?: string;
  fechaAudiencia?: string;
  actasRelacionadasIds: string[];
  esPrioritariaLey2365: boolean; // Flag para casos de Ley 2365 de 2024 (Acoso sexual)
}

export interface CandidatoEleccion {
  id: string;
  nombre: string;
  cedula: string;
  cargo: string;
  area: string;
  comite: 'COPASST' | 'COCOLAB';
  numeroTarjeton: number;
  votos: number;
  foto?: string;
}

export interface ProcesoEleccion {
  id: string;
  periodo: string; // ej. 2026-2028
  comite: 'COPASST' | 'COCOLAB';
  fechaConvocatoria: string;
  fechaVotacionInicio: string;
  fechaVotacionFin: string;
  estado: 'convocatoria' | 'inscripcion' | 'votacion_activa' | 'cerrada_escrutinio';
  candidatos: CandidatoEleccion[];
  designadosEmpleador: Array<{
    nombre: string;
    cedula: string;
    cargo: string;
    condicion: 'Principal' | 'Suplente';
  }>;
  totalVotosEmitidos: number;
  votosEnBlanco: number;
  jurados: string[];
}
