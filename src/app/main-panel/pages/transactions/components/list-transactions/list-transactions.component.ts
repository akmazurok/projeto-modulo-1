import { Component, inject } from '@angular/core';
import { TransactionsService } from '../../services/transactions.service';
import { Transaction } from '../../models/transaction.model';
import { TransactionTypes } from '../../constants/transaction-types';
import { map, filter, switchMap } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { CurrencyPipe } from '@angular/common';
import { ValueTypeColorPipe } from '../../../../../shared/pipes/value-type-color.pipe';
import { SignedValuePipe } from '../../../../../shared/pipes/signed-value.pipe';
import { ConfirmDialogService } from '../../../../../shared/services/confirm-dialog.service';
import { Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { AccountService } from '../../../../../core/services/account.service';

@Component({
  selector: 'app-list-transactions',
  imports: [DatePipe, ValueTypeColorPipe, SignedValuePipe, CurrencyPipe],
  templateUrl: './list-transactions.component.html',
  styleUrl: './list-transactions.component.css',
})
export class ListTransactionsComponent {
  private readonly transactionsService = inject(TransactionsService);
  private readonly accountService = inject(AccountService);
  private readonly dialogService = inject(ConfirmDialogService);
  private readonly router = inject(Router);

  transactionTypesEnum = TransactionTypes;

  transactions = toSignal(this.transactionsService.transactions$, {
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
        type: 'warning',
        confirmText: 'Excluir',
        cancelText: 'Cancelar',
      })
      .pipe(
        filter((result) => result === true),
        switchMap(() => this.transactionsService.getTransactionById(id)),
        switchMap((transaction) =>
          this.transactionsService
            .deleteTransaction(id)
            .pipe(map(() => transaction)),
        ),
        switchMap((transaction) =>
          this.accountService.updateOnDelete(transaction.amount),
        ),
      )
      .subscribe({
        error: (err) => console.error(err),
      });
  }

  redirectToCreate(): void {
    this.router.navigate(['/transacoes/criar']);
  }
}
