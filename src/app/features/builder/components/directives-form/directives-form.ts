import {
  ChangeDetectionStrategy,
  Component,
  inject,
  output,
  signal,
} from '@angular/core';
import suggestionsData from '../../../../core/data/suggestions.json';
import { TranslatePipe } from '../../../../core/i18n/translate.pipe';
import { AgentConfigService } from '../../../../core/services/agent-config.service';

@Component({
  selector: 'app-directives-form',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './directives-form.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DirectivesForm {
  readonly agentConfig = inject(AgentConfigService);
  readonly customInput = signal('');
  readonly openCatalog = output<void>();

  readonly quickSuggestions: readonly string[] =
    (suggestionsData.quickSuggestions as readonly string[]) ?? [];

  updateCustomInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.customInput.set(target.value);
  }

  addCustomRule(): void {
    const value = this.customInput().trim();
    if (value) {
      this.agentConfig.addArchitecturalRule(value);
      this.customInput.set('');
    }
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.addCustomRule();
    }
  }

  toggleRule(rule: string): void {
    this.agentConfig.toggleArchitecturalRule(rule);
  }

  removeRule(index: number): void {
    this.agentConfig.removeArchitecturalRule(index);
  }

  clearAllRules(): void {
    this.agentConfig.clearArchitecturalRules();
  }

  triggerOpenCatalog(): void {
    this.openCatalog.emit();
  }

  isRuleSelected(rule: string): boolean {
    return this.agentConfig.hasArchitecturalRule(rule);
  }
}
