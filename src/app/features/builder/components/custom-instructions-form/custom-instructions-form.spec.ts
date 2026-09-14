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

    component.clear();
    fixture.detectChanges();
    expect(agentConfig.config().customInstructions).toBe('');
  });
});
