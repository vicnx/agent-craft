import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AgentConfigService } from '../../../../core/services/agent-config.service';
import { TranslatePipe } from '../../../../core/i18n/translate.pipe';

@Component({
  selector: 'app-agent-identity-form',
  imports: [TranslatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './agent-identity-form.html',
})
export class AgentIdentityForm {
  readonly agentConfig = inject(AgentConfigService);

  onProjectNameChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.agentConfig.updateConfig({ projectName: target.value });
  }

  onRoleChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.agentConfig.updateConfig({ role: target.value });
  }

  onDescriptionChange(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    this.agentConfig.updateConfig({ description: target.value });
  }

  setOutputLanguage(outputLanguage: 'es' | 'en'): void {
    this.agentConfig.updateConfig({ outputLanguage });
  }
}
