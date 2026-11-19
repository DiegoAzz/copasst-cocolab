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
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import BottomNav from '@/components/BottomNav';
import CameraCaptureModal from '@/components/CameraCaptureModal';
import ActaEditorModal from '@/components/ActaEditorModal';
import QuejaModal from '@/components/QuejaModal';
import ElectionModal from '@/components/ElectionModal';
import CompanyModal from '@/components/CompanyModal';
import { storage } from '@/lib/storage';
import { CompanyProfile, Member, Evidence, Acta, QuejaCocolab, ProcesoEleccion } from '@/types';
import { calcularEstructuraCopasst, calcularEstructuraCocolab, PERIODICIDAD_LEGAL } from '@/lib/colombianLaw';
import { exportarActaPDF } from '@/lib/pdfGenerator';

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');

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

  // Evidence Filter
  const [evidenceFilter, setEvidenceFilter] = useState<'todos' | 'abierto' | 'en_proceso' | 'subsanado'>('todos');

  // Preview Image Modal
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);

    const refreshData = () => {
      setCompany(storage.getCompany());
      setMembers(storage.getMembers());
      setEvidences(storage.getEvidences());
      setActas(storage.getActas());
      setQuejas(storage.getQuejas());
      setEleccion(storage.getEleccion());
    };

    window.addEventListener('cocopasst_data_changed', refreshData);
    return () => window.removeEventListener('cocopasst_data_changed', refreshData);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="flex items-center gap-3 text-sky-400 font-bold">
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
  const compromisosPendientes = actas.flatMap(a => a.compromisos).filter(c => c.estado !== 'cumplido').length;
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
    // Ordenar candidatos por votos
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

  const filteredEvidences = evidences.filter(e => {
    if (evidenceFilter === 'todos') return true;
    return e.estado === evidenceFilter;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col pb-20 md:pb-8">
      {/* Navbar */}
      <Navbar
        company={company}
        onOpenCamera={() => setIsCameraOpen(true)}
        onOpenActa={() => {
          setSelectedActaForEdit(undefined);
          setIsActaModalOpen(true);
        }}
        onOpenCompany={() => setIsCompanyModalOpen(true)}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Banner Normativo Oficial Mintrabajo */}
        <div className="bg-gradient-to-r from-slate-900 via-sky-950/40 to-slate-900 border border-sky-500/20 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-3.5">
            <div className="p-3 bg-sky-500/10 text-sky-400 rounded-xl border border-sky-500/20 flex-shrink-0">
              <Shield className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-base sm:text-lg font-bold text-white">
                  Sistema de Gestión SG-SST • COPASST & COCOLAB
                </h1>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-400 border border-sky-500/30">
                  Decreto 1072/2015
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Res. 0312/2019
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {company.razonSocial} • NIT {company.nit} • ARL {company.arl} • Riesgo {company.nivelRiesgo} • {company.totalTrabajadores} Colaboradores
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <a
              href="https://www.mintrabajo.gov.co/relaciones-laborales/riesgos-laborales/sistema-de-gestion-de-seguridad-y-salud-en-el-trabajo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-sky-400 hover:text-sky-300 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/80 hover:bg-slate-700/60 transition-colors"
            >
              <span>Normativa Mintrabajo</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={() => setIsCompanyModalOpen(true)}
              className="text-xs text-slate-300 hover:text-white flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/80 hover:bg-slate-700/60 transition-colors"
            >
              Configurar Empresa
            </button>
          </div>
        </div>

        {/* SECTION: DASHBOARD */}
        {activeSection === 'dashboard' && (
          <div className="space-y-6">
            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-sm">
                <div className="flex items-center justify-between text-slate-400 mb-2">
                  <span className="text-xs font-semibold">Evidencias en Campo</span>
                  <Camera className="w-4 h-4 text-sky-400" />
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-white">{evidences.length}</span>
                  <span className="text-[11px] text-amber-400 font-medium">({evidenciasAbiertas} abiertas)</span>
                </div>
                <p className="text-[10px] text-slate-500 mt-1">Inspecciones con fotos GTC 45</p>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-sm">
                <div className="flex items-center justify-between text-slate-400 mb-2">
                  <span className="text-xs font-semibold">Actas Foliadas</span>
                  <FileText className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-white">{actas.length}</span>
                  <span className="text-[11px] text-emerald-400 font-medium">Foliadas y Firmadas</span>
                </div>
                <p className="text-[10px] text-slate-500 mt-1">Custodia legal de 20 años</p>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-sm">
                <div className="flex items-center justify-between text-slate-400 mb-2">
                  <span className="text-xs font-semibold">COPASST Mensual</span>
                  <ShieldAlert className="w-4 h-4 text-sky-400" />
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-white">{actasCopasstCount}</span>
                  <span className="text-[11px] text-sky-400 font-medium">Reuniones</span>
                </div>
                <p className="text-[10px] text-slate-500 mt-1">Obligatoria mensual (Res. 2013)</p>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-sm">
                <div className="flex items-center justify-between text-slate-400 mb-2">
                  <span className="text-xs font-semibold">COCOLAB Convivencia</span>
                  <HeartHandshake className="w-4 h-4 text-rose-400" />
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-white">{actasCocolabCount}</span>
                  <span className="text-[11px] text-rose-400 font-medium">Trimestrales</span>
                </div>
                <p className="text-[10px] text-slate-500 mt-1">Ley 1010/06 & Ley 2365/24</p>
              </div>
            </div>

            {/* Action Bar (Camera Quick Access & Report) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Box 1: Tomar Foto en Terreno */}
              <div
                onClick={() => setIsCameraOpen(true)}
                className="group p-5 bg-gradient-to-br from-slate-900 to-sky-950/30 border border-sky-500/30 rounded-2xl cursor-pointer hover:border-sky-400 transition-all shadow-md flex items-center justify-between"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="p-2 bg-sky-500/20 text-sky-400 rounded-xl group-hover:scale-110 transition-transform">
                      <Camera className="w-5 h-5" />
                    </span>
                    <h3 className="text-sm font-bold text-white">Capturar Evidencia en Terreno</h3>
                  </div>
                  <p className="text-xs text-slate-400">
                    Toma fotos con la cámara del celular y marca de agua automática.
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-sky-400 group-hover:translate-x-1 transition-transform" />
              </div>

              {/* Box 2: Redactar Acta Oficial */}
              <div
                onClick={() => {
                  setSelectedActaForEdit(undefined);
                  setIsActaModalOpen(true);
                }}
                className="group p-5 bg-gradient-to-br from-slate-900 to-emerald-950/30 border border-emerald-500/30 rounded-2xl cursor-pointer hover:border-emerald-400 transition-all shadow-md flex items-center justify-between"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="p-2 bg-emerald-500/20 text-emerald-400 rounded-xl group-hover:scale-110 transition-transform">
                      <FileText className="w-5 h-5" />
                    </span>
                    <h3 className="text-sm font-bold text-white">Crear Acta Foliada</h3>
                  </div>
                  <p className="text-xs text-slate-400">
                    Genera actas con firmas en pantalla, fotos y exportación a PDF.
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-emerald-400 group-hover:translate-x-1 transition-transform" />
              </div>

              {/* Box 3: Radicar Queja Convivencia */}
              <div
                onClick={() => setIsQuejaModalOpen(true)}
                className="group p-5 bg-gradient-to-br from-slate-900 to-rose-950/30 border border-rose-500/30 rounded-2xl cursor-pointer hover:border-rose-400 transition-all shadow-md flex items-center justify-between"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="p-2 bg-rose-500/20 text-rose-400 rounded-xl group-hover:scale-110 transition-transform">
                      <Lock className="w-5 h-5" />
                    </span>
                    <h3 className="text-sm font-bold text-white">Canal Confidencial COCOLAB</h3>
                  </div>
                  <p className="text-xs text-slate-400">
                    Radicación de quejas de acoso laboral o sexual (Ley 2365 de 2024).
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-rose-400 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Split Sections: Recent Evidences & Recent Actas */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Evidences Photo Card */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Camera className="w-4 h-4 text-sky-400" />
                    <h3 className="text-sm font-bold text-white">Últimas Evidencias Fotográficas</h3>
                  </div>
                  <button
                    onClick={() => setActiveSection('evidencias')}
                    className="text-xs text-sky-400 hover:underline font-semibold"
                  >
                    Ver todas ({evidences.length})
                  </button>
                </div>

                <div className="space-y-3">
                  {evidences.slice(0, 3).map((ev) => (
                    <div
                      key={ev.id}
                      className="p-3 bg-slate-800/60 border border-slate-700/70 rounded-xl flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          onClick={() => setPreviewImage(ev.imagenAntes)}
                          className="w-14 h-14 rounded-lg bg-slate-950 overflow-hidden border border-slate-700 flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
                        >
                          <img src={ev.imagenAntes} alt={ev.titulo} className="w-full h-full object-cover" />
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-xs font-bold text-white truncate">{ev.titulo}</h4>
                          <p className="text-[11px] text-slate-400 truncate">{ev.peligroGTC45}</p>
                          <p className="text-[10px] text-slate-500">
                            {ev.areaLugar} • {ev.fecha}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            ev.estado === 'subsanado'
                              ? 'bg-emerald-500/20 text-emerald-400'
                              : ev.estado === 'en_proceso'
                              ? 'bg-amber-500/20 text-amber-400'
                              : 'bg-red-500/20 text-red-400'
                          }`}
                        >
                          {ev.estado}
                        </span>
                        {ev.estado !== 'subsanado' && (
                          <button
                            onClick={() => handleSubsanarEvidencia(ev)}
                            className="text-[10px] text-emerald-400 hover:underline flex items-center gap-1 font-semibold"
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
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-emerald-400" />
                    <h3 className="text-sm font-bold text-white">Actas Oficiales Recientes</h3>
                  </div>
                  <button
                    onClick={() => setActiveSection('actas')}
                    className="text-xs text-emerald-400 hover:underline font-semibold"
                  >
                    Ver todas ({actas.length})
                  </button>
                </div>

                <div className="space-y-3">
                  {actas.slice(0, 3).map((acta) => (
                    <div
                      key={acta.id}
                      className="p-3 bg-slate-800/60 border border-slate-700/70 rounded-xl flex items-center justify-between gap-3"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-sky-400">
                            {acta.consecutivo}
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-slate-700 text-slate-300 font-medium">
                            {acta.comite}
                          </span>
                        </div>
                        <h4 className="text-xs font-semibold text-white truncate mt-0.5">{acta.titulo}</h4>
                        <p className="text-[10px] text-slate-400">
                          Fecha: {acta.fecha} • {acta.asistentes.length} Asistentes • {acta.compromisos.length} Compromisos
                        </p>
                      </div>

                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        <button
                          onClick={() => exportarActaPDF(acta, company, evidences)}
                          className="p-2 bg-slate-800 hover:bg-slate-700 text-sky-400 rounded-lg border border-slate-700 transition-colors"
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
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-3">
              <h3 className="text-xs font-bold text-slate-300 flex items-center gap-2">
                <Info className="w-4 h-4 text-sky-400" />
                Marco Legal y Obligaciones Periódicas en Colombia
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-400">
                <div className="p-3 bg-slate-800/50 rounded-xl border border-slate-700/60">
                  <span className="font-bold text-white block mb-1">Reuniones Mensuales COPASST</span>
                  <p className="text-[11px]">{PERIODICIDAD_LEGAL.copasstReuniones}</p>
                  <p className="text-[10px] text-sky-400 mt-1 font-mono">{PERIODICIDAD_LEGAL.copasstDedicacion}</p>
                </div>
                <div className="p-3 bg-slate-800/50 rounded-xl border border-slate-700/60">
                  <span className="font-bold text-white block mb-1">Reuniones Trimestrales COCOLAB</span>
                  <p className="text-[11px]">{PERIODICIDAD_LEGAL.cocolabReuniones}</p>
                  <p className="text-[10px] text-rose-400 mt-1 font-mono">Reserva legal absoluta</p>
                </div>
                <div className="p-3 bg-slate-800/50 rounded-xl border border-slate-700/60">
                  <span className="font-bold text-white block mb-1">Custodia de Archivos (20 Años)</span>
                  <p className="text-[11px]">{PERIODICIDAD_LEGAL.custodiaDocumental}</p>
                  <p className="text-[10px] text-emerald-400 mt-1 font-mono">Periodo de comités: 2 años</p>
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
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-sky-400" />
                  Comité Paritario de Seguridad y Salud en el Trabajo (COPASST)
                </h2>
                <p className="text-xs text-slate-400">
                  Resolución 2013 de 1986, Decreto Ley 1295 de 1994 y Decreto 1072 de 2015
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsCameraOpen(true)}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-sky-400 border border-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5"
                >
                  <Camera className="w-3.5 h-3.5" />
                  Nueva Inspección
                </button>
                <button
                  onClick={() => {
                    setSelectedActaForEdit(undefined);
                    setIsActaModalOpen(true);
                  }}
                  className="px-4 py-1.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-lg text-xs flex items-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5" />
                  Nueva Acta COPASST
                </button>
              </div>
            </div>

            {/* Members Grid */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-white flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-sky-400" />
                  Miembros Activos del COPASST ({members.filter(m => m.comite === 'COPASST').length})
                </h3>
                <span className="text-[10px] text-slate-400">
                  Vigencia: {company.vigenciaComitesDesde} al {company.vigenciaComitesHasta}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {members
                  .filter(m => m.comite === 'COPASST')
                  .map((m) => (
                    <div
                      key={m.id}
                      className="p-3.5 bg-slate-800/60 border border-slate-700/80 rounded-xl space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                            m.representacion === 'Empleador'
                              ? 'bg-sky-500/15 text-sky-400'
                              : 'bg-emerald-500/15 text-emerald-400'
                          }`}
                        >
                          {m.representacion}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">{m.condicion}</span>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white">{m.nombre}</h4>
                        <p className="text-[11px] text-sky-400 font-medium">{m.rol}</p>
                        <p className="text-[10px] text-slate-400 truncate">{m.cargo}</p>
                      </div>
                      <div className="text-[10px] text-slate-500 pt-1 border-t border-slate-700/50">
                        C.C. {m.cedula} • Posesión: {m.fechaPosesion}
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Actas de COPASST */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
              <h3 className="text-xs font-bold text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-sky-400" />
                Historial de Actas y Reuniones Mensuales de COPASST
              </h3>

              <div className="space-y-3">
                {actas
                  .filter(a => a.comite === 'COPASST' || a.comite === 'VIGIA')
                  .map((acta) => (
                    <div
                      key={acta.id}
                      className="p-4 bg-slate-800/60 border border-slate-700/80 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-sky-400">
                            {acta.consecutivo}
                          </span>
                          <span className="text-[10px] px-2 py-0.5 bg-slate-700 text-slate-300 rounded font-medium">
                            {acta.tipo.replace('_', ' ').toUpperCase()}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-white mt-1">{acta.titulo}</h4>
                        <p className="text-xs text-slate-400">
                          Fecha: {acta.fecha} ({acta.horaInicio} - {acta.horaFin}) • {acta.lugar}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-slate-400 mt-2">
                          <span>👥 {acta.asistentes.filter(a => a.asistio).length} Asistieron</span>
                          <span>📋 {acta.compromisos.length} Compromisos</span>
                          <span>📷 {acta.evidenciasIds?.length || 0} Evidencias Vinculadas</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-center">
                        <button
                          onClick={() => {
                            setSelectedActaForEdit(acta);
                            setIsActaModalOpen(true);
                          }}
                          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-semibold border border-slate-700"
                        >
                          Ver / Editar
                        </button>
                        <button
                          onClick={() => exportarActaPDF(acta, company, evidences)}
                          className="px-3.5 py-1.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-lg text-xs flex items-center gap-1 shadow"
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
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <HeartHandshake className="w-5 h-5 text-rose-400" />
                  Comité de Convivencia Laboral (COCOLAB)
                </h2>
                <p className="text-xs text-slate-400">
                  Ley 1010 de 2006, Resoluciones 652 y 1356 de 2012, y Ley 2365 de 2024
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsQuejaModalOpen(true)}
                  className="px-4 py-1.5 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-lg text-xs flex items-center gap-1.5 shadow"
                >
                  <Lock className="w-3.5 h-3.5" />
                  Radicar Queja Confidencial
                </button>
                <button
                  onClick={() => {
                    setSelectedActaForEdit(undefined);
                    setIsActaModalOpen(true);
                  }}
                  className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5" />
                  Acta Trimestral
                </button>
              </div>
            </div>

            {/* Aviso Confidencialidad */}
            <div className="p-4 bg-rose-950/30 border border-rose-500/30 rounded-2xl flex items-start gap-3 text-xs text-slate-300">
              <Lock className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-rose-300 block mb-0.5">
                  Garantía de Confidencialidad y Reserva Absoluta
                </span>
                El Comité de Convivencia Laboral actúa como instancia preventiva y concertadora. Toda deliberación, entrevista o queja tiene carácter confidencial por mandato de la Resolución 652/2012. En casos de Acoso Sexual bajo la Ley 2365 de 2024, se aplican medidas cautelares inmediatas sin revictimización.
              </div>
            </div>

            {/* Miembros de COCOLAB */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
              <h3 className="text-xs font-bold text-white flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-rose-400" />
                Miembros Acreditados del COCOLAB ({members.filter(m => m.comite === 'COCOLAB').length})
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {members
                  .filter(m => m.comite === 'COCOLAB')
                  .map((m) => (
                    <div
                      key={m.id}
                      className="p-3.5 bg-slate-800/60 border border-slate-700/80 rounded-xl space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                            m.representacion === 'Empleador'
                              ? 'bg-rose-500/15 text-rose-400'
                              : 'bg-emerald-500/15 text-emerald-400'
                          }`}
                        >
                          {m.representacion}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">{m.condicion}</span>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white">{m.nombre}</h4>
                        <p className="text-[11px] text-rose-400 font-medium">{m.rol}</p>
                        <p className="text-[10px] text-slate-400 truncate">{m.cargo}</p>
                      </div>
                      <div className="text-[10px] text-slate-500 pt-1 border-t border-slate-700/50">
                        C.C. {m.cedula} • Posesión: {m.fechaPosesion}
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Quejas Radicadas */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-white flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-rose-400" />
                  Buzón de Quejas y Casos en Trámite
                </h3>
                <span className="text-xs text-slate-400 font-mono">
                  {quejas.length} casos registrados
                </span>
              </div>

              {quejas.length === 0 ? (
                <div className="p-8 text-center text-slate-500 border border-dashed border-slate-800 rounded-xl">
                  No hay quejas radicadas activas en este periodo.
                </div>
              ) : (
                <div className="space-y-3">
                  {quejas.map((q) => (
                    <div
                      key={q.id}
                      className="p-4 bg-slate-800/60 border border-slate-700/80 rounded-xl space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-rose-400">
                            {q.radicado}
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20 font-bold uppercase">
                            {q.estado.replace('_', ' ')}
                          </span>
                          {q.esPrioritariaLey2365 && (
                            <span className="text-[10px] px-2 py-0.5 rounded bg-red-600 text-white font-bold animate-pulse">
                              Ley 2365/2024
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-slate-400">Radicado el: {q.fechaRadicacion}</span>
                      </div>

                      <div>
                        <h4 className="text-xs font-bold text-white mb-1">
                          Tipología: <span className="text-rose-300 font-normal">{q.tipologia}</span>
                        </h4>
                        <p className="text-xs text-slate-300 line-clamp-2">{q.hechosNarrados}</p>
                      </div>

                      {q.acuerdosConvivencia && (
                        <div className="p-2.5 bg-emerald-950/30 border border-emerald-500/30 rounded-lg text-xs text-emerald-300">
                          <strong>Acuerdo Concertado:</strong> {q.acuerdosConvivencia}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* SECTION: EVIDENCIAS */}
        {activeSection === 'evidencias' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Camera className="w-5 h-5 text-sky-400" />
                  Módulo de Evidencias Fotográficas en Terreno
                </h2>
                <p className="text-xs text-slate-400">
                  Inspección de condiciones y actos inseguros conforme a la Guía Técnica GTC 45
                </p>
              </div>

              <button
                onClick={() => setIsCameraOpen(true)}
                className="px-4 py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-lg text-xs flex items-center gap-1.5 shadow"
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
                      ? 'bg-sky-500 text-slate-950 font-bold'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
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
                  className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-md flex flex-col"
                >
                  {/* Photo Display */}
                  <div
                    onClick={() => setPreviewImage(ev.imagenAntes)}
                    className="relative aspect-video bg-black cursor-pointer group overflow-hidden"
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
                            ? 'bg-emerald-500/80 text-white'
                            : ev.estado === 'en_proceso'
                            ? 'bg-amber-500/80 text-slate-950'
                            : 'bg-red-500/80 text-white'
                        }`}
                      >
                        {ev.estado}
                      </span>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="p-4 space-y-2.5 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-sky-400">
                        {ev.clasificacion}
                      </span>
                      <h4 className="text-sm font-bold text-white mt-0.5">{ev.titulo}</h4>
                      <p className="text-xs text-slate-400 font-medium">{ev.peligroGTC45}</p>
                      <p className="text-xs text-slate-300 mt-2 line-clamp-2">{ev.descripcion}</p>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-slate-800 text-[11px] text-slate-400">
                      <div className="flex items-center justify-between">
                        <span>📍 {ev.areaLugar}</span>
                        <span>📅 {ev.fecha} {ev.hora}</span>
                      </div>
                      <div className="text-slate-300">
                        <strong>Medida:</strong> {ev.medidaCorrectiva}
                      </div>

                      {ev.estado !== 'subsanado' ? (
                        <button
                          onClick={() => handleSubsanarEvidencia(ev)}
                          className="w-full py-2 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 font-bold rounded-lg text-xs flex items-center justify-center gap-1.5 transition-colors"
                        >
                          <Check className="w-3.5 h-3.5" />
                          Marcar como Subsanado
                        </button>
                      ) : (
                        <div className="text-emerald-400 text-[10px] font-semibold text-center py-1">
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
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-emerald-400" />
                  Repositorio de Actas Oficiales Foliadas
                </h2>
                <p className="text-xs text-slate-400">
                  Custodia obligatoria por 20 años conforme al Decreto 1072/2015 (Art. 2.2.4.6.13)
                </p>
              </div>

              <button
                onClick={() => {
                  setSelectedActaForEdit(undefined);
                  setIsActaModalOpen(true);
                }}
                className="px-4 py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-lg text-xs flex items-center gap-1.5 shadow"
              >
                <Plus className="w-4 h-4" />
                Nueva Acta Oficial
              </button>
            </div>

            <div className="space-y-3">
              {actas.map((acta) => (
                <div
                  key={acta.id}
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm"
                >
                  <div className="space-y-1.5 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20">
                        {acta.consecutivo}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                        {acta.comite}
                      </span>
                      <span className="text-[10px] text-emerald-400 font-semibold">
                        ✓ {acta.estado.toUpperCase()}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-white">{acta.titulo}</h3>
                    <p className="text-xs text-slate-400">
                      Fecha: {acta.fecha} ({acta.horaInicio} - {acta.horaFin}) • {acta.lugar}
                    </p>

                    <div className="flex items-center gap-4 text-xs text-slate-400 pt-1">
                      <span>👥 {acta.asistentes.filter(a => a.asistio).length} Asistentes</span>
                      <span>📋 {acta.compromisos.length} Tareas Asignadas</span>
                      <span>📷 {acta.evidenciasIds?.length || 0} Fotos Anexadas</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button
                      onClick={() => {
                        setSelectedActaForEdit(acta);
                        setIsActaModalOpen(true);
                      }}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-lg border border-slate-700 transition-colors"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => exportarActaPDF(acta, company, evidences)}
                      className="px-4 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg text-xs flex items-center gap-1.5 shadow transition-all"
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
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Vote className="w-5 h-5 text-emerald-400" />
                  Módulo de Elecciones Electrónicas y Votaciones
                </h2>
                <p className="text-xs text-slate-400">
                  Proceso democrático y secreto para elegir los representantes de los trabajadores
                </p>
              </div>

              <button
                onClick={() => setIsElectionModalOpen(true)}
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg text-xs flex items-center gap-1.5 shadow"
              >
                <Vote className="w-4 h-4" />
                Abrir Urna Virtual / Votar
              </button>
            </div>

            {/* Estado del proceso */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">
                    Elección de {eleccion.comite} • Periodo {eleccion.periodo}
                  </h3>
                  <p className="text-xs text-slate-400">
                    Total votos escrutados: {eleccion.totalVotosEmitidos} ({eleccion.votosEnBlanco} en blanco)
                  </p>
                </div>
                <button
                  onClick={() => handleGenerarActaPosesion(eleccion)}
                  className="px-3.5 py-1.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs rounded-lg shadow"
                >
                  Generar Acta de Posesión
                </button>
              </div>

              {/* Candidatos Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {eleccion.candidatos.map((c) => (
                  <div
                    key={c.id}
                    className="p-4 bg-slate-800/60 border border-slate-700/80 rounded-xl flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center font-bold text-sky-400">
                        #{c.numeroTarjeton}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white">{c.nombre}</h4>
                        <p className="text-[11px] text-slate-400">{c.cargo} • {c.area}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-base font-bold text-emerald-400">{c.votos}</span>
                      <span className="text-[10px] text-slate-500 block">votos</span>
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
      <CameraCaptureModal
        isOpen={isCameraOpen}
        onClose={() => setIsCameraOpen(false)}
        onSave={handleSaveEvidence}
        sedeDefault={company.sedePrincipal}
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
      />

      <ElectionModal
        isOpen={isElectionModalOpen}
        onClose={() => setIsElectionModalOpen(false)}
        eleccion={eleccion}
        onVote={handleVote}
        onGenerarActaPosesion={handleGenerarActaPosesion}
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

      {/* Preview Full Image Modal */}
      {previewImage && (
        <div
          onClick={() => setPreviewImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md cursor-pointer"
        >
          <div className="relative max-w-3xl max-h-[85vh] overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl">
            <img src={previewImage} alt="Evidencia ampliada" className="w-full h-full object-contain" />
          </div>
        </div>
      )}
    </div>
  );
}
