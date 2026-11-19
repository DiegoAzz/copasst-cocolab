'use client';

import React, { useState, useEffect } from 'react';
import { Shield, Lock, LogIn, Eye, EyeOff, Building2, User, ChevronDown, ChevronUp, AlertCircle, CheckCircle2 } from 'lucide-react';
import { UserSession, UserAccount, CompanyProfile } from '@/types';
import { storage, DEMO_USERS } from '@/lib/storage';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: UserSession) => void;
  currentSession: UserSession | null;
  company?: CompanyProfile;
}

export default function LoginModal({ isOpen, onClose, onLogin, currentSession, company }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [showDemoHelpers, setShowDemoHelpers] = useState(false);
  const [availableUsers, setAvailableUsers] = useState<UserAccount[]>([]);

  useEffect(() => {
    if (isOpen) {
      const users = storage.getUsers();
      setAvailableUsers(users && users.length > 0 ? users : DEMO_USERS);
      setErrorMsg('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email.trim()) {
      setErrorMsg('Por favor ingresa tu correo corporativo.');
      return;
    }

    const emailTrimmed = email.trim().toLowerCase();
    const allUsers = availableUsers.length > 0 ? availableUsers : DEMO_USERS;
    let found = allUsers.find(u => u.email.toLowerCase() === emailTrimmed);

    // Aliases prácticos de inicio de sesión
    if (!found) {
      if (emailTrimmed === 'wendy@empresa.co' || emailTrimmed === 'wendy@sysnet.com.co') {
        found = allUsers.find(u => u.email === 'rrhhsysnet@gmail.com');
      } else if (emailTrimmed === 'diego@empresa.co' || emailTrimmed === 'diego@sysnet.com.co') {
        found = allUsers.find(u => u.email === 'diego.zuniga.plazas@gmail.com');
      } else if (emailTrimmed === 'jaider@empresa.co' || emailTrimmed === 'jaider@sysnet.com.co') {
        found = allUsers.find(u => u.email === 'gerencia@sysnet.com.co');
      }
    }

    if (found) {
      if (found.password && password && found.password !== password) {
        setErrorMsg('Contraseña incorrecta. Por favor verifica tus credenciales.');
        return;
      }
      onLogin(found);
      onClose();
      return;
    }

    // Si el correo no está registrado en el sistema
    setErrorMsg('Usuario no encontrado en la base de datos de la empresa. Contacta a Gestión Humana (Wendy) para habilitar tu acceso.');
  };

  const handleQuickFill = (demoUser: UserAccount) => {
    setEmail(demoUser.email);
    setPassword(demoUser.password || '123');
    setErrorMsg('');
    // Inicia sesión directamente con la cuenta seleccionada
    onLogin(demoUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-md bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
        
        {/* Banner Superior con Logotipo y Empresa */}
        <div className="bg-gradient-to-b from-slate-50 to-white px-8 pt-8 pb-6 border-b border-slate-100 text-center">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/25 mb-3.5 overflow-hidden border-2 border-white">
            {company?.logoUrl ? (
              <img src={company.logoUrl} alt="Logo Empresa" className="w-full h-full object-contain p-1 bg-white" />
            ) : (
              <Shield className="w-8 h-8 text-white stroke-[2.2]" />
            )}
          </div>

          <h2 className="text-lg font-black tracking-tight text-slate-900 font-mono">
            CoCoPASST
          </h2>
          <p className="text-xs font-semibold text-slate-600 truncate mt-0.5">
            {company?.razonSocial || 'Sistema Integrado SG-SST'}
          </p>
          <div className="flex items-center justify-center gap-1.5 mt-2">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
              COPASST
            </span>
            <span className="text-[10px] text-slate-300">•</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
              COCOLAB
            </span>
            <span className="text-[10px] text-slate-300">•</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
              Decreto 1072/15
            </span>
          </div>
        </div>

        {/* Formulario de Login */}
        <form onSubmit={handleSubmit} className="px-8 py-6 space-y-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Iniciar Sesión</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Ingresa tus datos para acceder a las funciones autorizadas según tu rol.
            </p>
          </div>

          {/* Mensaje de Error */}
          {errorMsg && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-2.5 text-xs text-rose-800 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Campo Correo */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Correo Electrónico Corporativo
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ej: rrhhsysnet@gmail.com o soporte10@sysnet.com.co"
                className="w-full pl-3.5 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 transition-all font-medium"
              />
            </div>
          </div>

          {/* Campo Contraseña */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-bold text-slate-700">
                Contraseña
              </label>
              <span className="text-[10px] text-slate-400">Por defecto: 123</span>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-3.5 pr-10 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 transition-all font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Botón Principal */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/20 hover:shadow-lg transition-all flex items-center justify-center gap-2 transform active:scale-[0.99]"
          >
            <LogIn className="w-4 h-4 stroke-[2.5]" />
            <span>Ingresar al Sistema</span>
          </button>

          {/* Sección Discreta de Ayuda para Pruebas / Cuentas Demo */}
          <div className="pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setShowDemoHelpers(!showDemoHelpers)}
              className="w-full flex items-center justify-between text-[11px] text-slate-500 hover:text-blue-600 py-1 font-medium transition-colors"
            >
              <span>¿Ingresar con cuentas de prueba autorizadas?</span>
              {showDemoHelpers ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>

            {showDemoHelpers && (
              <div className="mt-2.5 p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs animate-in fade-in">
                <p className="text-[10px] text-slate-500">
                  Haz clic en cualquiera de estos perfiles para iniciar sesión al instante y validar sus permisos:
                </p>
                <div className="grid grid-cols-1 gap-1.5">
                  {(availableUsers.length > 0 ? availableUsers : DEMO_USERS).slice(0, 5).map((u) => (
                    <button
                      key={u.id}
                      type="button"
                      onClick={() => handleQuickFill(u)}
                      className="w-full p-2 bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-300 rounded-lg text-left flex items-center justify-between transition-all group"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[11px] font-bold text-slate-900 group-hover:text-blue-700 truncate">
                            {u.nombre}
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono block truncate">
                          {u.email}
                        </span>
                      </div>
                      <span className="text-[9px] uppercase font-bold px-1.5 py-0.5 rounded bg-slate-100 group-hover:bg-blue-100 text-slate-600 group-hover:text-blue-800 border border-slate-200 flex-shrink-0">
                        {u.rol === 'SUPER_ADMIN_RRHH' ? 'Wendy RRHH' : u.rol.replace('_', ' ')}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </form>

        {/* Footer Institucional con Ley */}
        <div className="px-8 py-3 bg-slate-50 border-t border-slate-100 text-center">
          <p className="text-[10px] text-slate-400">
            Resolución 2013/86 • Res. 652/12 • Ley 1010/06 • Ley 2365/24
          </p>
        </div>
      </div>
    </div>
  );
}
