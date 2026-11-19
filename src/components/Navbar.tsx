'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Shield, 
  Camera, 
  FileText, 
  Building2, 
  Smartphone, 
  BookOpen, 
  Users, 
  ChevronDown, 
  LogOut, 
  Calendar,
  Menu,
  X,
  Sparkles,
  LayoutDashboard,
  ShieldAlert,
  HeartHandshake,
  CheckSquare,
  Vote,
  Settings,
  PlusCircle,
  ExternalLink,
  UserCheck
} from 'lucide-react';
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
  onOpenProgram: () => void;
  onOpenAssignMember?: () => void;
  onLogout: () => void;
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
  onOpenProgram,
  onOpenAssignMember,
  onLogout,
  activeSection,
  setActiveSection,
}: Props) {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toolsDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleBeforeInstall = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, []);

  // Click outside listener for tools dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (toolsDropdownRef.current && !toolsDropdownRef.current.contains(event.target as Node)) {
        setIsToolsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close menus on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsToolsOpen(false);
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
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
        return { label: 'Wendy RRHH', color: 'bg-purple-100 text-purple-800 border-purple-300' };
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

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'copasst', label: 'COPASST', icon: ShieldAlert },
    { id: 'cocolab', label: 'COCOLAB', icon: HeartHandshake },
    { id: 'plan', label: 'Plan & Cronograma', icon: Calendar },
    { id: 'evidencias', label: 'Evidencias', icon: Camera },
    { id: 'actas', label: 'Actas Oficiales', icon: FileText },
    { id: 'elecciones', label: 'Elecciones', icon: Vote },
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-16 gap-2">
          
          {/* 1. Left: Logo and Brand */}
          <div 
            className="flex items-center gap-2.5 cursor-pointer shrink-0 select-none" 
            onClick={() => handleNavClick('dashboard')}
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-sm shadow-blue-500/20 overflow-hidden border border-slate-200 shrink-0">
              {company.logoUrl ? (
                <img src={company.logoUrl} alt="Logo" className="w-full h-full object-contain p-0.5 bg-white" />
              ) : (
                <Shield className="w-5 h-5 text-white stroke-[2.5]" />
              )}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-base font-extrabold tracking-tight text-slate-900 font-mono">
                  CoCoPASST
                </span>
                <span className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200/80 shrink-0">
                  SG-SST
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium truncate max-w-[130px] sm:max-w-[200px] md:max-w-[260px]">
                {company.razonSocial}
              </p>
            </div>
          </div>

          {/* 2. Center: Navigation Links for Wide Desktop (>= 1280px xl) */}
          <nav className="hidden xl:flex items-center gap-1 text-xs font-semibold text-slate-600 shrink-0">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-2.5 py-1.5 rounded-lg transition-all ${
                  activeSection === item.id
                    ? 'bg-blue-50 text-blue-700 font-bold shadow-xs'
                    : 'hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* 3. Right: Actions & User Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            
            {/* Quick Primary Action: Foto Evidencia */}
            <button
              onClick={onOpenCamera}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold rounded-lg text-xs shadow-sm transition-all"
              title="Tomar foto de evidencia o hallazgo en terreno"
            >
              <Camera className="w-4 h-4 shrink-0" />
              <span className="hidden sm:inline">Foto Evidencia</span>
            </button>

            {/* Nueva Acta (Desktop visible on 2xl+, or always in dropdown) */}
            {session?.rol !== 'COLABORADOR' && (
              <button
                onClick={onOpenActa}
                className="hidden 2xl:flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-lg text-xs border border-slate-200 transition-all shadow-sm"
                title="Crear nueva acta oficial de reunión"
              >
                <FileText className="w-3.5 h-3.5 text-blue-600" />
                <span>Nueva Acta</span>
              </button>
            )}

            {/* Dropdown Menu: Gestión & Herramientas (Solves horizontal overflow) */}
            <div className="relative" ref={toolsDropdownRef}>
              <button
                onClick={() => setIsToolsOpen(!isToolsOpen)}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold border transition-all shadow-sm ${
                  isToolsOpen 
                    ? 'bg-blue-50 text-blue-700 border-blue-300 ring-2 ring-blue-500/20' 
                    : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                }`}
                title="Menú de herramientas, censo, funciones y configuración"
                aria-label="Menú de herramientas"
              >
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                <span className="hidden md:inline">Gestión</span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isToolsOpen ? 'rotate-180 text-blue-600' : ''}`} />
              </button>

              {/* Tools Dropdown Panel */}
              {isToolsOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-2 border-b border-slate-100 mb-1">
                    <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                      Herramientas y Gestión
                    </p>
                    <p className="text-xs font-semibold text-slate-800">
                      {company.razonSocial}
                    </p>
                  </div>

                  <div className="space-y-1">
                    {/* Funciones & Plan de Trabajo */}
                    <button
                      onClick={() => {
                        setIsToolsOpen(false);
                        onOpenProgram();
                      }}
                      className="w-full flex items-start gap-2.5 px-3 py-2 text-left rounded-xl hover:bg-indigo-50/80 transition-colors group"
                    >
                      <div className="p-1.5 rounded-lg bg-indigo-100 text-indigo-700 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-800 group-hover:text-indigo-900">
                          Funciones & Plan 2026
                        </div>
                        <div className="text-[11px] text-slate-500 leading-tight">
                          4 horas/sem, tareas por cargo y cronograma mes a mes
                        </div>
                      </div>
                    </button>

                    {/* Censo de Empleados */}
                    {canManageUsers && (
                      <button
                        onClick={() => {
                          setIsToolsOpen(false);
                          onOpenUsers();
                        }}
                        className="w-full flex items-start gap-2.5 px-3 py-2 text-left rounded-xl hover:bg-purple-50/80 transition-colors group"
                      >
                        <div className="p-1.5 rounded-lg bg-purple-100 text-purple-700 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                          <Users className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-800 group-hover:text-purple-900 flex items-center gap-1.5">
                            Censo de Empleados
                            <span className="text-[9px] bg-purple-200/60 text-purple-800 px-1.5 py-0.2 rounded font-bold">24</span>
                          </div>
                          <div className="text-[11px] text-slate-500 leading-tight">
                            Nómina real SYSNET, riesgos 1 y 5, usuarios y roles
                          </div>
                        </div>
                      </button>
                    )}

                    {/* Asignar Miembros a Comités */}
                    {canManageUsers && onOpenAssignMember && (
                      <button
                        onClick={() => {
                          setIsToolsOpen(false);
                          onOpenAssignMember();
                        }}
                        className="w-full flex items-start gap-2.5 px-3 py-2 text-left rounded-xl hover:bg-emerald-50/80 transition-colors group"
                      >
                        <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                          <UserCheck className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-800 group-hover:text-emerald-900">
                            Asignar Miembros Comités
                          </div>
                          <div className="text-[11px] text-slate-500 leading-tight">
                            Tú eliges los miembros y cargos en COPASST y COCOLAB
                          </div>
                        </div>
                      </button>
                    )}

                    {/* Nueva Acta */}
                    {session?.rol !== 'COLABORADOR' && (
                      <button
                        onClick={() => {
                          setIsToolsOpen(false);
                          onOpenActa();
                        }}
                        className="w-full flex items-start gap-2.5 px-3 py-2 text-left rounded-xl hover:bg-blue-50/80 transition-colors group"
                      >
                        <div className="p-1.5 rounded-lg bg-blue-100 text-blue-700 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                          <PlusCircle className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-800 group-hover:text-blue-900">
                            Nueva Acta Foliada
                          </div>
                          <div className="text-[11px] text-slate-500 leading-tight">
                            Redactar acta oficial COPASST o COCOLAB
                          </div>
                        </div>
                      </button>
                    )}

                    {/* Configuración de Empresa */}
                    {canManageUsers && (
                      <button
                        onClick={() => {
                          setIsToolsOpen(false);
                          onOpenCompany();
                        }}
                        className="w-full flex items-start gap-2.5 px-3 py-2 text-left rounded-xl hover:bg-slate-100 transition-colors group"
                      >
                        <div className="p-1.5 rounded-lg bg-slate-100 text-slate-700 group-hover:bg-slate-800 group-hover:text-white transition-colors">
                          <Building2 className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-800 group-hover:text-slate-900">
                            Configuración Empresa
                          </div>
                          <div className="text-[11px] text-slate-500 leading-tight">
                            Logo, razón social, NIT, ARL y clases de riesgo
                          </div>
                        </div>
                      </button>
                    )}

                    {/* Manual de Uso SG-SST */}
                    <button
                      onClick={() => {
                        setIsToolsOpen(false);
                        onOpenManual();
                      }}
                      className="w-full flex items-start gap-2.5 px-3 py-2 text-left rounded-xl hover:bg-slate-100 transition-colors group"
                    >
                      <div className="p-1.5 rounded-lg bg-slate-100 text-slate-700 group-hover:bg-slate-800 group-hover:text-white transition-colors">
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-800 group-hover:text-slate-900">
                          Manual de Uso & Leyes
                        </div>
                        <div className="text-[11px] text-slate-500 leading-tight">
                          Dec. 1072/15, Res. 2013/86, Ley 1010 y 2365/24
                        </div>
                      </div>
                    </button>

                    {/* Instalar App (PWA) */}
                    {isInstallable && (
                      <button
                        onClick={() => {
                          setIsToolsOpen(false);
                          handleInstallClick();
                        }}
                        className="w-full flex items-start gap-2.5 px-3 py-2 text-left rounded-xl hover:bg-emerald-50 transition-colors group border-t border-slate-100 mt-1 pt-2"
                      >
                        <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                          <Smartphone className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-emerald-800">
                            Instalar App CoCoPASST
                          </div>
                          <div className="text-[11px] text-emerald-600 leading-tight">
                            Instalar en pantalla de inicio de tu celular o PC
                          </div>
                        </div>
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* User Profile / Switcher Pill */}
            <div
              onClick={onOpenLogin}
              className="flex items-center gap-1.5 sm:gap-2 pl-1.5 sm:pl-2 pr-2 py-1 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl cursor-pointer transition-all shadow-sm group shrink-0"
              title="Haz clic para cambiar de rol o usuario"
            >
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center text-xs font-extrabold shadow-xs shrink-0">
                {session?.nombre.charAt(0) || 'U'}
              </div>
              <div className="hidden md:flex flex-col text-left leading-none max-w-[100px] lg:max-w-[130px]">
                <span className="text-[11px] font-bold text-slate-900 truncate">
                  {session?.nombre.split(' ')[0] || 'Usuario'}
                </span>
                <span className={`text-[8.5px] font-bold uppercase tracking-wider px-1 py-0.5 rounded border ${roleInfo.color} inline-block mt-0.5 truncate`}>
                  {roleInfo.label}
                </span>
              </div>
              <ChevronDown className="w-3 h-3 text-slate-400 group-hover:text-slate-600" />
            </div>

            {/* Logout Button */}
            <button
              onClick={onLogout}
              className="p-1.5 sm:px-2.5 sm:py-1.5 text-rose-600 hover:text-white hover:bg-rose-600 rounded-xl transition-all border border-rose-200 shadow-xs flex items-center gap-1 text-xs font-semibold shrink-0"
              title="Cerrar sesión de forma segura"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden xl:inline">Salir</span>
            </button>

            {/* Mobile / Tablet Hamburger Button (< xl) */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors shrink-0"
              aria-label="Abrir menú de navegación"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5 text-rose-600" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile / Tablet Drawer Menu (< xl) */}
      {isMobileMenuOpen && (
        <div className="xl:hidden border-t border-slate-200 bg-white/98 backdrop-blur-xl shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-4">
            
            {/* User Session Details in Mobile Drawer */}
            <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-2xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
                  {session?.nombre.charAt(0) || 'U'}
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 leading-tight">
                    {session?.nombre || 'Usuario'}
                  </p>
                  <p className="text-[11px] text-slate-500">{session?.email}</p>
                  <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded border ${roleInfo.color} inline-block mt-0.5`}>
                    {roleInfo.label}
                  </span>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenLogin();
                }}
                className="px-2.5 py-1.5 text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors"
              >
                Cambiar
              </button>
            </div>

            {/* Quick Action Grid */}
            <div>
              <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-2">
                Accesos Directos
              </p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenProgram();
                  }}
                  className="flex items-center gap-2 p-2.5 rounded-xl border border-indigo-200 bg-indigo-50/70 hover:bg-indigo-100 text-left transition-colors"
                >
                  <Calendar className="w-4 h-4 text-indigo-700 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-indigo-900">Funciones & Plan</div>
                    <div className="text-[10px] text-indigo-600">4h/sem y cronograma</div>
                  </div>
                </button>

                {canManageUsers && (
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onOpenUsers();
                    }}
                    className="flex items-center gap-2 p-2.5 rounded-xl border border-purple-200 bg-purple-50/70 hover:bg-purple-100 text-left transition-colors"
                  >
                    <Users className="w-4 h-4 text-purple-700 shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-purple-900">Censo Empleados</div>
                      <div className="text-[10px] text-purple-600">24 nómina real</div>
                    </div>
                  </button>
                )}

                {canManageUsers && onOpenAssignMember && (
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onOpenAssignMember();
                    }}
                    className="flex items-center gap-2 p-2.5 rounded-xl border border-emerald-200 bg-emerald-50/70 hover:bg-emerald-100 text-left transition-colors"
                  >
                    <UserCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-emerald-900">Asignar Comités</div>
                      <div className="text-[10px] text-emerald-600">Roles y cargos</div>
                    </div>
                  </button>
                )}

                {session?.rol !== 'COLABORADOR' && (
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onOpenActa();
                    }}
                    className="flex items-center gap-2 p-2.5 rounded-xl border border-blue-200 bg-blue-50/70 hover:bg-blue-100 text-left transition-colors"
                  >
                    <FileText className="w-4 h-4 text-blue-700 shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-blue-900">Nueva Acta</div>
                      <div className="text-[10px] text-blue-600">Redactar oficial</div>
                    </div>
                  </button>
                )}

                {canManageUsers && (
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onOpenCompany();
                    }}
                    className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-left transition-colors"
                  >
                    <Building2 className="w-4 h-4 text-slate-700 shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-slate-900">Configuración</div>
                      <div className="text-[10px] text-slate-500">Logo y empresa</div>
                    </div>
                  </button>
                )}

                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenManual();
                  }}
                  className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-left transition-colors col-span-2"
                >
                  <BookOpen className="w-4 h-4 text-blue-600 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-slate-900">Manual de Uso SG-SST</div>
                    <div className="text-[10px] text-slate-500">Guía paso a paso y marco normativo Mintrabajo</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Navigation Tabs List */}
            <div>
              <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-2">
                Módulos y Secciones
              </p>
              <div className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                        isActive
                          ? 'bg-blue-600 text-white font-bold shadow-sm'
                          : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                        <span>{item.label}</span>
                      </div>
                      {isActive && <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-md">Activo</span>}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Logout Row */}
            <div className="pt-2 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onLogout();
                }}
                className="w-full py-2 px-4 flex items-center justify-center gap-2 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs rounded-xl border border-rose-200 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Cerrar Sesión Segura
              </button>
            </div>

          </div>
        </div>
      )}
    </header>
  );
}