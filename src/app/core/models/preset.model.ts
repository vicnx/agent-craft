export interface PresetOption {
  readonly id: string;
  readonly name: string;
  readonly targetFile: string;
  readonly badge: string;
  readonly description: string;
  readonly tags: readonly string[];
}
