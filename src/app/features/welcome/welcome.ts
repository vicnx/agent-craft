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
      id: 'angular',
      nameKey: 'presets.angularName',
      targetFile: 'Angular (v19+)',
      badgeKey: 'common.popular',
      descKey: 'presets.angularDesc',
      tags: ['Angular', 'Signals', 'Standalone', 'Tailwind'],
    },
    {
      id: 'react',
      nameKey: 'presets.reactName',
      targetFile: 'React 19',
      badgeKey: 'common.popular',
      descKey: 'presets.reactDesc',
      tags: ['React 19', 'Vite', 'Tailwind', 'Zustand'],
    },
    {
      id: 'react-native',
      nameKey: 'presets.reactNativeName',
      targetFile: 'React Native',
      badgeKey: 'common.popular',
      descKey: 'presets.reactNativeDesc',
      tags: ['React Native', 'Expo', 'Expo Router', 'NativeWind'],
    },
    {
      id: 'nestjs',
      nameKey: 'presets.nestjsName',
      targetFile: 'NestJS',
      badgeKey: 'common.popular',
      descKey: 'presets.nestjsDesc',
      tags: ['Node.js', 'TypeScript', 'Prisma', 'OpenAPI'],
    },
    {
      id: 'fastapi',
      nameKey: 'presets.fastapiName',
      targetFile: 'FastAPI',
      badgeKey: 'common.popular',
      descKey: 'presets.fastapiDesc',
      tags: ['Python 3.12+', 'Async', 'Pydantic v2', 'Ruff'],
    },
    {
      id: 'springboot',
      nameKey: 'presets.springbootName',
      targetFile: 'Spring Boot 3',
      badgeKey: 'common.standard',
      descKey: 'presets.springbootDesc',
      tags: ['Java 21+', 'Virtual Threads', 'Records', 'JPA'],
    },
    {
      id: 'aspnet',
      nameKey: 'presets.aspnetName',
      targetFile: 'ASP.NET Core',
      badgeKey: 'common.standard',
      descKey: 'presets.aspnetDesc',
      tags: ['.NET 9', 'C# 13', 'Clean Arch', 'EF Core'],
    },
    {
      id: 'go-microservices',
      nameKey: 'presets.goMicroservicesName',
      targetFile: 'Go',
      badgeKey: 'common.autonomous',
      descKey: 'presets.goMicroservicesDesc',
      tags: ['Microservices', 'sqlc', 'pgx', 'slog'],
    },
  ]);

  onStart(): void {
    void this.router.navigate([`/${APP_ROUTES.BUILDER}`, 'custom']);
  }

  onChoosePreset(presetId: string): void {
    void this.router.navigate([`/${APP_ROUTES.BUILDER}`, presetId]);
  }
}
