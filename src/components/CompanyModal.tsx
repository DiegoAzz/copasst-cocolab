'use client';

import React, { useState } from 'react';
import { Building2, Check, X, Shield, Users, Info } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-slate-800/90 border-b border-slate-700">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-sky-500/10 text-sky-400 rounded-lg border border-sky-500/20">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                Perfil de Empresa & Parámetros Legales
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-sky-500/15 text-sky-400 border border-sky-500/20">
                  SG-SST
                </span>
              </h3>
              <p className="text-xs text-slate-400">Decreto 1072/2015 & Resolución 0312/2019</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 overflow-y-auto flex-1 text-slate-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Razón Social de la Empresa *
              </label>
              <input
                type="text"
                required
                value={formData.razonSocial}
                onChange={(e) => setFormData({ ...formData, razonSocial: e.target.value })}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-sky-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">NIT con Dígito de Verificación *</label>
              <input
                type="text"
                required
                value={formData.nit}
                onChange={(e) => setFormData({ ...formData, nit: e.target.value })}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm font-mono text-white focus:outline-none focus:border-sky-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">ARL Afiliada *</label>
              <input
                type="text"
                required
                value={formData.arl}
                onChange={(e) => setFormData({ ...formData, arl: e.target.value })}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-sky-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Nivel de Riesgo de la Empresa (I a V) *
              </label>
              <select
                value={formData.nivelRiesgo}
                onChange={(e) => setFormData({ ...formData, nivelRiesgo: Number(e.target.value) as any })}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-sky-500"
              >
                <option value={1}>Clase I (Riesgo Mínimo - Comercial, Oficinas)</option>
                <option value={2}>Clase II (Riesgo Bajo - Manufactura liviana)</option>
                <option value={3}>Clase III (Riesgo Medio - Transporte, Almacenamiento)</option>
                <option value={4}>Clase IV (Riesgo Alto - Industria pesada, Químicos)</option>
                <option value={5}>Clase V (Riesgo Máximo - Minería, Construcción)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Total Trabajadores Vinculados *
              </label>
              <input
                type="number"
                min={1}
                max={50000}
                required
                value={formData.totalTrabajadores}
                onChange={(e) => setFormData({ ...formData, totalTrabajadores: Number(e.target.value) || 1 })}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm font-mono text-sky-400 font-bold focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>

          {/* Legal Calculation Box */}
          <div className="p-4 bg-sky-950/40 border border-sky-500/30 rounded-xl space-y-3">
            <h4 className="text-xs font-bold text-sky-400 flex items-center gap-1.5">
              <Shield className="w-4 h-4" />
              Determinación Legal Automática de Comités (Decreto 1072 & Res. 2013)
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-700">
                <span className="font-bold text-white block mb-1">
                  {copasstReq.esVigia ? 'Vigía de SST' : 'COPASST'}
                </span>
                <p className="text-slate-300 text-[11px] mb-1.5">{copasstReq.textoNormativo}</p>
                <p className="text-[10px] text-sky-400 font-mono">{copasstReq.articulado}</p>
              </div>

              <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-700">
                <span className="font-bold text-white block mb-1">COCOLAB</span>
                <p className="text-slate-300 text-[11px] mb-1.5">{cocolabReq.textoNormativo}</p>
                <p className="text-[10px] text-sky-400 font-mono">{cocolabReq.articulado}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Sede Principal</label>
              <input
                type="text"
                value={formData.sedePrincipal}
                onChange={(e) => setFormData({ ...formData, sedePrincipal: e.target.value })}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-sky-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Dirección y Ciudad</label>
              <input
                type="text"
                value={formData.direccion}
                onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-sky-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Representante Legal</label>
              <input
                type="text"
                value={formData.representanteLegal}
                onChange={(e) => setFormData({ ...formData, representanteLegal: e.target.value })}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-sky-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Responsable SG-SST & Licencia
              </label>
              <input
                type="text"
                value={formData.responsableSST}
                onChange={(e) => setFormData({ ...formData, responsableSST: e.target.value })}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-lg"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-bold rounded-lg shadow-lg flex items-center gap-1.5"
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
