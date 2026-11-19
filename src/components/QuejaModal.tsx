'use client';

import React, { useState } from 'react';
import { ShieldAlert, Lock, Check, X, AlertTriangle } from 'lucide-react';
import { QuejaCocolab, TipologiaAcoso } from '@/types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (queja: QuejaCocolab) => void;
  authorDefault?: { nombre?: string; email?: string; cargo?: string };
}

const TIPOLOGIAS: TipologiaAcoso[] = [
  'Maltrato laboral (Violencia física, verbal o moral)',
  'Persecución laboral (Sobrecarga injustificada, cambios bruscos de horario)',
  'Discriminación laboral (Por género, raza, origen, religión, política)',
  'Entorpecimiento laboral (Ocultamiento de insumos, sabotaje)',
  'Inequidad laboral (Asignación de funciones con menosprecio)',
  'Desprotección laboral (Exposición a riesgos sin protección legal)',
  'Acoso Sexual en el Ámbito Laboral (Ley 2365 de 2024)',
];

export default function QuejaModal({ isOpen, onClose, onSave, authorDefault }: Props) {
  const [quejosoNombre, setQuejosoNombre] = useState(authorDefault?.nombre || '');
  const [quejosoCedula, setQuejosoCedula] = useState('');
  const [quejosoCargo, setQuejosoCargo] = useState(authorDefault?.cargo || '');
  const [quejosoArea, setQuejosoArea] = useState('');
  const [quejosoEmail, setQuejosoEmail] = useState(authorDefault?.email || '');
  const [quejosoTelefono, setQuejosoTelefono] = useState('');

  const [denunciadoNombre, setDenunciadoNombre] = useState('');
  const [denunciadoCargo, setDenunciadoCargo] = useState('');
  const [denunciadoArea, setDenunciadoArea] = useState('');

  const [tipologia, setTipologia] = useState<TipologiaAcoso>(TIPOLOGIAS[0]);
  const [hechosNarrados, setHechosNarrados] = useState('');
  const [pruebasAportadas, setPruebasAportadas] = useState('');

  const esLey2365 = tipologia.includes('Ley 2365');

  const handleSave = () => {
    if (!quejosoNombre.trim() || !denunciadoNombre.trim() || !hechosNarrados.trim()) {
      alert('Por favor completa los nombres del solicitante, denunciado y la descripción de los hechos.');
      return;
    }

    const year = new Date().getFullYear();
    const radicado = `Q-COL-${year}-${Math.floor(100 + Math.random() * 900)}`;

    const newQueja: QuejaCocolab = {
      id: 'q-' + Date.now(),
      radicado,
      fechaRadicacion: new Date().toISOString().split('T')[0],
      quejoso: {
        nombre: quejosoNombre.trim(),
        cedula: quejosoCedula.trim(),
        cargo: quejosoCargo.trim(),
        area: quejosoArea.trim(),
        email: quejosoEmail.trim(),
        telefono: quejosoTelefono.trim(),
      },
      denunciado: {
        nombre: denunciadoNombre.trim(),
        cargo: denunciadoCargo.trim(),
        area: denunciadoArea.trim(),
      },
      tipologia,
      hechosNarrados: hechosNarrados.trim(),
      pruebasAportadas: pruebasAportadas.trim() || 'Por aportar en sesión individual.',
      evidenciasAdjuntasIds: [],
      estado: 'radicada',
      actasRelacionadasIds: [],
      esPrioritariaLey2365: esLey2365,
    };

    onSave(newQueja);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-rose-50 text-rose-600 rounded-xl border border-rose-200/60">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                Canal Confidencial de Convivencia Laboral
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-rose-100 text-rose-800">
                  Reserva Legal
                </span>
              </h3>
              <p className="text-xs text-slate-500">Ley 1010 de 2006 & Ley 2365 de 2024</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notice */}
        <div className="px-6 py-3 bg-amber-50 border-b border-amber-200/60 flex items-center gap-2.5 text-xs text-amber-900">
          <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
          <span>
            Este trámite goza de <strong>estricta reserva legal</strong>. Solo los miembros acreditados del COCOLAB tienen acceso a la información suministrada.
          </span>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4 overflow-y-auto flex-1 text-slate-700">
          {/* Tipologia */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Tipificación de la Conducta (Ley 1010/2006 y Ley 2365/2024) *
            </label>
            <select
              value={tipologia}
              onChange={(e) => setTipologia(e.target.value as TipologiaAcoso)}
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-rose-500"
            >
              {TIPOLOGIAS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          {esLey2365 && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl space-y-1">
              <p className="text-xs font-bold text-rose-700 flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4" /> Trámite Especial y Prioritario - Ley 2365 de 2024
              </p>
              <p className="text-[11px] text-rose-900 leading-relaxed">
                La empresa activará inmediatamente las garantías de no revictimización, medidas cautelares de protección y canal directo de apoyo psicosocial.
              </p>
            </div>
          )}

          {/* Datos del Quejoso */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2.5">
            <h4 className="text-xs font-bold text-blue-700">Datos de la Persona que Presenta la Queja</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <input
                type="text"
                value={quejosoNombre}
                onChange={(e) => setQuejosoNombre(e.target.value)}
                placeholder="Nombre completo *"
                className="px-2.5 py-1.5 bg-white border border-slate-300 rounded text-xs text-slate-900"
              />
              <input
                type="text"
                value={quejosoCedula}
                onChange={(e) => setQuejosoCedula(e.target.value)}
                placeholder="Cédula"
                className="px-2.5 py-1.5 bg-white border border-slate-300 rounded text-xs text-slate-900"
              />
              <input
                type="text"
                value={quejosoCargo}
                onChange={(e) => setQuejosoCargo(e.target.value)}
                placeholder="Cargo actual"
                className="px-2.5 py-1.5 bg-white border border-slate-300 rounded text-xs text-slate-900"
              />
              <input
                type="text"
                value={quejosoArea}
                onChange={(e) => setQuejosoArea(e.target.value)}
                placeholder="Área / Departamento"
                className="px-2.5 py-1.5 bg-white border border-slate-300 rounded text-xs text-slate-900"
              />
              <input
                type="email"
                value={quejosoEmail}
                onChange={(e) => setQuejosoEmail(e.target.value)}
                placeholder="Correo corporativo / personal"
                className="px-2.5 py-1.5 bg-white border border-slate-300 rounded text-xs text-slate-900"
              />
              <input
                type="tel"
                value={quejosoTelefono}
                onChange={(e) => setQuejosoTelefono(e.target.value)}
                placeholder="Teléfono de contacto"
                className="px-2.5 py-1.5 bg-white border border-slate-300 rounded text-xs text-slate-900"
              />
            </div>
          </div>

          {/* Datos del Denunciado */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2.5">
            <h4 className="text-xs font-bold text-amber-700">Persona contra quien se formula la queja</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <input
                type="text"
                value={denunciadoNombre}
                onChange={(e) => setDenunciadoNombre(e.target.value)}
                placeholder="Nombre completo *"
                className="px-2.5 py-1.5 bg-white border border-slate-300 rounded text-xs text-slate-900"
              />
              <input
                type="text"
                value={denunciadoCargo}
                onChange={(e) => setDenunciadoCargo(e.target.value)}
                placeholder="Cargo o rol laboral"
                className="px-2.5 py-1.5 bg-white border border-slate-300 rounded text-xs text-slate-900"
              />
              <input
                type="text"
                value={denunciadoArea}
                onChange={(e) => setDenunciadoArea(e.target.value)}
                placeholder="Área de trabajo"
                className="px-2.5 py-1.5 bg-white border border-slate-300 rounded text-xs text-slate-900"
              />
            </div>
          </div>

          {/* Hechos */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Narración Cronológica de los Hechos *
            </label>
            <textarea
              rows={4}
              value={hechosNarrados}
              onChange={(e) => setHechosNarrados(e.target.value)}
              placeholder="Describa fechas, lugares específicos, palabras o conductas ocurridas de manera clara y objetiva..."
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-rose-500 resize-none"
            />
          </div>

          {/* Pruebas */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Pruebas Aportadas o Testigos
            </label>
            <textarea
              rows={2}
              value={pruebasAportadas}
              onChange={(e) => setPruebasAportadas(e.target.value)}
              placeholder="Indique si anexa capturas de mensajes, correos, memorandos o testigos presenciales..."
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-rose-500 resize-none"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-t border-slate-200">
          <p className="text-[11px] text-slate-500">
            * Conforme a la Res. 652 de 2012, no constituye sanción disciplinaria.
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg border border-slate-300 transition-colors shadow-sm"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-lg shadow-sm flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              Radicar Queja Confidencial
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
