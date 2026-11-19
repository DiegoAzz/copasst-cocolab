'use client';

import React, { useState } from 'react';
import { Users, UserPlus, Trash2, Edit2, Check, X, Shield, ShieldAlert, HeartHandshake, User, Key, Search } from 'lucide-react';
import { UserAccount, UserRole } from '@/types';
import { storage } from '@/lib/storage';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserAccount | null;
  onSwitchUser?: (u: UserAccount) => void;
}

export default function UserManagementModal({ isOpen, onClose, currentUser, onSwitchUser }: Props) {
  const [users, setUsers] = useState<UserAccount[]>(storage.getUsers());
  const [search, setSearch] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserAccount | null>(null);

  // Form State
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('123');
  const [cedula, setCedula] = useState('');
  const [cargo, setCargo] = useState('');
  const [area, setArea] = useState('Gestión Humana');
  const [tipoAcceso, setTipoAcceso] = useState<'copasst' | 'cocolab' | 'ambos' | 'admin' | 'colaborador'>('ambos');
  const [cargoEnComite, setCargoEnComite] = useState('Miembro Principal');

  if (!isOpen) return null;

  const resetForm = () => {
    setIsEditing(false);
    setSelectedUser(null);
    setNombre('');
    setEmail('');
    setPassword('123');
    setCedula('');
    setCargo('');
    setArea('Gestión Humana');
    setTipoAcceso('ambos');
    setCargoEnComite('Miembro Principal');
  };

  const handleOpenCreate = () => {
    resetForm();
    setIsEditing(true);
  };

  const handleOpenEdit = (u: UserAccount) => {
    setSelectedUser(u);
    setNombre(u.nombre);
    setEmail(u.email);
    setPassword(u.password || '123');
    setCedula(u.cedula);
    setCargo(u.cargo);
    setArea(u.area || 'General');
    setCargoEnComite(u.cargoEnComite || 'Miembro');

    if (u.rol === 'SUPER_ADMIN_RRHH' || (u.accesoCopasst && u.accesoCocolab && u.rol === 'AMBOS_COMITES')) {
      setTipoAcceso('ambos');
    } else if (u.rol === 'ADMIN_SST') {
      setTipoAcceso('admin');
    } else if (u.accesoCopasst && !u.accesoCocolab) {
      setTipoAcceso('copasst');
    } else if (u.accesoCocolab && !u.accesoCopasst) {
      setTipoAcceso('cocolab');
    } else {
      setTipoAcceso('colaborador');
    }

    setIsEditing(true);
  };

  const handleDelete = (id: string, nombreUser: string) => {
    if (confirm(`¿Estás seguro de eliminar el usuario ${nombreUser}?`)) {
      const updated = storage.deleteUser(id);
      setUsers(updated);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre.trim() || !email.trim()) {
      alert('Ingresa nombre y correo electrónico.');
      return;
    }

    let rol: UserRole = 'COLABORADOR';
    let accesoCopasst = false;
    let accesoCocolab = false;

    if (tipoAcceso === 'ambos') {
      rol = 'AMBOS_COMITES';
      accesoCopasst = true;
      accesoCocolab = true;
    } else if (tipoAcceso === 'admin') {
      rol = 'ADMIN_SST';
      accesoCopasst = true;
      accesoCocolab = true;
    } else if (tipoAcceso === 'copasst') {
      rol = 'COPASST';
      accesoCopasst = true;
      accesoCocolab = false;
    } else if (tipoAcceso === 'cocolab') {
      rol = 'COCOLAB';
      accesoCopasst = false;
      accesoCocolab = true;
    }

    const userData: UserAccount = {
      id: selectedUser ? selectedUser.id : 'u-' + Date.now(),
      nombre: nombre.trim(),
      email: email.trim().toLowerCase(),
      password: password.trim(),
      cedula: cedula.trim() || '1.000.000.000',
      cargo: cargo.trim() || 'Colaborador',
      area: area.trim(),
      rol,
      accesoCopasst,
      accesoCocolab,
      cargoEnComite: cargoEnComite.trim(),
      activo: true,
      createdAt: selectedUser ? selectedUser.createdAt : new Date().toISOString(),
    };

    let updatedList: UserAccount[];
    if (selectedUser) {
      updatedList = storage.updateUser(selectedUser.id, userData);
    } else {
      updatedList = storage.addUser(userData);
    }

    setUsers(updatedList);
    resetForm();
  };

  const filteredUsers = users.filter(u =>
    u.nombre.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    u.cargo.toLowerCase().includes(search.toLowerCase()) ||
    u.rol.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl border border-blue-200/60">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                Módulo de Gestión y Creación de Usuarios
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                  RRHH & Comités
                </span>
              </h3>
              <p className="text-xs text-slate-500">
                Administración de accesos para Wendy (RRHH), COPASST, COCOLAB o ambos comités
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4 overflow-y-auto flex-1 text-slate-700">
          {!isEditing ? (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Buscar por nombre, correo, cargo o rol..."
                    className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <button
                  onClick={handleOpenCreate}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-sm flex items-center justify-center gap-1.5 transition-all"
                >
                  <UserPlus className="w-4 h-4" />
                  Crear Nuevo Usuario
                </button>
              </div>

              {/* Users List */}
              <div className="space-y-2.5">
                {filteredUsers.map((u) => {
                  const isCurrent = currentUser?.id === u.id;
                  return (
                    <div
                      key={u.id}
                      className={`p-4 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 transition-all ${
                        isCurrent ? 'bg-blue-50/50 border-blue-300' : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
                      }`}
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className="text-sm font-bold text-slate-900">{u.nombre}</span>
                          {u.accesoCopasst && u.accesoCocolab ? (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 border border-purple-200">
                              ✓ COPASST & COCOLAB
                            </span>
                          ) : u.accesoCopasst ? (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200">
                              ✓ Solo COPASST
                            </span>
                          ) : u.accesoCocolab ? (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-200">
                              ✓ Solo COCOLAB
                            </span>
                          ) : (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                              Colaborador General
                            </span>
                          )}
                          {isCurrent && (
                            <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800">
                              Sesión Actual
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-slate-600">
                          {u.cargo} • Área: {u.area}
                        </p>
                        <p className="text-[11px] text-slate-400 font-mono">
                          {u.email} • C.C. {u.cedula} {u.cargoEnComite && `• Rol: ${u.cargoEnComite}`}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-center">
                        {onSwitchUser && !isCurrent && (
                          <button
                            onClick={() => {
                              onSwitchUser(u);
                              onClose();
                            }}
                            className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold border border-slate-200 transition-colors"
                            title="Cambiar sesión a este usuario"
                          >
                            Entrar como
                          </button>
                        )}
                        <button
                          onClick={() => handleOpenEdit(u)}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Editar usuario"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        {u.id !== 'u-wendy' && (
                          <button
                            onClick={() => handleDelete(u.id, u.nombre)}
                            className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            title="Eliminar usuario"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Create / Edit User Form */
            <form onSubmit={handleSave} className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <h4 className="text-sm font-bold text-slate-900">
                  {selectedUser ? `Editar Usuario: ${selectedUser.nombre}` : 'Registrar Nuevo Usuario'}
                </h4>
                <button
                  type="button"
                  onClick={resetForm}
                  className="text-xs text-slate-500 hover:text-slate-800"
                >
                  ← Volver a la lista
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    required
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Ej: Wendy Martínez"
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Correo Electrónico (Usuario de Acceso) *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nombre@empresa.co"
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Número de Cédula
                  </label>
                  <input
                    type="text"
                    value={cedula}
                    onChange={(e) => setCedula(e.target.value)}
                    placeholder="Ej: 1.025.441.220"
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Contraseña de Acceso
                  </label>
                  <input
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="123"
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-blue-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Cargo en la Empresa
                  </label>
                  <input
                    type="text"
                    value={cargo}
                    onChange={(e) => setCargo(e.target.value)}
                    placeholder="Ej: Analista de Gestión Humana"
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Área o Departamento
                  </label>
                  <input
                    type="text"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    placeholder="Ej: Recursos Humanos, Operaciones"
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Selector de Permisos de Comité */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                <label className="block text-xs font-bold text-slate-900">
                  ¿A qué comités o módulos tendrá acceso este usuario? *
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <div
                    onClick={() => setTipoAcceso('copasst')}
                    className={`p-3 rounded-xl border cursor-pointer transition-all ${
                      tipoAcceso === 'copasst'
                        ? 'bg-blue-50 border-blue-500 ring-2 ring-blue-500/20'
                        : 'bg-white border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-bold text-xs text-blue-700 mb-1">
                      <ShieldAlert className="w-4 h-4" />
                      Solo COPASST
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Inspecciones, actas SST (Sin acceso a quejas COCOLAB).
                    </p>
                  </div>

                  <div
                    onClick={() => setTipoAcceso('cocolab')}
                    className={`p-3 rounded-xl border cursor-pointer transition-all ${
                      tipoAcceso === 'cocolab'
                        ? 'bg-rose-50 border-rose-500 ring-2 ring-rose-500/20'
                        : 'bg-white border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-bold text-xs text-rose-700 mb-1">
                      <HeartHandshake className="w-4 h-4" />
                      Solo COCOLAB
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Buzón confidencial, actas de convivencia y Ley 2365/2024.
                    </p>
                  </div>

                  <div
                    onClick={() => setTipoAcceso('ambos')}
                    className={`p-3 rounded-xl border cursor-pointer transition-all ${
                      tipoAcceso === 'ambos'
                        ? 'bg-purple-50 border-purple-500 ring-2 ring-purple-500/20'
                        : 'bg-white border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-bold text-xs text-purple-700 mb-1">
                      <Shield className="w-4 h-4" />
                      Ambos Comités
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Acceso dual (Perfil Wendy / Recursos Humanos para validar todo).
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Rol o Cargo en el Comité
                  </label>
                  <input
                    type="text"
                    value={cargoEnComite}
                    onChange={(e) => setCargoEnComite(e.target.value)}
                    placeholder="Ej: Validadora RRHH, Presidente, Secretario, Vocal Principal"
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Form Buttons */}
              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg border border-slate-300 transition-colors shadow-sm"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg shadow-sm flex items-center gap-1.5 transition-all"
                >
                  <Check className="w-4 h-4" />
                  {selectedUser ? 'Guardar Cambios' : 'Registrar Usuario'}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Total de usuarios en la plataforma: <strong>{users.length}</strong>
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg border border-slate-300 shadow-sm"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
