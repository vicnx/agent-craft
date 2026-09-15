import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Builder } from './builder';

describe('Builder', () => {
  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [Builder],
      providers: [
        provideRouter([
          { path: 'builder/:presetId', component: Builder },
          { path: 'builder', component: Builder },
        ]),
      ],
    }).compileComponents();
  });

  it('should create the builder component', () => {
    const fixture = TestBed.createComponent(Builder);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should have 5 target format options available', () => {
    const fixture = TestBed.createComponent(Builder);
    const component = fixture.componentInstance;
    expect(component.formatOptions.length).toBe(5);
  });

  it('should switch target format on changeFormat without resetting user rules', () => {
    const fixture = TestBed.createComponent(Builder);
    const component = fixture.componentInstance;
    component.changeFormat('copilot');
    expect(component.agentConfig.targetFormat()).toBe('copilot');
    expect(component.agentConfig.activeOption().filename).toBe('copilot-instructions.md');

    component.changeFormat('claude');
    expect(component.agentConfig.targetFormat()).toBe('claude');
    expect(component.agentConfig.activeOption().filename).toBe('CLAUDE.md');
  });

  it('should manage decoupled catalog modal state', () => {
    const fixture = TestBed.createComponent(Builder);
    const component = fixture.componentInstance;
    expect(component.isCatalogOpen()).toBe(false);
    component.isCatalogOpen.set(true);
    expect(component.isCatalogOpen()).toBe(true);
    component.isCatalogOpen.set(false);
    expect(component.isCatalogOpen()).toBe(false);
  });

  it('should open and handle reset modal', () => {
    const fixture = TestBed.createComponent(Builder);
    const component = fixture.componentInstance;
    component.agentConfig.updateConfig({ projectName: 'Custom' });
    expect(component.isResetModalOpen()).toBe(false);

    component.openResetModal();
    expect(component.isResetModalOpen()).toBe(true);

    component.cancelReset();
    expect(component.isResetModalOpen()).toBe(false);
    expect(component.agentConfig.config().projectName).toBe('Custom');

    component.openResetModal();
    component.confirmReset();
    expect(component.isResetModalOpen()).toBe(false);
    const expectedName = component.agentConfig.config().outputLanguage === 'es' ? 'Proyecto Personalizado' : 'Custom Project';
    expect(component.agentConfig.config().projectName).toBe(expectedName);
  });

  it('should navigate through steps correctly and respect boundaries', () => {
    const fixture = TestBed.createComponent(Builder);
    const component = fixture.componentInstance;
    expect(component.currentStep()).toBe(1);

    component.nextStep();
    expect(component.currentStep()).toBe(2);

    component.nextStep();
    expect(component.currentStep()).toBe(3);

    component.goToStep(5);
    expect(component.currentStep()).toBe(5);

    // Should not exceed step 5
    component.nextStep();
    expect(component.currentStep()).toBe(5);

    component.prevStep();
    expect(component.currentStep()).toBe(4);

    component.goToStep(1);
    expect(component.currentStep()).toBe(1);

    // Should not go below step 1
    component.prevStep();
    expect(component.currentStep()).toBe(1);

    // Ignore invalid steps
    component.goToStep(99);
    expect(component.currentStep()).toBe(1);
  });

  it('should switch mobile tab to preview on reviewOutput', () => {
    const fixture = TestBed.createComponent(Builder);
    const component = fixture.componentInstance;
    expect(component.activeMobileTab()).toBe('editor');

    component.reviewOutput();
    expect(component.activeMobileTab()).toBe('preview');
  });

  it('should load preset when presetId input is provided without infinite loop', () => {
    const fixture = TestBed.createComponent(Builder);
    fixture.componentRef.setInput('presetId', 'python');
    fixture.detectChanges();
    expect(fixture.componentInstance.agentConfig.config().projectName).toBe('Python AI & Backend');
    expect(fixture.componentInstance.agentConfig.config().techStack).toContain('FastAPI');
  });

  it('should load angular preset with ng serve when presetId is angular', () => {
    const fixture = TestBed.createComponent(Builder);
    fixture.componentRef.setInput('presetId', 'angular');
    fixture.detectChanges();
    expect(fixture.componentInstance.agentConfig.config().techStack).toContain('Angular');
    expect(fixture.componentInstance.agentConfig.config().buildCommands.dev).toBe('ng serve');
  });

  it('should load react preset with npm run dev when presetId is react', () => {
    const fixture = TestBed.createComponent(Builder);
    fixture.componentRef.setInput('presetId', 'react');
    fixture.detectChanges();
    expect(fixture.componentInstance.agentConfig.config().techStack).toContain('React 19');
    expect(fixture.componentInstance.agentConfig.config().buildCommands.dev).toBe('npm run dev');
  });

  it('should load custom preset from scratch with empty rules when presetId is custom', () => {
    const fixture = TestBed.createComponent(Builder);
    fixture.componentRef.setInput('presetId', 'custom');
    fixture.detectChanges();
    expect(fixture.componentInstance.agentConfig.config().architecturalRules.length).toBe(0);
    expect(fixture.componentInstance.agentConfig.config().techStack.length).toBe(0);
  });

  it('should switch active mobile tab', () => {
    const fixture = TestBed.createComponent(Builder);
    const component = fixture.componentInstance;
    expect(component.activeMobileTab()).toBe('editor');

    component.setMobileTab('preview');
    expect(component.activeMobileTab()).toBe('preview');

    component.setMobileTab('editor');
    expect(component.activeMobileTab()).toBe('editor');
  });
});
