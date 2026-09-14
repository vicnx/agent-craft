import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { PresetOption } from '../../core/models/preset.model';

@Component({
  selector: 'app-welcome',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './welcome.html',
})
export class Welcome {
  private readonly router = inject(Router);

  readonly presets = signal<readonly PresetOption[]>([
    {
      id: 'cursor',
      name: 'Cursor IDE',
      targetFile: '.cursorrules',
      badge: 'Popular',
      description: 'Reglas de comportamiento, rol del agente y estándares de código para el editor Cursor.',
      tags: ['Angular', 'TypeScript', 'Tailwind'],
    },
    {
      id: 'copilot',
      name: 'GitHub Copilot',
      targetFile: 'copilot-instructions.md',
      badge: 'Estándar',
      description: 'Instrucciones contextuales para guiar las sugerencias de Copilot en todo el repositorio.',
      tags: ['Workspace', 'Buenas Prácticas', 'Clean Code'],
    },
    {
      id: 'agents',
      name: 'Claude / AGENTS.md',
      targetFile: 'AGENTS.md',
      badge: 'Autónomo',
      description: 'Directivas maestras de arquitectura, límites de ejecución y flujo Git para agentes autónomos.',
      tags: ['Arquitectura', 'Conventional Commits', 'SemVer'],
    },
  ]);

  onStart(): void {
    void this.router.navigate(['/builder']);
  }

  onChoosePreset(presetId: string): void {
    void this.router.navigate(['/builder', presetId]);
  }
}
