import { computed, Injectable, signal } from '@angular/core';
import {
  DEFAULT_AGENT_CONFIG,
  PRESET_CONFIGS,
  TARGET_FORMAT_OPTIONS,
} from '../constants/presets.constant';
import { AgentConfig, TargetFormat, TargetFormatOption } from '../models/agent.model';
import { translateCatalogItems } from '../utils/suggestions-translator.util';

@Injectable({
  providedIn: 'root',
})
export class AgentConfigService {
  readonly config = signal<AgentConfig>(DEFAULT_AGENT_CONFIG);

  readonly targetFormat = computed<TargetFormat>(() => this.config().targetFormat);

  readonly activeOption = computed<TargetFormatOption>(
    () =>
      TARGET_FORMAT_OPTIONS.find((opt) => opt.id === this.targetFormat()) ??
      TARGET_FORMAT_OPTIONS[0],
  );

  loadPreset(format: TargetFormat): void {
    const preset = PRESET_CONFIGS[format] ?? DEFAULT_AGENT_CONFIG;
    this.config.set({ ...preset });
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
    this.config.update((current) => {
      if (current.techStack.includes(trimmed)) return current;
      return { ...current, techStack: [...current.techStack, trimmed] };
    });
  }

  removeTechStackItem(itemToRemove: string): void {
    this.config.update((current) => ({
      ...current,
      techStack: current.techStack.filter((item) => item !== itemToRemove),
    }));
  }

  addArchitecturalRule(rule: string): void {
    const trimmed = rule.trim();
    if (!trimmed) return;
    this.config.update((current) => {
      if (current.architecturalRules.includes(trimmed)) return current;
      return { ...current, architecturalRules: [...current.architecturalRules, trimmed] };
    });
  }

  removeArchitecturalRule(index: number): void {
    this.config.update((current) => ({
      ...current,
      architecturalRules: current.architecturalRules.filter((_, i) => i !== index),
    }));
  }

  toggleArchitecturalRule(rule: string): void {
    const trimmed = rule.trim();
    if (!trimmed) return;
    this.config.update((current) => {
      const exists = current.architecturalRules.includes(trimmed);
      return {
        ...current,
        architecturalRules: exists
          ? current.architecturalRules.filter((r) => r !== trimmed)
          : [...current.architecturalRules, trimmed],
      };
    });
  }

  hasArchitecturalRule(rule: string): boolean {
    return this.config().architecturalRules.includes(rule.trim());
  }

  clearArchitecturalRules(): void {
    this.config.update((current) => ({
      ...current,
      architecturalRules: [],
    }));
  }

  addQualityStandard(standard: string): void {
    const trimmed = standard.trim();
    if (!trimmed) return;
    this.config.update((current) => ({
      ...current,
      qualityStandards: [...current.qualityStandards, trimmed],
    }));
  }

  removeQualityStandard(index: number): void {
    this.config.update((current) => ({
      ...current,
      qualityStandards: current.qualityStandards.filter((_, i) => i !== index),
    }));
  }

  reset(): void {
    this.config.set({ ...DEFAULT_AGENT_CONFIG });
  }
}
