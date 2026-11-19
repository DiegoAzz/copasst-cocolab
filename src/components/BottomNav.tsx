'use client';

import React from 'react';
import { LayoutDashboard, Camera, FileText, ShieldAlert, HeartHandshake } from 'lucide-react';

interface Props {
  activeSection: string;
  setActiveSection: (s: string) => void;
  onOpenCamera: () => void;
}

export default function BottomNav({ activeSection, setActiveSection, onOpenCamera }: Props) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 bg-slate-900/95 backdrop-blur-lg border-t border-slate-800 md:hidden pb-safe">
      <div className="flex items-center justify-around h-16 px-2">
        <button
          onClick={() => setActiveSection('dashboard')}
          className={`flex flex-col items-center justify-center w-14 py-1 transition-colors ${
            activeSection === 'dashboard' ? 'text-sky-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <LayoutDashboard className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Inicio</span>
        </button>

        <button
          onClick={() => setActiveSection('copasst')}
          className={`flex flex-col items-center justify-center w-14 py-1 transition-colors ${
            activeSection === 'copasst' ? 'text-sky-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <ShieldAlert className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">COPASST</span>
        </button>

        {/* Central Camera Action Button */}
        <button
          onClick={onOpenCamera}
          className="flex flex-col items-center justify-center -mt-5 bg-gradient-to-tr from-sky-500 to-emerald-400 text-slate-950 p-3 rounded-full shadow-lg shadow-sky-500/30 transform active:scale-95 transition-transform"
          title="Tomar Foto de Evidencia"
        >
          <Camera className="w-6 h-6 stroke-[2.5]" />
        </button>

        <button
          onClick={() => setActiveSection('cocolab')}
          className={`flex flex-col items-center justify-center w-14 py-1 transition-colors ${
            activeSection === 'cocolab' ? 'text-rose-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <HeartHandshake className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">COCOLAB</span>
        </button>

        <button
          onClick={() => setActiveSection('actas')}
          className={`flex flex-col items-center justify-center w-14 py-1 transition-colors ${
            activeSection === 'actas' ? 'text-sky-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <FileText className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Actas</span>
        </button>
      </div>
    </nav>
  );
}
