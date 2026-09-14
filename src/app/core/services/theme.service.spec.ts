import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark', 'light');
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);
  });

  afterEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark', 'light');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should toggle theme from dark to light and update signals and DOM', () => {
    service.setTheme('dark');
    expect(service.currentTheme()).toBe('dark');
    expect(service.isDark()).toBe(true);

    service.toggleTheme();
    expect(service.currentTheme()).toBe('light');
    expect(service.isDark()).toBe(false);
    expect(localStorage.getItem('agentcraft_theme')).toBe('light');

    service.toggleTheme();
    expect(service.currentTheme()).toBe('dark');
    expect(service.isDark()).toBe(true);
    expect(localStorage.getItem('agentcraft_theme')).toBe('dark');
  });

  it('should persist explicitly set theme in localStorage', () => {
    service.setTheme('light');
    expect(service.currentTheme()).toBe('light');
    expect(localStorage.getItem('agentcraft_theme')).toBe('light');
  });

  it('should not update if setting the same theme', () => {
    service.setTheme('dark');
    const setSpy = vi.spyOn(service.currentTheme, 'set');
    service.setTheme('dark');
    expect(setSpy).not.toHaveBeenCalled();
  });
});
