import { ChangeDetectionStrategy, Component, inject, input, output, signal } from '@angular/core';
import suggestionsData from '../../../../core/data/suggestions.json';
import { TranslatePipe } from '../../../../core/i18n/translate.pipe';
import { AgentConfigService } from '../../../../core/services/agent-config.service';

export interface SuggestionCategory {
  readonly id: string;
  readonly nameKey: string;
  readonly rules: readonly string[];
}

@Component({
  selector: 'app-directives-modal',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './directives-modal.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DirectivesModal {
  readonly isOpen = input<boolean>(false);
  readonly close = output<void>();

  readonly agentConfig = inject(AgentConfigService);
  readonly categories: readonly SuggestionCategory[] =
    suggestionsData.categories as readonly SuggestionCategory[];
  readonly activeCategory = signal<string>('all');

  setActiveCategory(catId: string): void {
    this.activeCategory.set(catId);
  }

  isRuleSelected(rule: string): boolean {
    return this.agentConfig.hasArchitecturalRule(rule);
  }

  toggleRule(rule: string): void {
    this.agentConfig.toggleArchitecturalRule(rule);
  }

  onClose(): void {
    this.close.emit();
  }
}
