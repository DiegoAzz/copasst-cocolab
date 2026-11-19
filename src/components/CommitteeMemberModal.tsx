'use client';

import React, { useState, useEffect } from 'react';
import { 
  UserCheck, 
  X, 
  ShieldAlert, 
  HeartHandshake, 
  Plus, 
  Trash2, 
  Edit2, 
  Check, 
  Building2, 
  Users, 
  Calendar,
  AlertCircle
} from 'lucide-react';
import { Member, Empleado } from '@/types';
import { storage } from '@/lib/storage';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialComite?: 'COPASST' | 'COCOLAB';
  memberToEdit?: Member | null;
  onMemberSaved: () => void;
}

export default function CommitteeMemberModal({
  isOpen,
  onClose,
  initialComite = 'COPASST',
  memberToEdit = null,
  onMemberSaved,
}: Props) {
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [selectedEmpleadoId, setSelectedEmpleadoId] = useState<string>('');
  const [comite, setComite] = useState<'COPASST' | 'COCOLAB'>(initialComite);
  const [representacion, setRepresentacion] = useState<'Empleador' | 'Trabajadores'>('Trabajadores');
  const [rol, setRol] = useState<'Presidente' | 'Secretario' | 'Vocal / Miembro'>('Vocal / Miembro');
  const [condicion, setCondicion] = useState<'Principal' | 'Suplente'>('Principal');
  const [fechaPosesion, setFechaPosesion] = useState<string>('2026-06-25');
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      const emps = storage.getEmpleados();
      setEmpleados(emps);

      if (memberToEdit) {
        setEditingId(memberToEdit.id);
        setComite(memberToEdit.comite as 'COPASST' | 'COCOLAB');
        setRepresentacion(memberToEdit.representacion);
        setRol(memberToEdit.rol as any);
        setCondicion(memberToEdit.condicion);
        setFechaPosesion(memberToEdit.fechaPosesion || '2026-06-25');

        const found = emps.find(e => e.cedula === memberToEdit.cedula || e.nombre === memberToEdit.nombre);
        if (found) {
          setSelectedEmpleadoId(found.id);
        }
      } else {
        setEditingId(null);
        setComite(initialComite);
        setRepresentacion('Trabajadores');
        setRol('Vocal / Miembro');
        setCondicion('Principal');
        setFechaPosesion('2026-06-25');
        setSelectedEmpleadoId('');
      }
    }
  }, [isOpen, memberToEdit, initialComite]);

  if (!isOpen) return null;

  const currentMembers = storage.getMembers();
  const selectedEmp = empleados.find(e => e.id === selectedEmpleadoId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEmp && !editingId) {
      alert('Por favor selecciona un colaborador del censo de SYSNET.');
      return;
    }

    const emp = selectedEmp || empleados.find(e => e.id === selectedEmpleadoId);
    if (!emp && !memberToEdit) {
      alert('Empleado no válido.');
      return;
    }

    const memberData: Member = {
      id: editingId || `m_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      nombre: emp ? emp.nombre : (memberToEdit?.nombre || ''),
      cedula: emp ? emp.cedula : (memberToEdit?.cedula || ''),
      cargo: emp ? emp.cargo : (memberToEdit?.cargo || ''),
      comite,
      representacion,
      rol,
      condicion,
      email: emp?.email || memberToEdit?.email || '',
      telefono: emp?.telefono || memberToEdit?.telefono || '',
      fechaPosesion,
    };

    let updated: Member[];
    if (editingId) {
      updated = currentMembers.map(m => m.id === editingId ? memberData : m);
    } else {
      // Check if already in this committee
      const exists = currentMembers.some(m => m.cedula === memberData.cedula && m.comite === comite);
      if (exists) {
        if (!confirm(`El colaborador ${memberData.nombre} ya está asignado al ${comite}. ¿Deseas actualizar su asignación?`)) {
          return;
        }
        updated = currentMembers.map(m => (m.cedula === memberData.cedula && m.comite === comite) ? memberData : m);
      } else {
        updated = [...currentMembers, memberData];
      }
    }

    storage.saveMembers(updated);
    onMemberSaved();
    onClose();
  };

  const handleDelete = () => {
    if (!editingId) return;
    if (confirm('¿Estás seguro de que deseas retirar a este miembro del comité? (Seguirá existiendo en el censo de empleados de SYSNET).')) {
      const updated = currentMembers.filter(m => m.id !== editingId);
      storage.saveMembers(updated);
      onMemberSaved();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl border ${comite === 'COPASST' ? 'bg-blue-50 text-blue-600 border-blue-200' : 'bg-rose-50 text-rose-600 border-rose-200'}`}>
              {comite === 'COPASST' ? <ShieldAlert className="w-5 h-5" /> : <HeartHandshake className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                {editingId ? 'Editar Miembro de Comité' : 'Asignar Miembro a Comité'}
              </h3>
              <p className="text-xs text-slate-500">
                Selecciona la persona y define su cargo formal en el comité
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
          
          {/* 1. Seleccionar Comité */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              1. Comité Destino <span className="text-rose-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setComite('COPASST')}
                className={`py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                  comite === 'COPASST'
                    ? 'bg-blue-50 text-blue-800 border-blue-400 shadow-xs ring-1 ring-blue-500/20'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <ShieldAlert className="w-4 h-4 text-blue-600" />
                COPASST (Seguridad)
              </button>
              <button
                type="button"
                onClick={() => setComite('COCOLAB')}
                className={`py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                  comite === 'COCOLAB'
                    ? 'bg-rose-50 text-rose-800 border-rose-400 shadow-xs ring-1 ring-rose-500/20'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <HeartHandshake className="w-4 h-4 text-rose-600" />
                COCOLAB (Convivencia)
              </button>
            </div>
          </div>

          {/* 2. Seleccionar Colaborador del Censo de SYSNET */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              2. Seleccionar Empleado de SYSNET ({empleados.length} en censo) <span className="text-rose-500">*</span>
            </label>
            <select
              value={selectedEmpleadoId}
              onChange={(e) => setSelectedEmpleadoId(e.target.value)}
              required={!editingId}
              className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- Elige un empleado del censo oficial --</option>
              {empleados.map((emp) => (
                <option key={emp.id} value={emp.id}>
                  {emp.nombre} — C.C. {emp.cedula} ({emp.cargo || 'Sin cargo'})
                </option>
              ))}
            </select>
            {selectedEmp && (
              <div className="mt-2 p-2.5 bg-blue-50/70 border border-blue-200/80 rounded-xl text-xs space-y-1">
                <div className="font-bold text-blue-900">{selectedEmp.nombre}</div>
                <div className="text-[11px] text-blue-700">
                  C.C. {selectedEmp.cedula} • EPS: {selectedEmp.eps || 'N/A'} • Cargo: {selectedEmp.cargo}
                </div>
                <div className="text-[10px] text-slate-500">{selectedEmp.email}</div>
              </div>
            )}
          </div>

          {/* 3. Representación y Condición */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                3. Representación Legal <span className="text-rose-500">*</span>
              </label>
              <select
                value={representacion}
                onChange={(e) => setRepresentacion(e.target.value as any)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Trabajadores">Trabajadores (Votación 20 de Junio)</option>
                <option value="Empleador">Empleador (Designado por Gerencia)</option>
              </select>
              <p className="text-[10px] text-slate-400 mt-1">
                {representacion === 'Trabajadores' 
                  ? 'Elegido por los empleados mediante sufragio libre y secreto.' 
                  : 'Designado directamente por el representante legal de SYSNET.'}
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Condición <span className="text-rose-500">*</span>
              </label>
              <select
                value={condicion}
                onChange={(e) => setCondicion(e.target.value as any)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Principal">Principal (Asiste con voz y voto regular)</option>
                <option value="Suplente">Suplente (Reemplaza en caso de ausencia)</option>
              </select>
            </div>
          </div>

          {/* 4. Rol / Cargo en el Comité */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                4. Rol / Cargo en el Comité <span className="text-rose-500">*</span>
              </label>
              <select
                value={rol}
                onChange={(e) => setRol(e.target.value as any)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold"
              >
                <option value="Presidente">Presidente del Comité</option>
                <option value="Secretario">Secretario del Comité</option>
                <option value="Vocal / Miembro">Vocal / Miembro</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Fecha de Elección / Posesión
              </label>
              <input
                type="date"
                value={fechaPosesion}
                onChange={(e) => setFechaPosesion(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-[10px] text-slate-400 mt-1">
                Escrutinio / posesión (25 de junio de 2026)
              </p>
            </div>
          </div>

          {/* Legal Reminder Alert */}
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2.5 text-xs text-amber-800">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div className="leading-relaxed text-[11px]">
              <strong>Normativa Colombiana (Dec. 1072/15 & Res. 2013/86):</strong>
              <br />
              • El <strong>Presidente</strong> convoca y lidera las sesiones mensuales.
              <br />
              • El <strong>Secretario</strong> redacta y custodia las actas foliadas.
              <br />
              • Dispondrán de <strong>4 horas semanales</strong> remuneradas dentro de su jornada laboral para tareas del comité.
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-200">
            {editingId ? (
              <button
                type="button"
                onClick={handleDelete}
                className="flex items-center gap-1.5 px-3 py-2 text-rose-600 hover:bg-rose-50 rounded-xl text-xs font-bold border border-rose-200 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Retirar del Comité
              </button>
            ) : <div />}

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
                {editingId ? 'Guardar Cambios' : 'Asignar al Comité'}
              </button>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}