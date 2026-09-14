import { TestBed } from '@angular/core/testing';
import { I18nService } from './i18n.service';

describe('I18nService', () => {
  let service: I18nService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(I18nService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should translate valid keys in Spanish', () => {
    service.setLanguage('es');
    expect(service.translate('common.clientSide')).toBe('100% Client-Side');
    expect(service.translate('common.back')).toBe('Volver');
  });

  it('should translate valid keys in English when language changes', () => {
    service.setLanguage('en');
    expect(service.translate('common.back')).toBe('Back');
    expect(service.translate('welcome.featureExportTitle')).toBe('One-Click Export');
  });

  it('should toggle language between es and en', () => {
    service.setLanguage('es');
    service.toggleLanguage();
    expect(service.currentLang()).toBe('en');
    service.toggleLanguage();
    expect(service.currentLang()).toBe('es');
  });

  it('should return the key path if key is not found', () => {
    expect(service.translate('non.existent.key')).toBe('non.existent.key');
  });
});
