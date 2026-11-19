'use client';

import React, { useState, useEffect } from 'react';
import { 
  Camera, 
  Trash2, 
  Check, 
  X, 
  AlertTriangle, 
  MapPin, 
  User, 
  Calendar, 
  ShieldAlert,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { Evidence, RiesgoGTC45, ClasificacionPeligro } from '@/types';
import { LISTA_RIESGOS_GTC45 } from '@/lib/colombianLaw';
import { storage } from '@/lib/storage';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  evidence: Evidence | null;
  onSave: (updated: Evidence) => void;
  onDelete: (id: string) => void;
}

export default function EvidenceEditorModal({
  isOpen,
  onClose,
  evidence,
  onSave,
  onDelete,
}: Props) {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [peligroGTC45, setPeligroGTC45] = useState<RiesgoGTC45>(LISTA_RIESGOS_GTC45[0]);
  const [clasificacion, setClasificacion] = useState<ClasificacionPeligro>('Condición Insegura');
  const [sede, setSede] = useState('');
  const [areaLugar, setAreaLugar] = useState('');
  const [reportadoPor, setReportadoPor] = useState('');
  const [medidaCorrectiva, setMedidaCorrectiva] = useState('');
  const [responsableAccion, setResponsableAccion] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [estado, setEstado] = useState<'abierto' | 'en_proceso' | 'subsanado'>('abierto');

  useEffect(() => {
    if (evidence && isOpen) {
      setTitulo(evidence.titulo || '');
      setDescripcion(evidence.descripcion || '');
      setPeligroGTC45(evidence.peligroGTC45 || LISTA_RIESGOS_GTC45[0]);
      setClasificacion(evidence.clasificacion || 'Condición Insegura');
      setSede(evidence.sede || 'Sede Principal SYSNET');
      setAreaLugar(evidence.areaLugar || '');
      setReportadoPor(evidence.reportadoPor || '');
      setMedidaCorrectiva(evidence.medidaCorrectiva || '');
      setResponsableAccion(evidence.responsableAccion || '');
      setFecha(evidence.fecha || new Date().toISOString().split('T')[0]);
      setHora(evidence.hora || '');
      setEstado(evidence.estado || 'abierto');
    }
  }, [evidence, isOpen]);

  if (!isOpen || !evidence) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titulo.trim()) {
      alert('Por favor digita un título para la evidencia.');
      return;
    }

    const updated: Evidence = {
      ...evidence,
      titulo: titulo.trim(),
      descripcion: descripcion.trim(),
      peligroGTC45,
      clasificacion,
      sede,
      areaLugar: areaLugar.trim(),
      reportadoPor: reportadoPor.trim(),
      medidaCorrectiva: medidaCorrectiva.trim(),
      responsableAccion: responsableAccion.trim(),
      fecha,
      hora,
      estado,
      fechaCierre: estado === 'subsanado' ? (evidence.fechaCierre || new Date().toISOString().split('T')[0]) : undefined,
    };

    onSave(updated);
    onClose();
  };

  const handleDelete = () => {
    if (confirm(`¿Estás seguro de que deseas eliminar permanentemente la evidencia "${evidence.titulo}"? Esta acción no se puede deshacer.`)) {
      onDelete(evidence.id);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl border border-blue-200">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                Editar Evidencia Fotográfica
                <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                  estado === 'subsanado' ? 'bg-emerald-100 text-emerald-800' :
                  estado === 'en_proceso' ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
                }`}>
                  {estado}
                </span>
              </h3>
              <p className="text-xs text-slate-500">
                Modifica los datos del hallazgo o retíralo del sistema
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto flex-1 text-slate-700">
          
          {/* Photo Preview & Status Selector */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center p-3 bg-slate-50 rounded-2xl border border-slate-200">
            <div className="relative w-full sm:w-44 aspect-video sm:aspect-square rounded-xl bg-slate-900 overflow-hidden shrink-0 border border-slate-300 shadow-xs">
              <img 
                src={evidence.imagenAntes} 
                alt="Foto Evidencia" 
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="flex-1 space-y-2 w-full">
              <label className="block text-xs font-bold text-slate-700">
                Estado del Hallazgo SG-SST
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {(['abierto', 'en_proceso', 'subsanado'] as const).map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setEstado(st)}
                    className={`py-2 px-2 rounded-xl text-xs font-bold border transition-all ${
                      estado === st
                        ? st === 'subsanado'
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                          : st === 'en_proceso'
                          ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
                          : 'bg-rose-600 text-white border-rose-600 shadow-xs'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {st === 'abierto' ? '🔴 Abierto' : st === 'en_proceso' ? '🟡 En Proceso' : '🟢 Subsanado'}
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-slate-500">
                Al marcar como subsanado, se registrará el cumplimiento del hallazgo para el cierre de compromisos.
              </p>
            </div>
          </div>

          {/* Título y Clasificación */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Título del Hallazgo <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                required
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold"
                placeholder="Ej. Cable eléctrico expuesto en pasillo"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Clasificación
              </label>
              <select
                value={clasificacion}
                onChange={(e) => setClasificacion(e.target.value as any)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Condición Insegura">Condición Insegura (Entorno)</option>
                <option value="Acto Inseguro">Acto Inseguro (Comportamiento)</option>
              </select>
            </div>
          </div>

          {/* Peligro GTC 45 */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Factor de Peligro (Guía Técnica Colombiana GTC 45)
            </label>
            <select
              value={peligroGTC45}
              onChange={(e) => setPeligroGTC45(e.target.value as any)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {LISTA_RIESGOS_GTC45.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Descripción de lo Observado
            </label>
            <textarea
              rows={2}
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Detalle exacto de la condición encontrada..."
            />
          </div>

          {/* Ubicación y Lugar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Área / Punto Específico
              </label>
              <input
                type="text"
                value={areaLugar}
                onChange={(e) => setAreaLugar(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ej. Baños, Bodega 2, Patio maniobras"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Reportado Por
              </label>
              <input
                type="text"
                value={reportadoPor}
                onChange={(e) => setReportadoPor(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nombre del inspector o empleado"
              />
            </div>
          </div>

          {/* Medida Correctiva y Responsable */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Medida Correctiva / Preventiva
              </label>
              <input
                type="text"
                value={medidaCorrectiva}
                onChange={(e) => setMedidaCorrectiva(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ej. Canalizar cableado, limpiar derrame"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Responsable de la Acción
              </label>
              <input
                type="text"
                value={responsableAccion}
                onChange={(e) => setResponsableAccion(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ej. Mantenimiento, Jefe de Operaciones"
              />
            </div>
          </div>

          {/* Fecha y Hora */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Fecha de Inspección
              </label>
              <input
                type="date"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Hora
              </label>
              <input
                type="text"
                value={hora}
                onChange={(e) => setHora(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ej. 03:30 p. m."
              />
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={handleDelete}
              className="px-3.5 py-2 text-rose-600 hover:bg-rose-50 rounded-xl text-xs font-bold border border-rose-200 flex items-center gap-1.5 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Eliminar Evidencia
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm transition-colors flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                Guardar Cambios
              </button>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}