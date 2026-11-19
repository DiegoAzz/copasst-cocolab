'use client';

import React, { useState, useEffect } from 'react';
import { Shield, Camera, FileText, Building2, Smartphone, BookOpen, Users, ChevronDown } from 'lucide-react';
import { CompanyProfile, UserSession } from '@/types';

interface Props {
  company: CompanyProfile;
  session: UserSession | null;
  onOpenLogin: () => void;
  onOpenUsers: () => void;
  onOpenCamera: () => void;
  onOpenActa: () => void;
  onOpenCompany: () => void;
  onOpenManual: () => void;
  activeSection: string;
  setActiveSection: (s: string) => void;
}

export default function Navbar({
  company,
  session,
  onOpenLogin,
  onOpenUsers,
  onOpenCamera,
  onOpenActa,
  onOpenCompany,
  onOpenManual,
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

  const getRoleBadge = (rol?: string) => {
    switch (rol) {
      case 'SUPER_ADMIN_RRHH':
        return { label: 'Wendy RRHH (Dual)', color: 'bg-purple-100 text-purple-800 border-purple-300' };
      case 'AMBOS_COMITES':
        return { label: 'COPASST & COCOLAB', color: 'bg-indigo-100 text-indigo-800 border-indigo-300' };
      case 'ADMIN_SST':
        return { label: 'Admin SG-SST', color: 'bg-blue-100 text-blue-800 border-blue-300' };
      case 'COPASST':
        return { label: 'COPASST', color: 'bg-sky-100 text-sky-800 border-sky-300' };
      case 'COCOLAB':
        return { label: 'COCOLAB', color: 'bg-rose-100 text-rose-800 border-rose-300' };
      default:
        return { label: 'Colaborador', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' };
    }
  };

  const roleInfo = getRoleBadge(session?.rol);
  const canManageUsers = session?.rol === 'SUPER_ADMIN_RRHH' || session?.rol === 'ADMIN_SST' || session?.rol === 'AMBOS_COMITES';

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveSection('dashboard')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-md shadow-blue-500/20">
              <Shield className="w-5 h-5 text-white stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-extrabold tracking-tight text-slate-900 font-mono">
                  CoCoPASST
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200/80">
                  SG-SST
                </span>
              </div>
              <p className="text-[11px] text-slate-500 truncate max-w-[180px] sm:max-w-[320px]">
                {company.razonSocial}
              </p>
            </div>
          </div>

          {/* Navigation Links for Desktop */}
          <nav className="hidden lg:flex items-center gap-1 text-xs font-semibold text-slate-600">
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
                    ? 'bg-blue-50 text-blue-700 font-bold'
                    : 'hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Action Buttons & User Profile */}
          <div className="flex items-center gap-2">
            {/* Gestión de Usuarios (Wendy / Admin) */}
            {canManageUsers && (
              <button
                onClick={onOpenUsers}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 rounded-lg text-xs font-bold transition-all shadow-sm"
                title="Módulo de Creación y Gestión de Usuarios (Wendy RRHH)"
              >
                <Users className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Usuarios</span>
              </button>
            )}

            {/* Manual de Uso Button */}
            <button
              onClick={onOpenManual}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 rounded-lg text-xs font-semibold transition-all shadow-sm"
              title="Manual de Uso y Guía Operativa"
            >
              <BookOpen className="w-3.5 h-3.5 text-blue-600" />
              <span>Manual</span>
            </button>

            {isInstallable && (
              <button
                onClick={handleInstallClick}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow-sm transition-all"
                title="Instalar como App en tu celular o computador"
              >
                <Smartphone className="w-3.5 h-3.5" />
                Instalar App
              </button>
            )}

            <button
              onClick={onOpenCamera}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-xs shadow-sm transition-all"
              title="Tomar foto de riesgo o inspección en terreno"
            >
              <Camera className="w-4 h-4" />
              <span className="hidden sm:inline">Foto Evidencia</span>
            </button>

            {/* Nueva Acta */}
            {session?.rol !== 'COLABORADOR' && (
              <button
                onClick={onOpenActa}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-lg text-xs border border-slate-200 transition-all shadow-sm"
                title="Crear nueva acta oficial"
              >
                <FileText className="w-4 h-4 text-blue-600" />
                <span className="hidden sm:inline">Nueva Acta</span>
              </button>
            )}

            {/* Config Empresa */}
            {canManageUsers && (
              <button
                onClick={onOpenCompany}
                className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200 shadow-sm"
                title="Parámetros de Empresa y SG-SST"
              >
                <Building2 className="w-4 h-4" />
              </button>
            )}

            {/* User Profile / Role Switcher Pill */}
            <div
              onClick={onOpenLogin}
              className="flex items-center gap-2 pl-2 pr-2.5 py-1 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl cursor-pointer transition-all shadow-sm group"
              title="Haz clic para cambiar de rol o iniciar sesión"
            >
              <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center text-xs font-bold shadow-sm">
                {session?.nombre.charAt(0) || 'W'}
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-[11px] font-bold text-slate-900 leading-tight truncate max-w-[120px]">
                  {session?.nombre.split(' ')[0] || 'Wendy'}
                </span>
                <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded border ${roleInfo.color} inline-block leading-tight mt-0.5`}>
                  {roleInfo.label}
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
