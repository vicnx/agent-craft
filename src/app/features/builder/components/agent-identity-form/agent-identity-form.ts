import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import suggestionsData from '../../../../core/data/suggestions.json';
import { AgentConfigService } from '../../../../core/services/agent-config.service';
import { TranslatePipe } from '../../../../core/i18n/translate.pipe';

@Component({
  selector: 'app-agent-identity-form',
  imports: [TranslatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './agent-identity-form.html',
})
export class AgentIdentityForm {
  readonly agentConfig = inject(AgentConfigService);

  readonly allRoles = computed<readonly string[]>(() => {
    const lang = this.agentConfig.config().outputLanguage;
    const catalogs = suggestionsData as unknown as Record<string, { roles: readonly string[] }>;
    return catalogs[lang]?.roles ?? catalogs['es']?.roles ?? [];
  });
  readonly showAllRoles = signal(false);

  readonly visibleRoles = computed(() =>
    this.showAllRoles() ? this.allRoles() : this.allRoles().slice(0, 4)
  );

  selectRole(role: string): void {
    this.agentConfig.updateConfig({ role });
  }

  toggleShowAllRoles(): void {
    this.showAllRoles.update((prev) => !prev);
  }

  onProjectNameChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.agentConfig.updateConfig({ projectName: target.value });
  }

  onRoleChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.agentConfig.updateConfig({ role: target.value });
  }

  onDescriptionChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.agentConfig.updateConfig({ description: target.value });
  }

  setOutputLanguage(outputLanguage: 'es' | 'en'): void {
    this.agentConfig.setOutputLanguage(outputLanguage);
  }
}
