import { RiesgoGTC45 } from '@/types';

export interface EstructuraComiteCalculada {
  esVigia: boolean;
  totalPrincipalesPorParte: number;
  totalSuplentesPorParte: number;
  totalMiembrosComite: number;
  textoNormativo: string;
  articulado: string;
}

export interface EstructuraCocolabCalculada {
  totalPrincipalesPorParte: number;
  totalSuplentesPorParte: number;
  totalMiembrosComite: number;
  textoNormativo: string;
  articulado: string;
}

/**
 * Calcula la conformación del COPASST o Vigía según la Resolución 2013 de 1986 (Art. 2)
 * y Decreto 1295 de 1994 (Art. 63).
 */
export function calcularEstructuraCopasst(totalTrabajadores: number): EstructuraComiteCalculada {
  if (totalTrabajadores < 10) {
    return {
      esVigia: true,
      totalPrincipalesPorParte: 1,
      totalSuplentesPorParte: 1,
      totalMiembrosComite: 2,
      textoNormativo: 'Empresa con menos de 10 trabajadores: Se elige un (1) Vigía de Seguridad y Salud en el Trabajo y su suplente por parte de los trabajadores.',
      articulado: 'Resolución 2013 de 1986 (Art. 2) & Decreto 1295 de 1994 (Art. 35)'
    };
  } else if (totalTrabajadores >= 10 && totalTrabajadores <= 49) {
    return {
      esVigia: false,
      totalPrincipalesPorParte: 1,
      totalSuplentesPorParte: 1,
      totalMiembrosComite: 4, // 2 empleador (1 principal, 1 suplente) + 2 trabajadores
      textoNormativo: 'De 10 a 49 trabajadores: Un (1) representante principal y un (1) suplente por cada una de las partes (empleador y trabajadores).',
      articulado: 'Resolución 2013 de 1986, Art. 2 literal a'
    };
  } else if (totalTrabajadores >= 50 && totalTrabajadores <= 499) {
    return {
      esVigia: false,
      totalPrincipalesPorParte: 2,
      totalSuplentesPorParte: 2,
      totalMiembrosComite: 8, // 4 empleador + 4 trabajadores
      textoNormativo: 'De 50 a 499 trabajadores: Dos (2) representantes principales y dos (2) suplentes por cada una de las partes.',
      articulado: 'Resolución 2013 de 1986, Art. 2 literal b'
    };
  } else if (totalTrabajadores >= 500 && totalTrabajadores <= 999) {
    return {
      esVigia: false,
      totalPrincipalesPorParte: 3,
      totalSuplentesPorParte: 3,
      totalMiembrosComite: 12,
      textoNormativo: 'De 500 a 999 trabajadores: Tres (3) representantes principales y tres (3) suplentes por cada una de las partes.',
      articulado: 'Resolución 2013 de 1986, Art. 2 literal c'
    };
  } else {
    return {
      esVigia: false,
      totalPrincipalesPorParte: 4,
      totalSuplentesPorParte: 4,
      totalMiembrosComite: 16,
      textoNormativo: '1.000 o más trabajadores: Cuatro (4) representantes principales y cuatro (4) suplentes por cada una de las partes.',
      articulado: 'Resolución 2013 de 1986, Art. 2 literal d'
    };
  }
}

/**
 * Calcula la conformación del COCOLAB según Resolución 652 de 2012 modificada por la Res. 1356 de 2012.
 */
export function calcularEstructuraCocolab(totalTrabajadores: number): EstructuraCocolabCalculada {
  if (totalTrabajadores < 20) {
    return {
      totalPrincipalesPorParte: 1,
      totalSuplentesPorParte: 1,
      totalMiembrosComite: 4,
      textoNormativo: 'Empresas con menos de 20 trabajadores: Mínimo un (1) representante principal y un (1) suplente por cada parte (2 principales y 2 suplentes en total).',
      articulado: 'Resolución 1356 de 2012, Art. 1'
    };
  } else {
    return {
      totalPrincipalesPorParte: 2,
      totalSuplentesPorParte: 2,
      totalMiembrosComite: 8,
      textoNormativo: 'Empresas con 20 o más trabajadores: Mínimo dos (2) representantes principales y dos (2) suplentes por cada parte (4 principales y 4 suplentes en total). La empresa podrá voluntariamente conformar un número mayor.',
      articulado: 'Resolución 652 de 2012, Art. 3 & Resolución 1356 de 2012'
    };
  }
}

export const LISTA_RIESGOS_GTC45: RiesgoGTC45[] = [
  'Seguridad - Locativo (Pisos, Caídas, Orden y aseo)',
  'Seguridad - Eléctrico (Alta/baja tensión, Tableros)',
  'Seguridad - Mecánico (Máquinas, Herramientas, Atrapamiento)',
  'Biomecánico (Posturas, Esfuerzo, Movimiento repetitivo)',
  'Físico (Ruido, Iluminación, Temperaturas)',
  'Químico (Gases, Vapores, Polvos, Líquidos)',
  'Biológico (Virus, Bacterias, Hongos)',
  'Psicosocial (Estrés, Carga mental, Turnos)',
  'Seguridad - Tecnológico (Explosión, Fuga, Incendio)',
  'Fenómenos Naturales (Sismo, Inundación, Precipitaciones)',
];

export const PERIODICIDAD_LEGAL = {
  copasstReuniones: 'Mensual obligatoria (Art. 7 Res. 2013/1986). Extraordinaria ante accidente grave o mortal.',
  copasstDedicacion: 'Mínimo cuatro (4) horas semanales dentro de la jornada laboral ordinaria (Art. 11 Res. 2013/1986).',
  cocolabReuniones: 'Trimestral ordinaria (Art. 9 Res. 652/2012 modificada por Res. 1356/2012). Extraordinaria ante quejas que requieran trámite inmediato.',
  custodiaDocumental: 'Veinte (20) años a partir del cese de la relación laboral (Art. 2.2.4.6.13 Decreto 1072 de 2015).',
  vigenciaPeriodo: 'Dos (2) años para ambos comités (Decreto 1295/1994 Art. 63 y Res. 652/2012 Art. 5).'
};
