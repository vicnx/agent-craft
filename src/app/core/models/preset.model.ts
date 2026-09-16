export type LanguagePresetId =
  | 'angular'
  | 'react'
  | 'react-native'
  | 'nestjs'
  | 'fastapi'
  | 'springboot'
  | 'aspnet'
  | 'go-microservices'
  | 'custom';

export interface PresetOption {
  readonly id: LanguagePresetId;
  readonly nameKey: string;
  readonly targetFile: string;
  readonly badgeKey: string;
  readonly descKey: string;
  readonly tags: readonly string[];
}
