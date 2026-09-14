import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PersonaToneForm } from './persona-tone-form';
import { AgentConfigService } from '../../../../core/services/agent-config.service';
import { I18nService } from '../../../../core/i18n/i18n.service';

describe('PersonaToneForm', () => {
  let component: PersonaToneForm;
  let fixture: ComponentFixture<PersonaToneForm>;
  let configService: AgentConfigService;
  let i18nService: I18nService;

  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [PersonaToneForm],
    }).compileComponents();

    i18nService = TestBed.inject(I18nService);
    i18nService.setLanguage('es');

    configService = TestBed.inject(AgentConfigService);
    fixture = TestBed.createComponent(PersonaToneForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should select tone and update AgentConfig', () => {
    component.selectTone('explanatory');
    expect(configService.config().tone).toBe('explanatory');

    component.selectTone('concise');
    expect(configService.config().tone).toBe('concise');
  });

  it('should select autonomy and update AgentConfig', () => {
    component.selectAutonomy('conservative');
    expect(configService.config().autonomy).toBe('conservative');

    component.selectAutonomy('collaborative');
    expect(configService.config().autonomy).toBe('collaborative');
  });

  it('should toggle and check communication rules', () => {
    const testRule = 'No usar abreviaciones';
    expect(component.isRuleSelected(testRule)).toBe(false);

    component.toggleCommunicationRule(testRule);
    expect(component.isRuleSelected(testRule)).toBe(true);

    component.toggleCommunicationRule(testRule);
    expect(component.isRuleSelected(testRule)).toBe(false);
  });

  it('should add custom rule and clear input', () => {
    component.customRuleInput.set('Pauta personalizada de prueba');
    component.addCustomRule();
    expect(configService.config().communicationRules).toContain('Pauta personalizada de prueba');
    expect(component.customRuleInput()).toBe('');
  });

  it('should remove communication rule by index', () => {
    configService.updateConfig({ communicationRules: ['Regla 1', 'Regla 2'] });
    component.removeCommunicationRule(0);
    expect(configService.config().communicationRules).toEqual(['Regla 2']);
  });

  it('should update customTone textarea on input', () => {
    const event = { target: { value: 'Actuar como Senior Staff Engineer' } } as unknown as Event;
    component.onCustomToneChange(event);
    expect(configService.config().customTone).toBe('Actuar como Senior Staff Engineer');
  });
});
