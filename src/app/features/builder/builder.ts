import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { I18nService } from '../../core/i18n/i18n.service';
import { TranslatePipe } from '../../core/i18n/translate.pipe';

@Component({
  selector: 'app-builder',
  imports: [TranslatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './builder.html',
})
export class Builder {
  private readonly router = inject(Router);
  private readonly i18n = inject(I18nService);

  readonly presetId = input<string>();

  readonly activeTarget = computed(() => {
    const id = this.presetId();
    if (!id) return this.i18n.t().builder.customConfig;
    switch (id) {
      case 'cursor':
        return `.cursorrules · ${this.i18n.t().presets.cursorName}`;
      case 'copilot':
        return `copilot-instructions.md · ${this.i18n.t().presets.copilotName}`;
      case 'agents':
        return `AGENTS.md · ${this.i18n.t().presets.agentsName}`;
      default:
        return `${id} · Preset`;
    }
  });

  goBack(): void {
    void this.router.navigate(['/']);
  }
}
