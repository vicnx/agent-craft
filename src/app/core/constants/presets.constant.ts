import presetsEs from '../data/presets.es.json';
import presetsEn from '../data/presets.en.json';
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
  return (VALID_LANGUAGE_PRESET_IDS as readonly string[]).includes(id);
}

export interface WelcomeCategory {
  readonly id: 'all' | PresetCategory;
  readonly labelKey: string;
  readonly count: number;
  readonly icon?: string;
}

export const WELCOME_CATEGORIES: readonly WelcomeCategory[] = [
  { id: 'all', labelKey: 'welcome.filterAll', count: 11 },
  { id: 'frontend', labelKey: 'welcome.filterFrontend', count: 5, icon: 'fa-solid fa-code' },
  { id: 'backend', labelKey: 'welcome.filterBackend', count: 5, icon: 'fa-solid fa-server' },
  { id: 'mobile', labelKey: 'welcome.filterMobile', count: 1, icon: 'fa-solid fa-mobile-screen' },
] as const;

export const WELCOME_PRESET_OPTIONS: readonly PresetOption[] = [
  {
    id: 'nextjs',
    category: 'frontend',
    nameKey: 'presets.nextjsName',
    targetFile: 'Next.js 15',
    badgeKey: 'common.popular',
    descKey: 'presets.nextjsDesc',
    tags: ['Next.js 15', 'React 19', 'Server Actions', 'Tailwind'],
  },
  {
    id: 'react',
    category: 'frontend',
    nameKey: 'presets.reactName',
    targetFile: 'React 19',
    badgeKey: 'common.popular',
    descKey: 'presets.reactDesc',
    tags: ['React 19', 'Vite', 'Tailwind', 'Zustand'],
  },
  {
    id: 'angular',
    category: 'frontend',
    nameKey: 'presets.angularName',
    targetFile: 'Angular (v19+)',
    badgeKey: 'common.popular',
    descKey: 'presets.angularDesc',
    tags: ['Angular', 'Signals', 'Standalone', 'Tailwind'],
  },
  {
    id: 'vue',
    category: 'frontend',
    nameKey: 'presets.vueName',
    targetFile: 'Vue 3 / Nuxt',
    badgeKey: 'common.popular',
    descKey: 'presets.vueDesc',
    tags: ['Vue 3', 'Nuxt 3', 'Pinia', 'VueUse'],
  },
  {
    id: 'svelte',
    category: 'frontend',
    nameKey: 'presets.svelteName',
    targetFile: 'Svelte 5',
    badgeKey: 'common.popular',
    descKey: 'presets.svelteDesc',
    tags: ['Svelte 5', 'Runes', 'SvelteKit 2', 'Vite'],
  },
  {
    id: 'react-native',
    category: 'mobile',
    nameKey: 'presets.reactNativeName',
    targetFile: 'React Native',
    badgeKey: 'common.popular',
    descKey: 'presets.reactNativeDesc',
    tags: ['React Native', 'Expo', 'Expo Router', 'NativeWind'],
  },
  {
    id: 'nestjs',
    category: 'backend',
    nameKey: 'presets.nestjsName',
    targetFile: 'NestJS',
    badgeKey: 'common.popular',
    descKey: 'presets.nestjsDesc',
    tags: ['Node.js', 'TypeScript', 'Prisma', 'OpenAPI'],
  },
  {
    id: 'fastapi',
    category: 'backend',
    nameKey: 'presets.fastapiName',
    targetFile: 'FastAPI',
    badgeKey: 'common.popular',
    descKey: 'presets.fastapiDesc',
    tags: ['Python 3.12+', 'Async', 'Pydantic v2', 'Ruff'],
  },
  {
    id: 'springboot',
    category: 'backend',
    nameKey: 'presets.springbootName',
    targetFile: 'Spring Boot 3',
    badgeKey: 'common.standard',
    descKey: 'presets.springbootDesc',
    tags: ['Java 21+', 'Virtual Threads', 'Records', 'JPA'],
  },
  {
    id: 'aspnet',
    category: 'backend',
    nameKey: 'presets.aspnetName',
    targetFile: 'ASP.NET Core',
    badgeKey: 'common.standard',
    descKey: 'presets.aspnetDesc',
    tags: ['.NET 9', 'C# 13', 'Clean Arch', 'EF Core'],
  },
  {
    id: 'go-microservices',
    category: 'backend',
    nameKey: 'presets.goMicroservicesName',
    targetFile: 'Go',
    badgeKey: 'common.autonomous',
    descKey: 'presets.goMicroservicesDesc',
    tags: ['Microservices', 'sqlc', 'pgx', 'slog'],
  },
] as const;
