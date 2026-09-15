export type LanguagePresetId =
  | 'angular'
  | 'react'
  | 'python'
  | 'go'
  | 'rust'
  | 'java'
  | 'custom';

export interface PresetOption {
  readonly id: LanguagePresetId;
  readonly nameKey: string;
  readonly targetFile: string;
  readonly badgeKey: string;
  readonly descKey: string;
  readonly tags: readonly string[];
}
