import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgentConfigService } from '../../../../core/services/agent-config.service';
import { GIT_CONVENTION_PRESETS, WorkflowForm } from './workflow-form';

describe('WorkflowForm', () => {
  let component: WorkflowForm;
  let fixture: ComponentFixture<WorkflowForm>;
  let agentConfig: AgentConfigService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkflowForm],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkflowForm);
    component = fixture.componentInstance;
    agentConfig = TestBed.inject(AgentConfigService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.presets.length).toBe(GIT_CONVENTION_PRESETS.length);
  });

  it('should update git convention on input change', () => {
    const customValue = 'Conventional Commits with scope';
    const inputEl = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    inputEl.value = customValue;
    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(agentConfig.config().gitConvention).toBe(customValue);
  });

  it('should select preset on button click', () => {
    const targetPreset = GIT_CONVENTION_PRESETS[1];
    component.selectPreset(targetPreset);
    fixture.detectChanges();

    expect(agentConfig.config().gitConvention).toBe(targetPreset);
    expect(component.isSelected(targetPreset)).toBe(true);
    expect(component.isSelected(GIT_CONVENTION_PRESETS[0])).toBe(false);
  });

  it('should update build commands on input', () => {
    const event = { target: { value: 'npm run custom-build' } } as unknown as Event;
    component.updateBuildCommand('build', event);
    expect(agentConfig.config().buildCommands.build).toBe('npm run custom-build');
  });

  it('should toggle proposeCommit independent option', () => {
    const initial = agentConfig.config().proposeCommit;
    component.toggleProposeCommit();
    expect(agentConfig.config().proposeCommit).toBe(!initial);
    component.toggleProposeCommit();
    expect(agentConfig.config().proposeCommit).toBe(initial);
  });
});
