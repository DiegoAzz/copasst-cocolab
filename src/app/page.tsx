'use client';

import React, { useState, useEffect } from 'react';
import {
  Shield,
  ShieldAlert,
  HeartHandshake,
  Camera,
  FileText,
  Vote,
  Building2,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ArrowRight,
  Plus,
  Download,
  Filter,
  Check,
  Lock,
  ExternalLink,
  ChevronRight,
  Eye,
  Info,
  UserCheck,
  BookOpen,
  LogIn,
  User,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import BottomNav from '@/components/BottomNav';
import CameraCaptureModal from '@/components/CameraCaptureModal';
import ActaEditorModal from '@/components/ActaEditorModal';
import QuejaModal from '@/components/QuejaModal';
import ElectionModal from '@/components/ElectionModal';
import CompanyModal from '@/components/CompanyModal';
import ManualModal from '@/components/ManualModal';
import LoginModal from '@/components/LoginModal';
import UserManagementModal from '@/components/UserManagementModal';
import CommitteeProgramModal from '@/components/CommitteeProgramModal';
import { storage, formatRiesgos } from '@/lib/storage';
import { CompanyProfile, Member, Evidence, Acta, QuejaCocolab, ProcesoEleccion, UserSession, CronogramaItem } from '@/types';
import { calcularEstructuraCopasst, calcularEstructuraCocolab, PERIODICIDAD_LEGAL } from '@/lib/colombianLaw';
import { exportarActaPDF } from '@/lib/pdfGenerator';
import { FUNCIONES_CARGOS_COPASST, FUNCIONES_CARGOS_COCOLAB, TIEMPO_DEDICACION_LEGAL, committeeProgramStorage } from '@/lib/committeeProgram';

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');

  // Session & RBAC
  const [session, setSession] = useState<UserSession | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // App Data State
  const [company, setCompany] = useState<CompanyProfile>(storage.getCompany());
  const [members, setMembers] = useState<Member[]>(storage.getMembers());
  const [evidences, setEvidences] = useState<Evidence[]>(storage.getEvidences());
  const [actas, setActas] = useState<Acta[]>(storage.getActas());
  const [quejas, setQuejas] = useState<QuejaCocolab[]>(storage.getQuejas());
  const [eleccion, setEleccion] = useState<ProcesoEleccion>(storage.getEleccion());

  // Modals
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isActaModalOpen, setIsActaModalOpen] = useState(false);
  const [selectedActaForEdit, setSelectedActaForEdit] = useState<Acta | undefined>(undefined);
  const [isQuejaModalOpen, setIsQuejaModalOpen] = useState(false);
  const [isElectionModalOpen, setIsElectionModalOpen] = useState(false);
  const [isCompanyModalOpen, setIsCompanyModalOpen] = useState(false);
  const [isManualModalOpen, setIsManualModalOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isProgramModalOpen, setIsProgramModalOpen] = useState(false);
  const [programInitialTab, setProgramInitialTab] = useState<'cronograma' | 'funciones' | 'tiempos'>('cronograma');
  const [programInitialComite, setProgramInitialComite] = useState<'TODOS' | 'COPASST' | 'COCOLAB'>('TODOS');

  // Evidence Filter
  const [evidenceFilter, setEvidenceFilter] = useState<'todos' | 'abierto' | 'en_proceso' | 'subsanado'>('todos');

  // Preview Image Modal
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    setSession(storage.getSession());

    const refreshData = () => {
      setCompany(storage.getCompany());
      setMembers(storage.getMembers());
      setEvidences(storage.getEvidences());
      setActas(storage.getActas());
      setQuejas(storage.getQuejas());
      setEleccion(storage.getEleccion());
    };

    const refreshSession = () => {
      setSession(storage.getSession());
    };

    window.addEventListener('cocopasst_data_changed', refreshData);
    window.addEventListener('cocopasst_session_changed', refreshSession);
    return () => {
      window.removeEventListener('cocopasst_data_changed', refreshData);
      window.removeEventListener('cocopasst_session_changed', refreshSession);
    };
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex items-center gap-3 text-blue-600 font-bold">
          <Shield className="w-8 h-8 animate-spin" />
          <span>Cargando plataforma SG-SST...</span>
        </div>
      </div>
    );
  }

  // Legal structure calculation
  const copasstReq = calcularEstructuraCopasst(company.totalTrabajadores);
  const cocolabReq = calcularEstructuraCocolab(company.totalTrabajadores);

  // Stats
  const evidenciasAbiertas = evidences.filter(e => e.estado === 'abierto').length;
  const evidenciasSubsanadas = evidences.filter(e => e.estado === 'subsanado').length;
  const actasCopasstCount = actas.filter(a => a.comite === 'COPASST').length;
  const actasCocolabCount = actas.filter(a => a.comite === 'COCOLAB').length;

  const handleSaveEvidence = (newEv: Evidence) => {
    const updated = storage.addEvidence(newEv);
    setEvidences(updated);
  };

  const handleSaveActa = (newActa: Acta) => {
    const exists = actas.some(a => a.id === newActa.id);
    let updated: Acta[];
    if (exists) {
      updated = storage.updateActa(newActa.id, newActa);
    } else {
      updated = storage.addActa(newActa);
    }
    setActas(updated);
  };

  const handleRedactarActaDesdeCronograma = (tituloMes: string, comite: 'COPASST' | 'COCOLAB') => {
    setIsProgramModalOpen(false);
    const year = new Date().getFullYear();
    const count = actas.filter(a => a.comite === comite).length + 1;
    const consecutivo = `ACTA-${comite}-${year}-${String(count).padStart(3, '0')}`;
    
    setSelectedActaForEdit({
      id: 'acta-' + Date.now(),
      consecutivo,
      tipo: comite === 'COPASST' ? 'ordinaria_copasst' : 'ordinaria_cocolab',
      comite,
      titulo: `Reunión Ordinaria de ${comite} - ${tituloMes}`,
      fecha: new Date().toISOString().split('T')[0],
      horaInicio: '09:00 AM',
      horaFin: '11:00 AM',
      lugar: 'Sede Principal SYSNET - Sala de Juntas',
      asistentes: members
        .filter(m => m.comite === comite)
        .map(m => ({
          nombre: m.nombre,
          cedula: m.cedula,
          cargo: m.cargo,
          rolEnComite: `${m.rol} (${m.condicion})`,
          representacion: m.representacion,
          asistio: true,
        })),
      ordenDelDia: [
        '1. Verificación del quórum reglamentario',
        '2. Revisión y aprobación del acta anterior',
        `3. Desarrollo de tareas programadas del mes: ${tituloMes}`,
        '4. Asignación y seguimiento de compromisos',
        '5. Proposiciones y varios',
      ],
      desarrolloPuntos: [
        {
          punto: `Desarrollo de actividades programadas: ${tituloMes}`,
          desarrollo: `En la fecha se instala la sesión ordinaria de ${comite} en las instalaciones de SYSNET S.A.S. Se abordaron los puntos fijados en el cronograma anual de actividades: ${tituloMes}, revisando inspecciones, compromisos y entregables correspondientes al presente mes.`,
        },
      ],
      compromisos: [
        {
          id: 'comp-' + Date.now(),
          descripcion: `Ejecutar y documentar los entregables correspondientes a ${tituloMes}`,
          responsable: comite === 'COPASST' ? 'OSORIO CHICO JAIDER LINCOLN / MARIMON CAROLINA' : 'MERLANO TOMAS / RIVERO CESAR',
          fechaLimite: new Date(Date.now() + 15 * 86400000).toISOString().split('T')[0],
          estado: 'en_proceso',
        },
      ],
      evidenciasIds: [],
      firmasDigitales: [],
      estado: 'borrador',
      creadoPor: session?.nombre || 'Secretario del Comité',
      createdAt: new Date().toISOString(),
    });
    setIsActaModalOpen(true);
  };

  const handleSaveQueja = (newQueja: QuejaCocolab) => {
    const updated = storage.addQueja(newQueja);
    setQuejas(updated);
  };

  const handleVote = (candidatoId: string | 'blanco') => {
    const current = { ...eleccion };
    if (candidatoId === 'blanco') {
      current.votosEnBlanco = (current.votosEnBlanco || 0) + 1;
    } else {
      current.candidatos = current.candidatos.map(c =>
        c.id === candidatoId ? { ...c, votos: c.votos + 1 } : c
      );
    }
    current.totalVotosEmitidos = (current.totalVotosEmitidos || 0) + 1;
    storage.saveEleccion(current);
    setEleccion(current);
  };

  const handleGenerarActaPosesion = (el: ProcesoEleccion) => {
    const sorted = [...el.candidatos].sort((a, b) => b.votos - a.votos);
    const ganadoresTrabajadores = sorted.slice(0, copasstReq.totalPrincipalesPorParte + copasstReq.totalSuplentesPorParte);

    const year = new Date().getFullYear();
    const nuevaActa: Acta = {
      id: 'acta-posesion-' + Date.now(),
      consecutivo: `ACTA-POS-${year}-001`,
      tipo: 'posesion_comite',
      comite: el.comite,
      titulo: `Acta de Cierre de Escrutinio y Posesión de Miembros - ${el.comite} (${el.periodo})`,
      fecha: new Date().toISOString().split('T')[0],
      horaInicio: '04:00 PM',
      horaFin: '05:30 PM',
      lugar: 'Sede Principal - Auditorio Central',
      asistentes: [
        ...el.designadosEmpleador.map(d => ({
          nombre: d.nombre,
          cedula: d.cedula,
          cargo: d.cargo,
          rolEnComite: d.condicion === 'Principal' ? 'Presidente / Miembro Principal' : 'Suplente',
          representacion: 'Empleador' as const,
          asistio: true,
        })),
        ...ganadoresTrabajadores.map((g, idx) => ({
          nombre: g.nombre,
          cedula: g.cedula,
          cargo: g.cargo,
          rolEnComite: idx === 0 ? 'Secretario / Miembro Principal' : 'Suplente',
          representacion: 'Trabajadores' as const,
          asistio: true,
        })),
      ],
      ordenDelDia: [
        '1. Instalación de la mesa de escrutinio y verificación de votos emitidos.',
        '2. Conteo final y proclamación de representantes electos por los trabajadores.',
        '3. Presentación de delegados designados por la Alta Gerencia / Empleador.',
        '4. Designación oficial de Presidente y Secretario conforme a la Resolución 2013 de 1986.',
        '5. Juramento de posesión, firmas y cierre.',
      ],
      desarrolloPuntos: [
        {
          punto: '1. Escrutinio Final',
          desarrollo: `Se contabilizaron ${el.totalVotosEmitidos} votos en urna virtual, con ${el.votosEnBlanco} votos en blanco. Se constata transparencia y participación conforme a la normativa colombiana.`,
        },
        {
          punto: '2. Proclamación de Electos',
          desarrollo: `Por mayoría de votos populares, se declaran electos por los trabajadores: ${ganadoresTrabajadores.map(g => `${g.nombre} (${g.votos} votos)`).join(', ')}.`,
        },
      ],
      compromisos: [
        {
          id: 'c-pos-1',
          descripcion: 'Elaborar el Plan de Trabajo Anual del comité y presentar a Gerencia General.',
          responsable: 'Comité posesionado',
          fechaLimite: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
          estado: 'pendiente',
        },
      ],
      evidenciasIds: [],
      firmasDigitales: [],
      estado: 'aprobada',
      creadoPor: company.responsableSST || 'Gerencia SG-SST',
      createdAt: new Date().toISOString(),
    };

    handleSaveActa(nuevaActa);
    alert(`¡Acta de Posesión ${nuevaActa.consecutivo} generada con éxito! Puedes consultarla y exportarla a PDF en la pestaña de Actas.`);
    setActiveSection('actas');
  };

  const handleSubsanarEvidencia = (ev: Evidence) => {
    const medida = prompt('Describe la acción correctiva ejecutada para subsanar este riesgo:', ev.medidaCorrectiva);
    if (!medida) return;
    const updated = storage.updateEvidence(ev.id, {
      estado: 'subsanado',
      medidaCorrectiva: medida,
      fechaCierre: new Date().toISOString().split('T')[0],
    });
    setEvidences(updated);
  };

  const handleLogin = (u: UserSession) => {
    storage.setSession(u);
    setSession(u);
    setIsLoginModalOpen(false);
  };

  const handleLogout = () => {
    storage.setSession(null);
    setSession(null);
  };

  // RBAC checks
  const isWendyRRHH = session?.rol === 'SUPER_ADMIN_RRHH';
  const isAdmin = session?.rol === 'ADMIN_SST' || isWendyRRHH;
  const isBothCommittees = session?.rol === 'AMBOS_COMITES';
  const isPureCopasst = session?.rol === 'COPASST';
  const isPureCocolab = session?.rol === 'COCOLAB';
  const isColaborador = session?.rol === 'COLABORADOR';

  const isCopasstMember = isPureCopasst || isBothCommittees || isAdmin;
  const isCocolabMember = isPureCocolab || isBothCommittees || isAdmin;
  const canManageUsers = isWendyRRHH || isAdmin || isBothCommittees;
  const canAccessCocolabPrivates = isPureCocolab || isBothCommittees || isAdmin;

  // PROTECCIÓN ESTRICTA: Ningún usuario puede ver ni interactuar con la plataforma si no ha iniciado sesión
  if (!session) {
    return (
      <div className="min-h-screen bg-slate-100 flex flex-col justify-between">
        {/* Header de Bloqueo de Acceso */}
        <header className="bg-white border-b border-slate-200 py-3.5 px-4 sm:px-6 shadow-sm">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-md shadow-blue-500/20 overflow-hidden border border-slate-200">
                {company.logoUrl ? (
                  <img src={company.logoUrl} alt="Logo" className="w-full h-full object-contain p-0.5 bg-white" />
                ) : (
                  <Shield className="w-5 h-5 text-white stroke-[2.5]" />
                )}
              </div>
              <div>
                <span className="text-base font-extrabold tracking-tight text-slate-900 font-mono">
                  CoCoPASST
                </span>
                <p className="text-[11px] text-slate-500 truncate max-w-[200px] sm:max-w-md">
                  {company.razonSocial} • Acceso Restringido SG-SST
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 border border-blue-200">
                Decreto 1072/2015
              </span>
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                Res. 0312/2019
              </span>
            </div>
          </div>
        </header>

        {/* Login Obligatorio */}
        <main className="flex-1 flex items-center justify-center p-4">
          <LoginModal
            isOpen={true}
            onClose={() => {}}
            onLogin={handleLogin}
            currentSession={null}
            company={company}
          />
        </main>

        <footer className="bg-white border-t border-slate-200 py-3 text-center text-xs text-slate-500">
          Plataforma Institucional SG-SST & COCOLAB • Estricta confidencialidad laboral garantizada
        </footer>
      </div>
    );
  }

  const filteredEvidences = evidences.filter(e => {
    if (evidenceFilter === 'todos') return true;
    return e.estado === evidenceFilter;
  });

  return (
    <div className="min-h-screen w-full bg-slate-50 text-slate-900 flex flex-col pb-20 md:pb-8 overflow-x-clip">
      {/* Navbar */}
      <Navbar
        company={company}
        session={session}
        onOpenLogin={() => setIsLoginModalOpen(true)}
        onOpenUsers={() => setIsUserModalOpen(true)}
        onOpenCamera={() => setIsCameraOpen(true)}
        onOpenActa={() => {
          setSelectedActaForEdit(undefined);
          setIsActaModalOpen(true);
        }}
        onOpenCompany={() => setIsCompanyModalOpen(true)}
        onOpenManual={() => setIsManualModalOpen(true)}
        onOpenProgram={() => {
          setProgramInitialTab('cronograma');
          setProgramInitialComite('TODOS');
          setIsProgramModalOpen(true);
        }}
        onLogout={handleLogout}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Banner Normativo Oficial Mintrabajo */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl border border-blue-100 flex-shrink-0">
              <Shield className="w-7 h-7 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-base sm:text-lg font-bold text-slate-900">
                  Sistema de Gestión SG-SST • COPASST & COCOLAB
                </h1>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800">
                  Decreto 1072/2015
                </span>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  Res. 0312/2019
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {company.razonSocial} • NIT {company.nit} • ARL {company.arl} • Riesgos ARL: Clase {formatRiesgos(company)} • {company.totalTrabajadores} Colaboradores
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto flex-wrap">
            <button
              onClick={() => setIsManualModalOpen(true)}
              className="text-xs text-blue-700 hover:text-blue-900 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-200 hover:bg-blue-100 transition-colors font-bold shadow-sm"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Manual de Uso</span>
            </button>
            <a
              href="https://www.mintrabajo.gov.co/relaciones-laborales/riesgos-laborales/sistema-de-gestion-de-seguridad-y-salud-en-el-trabajo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-slate-600 hover:text-slate-900 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200 hover:bg-slate-200 transition-colors font-medium"
            >
              <span>Normativa Mintrabajo</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* SECTION: DASHBOARD */}
        {activeSection === 'dashboard' && (
          <div className="space-y-6">
            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                <div className="flex items-center justify-between text-slate-500 mb-2">
                  <span className="text-xs font-semibold">Evidencias en Campo</span>
                  <Camera className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-slate-900">{evidences.length}</span>
                  <span className="text-[11px] text-amber-600 font-medium">({evidenciasAbiertas} abiertas)</span>
                </div>
                <p className="text-[10px] text-slate-400 mt-1">Inspecciones con fotos GTC 45</p>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                <div className="flex items-center justify-between text-slate-500 mb-2">
                  <span className="text-xs font-semibold">Actas Foliadas</span>
                  <FileText className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-slate-900">{actas.length}</span>
                  <span className="text-[11px] text-emerald-700 font-medium">Foliadas y Firmadas</span>
                </div>
                <p className="text-[10px] text-slate-400 mt-1">Custodia legal de 20 años</p>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                <div className="flex items-center justify-between text-slate-500 mb-2">
                  <span className="text-xs font-semibold">COPASST Mensual</span>
                  <ShieldAlert className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-slate-900">{actasCopasstCount}</span>
                  <span className="text-[11px] text-blue-700 font-medium">Reuniones</span>
                </div>
                <p className="text-[10px] text-slate-400 mt-1">Obligatoria mensual (Res. 2013)</p>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                <div className="flex items-center justify-between text-slate-500 mb-2">
                  <span className="text-xs font-semibold">COCOLAB Convivencia</span>
                  <HeartHandshake className="w-4 h-4 text-rose-600" />
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-slate-900">{actasCocolabCount}</span>
                  <span className="text-[11px] text-rose-700 font-medium">Trimestrales</span>
                </div>
                <p className="text-[10px] text-slate-400 mt-1">Ley 1010/06 & Ley 2365/24</p>
              </div>
            </div>

            {/* Wendy RRHH User & Employee Management Banner if authorized */}
            {canManageUsers && (
              <div className="bg-gradient-to-r from-purple-50 via-indigo-50 to-blue-50 border border-purple-200 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-purple-600 text-white rounded-xl shadow-sm">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 flex items-center gap-2">
                      Censo de Empleados & Gestión de Usuarios
                      <span className="text-[10px] bg-purple-200 text-purple-900 font-bold px-2 py-0.5 rounded-full">Wendy RRHH / Validadora</span>
                    </h3>
                    <p className="text-[11px] text-slate-600">
                      Digita la nómina de empleados, clasifica sus riesgos (Riesgo 1 o 5) y administra sus accesos al sistema.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsUserModalOpen(true)}
                  className="w-full sm:w-auto px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Gestionar Empleados</span>
                </button>
              </div>
            )}

            {/* Action Bar (Camera, Actas, COCOLAB, Manual) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Box 1: Tomar Foto en Terreno */}
              <div
                onClick={() => setIsCameraOpen(true)}
                className="group p-4 bg-white border border-slate-200 rounded-2xl cursor-pointer hover:border-blue-500 hover:shadow-md transition-all shadow-sm flex items-center justify-between"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="p-2 bg-blue-50 text-blue-600 rounded-xl group-hover:scale-110 transition-transform">
                      <Camera className="w-5 h-5" />
                    </span>
                    <h3 className="text-xs font-bold text-slate-900">Foto Evidencia</h3>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Cámara en terreno con marca de agua automática.
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 group-hover:text-blue-600 transition-all" />
              </div>

              {/* Box 2: Redactar Acta Oficial */}
              <div
                onClick={() => {
                  setSelectedActaForEdit(undefined);
                  setIsActaModalOpen(true);
                }}
                className="group p-4 bg-white border border-slate-200 rounded-2xl cursor-pointer hover:border-emerald-500 hover:shadow-md transition-all shadow-sm flex items-center justify-between"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="p-2 bg-emerald-50 text-emerald-600 rounded-xl group-hover:scale-110 transition-transform">
                      <FileText className="w-5 h-5" />
                    </span>
                    <h3 className="text-xs font-bold text-slate-900">Crear Acta Foliada</h3>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Firmas digitales, fotos y exportación a PDF.
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 group-hover:text-emerald-600 transition-all" />
              </div>

              {/* Box 3: Radicar Queja Convivencia */}
              <div
                onClick={() => setIsQuejaModalOpen(true)}
                className="group p-4 bg-white border border-slate-200 rounded-2xl cursor-pointer hover:border-rose-500 hover:shadow-md transition-all shadow-sm flex items-center justify-between"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="p-2 bg-rose-50 text-rose-600 rounded-xl group-hover:scale-110 transition-transform">
                      <Lock className="w-5 h-5" />
                    </span>
                    <h3 className="text-xs font-bold text-slate-900">Canal COCOLAB</h3>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Quejas confidenciales y Ley 2365/2024.
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 group-hover:text-rose-600 transition-all" />
              </div>

              {/* Box 4: Manual de Uso */}
              <div
                onClick={() => setIsManualModalOpen(true)}
                className="group p-4 bg-white border border-slate-200 rounded-2xl cursor-pointer hover:border-indigo-500 hover:shadow-md transition-all shadow-sm flex items-center justify-between"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="p-2 bg-indigo-50 text-indigo-600 rounded-xl group-hover:scale-110 transition-transform">
                      <BookOpen className="w-5 h-5" />
                    </span>
                    <h3 className="text-xs font-bold text-slate-900">Manual de Uso</h3>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Guía operativa y soporte legal SG-SST.
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 group-hover:text-indigo-600 transition-all" />
              </div>
            </div>

            {/* Split Sections: Recent Evidences & Recent Actas */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Evidences Photo Card */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Camera className="w-4 h-4 text-blue-600" />
                    <h3 className="text-sm font-bold text-slate-900">Últimas Evidencias Fotográficas</h3>
                  </div>
                  <button
                    onClick={() => setActiveSection('evidencias')}
                    className="text-xs text-blue-600 hover:text-blue-800 font-semibold"
                  >
                    Ver todas ({evidences.length})
                  </button>
                </div>

                <div className="space-y-3">
                  {evidences.slice(0, 3).map((ev) => (
                    <div
                      key={ev.id}
                      className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          onClick={() => setPreviewImage(ev.imagenAntes)}
                          className="w-14 h-14 rounded-lg bg-slate-100 overflow-hidden border border-slate-200 flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
                        >
                          <img src={ev.imagenAntes} alt={ev.titulo} className="w-full h-full object-cover" />
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-xs font-bold text-slate-900 truncate">{ev.titulo}</h4>
                          <p className="text-[11px] text-slate-500 truncate">{ev.peligroGTC45}</p>
                          <p className="text-[10px] text-slate-400">
                            {ev.areaLugar} • {ev.fecha}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            ev.estado === 'subsanado'
                              ? 'bg-emerald-100 text-emerald-800'
                              : ev.estado === 'en_proceso'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {ev.estado}
                        </span>
                        {ev.estado !== 'subsanado' && (
                          <button
                            onClick={() => handleSubsanarEvidencia(ev)}
                            className="text-[10px] text-emerald-700 hover:underline flex items-center gap-1 font-semibold"
                          >
                            <Check className="w-3 h-3" />
                            Marcar Subsanado
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Actas Card */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-emerald-600" />
                    <h3 className="text-sm font-bold text-slate-900">Actas Oficiales Recientes</h3>
                  </div>
                  <button
                    onClick={() => setActiveSection('actas')}
                    className="text-xs text-blue-600 hover:text-blue-800 font-semibold"
                  >
                    Ver todas ({actas.length})
                  </button>
                </div>

                <div className="space-y-3">
                  {actas.slice(0, 3).map((acta) => (
                    <div
                      key={acta.id}
                      className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between gap-3"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-blue-700">
                            {acta.consecutivo}
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-slate-200 text-slate-700 font-medium">
                            {acta.comite}
                          </span>
                        </div>
                        <h4 className="text-xs font-semibold text-slate-900 truncate mt-0.5">{acta.titulo}</h4>
                        <p className="text-[10px] text-slate-500">
                          Fecha: {acta.fecha} • {acta.asistentes.length} Asistentes • {acta.compromisos.length} Compromisos
                        </p>
                      </div>

                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        <button
                          onClick={() => exportarActaPDF(acta, company, evidences)}
                          className="p-2 bg-white hover:bg-slate-100 text-blue-600 rounded-lg border border-slate-200 transition-colors shadow-sm"
                          title="Descargar PDF Foliado"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Matrix Legal Periodicidad */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3 shadow-sm">
              <h3 className="text-xs font-bold text-slate-800 flex items-center gap-2">
                <Info className="w-4 h-4 text-blue-600" />
                Marco Legal y Obligaciones Periódicas en Colombia
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-600">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-900 block mb-1">Reuniones Mensuales COPASST</span>
                  <p className="text-[11px]">{PERIODICIDAD_LEGAL.copasstReuniones}</p>
                  <p className="text-[10px] text-blue-600 mt-1 font-mono">{PERIODICIDAD_LEGAL.copasstDedicacion}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-900 block mb-1">Reuniones Trimestrales COCOLAB</span>
                  <p className="text-[11px]">{PERIODICIDAD_LEGAL.cocolabReuniones}</p>
                  <p className="text-[10px] text-rose-600 mt-1 font-mono">Reserva legal absoluta</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-900 block mb-1">Custodia de Archivos (20 Años)</span>
                  <p className="text-[11px]">{PERIODICIDAD_LEGAL.custodiaDocumental}</p>
                  <p className="text-[10px] text-emerald-600 mt-1 font-mono">Periodo de comités: 2 años</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECTION: COPASST */}
        {activeSection === 'copasst' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-blue-600" />
                  Comité Paritario de Seguridad y Salud en el Trabajo (COPASST)
                </h2>
                <p className="text-xs text-slate-500">
                  Resolución 2013 de 1986, Decreto Ley 1295 de 1994 y Decreto 1072 de 2015
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsCameraOpen(true)}
                  className="px-3 py-1.5 bg-white hover:bg-slate-50 text-blue-600 border border-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm"
                >
                  <Camera className="w-3.5 h-3.5" />
                  Nueva Inspección
                </button>
                {session?.rol !== 'COLABORADOR' && (
                  <button
                    onClick={() => {
                      setSelectedActaForEdit(undefined);
                      setIsActaModalOpen(true);
                    }}
                    className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-xs flex items-center gap-1.5 shadow-sm"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    Nueva Acta COPASST
                  </button>
                )}
              </div>
            </div>

            {/* Banner Informativo y Acceso Rápido a Funciones y Cronograma COPASST */}
            <div className="p-4 bg-gradient-to-r from-blue-50 via-indigo-50 to-white border border-blue-200 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-blue-600 text-white rounded-xl shadow-md flex-shrink-0">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-blue-950">
                    Plan de Trabajo Anual, Funciones por Cargo y Tiempos de Ley
                  </h4>
                  <p className="text-[11px] text-slate-600 mt-0.5">
                    Cronograma de 12 meses (inspecciones, alturas, emergencias), 4 horas semanales de ley y funciones obligatorias (Res. 2013/86).
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => {
                    setProgramInitialTab('cronograma');
                    setProgramInitialComite('COPASST');
                    setIsProgramModalOpen(true);
                  }}
                  className="flex-1 sm:flex-initial px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-all shadow-sm"
                >
                  Ver Cronograma Mensual
                </button>
                <button
                  onClick={() => {
                    setProgramInitialTab('funciones');
                    setProgramInitialComite('COPASST');
                    setIsProgramModalOpen(true);
                  }}
                  className="flex-1 sm:flex-initial px-3 py-1.5 bg-white hover:bg-slate-50 text-blue-700 border border-blue-300 rounded-lg text-xs font-semibold transition-all shadow-sm"
                >
                  Funciones por Cargo
                </button>
              </div>
            </div>

            {/* Members Grid */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-slate-900 flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-blue-600" />
                  Miembros Activos del COPASST ({members.filter(m => m.comite === 'COPASST').length})
                </h3>
                <span className="text-[10px] text-slate-500">
                  Vigencia: {company.vigenciaComitesDesde} al {company.vigenciaComitesHasta}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {members
                  .filter(m => m.comite === 'COPASST')
                  .map((m) => (
                    <div
                      key={m.id}
                      className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2 flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                              m.representacion === 'Empleador'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-emerald-100 text-emerald-800'
                            }`}
                          >
                            {m.representacion}
                          </span>
                          <span className="text-[10px] text-slate-500 font-mono">{m.condicion}</span>
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-slate-900">{m.nombre}</h4>
                          <p className="text-[11px] text-blue-700 font-bold">{m.rol}</p>
                          <p className="text-[10px] text-slate-500 truncate">{m.cargo}</p>
                        </div>
                      </div>

                      <div className="text-[10px] text-slate-400 pt-1.5 border-t border-slate-200 flex items-center justify-between">
                        <span>C.C. {m.cedula}</span>
                        <button
                          onClick={() => {
                            setProgramInitialTab('funciones');
                            setProgramInitialComite('COPASST');
                            setIsProgramModalOpen(true);
                          }}
                          className="text-[10px] font-bold text-blue-700 hover:text-blue-900 hover:underline"
                        >
                          Funciones →
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Actas de COPASST */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-sm">
              <h3 className="text-xs font-bold text-slate-900 flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-600" />
                Historial de Actas y Reuniones Mensuales de COPASST
              </h3>

              <div className="space-y-3">
                {actas
                  .filter(a => a.comite === 'COPASST' || a.comite === 'VIGIA')
                  .map((acta) => (
                    <div
                      key={acta.id}
                      className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-blue-700">
                            {acta.consecutivo}
                          </span>
                          <span className="text-[10px] px-2 py-0.5 bg-slate-200 text-slate-700 rounded font-medium">
                            {acta.tipo.replace('_', ' ').toUpperCase()}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-900 mt-1">{acta.titulo}</h4>
                        <p className="text-xs text-slate-500">
                          Fecha: {acta.fecha} ({acta.horaInicio} - {acta.horaFin}) • {acta.lugar}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-slate-500 mt-2">
                          <span>👥 {acta.asistentes.filter(a => a.asistio).length} Asistieron</span>
                          <span>📋 {acta.compromisos.length} Compromisos</span>
                          <span>📷 {acta.evidenciasIds?.length || 0} Evidencias Vinculadas</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-center">
                        {session?.rol !== 'COLABORADOR' && (
                          <button
                            onClick={() => {
                              setSelectedActaForEdit(acta);
                              setIsActaModalOpen(true);
                            }}
                            className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold border border-slate-300 shadow-sm"
                          >
                            Editar
                          </button>
                        )}
                        <button
                          onClick={() => exportarActaPDF(acta, company, evidences)}
                          className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-xs flex items-center gap-1 shadow-sm"
                        >
                          <Download className="w-3.5 h-3.5" />
                          PDF Oficial
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* SECTION: COCOLAB */}
        {activeSection === 'cocolab' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <HeartHandshake className="w-5 h-5 text-rose-600" />
                  Comité de Convivencia Laboral (COCOLAB)
                </h2>
                <p className="text-xs text-slate-500">
                  Ley 1010 de 2006, Resoluciones 652 y 1356 de 2012, y Ley 2365 de 2024
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsQuejaModalOpen(true)}
                  className="px-4 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-lg text-xs flex items-center gap-1.5 shadow-sm"
                >
                  <Lock className="w-3.5 h-3.5" />
                  Radicar Queja Confidencial
                </button>
                {canAccessCocolabPrivates && (
                  <button
                    onClick={() => {
                      setSelectedActaForEdit(undefined);
                      setIsActaModalOpen(true);
                    }}
                    className="px-3.5 py-1.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    Acta Trimestral
                  </button>
                )}
              </div>
            </div>

            {/* Aviso Confidencialidad */}
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl flex items-start gap-3 text-xs text-rose-900">
              <Lock className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-rose-950 block mb-0.5">
                  Garantía de Confidencialidad y Reserva Absoluta
                </span>
                El Comité de Convivencia Laboral actúa como instancia preventiva y concertadora. Toda deliberación, entrevista o queja tiene carácter confidencial por mandato de la Resolución 652/2012. En casos de Acoso Sexual bajo la Ley 2365 de 2024, se aplican medidas cautelares inmediatas sin revictimización.
              </div>
            </div>

            {/* Restricción de Acceso para miembros de COPASST */}
            {isPureCopasst && (
              <div className="p-6 bg-amber-50 border border-amber-200 rounded-2xl space-y-2 text-center">
                <ShieldAlert className="w-8 h-8 text-amber-600 mx-auto" />
                <h4 className="text-sm font-bold text-amber-900">Acceso Restringido para Delegados de COPASST</h4>
                <p className="text-xs text-amber-800 max-w-lg mx-auto">
                  Por mandato de la <strong>Resolución 652 de 2012 (Art. 13)</strong>, el COPASST y el COCOLAB son instancias separadas. Las quejas individuales radicadas están protegidas por reserva legal y solo pueden ser consultadas por los miembros acreditados del Comité de Convivencia Laboral o Recursos Humanos (Wendy).
                </p>
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="mt-2 px-4 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-lg shadow-sm"
                >
                  Cambiar a Rol COCOLAB / Admin
                </button>
              </div>
            )}

            {/* Banner Informativo y Acceso Rápido a Funciones y Cronograma COCOLAB */}
            <div className="p-4 bg-gradient-to-r from-rose-50 via-pink-50 to-white border border-rose-200 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-rose-600 text-white rounded-xl shadow-md flex-shrink-0">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-rose-950">
                    Plan Preventivo de Convivencia, Funciones por Cargo y Reserva Legal
                  </h4>
                  <p className="text-[11px] text-slate-600 mt-0.5">
                    Sesiones trimestrales ordinarias, audiencias conciliatorias privadas y protocolo ante la Ley 2365 de 2024.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => {
                    setProgramInitialTab('cronograma');
                    setProgramInitialComite('COCOLAB');
                    setIsProgramModalOpen(true);
                  }}
                  className="flex-1 sm:flex-initial px-3.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-bold transition-all shadow-sm"
                >
                  Ver Cronograma Trimestral
                </button>
                <button
                  onClick={() => {
                    setProgramInitialTab('funciones');
                    setProgramInitialComite('COCOLAB');
                    setIsProgramModalOpen(true);
                  }}
                  className="flex-1 sm:flex-initial px-3 py-1.5 bg-white hover:bg-slate-50 text-rose-700 border border-rose-300 rounded-lg text-xs font-semibold transition-all shadow-sm"
                >
                  Funciones por Cargo
                </button>
              </div>
            </div>

            {/* Miembros de COCOLAB */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-sm">
              <h3 className="text-xs font-bold text-slate-900 flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-rose-600" />
                Miembros Acreditados del COCOLAB ({members.filter(m => m.comite === 'COCOLAB').length})
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {members
                  .filter(m => m.comite === 'COCOLAB')
                  .map((m) => (
                    <div
                      key={m.id}
                      className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2 flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                              m.representacion === 'Empleador'
                                ? 'bg-rose-100 text-rose-800'
                                : 'bg-emerald-100 text-emerald-800'
                            }`}
                          >
                            {m.representacion}
                          </span>
                          <span className="text-[10px] text-slate-500 font-mono">{m.condicion}</span>
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-slate-900">{m.nombre}</h4>
                          <p className="text-[11px] text-rose-700 font-bold">{m.rol}</p>
                          <p className="text-[10px] text-slate-500 truncate">{m.cargo}</p>
                        </div>
                      </div>

                      <div className="text-[10px] text-slate-400 pt-1.5 border-t border-slate-200 flex items-center justify-between">
                        <span>C.C. {m.cedula}</span>
                        <button
                          onClick={() => {
                            setProgramInitialTab('funciones');
                            setProgramInitialComite('COCOLAB');
                            setIsProgramModalOpen(true);
                          }}
                          className="text-[10px] font-bold text-rose-700 hover:text-rose-900 hover:underline"
                        >
                          Funciones →
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Quejas Radicadas (Visible only if permitted) */}
            {canAccessCocolabPrivates ? (
              <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-slate-900 flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-rose-600" />
                    Buzón de Quejas y Casos en Trámite (Acceso Exclusivo COCOLAB)
                  </h3>
                  <span className="text-xs text-slate-500 font-mono">
                    {quejas.length} casos registrados
                  </span>
                </div>

                {quejas.length === 0 ? (
                  <div className="p-8 text-center text-slate-400 border border-dashed border-slate-200 rounded-xl">
                    No hay quejas radicadas activas en este periodo.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {quejas.map((q) => (
                      <div
                        key={q.id}
                        className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-rose-700">
                              {q.radicado}
                            </span>
                            <span className="text-[10px] px-2 py-0.5 rounded bg-rose-100 text-rose-800 font-bold uppercase">
                              {q.estado.replace('_', ' ')}
                            </span>
                            {q.esPrioritariaLey2365 && (
                              <span className="text-[10px] px-2 py-0.5 rounded bg-red-600 text-white font-bold animate-pulse">
                                Ley 2365/2024
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-slate-500">Radicado el: {q.fechaRadicacion}</span>
                        </div>

                        <div>
                          <h4 className="text-xs font-bold text-slate-900 mb-1">
                            Tipología: <span className="text-rose-700 font-medium">{q.tipologia}</span>
                          </h4>
                          <p className="text-xs text-slate-600 line-clamp-2">{q.hechosNarrados}</p>
                        </div>

                        {q.acuerdosConvivencia && (
                          <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-900">
                            <strong>Acuerdo Concertado:</strong> {q.acuerdosConvivencia}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : null}
          </div>
        )}

        {/* SECTION: PLAN DE TRABAJO, FUNCIONES POR CARGO Y CRONOGRAMA */}
        {activeSection === 'plan' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-indigo-600" />
                  Plan de Trabajo Anual 2026, Funciones por Cargo y Cronograma Operativo
                </h2>
                <p className="text-xs text-slate-500">
                  SYSNET S.A.S. • Resolución 2013 de 1986, Resolución 652 de 2012, Decreto 1072 de 2015 y Ley 2365 de 2024
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setProgramInitialTab('cronograma');
                    setProgramInitialComite('TODOS');
                    setIsProgramModalOpen(true);
                  }}
                  className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg text-xs flex items-center gap-1.5 shadow-sm transition-all"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Abrir Vista Completa
                </button>
              </div>
            </div>

            {/* Tarjetas Informativas de Tiempos y Mandato */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3.5 bg-white border border-slate-200 rounded-xl shadow-sm">
                <span className="text-[10px] text-slate-500 font-bold uppercase block">Período de Vigencia</span>
                <strong className="text-base text-slate-900 block mt-0.5">2 Años</strong>
                <span className="text-[10px] text-blue-700 font-mono">15/01/2026 - 14/01/2028</span>
              </div>

              <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-xl shadow-sm">
                <span className="text-[10px] text-blue-700 font-bold uppercase block">Dedicación Semanal</span>
                <strong className="text-base text-blue-900 block mt-0.5">4 Horas / Semana</strong>
                <span className="text-[10px] text-blue-600 font-semibold">Remuneradas por Ley</span>
              </div>

              <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl shadow-sm">
                <span className="text-[10px] text-rose-700 font-bold uppercase block">Sesiones COCOLAB</span>
                <strong className="text-base text-rose-900 block mt-0.5">Cada 3 Meses</strong>
                <span className="text-[10px] text-rose-600 font-semibold">Res. 1356 de 2012</span>
              </div>

              <div className="p-3.5 bg-purple-50 border border-purple-200 rounded-xl shadow-sm">
                <span className="text-[10px] text-purple-700 font-bold uppercase block">Archivo de Actas</span>
                <strong className="text-base text-purple-900 block mt-0.5">20 Años</strong>
                <span className="text-[10px] text-purple-600 font-semibold">Custodia legal obligatoria</span>
              </div>
            </div>

            {/* Accesos Rápidos a Funciones Principales */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Bloque COPASST */}
              <div className="bg-white border border-blue-200 rounded-2xl p-5 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-blue-100">
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-blue-600" />
                    <h3 className="text-sm font-bold text-blue-950">Funciones por Cargo COPASST</h3>
                  </div>
                  <button
                    onClick={() => {
                      setProgramInitialTab('funciones');
                      setProgramInitialComite('COPASST');
                      setIsProgramModalOpen(true);
                    }}
                    className="text-xs font-bold text-blue-700 hover:underline"
                  >
                    Ver Todas →
                  </button>
                </div>

                <div className="space-y-3">
                  {FUNCIONES_CARGOS_COPASST.map((fc, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-extrabold text-blue-900">{fc.cargo}</span>
                        <span className="text-[10px] text-slate-500 font-medium">{fc.titularActual}</span>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-snug">
                        {fc.funciones[0]}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bloque COCOLAB */}
              <div className="bg-white border border-rose-200 rounded-2xl p-5 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-rose-100">
                  <div className="flex items-center gap-2">
                    <HeartHandshake className="w-5 h-5 text-rose-600" />
                    <h3 className="text-sm font-bold text-rose-950">Funciones por Cargo COCOLAB</h3>
                  </div>
                  <button
                    onClick={() => {
                      setProgramInitialTab('funciones');
                      setProgramInitialComite('COCOLAB');
                      setIsProgramModalOpen(true);
                    }}
                    className="text-xs font-bold text-rose-700 hover:underline"
                  >
                    Ver Todas →
                  </button>
                </div>

                <div className="space-y-3">
                  {FUNCIONES_CARGOS_COCOLAB.map((fc, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-extrabold text-rose-900">{fc.cargo}</span>
                        <span className="text-[10px] text-slate-500 font-medium">{fc.titularActual}</span>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-snug">
                        {fc.funciones[0]}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Cronograma Resumido Mes a Mes */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-indigo-600" />
                    Cronograma Operativo de 12 Meses (SYSNET 2026)
                  </h3>
                  <p className="text-xs text-slate-500">Programación detallada para empezar a trabajar de inmediato mes por mes</p>
                </div>

                <button
                  onClick={() => {
                    setProgramInitialTab('cronograma');
                    setProgramInitialComite('TODOS');
                    setIsProgramModalOpen(true);
                  }}
                  className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition-all shadow-sm"
                >
                  Ver Cronograma Interactivo
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {committeeProgramStorage.getCronograma().map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      setProgramInitialTab('cronograma');
                      setProgramInitialComite('TODOS');
                      setIsProgramModalOpen(true);
                    }}
                    className="p-3.5 bg-slate-50 hover:bg-blue-50/50 border border-slate-200 hover:border-blue-300 rounded-xl cursor-pointer transition-all space-y-2 group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded bg-slate-900 text-white text-[10px] font-mono font-bold">
                        {item.mes}
                      </span>
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase border ${
                        item.comite === 'COPASST'
                          ? 'bg-blue-50 text-blue-700 border-blue-200'
                          : item.comite === 'COCOLAB'
                          ? 'bg-rose-50 text-rose-700 border-rose-200'
                          : 'bg-indigo-50 text-indigo-700 border-indigo-200'
                      }`}>
                        {item.comite}
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-700 line-clamp-1">
                      {item.titulo}
                    </h4>

                    <p className="text-[11px] text-slate-500 line-clamp-2">
                      {item.descripcion}
                    </p>

                    <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-200 flex items-center justify-between">
                      <span className="truncate">Resp: {item.cargoResponsable}</span>
                      <span className={item.completada ? 'text-emerald-600 font-bold' : 'text-amber-600 font-semibold'}>
                        {item.completada ? '✓ Cumplido' : 'Pendiente'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SECTION: EVIDENCIAS */}
        {activeSection === 'evidencias' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Camera className="w-5 h-5 text-blue-600" />
                  Módulo de Evidencias Fotográficas en Terreno
                </h2>
                <p className="text-xs text-slate-500">
                  Inspección de condiciones y actos inseguros conforme a la Guía Técnica GTC 45
                </p>
              </div>

              <button
                onClick={() => setIsCameraOpen(true)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-xs flex items-center gap-1.5 shadow-sm"
              >
                <Camera className="w-4 h-4" />
                Capturar Foto con Cámara
              </button>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
              {[
                { id: 'todos', label: `Todos (${evidences.length})` },
                { id: 'abierto', label: `Abiertos (${evidenciasAbiertas})` },
                { id: 'en_proceso', label: 'En Tratamiento' },
                { id: 'subsanado', label: `Subsanados (${evidenciasSubsanadas})` },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setEvidenceFilter(f.id as any)}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                    evidenceFilter === f.id
                      ? 'bg-blue-600 text-white font-bold shadow-sm'
                      : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Evidence Gallery Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredEvidences.map((ev) => (
                <div
                  key={ev.id}
                  className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm flex flex-col"
                >
                  {/* Photo Display */}
                  <div
                    onClick={() => setPreviewImage(ev.imagenAntes)}
                    className="relative aspect-video bg-slate-900 cursor-pointer group overflow-hidden"
                  >
                    <img
                      src={ev.imagenAntes}
                      alt={ev.titulo}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2.5 right-2.5">
                      <span
                        className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider backdrop-blur-md ${
                          ev.estado === 'subsanado'
                            ? 'bg-emerald-600 text-white'
                            : ev.estado === 'en_proceso'
                            ? 'bg-amber-500 text-slate-950 font-bold'
                            : 'bg-red-600 text-white'
                        }`}
                      >
                        {ev.estado}
                      </span>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="p-4 space-y-2.5 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700">
                        {ev.clasificacion}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 mt-0.5">{ev.titulo}</h4>
                      <p className="text-xs text-slate-500 font-medium">{ev.peligroGTC45}</p>
                      <p className="text-xs text-slate-600 mt-2 line-clamp-2">{ev.descripcion}</p>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-slate-100 text-[11px] text-slate-500">
                      <div className="flex items-center justify-between">
                        <span>📍 {ev.areaLugar}</span>
                        <span>📅 {ev.fecha} {ev.hora}</span>
                      </div>
                      <div className="text-slate-700">
                        <strong>Medida:</strong> {ev.medidaCorrectiva}
                      </div>

                      {ev.estado !== 'subsanado' ? (
                        <button
                          onClick={() => handleSubsanarEvidencia(ev)}
                          className="w-full py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold rounded-lg text-xs flex items-center justify-center gap-1.5 transition-colors"
                        >
                          <Check className="w-3.5 h-3.5" />
                          Marcar como Subsanado
                        </button>
                      ) : (
                        <div className="text-emerald-700 text-[10px] font-semibold text-center py-1">
                          ✓ Subsanado el {ev.fechaCierre || ev.fecha}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION: ACTAS */}
        {activeSection === 'actas' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-emerald-600" />
                  Repositorio de Actas Oficiales Foliadas
                </h2>
                <p className="text-xs text-slate-500">
                  Custodia obligatoria por 20 años conforme al Decreto 1072/2015 (Art. 2.2.4.6.13)
                </p>
              </div>

              {session?.rol !== 'COLABORADOR' && (
                <button
                  onClick={() => {
                    setSelectedActaForEdit(undefined);
                    setIsActaModalOpen(true);
                  }}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-xs flex items-center gap-1.5 shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  Nueva Acta Oficial
                </button>
              )}
            </div>

            <div className="space-y-3">
              {actas.map((acta) => (
                <div
                  key={acta.id}
                  className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm"
                >
                  <div className="space-y-1.5 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                        {acta.consecutivo}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                        {acta.comite}
                      </span>
                      <span className="text-[10px] text-emerald-700 font-semibold">
                        ✓ {acta.estado.toUpperCase()}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-slate-900">{acta.titulo}</h3>
                    <p className="text-xs text-slate-500">
                      Fecha: {acta.fecha} ({acta.horaInicio} - {acta.horaFin}) • {acta.lugar}
                    </p>

                    <div className="flex items-center gap-4 text-xs text-slate-500 pt-1">
                      <span>👥 {acta.asistentes.filter(a => a.asistio).length} Asistentes</span>
                      <span>📋 {acta.compromisos.length} Tareas Asignadas</span>
                      <span>📷 {acta.evidenciasIds?.length || 0} Fotos Anexadas</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    {session?.rol !== 'COLABORADOR' && (
                      <button
                        onClick={() => {
                          setSelectedActaForEdit(acta);
                          setIsActaModalOpen(true);
                        }}
                        className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg border border-slate-300 transition-colors shadow-sm"
                      >
                        Editar
                      </button>
                    )}
                    <button
                      onClick={() => exportarActaPDF(acta, company, evidences)}
                      className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs flex items-center gap-1.5 shadow-sm transition-all"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Descargar PDF Foliado
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION: ELECCIONES */}
        {activeSection === 'elecciones' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Vote className="w-5 h-5 text-emerald-600" />
                  Módulo de Elecciones Electrónicas y Votaciones
                </h2>
                <p className="text-xs text-slate-500">
                  Proceso democrático y secreto para elegir los representantes de los trabajadores
                </p>
              </div>

              <button
                onClick={() => setIsElectionModalOpen(true)}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs flex items-center gap-1.5 shadow-sm"
              >
                <Vote className="w-4 h-4" />
                Abrir Urna Virtual / Votar
              </button>
            </div>

            {/* Estado del proceso */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Elección de {eleccion.comite} • Periodo {eleccion.periodo}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Total votos escrutados: {eleccion.totalVotosEmitidos} ({eleccion.votosEnBlanco} en blanco)
                  </p>
                </div>
                {isAdmin && (
                  <button
                    onClick={() => handleGenerarActaPosesion(eleccion)}
                    className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg shadow-sm"
                  >
                    Generar Acta de Posesión
                  </button>
                )}
              </div>

              {/* Candidatos Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {eleccion.candidatos.map((c) => (
                  <div
                    key={c.id}
                    className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white border border-slate-300 flex items-center justify-center font-bold text-blue-700 shadow-sm">
                        #{c.numeroTarjeton}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">{c.nombre}</h4>
                        <p className="text-[11px] text-slate-500">{c.cargo} • {c.area}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-base font-bold text-emerald-700">{c.votos}</span>
                      <span className="text-[10px] text-slate-400 block">votos</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Bottom Nav for Mobile / PWA App */}
      <BottomNav
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onOpenCamera={() => setIsCameraOpen(true)}
      />

      {/* Modals */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleLogin}
        currentSession={session}
        company={company}
      />

      <ManualModal
        isOpen={isManualModalOpen}
        onClose={() => setIsManualModalOpen(false)}
      />

      <CameraCaptureModal
        isOpen={isCameraOpen}
        onClose={() => setIsCameraOpen(false)}
        onSave={handleSaveEvidence}
        sedeDefault={company.sedePrincipal}
        authorName={session?.nombre}
      />

      <ActaEditorModal
        isOpen={isActaModalOpen}
        onClose={() => setIsActaModalOpen(false)}
        onSave={handleSaveActa}
        members={members}
        evidences={evidences}
        company={company}
        initialActa={selectedActaForEdit}
      />

      <QuejaModal
        isOpen={isQuejaModalOpen}
        onClose={() => setIsQuejaModalOpen(false)}
        onSave={handleSaveQueja}
        authorDefault={session ? { nombre: session.nombre, email: session.email, cargo: session.cargo } : undefined}
      />

      <ElectionModal
        isOpen={isElectionModalOpen}
        onClose={() => setIsElectionModalOpen(false)}
        eleccion={eleccion}
        onVote={handleVote}
        onGenerarActaPosesion={handleGenerarActaPosesion}
        canManage={isAdmin}
      />

      <CompanyModal
        isOpen={isCompanyModalOpen}
        onClose={() => setIsCompanyModalOpen(false)}
        company={company}
        onSave={(updated) => {
          storage.saveCompany(updated);
          setCompany(updated);
        }}
      />

      <UserManagementModal
        isOpen={isUserModalOpen}
        onClose={() => setIsUserModalOpen(false)}
        currentUser={session}
        onSwitchUser={handleLogin}
      />

      <CommitteeProgramModal
        isOpen={isProgramModalOpen}
        onClose={() => setIsProgramModalOpen(false)}
        initialTab={programInitialTab}
        initialComite={programInitialComite}
        onRedactarActa={handleRedactarActaDesdeCronograma}
      />

      {/* Preview Full Image Modal */}
      {previewImage && (
        <div
          onClick={() => setPreviewImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm cursor-pointer"
        >
          <div className="relative max-w-3xl max-h-[85vh] overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-2xl">
            <img src={previewImage} alt="Evidencia ampliada" className="w-full h-full object-contain" />
          </div>
        </div>
      )}
    </div>
  );
}
