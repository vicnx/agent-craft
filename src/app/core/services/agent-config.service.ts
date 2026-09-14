import { computed, effect, inject, Injectable, signal, untracked } from '@angular/core';
import {
  DEFAULT_AGENT_CONFIG,
  PRESET_CONFIGS_BY_LANG,
  TARGET_FORMAT_OPTIONS,
} from '../constants/presets.constant';
import { I18nService, Language } from '../i18n/i18n.service';
import { AgentConfig, TargetFormat, TargetFormatOption } from '../models/agent.model';
import { LanguagePresetId } from '../models/preset.model';
import { translateCatalogItems } from '../utils/suggestions-translator.util';
import { compileAgentMarkdown } from '../utils/markdown-compiler.util';

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
  readonly compiledMarkdown = computed<string>(() => compileAgentMarkdown(this.config()));

  constructor() {
    effect(() => {
      const lang = this.i18n.currentLang();
      untracked(() => this.setOutputLanguage(lang));
    });
  }

  loadPreset(presetId: LanguagePresetId): void {
    const isEn = untracked(() => this.config().outputLanguage === 'en');
    const lang = isEn ? 'en' : 'es';
    const preset = PRESET_CONFIGS_BY_LANG[lang][presetId] ?? DEFAULT_AGENT_CONFIG;
    const targetFormat = untracked(() => this.config().targetFormat);
    this.config.set({ ...preset, targetFormat, outputLanguage: lang });
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
      return { ...current, outputLanguage: newLang, role: translatedRole, architecturalRules: [...translatedRules] };
    });
  }

  updateConfig(partial: Partial<AgentConfig>): void {
    this.config.update((current) => ({ ...current, ...partial }));
  }

  addTechStackItem(item: string): void {
    const trimmed = item.trim();
    if (trimmed) this.config.update((c) => c.techStack.includes(trimmed) ? c : { ...c, techStack: [...c.techStack, trimmed] });
  }

  removeTechStackItem(itemToRemove: string): void {
    this.config.update((c) => ({ ...c, techStack: c.techStack.filter((item) => item !== itemToRemove) }));
  }

  addArchitecturalRule(rule: string): void {
    const trimmed = rule.trim();
    if (trimmed) this.config.update((c) => c.architecturalRules.includes(trimmed) ? c : { ...c, architecturalRules: [...c.architecturalRules, trimmed] });
  }

  removeArchitecturalRule(index: number): void {
    this.config.update((c) => ({ ...c, architecturalRules: c.architecturalRules.filter((_, i) => i !== index) }));
  }

  toggleArchitecturalRule(rule: string): void {
    const trimmed = rule.trim();
    if (trimmed) this.config.update((c) => ({
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

  addUiDesignRule(rule: string): void {
    const trimmed = rule.trim();
    if (trimmed) this.config.update((c) => c.uiDesignRules.includes(trimmed) ? c : { ...c, uiDesignRules: [...c.uiDesignRules, trimmed] });
  }

  removeUiDesignRule(index: number): void {
    this.config.update((c) => ({ ...c, uiDesignRules: c.uiDesignRules.filter((_, i) => i !== index) }));
  }

  setBuildCommand(key: 'build' | 'test' | 'dev', value: string): void {
    this.config.update((c) => ({ ...c, buildCommands: { ...c.buildCommands, [key]: value } }));
  }

  setGitConvention(gitConvention: string): void {
    this.config.update((c) => ({ ...c, gitConvention }));
  }

  setProposeCommit(proposeCommit: boolean): void {
    this.config.update((c) => ({ ...c, proposeCommit }));
  }

  setCustomInstructions(customInstructions: string): void {
    this.config.update((c) => ({ ...c, customInstructions }));
  }

  appendCustomInstruction(instruction: string): void {
    const trimmed = instruction.trim();
    if (!trimmed) return;
    this.config.update((c) => c.customInstructions.includes(trimmed) ? c : ({
      ...c,
      customInstructions: `${c.customInstructions.trim() ? `${c.customInstructions.trim()}\n` : ''}- ${trimmed}`,
    }));
  }

  reset(): void {
    this.config.set(this.buildInitialConfig(untracked(() => this.i18n.currentLang())));
  }

  private buildInitialConfig(lang: Language): AgentConfig {
    const configLang = lang === 'en' ? 'en' : 'es';
    const base = PRESET_CONFIGS_BY_LANG[configLang].custom ?? DEFAULT_AGENT_CONFIG;
    return { ...base, outputLanguage: configLang };
  }
}
