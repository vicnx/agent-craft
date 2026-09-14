import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, signal } from '@angular/core';
import { ConfirmModal } from './confirm-modal';

@Component({
  standalone: true,
  imports: [ConfirmModal],
  template: `
    <app-confirm-modal
      [isOpen]="isOpen()"
      [title]="'Warning'"
      [message]="'Are you sure?'"
      [confirmLabel]="'Confirm'"
      [cancelLabel]="'Cancel'"
      (confirm)="onConfirm()"
      (cancel)="onCancel()"
    />
  `,
})
class TestHostComponent {
  readonly isOpen = signal(false);
  confirmed = false;
  cancelled = false;

  onConfirm(): void {
    this.confirmed = true;
  }

  onCancel(): void {
    this.cancelled = true;
  }
}

describe('ConfirmModal', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should not show modal when isOpen is false', () => {
    const dialog = fixture.nativeElement.querySelector('[role="dialog"]');
    expect(dialog).toBeNull();
  });

  it('should display modal content when isOpen is true', () => {
    host.isOpen.set(true);
    fixture.detectChanges();

    const dialog = fixture.nativeElement.querySelector('[role="dialog"]');
    expect(dialog).toBeTruthy();
    expect(fixture.nativeElement.textContent).toContain('Warning');
    expect(fixture.nativeElement.textContent).toContain('Are you sure?');
  });

  it('should emit confirm when confirm button is clicked', () => {
    host.isOpen.set(true);
    fixture.detectChanges();

    const buttons = fixture.nativeElement.querySelectorAll('button');
    const confirmButton = buttons[1]; // second button is confirm
    confirmButton.click();

    expect(host.confirmed).toBe(true);
  });

  it('should emit cancel when cancel button is clicked', () => {
    host.isOpen.set(true);
    fixture.detectChanges();

    const buttons = fixture.nativeElement.querySelectorAll('button');
    const cancelButton = buttons[0]; // first button is cancel
    cancelButton.click();

    expect(host.cancelled).toBe(true);
  });
});
