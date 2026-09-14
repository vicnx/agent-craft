import { TestBed } from '@angular/core/testing';
import { AgentConfigService } from '../../../../core/services/agent-config.service';
import { AgentIdentityForm } from './agent-identity-form';

describe('AgentIdentityForm', () => {
  let component: AgentIdentityForm;
  let service: AgentConfigService;

  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [AgentIdentityForm],
      providers: [AgentConfigService],
    }).compileComponents();

    const fixture = TestBed.createComponent(AgentIdentityForm);
    component = fixture.componentInstance;
    service = TestBed.inject(AgentConfigService);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should update project name on input', () => {
    const event = { target: { value: 'New Test Project' } } as unknown as Event;
    component.onProjectNameChange(event);
    expect(service.config().projectName).toBe('New Test Project');
  });

  it('should update role on input', () => {
    const event = { target: { value: 'Frontend Lead' } } as unknown as Event;
    component.onRoleChange(event);
    expect(service.config().role).toBe('Frontend Lead');
  });

  it('should update output language', () => {
    component.setOutputLanguage('en');
    expect(service.config().outputLanguage).toBe('en');
    component.setOutputLanguage('es');
    expect(service.config().outputLanguage).toBe('es');
  });

  it('should select role from suggestion pill', () => {
    const suggestedRole = component.allRoles[0];
    component.selectRole(suggestedRole);
    expect(service.config().role).toBe(suggestedRole);
  });

  it('should toggle visibility of all roles', () => {
    expect(component.showAllRoles()).toBe(false);
    expect(component.visibleRoles().length).toBe(4);
    component.toggleShowAllRoles();
    expect(component.showAllRoles()).toBe(true);
    expect(component.visibleRoles().length).toBe(component.allRoles.length);
  });
});
