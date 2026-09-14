import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { AgentConfigService } from '../../../../core/services/agent-config.service';
import { TranslatePipe } from '../../../../core/i18n/translate.pipe';

@Component({
  selector: 'app-tech-stack-form',
  imports: [TranslatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './tech-stack-form.html',
})
export class TechStackForm {
  readonly agentConfig = inject(AgentConfigService);

  readonly customTechInput = signal('');

  readonly popularTech: readonly string[] = [
    'Angular',
    'TypeScript',
    'Tailwind CSS',
    'React',
    'Vue',
    'Next.js',
    'Node.js',
    'Python',
    'Docker',
    'Vitest',
  ];

  onInputChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.customTechInput.set(target.value);
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.addCustomTech();
    }
  }

  addCustomTech(): void {
    const value = this.customTechInput().trim();
    if (value) {
      this.agentConfig.addTechStackItem(value);
      this.customTechInput.set('');
    }
  }

  togglePopular(tech: string): void {
    if (this.isTechSelected(tech)) {
      this.agentConfig.removeTechStackItem(tech);
    } else {
      this.agentConfig.addTechStackItem(tech);
    }
  }

  removeTech(tech: string): void {
    this.agentConfig.removeTechStackItem(tech);
  }

  isTechSelected(tech: string): boolean {
    return this.agentConfig.config().techStack.includes(tech);
  }
}
