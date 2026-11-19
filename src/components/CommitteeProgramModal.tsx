'use client';

import React, { useState, useEffect } from 'react';
import {
  Calendar,
  CheckCircle2,
  Clock,
  FileText,
  Shield,
  HeartHandshake,
  UserCheck,
  AlertTriangle,
  Award,
  ChevronRight,
  BookOpen,
  Filter,
  Check,
  X,
  Lock,
  ExternalLink,
  RotateCcw
} from 'lucide-react';
import { CronogramaItem } from '@/types';
import {
  TIEMPO_DEDICACION_LEGAL,
  FUNCIONES_CARGOS_COPASST,
  FUNCIONES_CARGOS_COCOLAB,
  committeeProgramStorage
} from '@/lib/committeeProgram';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'cronograma' | 'funciones' | 'tiempos';
  initialComite?: 'COPASST' | 'COCOLAB' | 'TODOS';
  onRedactarActa?: (mesTitulo: string, comite: 'COPASST' | 'COCOLAB') => void;
}

export default function CommitteeProgramModal({
  isOpen,
  onClose,
  initialTab = 'cronograma',
  initialComite = 'TODOS',
  onRedactarActa,
}: Props) {
  const [activeTab, setActiveTab] = useState<'cronograma' | 'funciones' | 'tiempos'>(initialTab);
  const [comiteFiltro, setComiteFiltro] = useState<'TODOS' | 'COPASST' | 'COCOLAB'>(initialComite);
  const [cronograma, setCronograma] = useState<CronogramaItem[]>([]);
  const [cargoSeleccionado, setCargoSeleccionado] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setCronograma(committeeProgramStorage.getCronograma());
      setActiveTab(initialTab);
      setComiteFiltro(initialComite);
    }
  }, [isOpen, initialTab, initialComite]);

  if (!isOpen) return null;

  const handleToggleMonth = (id: string) => {
    const updated = committeeProgramStorage.toggleItemCompletado(id);
    setCronograma(updated);
  };

  const handleResetCronograma = () => {
    if (confirm('¿Restablecer el cronograma anual a su estado inicial programado?')) {
      const reset = committeeProgramStorage.resetCronograma();
      setCronograma(reset);
    }
  };

  // Filtrado de items
  const itemsFiltrados = cronograma.filter((item) => {
    if (comiteFiltro === 'TODOS') return true;
    return item.comite === comiteFiltro || item.comite === 'AMBOS';
  });

  const totalCompletadas = cronograma.filter(c => c.completada).length;
  const porcentajeCumplimiento = Math.round((totalCompletadas / cronograma.length) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header Institucional */}
        <div className="px-6 py-5 bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-900 text-white flex items-center justify-between border-b border-slate-800 flex-shrink-0">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-blue-300 shadow-inner flex-shrink-0">
              <Calendar className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold tracking-tight">
                  Programa Operativo & Funciones por Cargo
                </h3>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-blue-500/20 text-blue-200 border border-blue-400/30">
                  SYSNET S.A.S.
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Vigencia 2026 - 2028 • Cronograma Mensual Enero a Diciembre • Tiempos y Obligaciones Legales
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Pestañas de Navegación del Modal */}
        <div className="px-6 py-3 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 flex-shrink-0">
          <div className="flex items-center gap-1.5 p-1 bg-slate-200/70 rounded-xl text-xs font-bold">
            <button
              onClick={() => setActiveTab('cronograma')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition-all ${
                activeTab === 'cronograma'
                  ? 'bg-white text-blue-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Cronograma Mensual (12 Meses)</span>
            </button>

            <button
              onClick={() => setActiveTab('funciones')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition-all ${
                activeTab === 'funciones'
                  ? 'bg-white text-indigo-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Funciones por Cargo</span>
            </button>

            <button
              onClick={() => setActiveTab('tiempos')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition-all ${
                activeTab === 'tiempos'
                  ? 'bg-white text-purple-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Tiempos Legales (4 Horas)</span>
            </button>
          </div>

          {activeTab === 'cronograma' && (
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold text-slate-500">Filtrar:</span>
              <div className="flex items-center gap-1 bg-white border border-slate-300 rounded-lg p-0.5 text-[11px] font-bold">
                <button
                  onClick={() => setComiteFiltro('TODOS')}
                  className={`px-2.5 py-1 rounded ${
                    comiteFiltro === 'TODOS' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Todos
                </button>
                <button
                  onClick={() => setComiteFiltro('COPASST')}
                  className={`px-2.5 py-1 rounded ${
                    comiteFiltro === 'COPASST' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Solo COPASST
                </button>
                <button
                  onClick={() => setComiteFiltro('COCOLAB')}
                  className={`px-2.5 py-1 rounded ${
                    comiteFiltro === 'COCOLAB' ? 'bg-rose-600 text-white' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Solo COCOLAB
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Contenido Scrolleable */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* TAB 1: CRONOGRAMA MENSUAL */}
          {activeTab === 'cronograma' && (
            <div className="space-y-6">
              {/* Barra de Progreso Anual */}
              <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/80 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
                <div>
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-blue-700" />
                    <h4 className="text-xs font-bold text-slate-900">
                      Avance del Plan de Trabajo Anual 2026
                    </h4>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-0.5">
                    {totalCompletadas} de 12 meses ejecutados satisfactoriamente ({porcentajeCumplimiento}% de cumplimiento)
                  </p>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-64">
                  <div className="flex-1 bg-white h-3 rounded-full overflow-hidden border border-blue-200 p-0.5">
                    <div
                      className="bg-gradient-to-r from-blue-600 to-emerald-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${porcentajeCumplimiento}%` }}
                    />
                  </div>
                  <span className="text-xs font-extrabold text-blue-900 font-mono w-10 text-right">
                    {porcentajeCumplimiento}%
                  </span>
                </div>
              </div>

              {/* Lista de Meses (Enero a Diciembre) */}
              <div className="space-y-4">
                {itemsFiltrados.map((item) => (
                  <div
                    key={item.id}
                    className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                      item.completada
                        ? 'bg-emerald-50/40 border-emerald-300 shadow-sm'
                        : 'bg-white border-slate-200 hover:border-blue-300 shadow-sm'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-slate-100">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2.5 py-1 rounded-lg bg-slate-900 text-white font-mono font-bold text-xs">
                          {item.mes}
                        </span>

                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border ${
                            item.comite === 'COPASST'
                              ? 'bg-blue-50 text-blue-800 border-blue-200'
                              : item.comite === 'COCOLAB'
                              ? 'bg-rose-50 text-rose-800 border-rose-200'
                              : 'bg-indigo-50 text-indigo-800 border-indigo-200'
                          }`}
                        >
                          {item.comite === 'AMBOS' ? 'COPASST & COCOLAB' : item.comite}
                        </span>

                        {item.completada ? (
                          <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Cumplido
                            {item.fechaEjecucion && ` (${item.fechaEjecucion})`}
                          </span>
                        ) : (
                          <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full">
                            Pendiente / Programado
                          </span>
                        )}
                      </div>

                      {/* Botón de marcar completado */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleToggleMonth(item.id)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                            item.completada
                              ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                              : 'bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-300'
                          }`}
                        >
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                          <span>{item.completada ? 'Marcado Cumplido' : 'Marcar como Cumplido'}</span>
                        </button>

                        {onRedactarActa && (
                          <button
                            onClick={() => onRedactarActa(item.titulo, item.comite === 'COCOLAB' ? 'COCOLAB' : 'COPASST')}
                            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
                            title="Abrir formulario para levantar el acta de este mes"
                          >
                            <FileText className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Generar Acta</span>
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Título y Responsable */}
                    <div className="pt-3">
                      <h4 className="text-sm font-bold text-slate-900">{item.titulo}</h4>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">{item.descripcion}</p>
                      
                      <div className="mt-2 text-xs flex flex-wrap items-center gap-2 text-slate-700">
                        <span className="font-semibold text-blue-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                          Responsable: {item.cargoResponsable}
                        </span>
                        {item.responsableNombre && (
                          <span className="font-medium text-slate-500">
                            ({item.responsableNombre})
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Tareas específicas del mes */}
                    <div className="mt-3.5 p-3.5 bg-slate-50/70 border border-slate-200/80 rounded-xl space-y-1.5">
                      <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wide block mb-1">
                        Acciones y Tareas Programadas para este Mes:
                      </span>
                      {item.tareas.map((t, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                          <span className="w-4 h-4 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <span>{t}</span>
                        </div>
                      ))}
                    </div>

                    {/* Entregable Obligatorio */}
                    <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 text-slate-600">
                        <FileText className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                        <span><strong>Entregable Legal:</strong> {item.entregable}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 text-center">
                <button
                  onClick={handleResetCronograma}
                  className="text-xs text-slate-400 hover:text-slate-600 font-medium inline-flex items-center gap-1 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Restablecer cronograma a valores por defecto
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: FUNCIONES POR CARGO */}
          {activeTab === 'funciones' && (
            <div className="space-y-6">
              {/* Sección COPASST */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-blue-200">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <h4 className="text-sm font-extrabold text-blue-950 uppercase tracking-wide">
                    Funciones por Cargo en el COPASST (Res. 2013 de 1986 & Dec. 1072 de 2015)
                  </h4>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {FUNCIONES_CARGOS_COPASST.map((fc, idx) => (
                    <div
                      key={idx}
                      className="p-5 bg-white border border-blue-100 rounded-2xl shadow-sm space-y-3 hover:border-blue-300 transition-all"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
                        <div>
                          <h5 className="text-sm font-extrabold text-blue-900">{fc.cargo}</h5>
                          <p className="text-xs text-slate-500">{fc.normativa}</p>
                        </div>
                        <div className="text-left sm:text-right">
                          <span className="text-xs font-bold text-slate-900 block">{fc.titularActual}</span>
                          <span className="text-[10px] text-slate-500 font-mono">C.C. {fc.cedula}</span>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wide block">
                          Funciones Principales:
                        </span>
                        {fc.funciones.map((f, fIdx) => (
                          <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-700">
                            <span className="text-blue-600 font-bold">•</span>
                            <span>{f}</span>
                          </div>
                        ))}
                      </div>

                      <div className="p-3 bg-blue-50/70 border border-blue-200/60 rounded-xl space-y-1">
                        <span className="text-[10px] font-bold text-blue-950 uppercase tracking-wide block">
                          Responsabilidades Legales Obligatorias:
                        </span>
                        {fc.responsabilidadesLegales.map((r, rIdx) => (
                          <div key={rIdx} className="text-[11px] text-blue-900 flex items-start gap-1.5">
                            <span className="font-bold text-blue-600">✓</span>
                            <span>{r}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sección COCOLAB */}
              <div className="space-y-4 pt-4 border-t border-slate-200">
                <div className="flex items-center gap-2 pb-2 border-b border-rose-200">
                  <HeartHandshake className="w-5 h-5 text-rose-600" />
                  <h4 className="text-sm font-extrabold text-rose-950 uppercase tracking-wide">
                    Funciones por Cargo en el COCOLAB (Res. 652 de 2012, Ley 1010 de 2006 & Ley 2365 de 2024)
                  </h4>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {FUNCIONES_CARGOS_COCOLAB.map((fc, idx) => (
                    <div
                      key={idx}
                      className="p-5 bg-white border border-rose-100 rounded-2xl shadow-sm space-y-3 hover:border-rose-300 transition-all"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
                        <div>
                          <h5 className="text-sm font-extrabold text-rose-900">{fc.cargo}</h5>
                          <p className="text-xs text-slate-500">{fc.normativa}</p>
                        </div>
                        <div className="text-left sm:text-right">
                          <span className="text-xs font-bold text-slate-900 block">{fc.titularActual}</span>
                          <span className="text-[10px] text-slate-500 font-mono">C.C. {fc.cedula}</span>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wide block">
                          Funciones Principales:
                        </span>
                        {fc.funciones.map((f, fIdx) => (
                          <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-700">
                            <span className="text-rose-600 font-bold">•</span>
                            <span>{f}</span>
                          </div>
                        ))}
                      </div>

                      <div className="p-3 bg-rose-50/70 border border-rose-200/60 rounded-xl space-y-1">
                        <span className="text-[10px] font-bold text-rose-950 uppercase tracking-wide block">
                          Responsabilidades Legales y Reserva Confidencial:
                        </span>
                        {fc.responsabilidadesLegales.map((r, rIdx) => (
                          <div key={rIdx} className="text-[11px] text-rose-900 flex items-start gap-1.5">
                            <span className="font-bold text-rose-600">✓</span>
                            <span>{r}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: TIEMPOS LEGALES Y DEDICACIÓN */}
          {activeTab === 'tiempos' && (
            <div className="space-y-5">
              <div className="p-5 bg-gradient-to-tr from-purple-50 to-indigo-50 border border-purple-200 rounded-2xl space-y-3">
                <div className="flex items-center gap-2 text-purple-900 font-extrabold text-sm">
                  <Clock className="w-5 h-5 text-purple-700" />
                  <span>Dedicación de Tiempo Obligatorio según la Legislación Colombiana</span>
                </div>
                <p className="text-xs text-purple-950 leading-relaxed">
                  Para que los comités no sean solo un requisito en papel sino instancias efectivas de prevención, la ley colombiana otorga tiempos específicos protegidos dentro de la jornada laboral remunerada:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* COPASST Tiempos */}
                <div className="p-5 bg-white border border-blue-200 rounded-2xl shadow-sm space-y-3">
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-blue-600" />
                    <h5 className="text-xs font-extrabold text-blue-900 uppercase">
                      Tiempos del COPASST (Decreto Ley 1295 de 1994)
                    </h5>
                  </div>
                  
                  <div className="space-y-2 text-xs text-slate-700">
                    <div className="p-2.5 bg-blue-50/50 rounded-xl border border-blue-100">
                      <strong className="text-blue-950 block">4 Horas Semanales Remuneradas:</strong>
                      El empleador (SYSNET) está obligado por ley a proporcionar <strong>mínimo cuatro (4) horas semanales</strong> dentro de la jornada laboral a cada miembro para el cumplimiento de sus funciones (Art. 189 Dec. Ley 1295/94).
                    </div>

                    <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                      <strong className="text-slate-900 block">Reuniones Ordinarias:</strong>
                      Mínimo <strong>una (1) vez al mes</strong>. Duración recomendada: 1 a 2 horas durante la jornada de trabajo.
                    </div>

                    <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                      <strong className="text-slate-900 block">Reuniones Extraordinarias:</strong>
                      Inmediatas ante accidente grave o mortal (dentro de los 2 días hábiles siguientes) o cuando exista riesgo inminente en telecomunicaciones o alturas.
                    </div>
                  </div>
                </div>

                {/* COCOLAB Tiempos */}
                <div className="p-5 bg-white border border-rose-200 rounded-2xl shadow-sm space-y-3">
                  <div className="flex items-center gap-2">
                    <HeartHandshake className="w-5 h-5 text-rose-600" />
                    <h5 className="text-xs font-extrabold text-rose-900 uppercase">
                      Tiempos del COCOLAB (Resolución 1356 de 2012)
                    </h5>
                  </div>

                  <div className="space-y-2 text-xs text-slate-700">
                    <div className="p-2.5 bg-rose-50/50 rounded-xl border border-rose-100">
                      <strong className="text-rose-950 block">Sesiones Trimestrales Ordinarias:</strong>
                      El Comité de Convivencia sesionará ordinariamente <strong>cada tres (3) meses</strong> (Resolución 1356 de 2012 modificatoria de la Res. 652).
                    </div>

                    <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                      <strong className="text-slate-900 block">Sesiones Extraordinarias por Quejas:</strong>
                      Sesionará de manera extraordinaria inmediatamente cuando se presenten casos que requieran su inmediata intervención y pueda ser convocado por cualquiera de sus integrantes.
                    </div>

                    <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                      <strong className="text-slate-900 block">Tiempo de Conciliación:</strong>
                      Espacios protegidos para escuchar individualmente a las partes y concertar mesas de diálogo privadas sin revictimización.
                    </div>
                  </div>
                </div>
              </div>

              {/* Parámetros de Duración y Archivo */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                  <span className="text-[10px] text-slate-500 font-bold uppercase block">Período de Elección</span>
                  <strong className="text-sm text-slate-900 block mt-1">2 Años de Vigencia</strong>
                  <span className="text-[11px] text-blue-700">Del 15/01/2026 al 14/01/2028</span>
                </div>

                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                  <span className="text-[10px] text-slate-500 font-bold uppercase block">Custodia de Actas</span>
                  <strong className="text-sm text-slate-900 block mt-1">Mínimo 20 Años</strong>
                  <span className="text-[11px] text-emerald-700">Archivo digital y físico obligatorio</span>
                </div>

                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                  <span className="text-[10px] text-slate-500 font-bold uppercase block">Quórum Decisorio</span>
                  <strong className="text-sm text-slate-900 block mt-1">Mitad más Uno</strong>
                  <span className="text-[11px] text-purple-700">Para deliberar y tomar decisiones</span>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer del Modal */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs flex-shrink-0">
          <p className="text-slate-500 text-center sm:text-left">
            Resolución 2013/1986 • Res. 652 y 1356/2012 • Decreto 1072/2015 • Ley 2365/2024
          </p>

          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-all shadow-sm"
          >
            Entendido / Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
