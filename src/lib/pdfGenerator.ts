import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Acta, CompanyProfile, Evidence } from '@/types';

export function exportarActaPDF(acta: Acta, empresa: CompanyProfile, evidencias: Evidence[] = []) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  let currentY = 15;

  // Header Box
  doc.setDrawColor(30, 41, 59);
  doc.setFillColor(248, 250, 252);
  doc.rect(14, currentY, pageWidth - 28, 26, 'FD');

  if (empresa.logoUrl) {
    try {
      doc.addImage(empresa.logoUrl, 'PNG', 16, currentY + 3, 20, 20);
    } catch {
      // fallback
    }
  }

  // Title and company info
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text(empresa.razonSocial.toUpperCase(), pageWidth / 2, currentY + 6, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(71, 85, 105);
  doc.text(`NIT: ${empresa.nit} | ARL: ${empresa.arl} | Riesgo: ${empresa.nivelRiesgo}`, pageWidth / 2, currentY + 11, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(2, 132, 199);
  doc.text(`SISTEMA DE GESTIÓN DE SEGURIDAD Y SALUD EN EL TRABAJO (SG-SST)`, pageWidth / 2, currentY + 16, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(15, 23, 42);
  const nombreComite = acta.comite === 'COPASST' ? 'COMITÉ PARITARIO DE SEGURIDAD Y SALUD EN EL TRABAJO (COPASST)' :
                       acta.comite === 'COCOLAB' ? 'COMITÉ DE CONVIVENCIA LABORAL (COCOLAB)' :
                       'VIGÍA DE SEGURIDAD Y SALUD EN EL TRABAJO';
  doc.text(nombreComite, pageWidth / 2, currentY + 22, { align: 'center' });

  currentY += 30;

  // Metadata Table (Consecutivo, Fecha, Lugar, etc.)
  autoTable(doc, {
    startY: currentY,
    head: [[
      'CONSECUTIVO / FOLIACIÓN',
      'FECHA',
      'HORARIO',
      'LUGAR / MODALIDAD'
    ]],
    body: [[
      acta.consecutivo,
      acta.fecha,
      `${acta.horaInicio} - ${acta.horaFin}`,
      acta.lugar
    ]],
    theme: 'grid',
    styles: { fontSize: 8.5, halign: 'center', cellPadding: 2 },
    headStyles: { fillColor: [2, 132, 199], textColor: [255, 255, 255], fontStyle: 'bold' },
    margin: { left: 14, right: 14 },
  });

  // @ts-ignore
  currentY = doc.lastAutoTable.finalY + 6;

  // Titulo del acta
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text(acta.titulo, 14, currentY);
  currentY += 5;

  // Tabla de Asistentes
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(30, 41, 59);
  doc.text('1. ASISTENCIA Y VERIFICACIÓN DE QUÓRUM', 14, currentY);
  currentY += 2;

  const filasAsistentes = acta.asistentes.map((a, idx) => [
    (idx + 1).toString(),
    a.nombre,
    a.cedula,
    a.cargo,
    a.rolEnComite,
    a.representacion,
    a.asistio ? 'Presente' : 'Ausente'
  ]);

  autoTable(doc, {
    startY: currentY,
    head: [['#', 'NOMBRE', 'CÉDULA', 'CARGO EN EMPRESA', 'ROL COMITÉ', 'REPRESENTA', 'ESTADO']],
    body: filasAsistentes,
    theme: 'striped',
    styles: { fontSize: 8, cellPadding: 2 },
    headStyles: { fillColor: [51, 65, 85], textColor: [255, 255, 255], fontStyle: 'bold' },
    margin: { left: 14, right: 14 },
  });

  // @ts-ignore
  currentY = doc.lastAutoTable.finalY + 6;

  // Orden del día
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.text('2. ORDEN DEL DÍA', 14, currentY);
  currentY += 4;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  acta.ordenDelDia.forEach((item) => {
    doc.text(item, 18, currentY);
    currentY += 4.5;
  });

  currentY += 2;

  // Desarrollo de los puntos
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.text('3. DESARROLLO DE LA REUNIÓN', 14, currentY);
  currentY += 4;

  acta.desarrolloPuntos.forEach((p) => {
    // Check page break
    if (currentY > 260) {
      doc.addPage();
      currentY = 20;
    }

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(2, 132, 199);
    doc.text(p.punto, 14, currentY);
    currentY += 4;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(30, 41, 59);
    const splitText = doc.splitTextToSize(p.desarrollo, pageWidth - 28);
    doc.text(splitText, 14, currentY);
    currentY += (splitText.length * 4) + 4;
  });

  // Compromisos
  if (acta.compromisos && acta.compromisos.length > 0) {
    if (currentY > 240) {
      doc.addPage();
      currentY = 20;
    }

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(15, 23, 42);
    doc.text('4. MATRIZ DE COMPROMISOS Y PLAN DE ACCIÓN', 14, currentY);
    currentY += 2;

    const filasCompromisos = acta.compromisos.map((c, idx) => [
      (idx + 1).toString(),
      c.descripcion,
      c.responsable,
      c.fechaLimite,
      c.estado.toUpperCase()
    ]);

    autoTable(doc, {
      startY: currentY,
      head: [['#', 'DESCRIPCIÓN DEL COMPROMISO', 'RESPONSABLE', 'FECHA LÍMITE', 'ESTADO']],
      body: filasCompromisos,
      theme: 'grid',
      styles: { fontSize: 8, cellPadding: 2 },
      headStyles: { fillColor: [5, 150, 105], textColor: [255, 255, 255], fontStyle: 'bold' },
      margin: { left: 14, right: 14 },
    });

    // @ts-ignore
    currentY = doc.lastAutoTable.finalY + 8;
  }

  // Evidencias Fotográficas Anexas
  const evidenciasVinculadas = evidencias.filter(e => acta.evidenciasIds?.includes(e.id));
  if (evidenciasVinculadas.length > 0) {
    doc.addPage();
    currentY = 20;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(15, 23, 42);
    doc.text('5. ANEXO DE EVIDENCIAS FOTOGRÁFICAS DE INSPECCIÓN / RIESGOS', 14, currentY);
    currentY += 6;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(71, 85, 105);
    doc.text('Fotografías capturadas en terreno como soporte técnico conforme a la GTC 45 y Decreto 1072/2015.', 14, currentY);
    currentY += 8;

    evidenciasVinculadas.forEach((ev, idx) => {
      if (currentY > 230) {
        doc.addPage();
        currentY = 20;
      }

      doc.setDrawColor(203, 213, 225);
      doc.setFillColor(248, 250, 252);
      doc.roundedRect(14, currentY, pageWidth - 28, 48, 2, 2, 'FD');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(15, 23, 42);
      doc.text(`Evidencia #${idx + 1}: ${ev.titulo}`, 18, currentY + 6);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(71, 85, 105);
      doc.text(`Clasificación: ${ev.clasificacion} | Peligro: ${ev.peligroGTC45}`, 18, currentY + 11);
      doc.text(`Lugar: ${ev.sede} - ${ev.areaLugar} | Fecha: ${ev.fecha} ${ev.hora}`, 18, currentY + 16);
      doc.text(`Estado: ${ev.estado.toUpperCase()} | Responsable: ${ev.responsableAccion}`, 18, currentY + 21);

      const descLines = doc.splitTextToSize(`Hallazgo: ${ev.descripcion}`, 105);
      doc.text(descLines, 18, currentY + 27);

      const medLines = doc.splitTextToSize(`Medida: ${ev.medidaCorrectiva}`, 105);
      doc.text(medLines, 18, currentY + 38);

      // Embedded Image preview if valid
      if (ev.imagenAntes && ev.imagenAntes.startsWith('data:image')) {
        try {
          doc.addImage(ev.imagenAntes, 'JPEG', pageWidth - 70, currentY + 4, 52, 38);
        } catch {
          doc.rect(pageWidth - 70, currentY + 4, 52, 38);
          doc.text('[Foto Registrada]', pageWidth - 55, currentY + 24);
        }
      }

      currentY += 54;
    });
  }

  // Firmas de Cierre
  if (currentY > 220) {
    doc.addPage();
    currentY = 20;
  }

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(15, 23, 42);
  doc.text('6. CONSTANCIA DE FIRMAS Y VALIDEZ LEGAL', 14, currentY);
  currentY += 4;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text('En constancia de lo actuado y aprobación unánime de los compromisos, firman los delegados autorizados:', 14, currentY);
  currentY += 12;

  // 2 Firmas en paralelo (Presidente y Secretario)
  const x1 = 20;
  const x2 = pageWidth / 2 + 10;
  const colWidth = pageWidth / 2 - 30;

  // Firma 1 (Presidente)
  doc.setDrawColor(71, 85, 105);
  doc.line(x1, currentY + 14, x1 + colWidth, currentY + 14);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(15, 23, 42);
  const pres = acta.asistentes.find(a => a.rolEnComite.toLowerCase().includes('presidente')) || acta.asistentes[0];
  doc.text(pres ? pres.nombre : 'PRESIDENTE DEL COMITÉ', x1 + (colWidth / 2), currentY + 18, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.text(pres ? `${pres.rolEnComite} - C.C. ${pres.cedula}` : 'Presidente', x1 + (colWidth / 2), currentY + 22, { align: 'center' });

  // Firma 2 (Secretario)
  doc.line(x2, currentY + 14, x2 + colWidth, currentY + 14);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(15, 23, 42);
  const sec = acta.asistentes.find(a => a.rolEnComite.toLowerCase().includes('secretari')) || acta.asistentes[1] || acta.asistentes[0];
  doc.text(sec ? sec.nombre : 'SECRETARIO DEL COMITÉ', x2 + (colWidth / 2), currentY + 18, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.text(sec ? `${sec.rolEnComite} - C.C. ${sec.cedula}` : 'Secretario', x2 + (colWidth / 2), currentY + 22, { align: 'center' });

  // Pie de página en todas las páginas (Custodia legal 20 años)
  const totalPages = doc.internal.pages.length - 1;
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(7);
    doc.setTextColor(148, 163, 184);
    doc.text(
      `Documento oficial del SG-SST | Conservación obligatoria por 20 años (Decreto 1072/2015, Art. 2.2.4.6.13) | Página ${i} de ${totalPages}`,
      pageWidth / 2,
      290,
      { align: 'center' }
    );
  }

  // Guardar archivo
  const filename = `${acta.consecutivo}_${acta.fecha}.pdf`;
  doc.save(filename);
}
