import { computed, Injectable, signal } from '@angular/core';
import { Language, TranslationSchema } from './i18n.model';
import { enTranslations } from './translations/en';
import { esTranslations } from './translations/es';

@Injectable({
  providedIn: 'root',
})
export class I18nService {
  private static readonly STORAGE_KEY = 'agentcraft_lang';

  private readonly dictionaries: Record<Language, TranslationSchema> = {
    es: esTranslations,
    en: enTranslations,
  };

  readonly currentLang = signal<Language>(this.detectInitialLanguage());

  readonly t = computed(() => this.dictionaries[this.currentLang()]);

  setLanguage(lang: Language): void {
    if (this.currentLang() === lang) return;
    this.currentLang.set(lang);
    try {
      localStorage.setItem(I18nService.STORAGE_KEY, lang);
    } catch {
      // Ignore storage access exceptions in restricted environments
    }
  }

  toggleLanguage(): void {
    this.setLanguage(this.currentLang() === 'es' ? 'en' : 'es');
  }

  translate(path: string): string {
    const keys = path.split('.');
    let current: unknown = this.dictionaries[this.currentLang()];

    for (const key of keys) {
      if (typeof current === 'object' && current !== null && key in current) {
        current = (current as Record<string, unknown>)[key];
      } else {
        return path;
      }
    }

    return typeof current === 'string' ? current : path;
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
