import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
  signal,
  untracked,
} from '@angular/core';
import { Router } from '@angular/router';
import { TARGET_FORMAT_OPTIONS } from '../../core/constants/presets.constant';
import { TargetFormat } from '../../core/models/agent.model';
import { AgentConfigService } from '../../core/services/agent-config.service';
import { TranslatePipe } from '../../core/i18n/translate.pipe';
import { AgentIdentityForm } from './components/agent-identity-form/agent-identity-form';
import { DirectivesForm } from './components/directives-form/directives-form';
import { DirectivesModal } from './components/directives-modal/directives-modal';
import { TechStackForm } from './components/tech-stack-form/tech-stack-form';
import { WorkflowForm } from './components/workflow-form/workflow-form';
import { CustomInstructionsForm } from './components/custom-instructions-form/custom-instructions-form';
import { ConfirmModal } from './components/confirm-modal/confirm-modal';

@Component({
  selector: 'app-builder',
  imports: [
    TranslatePipe,
    AgentIdentityForm,
    TechStackForm,
    DirectivesForm,
    WorkflowForm,
    CustomInstructionsForm,
    DirectivesModal,
    ConfirmModal,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './builder.html',
})
export class Builder {
  private readonly router = inject(Router);
  readonly agentConfig = inject(AgentConfigService);

  readonly presetId = input<string>();
  readonly formatOptions = TARGET_FORMAT_OPTIONS;
  readonly isCatalogOpen = signal(false);
  readonly pendingFormat = signal<TargetFormat | null>(null);
  readonly isChangeFormatModalOpen = signal(false);
  private lastLoadedPreset?: string;

  constructor() {
    effect(() => {
      const id = this.presetId();
      if (
        id &&
        id !== this.lastLoadedPreset &&
        (id === 'cursor' || id === 'copilot' || id === 'agents' || id === 'custom')
      ) {
        this.lastLoadedPreset = id;
        untracked(() => {
          this.agentConfig.loadPreset(id);
        });
      }
    });
  }

  changeFormat(format: TargetFormat): void {
    if (format === this.agentConfig.targetFormat()) return;
    this.pendingFormat.set(format);
    this.isChangeFormatModalOpen.set(true);
  }

  confirmChangeFormat(): void {
    const target = this.pendingFormat();
    if (target) {
      this.lastLoadedPreset = target;
      this.agentConfig.loadPreset(target);
      void this.router.navigate(['/builder', target], { replaceUrl: true });
    }
    this.closeChangeFormatModal();
  }

  closeChangeFormatModal(): void {
    this.isChangeFormatModalOpen.set(false);
    this.pendingFormat.set(null);
  }

  goBack(): void {
    void this.router.navigate(['/']);
  }
}
