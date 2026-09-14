import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
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
      id: 'cursor',
      nameKey: 'presets.cursorName',
      targetFile: '.cursorrules',
      badgeKey: 'common.popular',
      descKey: 'presets.cursorDesc',
      tags: ['Angular', 'TypeScript', 'Tailwind'],
    },
    {
      id: 'copilot',
      nameKey: 'presets.copilotName',
      targetFile: 'copilot-instructions.md',
      badgeKey: 'common.standard',
      descKey: 'presets.copilotDesc',
      tags: ['Workspace', 'Clean Code'],
    },
    {
      id: 'agents',
      nameKey: 'presets.agentsName',
      targetFile: 'AGENTS.md',
      badgeKey: 'common.autonomous',
      descKey: 'presets.agentsDesc',
      tags: ['Architecture', 'Commits', 'SemVer'],
    },
  ]);

  onStart(): void {
    void this.router.navigate(['/builder', 'custom']);
  }

  onChoosePreset(presetId: string): void {
    void this.router.navigate(['/builder', presetId]);
  }
}
