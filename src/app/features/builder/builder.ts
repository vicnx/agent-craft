import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
} from '@angular/core';
import { Router } from '@angular/router';
import { TARGET_FORMAT_OPTIONS } from '../../core/constants/presets.constant';
import { TargetFormat } from '../../core/models/agent.model';
import { AgentConfigService } from '../../core/services/agent-config.service';
import { TranslatePipe } from '../../core/i18n/translate.pipe';

@Component({
  selector: 'app-builder',
  imports: [TranslatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './builder.html',
})
export class Builder {
  private readonly router = inject(Router);
  readonly agentConfig = inject(AgentConfigService);

  readonly presetId = input<string>();
  readonly formatOptions = TARGET_FORMAT_OPTIONS;

  constructor() {
    effect(() => {
      const id = this.presetId();
      if (id === 'cursor' || id === 'copilot' || id === 'agents' || id === 'custom') {
        this.agentConfig.loadPreset(id);
      }
    });
  }

  changeFormat(format: TargetFormat): void {
    this.agentConfig.loadPreset(format);
  }

  goBack(): void {
    void this.router.navigate(['/']);
  }
}
