import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { getWelcomeCategories, WELCOME_PRESET_OPTIONS } from '../../core/constants/presets.constant';
import { APP_ROUTES } from '../../core/constants/routes.constant';
import { TranslatePipe } from '../../core/i18n/translate.pipe';
import { PresetCategory } from '../../core/models/preset.model';

@Component({
  selector: 'app-welcome',
  imports: [TranslatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './welcome.html',
})
export class Welcome {
  private readonly router = inject(Router);

  readonly activeCategory = signal<'all' | PresetCategory>('all');
  readonly presets = signal(WELCOME_PRESET_OPTIONS);
  readonly categories = computed(() => getWelcomeCategories(this.presets()));

  readonly filteredPresets = computed(() => {
    const category = this.activeCategory();
    if (category === 'all') {
      return this.presets();
    }
    return this.presets().filter((preset) => preset.category === category);
  });

  setCategory(category: 'all' | PresetCategory): void {
    this.activeCategory.set(category);
  }

  onStart(): void {
    void this.router.navigate([`/${APP_ROUTES.BUILDER}`, 'custom']);
  }

  onChoosePreset(presetId: string): void {
    void this.router.navigate([`/${APP_ROUTES.BUILDER}`, presetId]);
  }
}
