'use client';

import React, { useState, useEffect } from 'react';
import { Shield, Camera, FileText, Building2, Download, Bell, Smartphone } from 'lucide-react';
import { CompanyProfile } from '@/types';

interface Props {
  company: CompanyProfile;
  onOpenCamera: () => void;
  onOpenActa: () => void;
  onOpenCompany: () => void;
  activeSection: string;
  setActiveSection: (s: string) => void;
}

export default function Navbar({
  company,
  onOpenCamera,
  onOpenActa,
  onOpenCompany,
  activeSection,
  setActiveSection,
}: Props) {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    const handleBeforeInstall = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsInstallable(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-900/95 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveSection('dashboard')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 via-sky-500 to-emerald-400 flex items-center justify-center shadow-lg shadow-sky-500/20">
              <Shield className="w-5 h-5 text-slate-950 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-extrabold tracking-tight text-white font-mono">
                  CoCoPASST
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  SG-SST
                </span>
              </div>
              <p className="text-[11px] text-slate-400 truncate max-w-[200px] sm:max-w-[320px]">
                {company.razonSocial}
              </p>
            </div>
          </div>

          {/* Navigation Links for Desktop */}
          <nav className="hidden md:flex items-center gap-1 text-xs font-semibold text-slate-300">
            {[
              { id: 'dashboard', label: 'Dashboard' },
              { id: 'copasst', label: 'COPASST' },
              { id: 'cocolab', label: 'COCOLAB' },
              { id: 'evidencias', label: 'Evidencias Fotográficas' },
              { id: 'actas', label: 'Actas Oficiales' },
              { id: 'elecciones', label: 'Elecciones' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeSection === item.id
                    ? 'bg-sky-500/15 text-sky-400 font-bold'
                    : 'hover:text-white hover:bg-slate-800'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {isInstallable && (
              <button
                onClick={handleInstallClick}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold shadow-md transition-all animate-pulse"
                title="Instalar como App en tu celular o computador"
              >
                <Smartphone className="w-3.5 h-3.5" />
                Instalar App
              </button>
            )}

            <button
              onClick={onOpenCamera}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-lg text-xs shadow-md transition-all"
              title="Tomar foto de riesgo o inspección en terreno"
            >
              <Camera className="w-4 h-4" />
              <span className="hidden sm:inline">Foto Evidencia</span>
            </button>

            <button
              onClick={onOpenActa}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-lg text-xs border border-slate-700 transition-all"
              title="Crear nueva acta oficial"
            >
              <FileText className="w-4 h-4 text-sky-400" />
              <span className="hidden sm:inline">Nueva Acta</span>
            </button>

            <button
              onClick={onOpenCompany}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors border border-slate-800"
              title="Parámetros de Empresa y SG-SST"
            >
              <Building2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
