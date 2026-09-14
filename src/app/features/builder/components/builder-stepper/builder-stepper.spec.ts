import { TestBed } from '@angular/core/testing';
import { BuilderStepper, BUILDER_STEPS } from './builder-stepper';
import { AgentConfigService } from '../../../../core/services/agent-config.service';

describe('BuilderStepper', () => {
  let agentConfig: AgentConfigService;

  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [BuilderStepper],
      providers: [AgentConfigService],
    }).compileComponents();

    agentConfig = TestBed.inject(AgentConfigService);
  });

  it('should create the stepper component', () => {
    const fixture = TestBed.createComponent(BuilderStepper);
    fixture.componentRef.setInput('currentStep', 1);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should have 4 predefined steps', () => {
    expect(BUILDER_STEPS.length).toBe(4);
  });

  it('should emit stepChange when clicking a different step', () => {
    const fixture = TestBed.createComponent(BuilderStepper);
    fixture.componentRef.setInput('currentStep', 1);
    fixture.detectChanges();

    const spy = vi.fn();
    fixture.componentInstance.stepChange.subscribe(spy);

    fixture.componentInstance.selectStep(3);
    expect(spy).toHaveBeenCalledWith(3);
  });

  it('should not emit stepChange when clicking the current step', () => {
    const fixture = TestBed.createComponent(BuilderStepper);
    fixture.componentRef.setInput('currentStep', 2);
    fixture.detectChanges();

    const spy = vi.fn();
    fixture.componentInstance.stepChange.subscribe(spy);

    fixture.componentInstance.selectStep(2);
    expect(spy).not.toHaveBeenCalled();
  });

  it('should return correct badge count for steps with configured items', () => {
    const fixture = TestBed.createComponent(BuilderStepper);
    fixture.componentRef.setInput('currentStep', 1);
    fixture.detectChanges();

    agentConfig.addTechStackItem('Angular');
    agentConfig.addTechStackItem('Tailwind');
    agentConfig.addArchitecturalRule('Clean code principle');

    expect(fixture.componentInstance.getStepBadge(1)).toBe(0);
    expect(fixture.componentInstance.getStepBadge(2)).toBe(2);
    expect(fixture.componentInstance.getStepBadge(3)).toBe(1);
    expect(fixture.componentInstance.getStepBadge(4)).toBe(0);
  });
});
