import { AgentConfig, TargetFormat, TargetFormatOption } from '../models/agent.model';

export const TARGET_FORMAT_OPTIONS: readonly TargetFormatOption[] = [
  {
    id: 'cursor',
    filename: '.cursorrules',
    labelKey: 'presets.cursorName',
    descKey: 'presets.cursorDesc',
  },
  {
    id: 'copilot',
    filename: 'copilot-instructions.md',
    labelKey: 'presets.copilotName',
    descKey: 'presets.copilotDesc',
  },
  {
    id: 'agents',
    filename: 'AGENTS.md',
    labelKey: 'presets.agentsName',
    descKey: 'presets.agentsDesc',
  },
  {
    id: 'custom',
    filename: 'RULES.md',
    labelKey: 'builder.customConfig',
    descKey: 'builder.subtitle',
  },
];

export const DEFAULT_AGENT_CONFIG: AgentConfig = {
  targetFormat: 'cursor',
  projectName: 'My Project',
  role: 'Senior Software Engineer & AI Assistant',
  description: 'AI-assisted development rules for clean code and best practices.',
  outputLanguage: 'es',
  techStack: ['TypeScript', 'Angular', 'Tailwind CSS'],
  architecturalRules: [
    'Arquitectura modular y desacoplada',
    'Componentes pequeños con responsabilidad única (SRP)',
    'Gestión de estado reactivo mediante Signals',
  ],
  qualityStandards: [
    'TypeScript estricto sin uso de any',
    'Máximo 150 líneas por archivo de componente',
    'Principio DRY y tolerancia cero a código muerto',
  ],
  gitConvention: 'Conventional Commits (feat, fix, refactor, docs, chore)',
  customInstructions: '',
};

export const PRESET_CONFIGS: Record<TargetFormat, AgentConfig> = {
  cursor: {
    ...DEFAULT_AGENT_CONFIG,
    targetFormat: 'cursor',
    projectName: 'Cursor Project',
    role: 'Cursor AI Coding Assistant',
    description: 'Reglas y contexto de desarrollo optimizadas para el editor Cursor.',
    architecturalRules: [
      'Uso exclusivo de Standalone Components en Angular',
      'Inyección de dependencias funcional mediante inject()',
      'Control flow nativo (@if, @for, @switch)',
    ],
  },
  copilot: {
    ...DEFAULT_AGENT_CONFIG,
    targetFormat: 'copilot',
    projectName: 'Copilot Workspace',
    role: 'GitHub Copilot Repository Guide',
    description: 'Instrucciones contextuales de repositorio para guiar las sugerencias de Copilot.',
    architecturalRules: [
      'Seguir estándares de arquitectura limpia y patrones SOLID',
      'Estructurar el código en módulos y capas bien delimitadas',
    ],
  },
  agents: {
    ...DEFAULT_AGENT_CONFIG,
    targetFormat: 'agents',
    projectName: 'Autonomous Agent Space',
    role: 'Autonomous AI Development Agent (Claude / Codex)',
    description: 'Directivas maestras de arquitectura, límites de ejecución y flujo de trabajo para agentes.',
    architecturalRules: [
      'Metodología iterativa paso a paso con commits atómicos',
      'Refactorización y auditoría continua de código tras cada cambio',
    ],
  },
  custom: {
    ...DEFAULT_AGENT_CONFIG,
    targetFormat: 'custom',
    projectName: 'Custom Project',
    role: 'Custom AI Assistant',
    description: 'Configuración personalizada desde cero.',
  },
};
