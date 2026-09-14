import { compileAgentMarkdown } from './markdown-compiler.util';
import { AgentConfig } from '../models/agent.model';

describe('markdown-compiler.util', () => {
  const baseConfig: AgentConfig = {
    targetFormat: 'cursor',
    projectName: 'AgentCraft',
    role: 'Frontend Architect',
    description: 'A tool for generating agent instructions.',
    outputLanguage: 'es',
    techStack: ['Angular', 'TypeScript'],
    architecturalRules: ['SRP', 'Clean Code'],
    qualityStandards: [],
    gitConvention: 'Conventional Commits',
    customInstructions: 'Never touch tmp files.',
  };

  it('should compile complete config in Spanish', () => {
    const md = compileAgentMarkdown(baseConfig);
    expect(md).toContain('# AgentCraft');
    expect(md).toContain('> A tool for generating agent instructions.');
    expect(md).toContain('## Rol y Personalidad');
    expect(md).toContain('Frontend Architect');
    expect(md).toContain('## Stack Tecnológico');
    expect(md).toContain('- Angular');
    expect(md).toContain('## Directivas y Reglas de Arquitectura');
    expect(md).toContain('- SRP');
    expect(md).toContain('## Flujo de Trabajo y Convenciones Git');
    expect(md).toContain('- Conventional Commits');
    expect(md).toContain('## Instrucciones Libres y Restricciones');
    expect(md).toContain('Never touch tmp files.');
  });

  it('should compile complete config in English when outputLanguage is en', () => {
    const enConfig: AgentConfig = {
      ...baseConfig,
      outputLanguage: 'en',
    };
    const md = compileAgentMarkdown(enConfig);
    expect(md).toContain('## Role & Persona');
    expect(md).toContain('## Technology Stack');
    expect(md).toContain('## Directives & Architecture');
    expect(md).toContain('## Git Workflow & Conventions');
    expect(md).toContain('## Custom Instructions & Boundaries');
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
      qualityStandards: [],
      gitConvention: '',
      customInstructions: '',
    };
    const md = compileAgentMarkdown(minimalConfig);
    expect(md).toContain('# Agent Guidelines');
    expect(md).not.toContain('## Role & Persona');
    expect(md).not.toContain('## Technology Stack');
    expect(md).not.toContain('## Directives & Architecture');
  });
});
