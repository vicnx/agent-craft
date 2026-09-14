/**
 * Formatos de archivo y asistentes de IA soportados.
 */
export type TargetFormat = 'cursor' | 'copilot' | 'agents' | 'claude' | 'custom';

/**
 * Metadatos descriptivos para los selectores de formato en la interfaz.
 */
export interface TargetFormatOption {
  /** Identificador único del formato. Ej: 'cursor', 'copilot' */
  readonly id: TargetFormat;

  /** Nombre del archivo de configuración generado. Ej: '.cursorrules', 'AGENTS.md' */
  readonly filename: string;

  /** Clave de traducción para la etiqueta del selector */
  readonly labelKey: string;

  /** Clave de traducción para la descripción breve del formato */
  readonly descKey: string;
}

export interface BuildCommands {
  readonly build: string;
  readonly test: string;
  readonly dev: string;
}

/**
 * Estado completo de la configuración del agente que se compilará en Markdown.
 */
export interface AgentConfig {
  /** Formato de salida seleccionado. Ej: 'cursor' -> genera .cursorrules */
  readonly targetFormat: TargetFormat;

  /** Nombre del proyecto o repositorio. Ej: 'AgentCraft' */
  readonly projectName: string;

  /** Rol profesional asignado al agente. Ej: 'Senior Frontend Architect & Clean Code Expert' */
  readonly role: string;

  /** Misión o propósito general del proyecto. Ej: 'SPA para generar reglas y contextos de IA' */
  readonly description: string;

  /** Idioma en el que se redactará el archivo final generado ('es' o 'en') */
  readonly outputLanguage: 'es' | 'en';

  /** Tecnologías y librerías clave. Ej: ['Angular 22', 'Tailwind CSS v4', 'TypeScript'] */
  readonly techStack: readonly string[];

  /** Reglas de arquitectura y código. Ej: ['Standalone Components', 'Signals', 'SRP'] */
  readonly architecturalRules: readonly string[];

  /** Directivas de UI/UX y diseño visual. Ej: ['Dark-mode first', 'Responsive total', 'Tailwind'] */
  readonly uiDesignRules: readonly string[];

  /** Comandos de ejecución para que el asistente pueda verificar su trabajo */
  readonly buildCommands: BuildCommands;

  /** Convención de control de versiones y flujo Git. Ej: 'Conventional Commits' */
  readonly gitConvention: string;

  /** Instrucciones adicionales libres o restricciones específicas del desarrollador */
  readonly customInstructions: string;
}
