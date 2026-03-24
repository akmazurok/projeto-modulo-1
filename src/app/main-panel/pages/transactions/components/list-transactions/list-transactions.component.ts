import { Component, inject } from '@angular/core';
import { TransactionsService } from '../../services/transactions.service';
import { Transaction } from '../../models/transaction.model';
import { TransactionTypes } from '../../constants/transaction-types';
import { first } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { CurrencyPipe } from '@angular/common';
import { ValueTypeColorPipe } from '../../../../../shared/pipes/value-type-color.pipe';
import { SignedValuePipe } from '../../../../../shared/pipes/signed-value.pipe';
import { ConfirmDialogService } from '../../../../../shared/services/confirm-dialog.service';
import { Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-list-transactions',
  imports: [DatePipe, ValueTypeColorPipe, SignedValuePipe, CurrencyPipe],
  templateUrl: './list-transactions.component.html',
  styleUrl: './list-transactions.component.css',
})
export class ListTransactionsComponent {
  private readonly transactionsService = inject(TransactionsService);
  private readonly dialogService = inject(ConfirmDialogService);
  private readonly router = inject(Router);

  transactionTypesEnum = TransactionTypes;

  transactions = toSignal(this.transactionsService.getTransactions(), {
    initialValue: [] as Transaction[],
  });

  onEdit(id: string): void {
    this.router.navigate(['/transacoes/editar', id]);
  }

  onDelete(id: string): void {
    this.dialogService
      .confirm({
        title: 'Confirmar exclusão',
        message: 'Tem certeza que deseja excluir esta transação?',
        type: 'warn',
        confirmText: 'Excluir',
        cancelText: 'Cancelar',
      })
      .subscribe((confirmed) => {
        if (confirmed) {
          this.transactionsService
            .deleteTransaction(id)
            .pipe(first())
            .subscribe({
              next: () => {
                this.dialogService.confirm({
                  title: 'Excluído',
                  message: 'A transação foi excluída com sucesso.',
                  type: 'success',
                  confirmText: 'OK',
                });
              },
              error: (err) => {
                console.log(err);
              },
            });
        }
      });
  }

  redirectToCreate(): void {
    this.router.navigate(['/transacoes/criar']);
  }
}
