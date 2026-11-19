'use client';

import React, { useState, useEffect } from 'react';
import { Shield, ShieldAlert, HeartHandshake, User, Lock, Check, LogIn, X, Info, UserCheck } from 'lucide-react';
import { UserSession, UserRole, UserAccount } from '@/types';
import { storage, DEMO_USERS } from '@/lib/storage';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: UserSession) => void;
  currentSession: UserSession | null;
}

export default function LoginModal({ isOpen, onClose, onLogin, currentSession }: Props) {
  const [customEmail, setCustomEmail] = useState('');
  const [customPass, setCustomPass] = useState('');
  const [isCustom, setIsCustom] = useState(false);
  const [availableUsers, setAvailableUsers] = useState<UserAccount[]>([]);

  useEffect(() => {
    if (isOpen) {
      setAvailableUsers(storage.getUsers());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSelectDemo = (u: UserSession) => {
    onLogin(u);
    onClose();
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customEmail.trim()) {
      alert('Ingresa un correo corporativo.');
      return;
    }

    const emailTrimmed = customEmail.trim().toLowerCase();
    const existing = availableUsers.find(u => u.email.toLowerCase() === emailTrimmed);
    if (existing) {
      if (existing.password && customPass && existing.password !== customPass) {
        alert('Contraseña incorrecta. Por favor verifica tus credenciales (clave por defecto: 123).');
        return;
      }
      onLogin(existing);
      onClose();
      return;
    }

    const lower = emailTrimmed;
    let rol: UserRole = 'COLABORADOR';
    let cargoEnComite = undefined;
    let accesoCopasst = false;
    let accesoCocolab = false;

    if (lower.includes('wendy') || lower.includes('rrhh') || lower.includes('humana')) {
      rol = 'SUPER_ADMIN_RRHH';
      cargoEnComite = 'Validadora COPASST & COCOLAB';
      accesoCopasst = true;
      accesoCocolab = true;
    } else if (lower.includes('admin') || lower.includes('gerencia') || lower.includes('sst')) {
      rol = 'ADMIN_SST';
      cargoEnComite = 'Administrador SG-SST';
      accesoCopasst = true;
      accesoCocolab = true;
    } else if (lower.includes('copasst')) {
      rol = 'COPASST';
      cargoEnComite = 'Delegado COPASST';
      accesoCopasst = true;
    } else if (lower.includes('cocolab') || lower.includes('convivencia')) {
      rol = 'COCOLAB';
      cargoEnComite = 'Delegado COCOLAB';
      accesoCocolab = true;
    }

    const session: UserSession = {
      id: 'u-' + Date.now(),
      nombre: customEmail.split('@')[0].replace('.', ' ').toUpperCase(),
      email: customEmail.trim(),
      password: customPass || '123',
      cedula: '1.020.330.440',
      cargo: rol === 'SUPER_ADMIN_RRHH' ? 'Encargada de Recursos Humanos' : rol === 'ADMIN_SST' ? 'Administrador SG-SST' : rol === 'COPASST' ? 'Miembro COPASST' : rol === 'COCOLAB' ? 'Miembro COCOLAB' : 'Colaborador',
      area: rol === 'SUPER_ADMIN_RRHH' ? 'Gestión Humana' : 'Operaciones',
      rol,
      accesoCopasst,
      accesoCocolab,
      cargoEnComite,
      activo: true,
      createdAt: new Date().toISOString(),
    };

    onLogin(session);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl border border-blue-200/60">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                Iniciar Sesión y Roles de Acceso
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                  SG-SST
                </span>
              </h3>
              <p className="text-xs text-slate-500">
                Separación estricta entre COPASST, COCOLAB, Administración y Trabajadores
              </p>
            </div>
          </div>
          {currentSession && (
            <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg transition-colors">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Legal Disclaimer Box */}
        <div className="px-6 py-3 bg-blue-50/70 border-b border-blue-100 text-xs text-blue-900 flex items-start gap-2.5">
          <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
          <span>
            <strong>Garantía Legal (Res. 652/2012):</strong> El COPASST gestiona la seguridad y riesgos físicos, mientras el COCOLAB gestiona con <strong>estricta reserva legal</strong> las quejas de convivencia. Cada rol tiene vistas y permisos independientes.
          </span>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 overflow-y-auto flex-1 text-slate-700">
          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5">
              Ingreso Rápido por Rol (Selecciona un perfil):
            </h4>

            {/* Quick Demo Roles Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[46vh] overflow-y-auto pr-1">
              {(availableUsers.length > 0 ? availableUsers : DEMO_USERS).map((u) => {
                const isSelected = currentSession?.id === u.id;
                const badgeColor =
                  u.rol === 'SUPER_ADMIN_RRHH'
                    ? 'border-purple-200 bg-purple-50 text-purple-700'
                    : u.rol === 'ADMIN_SST'
                    ? 'border-indigo-200 bg-indigo-50 text-indigo-700'
                    : u.rol === 'AMBOS_COMITES'
                    ? 'border-teal-200 bg-teal-50 text-teal-700'
                    : u.rol === 'COPASST'
                    ? 'border-blue-200 bg-blue-50 text-blue-700'
                    : u.rol === 'COCOLAB'
                    ? 'border-rose-200 bg-rose-50 text-rose-700'
                    : 'border-emerald-200 bg-emerald-50 text-emerald-700';

                const icon =
                  u.rol === 'SUPER_ADMIN_RRHH' ? (
                    <UserCheck className="w-5 h-5 text-purple-600" />
                  ) : u.rol === 'ADMIN_SST' ? (
                    <Shield className="w-5 h-5 text-indigo-600" />
                  ) : u.rol === 'AMBOS_COMITES' ? (
                    <Shield className="w-5 h-5 text-teal-600" />
                  ) : u.rol === 'COPASST' ? (
                    <ShieldAlert className="w-5 h-5 text-blue-600" />
                  ) : u.rol === 'COCOLAB' ? (
                    <HeartHandshake className="w-5 h-5 text-rose-600" />
                  ) : (
                    <User className="w-5 h-5 text-emerald-600" />
                  );

                return (
                  <div
                    key={u.id}
                    onClick={() => handleSelectDemo(u)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50/60 shadow-md ring-2 ring-blue-500/20'
                        : 'border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 shadow-sm'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        {icon}
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${badgeColor}`}>
                          {u.rol === 'SUPER_ADMIN_RRHH' ? 'Wendy RRHH (Validadora)' : u.rol.replace('_', ' ')}
                        </span>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-blue-600 stroke-[3]" />}
                    </div>

                    <div>
                      <h5 className="text-xs font-bold text-slate-900 truncate">{u.nombre}</h5>
                      <p className="text-[11px] text-slate-500 truncate">{u.cargo}</p>
                      <p className="text-[10px] text-slate-400 font-mono mt-0.5">{u.email}</p>
                    </div>

                    <div className="mt-2.5 pt-2 border-t border-slate-100 text-[10px] text-slate-500">
                      {u.rol === 'SUPER_ADMIN_RRHH' && '✓ Validadora total: COPASST + COCOLAB + Crear Usuarios'}
                      {u.rol === 'AMBOS_COMITES' && '✓ Acceso dual: COPASST + COCOLAB'}
                      {u.rol === 'COPASST' && '✓ Inspecciones, actas SST (Sin acceso a quejas privadas)'}
                      {u.rol === 'COCOLAB' && '✓ Expedientes de convivencia, quejas y Ley 2365/2024'}
                      {u.rol === 'ADMIN_SST' && '✓ Control total, configuración de empresa y elecciones'}
                      {u.rol === 'COLABORADOR' && '✓ Tomar fotos de riesgos, votar en urna y radicar quejas'}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Custom Credentials Toggle */}
          <div className="pt-2 border-t border-slate-200">
            <button
              type="button"
              onClick={() => setIsCustom(!isCustom)}
              className="text-xs text-blue-600 hover:text-blue-800 font-semibold"
            >
              {isCustom ? '← Ocultar formulario manual' : '¿Prefieres ingresar con otro correo o contraseña corporativa?'}
            </button>

            {isCustom && (
              <form onSubmit={handleCustomSubmit} className="mt-3 p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Correo Electrónico</label>
                  <input
                    type="email"
                    required
                    value={customEmail}
                    onChange={(e) => setCustomEmail(e.target.value)}
                    placeholder="nombre@empresa.com"
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Contraseña</label>
                  <input
                    type="password"
                    value={customPass}
                    onChange={(e) => setCustomPass(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg flex items-center justify-center gap-1.5 transition-all shadow-sm"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  Ingresar al Sistema
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-[11px] text-slate-500">
            Sesión activa: <strong className="text-slate-800">{currentSession?.nombre || 'Ninguna'}</strong>
          </span>
          {currentSession && (
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg border border-slate-300 transition-colors shadow-sm"
            >
              Cerrar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
