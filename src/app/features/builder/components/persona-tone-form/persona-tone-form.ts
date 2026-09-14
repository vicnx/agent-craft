import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import suggestionsData from '../../../../core/data/suggestions.json';
import { AgentAutonomy, AgentTone } from '../../../../core/models/agent.model';
import { AgentConfigService } from '../../../../core/services/agent-config.service';
import { TranslatePipe } from '../../../../core/i18n/translate.pipe';

@Component({
  selector: 'app-persona-tone-form',
  standalone: true,
  imports: [TranslatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './persona-tone-form.html',
})
export class PersonaToneForm {
  readonly agentConfig = inject(AgentConfigService);
  readonly customRuleInput = signal('');

  readonly toneOptions: readonly { id: AgentTone; icon: string; labelKey: string; descKey: string }[] = [
    { id: 'concise', icon: 'fa-solid fa-bolt-lightning text-amber-500', labelKey: 'builder.toneConciseLabel', descKey: 'builder.toneConciseDesc' },
    { id: 'balanced', icon: 'fa-solid fa-scale-balanced text-brand-primary', labelKey: 'builder.toneBalancedLabel', descKey: 'builder.toneBalancedDesc' },
    { id: 'explanatory', icon: 'fa-solid fa-graduation-cap text-sky-500', labelKey: 'builder.toneExplanatoryLabel', descKey: 'builder.toneExplanatoryDesc' },
  ];

  readonly autonomyOptions: readonly { id: AgentAutonomy; icon: string; labelKey: string; descKey: string }[] = [
    { id: 'conservative', icon: 'fa-solid fa-shield-halved text-emerald-500', labelKey: 'builder.autonomyConservativeLabel', descKey: 'builder.autonomyConservativeDesc' },
    { id: 'collaborative', icon: 'fa-solid fa-handshake-simple text-indigo-400', labelKey: 'builder.autonomyCollaborativeLabel', descKey: 'builder.autonomyCollaborativeDesc' },
    { id: 'autonomous', icon: 'fa-solid fa-rocket text-purple-400', labelKey: 'builder.autonomyAutonomousLabel', descKey: 'builder.autonomyAutonomousDesc' },
  ];

  readonly communicationSuggestions = computed<readonly string[]>(() => {
    const lang = this.agentConfig.config().outputLanguage;
    const catalogs = suggestionsData as unknown as Record<string, { communicationSuggestions?: readonly string[] }>;
    return catalogs[lang]?.communicationSuggestions ?? catalogs['es']?.communicationSuggestions ?? [];
  });

  selectTone(tone: AgentTone): void {
    this.agentConfig.setTone(tone);
  }

  selectAutonomy(autonomy: AgentAutonomy): void {
    this.agentConfig.setAutonomy(autonomy);
  }

  toggleCommunicationRule(rule: string): void {
    this.agentConfig.toggleCommunicationRule(rule);
  }

  isRuleSelected(rule: string): boolean {
    return this.agentConfig.config().communicationRules.includes(rule);
  }

  onCustomRuleInputChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.customRuleInput.set(target.value);
  }

  addCustomRule(): void {
    const value = this.customRuleInput().trim();
    if (value) {
      this.agentConfig.addCommunicationRule(value);
      this.customRuleInput.set('');
    }
  }

  removeCommunicationRule(index: number): void {
    this.agentConfig.removeCommunicationRule(index);
  }

  onCustomToneChange(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    this.agentConfig.setCustomTone(target.value);
  }
}
