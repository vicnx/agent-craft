import presetsConfig from '../data/presets-config.json';
import presetsEn from '../data/presets.en.json';
import presetsEs from '../data/presets.es.json';
import { AgentConfig, TargetFormatOption } from '../models/agent.model';
import { LanguagePresetId, PresetCategory, PresetOption } from '../models/preset.model';

export const TARGET_FORMAT_OPTIONS: readonly TargetFormatOption[] =
  presetsEs.options as readonly TargetFormatOption[];

export const DEFAULT_AGENT_CONFIG: AgentConfig =
  presetsEs.defaultConfig as AgentConfig;

export const PRESET_CONFIGS_BY_LANG: Record<'es' | 'en', Record<LanguagePresetId, AgentConfig>> = {
  es: presetsEs.presets as Record<LanguagePresetId, AgentConfig>,
  en: presetsEn.presets as Record<LanguagePresetId, AgentConfig>,
};

export const ALL_PRESETS_CATALOG: readonly PresetOption[] = presetsConfig as readonly PresetOption[];

export const WELCOME_PRESET_OPTIONS: readonly PresetOption[] = ALL_PRESETS_CATALOG.filter(
  (preset) => preset.enabled !== false
);

export const ENABLED_LANGUAGE_PRESET_IDS: readonly LanguagePresetId[] = [
  ...WELCOME_PRESET_OPTIONS.map((p) => p.id),
  'custom',
];

export const VALID_LANGUAGE_PRESET_IDS: readonly LanguagePresetId[] = [
  'nextjs',
  'react',
  'angular',
  'vue',
  'svelte',
  'react-native',
  'nestjs',
  'fastapi',
  'springboot',
  'aspnet',
  'go-microservices',
  'custom',
] as const;

export function isValidPresetId(id: string): id is LanguagePresetId {
  return (ENABLED_LANGUAGE_PRESET_IDS as readonly string[]).includes(id);
}

export interface WelcomeCategory {
  readonly id: 'all' | PresetCategory;
  readonly labelKey: string;
  readonly count: number;
  readonly icon?: string;
}

export function getWelcomeCategories(
  presets: readonly PresetOption[] = WELCOME_PRESET_OPTIONS
): readonly WelcomeCategory[] {
  return [
    {
      id: 'all',
      labelKey: 'welcome.filterAll',
      count: presets.length,
    },
    {
      id: 'frontend',
      labelKey: 'welcome.filterFrontend',
      count: presets.filter((p) => p.category === 'frontend').length,
      icon: 'fa-solid fa-code',
    },
    {
      id: 'backend',
      labelKey: 'welcome.filterBackend',
      count: presets.filter((p) => p.category === 'backend').length,
      icon: 'fa-solid fa-server',
    },
    {
      id: 'mobile',
      labelKey: 'welcome.filterMobile',
      count: presets.filter((p) => p.category === 'mobile').length,
      icon: 'fa-solid fa-mobile-screen',
    },
  ];
}

export const WELCOME_CATEGORIES: readonly WelcomeCategory[] = getWelcomeCategories();
