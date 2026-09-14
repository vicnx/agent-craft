import { Injectable, computed, effect, signal } from '@angular/core';

export type Theme = 'dark' | 'light';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private static readonly STORAGE_KEY = 'agentcraft_theme';

  readonly currentTheme = signal<Theme>(this.detectInitialTheme());
  readonly isDark = computed(() => this.currentTheme() === 'dark');

  constructor() {
    effect(() => {
      const theme = this.currentTheme();
      this.applyThemeToDom(theme);
    });
  }

  setTheme(theme: Theme): void {
    if (this.currentTheme() === theme) return;
    this.currentTheme.set(theme);
    try {
      localStorage.setItem(ThemeService.STORAGE_KEY, theme);
    } catch {
      // Ignorar errores en entornos con almacenamiento restringido
    }
  }

  toggleTheme(): void {
    this.setTheme(this.isDark() ? 'light' : 'dark');
  }

  private detectInitialTheme(): Theme {
    try {
      const stored = localStorage.getItem(ThemeService.STORAGE_KEY);
      if (stored === 'dark' || stored === 'light') {
        return stored;
      }
      if (typeof window !== 'undefined' && window.matchMedia) {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        return prefersDark ? 'dark' : 'light';
      }
    } catch {
      // Fallback si matchMedia o localStorage no están disponibles
    }
    return 'dark';
  }

  private applyThemeToDom(theme: Theme): void {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
  }
}
