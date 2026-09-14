<div align="center">
  <h1>⚡ AgentCraft</h1>
  <p><strong>Visual builder and studio for AI coding agent rules, system prompts, and context files.</strong></p>

  <p>
    <a href="#-live-demo"><strong>Live Demo »</strong></a> ·
    <a href="#-features">Key Features</a> ·
    <a href="#-built-with">Built With</a> ·
    <a href="#-quick-start">Quick Start</a> ·
    <a href="#-author">Author</a>
  </p>

  <p>
    <img src="https://img.shields.io/badge/version-0.17.1-6366f1?style=flat-square" alt="Version 0.17.1" />
    <img src="https://img.shields.io/badge/Angular-22-dd0031?style=flat-square&logo=angular&logoColor=white" alt="Angular 22" />
    <img src="https://img.shields.io/badge/TailwindCSS-v4-38bdf8?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS v4" />
    <img src="https://img.shields.io/badge/TypeScript-Strict-3178c6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/i18n-ES%20%7C%20EN-blueviolet?style=flat-square" alt="i18n ES/EN" />
    <img src="https://img.shields.io/badge/License-MIT-emerald?style=flat-square" alt="License MIT" />
  </p>
</div>

---

## 🌟 Overview

**AgentCraft** is a modern, high-performance developer tool designed to eliminate the friction of manually authoring configuration files and system prompts for AI coding assistants.

Design, customize, and export standard context files such as `.cursorrules`, `copilot-instructions.md`, `CLAUDE.md`, and `AGENTS.md` through an intuitive visual studio with real-time markdown previewing and instant export.

- 🔒 **100% Client-Side:** No backend, no accounts, and no telemetry. All configurations live in your browser.
- ⚡ **Real-Time Preview:** Instant compilation and formatted markdown preview as you configure your agent.
- 🌐 **Full Internationalization (i18n):** Native, zero-reload language switching between English and Spanish.
- 🎯 **IDE & Agent Agnostic:** Built-in templates tailored for Cursor, GitHub Copilot, Claude Code, and autonomous coding agents.
- 🎨 **Adaptive Dev-Tool Aesthetics:** Dark and Light mode support with local persistence, glassmorphism, micro-borders, and high-contrast typography.

---

## 🚀 Live Demo

> 🔗 **[Launch AgentCraft Studio](https://vicnx.github.io/agent-craft/)** *(Próximamente disponible / Coming soon)*

---

## ✨ Features

- **Visual Rule Builder:** Form-driven 7-step configuration for agent roles, persona & tone, tech stack constraints, code conventions, architectural boundaries, and strict negative guardrails.
- **Persona & Communication Style:** Granular control over assistant verbosity (Concise, Balanced, Explanatory), operational autonomy (Conservative, Collaborative, Autonomous), and anti-pattern prevention habits.
- **Never-Do List (Negative Guardrails):** Explicit negative constraints and prohibitions preventing credential leaks (.env), unwanted package installations, test deletions, and unchecked `any` typing.
- **Dark & Light Modes:** Seamless toggle between sleek dark mode and crisp light mode with persistent local storage.
- **Live Markdown Sync:** Real-time dual-pane editor showing the exact rendered file structure.
- **One-Click Export:** Copy directly to clipboard or download ready-to-use configuration files for your repository root.
- **Bilingual Interface (i18n):** Instant switching between English and Spanish with persistent user preferences.
- **100% Responsive:** Fluid, responsive layout optimized across mobile, tablet, and wide desktop displays.

---

## 🛠️ Built With

This project is built using modern web standards focused on performance, modularity, and clean architecture:

| Technology | Role & Description |
| :--- | :--- |
| [![Angular](https://img.shields.io/badge/Angular-22-dd0031?style=flat-square&logo=angular&logoColor=white)](https://angular.dev/) | Frontend core framework using **Standalone Components**, functional `inject()` and reactive **Signals** |
| [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/) | Next-generation utility-first styling engine with `@tailwindcss/postcss` and dark-mode first design |
| [![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178c6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/) | Strict static typing ensuring high quality and zero runtime exceptions |
| [![Font Awesome](https://img.shields.io/badge/Font_Awesome-6-528DD7?style=flat-square&logo=font-awesome&logoColor=white)](https://fontawesome.com/) | Standard vector icon toolkit for sleek dev-tool UI controls and indicators |
| [![Vitest](https://img.shields.io/badge/Vitest-Unit_Testing-fcc72b?style=flat-square&logo=vitest&logoColor=black)](https://vitest.dev/) | Ultra-fast test runner for continuous unit testing validation |

---

## 🏁 Quick Start

Clone the repository and run the local development server:

```bash
# Clone the repository
git clone https://github.com/vicnx/agent-craft.git
cd agent-craft

# Install dependencies
npm install

# Start local development server
npm start
```

Navigate to `http://localhost:4200/` in your browser.

### Available Scripts

- `npm start` – Starts the local development server (`ng serve`).
- `npm run build` – Compiles the optimized production bundle (`dist/agent-craft`).
- `npm test -- --watch=false` – Runs the unit test suite via Vitest.

---

## 👤 Author

**Vicente Andani (Xente)**

- GitHub: [@vicnx](https://github.com/vicnx)
- LinkedIn: [vicnx](https://www.linkedin.com/in/vicnx/)
- Repository: [vicnx/agent-craft](https://github.com/vicnx/agent-craft)

---

## 📄 License

This project is licensed under the MIT License.
