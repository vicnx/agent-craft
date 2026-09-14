import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-confirm-modal',
  standalone: true,
  templateUrl: './confirm-modal.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmModal {
  readonly isOpen = input<boolean>(false);
  readonly title = input<string>('');
  readonly message = input<string>('');
  readonly confirmLabel = input<string>('');
  readonly cancelLabel = input<string>('');

  readonly confirm = output<void>();
  readonly cancel = output<void>();

  onConfirm(): void {
    this.confirm.emit();
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
