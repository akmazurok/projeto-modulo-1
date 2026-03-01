import { Injectable, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogData, ConfirmDialogType } from '../dialogs/models/confirm-dialog.model';

@Injectable({
  providedIn: 'root',
})
export class ConfirmDialogService {
  private dialog = inject(MatDialog);

  confirm(data: ConfirmDialogData): Observable<boolean> {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data,
    });

    return dialogRef.afterClosed();
  }

  showMessage(message: string, type: ConfirmDialogType): void {
    this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: type === 'warn' ? 'Atenção' : type === 'success' ? 'Sucesso' : 'Informação',
        message,
        type,
      },
    });
  }
}
