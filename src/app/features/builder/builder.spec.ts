import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { I18nService } from '../../core/i18n/i18n.service';
import { Builder } from './builder';

describe('Builder', () => {
  let i18n: I18nService;

  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [Builder],
      providers: [provideRouter([])],
    }).compileComponents();

    i18n = TestBed.inject(I18nService);
    i18n.setLanguage('es');
  });

  it('should create the builder component', () => {
    const fixture = TestBed.createComponent(Builder);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should show custom target by default when no presetId is provided', () => {
    const fixture = TestBed.createComponent(Builder);
    const component = fixture.componentInstance;
    expect(component.activeTarget()).toBe('Configuración Personalizada');
  });

  it('should reflect English translation when language is set to en', () => {
    i18n.setLanguage('en');
    const fixture = TestBed.createComponent(Builder);
    const component = fixture.componentInstance;
    expect(component.activeTarget()).toBe('Custom Configuration');
  });
});
