import { TestBed } from '@angular/core/testing';
import { UiDesignForm } from './ui-design-form';
import { AgentConfigService } from '../../../../core/services/agent-config.service';

describe('UiDesignForm', () => {
  let agentConfig: AgentConfigService;

  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [UiDesignForm],
      providers: [AgentConfigService],
    }).compileComponents();

    agentConfig = TestBed.inject(AgentConfigService);
  });

  it('should create the ui design form', () => {
    const fixture = TestBed.createComponent(UiDesignForm);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should add custom design rule and clear input', () => {
    const fixture = TestBed.createComponent(UiDesignForm);
    const component = fixture.componentInstance;
    component.customInput.set('Dark mode first design');
    component.addCustomRule();

    expect(agentConfig.config().uiDesignRules).toContain('Dark mode first design');
    expect(component.customInput()).toBe('');
  });

  it('should trigger addCustomRule on Enter keydown', () => {
    const fixture = TestBed.createComponent(UiDesignForm);
    const component = fixture.componentInstance;
    component.customInput.set('Micro-animations on hover');

    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    const preventDefaultSpy = vi.spyOn(event, 'preventDefault');

    component.onKeyDown(event);

    expect(preventDefaultSpy).toHaveBeenCalled();
    expect(agentConfig.config().uiDesignRules).toContain('Micro-animations on hover');
  });

  it('should toggle and remove rules', () => {
    const fixture = TestBed.createComponent(UiDesignForm);
    const component = fixture.componentInstance;
    const rule = 'Tailwind CSS v4 utility classes';

    component.toggleRule(rule);
    expect(component.isRuleSelected(rule)).toBe(true);

    component.toggleRule(rule);
    expect(component.isRuleSelected(rule)).toBe(false);

    component.toggleRule(rule);
    expect(component.isRuleSelected(rule)).toBe(true);
    component.removeRule(0);
    expect(component.isRuleSelected(rule)).toBe(false);
  });
});
