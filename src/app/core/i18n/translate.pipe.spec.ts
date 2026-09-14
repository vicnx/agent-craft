import { TestBed } from '@angular/core/testing';
import { I18nService } from './i18n.service';
import { TranslatePipe } from './translate.pipe';

describe('TranslatePipe', () => {
  let pipe: TranslatePipe;
  let service: I18nService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [TranslatePipe, I18nService],
    });
    pipe = TestBed.inject(TranslatePipe);
    service = TestBed.inject(I18nService);
  });

  it('should create the pipe', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform key using I18nService', () => {
    service.setLanguage('es');
    expect(pipe.transform('common.back')).toBe('Volver');
    service.setLanguage('en');
    expect(pipe.transform('common.back')).toBe('Back');
  });
});
