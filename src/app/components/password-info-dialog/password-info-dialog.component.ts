import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-password-info-dialog',
  template: `
    <div style="padding: 2rem;">
      <p class="dialog-heading">Passwords must be at least 6 characters, at least one non-alphanumeric character, at least one digit ("0-9"), & least one uppercase letter ("A-Z").</p>
      <button mat-raised-button color="primary" (click)="closeDialog()">Close</button>
    </div>
  `,
})
export class PasswordInfoDialogComponent {
  constructor(public dialogRef: MatDialogRef<PasswordInfoDialogComponent>) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
