import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslatePipe } from '../../../../core/i18n/translate.pipe';
import { AgentConfigService } from '../../../../core/services/agent-config.service';

export const GIT_CONVENTION_PRESETS = [
  'Conventional Commits (feat, fix, refactor, docs, chore)',
  'Gitmoji (✨ feat, 🐛 fix, ♻️ refactor, 📝 docs)',
  'Git Flow (feature, develop, release, hotfix)',
  'Trunk-Based Development',
] as const;

@Component({
  selector: 'app-workflow-form',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './workflow-form.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkflowForm {
  readonly agentConfig = inject(AgentConfigService);
  readonly presets = GIT_CONVENTION_PRESETS;

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.agentConfig.setGitConvention(input.value);
  }

  selectPreset(preset: string): void {
    this.agentConfig.setGitConvention(preset);
  }

  isSelected(preset: string): boolean {
    return this.agentConfig.config().gitConvention.trim() === preset.trim();
  }
}
