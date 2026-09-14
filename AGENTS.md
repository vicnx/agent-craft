# Directivas de Desarrollo del Proyecto: AgentCraft

> Este documento define las directrices arquitectónicas, estándares de código, diseño visual y flujos de trabajo de obligado cumplimiento para el desarrollo de **AgentCraft**. Cualquier asistente de IA o desarrollador debe acatar estas normas de forma estricta.

---

## 1. Visión del Proyecto
**AgentCraft** es una Single Page Application (SPA) 100% en cliente (sin backend). Su propósito es ser un generador y configurador visual de agentes, reglas y contextos para IDEs y asistentes de IA (`.cursorrules`, `copilot-instructions.md`, `AGENTS.md`, `CLAUDE.md`, etc.) mediante formularios dinámicos, selectores y previsualización en tiempo real.

---

## 2. Stack Tecnológico y Arquitectura

### 2.1. Framework y Paradigma
- **Angular (última versión):**
  - Uso exclusivo de **Standalone Components** (`standalone: true`). Prohibido el uso de `NgModule`.
  - Inyección de dependencias mediante la función nativa `inject()`. No usar inyección en constructores.
  - **Control Flow Nativo:** Emplear exclusivamente la sintaxis moderna (`@if`, `@for`, `@switch`). Prohibidas las directivas estructurales obsoletas (`*ngIf`, `*ngFor`, `*ngSwitch`).
  - **Estado Reactivo con Signals:** Todo el estado de la aplicación se gestiona mediante Signals (`signal`, `computed`, `effect`). No recurrir a `BehaviorSubject` ni RxJS para estado local a menos que sea estrictamente necesario para flujos asíncronos complejos.

### 2.2. Modularidad, Reutilización y Código Limpio
- **Responsabilidad Única (SRP):** Componentes pequeños, desacoplados y modulares.
- **Límite de Tamaño:** Máximo **150 líneas de código** por archivo de componente (incluyendo template y lógica). Si supera este umbral, debe descomponerse en subcomponentes o extraer lógica a servicios/utilidades.
- **Reutilización Máxima y Principio DRY:** Reutilizar el máximo código posible. Prohibida la duplicación de lógica, componentes o marcado. Centralizar patrones recurrentes en utilidades o componentes atómicos.
- **Tolerancia Cero a Código Muerto:** No dejar variables, métodos, imports, dependencias, estilos ni archivos huérfanos o sin uso. Todo fragmento de código debe tener una función activa y demostrable.

### 2.3. Tipado y Calidad de Código
- **TypeScript Estricto:** `strict: true` activado.
- **Tipado Fuerte:** Definir interfaces (`interface`) o tipos (`type`) explícitos para todas las estructuras, modelos y contratos de datos.
- **Prohibición de `any`:** Está estrictamente vetado el uso de `any`. En casos de incertidumbre, emplear `unknown` junto con type guards o validación de tipos en runtime.

---

## 3. UI/UX y Diseño Visual

### 3.1. Estética de Última Generación (Dev-Tool Moderna)
- **Tailwind CSS:** Utilizado como motor de diseño y utilidad de estilos.
- **Dark-Mode First & Estética de Vanguardia:** Inspirada en las mejores interfaces de desarrollo actuales (Linear, Raycast, Vercel, Supabase). Fondos oscuros profundos, degradados y brillos sutiles, microbordes translúcidos de alta precisión (`border-white/10`, `border-slate-800`), sombras atmosféricas y acabados tipo glassmorphism.
- **Accesibilidad y Coherencia:** Contrastes legibles (cumplimiento WCAG), tipografías contemporáneas y jerarquías visuales limpias.

### 3.2. Reutilización de Estilos
- Encapsular o centralizar componentes UI primitivos (botones, inputs, selectores, tarjetas, modales, badges).
- Evitar la repetición indiscriminada de largas cadenas de utilidades de Tailwind si representan el mismo componente atómico.

### 3.3. Diseño Responsive
- **Adaptabilidad Total:** La interfaz debe ser completamente adaptable y funcional en todos los tamaños de pantalla (móvil, tablet y escritorio).
- **Estructura Fluida:** Uso sistemático de breakpoints responsivos (`sm:`, `md:`, `lg:`, `xl:`) y layouts flexibles para asegurar que ningún panel, formulario o previsualizador desborde o degrade la experiencia de usuario.

---

## 4. Documentación y "README Vivo"

### 4.1. Calidad de Showcase de Producción y "Built With"
- El archivo `README.md` debe estar estructurado como una vitrina de aplicación en producción para destacar en GitHub: cabecera visual, badges, enlace a Demo, resumen de características, tabla **Built With**, guía de inicio rápido y sección del **Autor**.
- **Mantenimiento de "Built With":** Cada vez que se incorpore una librería, API o dependencia relevante, debe registrarse inmediatamente en la tabla correspondiente de `README.md`.
- **Sin meta-información:** Queda estrictamente prohibido incluir referencias a directivas internas, menciones al archivo `AGENTS.md` o notas meta sobre la asistencia de IA.

### 4.2. Versionado Semántico (SemVer)
- Al completar una funcionalidad (`feat`) o solventar un error (`fix`), se debe incrementar la versión del proyecto siguiendo SemVer (`MAJOR.MINOR.PATCH`).
- El incremento debe reflejarse simultáneamente en:
  1. `package.json` (`version`)
  2. Badge de versión en `README.md`

---

## 5. Ciclo de Calidad: Revisión Continua y Refactorización

- **Metodología Paso a Paso:** Avance iterativo e incremental, construyendo sobre cimientos verificados y sin saltar etapas.
- **Refactorización Obligatoria:** Tras cada cambio grande o bloque funcional implementado, realizar una auditoría del código introducido para:
  1. Simplificar estructuras y maximizar la legibilidad.
  2. Asegurar que sea intuitivo de leer, testear y extender a futuro.
  3. Purgar cualquier resto innecesario, código muerto o duplicidades no advertidas.

---

## 6. Flujo de Trabajo y Git

- Al finalizar cualquier respuesta o iteración donde se genere o modifique código, **es obligatorio incluir siempre al final un bloque de código que contenga ÚNICAMENTE el texto del commit** (siguiendo Conventional Commits), sin comandos git adicionales (sin `git add`, `git commit`, `git push`, etc.):
  - `feat(...)`: Nuevas funcionalidades.
  - `fix(...)`: Corrección de errores.
  - `refactor(...)`: Refactorización de código sin cambio de comportamiento.
  - `docs(...)`: Cambios exclusivos en documentación.
  - `style(...)`: Cambios de formato o estilos visuales.
  - `chore(...)`: Tareas de configuración, herramientas o mantenimiento.
