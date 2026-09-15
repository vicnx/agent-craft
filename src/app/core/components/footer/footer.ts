import { ChangeDetectionStrategy, Component } from '@angular/core';
import { APP_CONFIG } from '../../constants/app.constant';
import { TranslatePipe } from '../../i18n/translate.pipe';

@Component({
  selector: 'app-footer',
  imports: [TranslatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './footer.html',
})
export class Footer {
  readonly githubUrl = APP_CONFIG.githubUrl;
  readonly linkedinUrl = APP_CONFIG.linkedinUrl;
}
