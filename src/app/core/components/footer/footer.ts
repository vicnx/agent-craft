import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslatePipe } from '../../i18n/translate.pipe';

@Component({
  selector: 'app-footer',
  imports: [TranslatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './footer.html',
})
export class Footer {
  readonly githubUrl = 'https://github.com/vicnx';
  readonly linkedinUrl = 'https://www.linkedin.com/in/vicnx/';
}
