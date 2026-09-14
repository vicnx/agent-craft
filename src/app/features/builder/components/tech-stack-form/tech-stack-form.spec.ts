import { TestBed } from '@angular/core/testing';
import { AgentConfigService } from '../../../../core/services/agent-config.service';
import { TechStackForm } from './tech-stack-form';

describe('TechStackForm', () => {
  let component: TechStackForm;
  let service: AgentConfigService;

  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [TechStackForm],
      providers: [AgentConfigService],
    }).compileComponents();

    const fixture = TestBed.createComponent(TechStackForm);
    component = fixture.componentInstance;
    service = TestBed.inject(AgentConfigService);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should add custom tech item when addCustomTech is called', () => {
    component.customTechInput.set('NestJS');
    component.addCustomTech();
    expect(service.config().techStack).toContain('NestJS');
    expect(component.customTechInput()).toBe('');
  });

  it('should remove tech item when removeTech is called', () => {
    service.addTechStackItem('Docker');
    expect(service.config().techStack).toContain('Docker');
    component.removeTech('Docker');
    expect(service.config().techStack).not.toContain('Docker');
  });

  it('should toggle popular tech item in and out', () => {
    component.togglePopular('Python');
    expect(component.isTechSelected('Python')).toBe(true);
    component.togglePopular('Python');
    expect(component.isTechSelected('Python')).toBe(false);
  });

  it('should display limited popular items until toggled', () => {
    expect(component.showAllCategories()).toBe(false);
    expect(component.visiblePopularTech().length).toBe(6);
    component.toggleShowAll();
    expect(component.showAllCategories()).toBe(true);
    expect(component.visiblePopularTech().length).toBe(component.popularTech.length);
  });
});
