import { TestBed } from '@angular/core/testing';
import { AgentConfigService } from '../../../../core/services/agent-config.service';
import { DirectivesForm } from './directives-form';

describe('DirectivesForm', () => {
  let component: DirectivesForm;
  let service: AgentConfigService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      imports: [DirectivesForm],
    });
    service = TestBed.inject(AgentConfigService);
    const fixture = TestBed.createComponent(DirectivesForm);
    component = fixture.componentInstance;
  });

  it('should create the directives form component', () => {
    expect(component).toBeTruthy();
  });

  it('should add a custom architectural rule', () => {
    component.customInput.set('Enforce strict typing in all modules');
    component.addCustomRule();
    expect(service.config().architecturalRules).toContain('Enforce strict typing in all modules');
    expect(component.customInput()).toBe('');
  });

  it('should toggle a rule on and off', () => {
    const rule = 'Principio de Responsabilidad Única (SRP)';
    const wasSelected = component.isRuleSelected(rule);
    component.toggleRule(rule);
    expect(component.isRuleSelected(rule)).toBe(!wasSelected);
  });

  it('should emit openCatalog event when triggerOpenCatalog is called', () => {
    let emitted = false;
    component.openCatalog.subscribe(() => {
      emitted = true;
    });
    component.triggerOpenCatalog();
    expect(emitted).toBe(true);
  });

  it('should clear all architectural rules when clearAllRules is called', () => {
    service.addArchitecturalRule('Rule to be cleared');
    expect(service.config().architecturalRules.length).toBeGreaterThan(0);
    component.clearAllRules();
    expect(service.config().architecturalRules.length).toBe(0);
  });

  it('should update quick suggestions reactively when outputLanguage changes', () => {
    service.setOutputLanguage('es');
    const esRule = component.quickSuggestions()[0];
    service.setOutputLanguage('en');
    const enRule = component.quickSuggestions()[0];
    expect(esRule).not.toBe(enRule);
  });
});
