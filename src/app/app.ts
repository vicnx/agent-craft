import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { APP_CONFIG } from './core/constants/app.constant';
import { Footer } from './core/components/footer/footer';
import { I18nService } from './core/i18n/i18n.service';
import { ThemeService } from './core/services/theme.service';
import { TranslatePipe } from './core/i18n/translate.pipe';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, TranslatePipe, Footer],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.html',
})
export class App {
  readonly i18n = inject(I18nService);
  readonly themeService = inject(ThemeService);
  readonly appVersion = APP_CONFIG.version;
}
