import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import suggestionsData from '../../../../core/data/suggestions.json';
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
  readonly neverRuleInput = signal('');

  readonly neverSuggestions = computed<readonly string[]>(() => {
    const lang = this.agentConfig.config().outputLanguage;
    const catalogs = suggestionsData as unknown as Record<string, { neverSuggestions?: readonly string[] }>;
    return catalogs[lang]?.neverSuggestions ?? catalogs['es']?.neverSuggestions ?? [];
  });

  isRuleSelected(rule: string): boolean {
    return this.agentConfig.config().neverRules.includes(rule);
  }

  toggleNeverRule(rule: string): void {
    this.agentConfig.toggleNeverRule(rule);
  }

  onNeverRuleInputChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.neverRuleInput.set(target.value);
  }

  addCustomNeverRule(): void {
    const value = this.neverRuleInput().trim();
    if (value) {
      this.agentConfig.addNeverRule(value);
      this.neverRuleInput.set('');
    }
  }

  removeNeverRule(index: number): void {
    this.agentConfig.removeNeverRule(index);
  }

  clearAllNeverRules(): void {
    this.agentConfig.clearNeverRules();
  }

  onCustomInstructionsChange(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    this.agentConfig.setCustomInstructions(textarea.value);
  }

  clearCustomInstructions(): void {
    this.agentConfig.setCustomInstructions('');
  }
}
