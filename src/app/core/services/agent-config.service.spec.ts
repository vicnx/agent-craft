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
    expect(enService.config().role).toBe('Senior Fullstack Software Engineer');
  });

  it('should load preset correctly', () => {
    service.loadPreset('copilot');
    expect(service.config().targetFormat).toBe('copilot');
    expect(service.config().projectName).toBe('Copilot Workspace');
    expect(service.activeOption().filename).toBe('copilot-instructions.md');
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

  it('should add and remove architectural rules', () => {
    const initialCount = service.config().architecturalRules.length;
    service.addArchitecturalRule('New Rule 1');
    expect(service.config().architecturalRules.length).toBe(initialCount + 1);

    service.removeArchitecturalRule(initialCount);
    expect(service.config().architecturalRules.length).toBe(initialCount);

    service.clearArchitecturalRules();
    expect(service.config().architecturalRules.length).toBe(0);
  });

  it('should reset configuration back to defaults', () => {
    service.loadPreset('agents');
    expect(service.config().targetFormat).toBe('agents');
    service.reset();
    expect(service.config().targetFormat).toBe('cursor');
    expect(service.config().projectName).toBe('My Project');
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

  it('should reactively sync outputLanguage when I18nService language changes', () => {
    const i18n = TestBed.inject(I18nService);
    i18n.setLanguage('en');
    TestBed.flushEffects();
    expect(service.config().outputLanguage).toBe('en');

    i18n.setLanguage('es');
    TestBed.flushEffects();
    expect(service.config().outputLanguage).toBe('es');
  });

  it('should maintain English outputLanguage and translate preset items when loading preset', () => {
    service.setOutputLanguage('en');
    service.loadPreset('copilot');
    expect(service.config().outputLanguage).toBe('en');
    expect(service.config().targetFormat).toBe('copilot');
    expect(service.config().role).toBe('Clean Code & Software Craftsmanship Expert');
  });

  it('should reset to English default config when app language is English', () => {
    const i18n = TestBed.inject(I18nService);
    i18n.setLanguage('en');
    TestBed.flushEffects();
    service.loadPreset('agents');
    service.reset();
    expect(service.config().outputLanguage).toBe('en');
    expect(service.config().role).toBe('Senior Fullstack Software Engineer');
  });
});
