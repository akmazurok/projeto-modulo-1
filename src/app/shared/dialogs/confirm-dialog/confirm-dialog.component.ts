import { Component, inject } from '@angular/core';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import {
  ConfirmDialogData,
  ConfirmDialogType,
} from '../models/confirm-dialog.model';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-confirm-dialog',
  imports: [MatDialogModule, MatButtonModule, MatIconModule],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.css',
})
export class ConfirmDialogComponent {
  private dialogRef = inject(MatDialogRef<ConfirmDialogComponent>);
  readonly data = inject<ConfirmDialogData>(MAT_DIALOG_DATA);

  get icon() {
    switch (this.data.type) {
      case 'warn':
        return 'warning';
      case 'success':
        return 'check_circle';
      default:
        return 'info';
    }
  }

  get iconColor() {
    switch (this.data.type) {
      case 'warn':
        return 'icon-warn';
      case 'success':
        return 'icon-success';
      default:
        return 'info';
    }
  }

  get buttonColor() {
    switch (this.data.type) {
      case 'warn':
        return 'btn btn-danger';
      case 'success':
        return 'btn btn-primary';
      default:
        return 'btn btn-primary';
    }
  }

  confirm() {
    this.dialogRef.close(true);
  }

  cancel() {
    this.dialogRef.close(false);
  }
}
