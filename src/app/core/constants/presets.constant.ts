import presetsData from '../data/presets.json';
import { AgentConfig, TargetFormatOption } from '../models/agent.model';
import { LanguagePresetId } from '../models/preset.model';

export const TARGET_FORMAT_OPTIONS: readonly TargetFormatOption[] =
  presetsData.options as readonly TargetFormatOption[];

export const DEFAULT_AGENT_CONFIG: AgentConfig =
  presetsData.defaultConfig as AgentConfig;

export const PRESET_CONFIGS: Record<LanguagePresetId, AgentConfig> =
  presetsData.presets as Record<LanguagePresetId, AgentConfig>;
