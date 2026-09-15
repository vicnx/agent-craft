import { TestBed } from '@angular/core/testing';
import { I18nService } from '../i18n/i18n.service';
import { AgentConfigService } from './agent-config.service';

describe('AgentConfigService', () => {
  let service: AgentConfigService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgentConfigService);
  });

  it('should be created with default configuration', () => {
    expect(service).toBeTruthy();
    expect(service.config().targetFormat).toBe('cursor');
    expect(service.activeOption().filename).toBe('.cursorrules');
  });

  it('should initialize with English outputLanguage if I18nService is initially English', () => {
    localStorage.setItem('agentcraft_lang', 'en');
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({});
    const enService = TestBed.inject(AgentConfigService);
    expect(enService.config().outputLanguage).toBe('en');
    expect(enService.config().role).toBe('AI Coding Assistant');
  });

  it('should load preset correctly', () => {
    service.loadPreset('python');
    expect(service.config().projectName).toBe('Python AI & Backend');
    expect(service.config().techStack).toContain('FastAPI');
  });

  it('should load angular preset with modern rules, commands, and stack', () => {
    service.setOutputLanguage('es');
    service.loadPreset('angular');
    expect(service.config().projectName).toBe('Proyecto Angular Moderno');
    expect(service.config().techStack).toContain('Angular');
    expect(service.config().techStack).toContain('Tailwind CSS');
    expect(service.config().buildCommands.build).toBe('ng build');
    expect(service.config().buildCommands.dev).toBe('ng serve');
    expect(service.config().architecturalRules.some((r) => r.includes('Standalone Components'))).toBe(true);
    expect(service.config().neverRules.some((r) => r.includes('NgModule'))).toBe(true);
  });

  it('should load react preset with modern hooks, zustand, and tanstack query', () => {
    service.setOutputLanguage('es');
    service.loadPreset('react');
    expect(service.config().projectName).toBe('Proyecto React 19 Web');
    expect(service.config().techStack).toContain('React 19');
    expect(service.config().techStack).toContain('Zustand');
    expect(service.config().techStack).toContain('TanStack Query');
    expect(service.config().buildCommands.build).toBe('npm run build');
    expect(service.config().buildCommands.dev).toBe('npm run dev');
    expect(service.config().architecturalRules.some((r) => r.includes('TanStack Query'))).toBe(true);
    expect(service.config().neverRules.some((r) => r.includes('Class Components'))).toBe(true);
  });

  it('should switch targetFormat without resetting user rules or stack', () => {
    service.setOutputLanguage('es');
    service.loadPreset('react');
    service.addTechStackItem('CustomLib');
    service.setTargetFormat('copilot');
    expect(service.config().targetFormat).toBe('copilot');
    expect(service.config().techStack).toContain('CustomLib');
    expect(service.config().projectName).toBe('Proyecto React 19 Web');
  });

  it('should update partial configuration', () => {
    service.updateConfig({ projectName: 'SuperAgent', role: 'DevOps Lead' });
    expect(service.config().projectName).toBe('SuperAgent');
    expect(service.config().role).toBe('DevOps Lead');
  });

  it('should add and remove tech stack items without duplicates', () => {
    service.addTechStackItem('RxJS');
    expect(service.config().techStack).toContain('RxJS');
    service.addTechStackItem('RxJS');
    expect(service.config().techStack.filter((t) => t === 'RxJS').length).toBe(1);
    service.removeTechStackItem('RxJS');
    expect(service.config().techStack).not.toContain('RxJS');
  });

  it('should add, remove and clear architectural rules', () => {
    const initialCount = service.config().architecturalRules.length;
    service.addArchitecturalRule('New Rule 1');
    expect(service.config().architecturalRules.length).toBe(initialCount + 1);
    service.removeArchitecturalRule(initialCount);
    expect(service.config().architecturalRules.length).toBe(initialCount);
    service.addArchitecturalRule('To clear');
    service.clearArchitecturalRules();
    expect(service.config().architecturalRules.length).toBe(0);
  });

  it('should toggle architectural rules and verify existence', () => {
    expect(service.hasArchitecturalRule('Toggle Rule')).toBe(false);
    service.toggleArchitecturalRule('Toggle Rule');
    expect(service.hasArchitecturalRule('Toggle Rule')).toBe(true);
    service.toggleArchitecturalRule('Toggle Rule');
    expect(service.hasArchitecturalRule('Toggle Rule')).toBe(false);
  });

  it('should manage ui design rules and build commands', () => {
    service.addUiDesignRule('Dark-mode first');
    expect(service.config().uiDesignRules).toContain('Dark-mode first');
    service.removeUiDesignRule(0);
    expect(service.config().uiDesignRules).not.toContain('Dark-mode first');
    service.setBuildCommand('build', 'npm run build');
    expect(service.config().buildCommands.build).toBe('npm run build');
    service.setProposeCommit(false);
    expect(service.config().proposeCommit).toBe(false);
  });

  it('should compile reactive markdown whenever config changes', () => {
    service.updateConfig({ projectName: 'SuperStudio' });
    expect(service.compiledMarkdown()).toContain('# SuperStudio');
  });

  it('should update git convention and append custom instructions without duplication', () => {
    service.setGitConvention('GitFlow');
    expect(service.config().gitConvention).toBe('GitFlow');
    service.setCustomInstructions('Initial rule.');
    service.appendCustomInstruction('Second rule.');
    expect(service.config().customInstructions).toContain('- Second rule.');
    service.appendCustomInstruction('Second rule.');
    const occurrences = service.config().customInstructions.split('Second rule.').length - 1;
    expect(occurrences).toBe(1);
  });

  it('should reset configuration back to defaults', () => {
    const i18n = TestBed.inject(I18nService);
    i18n.setLanguage('es');
    TestBed.flushEffects();
    service.loadPreset('go');
    expect(service.config().projectName).toBe('Microservicio Go');
    service.reset();
    expect(service.config().projectName).toBe('Proyecto Personalizado');
  });

  it('should switch output language and translate catalog rules and role', () => {
    service.updateConfig({
      outputLanguage: 'es',
      role: 'Arquitecto Frontend Senior y Especialista UI/UX',
      architecturalRules: ['Arquitectura modular y componentes desacoplados'],
    });
    service.setOutputLanguage('en');
    expect(service.config().outputLanguage).toBe('en');
    expect(service.config().role).toBe('Senior Frontend Architect & UI/UX Specialist');
    expect(service.config().architecturalRules).toContain('Modular architecture and decoupled components');

    service.setOutputLanguage('es');
    expect(service.config().outputLanguage).toBe('es');
    expect(service.config().role).toBe('Arquitecto Frontend Senior y Especialista UI/UX');
    expect(service.config().architecturalRules).toContain('Arquitectura modular y componentes desacoplados');
  });

  it('should reactively sync outputLanguage and reset with I18nService language', () => {
    const i18n = TestBed.inject(I18nService);
    i18n.setLanguage('en');
    TestBed.flushEffects();
    expect(service.config().outputLanguage).toBe('en');

    service.loadPreset('react');
    expect(service.config().projectName).toBe('Modern React 19 Web App');
    expect(service.config().role).toBe('Senior Frontend Architect & React 19 Specialist');

    service.loadPreset('go');
    service.reset();
    expect(service.config().projectName).toBe('Custom Project');
    expect(service.config().role).toBe('AI Coding Assistant');
  });

  it('should update tone, autonomy, and custom tone', () => {
    service.setTone('explanatory');
    expect(service.config().tone).toBe('explanatory');

    service.setAutonomy('conservative');
    expect(service.config().autonomy).toBe('conservative');

    service.setCustomTone('Act like a principal engineer');
    expect(service.config().customTone).toBe('Act like a principal engineer');
  });

  it('should toggle, add, and remove communication rules', () => {
    service.updateConfig({ communicationRules: [] });
    service.toggleCommunicationRule('Never apologize');
    expect(service.config().communicationRules).toContain('Never apologize');

    // Toggle off
    service.toggleCommunicationRule('Never apologize');
    expect(service.config().communicationRules).not.toContain('Never apologize');

    // Add unique
    service.addCommunicationRule('Keep code concise');
    service.addCommunicationRule('Keep code concise');
    expect(service.config().communicationRules.length).toBe(1);

    // Remove by index
    service.removeCommunicationRule(0);
    expect(service.config().communicationRules.length).toBe(0);
  });

  it('should toggle, add, remove, and clear neverRules', () => {
    service.updateConfig({ neverRules: [] });
    service.toggleNeverRule('No usar any');
    expect(service.config().neverRules).toContain('No usar any');

    // Toggle off
    service.toggleNeverRule('No usar any');
    expect(service.config().neverRules).not.toContain('No usar any');

    // Add unique
    service.addNeverRule('No tocar .env');
    service.addNeverRule('No tocar .env');
    expect(service.config().neverRules.length).toBe(1);

    // Remove by index
    service.removeNeverRule(0);
    expect(service.config().neverRules.length).toBe(0);

    // Clear all
    service.addNeverRule('Regla 1');
    service.addNeverRule('Regla 2');
    expect(service.config().neverRules.length).toBe(2);
    service.clearNeverRules();
    expect(service.config().neverRules.length).toBe(0);
  });
});
