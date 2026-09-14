# AgentCraft

![Version](https://img.shields.io/badge/version-0.1.0-blue.svg)
![Angular](https://img.shields.io/badge/Angular-22-dd0031.svg)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38bdf8.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

> **Visual builder and configurator for AI coding agents rules and context files.**

AgentCraft es una Single Page Application (SPA) 100% en cliente (sin backend). Su objetivo es permitir a los desarrolladores diseñar, configurar y generar visualmente archivos de reglas, prompts de sistema y contextos de trabajo para asistentes e IDEs de IA (`.cursorrules`, `copilot-instructions.md`, `AGENTS.md`, `CLAUDE.md`, entre otros).

---

## 🚀 Stack Tecnológico

- **Framework:** [Angular 22](https://angular.dev/)
  - Arquitectura basada 100% en **Standalone Components**.
  - Inyección funcional con `inject()`.
  - Control Flow nativo (`@if`, `@for`, `@switch`).
  - Reactividad pura y gestión de estado mediante **Signals** (`signal`, `computed`, `effect`).
- **Estilos & Diseño:** [Tailwind CSS v4](https://tailwindcss.com/)
  - Enfoque **Dark-Mode First**.
  - Diseño 100% responsive (móvil, tablet y escritorio).
- **Tipado & Calidad:** TypeScript (Modo estricto, sin uso de `any`).
- **Test Runner:** Vitest.

---

## 🛠️ Instalación y Uso

### Prerrequisitos
- Node.js (versión 20+ recomendada)
- npm

### Comandos disponibles

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo local
npm start
# o: npx ng serve

# Compilar para producción
npm run build

# Ejecutar tests
npm test
```

---

## 📐 Directivas de Desarrollo y Arquitectura

Este proyecto sigue estándares estrictos de desarrollo definidos en [AGENTS.md](./AGENTS.md):
- Límite de 150 líneas por archivo de componente.
- Modularidad y principio de responsabilidad única (SRP).
- Reutilización máxima y tolerancia cero a código muerto o huérfano.
- Ciclo de refactorización y revisión continua tras cada cambio funcional.
- Convención de commits: **Conventional Commits**.

---

## 📄 Licencia

Distribuido bajo la Licencia MIT.
