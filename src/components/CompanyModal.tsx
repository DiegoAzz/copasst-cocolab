'use client';

import React, { useState } from 'react';
import { Building2, Check, X, Shield, Upload, Image as ImageIcon, Trash2, Calendar, FileText, CheckCircle2 } from 'lucide-react';
import { CompanyProfile } from '@/types';
import { calcularEstructuraCopasst, calcularEstructuraCocolab } from '@/lib/colombianLaw';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  company: CompanyProfile;
  onSave: (company: CompanyProfile) => void;
}

export default function CompanyModal({ isOpen, onClose, company, onSave }: Props) {
  const [formData, setFormData] = useState<CompanyProfile>(() => {
    const riesgos = company.nivelesRiesgo && company.nivelesRiesgo.length > 0
      ? company.nivelesRiesgo
      : [company.nivelRiesgo || 1];
    return {
      ...company,
      nivelesRiesgo: riesgos,
      nivelRiesgo: company.nivelRiesgo || (Math.max(...riesgos) as any),
    };
  });
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const copasstReq = calcularEstructuraCopasst(formData.totalTrabajadores);
  const cocolabReq = calcularEstructuraCocolab(formData.totalTrabajadores);

  const selectedRiesgos = (formData.nivelesRiesgo && formData.nivelesRiesgo.length > 0)
    ? formData.nivelesRiesgo
    : [formData.nivelRiesgo || 1];

  const toggleRiesgo = (nivel: 1 | 2 | 3 | 4 | 5) => {
    let next: (1 | 2 | 3 | 4 | 5)[];
    if (selectedRiesgos.includes(nivel)) {
      if (selectedRiesgos.length === 1) {
        alert('Debes mantener al menos un nivel de riesgo seleccionado.');
        return;
      }
      next = selectedRiesgos.filter(n => n !== nivel);
    } else {
      next = [...selectedRiesgos, nivel].sort((a, b) => a - b);
    }
    const highestRisk = Math.max(...next) as 1 | 2 | 3 | 4 | 5;
    setFormData({
      ...formData,
      nivelesRiesgo: next,
      nivelRiesgo: highestRisk,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 600);
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
                Configuración del Sistema & Empresa
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                  SG-SST
                </span>
              </h3>
              <p className="text-xs text-slate-500">Logotipo, datos institucionales y parámetros de ley</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto flex-1 text-slate-700">
          {/* Logo de la Empresa */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
            <label className="block text-xs font-bold text-slate-800">
              Logotipo Oficial de la Empresa
            </label>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="w-24 h-24 rounded-xl border-2 border-dashed border-slate-300 bg-white flex items-center justify-center overflow-hidden shadow-sm flex-shrink-0">
                {formData.logoUrl ? (
                  <img src={formData.logoUrl} alt="Logo Empresa" className="w-full h-full object-contain p-1" />
                ) : (
                  <div className="text-center p-2 text-slate-400">
                    <ImageIcon className="w-7 h-7 mx-auto mb-1 text-slate-300" />
                    <span className="text-[10px] block font-medium">Sin Logo</span>
                  </div>
                )}
              </div>

              <div className="space-y-2 flex-1 w-full">
                <div className="flex items-center gap-2">
                  <label className="cursor-pointer px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Subir Logotipo</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = () => {
                            setFormData({ ...formData, logoUrl: reader.result as string });
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </label>

                  {formData.logoUrl && (
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, logoUrl: '' })}
                      className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Quitar</span>
                    </button>
                  )}
                </div>
                <p className="text-[11px] text-slate-500">
                  Sube el logo de tu empresa en formato PNG o JPG. Se mostrará en la pantalla de inicio de sesión, en la barra superior y en el membrete oficial de todas las actas PDF.
                </p>
              </div>
            </div>
          </div>

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

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">Actividad Económica Principal</label>
              <input
                type="text"
                value={formData.actividadEconomica || ''}
                onChange={(e) => setFormData({ ...formData, actividadEconomica: e.target.value })}
                placeholder="Ej: Fabricación de productos metálicos, transporte o servicios"
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-blue-500"
              />
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

            {/* Selección Múltiple de Niveles de Riesgo ARL */}
            <div className="sm:col-span-2 p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                <div>
                  <label className="block text-xs font-bold text-slate-800">
                    Niveles de Riesgo ARL de la Empresa (Selección Múltiple) *
                  </label>
                  <p className="text-[11px] text-slate-500">
                    Puedes marcar varios niveles si tu empresa tiene distintos centros de trabajo (ej: oficinas en Riesgo 1 y planta/campo en Riesgo 5).
                  </p>
                </div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 border border-blue-200 shadow-sm">
                    Riesgos activos: {selectedRiesgos.length > 0 ? selectedRiesgos.map(r => ['I','II','III','IV','V'][r-1]).join(' y ') : 'Ninguno'}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
                {[
                  { nivel: 1, romano: 'Clase I', desc: 'Riesgo Mínimo', ejemplos: 'Oficinas, Comercial, Administrativo' },
                  { nivel: 2, romano: 'Clase II', desc: 'Riesgo Bajo', ejemplos: 'Manufactura liviana, Almacenes' },
                  { nivel: 3, romano: 'Clase III', desc: 'Riesgo Medio', ejemplos: 'Transporte, Alimentos, Procesos' },
                  { nivel: 4, romano: 'Clase IV', desc: 'Riesgo Alto', ejemplos: 'Metalmecánica, Vidrio, Químicos' },
                  { nivel: 5, romano: 'Clase V', desc: 'Riesgo Máximo', ejemplos: 'Construcción, Alturas, Minería, Eléctrico' },
                ].map((item) => {
                  const isChecked = selectedRiesgos.includes(item.nivel as any);
                  return (
                    <button
                      key={item.nivel}
                      type="button"
                      onClick={() => toggleRiesgo(item.nivel as any)}
                      className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between group ${
                        isChecked
                          ? 'border-blue-600 bg-blue-50/90 shadow-sm ring-2 ring-blue-500/20'
                          : 'border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className={`text-xs font-black font-mono ${isChecked ? 'text-blue-700' : 'text-slate-800'}`}>
                          {item.romano}
                        </span>
                        <div className={`w-4 h-4 rounded-md border flex items-center justify-center transition-colors ${
                          isChecked ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300 bg-white group-hover:border-slate-400'
                        }`}>
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </div>
                      <span className="text-[11px] font-bold text-slate-800 block leading-tight">{item.desc}</span>
                      <span className="text-[9px] text-slate-400 block mt-1 line-clamp-2 leading-tight">{item.ejemplos}</span>
                    </button>
                  );
                })}
              </div>
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

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Período Vigencia Comités Desde</label>
              <input
                type="date"
                value={formData.vigenciaComitesDesde || ''}
                onChange={(e) => setFormData({ ...formData, vigenciaComitesDesde: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Período Vigencia Comités Hasta (2 años)</label>
              <input
                type="date"
                value={formData.vigenciaComitesHasta || ''}
                onChange={(e) => setFormData({ ...formData, vigenciaComitesHasta: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-200">
            {savedSuccess ? (
              <span className="text-xs text-emerald-600 font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                ¡Configuración y logotipo guardados!
              </span>
            ) : <span />}

            <div className="flex items-center gap-2.5">
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
          </div>
        </form>
      </div>
    </div>
  );
}
