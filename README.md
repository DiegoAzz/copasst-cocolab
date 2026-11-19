# CoCoPASST • Plataforma Integral de COPASST y COCOLAB (SG-SST Colombia)

> **Normativa de Referencia:** [Ministerio del Trabajo de Colombia - Sistema de Gestión de Seguridad y Salud en el Trabajo](https://www.mintrabajo.gov.co/relaciones-laborales/riesgos-laborales/sistema-de-gestion-de-seguridad-y-salud-en-el-trabajo)
> **Dominio en Producción (Coolify):** [cocopasst.appzplay.online](https://cocopasst.appzplay.online)
> **Modo:** Web App & PWA Móvil Instalable (Android / iOS / Windows)

---

## 🏛️ Marco Legal Colombiano Implementado

1. **SG-SST General:**
   * **Decreto 1072 de 2015** (Libro 2, Parte 2, Título 4, Capítulo 6): Retención documental obligatoria por **20 años**, planes anuales de trabajo y rendición de cuentas.
   * **Resolución 0312 de 2019**: Estándares mínimos según número de trabajadores y clasificación de riesgo (Clases I a V).
2. **COPASST / Vigía de SST:**
   * **Resolución 2013 de 1986**: Conformación según tamaño de empresa, 4 horas semanales de dedicación mínima, reuniones ordinarias mensuales obligatorias y extraordinarias por accidentes graves/mortales.
   * **Decreto Ley 1295 de 1994 (Art. 63)**: Periodo de vigencia de 2 años.
3. **COCOLAB (Comité de Convivencia Laboral):**
   * **Ley 1010 de 2006**: Tipificación y prevención del acoso laboral (maltrato, persecución, discriminación, entorpecimiento, inequidad, desprotección).
   * **Resoluciones 652 y 1356 de 2012**: Conformación paritaria, reuniones ordinarias trimestrales y **reserva legal estricta / confidencialidad**.
   * **Ley 2365 de 2024**: Prevención, atención prioritaria, medidas cautelares y trámite sin revictimización en casos de acoso sexual laboral.
4. **Inspecciones y Evidencias de Riesgo:**
   * **Guía Técnica Colombiana GTC 45**: Clasificación de factores de peligro (Biológico, Físico, Químico, Psicosocial, Biomecánico, Seguridad - Locativo, Eléctrico, Mecánico, Tecnológico y Fenómenos Naturales).

---

## 🚀 Capacidades y Módulos de la Plataforma

### 1. 📷 Módulo de Evidencias Fotográficas en Terreno (Web & App)
* **Captura en vivo con la cámara del dispositivo** (`getUserMedia` / API nativa) o carga de archivos/galería.
* **Estampado automático de seguridad (Marca de agua):** Fecha, hora exacta, sede y código de evidencia SG-SST.
* **Clasificación según GTC 45** (Actos, condiciones inseguras, incidentes, hallazgos de inspección).
* **Ciclo Antes y Después:** Registro del peligro detectado y foto de subsanación tras la acción correctiva.
* **Vinculación con 1 clic a las Actas de Inspección o Reunión mensual.**

### 2. 📝 Generador Oficial de Actas Foliadas y Exportador a PDF
* Consecutivos foliados automáticos (ej. `ACTA-COP-2026-012`, `ACTA-COL-2026-004`, `ACTA-POS-2026-001`).
* Verificación de quórum reglamentario y registro de asistentes (principales, suplentes e invitados).
* Editor flexible del orden del día y desarrollo de deliberaciones.
* **Matriz de Compromisos y Tareas** con responsable, fecha límite y seguimiento de estado.
* **Firma Digital en Pantalla (Touch / Mouse)** para el Presidente, Secretario y delegados.
* **Exportación instantánea a PDF oficial foliado** con membrete institucional, tablas y **anexo fotográfico de evidencias incrustado**.

### 3. 🔒 Canal Confidencial COCOLAB
* Formulario protegido con estricta reserva legal para formular quejas de acoso laboral o sexual.
* Activación del protocolo prioritario de la **Ley 2365 de 2024** para acoso sexual en el ámbito de trabajo.
* Flujo de concertación: Radicación ➔ Evaluación ➔ Sesión individual ➔ Mesa de diálogo ➔ Acuerdos concertados ➔ Seguimiento sin consecuencias disciplinarias.

### 4. 🗳️ Urna Virtual de Elecciones
* Tarjetón electrónico con voto secreto y opción de voto en blanco.
* Escrutinio en tiempo real con barras porcentuales de participación.
* Generación automática del **Acta de Cierre de Escrutinio y Posesión de Miembros**.

### 5. 🏢 Perfil y Calculadora Normativa Automática
* Ajuste de razón social, NIT, ARL, Nivel de Riesgo (I a V) y número total de colaboradores.
* **Cálculo legal automático** de si corresponde Vigía o COPASST, y número exacto de delegados principales y suplentes requeridos por la ley.

---

## 📱 Funcionamiento como Web & App (PWA)
La plataforma incluye `manifest.json`, iconos y Service Worker (`sw.js`). Al abrirse en navegadores móviles (Chrome en Android, Safari en iOS) o de escritorio:
* Aparece la opción de **"Instalar App"** / "Agregar a Pantalla de Inicio".
* Se ejecuta a pantalla completa (modo standalone), con barra de navegación inferior optimizada para celulares y acceso directo a la cámara.

---

## 🐳 Despliegue en Coolify

Este proyecto cuenta con un `Dockerfile` multi-stage optimizado para Next.js en modo `standalone`:

```bash
# Puerto expuesto por defecto:
PORT=3000

# Construcción local con Docker:
docker compose up -d --build
```

En Coolify:
1. Conectar al repositorio de GitHub: `https://github.com/DiegoAzz/copasst-cocolab.git`.
2. Dominio asignado: `cocopasst.appzplay.online`.
3. Puerto de la aplicación: `3000`.
4. Coolify detectará automáticamente el `Dockerfile` y realizará el despliegue continuo en cada `git push`.
