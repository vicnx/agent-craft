import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Builder } from './builder';

describe('Builder', () => {
  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [Builder],
      providers: [provideRouter([])],
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

  it('should switch format and load preset when changeFormat is called', () => {
    const fixture = TestBed.createComponent(Builder);
    const component = fixture.componentInstance;
    component.changeFormat('copilot');
    expect(component.agentConfig.targetFormat()).toBe('copilot');
    expect(component.agentConfig.activeOption().filename).toBe('copilot-instructions.md');
    expect(component.agentConfig.config().projectName).toBe('Copilot Workspace');
  });
});
