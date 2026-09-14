import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-builder',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './builder.html',
})
export class Builder {
  private readonly router = inject(Router);

  readonly presetId = input<string>();

  readonly activeTarget = computed(() => {
    const id = this.presetId();
    if (!id) return 'Configuración Personalizada';
    switch (id) {
      case 'cursor':
        return '.cursorrules · Cursor IDE';
      case 'copilot':
        return 'copilot-instructions.md · GitHub Copilot';
      case 'agents':
        return 'AGENTS.md · Claude & Autónomo';
      default:
        return `${id} · Preset`;
    }
  });

  goBack(): void {
    void this.router.navigate(['/']);
  }
}
