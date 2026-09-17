import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
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
  readonly categories = computed<readonly SuggestionCategory[]>(() => {
    const lang = this.agentConfig.config().outputLanguage;
    const catalogs = suggestionsData as unknown as Record<
      string,
      { categories: readonly SuggestionCategory[] }
    >;
    return catalogs[lang]?.categories ?? catalogs['es']?.categories ?? [];
  });
  readonly activeCategory = signal<string>('all');

  setActiveCategory(catId: string): void {
    this.activeCategory.set(catId);
  }

  isRuleSelected(rule: string, catId?: string): boolean {
    if (catId === 'design') {
      return this.agentConfig.hasUiDesignRule(rule);
    }
    return this.agentConfig.hasArchitecturalRule(rule);
  }

  toggleRule(rule: string, catId?: string): void {
    if (catId === 'design') {
      this.agentConfig.toggleUiDesignRule(rule);
      return;
    }
    this.agentConfig.toggleArchitecturalRule(rule);
  }

  onClose(): void {
    this.close.emit();
  }
}
