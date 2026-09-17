import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgentConfigService } from '../../../../core/services/agent-config.service';
import { CustomInstructionsForm } from './custom-instructions-form';

describe('CustomInstructionsForm', () => {
  let component: CustomInstructionsForm;
  let fixture: ComponentFixture<CustomInstructionsForm>;
  let agentConfig: AgentConfigService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomInstructionsForm],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomInstructionsForm);
    component = fixture.componentInstance;
    agentConfig = TestBed.inject(AgentConfigService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update custom instructions on textarea input', () => {
    const customText = 'Never touch production database directly.';
    const textarea = fixture.nativeElement.querySelector('textarea') as HTMLTextAreaElement;
    textarea.value = customText;
    textarea.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(agentConfig.config().customInstructions).toBe(customText);
  });

  it('should clear custom instructions when clear is called', () => {
    agentConfig.setCustomInstructions('Temporary note');
    fixture.detectChanges();
    expect(agentConfig.config().customInstructions).toBe('Temporary note');

    component.clearCustomInstructions();
    fixture.detectChanges();
    expect(agentConfig.config().customInstructions).toBe('');
  });

  it('should toggle neverRules and check selection', () => {
    const rule = 'No usar any';
    agentConfig.updateConfig({ neverRules: [] });

    expect(component.isRuleSelected(rule)).toBe(false);
    component.toggleNeverRule(rule);
    expect(component.isRuleSelected(rule)).toBe(true);

    component.toggleNeverRule(rule);
    expect(component.isRuleSelected(rule)).toBe(false);
  });

  it('should add custom neverRule and reset input', () => {
    component.neverRuleInput.set('No usar eval()');
    component.addCustomNeverRule();
    expect(agentConfig.config().neverRules).toContain('No usar eval()');
    expect(component.neverRuleInput()).toBe('');
  });

  it('should remove neverRule by index', () => {
    agentConfig.updateConfig({ neverRules: ['Rule 1', 'Rule 2'] });
    component.removeNeverRule(0);
    expect(agentConfig.config().neverRules).toEqual(['Rule 2']);
  });

  it('should clear all neverRules', () => {
    agentConfig.updateConfig({ neverRules: ['Rule 1', 'Rule 2'] });
    component.clearAllNeverRules();
    expect(agentConfig.config().neverRules.length).toBe(0);
  });
});
