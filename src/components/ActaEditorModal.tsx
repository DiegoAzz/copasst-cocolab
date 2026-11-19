'use client';

import React, { useState } from 'react';
import { FileText, Plus, Trash2, Check, X, PenTool, Calendar, Download } from 'lucide-react';
import { Acta, AsistenteActa, CompromisoActa, PuntoOrdenDia, TipoActa, Member, Evidence, CompanyProfile } from '@/types';
import SignaturePad from './SignaturePad';
import { exportarActaPDF } from '@/lib/pdfGenerator';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (acta: Acta) => void;
  members: Member[];
  evidences: Evidence[];
  company: CompanyProfile;
  initialActa?: Acta;
}

export default function ActaEditorModal({
  isOpen,
  onClose,
  onSave,
  members,
  evidences,
  company,
  initialActa,
}: Props) {
  const isEditing = Boolean(initialActa);

  // Form State
  const [comite, setComite] = useState<'COPASST' | 'COCOLAB' | 'VIGIA' | 'CONJUNTO'>(initialActa?.comite || 'COPASST');
  const [tipo, setTipo] = useState<TipoActa>(initialActa?.tipo || 'ordinaria_copasst');
  const [consecutivo, setConsecutivo] = useState(
    initialActa?.consecutivo || (comite === 'COPASST' ? `ACTA-COP-${new Date().getFullYear()}-012` : `ACTA-COL-${new Date().getFullYear()}-004`)
  );
  const [titulo, setTitulo] = useState(
    initialActa?.titulo || `Reunión Ordinaria Mensual de COPASST - ${new Date().toLocaleString('es-CO', { month: 'long', year: 'numeric' })}`
  );
  const [fecha, setFecha] = useState(initialActa?.fecha || new Date().toISOString().split('T')[0]);
  const [horaInicio, setHoraInicio] = useState(initialActa?.horaInicio || '08:30 AM');
  const [horaFin, setHoraFin] = useState(initialActa?.horaFin || '10:30 AM');
  const [lugar, setLugar] = useState(initialActa?.lugar || 'Sala de Juntas Principal & Enlace Virtual');

  // Asistentes
  const [asistentes, setAsistentes] = useState<AsistenteActa[]>(() => {
    if (initialActa?.asistentes) return initialActa.asistentes;
    const filtered = members.filter(m => m.comite === comite);
    return filtered.map(m => ({
      nombre: m.nombre,
      cedula: m.cedula,
      cargo: m.cargo,
      rolEnComite: m.rol,
      representacion: m.representacion,
      asistio: true,
    }));
  });

  // Orden del día
  const [ordenDelDia, setOrdenDelDia] = useState<string[]>(
    initialActa?.ordenDelDia || [
      '1. Verificación del quórum reglamentario y lectura del orden del día.',
      '2. Revisión del estado de compromisos del acta anterior.',
      '3. Análisis estadístico de accidentalidad, incidentes y condiciones de salud.',
      '4. Resultados de inspecciones de seguridad en terreno y evidencias fotográficas.',
      '5. Asignación de nuevos compromisos y fijación de próxima reunión.',
    ]
  );
  const [nuevoPuntoOrden, setNuevoPuntoOrden] = useState('');

  // Desarrollo de puntos
  const [desarrolloPuntos, setDesarrolloPuntos] = useState<PuntoOrdenDia[]>(
    initialActa?.desarrolloPuntos || [
      {
        punto: '1. Verificación del Quórum',
        desarrollo: 'Se verificó la asistencia de los representantes requeridos por la ley, declarando quórum deliberatorio y decisorio.',
      },
      {
        punto: '2. Revisión de Compromisos Anteriores',
        desarrollo: 'Se revisaron las tareas acordadas en la sesión previa, registrando cumplimiento satisfactorio.',
      },
      {
        punto: '3. Análisis de Accidentalidad y Reportes',
        desarrollo: 'No se presentaron accidentes incapacitantes en el periodo evaluado. Se revisaron condiciones inseguras.',
      },
      {
        punto: '4. Inspección de Terreno y Evidencias',
        desarrollo: 'Se analizaron las fotos capturadas en bodega y áreas comunes para priorizar el mantenimiento locativo.',
      },
    ]
  );

  // Compromisos
  const [compromisos, setCompromisos] = useState<CompromisoActa[]>(
    initialActa?.compromisos || [
      {
        id: 'c-' + Date.now(),
        descripcion: 'Realizar mantenimiento correctivo en área identificada durante la inspección.',
        responsable: 'Líder de Mantenimiento',
        fechaLimite: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
        estado: 'pendiente',
      },
    ]
  );
  const [nuevaTareaDesc, setNuevaTareaDesc] = useState('');
  const [nuevaTareaResp, setNuevaTareaResp] = useState('');
  const [nuevaTareaFecha, setNuevaTareaFecha] = useState('');

  // Evidencias adjuntas
  const [evidenciasIds, setEvidenciasIds] = useState<string[]>(initialActa?.evidenciasIds || []);

  // Firmas
  const [firmas, setFirmas] = useState(initialActa?.firmasDigitales || []);
  const [activeSigner, setActiveSigner] = useState<{ index: number; nombre: string; rol: string } | null>(null);

  // Tab
  const [activeTab, setActiveTab] = useState<'general' | 'asistentes' | 'orden' | 'desarrollo' | 'compromisos' | 'evidencias' | 'firmas'>('general');

  const handleComiteChange = (nuevoComite: 'COPASST' | 'COCOLAB' | 'VIGIA' | 'CONJUNTO') => {
    setComite(nuevoComite);
    const year = new Date().getFullYear();
    const prefix = nuevoComite === 'COPASST' ? `ACTA-COP-${year}` : nuevoComite === 'COCOLAB' ? `ACTA-COL-${year}` : nuevoComite === 'VIGIA' ? `ACTA-VIG-${year}` : `ACTA-CONJ-${year}`;
    setConsecutivo(`${prefix}-001`);
    setTitulo(
      nuevoComite === 'COPASST'
        ? `Reunión Ordinaria Mensual de COPASST - ${new Date().toLocaleString('es-CO', { month: 'long', year: 'numeric' })}`
        : `Reunión Ordinaria Trimestral de COCOLAB - ${new Date().toLocaleString('es-CO', { month: 'long', year: 'numeric' })}`
    );

    const filtered = members.filter(m => m.comite === nuevoComite);
    setAsistentes(filtered.map(m => ({
      nombre: m.nombre,
      cedula: m.cedula,
      cargo: m.cargo,
      rolEnComite: m.rol,
      representacion: m.representacion,
      asistio: true,
    })));
  };

  const agregarPuntoOrden = () => {
    if (!nuevoPuntoOrden.trim()) return;
    const num = ordenDelDia.length + 1;
    const texto = `${num}. ${nuevoPuntoOrden.trim()}`;
    setOrdenDelDia([...ordenDelDia, texto]);
    setDesarrolloPuntos([
      ...desarrolloPuntos,
      { punto: texto, desarrollo: 'Detalle de la deliberación acordada por el comité...' },
    ]);
    setNuevoPuntoOrden('');
  };

  const eliminarPuntoOrden = (idx: number) => {
    const newOrden = ordenDelDia.filter((_, i) => i !== idx);
    const newDes = desarrolloPuntos.filter((_, i) => i !== idx);
    setOrdenDelDia(newOrden);
    setDesarrolloPuntos(newDes);
  };

  const agregarCompromiso = () => {
    if (!nuevaTareaDesc.trim() || !nuevaTareaResp.trim()) return;
    const item: CompromisoActa = {
      id: 'c-' + Date.now(),
      descripcion: nuevaTareaDesc.trim(),
      responsable: nuevaTareaResp.trim(),
      fechaLimite: nuevaTareaFecha || new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
      estado: 'pendiente',
    };
    setCompromisos([...compromisos, item]);
    setNuevaTareaDesc('');
    setNuevaTareaResp('');
    setNuevaTareaFecha('');
  };

  const toggleEvidencia = (id: string) => {
    setEvidenciasIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const handleSaveActa = () => {
    if (!consecutivo.trim() || !titulo.trim()) {
      alert('Por favor ingresa consecutivo y título del acta.');
      return;
    }

    const actaToSave: Acta = {
      id: initialActa?.id || 'acta-' + Date.now(),
      consecutivo: consecutivo.trim(),
      tipo,
      comite,
      titulo: titulo.trim(),
      fecha,
      horaInicio,
      horaFin,
      lugar,
      asistentes,
      ordenDelDia,
      desarrolloPuntos,
      compromisos,
      evidenciasIds,
      firmasDigitales: firmas,
      estado: 'aprobada',
      creadoPor: company.responsableSST || 'Secretaría del Comité',
      createdAt: initialActa?.createdAt || new Date().toISOString(),
    };

    onSave(actaToSave);
    onClose();
  };

  const handleExportQuickPDF = () => {
    const tempActa: Acta = {
      id: initialActa?.id || 'temp-' + Date.now(),
      consecutivo: consecutivo.trim(),
      tipo,
      comite,
      titulo: titulo.trim(),
      fecha,
      horaInicio,
      horaFin,
      lugar,
      asistentes,
      ordenDelDia,
      desarrolloPuntos,
      compromisos,
      evidenciasIds,
      firmasDigitales: firmas,
      estado: 'aprobada',
      creadoPor: company.responsableSST || 'Secretaría del Comité',
      createdAt: new Date().toISOString(),
    };
    exportarActaPDF(tempActa, company, evidences);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[94vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl border border-blue-200/60">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                {isEditing ? 'Editar Acta Oficial' : 'Generador Oficial de Actas'}
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 font-mono font-bold">
                  {consecutivo}
                </span>
              </h3>
              <p className="text-xs text-slate-500">
                Conforme al Decreto 1072/2015, Resolución 2013/1986 y Resolución 652/2012
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 px-6 py-2.5 bg-slate-100/70 border-b border-slate-200 overflow-x-auto text-xs font-semibold">
          {[
            { id: 'general', label: '1. Datos Generales' },
            { id: 'asistentes', label: `2. Asistentes (${asistentes.length})` },
            { id: 'orden', label: `3. Orden del Día (${ordenDelDia.length})` },
            { id: 'desarrollo', label: '4. Deliberación y Desarrollo' },
            { id: 'compromisos', label: `5. Compromisos (${compromisos.length})` },
            { id: 'evidencias', label: `6. Evidencias Fotos (${evidenciasIds.length})` },
            { id: 'firmas', label: '7. Firmas' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white font-bold shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4 text-slate-700">
          {activeTab === 'general' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Comité</label>
                  <select
                    value={comite}
                    onChange={(e) => handleComiteChange(e.target.value as any)}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-blue-500"
                  >
                    <option value="COPASST">COPASST (Seguridad y Salud)</option>
                    <option value="COCOLAB">COCOLAB (Convivencia Laboral)</option>
                    <option value="VIGIA">Vigía de SST</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Tipo de Acta</label>
                  <select
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value as TipoActa)}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-blue-500"
                  >
                    <option value="ordinaria_copasst">Acta Ordinaria Mensual</option>
                    <option value="extraordinaria_copasst">Acta Extraordinaria (Emergencia/Accidente)</option>
                    <option value="inspeccion_copasst">Acta de Inspección de Seguridad</option>
                    <option value="investigacion_copasst">Acta de Investigación de Accidente</option>
                    <option value="ordinaria_cocolab">Acta Ordinaria Trimestral COCOLAB</option>
                    <option value="conciliacion_cocolab">Acta de Concertación / Convivencia</option>
                    <option value="posesion_comite">Acta de Posesión y Conformación</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Consecutivo / Foliación *
                  </label>
                  <input
                    type="text"
                    value={consecutivo}
                    onChange={(e) => setConsecutivo(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm font-mono text-blue-700 font-bold focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Título del Acta *</label>
                <input
                  type="text"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Fecha</label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="date"
                      value={fecha}
                      onChange={(e) => setFecha(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Horario (Inicio - Fin)</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={horaInicio}
                      onChange={(e) => setHoraInicio(e.target.value)}
                      placeholder="Inicio"
                      className="w-1/2 px-2.5 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900"
                    />
                    <input
                      type="text"
                      value={horaFin}
                      onChange={(e) => setHoraFin(e.target.value)}
                      placeholder="Fin"
                      className="w-1/2 px-2.5 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Lugar / Medio</label>
                  <input
                    type="text"
                    value={lugar}
                    onChange={(e) => setLugar(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'asistentes' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-500">
                  Lista de verificación de quórum reglamentario según Resolución 2013/1986 o Res. 652/2012:
                </p>
                <button
                  type="button"
                  onClick={() => {
                    const nuevo: AsistenteActa = {
                      nombre: '',
                      cedula: '',
                      cargo: '',
                      rolEnComite: 'Invitado',
                      representacion: 'Invitado / Asesor',
                      asistio: true,
                    };
                    setAsistentes([...asistentes, nuevo]);
                  }}
                  className="px-3 py-1 bg-white hover:bg-slate-50 text-blue-600 text-xs font-semibold rounded-lg border border-slate-300 flex items-center gap-1 shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Añadir Asistente / Invitado
                </button>
              </div>

              <div className="space-y-2">
                {asistentes.map((a, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                  >
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 flex-1 w-full">
                      <input
                        type="text"
                        value={a.nombre}
                        onChange={(e) => {
                          const updated = [...asistentes];
                          updated[idx].nombre = e.target.value;
                          setAsistentes(updated);
                        }}
                        placeholder="Nombre completo"
                        className="px-2.5 py-1.5 bg-white border border-slate-300 rounded text-xs text-slate-900"
                      />
                      <input
                        type="text"
                        value={a.cedula}
                        onChange={(e) => {
                          const updated = [...asistentes];
                          updated[idx].cedula = e.target.value;
                          setAsistentes(updated);
                        }}
                        placeholder="Cédula"
                        className="px-2.5 py-1.5 bg-white border border-slate-300 rounded text-xs text-slate-900"
                      />
                      <input
                        type="text"
                        value={a.cargo}
                        onChange={(e) => {
                          const updated = [...asistentes];
                          updated[idx].cargo = e.target.value;
                          setAsistentes(updated);
                        }}
                        placeholder="Cargo en empresa"
                        className="px-2.5 py-1.5 bg-white border border-slate-300 rounded text-xs text-slate-900"
                      />
                      <input
                        type="text"
                        value={a.rolEnComite}
                        onChange={(e) => {
                          const updated = [...asistentes];
                          updated[idx].rolEnComite = e.target.value;
                          setAsistentes(updated);
                        }}
                        placeholder="Rol en comité"
                        className="px-2.5 py-1.5 bg-white border border-slate-300 rounded text-xs text-slate-900"
                      />
                    </div>
                    <div className="flex items-center gap-3 self-end sm:self-center">
                      <label className="flex items-center gap-1.5 text-xs text-slate-700 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={a.asistio}
                          onChange={(e) => {
                            const updated = [...asistentes];
                            updated[idx].asistio = e.target.checked;
                            setAsistentes(updated);
                          }}
                          className="rounded text-blue-600"
                        />
                        Asistió
                      </label>
                      <button
                        type="button"
                        onClick={() => setAsistentes(asistentes.filter((_, i) => i !== idx))}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'orden' && (
            <div className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={nuevoPuntoOrden}
                  onChange={(e) => setNuevoPuntoOrden(e.target.value)}
                  placeholder="Escribe un nuevo punto para el orden del día..."
                  className="flex-1 px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={agregarPuntoOrden}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg flex items-center gap-1 shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  Agregar
                </button>
              </div>

              <div className="space-y-2">
                {ordenDelDia.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                  >
                    <span className="font-medium text-slate-800">{item}</span>
                    <button
                      type="button"
                      onClick={() => eliminarPuntoOrden(idx)}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'desarrollo' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-500">
                Redacta el contenido y conclusiones alcanzadas en cada punto del orden del día:
              </p>
              {desarrolloPuntos.map((p, idx) => (
                <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <h4 className="text-xs font-bold text-blue-700">{p.punto}</h4>
                  <textarea
                    rows={3}
                    value={p.desarrollo}
                    onChange={(e) => {
                      const updated = [...desarrolloPuntos];
                      updated[idx].desarrollo = e.target.value;
                      setDesarrolloPuntos(updated);
                    }}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-blue-500 resize-none"
                  />
                </div>
              ))}
            </div>
          )}

          {activeTab === 'compromisos' && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <h4 className="text-xs font-bold text-slate-800">Nuevo Compromiso / Tarea</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <input
                    type="text"
                    value={nuevaTareaDesc}
                    onChange={(e) => setNuevaTareaDesc(e.target.value)}
                    placeholder="Descripción de la tarea o acción correctiva"
                    className="sm:col-span-1 px-3 py-1.5 bg-white border border-slate-300 rounded text-xs text-slate-900"
                  />
                  <input
                    type="text"
                    value={nuevaTareaResp}
                    onChange={(e) => setNuevaTareaResp(e.target.value)}
                    placeholder="Responsable asignado"
                    className="px-3 py-1.5 bg-white border border-slate-300 rounded text-xs text-slate-900"
                  />
                  <div className="flex gap-2">
                    <input
                      type="date"
                      value={nuevaTareaFecha}
                      onChange={(e) => setNuevaTareaFecha(e.target.value)}
                      className="flex-1 px-2 py-1.5 bg-white border border-slate-300 rounded text-xs text-slate-900"
                    />
                    <button
                      type="button"
                      onClick={agregarCompromiso}
                      className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded flex items-center gap-1 shadow-sm"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Añadir
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                {compromisos.map((c, idx) => (
                  <div
                    key={c.id || idx}
                    className="p-3.5 bg-white border border-slate-200 rounded-xl flex items-center justify-between text-xs gap-3 shadow-sm"
                  >
                    <div className="space-y-1">
                      <p className="font-semibold text-slate-900">{c.descripcion}</p>
                      <div className="flex items-center gap-4 text-slate-500 text-[11px]">
                        <span>👤 {c.responsable}</span>
                        <span>📅 Límite: {c.fechaLimite}</span>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            c.estado === 'cumplido'
                              ? 'bg-emerald-100 text-emerald-800'
                              : c.estado === 'en_proceso'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {c.estado}
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setCompromisos(compromisos.filter((_, i) => i !== idx))}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'evidencias' && (
            <div className="space-y-3">
              <p className="text-xs text-slate-500">
                Selecciona las evidencias fotográficas capturadas en terreno para anexarlas automáticamente a esta acta oficial:
              </p>
              {evidences.length === 0 ? (
                <div className="p-8 text-center text-slate-400 border border-dashed border-slate-300 rounded-xl">
                  No hay fotografías registradas aún en el sistema. Puedes tomarlas en el módulo de Evidencias.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {evidences.map((ev) => {
                    const isSelected = evidenciasIds.includes(ev.id);
                    return (
                      <div
                        key={ev.id}
                        onClick={() => toggleEvidencia(ev.id)}
                        className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                          isSelected
                            ? 'bg-blue-50/70 border-blue-500 shadow-sm ring-1 ring-blue-500/30'
                            : 'bg-white border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="w-16 h-16 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 flex-shrink-0">
                          <img src={ev.imagenAntes} alt={ev.titulo} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1">
                            <h4 className="text-xs font-bold text-slate-900 truncate">{ev.titulo}</h4>
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => {}}
                              className="rounded text-blue-600"
                            />
                          </div>
                          <p className="text-[11px] text-slate-500 truncate">{ev.peligroGTC45}</p>
                          <p className="text-[10px] text-blue-600 font-semibold mt-1">
                            {ev.areaLugar} • {ev.fecha}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {activeTab === 'firmas' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-500">
                Firmas electrónicas / digitales de los miembros acreditados:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {asistentes
                  .filter((a) => a.asistio)
                  .map((asistente, idx) => {
                    const firmaExistente = firmas.find((f) => f.nombre === asistente.nombre);
                    return (
                      <div
                        key={idx}
                        className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3"
                      >
                        <div>
                          <h4 className="text-xs font-bold text-slate-900">{asistente.nombre}</h4>
                          <p className="text-[11px] text-blue-700 font-semibold">
                            {asistente.rolEnComite} ({asistente.representacion})
                          </p>
                          <p className="text-[10px] text-slate-500">C.C. {asistente.cedula}</p>
                        </div>

                        {firmaExistente?.firmaBase64 ? (
                          <div className="p-2 bg-white rounded-lg border border-slate-300">
                            <img
                              src={firmaExistente.firmaBase64}
                              alt="Firma"
                              className="w-full h-16 object-contain"
                            />
                            <p className="text-[9px] text-slate-500 text-center mt-1">
                              Firmado: {firmaExistente.fechaFirma}
                            </p>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() =>
                              setActiveSigner({
                                index: idx,
                                nombre: asistente.nombre,
                                rol: asistente.rolEnComite,
                              })
                            }
                            className="w-full py-2 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg text-xs font-semibold text-blue-600 flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                          >
                            <PenTool className="w-3.5 h-3.5" />
                            Firmar en Pantalla
                          </button>
                        )}
                      </div>
                    );
                  })}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-t border-slate-200">
          <button
            type="button"
            onClick={handleExportQuickPDF}
            className="px-3.5 py-2 bg-white hover:bg-slate-100 text-blue-600 border border-slate-300 text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-sm transition-all"
            title="Descargar vista previa en PDF"
          >
            <Download className="w-3.5 h-3.5" />
            Descargar PDF
          </button>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg border border-slate-300 transition-colors shadow-sm"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleSaveActa}
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-sm flex items-center gap-1.5 transition-all"
            >
              <Check className="w-4 h-4" />
              Guardar y Foliar Acta
            </button>
          </div>
        </div>
      </div>

      {activeSigner && (
        <SignaturePad
          isOpen={Boolean(activeSigner)}
          signerName={activeSigner.nombre}
          signerRole={activeSigner.rol}
          onClose={() => setActiveSigner(null)}
          onSave={(dataUrl) => {
            const now = new Date().toLocaleString('es-CO');
            const newFirma = {
              nombre: activeSigner.nombre,
              cargo: activeSigner.rol,
              rol: activeSigner.rol,
              firmaBase64: dataUrl,
              fechaFirma: now,
            };
            setFirmas(prev => [...prev.filter(f => f.nombre !== activeSigner.nombre), newFirma]);
          }}
        />
      )}
    </div>
  );
}
