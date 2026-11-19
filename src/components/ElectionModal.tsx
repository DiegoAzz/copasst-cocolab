'use client';

import React, { useState } from 'react';
import { Vote, Award, Check, X, BarChart2, FileText } from 'lucide-react';
import { ProcesoEleccion } from '@/types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  eleccion: ProcesoEleccion;
  onVote: (candidatoId: string | 'blanco') => void;
  onGenerarActaPosesion: (eleccion: ProcesoEleccion) => void;
  canManage?: boolean;
}

export default function ElectionModal({
  isOpen,
  onClose,
  eleccion,
  onVote,
  onGenerarActaPosesion,
  canManage = true,
}: Props) {
  const [selectedCandidateId, setSelectedCandidateId] = useState<string | 'blanco' | null>(null);
  const [votedSuccess, setVotedSuccess] = useState(false);
  const [showResults, setShowResults] = useState(eleccion.estado === 'cerrada_escrutinio');

  if (!isOpen) return null;

  const totalVotos = eleccion.totalVotosEmitidos || 1;

  const handleConfirmVote = () => {
    if (!selectedCandidateId) {
      alert('Por favor selecciona un candidato en el tarjetón o marca voto en blanco.');
      return;
    }
    onVote(selectedCandidateId);
    setVotedSuccess(true);
    setTimeout(() => {
      setVotedSuccess(false);
      setShowResults(true);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-200/60">
              <Vote className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                Urna Virtual de Elecciones • {eleccion.comite}
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                  Periodo {eleccion.periodo}
                </span>
              </h3>
              <p className="text-xs text-slate-500">Elección democrática y secreta de los trabajadores</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 overflow-y-auto flex-1 text-slate-700">
          {votedSuccess ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
                <Check className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-slate-900">¡Voto Registrado con Éxito!</h4>
              <p className="text-xs text-slate-600 max-w-md mx-auto">
                Tu voto ha sido contabilizado en el escrutinio oficial del {eleccion.comite} conforme a la ley colombiana.
              </p>
            </div>
          ) : !showResults ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-600">
                  Selecciona tu candidato preferido en el tarjetón virtual:
                </p>
                <button
                  type="button"
                  onClick={() => setShowResults(true)}
                  className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1 font-semibold"
                >
                  <BarChart2 className="w-3.5 h-3.5" />
                  Ver Escrutinio Actual
                </button>
              </div>

              {/* Tarjetón Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {eleccion.candidatos.map((c) => {
                  const isSelected = selectedCandidateId === c.id;
                  return (
                    <div
                      key={c.id}
                      onClick={() => setSelectedCandidateId(c.id)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center gap-3.5 ${
                        isSelected
                          ? 'bg-blue-50/70 border-blue-500 shadow-md ring-2 ring-blue-500/20'
                          : 'bg-white border-slate-200 hover:bg-slate-50 hover:border-slate-300 shadow-sm'
                      }`}
                    >
                      <div className="w-12 h-12 rounded-full bg-slate-100 border-2 border-slate-200 flex items-center justify-center text-sm font-bold text-blue-600 flex-shrink-0">
                        #{c.numeroTarjeton}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-slate-900 truncate">{c.nombre}</h4>
                        <p className="text-[11px] text-slate-500 truncate">{c.cargo}</p>
                        <p className="text-[10px] text-slate-400">C.C. {c.cedula} • {c.area}</p>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                          isSelected ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-300'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </div>
                  );
                })}

                {/* Voto en Blanco */}
                <div
                  onClick={() => setSelectedCandidateId('blanco')}
                  className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center gap-3.5 ${
                    selectedCandidateId === 'blanco'
                      ? 'bg-slate-100 border-slate-400 shadow-md'
                      : 'bg-white border-slate-200 hover:bg-slate-50 shadow-sm'
                  }`}
                >
                  <div className="w-12 h-12 rounded-full bg-slate-100 border-2 border-slate-200 flex items-center justify-center text-xs font-bold text-slate-500 flex-shrink-0">
                    BLANCO
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-slate-900">Voto en Blanco</h4>
                    <p className="text-[11px] text-slate-500">Opción institucional</p>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                      selectedCandidateId === 'blanco' ? 'border-slate-800 bg-slate-800 text-white' : 'border-slate-300'
                    }`}
                  >
                    {selectedCandidateId === 'blanco' && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-blue-700 flex items-center gap-1.5">
                  <BarChart2 className="w-4 h-4" />
                  Escrutinio Oficial de Votaciones ({eleccion.totalVotosEmitidos} votos emitidos)
                </h4>
                <button
                  type="button"
                  onClick={() => setShowResults(false)}
                  className="text-xs text-slate-500 hover:text-slate-800"
                >
                  Volver al Tarjetón
                </button>
              </div>

              <div className="space-y-3">
                {eleccion.candidatos.map((c) => {
                  const pct = Math.round((c.votos / totalVotos) * 100);
                  return (
                    <div key={c.id} className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-900">
                          #{c.numeroTarjeton} {c.nombre} ({c.cargo})
                        </span>
                        <span className="font-mono text-blue-700 font-bold">
                          {c.votos} votos ({pct}%)
                        </span>
                      </div>
                      <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full transition-all duration-500"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}

                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-600">Voto en Blanco</span>
                    <span className="font-mono text-slate-600 font-bold">
                      {eleccion.votosEnBlanco} votos ({Math.round((eleccion.votosEnBlanco / totalVotos) * 100)}%)
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-slate-400 rounded-full"
                      style={{ width: `${Math.round((eleccion.votosEnBlanco / totalVotos) * 100)}%` }}
                    />
                  </div>
                </div>
              </div>

              {canManage && (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between">
                  <div>
                    <h5 className="text-xs font-bold text-emerald-800 flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-emerald-600" /> Finalizar y Generar Acta de Posesión
                    </h5>
                    <p className="text-[11px] text-emerald-900">
                      Cierra la votación y crea automáticamente el acta legal con los ganadores.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      onGenerarActaPosesion(eleccion);
                      onClose();
                    }}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg shadow-sm flex items-center gap-1.5 transition-all"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    Generar Acta
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        {!showResults && !votedSuccess && (
          <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-t border-slate-200">
            <p className="text-[11px] text-slate-500 hidden sm:block">
              * Voto directo, secreto y verificado
            </p>
            <div className="flex items-center gap-2 ml-auto">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg border border-slate-300 transition-colors shadow-sm"
              >
                Cerrar
              </button>
              <button
                type="button"
                onClick={handleConfirmVote}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-sm flex items-center gap-1.5 transition-all"
              >
                <Check className="w-4 h-4" />
                Depositar Voto
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
