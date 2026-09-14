import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { TranslatePipe } from '../../../../core/i18n/translate.pipe';
import { AgentConfigService } from '../../../../core/services/agent-config.service';

const DESIGN_SUGGESTIONS_BY_LANG: Record<'es' | 'en', readonly string[]> = {
  es: [
    'Estética moderna dev-tool (Dark-mode first, glassmorphism, microbordes)',
    'Diseño responsive obligatorio (adaptabilidad total en móvil y escritorio)',
    'Reutilización de componentes UI atómicos (botones, inputs, selectores)',
    'Accesibilidad WCAG y contrastes legibles',
  ],
  en: [
    'Modern dev-tool aesthetics (Dark-mode first, glassmorphism, micro-borders)',
    'Mandatory responsive design (complete mobile & desktop adaptability)',
    'Reusable atomic UI components (buttons, inputs, selectors, modals)',
    'WCAG accessibility compliance and contemporary readable typography',
  ],
};

@Component({
  selector: 'app-ui-design-form',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './ui-design-form.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiDesignForm {
  readonly agentConfig = inject(AgentConfigService);
  readonly customInput = signal('');

  readonly quickSuggestions = computed<readonly string[]>(() => {
    const lang = this.agentConfig.config().outputLanguage;
    return DESIGN_SUGGESTIONS_BY_LANG[lang] ?? DESIGN_SUGGESTIONS_BY_LANG.es;
  });

  updateCustomInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.customInput.set(target.value);
  }

  addCustomRule(): void {
    const value = this.customInput().trim();
    if (value) {
      this.agentConfig.addUiDesignRule(value);
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
    const current = this.agentConfig.config().uiDesignRules;
    const exists = current.includes(rule);
    if (exists) {
      const idx = current.indexOf(rule);
      this.agentConfig.removeUiDesignRule(idx);
    } else {
      this.agentConfig.addUiDesignRule(rule);
    }
  }

  removeRule(index: number): void {
    this.agentConfig.removeUiDesignRule(index);
  }

  isRuleSelected(rule: string): boolean {
    return this.agentConfig.config().uiDesignRules.includes(rule);
  }
}
