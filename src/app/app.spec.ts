import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';
import { APP_CONFIG } from './core/constants/app.constant';
import { I18nService } from './core/i18n/i18n.service';
import { ThemeService } from './core/services/theme.service';

describe('App', () => {
  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render application brand and dynamic version badge', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('AgentCraft');
    expect(compiled.textContent).toContain(`v${APP_CONFIG.version}`);
  });

  it('should toggle theme when clicking the theme button', async () => {
    const fixture = TestBed.createComponent(App);
    const themeService = TestBed.inject(ThemeService);
    const i18nService = TestBed.inject(I18nService);
    i18nService.setLanguage('es');
    themeService.setTheme('dark');
    fixture.detectChanges();
    await fixture.whenStable();

    const compiled = fixture.nativeElement as HTMLElement;
    const themeBtn = compiled.querySelector('button[aria-label="Cambiar tema"]') as HTMLButtonElement;
    expect(themeBtn).toBeTruthy();

    themeBtn.click();
    expect(themeService.currentTheme()).toBe('light');
  });
});
