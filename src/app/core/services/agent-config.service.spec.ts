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

  it('should switch targetFormat without resetting user rules or stack', () => {
    service.setOutputLanguage('es');
    service.loadPreset('typescript');
    service.addTechStackItem('CustomLib');
    service.setTargetFormat('copilot');
    expect(service.config().targetFormat).toBe('copilot');
    expect(service.config().techStack).toContain('CustomLib');
    expect(service.config().projectName).toBe('Proyecto TypeScript');
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

    service.loadPreset('typescript');
    expect(service.config().projectName).toBe('TypeScript Project');
    expect(service.config().role).toBe('Senior Frontend Architect & TypeScript Specialist');

    service.loadPreset('go');
    service.reset();
    expect(service.config().projectName).toBe('Custom Project');
    expect(service.config().role).toBe('AI Coding Assistant');
  });
});
