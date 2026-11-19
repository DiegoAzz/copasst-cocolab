'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Camera, RefreshCw, Upload, X, Check, AlertTriangle, MapPin } from 'lucide-react';
import { Evidence, RiesgoGTC45, ClasificacionPeligro } from '@/types';
import { LISTA_RIESGOS_GTC45 } from '@/lib/colombianLaw';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (evidence: Evidence) => void;
  sedeDefault?: string;
  authorName?: string;
}

export default function CameraCaptureModal({ isOpen, onClose, onSave, sedeDefault, authorName }: Props) {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [photoData, setPhotoData] = useState<string | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);

  // Form fields
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [peligroGTC45, setPeligroGTC45] = useState<RiesgoGTC45>(LISTA_RIESGOS_GTC45[0]);
  const [clasificacion, setClasificacion] = useState<ClasificacionPeligro>('Condición Insegura');
  const [sede, setSede] = useState(sedeDefault || 'Sede Principal - Cazucá');
  const [areaLugar, setAreaLugar] = useState('');
  const [reportadoPor, setReportadoPor] = useState(authorName || 'Inspector en Terreno');
  const [medidaCorrectiva, setMedidaCorrectiva] = useState('');
  const [responsableAccion, setResponsableAccion] = useState('');
  const [fechaCompromiso, setFechaCompromiso] = useState('');

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      if (authorName) setReportadoPor(authorName);
      startCamera();
    } else {
      stopCamera();
      resetForm();
    }
    return () => {
      stopCamera();
    };
  }, [isOpen, facingMode, authorName]);

  const startCamera = async () => {
    stopCamera();
    setCameraError(null);
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Navegador no soporta acceso directo a cámara. Usa la opción de subir foto.');
      }
      const newStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: facingMode }, width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });
      setStream(newStream);
      if (videoRef.current) {
        videoRef.current.srcObject = newStream;
      }
      setCameraActive(true);
    } catch (err: any) {
      console.warn('Error accediendo a cámara:', err);
      setCameraError(err.message || 'No fue posible iniciar la cámara. Puedes subir una imagen desde tu galería o archivo.');
      setCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(t => t.stop());
      setStream(null);
    }
    setCameraActive(false);
  };

  const switchCamera = () => {
    setFacingMode(prev => prev === 'environment' ? 'user' : 'environment');
  };

  const takeSnapshot = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const now = new Date();
    const dateStr = now.toLocaleDateString('es-CO');
    const timeStr = now.toLocaleTimeString('es-CO');
    const watermarkText = `EVIDENCIA SG-SST | ${dateStr} ${timeStr} | ${sede}`;

    ctx.fillStyle = 'rgba(15, 23, 42, 0.75)';
    ctx.fillRect(0, canvas.height - 36, canvas.width, 36);

    ctx.font = 'bold 14px Arial, sans-serif';
    ctx.fillStyle = '#38bdf8';
    ctx.fillText('🛡️ ' + watermarkText, 14, canvas.height - 13);

    const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
    setPhotoData(dataUrl);
    stopCamera();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;
        canvas.width = img.width > 1280 ? 1280 : img.width;
        canvas.height = (img.height / img.width) * canvas.width;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        const now = new Date();
        const watermarkText = `EVIDENCIA SG-SST | ${now.toLocaleDateString('es-CO')} ${now.toLocaleTimeString('es-CO')} | ${sede}`;
        ctx.fillStyle = 'rgba(15, 23, 42, 0.75)';
        ctx.fillRect(0, canvas.height - 36, canvas.width, 36);
        ctx.font = 'bold 14px Arial, sans-serif';
        ctx.fillStyle = '#38bdf8';
        ctx.fillText('🛡️ ' + watermarkText, 14, canvas.height - 13);

        setPhotoData(canvas.toDataURL('image/jpeg', 0.85));
        stopCamera();
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const resetForm = () => {
    setPhotoData(null);
    setTitulo('');
    setDescripcion('');
    setAreaLugar('');
    setMedidaCorrectiva('');
    setResponsableAccion('');
    setFechaCompromiso('');
  };

  const handleSave = () => {
    if (!photoData) {
      alert('Debes capturar una fotografía o subir una imagen de la evidencia.');
      return;
    }
    if (!titulo.trim() || !areaLugar.trim()) {
      alert('Por favor completa el título y el área/lugar del hallazgo.');
      return;
    }

    const now = new Date();
    const newEvidence: Evidence = {
      id: 'ev-' + Date.now(),
      titulo: titulo.trim(),
      descripcion: descripcion.trim() || 'Sin descripción adicional.',
      peligroGTC45,
      clasificacion,
      fecha: now.toISOString().split('T')[0],
      hora: now.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' }),
      sede,
      areaLugar: areaLugar.trim(),
      reportadoPor: reportadoPor.trim(),
      estado: 'abierto',
      imagenAntes: photoData,
      medidaCorrectiva: medidaCorrectiva.trim() || 'Por definir en sesión de COPASST.',
      responsableAccion: responsableAccion.trim() || 'Comité COPASST',
      fechaCompromiso: fechaCompromiso || undefined,
    };

    onSave(newEvidence);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl border border-blue-200/60">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                Capturar Evidencia en Terreno
                <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  GTC 45 / SG-SST
                </span>
              </h3>
              <p className="text-xs text-slate-500">Inspección de condiciones y actos inseguros</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4 overflow-y-auto flex-1 text-slate-700">
          {/* Viewfinder / Photo Preview */}
          <div className="relative w-full aspect-video bg-slate-900 rounded-xl overflow-hidden border border-slate-300 flex items-center justify-center shadow-inner">
            {photoData ? (
              <div className="relative w-full h-full">
                <img src={photoData} alt="Evidencia capturada" className="w-full h-full object-contain" />
                <button
                  type="button"
                  onClick={() => {
                    setPhotoData(null);
                    startCamera();
                  }}
                  className="absolute top-3 right-3 px-3 py-1.5 bg-white/95 text-slate-800 border border-slate-300 rounded-lg text-xs font-semibold flex items-center gap-1.5 hover:bg-slate-100 shadow-md"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Repetir Foto
                </button>
              </div>
            ) : cameraActive ? (
              <div className="relative w-full h-full">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-3 flex items-center justify-center gap-4 px-4">
                  <button
                    type="button"
                    onClick={switchCamera}
                    className="p-2.5 bg-white/90 hover:bg-white text-slate-700 rounded-full border border-slate-300 shadow"
                    title="Cambiar Cámara Trasera/Frontal"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={takeSnapshot}
                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full shadow-lg flex items-center gap-2 transform active:scale-95 transition-all text-sm"
                  >
                    <Camera className="w-4 h-4" />
                    Tomar Foto
                  </button>

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="p-2.5 bg-white/90 hover:bg-white text-slate-700 rounded-full border border-slate-300 shadow"
                    title="Subir de Galería"
                  >
                    <Upload className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-6 text-center space-y-3 bg-slate-900 w-full h-full flex flex-col items-center justify-center">
                <AlertTriangle className="w-10 h-10 text-amber-400 mx-auto" />
                <p className="text-xs text-slate-300 max-w-sm mx-auto">
                  {cameraError || 'Cámara no activa o sin permisos concedidos.'}
                </p>
                <div className="flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={startCamera}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-sky-400 text-xs font-semibold rounded-lg border border-slate-700 flex items-center gap-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Reintentar Cámara
                  </button>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    Subir desde Galería / Archivo
                  </button>
                </div>
              </div>
            )}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/*"
              className="hidden"
            />
            <canvas ref={canvasRef} className="hidden" />
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Título del Hallazgo / Riesgo *
              </label>
              <input
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Ej: Cable de alta tensión expuesto en zona de lavado"
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Clasificación del Evento
              </label>
              <select
                value={clasificacion}
                onChange={(e) => setClasificacion(e.target.value as ClasificacionPeligro)}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-blue-500"
              >
                <option value="Condición Insegura">Condición Insegura</option>
                <option value="Acto Inseguro">Acto Inseguro</option>
                <option value="Hallazgo de Inspección">Hallazgo de Inspección</option>
                <option value="Incidente">Incidente de Trabajo</option>
                <option value="Accidente de Trabajo">Accidente de Trabajo (Investigación)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Peligro según Guía Técnica GTC 45 *
              </label>
              <select
                value={peligroGTC45}
                onChange={(e) => setPeligroGTC45(e.target.value as RiesgoGTC45)}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-blue-500"
              >
                {LISTA_RIESGOS_GTC45.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Sede de la Empresa
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
                <input
                  type="text"
                  value={sede}
                  onChange={(e) => setSede(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Área / Lugar Específico *
              </label>
              <input
                type="text"
                value={areaLugar}
                onChange={(e) => setAreaLugar(e.target.value)}
                placeholder="Ej: Bodega 2, Rampa de Despacho 4"
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Descripción Detallada del Hallazgo
              </label>
              <textarea
                rows={2}
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                placeholder="Describe qué observaste, causas potenciales y afectación a la integridad o instalaciones..."
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Medida Correctiva Propuesta
              </label>
              <input
                type="text"
                value={medidaCorrectiva}
                onChange={(e) => setMedidaCorrectiva(e.target.value)}
                placeholder="Ej: Aislar cables en tubería conduit"
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Responsable Asignado & Fecha Límite
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={responsableAccion}
                  onChange={(e) => setResponsableAccion(e.target.value)}
                  placeholder="Responsable"
                  className="px-2.5 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500"
                />
                <input
                  type="date"
                  value={fechaCompromiso}
                  onChange={(e) => setFechaCompromiso(e.target.value)}
                  className="px-2 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-t border-slate-200">
          <p className="text-[11px] text-slate-500 hidden sm:block">
            * Se estampará automáticamente fecha, hora y marca de agua del SG-SST
          </p>
          <div className="flex items-center gap-2.5 ml-auto">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg border border-slate-300 transition-colors shadow-sm"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-sm flex items-center gap-1.5 transition-all"
            >
              <Check className="w-4 h-4" />
              Guardar Evidencia
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
