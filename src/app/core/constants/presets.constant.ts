import presetsData from '../data/presets.json';
import { AgentConfig, TargetFormat, TargetFormatOption } from '../models/agent.model';

export const TARGET_FORMAT_OPTIONS: readonly TargetFormatOption[] =
  presetsData.options as readonly TargetFormatOption[];

export const DEFAULT_AGENT_CONFIG: AgentConfig =
  presetsData.defaultConfig as AgentConfig;

export const PRESET_CONFIGS: Record<TargetFormat, AgentConfig> =
  presetsData.presets as Record<TargetFormat, AgentConfig>;
