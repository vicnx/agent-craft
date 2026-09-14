import { TestBed } from '@angular/core/testing';
import { AgentConfigService } from './agent-config.service';

describe('AgentConfigService', () => {
  let service: AgentConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgentConfigService);
  });

  it('should be created with default configuration', () => {
    expect(service).toBeTruthy();
    expect(service.config().targetFormat).toBe('cursor');
    expect(service.activeOption().filename).toBe('.cursorrules');
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
  });

  it('should reset configuration back to defaults', () => {
    service.loadPreset('agents');
    expect(service.config().targetFormat).toBe('agents');
    service.reset();
    expect(service.config().targetFormat).toBe('cursor');
    expect(service.config().projectName).toBe('My Project');
  });
});
