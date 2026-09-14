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
import { LanguagePresetId } from '../../core/models/preset.model';
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
  readonly isResetModalOpen = signal(false);
  readonly isCopied = signal(false);
  private lastLoadedPreset?: string;

  constructor() {
    effect(() => {
      const id = this.presetId();
      if (
        id &&
        id !== this.lastLoadedPreset &&
        (id === 'typescript' || id === 'python' || id === 'go' || id === 'rust' || id === 'java' || id === 'custom')
      ) {
        this.lastLoadedPreset = id;
        untracked(() => {
          this.agentConfig.loadPreset(id as LanguagePresetId);
        });
      }
    });
  }

  changeFormat(format: TargetFormat): void {
    this.agentConfig.setTargetFormat(format);
  }

  openResetModal(): void {
    this.isResetModalOpen.set(true);
  }

  confirmReset(): void {
    this.agentConfig.reset();
    this.isResetModalOpen.set(false);
  }

  cancelReset(): void {
    this.isResetModalOpen.set(false);
  }

  async copyToClipboard(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.agentConfig.compiledMarkdown());
      this.isCopied.set(true);
      setTimeout(() => this.isCopied.set(false), 2000);
    } catch {
      // Manejar error silenciosamente
    }
  }

  downloadFile(): void {
    const markdown = this.agentConfig.compiledMarkdown();
    const filename = this.agentConfig.activeOption().filename;
    const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  }

  goBack(): void {
    void this.router.navigate(['/']);
  }
}
