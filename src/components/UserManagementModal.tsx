'use client';

import React, { useState, useEffect } from 'react';
import { 
  Users, 
  UserPlus, 
  Trash2, 
  Edit2, 
  Check, 
  X, 
  Shield, 
  ShieldAlert, 
  HeartHandshake, 
  User, 
  Key, 
  Search, 
  Building2, 
  Briefcase, 
  Phone, 
  Mail, 
  Calendar, 
  AlertTriangle,
  RefreshCw,
  UserCheck
} from 'lucide-react';
import { UserAccount, UserRole, Empleado, NivelRiesgo } from '@/types';
import { storage } from '@/lib/storage';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserAccount | null;
  onSwitchUser?: (u: UserAccount) => void;
}

export default function UserManagementModal({ isOpen, onClose, currentUser, onSwitchUser }: Props) {
  const [activeTab, setActiveTab] = useState<'empleados' | 'usuarios'>('empleados');
  const [users, setUsers] = useState<UserAccount[]>([]);
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [search, setSearch] = useState('');
  const [filtroRiesgo, setFiltroRiesgo] = useState<string>('todos');

  // Employee Form State
  const [isEditingEmpleado, setIsEditingEmpleado] = useState(false);
  const [selectedEmpleado, setSelectedEmpleado] = useState<Empleado | null>(null);
  const [empNombre, setEmpNombre] = useState('');
  const [empCedula, setEmpCedula] = useState('');
  const [empCargo, setEmpCargo] = useState('');
  const [empArea, setEmpArea] = useState('Operaciones');
  const [empSede, setEmpSede] = useState('Sede Principal - Cazucá');
  const [empNivelRiesgo, setEmpNivelRiesgo] = useState<NivelRiesgo>(1);
  const [empEmail, setEmpEmail] = useState('');
  const [empTelefono, setEmpTelefono] = useState('');
  const [empFechaIngreso, setEmpFechaIngreso] = useState(new Date().toISOString().split('T')[0]);
  const [empEstado, setEmpEstado] = useState<'activo' | 'inactivo'>('activo');
  const [empCrearAcceso, setEmpCrearAcceso] = useState(false);
  const [empRolSistema, setEmpRolSistema] = useState<UserRole>('COLABORADOR');

  // User Form State
  const [isEditingUser, setIsEditingUser] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserAccount | null>(null);
  const [uNombre, setUNombre] = useState('');
  const [uEmail, setUEmail] = useState('');
  const [uPassword, setUPassword] = useState('123');
  const [uCedula, setUCedula] = useState('');
  const [uCargo, setUCargo] = useState('');
  const [uArea, setUArea] = useState('Gestión Humana');
  const [uTipoAcceso, setUTipoAcceso] = useState<'copasst' | 'cocolab' | 'ambos' | 'admin' | 'colaborador'>('ambos');
  const [uCargoEnComite, setUCargoEnComite] = useState('Miembro Principal');

  useEffect(() => {
    if (isOpen) {
      setUsers(storage.getUsers());
      setEmpleados(storage.getEmpleados());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // --- Manejo de Empleados ---
  const resetEmpleadoForm = () => {
    setIsEditingEmpleado(false);
    setSelectedEmpleado(null);
    setEmpNombre('');
    setEmpCedula('');
    setEmpCargo('');
    setEmpArea('Operaciones');
    setEmpSede('Sede Principal - Cazucá');
    setEmpNivelRiesgo(1);
    setEmpEmail('');
    setEmpTelefono('');
    setEmpFechaIngreso(new Date().toISOString().split('T')[0]);
    setEmpEstado('activo');
    setEmpCrearAcceso(false);
    setEmpRolSistema('COLABORADOR');
  };

  const handleOpenEditEmpleado = (emp: Empleado) => {
    setSelectedEmpleado(emp);
    setEmpNombre(emp.nombre);
    setEmpCedula(emp.cedula);
    setEmpCargo(emp.cargo);
    setEmpArea(emp.area);
    setEmpSede(emp.sede);
    setEmpNivelRiesgo(emp.nivelRiesgo);
    setEmpEmail(emp.email || '');
    setEmpTelefono(emp.telefono || '');
    setEmpFechaIngreso(emp.fechaIngreso || new Date().toISOString().split('T')[0]);
    setEmpEstado(emp.estado);
    setEmpCrearAcceso(emp.tieneAccesoSistema);
    setIsEditingEmpleado(true);
  };

  const handleSaveEmpleado = (e: React.FormEvent) => {
    e.preventDefault();
    if (!empNombre.trim() || !empCedula.trim()) {
      alert('Por favor ingresa nombre y cédula del empleado.');
      return;
    }

    const nuevoEmpleado: Empleado = {
      id: selectedEmpleado ? selectedEmpleado.id : 'emp-' + Date.now(),
      nombre: empNombre.trim(),
      cedula: empCedula.trim(),
      cargo: empCargo.trim() || 'Colaborador',
      area: empArea,
      sede: empSede,
      nivelRiesgo: empNivelRiesgo,
      email: empEmail.trim() || undefined,
      telefono: empTelefono.trim() || undefined,
      fechaIngreso: empFechaIngreso,
      estado: empEstado,
      tieneAccesoSistema: empCrearAcceso,
      comiteAsignado: empRolSistema === 'COPASST' ? 'COPASST' : empRolSistema === 'COCOLAB' ? 'COCOLAB' : empRolSistema === 'AMBOS_COMITES' ? 'AMBOS' : 'NINGUNO',
    };

    let updated: Empleado[];
    if (selectedEmpleado) {
      updated = storage.updateEmpleado(selectedEmpleado.id, nuevoEmpleado);
    } else {
      updated = storage.addEmpleado(nuevoEmpleado);
    }
    setEmpleados(updated);

    // Si se activó crear acceso al sistema
    if (empCrearAcceso && empEmail.trim()) {
      const existeUsuario = users.some(u => u.email.toLowerCase() === empEmail.trim().toLowerCase());
      if (!existeUsuario) {
        const nuevoUser: UserAccount = {
          id: 'u-' + Date.now(),
          nombre: empNombre.trim(),
          email: empEmail.trim(),
          password: '123',
          cedula: empCedula.trim(),
          cargo: empCargo.trim() || 'Colaborador',
          area: empArea,
          rol: empRolSistema,
          accesoCopasst: empRolSistema === 'COPASST' || empRolSistema === 'AMBOS_COMITES' || empRolSistema === 'SUPER_ADMIN_RRHH' || empRolSistema === 'ADMIN_SST',
          accesoCocolab: empRolSistema === 'COCOLAB' || empRolSistema === 'AMBOS_COMITES' || empRolSistema === 'SUPER_ADMIN_RRHH' || empRolSistema === 'ADMIN_SST',
          cargoEnComite: 'Miembro',
          activo: true,
          createdAt: new Date().toISOString(),
        };
        const updatedUsers = storage.addUser(nuevoUser);
        setUsers(updatedUsers);
      }
    }

    resetEmpleadoForm();
  };

  const handleDeleteEmpleado = (id: string, nombre: string) => {
    if (confirm(`¿Eliminar a ${nombre} del censo de empleados?`)) {
      const updated = storage.deleteEmpleado(id);
      setEmpleados(updated);
    }
  };

  const handleSincronizarTotalEmpresa = () => {
    const totalActivos = empleados.filter(e => e.estado === 'activo').length;
    const company = storage.getCompany();
    storage.saveCompany({
      ...company,
      totalTrabajadores: totalActivos,
    });
    alert(`¡Sincronizado! El número total de trabajadores se actualizó a ${totalActivos} en la configuración de la empresa.`);
  };

  // --- Manejo de Usuarios del Sistema ---
  const resetUserForm = () => {
    setIsEditingUser(false);
    setSelectedUser(null);
    setUNombre('');
    setUEmail('');
    setUPassword('123');
    setUCedula('');
    setUCargo('');
    setUArea('Gestión Humana');
    setUTipoAcceso('ambos');
    setUCargoEnComite('Miembro Principal');
  };

  const handleOpenEditUser = (u: UserAccount) => {
    setSelectedUser(u);
    setUNombre(u.nombre);
    setUEmail(u.email);
    setUPassword(u.password || '123');
    setUCedula(u.cedula);
    setUCargo(u.cargo);
    setUArea(u.area || 'General');
    setUCargoEnComite(u.cargoEnComite || 'Miembro');

    if (u.rol === 'SUPER_ADMIN_RRHH' || (u.accesoCopasst && u.accesoCocolab && u.rol === 'AMBOS_COMITES')) {
      setUTipoAcceso('ambos');
    } else if (u.rol === 'ADMIN_SST') {
      setUTipoAcceso('admin');
    } else if (u.accesoCopasst && !u.accesoCocolab) {
      setUTipoAcceso('copasst');
    } else if (u.accesoCocolab && !u.accesoCopasst) {
      setUTipoAcceso('cocolab');
    } else {
      setUTipoAcceso('colaborador');
    }
    setIsEditingUser(true);
  };

  const handleSaveUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uNombre.trim() || !uEmail.trim()) {
      alert('Ingresa nombre y correo electrónico.');
      return;
    }

    let rol: UserRole = 'COLABORADOR';
    let accesoCopasst = false;
    let accesoCocolab = false;

    if (uTipoAcceso === 'ambos') {
      rol = 'AMBOS_COMITES';
      accesoCopasst = true;
      accesoCocolab = true;
    } else if (uTipoAcceso === 'admin') {
      rol = 'ADMIN_SST';
      accesoCopasst = true;
      accesoCocolab = true;
    } else if (uTipoAcceso === 'copasst') {
      rol = 'COPASST';
      accesoCopasst = true;
    } else if (uTipoAcceso === 'cocolab') {
      rol = 'COCOLAB';
      accesoCocolab = true;
    }

    const userData: UserAccount = {
      id: selectedUser ? selectedUser.id : 'u-' + Date.now(),
      nombre: uNombre.trim(),
      email: uEmail.trim(),
      password: uPassword || '123',
      cedula: uCedula.trim(),
      cargo: uCargo.trim(),
      area: uArea,
      rol,
      accesoCopasst,
      accesoCocolab,
      cargoEnComite: uCargoEnComite,
      activo: true,
      createdAt: selectedUser ? selectedUser.createdAt : new Date().toISOString(),
    };

    let updated: UserAccount[];
    if (selectedUser) {
      updated = storage.updateUser(selectedUser.id, userData);
    } else {
      updated = storage.addUser(userData);
    }
    setUsers(updated);
    resetUserForm();
  };

  const handleDeleteUser = (id: string, nombre: string) => {
    if (confirm(`¿Eliminar la cuenta de acceso de ${nombre}?`)) {
      const updated = storage.deleteUser(id);
      setUsers(updated);
    }
  };

  // Filtrado de Empleados
  const empleadosFiltrados = empleados.filter((emp) => {
    const matchSearch = 
      emp.nombre.toLowerCase().includes(search.toLowerCase()) ||
      emp.cedula.includes(search) ||
      emp.cargo.toLowerCase().includes(search.toLowerCase()) ||
      emp.area.toLowerCase().includes(search.toLowerCase());

    const matchRiesgo = filtroRiesgo === 'todos' || emp.nivelRiesgo === Number(filtroRiesgo);
    return matchSearch && matchRiesgo;
  });

  const countRiesgo1 = empleados.filter(e => e.nivelRiesgo === 1 && e.estado === 'activo').length;
  const countRiesgo5 = empleados.filter(e => e.nivelRiesgo === 5 && e.estado === 'activo').length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[94vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-purple-50 text-purple-700 rounded-xl border border-purple-200/60">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                Gestión de Empleados y Usuarios del Sistema
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">
                  Wendy RRHH
                </span>
              </h3>
              <p className="text-xs text-slate-500">
                Digita la nómina de trabajadores, clasifica sus riesgos (1 y 5) y administra accesos
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 pt-3 bg-white border-b border-slate-200 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => { setActiveTab('empleados'); resetEmpleadoForm(); }}
              className={`px-4 py-2 border-b-2 text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'empleados'
                  ? 'border-purple-600 text-purple-700'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>Censo de Empleados ({empleados.length})</span>
            </button>

            <button
              onClick={() => { setActiveTab('usuarios'); resetUserForm(); }}
              className={`px-4 py-2 border-b-2 text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'usuarios'
                  ? 'border-purple-600 text-purple-700'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Key className="w-4 h-4" />
              <span>Accesos y Roles ({users.length})</span>
            </button>
          </div>

          {activeTab === 'empleados' && !isEditingEmpleado && (
            <div className="flex items-center gap-2 pb-2">
              <button
                onClick={handleSincronizarTotalEmpresa}
                className="px-2.5 py-1.5 text-[11px] font-semibold text-slate-600 hover:text-purple-700 hover:bg-purple-50 rounded-lg border border-slate-200 transition-colors flex items-center gap-1"
                title="Sincronizar total de activos con configuración de empresa"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sincronizar Total</span>
              </button>

              <button
                onClick={() => { resetEmpleadoForm(); setIsEditingEmpleado(true); }}
                className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Digitar Empleado</span>
              </button>
            </div>
          )}

          {activeTab === 'usuarios' && !isEditingUser && (
            <button
              onClick={() => { resetUserForm(); setIsEditingUser(true); }}
              className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm mb-2"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Crear Acceso</span>
            </button>
          )}
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          
          {/* TAB 1: CENSO DE EMPLEADOS */}
          {activeTab === 'empleados' && (
            <>
              {isEditingEmpleado ? (
                /* Formulario Digitar/Editar Empleado */
                <form onSubmit={handleSaveEmpleado} className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                    <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <UserCheck className="w-4 h-4 text-purple-600" />
                      {selectedEmpleado ? 'Editar Datos del Empleado' : 'Digitar Nuevo Empleado en la Empresa'}
                    </h4>
                    <button
                      type="button"
                      onClick={resetEmpleadoForm}
                      className="text-xs text-slate-500 hover:text-slate-800 font-semibold"
                    >
                      Cancelar
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 mb-1">Nombre Completo *</label>
                      <input
                        type="text"
                        required
                        value={empNombre}
                        onChange={(e) => setEmpNombre(e.target.value)}
                        placeholder="ej: Andrés Mauricio Pérez Castro"
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-purple-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Cédula de Ciudadanía *</label>
                      <input
                        type="text"
                        required
                        value={empCedula}
                        onChange={(e) => setEmpCedula(e.target.value)}
                        placeholder="ej: 1.018.442.120"
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-mono text-slate-900 focus:outline-none focus:border-purple-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Cargo en la Empresa *</label>
                      <input
                        type="text"
                        required
                        value={empCargo}
                        onChange={(e) => setEmpCargo(e.target.value)}
                        placeholder="ej: Operador de Montacargas"
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-purple-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Área o Departamento *</label>
                      <select
                        value={empArea}
                        onChange={(e) => setEmpArea(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-purple-600"
                      >
                        <option value="Operaciones">Operaciones / Planta</option>
                        <option value="Logística y Bodega">Logística y Bodega</option>
                        <option value="Mantenimiento Industrial">Mantenimiento Industrial</option>
                        <option value="Gestión Humana y Talento">Gestión Humana y Talento</option>
                        <option value="Seguridad y Salud (SST)">Seguridad y Salud (SST)</option>
                        <option value="Administración y Finanzas">Administración y Finanzas</option>
                        <option value="Alta Dirección">Alta Dirección</option>
                        <option value="Tecnología">Tecnología e Infraestructura</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Sede / Centro de Trabajo *</label>
                      <input
                        type="text"
                        required
                        value={empSede}
                        onChange={(e) => setEmpSede(e.target.value)}
                        placeholder="ej: Sede Cazucá o Planta 2"
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-purple-600"
                      />
                    </div>

                    {/* Nivel de Riesgo del Puesto (Riesgo 1 a 5) */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Nivel de Riesgo ARL del Cargo *
                      </label>
                      <select
                        value={empNivelRiesgo}
                        onChange={(e) => setEmpNivelRiesgo(Number(e.target.value) as NivelRiesgo)}
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-bold text-blue-700 focus:outline-none focus:border-purple-600"
                      >
                        <option value={1}>Clase I (Mínimo - Administrativo / Oficina)</option>
                        <option value={2}>Clase II (Bajo - Manufactura liviana / Almacén)</option>
                        <option value={3}>Clase III (Medio - Transporte / Procesamiento)</option>
                        <option value={4}>Clase IV (Alto - Industria pesada / Químicos)</option>
                        <option value={5}>Clase V (Máximo - Operativo / Alturas / Montacargas)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Correo Electrónico</label>
                      <input
                        type="email"
                        value={empEmail}
                        onChange={(e) => setEmpEmail(e.target.value)}
                        placeholder="correo@empresa.co"
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-purple-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Teléfono / Celular</label>
                      <input
                        type="text"
                        value={empTelefono}
                        onChange={(e) => setEmpTelefono(e.target.value)}
                        placeholder="310 000 0000"
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-purple-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Fecha de Ingreso</label>
                      <input
                        type="date"
                        value={empFechaIngreso}
                        onChange={(e) => setEmpFechaIngreso(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-purple-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Estado Laboral</label>
                      <select
                        value={empEstado}
                        onChange={(e) => setEmpEstado(e.target.value as any)}
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-purple-600"
                      >
                        <option value="activo">Activo (Vinculado)</option>
                        <option value="inactivo">Inactivo / Retirado</option>
                      </select>
                    </div>
                  </div>

                  {/* Switch para crearle usuario del sistema */}
                  <div className="p-3 bg-white border border-purple-200 rounded-xl space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-purple-900">
                      <input
                        type="checkbox"
                        checked={empCrearAcceso}
                        onChange={(e) => setEmpCrearAcceso(e.target.checked)}
                        className="w-4 h-4 text-purple-600 rounded border-slate-300 focus:ring-purple-500"
                      />
                      <span>¿Habilitar acceso como usuario del sistema para este empleado?</span>
                    </label>

                    {empCrearAcceso && (
                      <div className="pt-2 border-t border-purple-100 flex flex-col sm:flex-row items-start sm:items-center gap-3 text-xs">
                        <span className="text-slate-600">Rol asignado:</span>
                        <select
                          value={empRolSistema}
                          onChange={(e) => setEmpRolSistema(e.target.value as UserRole)}
                          className="px-3 py-1.5 bg-purple-50 border border-purple-300 rounded-lg text-xs font-bold text-purple-900"
                        >
                          <option value="COLABORADOR">Colaborador (Votar en elecciones y reportar riesgos)</option>
                          <option value="COPASST">Delegado COPASST (Inspecciones y actas SST)</option>
                          <option value="COCOLAB">Delegado COCOLAB (Casos confidenciales convivencia)</option>
                          <option value="AMBOS_COMITES">Ambos Comités (COPASST + COCOLAB)</option>
                        </select>
                        <span className="text-[11px] text-slate-500 font-mono">(Clave inicial: 123)</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={resetEmpleadoForm}
                      className="px-4 py-2 bg-white text-slate-700 text-xs font-semibold rounded-lg border border-slate-300 hover:bg-slate-100 transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-lg shadow-sm flex items-center gap-1.5 transition-all"
                    >
                      <Check className="w-4 h-4" />
                      <span>{selectedEmpleado ? 'Guardar Cambios' : 'Registrar Empleado'}</span>
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  {/* Métricas Rápidas del Censo */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                      <span className="text-slate-500 text-[11px] block">Total Registrados</span>
                      <strong className="text-lg text-slate-900 font-mono">{empleados.length}</strong>
                      <span className="text-[10px] text-emerald-600 block mt-0.5">
                        {empleados.filter(e => e.estado === 'activo').length} activos
                      </span>
                    </div>

                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl">
                      <span className="text-blue-700 text-[11px] block font-semibold">Riesgo Clase I</span>
                      <strong className="text-lg text-blue-900 font-mono">{countRiesgo1}</strong>
                      <span className="text-[10px] text-blue-600 block mt-0.5">Oficinas / Admin</span>
                    </div>

                    <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl">
                      <span className="text-rose-700 text-[11px] block font-semibold">Riesgo Clase V</span>
                      <strong className="text-lg text-rose-900 font-mono">{countRiesgo5}</strong>
                      <span className="text-[10px] text-rose-600 block mt-0.5">Operativo / Alturas</span>
                    </div>

                    <div className="p-3 bg-purple-50 border border-purple-200 rounded-xl">
                      <span className="text-purple-700 text-[11px] block font-semibold">Con Acceso al Sistema</span>
                      <strong className="text-lg text-purple-900 font-mono">
                        {empleados.filter(e => e.tieneAccesoSistema).length}
                      </strong>
                      <span className="text-[10px] text-purple-600 block mt-0.5">Usuarios creados</span>
                    </div>
                  </div>

                  {/* Barra de Filtros y Búsqueda */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="relative w-full sm:w-72">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Buscar por nombre, cédula o cargo..."
                        className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-purple-600"
                      />
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <select
                        value={filtroRiesgo}
                        onChange={(e) => setFiltroRiesgo(e.target.value)}
                        className="px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-700 font-medium"
                      >
                        <option value="todos">Todos los Riesgos</option>
                        <option value="1">Solo Riesgo Clase I (Admin)</option>
                        <option value="2">Solo Riesgo Clase II</option>
                        <option value="3">Solo Riesgo Clase III</option>
                        <option value="4">Solo Riesgo Clase IV</option>
                        <option value="5">Solo Riesgo Clase V (Operativo)</option>
                      </select>
                    </div>
                  </div>

                  {/* Lista de Empleados */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {empleadosFiltrados.map((emp) => (
                      <div
                        key={emp.id}
                        className="p-3.5 bg-white border border-slate-200 rounded-xl shadow-sm hover:border-purple-300 transition-all flex flex-col justify-between space-y-2.5"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-sm flex-shrink-0">
                              {emp.nombre.charAt(0)}
                            </div>
                            <div className="min-w-0">
                              <h4 className="text-xs font-bold text-slate-900 truncate">{emp.nombre}</h4>
                              <p className="text-[11px] text-slate-500 truncate">{emp.cargo}</p>
                            </div>
                          </div>

                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border flex-shrink-0 ${
                            emp.nivelRiesgo === 5
                              ? 'bg-rose-50 text-rose-800 border-rose-200'
                              : emp.nivelRiesgo === 1
                              ? 'bg-blue-50 text-blue-800 border-blue-200'
                              : 'bg-amber-50 text-amber-800 border-amber-200'
                          }`}>
                            Clase {['I','II','III','IV','V'][emp.nivelRiesgo - 1]}
                          </span>
                        </div>

                        <div className="text-[10px] text-slate-500 space-y-0.5 border-t border-slate-100 pt-2">
                          <p><strong>C.C:</strong> {emp.cedula} • <strong>Área:</strong> {emp.area}</p>
                          <p className="truncate"><strong>Sede:</strong> {emp.sede}</p>
                          {emp.email && <p className="truncate font-mono text-slate-400">{emp.email}</p>}
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[10px]">
                          <span className={emp.estado === 'activo' ? 'text-emerald-700 font-semibold' : 'text-slate-400'}>
                            ● {emp.estado === 'activo' ? 'Activo' : 'Inactivo'}
                          </span>

                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => handleOpenEditEmpleado(emp)}
                              className="p-1.5 text-slate-500 hover:text-purple-700 hover:bg-purple-50 rounded-lg transition-colors"
                              title="Editar empleado"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteEmpleado(emp.id, emp.nombre)}
                              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                              title="Eliminar del censo"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </>
          )}

          {/* TAB 2: ACCESOS Y USUARIOS AL SISTEMA */}
          {activeTab === 'usuarios' && (
            <>
              {isEditingUser ? (
                /* Formulario Crear/Editar Usuario de Acceso */
                <form onSubmit={handleSaveUser} className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                    <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <Key className="w-4 h-4 text-purple-600" />
                      {selectedUser ? 'Editar Cuenta de Usuario' : 'Crear Nueva Cuenta de Acceso'}
                    </h4>
                    <button
                      type="button"
                      onClick={resetUserForm}
                      className="text-xs text-slate-500 hover:text-slate-800 font-semibold"
                    >
                      Cancelar
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Nombre Completo *</label>
                      <input
                        type="text"
                        required
                        value={uNombre}
                        onChange={(e) => setUNombre(e.target.value)}
                        placeholder="ej: Diana Milena Rincón"
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-purple-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Correo Electrónico (Login) *</label>
                      <input
                        type="email"
                        required
                        value={uEmail}
                        onChange={(e) => setUEmail(e.target.value)}
                        placeholder="usuario@empresa.co"
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-purple-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Contraseña de Acceso</label>
                      <input
                        type="text"
                        value={uPassword}
                        onChange={(e) => setUPassword(e.target.value)}
                        placeholder="123"
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-mono text-slate-900 focus:outline-none focus:border-purple-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Cédula de Ciudadanía</label>
                      <input
                        type="text"
                        value={uCedula}
                        onChange={(e) => setUCedula(e.target.value)}
                        placeholder="52.981.440"
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-mono text-slate-900 focus:outline-none focus:border-purple-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Cargo en la Empresa</label>
                      <input
                        type="text"
                        value={uCargo}
                        onChange={(e) => setUCargo(e.target.value)}
                        placeholder="Supervisora de Bodega"
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-purple-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Área</label>
                      <input
                        type="text"
                        value={uArea}
                        onChange={(e) => setUArea(e.target.value)}
                        placeholder="Operaciones"
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-purple-600"
                      />
                    </div>

                    {/* Selector de Rol y Permisos */}
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Permisos y Comité Asignado *
                      </label>
                      <select
                        value={uTipoAcceso}
                        onChange={(e) => setUTipoAcceso(e.target.value as any)}
                        className="w-full px-3 py-2.5 bg-white border border-slate-300 rounded-lg text-xs font-bold text-purple-900 focus:outline-none focus:border-purple-600"
                      >
                        <option value="ambos">Ambos Comités (Acceso dual a COPASST y COCOLAB)</option>
                        <option value="copasst">Solo COPASST (Inspecciones y actas SST - Bloqueado de quejas COCOLAB)</option>
                        <option value="cocolab">Solo COCOLAB (Comité de Convivencia - Casos reservados Ley 1010/2365)</option>
                        <option value="admin">Administrador SG-SST (Control total de auditoría y elecciones)</option>
                        <option value="colaborador">Colaborador / Trabajador (Reportar riesgos y votar en urnas)</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Cargo en el Comité (Opcional)</label>
                      <input
                        type="text"
                        value={uCargoEnComite}
                        onChange={(e) => setUCargoEnComite(e.target.value)}
                        placeholder="ej: Presidente, Secretario, Vocal o Delegado"
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-purple-600"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={resetUserForm}
                      className="px-4 py-2 bg-white text-slate-700 text-xs font-semibold rounded-lg border border-slate-300 hover:bg-slate-100 transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-lg shadow-sm flex items-center gap-1.5 transition-all"
                    >
                      <Check className="w-4 h-4" />
                      <span>{selectedUser ? 'Guardar Cambios' : 'Crear Usuario'}</span>
                    </button>
                  </div>
                </form>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {users.map((u) => (
                    <div
                      key={u.id}
                      className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm hover:border-purple-300 transition-all flex flex-col justify-between space-y-2.5"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-sm flex-shrink-0">
                            {u.nombre.charAt(0)}
                          </div>
                          <div className="min-w-0">
                            <h4 className="text-xs font-bold text-slate-900 truncate">{u.nombre}</h4>
                            <p className="text-[11px] text-slate-500 truncate">{u.cargo}</p>
                          </div>
                        </div>

                        <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200 flex-shrink-0">
                          {u.rol === 'SUPER_ADMIN_RRHH' ? 'Wendy RRHH' : u.rol.replace('_', ' ')}
                        </span>
                      </div>

                      <div className="text-[10px] text-slate-500 space-y-0.5 border-t border-slate-100 pt-2 font-mono">
                        <p className="truncate"><strong>Email:</strong> {u.email}</p>
                        <p><strong>Cédula:</strong> {u.cedula} • <strong>Clave:</strong> {u.password || '123'}</p>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[10px]">
                        <span className="text-slate-600">
                          {u.accesoCopasst && u.accesoCocolab ? 'COPASST + COCOLAB' : u.accesoCopasst ? 'Solo COPASST' : u.accesoCocolab ? 'Solo COCOLAB' : 'Colaborador'}
                        </span>

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleOpenEditUser(u)}
                            className="p-1.5 text-slate-500 hover:text-purple-700 hover:bg-purple-50 rounded-lg transition-colors"
                            title="Editar usuario"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          {u.rol !== 'SUPER_ADMIN_RRHH' && (
                            <button
                              onClick={() => handleDeleteUser(u.id, u.nombre)}
                              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                              title="Eliminar usuario"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>
            Total en Nómina: <strong>{empleados.length} empleados</strong> ({empleados.filter(e => e.estado === 'activo').length} activos)
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-white hover:bg-slate-100 text-slate-700 font-semibold rounded-lg border border-slate-300 transition-colors shadow-sm"
          >
            Cerrar
          </button>
        </div>

      </div>
    </div>
  );
}
