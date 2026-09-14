export interface PresetOption {
  readonly id: string;
  readonly nameKey: string;
  readonly targetFile: string;
  readonly badgeKey: string;
  readonly descKey: string;
  readonly tags: readonly string[];
}
