import { compileAgentMarkdown, formatRuleItem } from './markdown-compiler.util';
import { AgentConfig } from '../models/agent.model';

describe('markdown-compiler.util', () => {
  const baseConfig: AgentConfig = {
    targetFormat: 'agents',
    projectName: 'AgentCraft',
    role: 'Frontend Architect',
    description: 'A tool for generating agent instructions.',
    outputLanguage: 'es',
    techStack: ['Angular', 'TypeScript'],
    architecturalRules: [
      'Arquitectura modular y componentes desacoplados',
      'Principio DRY: máxima reutilización y cero duplicación',
      'Tipado estricto activado sin uso de any',
    ],
    uiDesignRules: ['Dark-mode first con Tailwind CSS'],
    gitConvention: 'Conventional Commits',
    buildCommands: {
      build: 'npm run build',
      test: 'npm test',
      dev: 'npm run start',
    },
    customInstructions: 'Never touch tmp files.',
  };

  it('should compile complete config in AGENTS.md format with all 6 sections', () => {
    const md = compileAgentMarkdown(baseConfig);
    expect(md).toContain('# Directivas de Desarrollo: AgentCraft');
    expect(md).toContain('> A tool for generating agent instructions.');
    expect(md).toContain('## 1. Visión del Proyecto');
    expect(md).toContain('**Rol del Asistente:** Frontend Architect');
    expect(md).toContain('## 2. Stack Tecnológico');
    expect(md).toContain('- Angular');
    expect(md).toContain('## 3. Directivas de Arquitectura y Estándares de Código');
    expect(md).toContain('**Principio DRY:**');
    expect(md).toContain('## 4. UI/UX y Diseño Visual');
    expect(md).toContain('- Dark-mode first con Tailwind CSS');
    expect(md).toContain('## 5. Flujo de Trabajo y Convenciones Git');
    expect(md).toContain('Conventional Commits');
    expect(md).toContain('# Build');
    expect(md).toContain('npm run build');
    expect(md).toContain('## 6. Instrucciones Operativas y Guardrails');
    expect(md).toContain('Never touch tmp files.');
  });

  it('should include YAML frontmatter when targetFormat is cursor', () => {
    const cursorConfig: AgentConfig = {
      ...baseConfig,
      targetFormat: 'cursor',
    };
    const md = compileAgentMarkdown(cursorConfig);
    expect(md).toMatch(/^---\ndescription: /);
    expect(md).toContain('globs: *');
    expect(md).toContain('# AgentCraft');
  });

  it('should compile complete config in English when outputLanguage is en', () => {
    const enConfig: AgentConfig = {
      ...baseConfig,
      outputLanguage: 'en',
    };
    const md = compileAgentMarkdown(enConfig);
    expect(md).toContain('## 1. Project Vision & Scope');
    expect(md).toContain('**Assigned Agent Role:** Frontend Architect');
    expect(md).toContain('## 2. Technology Stack');
    expect(md).toContain('## 3. Architecture & Code Quality Directives');
    expect(md).toContain('## 4. UI/UX & Visual Design');
    expect(md).toContain('## 5. Git Workflow & Conventions');
    expect(md).toContain('### Development & Verification Commands');
    expect(md).toContain('## 6. Operational Instructions & Guardrails');
  });

  it('should format rule items with bold title when containing a colon', () => {
    expect(formatRuleItem('Principio DRY: cero duplicidad')).toBe('- **Principio DRY:** cero duplicidad');
    expect(formatRuleItem('- **Ya formateado:** regla')).toBe('- - **Ya formateado:** regla');
    expect(formatRuleItem('Regla simple sin dos puntos')).toBe('- Regla simple sin dos puntos');
    expect(formatRuleItem('')).toBe('');
  });

  it('should handle custom git conventions that are not conventional commits', () => {
    const customConfig: AgentConfig = {
      ...baseConfig,
      gitConvention: 'Git Flow feature branches',
      buildCommands: { build: '', test: '', dev: '' },
    };
    const md = compileAgentMarkdown(customConfig);
    expect(md).toContain('- **Convención Git:** Git Flow feature branches');
    expect(md).not.toContain('Conventional Commits');
  });

  it('should omit empty sections gracefully', () => {
    const minimalConfig: AgentConfig = {
      targetFormat: 'agents',
      projectName: '',
      role: '',
      description: '',
      outputLanguage: 'en',
      techStack: [],
      architecturalRules: [],
      uiDesignRules: [],
      gitConvention: '',
      buildCommands: { build: '', test: '', dev: '' },
      customInstructions: '',
    };
    const md = compileAgentMarkdown(minimalConfig);
    expect(md).toContain('# Development Directives: Agent Guidelines');
    expect(md).not.toContain('## 1. Project Vision');
    expect(md).not.toContain('## 2. Technology Stack');
    expect(md).not.toContain('## 3. Architecture');
    expect(md).not.toContain('## 4. UI/UX');
    expect(md).not.toContain('## 5. Git Workflow');
    expect(md).not.toContain('## 6. Operational');
  });
});
