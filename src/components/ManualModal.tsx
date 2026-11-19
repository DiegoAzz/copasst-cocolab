'use client';

import React, { useState } from 'react';
import {
  BookOpen,
  X,
  Search,
  Camera,
  FileText,
  Shield,
  HeartHandshake,
  Vote,
  Smartphone,
  CheckCircle2,
  AlertTriangle,
  Lock,
  ExternalLink,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

interface ManualTopic {
  id: string;
  category: 'inicio' | 'evidencias' | 'actas' | 'copasst' | 'cocolab' | 'elecciones' | 'leyes';
  title: string;
  badge: string;
  description: string;
  steps: string[];
  tips?: string;
  legalRef?: string;
}

const TOPICS: ManualTopic[] = [
  {
    id: 'roles-sistema',
    category: 'inicio',
    title: 'Separación Legal de Roles: COPASST vs COCOLAB',
    badge: 'Seguridad & Roles',
    description: 'En el marco legal colombiano, el COPASST y el COCOLAB son dos comités con finalidades y competencias totalmente distintas. La plataforma garantiza el aislamiento de datos y el deber de reserva.',
    steps: [
      'Rol Administrador SG-SST: Acceso total para parametrizar la empresa, gestionar procesos electorales, supervisar indicadores generales y realizar auditorías.',
      'Rol COPASST: Acceso exclusivo a inspecciones de seguridad, actas mensuales, matriz de compromisos de SST e investigación de accidentes de trabajo (ATEL). Por mandato legal, NO tiene acceso al buzón de quejas de COCOLAB.',
      'Rol COCOLAB: Acceso exclusivo y reservado a la radicación de quejas de presunto acoso laboral (Ley 1010/2006) y acoso sexual (Ley 2365/2024), actas trimestrales y sesiones privadas de concertación.',
      'Rol Colaborador / Trabajador: Puede reportar actos o condiciones inseguras con fotografías desde su celular, depositar su voto en la urna virtual y radicar quejas confidenciales ante el COCOLAB.',
    ],
    tips: 'Puedes cambiar de rol en cualquier momento desde la esquina superior derecha del menú para probar la perspectiva de cada comité.',
    legalRef: 'Resolución 2013 de 1986 y Resolución 652 de 2012 (Art. 13 - Deber de Reserva).',
  },
  {
    id: 'pwa-install',
    category: 'inicio',
    title: 'Cómo instalar la plataforma como App en celulares (Android e iOS)',
    badge: 'Móvil / PWA',
    description: 'La plataforma funciona como una Progressive Web App (PWA) nativa, permitiendo su uso rápido en plantas, bodegas y oficinas sin necesidad de descargarla de una tienda de aplicaciones.',
    steps: [
      'En Android (Google Chrome): Ingresa a https://cocopasst.appzplay.online, presiona el botón "Instalar App" en la barra superior o toca los 3 puntos de Chrome y selecciona "Agregar a la pantalla principal".',
      'En iPhone / iPad (Safari): Abre la página, toca el botón de "Compartir" (ícono del cuadrado con la flecha hacia arriba) y selecciona "Agregar al inicio" (Add to Home Screen).',
      'Listo: La aplicación aparecerá con su propio ícono en tu teléfono y se abrirá a pantalla completa como una app nativa, con la barra de navegación táctil inferior y acceso instantáneo a la cámara.',
    ],
    tips: 'La app móvil optimiza el consumo de batería y datos durante recorridos de inspección en campo.',
  },
  {
    id: 'empresa-config',
    category: 'inicio',
    title: 'Configuración de la Empresa y Cálculo Legal Automático',
    badge: 'SG-SST',
    description: 'Permite registrar la razón social, NIT, ARL, clase de riesgo (I a V) y total de trabajadores para que el sistema determine la estructura exacta que exige la ley.',
    steps: [
      'Haz clic en el ícono de Edificio ("Configurar Empresa") en la barra superior.',
      'Diligencia los datos: Razón Social, NIT, ARL, Clase de Riesgo y el número exacto de colaboradores activos.',
      'El sistema calculará automáticamente si la empresa debe conformar un COPASST o un Vigía de SST, y cuántos miembros principales y suplentes se requieren por ley.',
      'Presiona "Guardar Configuración". Los datos quedarán registrados y se estamparán en el membrete de todas las actas y PDFs.',
    ],
    legalRef: 'Resolución 2013 de 1986 (Art. 2) y Resolución 0312 de 2019.',
  },
  {
    id: 'captura-foto',
    category: 'evidencias',
    title: 'Capturar Fotografías de Riesgos en Terreno con la Cámara',
    badge: 'Cámara en Vivo',
    description: 'Permite a los miembros de COPASST o trabajadores registrar condiciones o actos inseguros en el mismo lugar de trabajo con sellado automático de seguridad.',
    steps: [
      'Haz clic en el botón "Foto Evidencia" o en el botón circular flotante con ícono de cámara en la barra móvil.',
      'Autoriza el permiso de cámara en tu navegador. Puedes alternar entre la cámara trasera o frontal con el botón de rotación.',
      'Si prefieres adjuntar una foto tomada previamente, toca "Subir desde Galería / Archivo".',
      'Enfoca el peligro y presiona "Tomar Foto". El sistema estampará automáticamente la marca de agua con fecha, hora exacta, sede y código de seguridad SG-SST.',
      'Asigna el Título del hallazgo, Clasificación (Condición Insegura, Acto Inseguro, Inspección, etc.) y Peligro según la GTC 45.',
      'Indica el área específica (ej: Bodega 2, Rampa 4), la medida correctiva propuesta y el responsable.',
      'Presiona "Guardar Evidencia".',
    ],
    tips: 'Asegúrate de que la foto tenga buena iluminación para que los detalles se aprecien con nitidez en el anexo del acta oficial en PDF.',
    legalRef: 'Guía Técnica Colombiana GTC 45 y Decreto 1072 de 2015.',
  },
  {
    id: 'ciclo-antes-despues',
    category: 'evidencias',
    title: 'Ciclo de Cierre: Subsanación de Riesgos (Antes y Después)',
    badge: 'Mejora Continua',
    description: 'Demuestra ante auditorías y la ARL que la empresa cerró efectivamente las condiciones de peligro detectadas.',
    steps: [
      'Ingresa a la sección "Evidencias Fotográficas".',
      'Filtra por "Abiertos" o busca el hallazgo que fue intervenido.',
      'Toca el botón "Marcar como Subsanado".',
      'Escribe la acción correctiva ejecutada (ej: "Se canalizó el cableado en tubería metálica y se despejó el extintor").',
      'El estado cambiará automáticamente a "SUBSANADO" con la fecha de cierre registrada para el informe anual.',
    ],
    legalRef: 'Decreto 1072 de 2015, Art. 2.2.4.6.34 (Medidas de prevención y control).',
  },
  {
    id: 'crear-acta',
    category: 'actas',
    title: 'Cómo Redactar y Foliar un Acta Oficial',
    badge: 'Actas Legales',
    description: 'El motor de actas genera documentos formales con numeración correlativa, orden del día, quórum, acuerdos y matriz de compromisos.',
    steps: [
      'Haz clic en "Nueva Acta" en la barra superior o en la pestaña "Actas Oficiales".',
      'Paso 1 (General): Selecciona el comité (COPASST o COCOLAB) y el tipo de acta (Ordinaria Mensual, Extraordinaria, Inspección de Seguridad, Concertación de Convivencia o Posesión).',
      'El sistema asignará el consecutivo foliado correspondiente (ej. ACTA-COP-2026-012). Ajusta fecha, horario y lugar.',
      'Paso 2 (Asistentes): Marca los miembros que asistieron para verificar el quórum legal. Puedes añadir asesores externos o invitados.',
      'Paso 3 (Orden del día): Revisa o personaliza los puntos a tratar agregando nuevos temas con 1 clic.',
      'Paso 4 (Deliberación): Redacta las conclusiones alcanzadas en cada punto del orden del día.',
      'Paso 5 (Compromisos): Asigna tareas con responsable específico y fecha límite de entrega.',
      'Paso 6 (Evidencias): Selecciona las fotografías de inspección capturadas para que se incrusten automáticamente como anexo fotográfico en el PDF.',
      'Paso 7 (Firmas): Permite que los delegados firmen digitalmente en la pantalla táctil.',
      'Presiona "Guardar y Foliar Acta".',
    ],
    legalRef: 'Resolución 2013 de 1986 (Art. 12) & Decreto 1072 de 2015.',
  },
  {
    id: 'firmas-pdf',
    category: 'actas',
    title: 'Firma Digital en Pantalla y Exportación a PDF Oficial',
    badge: 'Firma & PDF',
    description: 'Evita el uso innecesario de papel y permite firmar actas en tablet o celular con validez para auditorías.',
    steps: [
      'En la pestaña "7. Firmas" del editor de actas, haz clic en "Firmar en Pantalla" frente al nombre del miembro.',
      'El firmante puede realizar su trazo a mano alzada con el dedo (en pantalla táctil) o con el ratón.',
      'Si hay un error en el trazo, presiona "Limpiar". Para confirmar, presiona "Aceptar Firma".',
      'Para generar el archivo final, haz clic en "Descargar PDF Foliado". Se descargará un documento con membrete de la empresa, tablas formateadas, firmas y anexo fotográfico.',
    ],
    tips: 'El PDF incluye pie de página con el aviso de conservación legal de 20 años exigido por el Decreto 1072 de 2015.',
  },
  {
    id: 'cocolab-quejas',
    category: 'cocolab',
    title: 'Canal Confidencial de Convivencia y Trámite de Quejas (Ley 1010/2006)',
    badge: 'Confidencialidad',
    description: 'Procedimiento formal para tramitar presuntos casos de acoso laboral garantizando la estricta reserva legal.',
    steps: [
      'Radicación: La persona afectada o que reporta ingresa al "Canal Confidencial COCOLAB" y formula la queja describiendo los hechos y adjuntando pruebas.',
      'Tipificación: Se clasifica la conducta (Maltrato, Persecución, Discriminación, Entorpecimiento, Inequidad o Desprotección laboral).',
      'Evaluación del Comité: Los miembros de COCOLAB revisan la queja en sesión privada y programan citaciones individuales.',
      'Sesiones de Escucha: Se escucha primero a la persona que presenta la queja y luego a la parte denunciada, por separado.',
      'Mesa de Concertación: Se genera un espacio conjunto de diálogo para construir compromisos mutuos de respeto.',
      'Acta de Acuerdos: Se firma un acta de compromisos con fechas de seguimiento (a 30 y 60 días). El COCOLAB no impone sanciones disciplinarias, su labor es conciliatoria.',
    ],
    legalRef: 'Ley 1010 de 2006 y Resolución 652 de 2012.',
  },
  {
    id: 'cocolab-ley2365',
    category: 'cocolab',
    title: 'Protocolo Especial para Acoso Sexual Laboral (Ley 2365 de 2024)',
    badge: 'Ley 2365/2024',
    description: 'Directrices obligatorias vigentes en Colombia para la prevención y atención inmediata del acoso sexual en el trabajo.',
    steps: [
      'Al seleccionar la tipología "Acoso Sexual en el Ámbito Laboral (Ley 2365 de 2024)", el sistema activa la etiqueta de PRIORIDAD MÁXIMA.',
      'No Revictimización: Queda prohibida la confrontación directa obligatoria entre la víctima y la persona denunciada si la víctima no lo consiente.',
      'Medidas Cautelares Preventivas: La empresa debe evaluar de inmediato la reubicación física de puestos o turnos para proteger la integridad psicológica de la persona que reporta.',
      'Acompañamiento Psicosocial: Orientación a través del SG-SST o de la entidad de salud / ARL.',
    ],
    legalRef: 'Ley 2365 de 2024 de la República de Colombia.',
  },
  {
    id: 'elecciones-paso',
    category: 'elecciones',
    title: 'Proceso de Elecciones Electrónicas y Urna Virtual',
    badge: 'Votación Secreta',
    description: 'Garantiza elecciones transparentes, democráticas y auditables de los representantes de los colaboradores.',
    steps: [
      'Convocatoria: Se abre el periodo electoral (vigencia de 2 años).',
      'Postulación: Los colaboradores inscriben sus candidaturas con número de tarjetón.',
      'Votación: Cada trabajador ingresa a la "Urna Virtual", visualiza los tarjetones de los candidatos y emite su voto secreto (o voto en blanco).',
      'Escrutinio Automático: El sistema contabiliza los votos en tiempo real generando barras porcentuales de votación.',
      'Generación del Acta de Posesión: Con 1 clic en "Generar Acta de Posesión", el sistema proclama a los ganadores por votación mayoritaria y genera el acta oficial lista para firmas y archivo.',
    ],
    legalRef: 'Resolución 2013 de 1986 (Art. 5) y Resolución 652 de 2012 (Art. 4).',
  },
];

export default function ManualModal({ isOpen, onClose }: Props) {
  const [activeCategory, setActiveCategory] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedTopicId, setExpandedTopicId] = useState<string | null>(TOPICS[0].id);

  if (!isOpen) return null;

  const filteredTopics = TOPICS.filter((t) => {
    const matchCategory = activeCategory === 'todos' || t.category === activeCategory;
    const matchSearch =
      searchQuery.trim() === '' ||
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.steps.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (t.legalRef && t.legalRef.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCategory && matchSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl border border-blue-200/60">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                Manual de Uso y Guía Operativa • CoCoPASST
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  SG-SST Colombia
                </span>
              </h3>
              <p className="text-xs text-slate-500">
                Paso a paso para la gestión de COPASST, COCOLAB, actas y evidencias en terreno
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search and Category Filter */}
        <div className="p-4 bg-slate-50/60 border-b border-slate-200 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar tema, norma o función (ej: roles, quórum, acoso sexual, PDF, GTC 45, firma)..."
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 shadow-sm"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            {[
              { id: 'todos', label: 'Todos los Temas' },
              { id: 'inicio', label: '1. Inicio & Roles' },
              { id: 'evidencias', label: '2. Evidencias & Fotos' },
              { id: 'actas', label: '3. Actas & PDF' },
              { id: 'copasst', label: '4. COPASST' },
              { id: 'cocolab', label: '5. COCOLAB' },
              { id: 'elecciones', label: '6. Elecciones' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-all ${
                  activeCategory === cat.id
                    ? 'bg-blue-600 text-white font-bold shadow-sm'
                    : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-3 overflow-y-auto flex-1 text-slate-700">
          {filteredTopics.length === 0 ? (
            <div className="p-10 text-center text-slate-400 border border-dashed border-slate-200 rounded-xl">
              No se encontraron temas con el criterio de búsqueda "{searchQuery}".
            </div>
          ) : (
            filteredTopics.map((topic) => {
              const isExpanded = expandedTopicId === topic.id;
              return (
                <div
                  key={topic.id}
                  className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm transition-all"
                >
                  <div
                    onClick={() => setExpandedTopicId(isExpanded ? null : topic.id)}
                    className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200/80 uppercase tracking-wider flex-shrink-0">
                        {topic.badge}
                      </span>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate">{topic.title}</h4>
                    </div>
                    <div className="p-1 text-slate-400">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="px-5 pb-5 pt-1 space-y-3 border-t border-slate-100 bg-slate-50/50 text-xs">
                      <p className="text-slate-600 leading-relaxed">{topic.description}</p>

                      <div className="space-y-2 pt-1">
                        <span className="font-bold text-blue-700 uppercase tracking-wider text-[10px] block">
                          Paso a paso de ejecución:
                        </span>
                        <div className="space-y-2">
                          {topic.steps.map((step, idx) => (
                            <div key={idx} className="flex items-start gap-2.5">
                              <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center flex-shrink-0 text-[11px]">
                                {idx + 1}
                              </span>
                              <span className="text-slate-700 leading-normal">{step}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {topic.tips && (
                        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-[11px]">
                          <strong>Consejo práctico:</strong> {topic.tips}
                        </div>
                      )}

                      {topic.legalRef && (
                        <div className="text-[10px] text-slate-500 pt-1 font-mono flex items-center gap-1.5">
                          <Shield className="w-3.5 h-3.5 text-blue-600" />
                          <span>Respaldo legal: {topic.legalRef}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-3.5 bg-slate-50 border-t border-slate-200">
          <a
            href="https://www.mintrabajo.gov.co/relaciones-laborales/riesgos-laborales/sistema-de-gestion-de-seguridad-y-salud-en-el-trabajo"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1.5 font-semibold"
          >
            <span>Ver normativa en Ministerio del Trabajo</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg shadow-sm transition-colors"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
}
