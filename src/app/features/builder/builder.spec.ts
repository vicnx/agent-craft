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

  it('should copy compiled markdown to clipboard', async () => {
    const fixture = TestBed.createComponent(Builder);
    const component = fixture.componentInstance;
    const writeTextSpy = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, { clipboard: { writeText: writeTextSpy } });

    await component.copyToClipboard();
    expect(writeTextSpy).toHaveBeenCalledWith(component.agentConfig.compiledMarkdown());
    expect(component.isCopied()).toBe(true);
  });

  it('should load preset when presetId input is provided without infinite loop', () => {
    const fixture = TestBed.createComponent(Builder);
    fixture.componentRef.setInput('presetId', 'python');
    fixture.detectChanges();
    expect(fixture.componentInstance.agentConfig.config().projectName).toBe('Python AI & Backend');
    expect(fixture.componentInstance.agentConfig.config().techStack).toContain('FastAPI');
  });

  it('should load custom preset from scratch with empty rules when presetId is custom', () => {
    const fixture = TestBed.createComponent(Builder);
    fixture.componentRef.setInput('presetId', 'custom');
    fixture.detectChanges();
    expect(fixture.componentInstance.agentConfig.config().architecturalRules.length).toBe(0);
    expect(fixture.componentInstance.agentConfig.config().techStack.length).toBe(0);
  });
});
