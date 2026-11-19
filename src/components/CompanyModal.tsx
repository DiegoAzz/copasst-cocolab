'use client';

import React, { useState } from 'react';
import { Building2, Check, X, Shield } from 'lucide-react';
import { CompanyProfile } from '@/types';
import { calcularEstructuraCopasst, calcularEstructuraCocolab } from '@/lib/colombianLaw';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  company: CompanyProfile;
  onSave: (company: CompanyProfile) => void;
}

export default function CompanyModal({ isOpen, onClose, company, onSave }: Props) {
  const [formData, setFormData] = useState<CompanyProfile>(company);

  if (!isOpen) return null;

  const copasstReq = calcularEstructuraCopasst(formData.totalTrabajadores);
  const cocolabReq = calcularEstructuraCocolab(formData.totalTrabajadores);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl border border-blue-200/60">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                Perfil de Empresa & Parámetros Legales
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                  SG-SST
                </span>
              </h3>
              <p className="text-xs text-slate-500">Decreto 1072/2015 & Resolución 0312/2019</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto flex-1 text-slate-700">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Razón Social de la Empresa *
              </label>
              <input
                type="text"
                required
                value={formData.razonSocial}
                onChange={(e) => setFormData({ ...formData, razonSocial: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">NIT con Dígito de Verificación *</label>
              <input
                type="text"
                required
                value={formData.nit}
                onChange={(e) => setFormData({ ...formData, nit: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm font-mono text-slate-900 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">ARL Afiliada *</label>
              <input
                type="text"
                required
                value={formData.arl}
                onChange={(e) => setFormData({ ...formData, arl: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Nivel de Riesgo de la Empresa (I a V) *
              </label>
              <select
                value={formData.nivelRiesgo}
                onChange={(e) => setFormData({ ...formData, nivelRiesgo: Number(e.target.value) as any })}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-blue-500"
              >
                <option value={1}>Clase I (Riesgo Mínimo - Comercial, Oficinas)</option>
                <option value={2}>Clase II (Riesgo Bajo - Manufactura liviana)</option>
                <option value={3}>Clase III (Riesgo Medio - Transporte, Almacenamiento)</option>
                <option value={4}>Clase IV (Riesgo Alto - Industria pesada, Químicos)</option>
                <option value={5}>Clase V (Riesgo Máximo - Minería, Construcción)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Total Trabajadores Vinculados *
              </label>
              <input
                type="number"
                min={1}
                max={50000}
                required
                value={formData.totalTrabajadores}
                onChange={(e) => setFormData({ ...formData, totalTrabajadores: Number(e.target.value) || 1 })}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm font-mono text-blue-700 font-bold focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Legal Calculation Box */}
          <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-xl space-y-3">
            <h4 className="text-xs font-bold text-blue-800 flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-blue-600" />
              Determinación Legal Automática de Comités (Decreto 1072 & Res. 2013)
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-white rounded-lg border border-blue-200/80 shadow-sm">
                <span className="font-bold text-slate-900 block mb-1">
                  {copasstReq.esVigia ? 'Vigía de SST' : 'COPASST'}
                </span>
                <p className="text-slate-600 text-[11px] mb-1.5">{copasstReq.textoNormativo}</p>
                <p className="text-[10px] text-blue-600 font-mono">{copasstReq.articulado}</p>
              </div>

              <div className="p-3 bg-white rounded-lg border border-blue-200/80 shadow-sm">
                <span className="font-bold text-slate-900 block mb-1">COCOLAB</span>
                <p className="text-slate-600 text-[11px] mb-1.5">{cocolabReq.textoNormativo}</p>
                <p className="text-[10px] text-blue-600 font-mono">{cocolabReq.articulado}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Sede Principal</label>
              <input
                type="text"
                value={formData.sedePrincipal}
                onChange={(e) => setFormData({ ...formData, sedePrincipal: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Dirección y Ciudad</label>
              <input
                type="text"
                value={formData.direccion}
                onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Representante Legal</label>
              <input
                type="text"
                value={formData.representanteLegal}
                onChange={(e) => setFormData({ ...formData, representanteLegal: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Responsable SG-SST & Licencia
              </label>
              <input
                type="text"
                value={formData.responsableSST}
                onChange={(e) => setFormData({ ...formData, responsableSST: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg border border-slate-300 transition-colors shadow-sm"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-sm flex items-center gap-1.5 transition-all"
            >
              <Check className="w-4 h-4" />
              Guardar Configuración
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
