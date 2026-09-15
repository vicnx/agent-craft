import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { APP_ROUTES } from '../../core/constants/routes.constant';
import { TranslatePipe } from '../../core/i18n/translate.pipe';
import { PresetOption } from '../../core/models/preset.model';

@Component({
  selector: 'app-welcome',
  imports: [TranslatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './welcome.html',
})
export class Welcome {
  private readonly router = inject(Router);

  readonly presets = signal<readonly PresetOption[]>([
    {
      id: 'typescript',
      nameKey: 'presets.typescriptName',
      targetFile: 'TypeScript',
      badgeKey: 'common.popular',
      descKey: 'presets.typescriptDesc',
      tags: ['TypeScript', 'Angular', 'React', 'Node.js'],
    },
    {
      id: 'python',
      nameKey: 'presets.pythonName',
      targetFile: 'Python',
      badgeKey: 'common.popular',
      descKey: 'presets.pythonDesc',
      tags: ['FastAPI', 'Django', 'Pytest', 'Ruff'],
    },
    {
      id: 'go',
      nameKey: 'presets.goName',
      targetFile: 'Go',
      badgeKey: 'common.autonomous',
      descKey: 'presets.goDesc',
      tags: ['Microservices', 'Concurrency', 'APIs'],
    },
    {
      id: 'rust',
      nameKey: 'presets.rustName',
      targetFile: 'Rust',
      badgeKey: 'common.popular',
      descKey: 'presets.rustDesc',
      tags: ['High-Perf', 'Memory-Safety', 'Cargo'],
    },
    {
      id: 'java',
      nameKey: 'presets.javaName',
      targetFile: 'Java',
      badgeKey: 'common.standard',
      descKey: 'presets.javaDesc',
      tags: ['Spring Boot 3', 'Hexagonal', 'JUnit 5'],
    },
  ]);

  onStart(): void {
    void this.router.navigate([`/${APP_ROUTES.BUILDER}`, 'custom']);
  }

  onChoosePreset(presetId: string): void {
    void this.router.navigate([`/${APP_ROUTES.BUILDER}`, presetId]);
  }
}
