import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslatePipe } from '../../../../core/i18n/translate.pipe';
import { AgentConfigService } from '../../../../core/services/agent-config.service';

@Component({
  selector: 'app-custom-instructions-form',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './custom-instructions-form.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomInstructionsForm {
  readonly agentConfig = inject(AgentConfigService);

  onInput(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    this.agentConfig.setCustomInstructions(textarea.value);
  }

  clear(): void {
    this.agentConfig.setCustomInstructions('');
  }
}
