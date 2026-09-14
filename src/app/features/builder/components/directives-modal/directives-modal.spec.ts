import { ComponentRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AgentConfigService } from '../../../../core/services/agent-config.service';
import { DirectivesModal } from './directives-modal';

describe('DirectivesModal', () => {
  let component: DirectivesModal;
  let componentRef: ComponentRef<DirectivesModal>;
  let service: AgentConfigService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      imports: [DirectivesModal],
    });
    service = TestBed.inject(AgentConfigService);
    const fixture = TestBed.createComponent(DirectivesModal);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
  });

  it('should create modal component', () => {
    expect(component).toBeTruthy();
    expect(component.categories().length).toBeGreaterThan(0);
  });

  it('should update categories reactively when outputLanguage changes', () => {
    service.setOutputLanguage('es');
    const esRule = component.categories()[0].rules[0];
    service.setOutputLanguage('en');
    const enRule = component.categories()[0].rules[0];
    expect(esRule).not.toBe(enRule);
  });

  it('should filter categories when activeCategory changes', () => {
    expect(component.activeCategory()).toBe('all');
    component.setActiveCategory('quality');
    expect(component.activeCategory()).toBe('quality');
  });

  it('should toggle rules via service', () => {
    const testRule = 'Modular architecture test rule';
    expect(component.isRuleSelected(testRule)).toBe(false);
    component.toggleRule(testRule);
    expect(component.isRuleSelected(testRule)).toBe(true);
    expect(service.config().architecturalRules).toContain(testRule);
    component.toggleRule(testRule);
    expect(component.isRuleSelected(testRule)).toBe(false);
  });

  it('should emit close event when onClose is called', () => {
    let closed = false;
    component.close.subscribe(() => {
      closed = true;
    });
    component.onClose();
    expect(closed).toBe(true);
  });
});
