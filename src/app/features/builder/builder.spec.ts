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

  it('should have 4 target format options available', () => {
    const fixture = TestBed.createComponent(Builder);
    const component = fixture.componentInstance;
    expect(component.formatOptions.length).toBe(4);
  });

  it('should open confirmation modal when changeFormat is called and apply on confirm', () => {
    const fixture = TestBed.createComponent(Builder);
    const component = fixture.componentInstance;
    component.changeFormat('copilot');
    expect(component.isChangeFormatModalOpen()).toBe(true);
    expect(component.pendingFormat()).toBe('copilot');

    component.confirmChangeFormat();
    expect(component.isChangeFormatModalOpen()).toBe(false);
    expect(component.agentConfig.targetFormat()).toBe('copilot');
    expect(component.agentConfig.activeOption().filename).toBe('copilot-instructions.md');
    expect(component.agentConfig.config().projectName).toBe('Copilot Workspace');
  });

  it('should cancel format change and keep current format', () => {
    const fixture = TestBed.createComponent(Builder);
    const component = fixture.componentInstance;
    component.changeFormat('copilot');
    expect(component.isChangeFormatModalOpen()).toBe(true);

    component.closeChangeFormatModal();
    expect(component.isChangeFormatModalOpen()).toBe(false);
    expect(component.pendingFormat()).toBeNull();
    expect(component.agentConfig.targetFormat()).toBe('cursor');
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

  it('should load preset when presetId input is provided without infinite loop', () => {
    const fixture = TestBed.createComponent(Builder);
    fixture.componentRef.setInput('presetId', 'agents');
    fixture.detectChanges();
    expect(fixture.componentInstance.agentConfig.targetFormat()).toBe('agents');
    expect(fixture.componentInstance.agentConfig.activeOption().filename).toBe('AGENTS.md');
  });

  it('should load custom preset from scratch with empty rules when presetId is custom', () => {
    const fixture = TestBed.createComponent(Builder);
    fixture.componentRef.setInput('presetId', 'custom');
    fixture.detectChanges();
    expect(fixture.componentInstance.agentConfig.targetFormat()).toBe('custom');
    expect(fixture.componentInstance.agentConfig.activeOption().filename).toBe('RULES.md');
    expect(fixture.componentInstance.agentConfig.config().architecturalRules.length).toBe(0);
  });
});

