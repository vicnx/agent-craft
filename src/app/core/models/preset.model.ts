export type LanguagePresetId =
  | 'nextjs'
  | 'react'
  | 'angular'
  | 'vue'
  | 'svelte'
  | 'react-native'
  | 'nestjs'
  | 'fastapi'
  | 'springboot'
  | 'aspnet'
  | 'go-microservices'
  | 'custom';

export type PresetCategory = 'frontend' | 'backend' | 'mobile';

export interface PresetOption {
  readonly id: LanguagePresetId;
  readonly category: PresetCategory;
  readonly nameKey: string;
  readonly targetFile: string;
  readonly badgeKey: string;
  readonly descKey: string;
  readonly tags: readonly string[];
}
