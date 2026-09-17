import { Injectable, signal } from '@angular/core';
import { STORAGE_KEYS } from '../constants/app.constant';
import en from './translations/en.json';
import es from './translations/es.json';

export type Language = 'es' | 'en';

type Dictionary = Record<string, Record<string, string>>;

@Injectable({
  providedIn: 'root',
})
export class I18nService {
  private static readonly STORAGE_KEY = STORAGE_KEYS.LANG;

  private readonly dictionaries: Record<Language, Dictionary> = {
    es: es as Dictionary,
    en: en as Dictionary,
  };

  readonly currentLang = signal<Language>(this.detectInitialLanguage());

  setLanguage(lang: Language): void {
    if (this.currentLang() === lang) return;
    this.currentLang.set(lang);
    try {
      localStorage.setItem(I18nService.STORAGE_KEY, lang);
    } catch {
      // Ignorar restricciones de almacenamiento
    }
  }

  toggleLanguage(): void {
    this.setLanguage(this.currentLang() === 'es' ? 'en' : 'es');
  }

  translate(keyPath: string): string {
    const [section, key] = keyPath.split('.');
    const dict = this.dictionaries[this.currentLang()];
    return dict?.[section]?.[key] ?? keyPath;
  }

  private detectInitialLanguage(): Language {
    try {
      const stored = localStorage.getItem(I18nService.STORAGE_KEY);
      if (stored === 'es' || stored === 'en') {
        return stored;
      }
      if (typeof navigator !== 'undefined' && navigator.language) {
        return navigator.language.toLowerCase().startsWith('es') ? 'es' : 'en';
      }
    } catch {
      // Fallback
    }
    return 'es';
  }
}
