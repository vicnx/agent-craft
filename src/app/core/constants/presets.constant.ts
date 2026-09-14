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

export const PRESET_CONFIGS: Record<LanguagePresetId, AgentConfig> =
  presetsEs.presets as Record<LanguagePresetId, AgentConfig>;
