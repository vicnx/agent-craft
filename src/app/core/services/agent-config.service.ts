import { computed, effect, inject, Injectable, signal, untracked } from '@angular/core';
import {
  DEFAULT_AGENT_CONFIG,
  PRESET_CONFIGS,
  TARGET_FORMAT_OPTIONS,
} from '../constants/presets.constant';
import { I18nService, Language } from '../i18n/i18n.service';
import { AgentConfig, TargetFormat, TargetFormatOption } from '../models/agent.model';
import { translateCatalogItems } from '../utils/suggestions-translator.util';

@Injectable({
  providedIn: 'root',
})
export class AgentConfigService {
  private readonly i18n = inject(I18nService);

  readonly config = signal<AgentConfig>(this.buildInitialConfig(this.i18n.currentLang()));

  readonly targetFormat = computed<TargetFormat>(() => this.config().targetFormat);

  readonly activeOption = computed<TargetFormatOption>(
    () => TARGET_FORMAT_OPTIONS.find((opt) => opt.id === this.targetFormat()) ?? TARGET_FORMAT_OPTIONS[0],
  );

  constructor() {
    effect(() => {
      const lang = this.i18n.currentLang();
      untracked(() => this.setOutputLanguage(lang));
    });
  }

  loadPreset(format: TargetFormat): void {
    const preset = PRESET_CONFIGS[format] ?? DEFAULT_AGENT_CONFIG;
    const isEn = this.config().outputLanguage === 'en';
    const { translatedRules, translatedRole } = isEn
      ? translateCatalogItems(preset.architecturalRules, preset.role, 'es', 'en')
      : { translatedRules: preset.architecturalRules, translatedRole: preset.role };
    this.config.set({ ...preset, outputLanguage: isEn ? 'en' : 'es', role: translatedRole, architecturalRules: [...translatedRules] });
  }

  setTargetFormat(targetFormat: TargetFormat): void {
    this.config.update((current) => ({ ...current, targetFormat }));
  }

  setOutputLanguage(newLang: 'es' | 'en'): void {
    const prevLang = this.config().outputLanguage;
    if (prevLang === newLang) return;

    this.config.update((current) => {
      const { translatedRules, translatedRole } = translateCatalogItems(
        current.architecturalRules,
        current.role,
        prevLang,
        newLang,
      );

      return {
        ...current,
        outputLanguage: newLang,
        role: translatedRole,
        architecturalRules: [...translatedRules],
      };
    });
  }

  updateConfig(partial: Partial<AgentConfig>): void {
    this.config.update((current) => ({ ...current, ...partial }));
  }

  addTechStackItem(item: string): void {
    const trimmed = item.trim();
    if (!trimmed) return;
    this.config.update((c) =>
      c.techStack.includes(trimmed) ? c : { ...c, techStack: [...c.techStack, trimmed] },
    );
  }

  removeTechStackItem(itemToRemove: string): void {
    this.config.update((c) => ({ ...c, techStack: c.techStack.filter((item) => item !== itemToRemove) }));
  }

  addArchitecturalRule(rule: string): void {
    const trimmed = rule.trim();
    if (!trimmed) return;
    this.config.update((c) =>
      c.architecturalRules.includes(trimmed)
        ? c
        : { ...c, architecturalRules: [...c.architecturalRules, trimmed] },
    );
  }

  removeArchitecturalRule(index: number): void {
    this.config.update((c) => ({ ...c, architecturalRules: c.architecturalRules.filter((_, i) => i !== index) }));
  }

  toggleArchitecturalRule(rule: string): void {
    const trimmed = rule.trim();
    if (!trimmed) return;
    this.config.update((c) => ({
      ...c,
      architecturalRules: c.architecturalRules.includes(trimmed)
        ? c.architecturalRules.filter((r) => r !== trimmed)
        : [...c.architecturalRules, trimmed],
    }));
  }

  hasArchitecturalRule(rule: string): boolean {
    return this.config().architecturalRules.includes(rule.trim());
  }

  clearArchitecturalRules(): void {
    this.config.update((c) => ({ ...c, architecturalRules: [] }));
  }

  addQualityStandard(standard: string): void {
    const trimmed = standard.trim();
    if (!trimmed) return;
    this.config.update((c) => ({ ...c, qualityStandards: [...c.qualityStandards, trimmed] }));
  }

  removeQualityStandard(index: number): void {
    this.config.update((c) => ({ ...c, qualityStandards: c.qualityStandards.filter((_, i) => i !== index) }));
  }

  setGitConvention(gitConvention: string): void {
    this.config.update((c) => ({ ...c, gitConvention }));
  }

  reset(): void {
    this.config.set(this.buildInitialConfig(this.i18n.currentLang()));
  }

  private buildInitialConfig(lang: Language): AgentConfig {
    if (lang !== 'en') return { ...DEFAULT_AGENT_CONFIG, outputLanguage: 'es' };
    const { translatedRules, translatedRole } = translateCatalogItems(
      DEFAULT_AGENT_CONFIG.architecturalRules,
      DEFAULT_AGENT_CONFIG.role,
      'es',
      'en',
    );
    return { ...DEFAULT_AGENT_CONFIG, outputLanguage: 'en', role: translatedRole, architecturalRules: [...translatedRules] };
  }
}
