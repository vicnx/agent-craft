import presetsEs from '../data/presets.es.json';
import presetsEn from '../data/presets.en.json';
import { AgentConfig, TargetFormatOption } from '../models/agent.model';
import { LanguagePresetId } from '../models/preset.model';

export const TARGET_FORMAT_OPTIONS: readonly TargetFormatOption[] =
  presetsEs.options as readonly TargetFormatOption[];

export const DEFAULT_AGENT_CONFIG: AgentConfig =
  presetsEs.defaultConfig as AgentConfig;

export const PRESET_CONFIGS_BY_LANG: Record<'es' | 'en', Record<LanguagePresetId, AgentConfig>> = {
  es: presetsEs.presets as Record<LanguagePresetId, AgentConfig>,
  en: presetsEn.presets as Record<LanguagePresetId, AgentConfig>,
};

export const VALID_LANGUAGE_PRESET_IDS: readonly LanguagePresetId[] = [
  'typescript',
  'python',
  'go',
  'rust',
  'java',
  'custom',
] as const;

export function isValidPresetId(id: string): id is LanguagePresetId {
  return (VALID_LANGUAGE_PRESET_IDS as readonly string[]).includes(id);
}
