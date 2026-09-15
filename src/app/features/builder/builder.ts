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
import { isValidPresetId, TARGET_FORMAT_OPTIONS } from '../../core/constants/presets.constant';
import { TargetFormat } from '../../core/models/agent.model';
import { AgentConfigService } from '../../core/services/agent-config.service';
import { TranslatePipe } from '../../core/i18n/translate.pipe';
import { AgentIdentityForm } from './components/agent-identity-form/agent-identity-form';
import { PersonaToneForm } from './components/persona-tone-form/persona-tone-form';
import { DirectivesForm } from './components/directives-form/directives-form';
import { DirectivesModal } from './components/directives-modal/directives-modal';
import { TechStackForm } from './components/tech-stack-form/tech-stack-form';
import { WorkflowForm } from './components/workflow-form/workflow-form';
import { CustomInstructionsForm } from './components/custom-instructions-form/custom-instructions-form';
import { ConfirmModal } from './components/confirm-modal/confirm-modal';
import { BuilderStepper } from './components/builder-stepper/builder-stepper';
import { BuilderPreview } from './components/builder-preview/builder-preview';

@Component({
  selector: 'app-builder',
  imports: [
    TranslatePipe,
    BuilderStepper,
    BuilderPreview,
    AgentIdentityForm,
    PersonaToneForm,
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
  readonly activeMobileTab = signal<'editor' | 'preview'>('editor');
  readonly currentStep = signal<number>(1);
  private lastLoadedPreset?: string;

  goToStep(step: number): void {
    if (step >= 1 && step <= 5) {
      this.currentStep.set(step);
    }
  }

  nextStep(): void {
    if (this.currentStep() < 5) {
      this.currentStep.update((s) => s + 1);
    }
  }

  prevStep(): void {
    if (this.currentStep() > 1) {
      this.currentStep.update((s) => s - 1);
    }
  }

  reviewOutput(): void {
    this.setMobileTab('preview');
  }

  constructor() {
    effect(() => {
      const id = this.presetId();
      if (id && id !== this.lastLoadedPreset && isValidPresetId(id)) {
        this.lastLoadedPreset = id;
        untracked(() => {
          this.agentConfig.loadPreset(id);
        });
      }
    });
  }

  changeFormat(format: TargetFormat): void {
    this.agentConfig.setTargetFormat(format);
  }

  setMobileTab(tab: 'editor' | 'preview'): void {
    this.activeMobileTab.set(tab);
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

  goBack(): void {
    void this.router.navigate(['/']);
  }
}
