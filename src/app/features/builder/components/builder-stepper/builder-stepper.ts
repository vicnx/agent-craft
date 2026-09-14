import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
} from '@angular/core';
import { AgentConfigService } from '../../../../core/services/agent-config.service';
import { TranslatePipe } from '../../../../core/i18n/translate.pipe';

export interface StepItem {
  readonly id: number;
  readonly icon: string;
  readonly labelKey: string;
}

export const BUILDER_STEPS: readonly StepItem[] = [
  { id: 1, icon: 'fa-solid fa-id-card', labelKey: 'builder.stepIdentity' },
  { id: 2, icon: 'fa-solid fa-layer-group', labelKey: 'builder.stepStack' },
  { id: 3, icon: 'fa-solid fa-cubes', labelKey: 'builder.stepArchitecture' },
  { id: 4, icon: 'fa-solid fa-palette', labelKey: 'builder.stepDesign' },
  { id: 5, icon: 'fa-solid fa-code-branch', labelKey: 'builder.stepWorkflow' },
  { id: 6, icon: 'fa-solid fa-shield-halved', labelKey: 'builder.stepGuardrails' },
] as const;

@Component({
  selector: 'app-builder-stepper',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './builder-stepper.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block relative z-10 w-full' },
})
export class BuilderStepper {
  private readonly agentConfig = inject(AgentConfigService);

  readonly currentStep = input.required<number>();
  readonly stepChange = output<number>();

  readonly steps = BUILDER_STEPS;

  selectStep(stepId: number): void {
    if (stepId !== this.currentStep()) {
      this.stepChange.emit(stepId);
    }
  }

  getStepBadge(stepId: number): number {
    if (stepId === 2) {
      return this.agentConfig.config().techStack.length;
    }
    if (stepId === 3) {
      return this.agentConfig.config().architecturalRules.length;
    }
    if (stepId === 4) {
      return this.agentConfig.config().uiDesignRules.length;
    }
    return 0;
  }
}
