import { Component, inject, Output, EventEmitter } from '@angular/core';
import { TransactionsService } from '../../services/transactions.service';
import { Transaction } from '../../models/transaction.model';
import { TransactionTypes } from '../../constants/transaction-types';
import { first } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { CurrencyPipe } from '@angular/common';
import { ValueTypeColorPipe } from '../../../../../shared/pipes/value-type-color.pipe';
import { SignedValuePipe } from '../../../../../shared/pipes/signed-value.pipe';
import { RouterService } from '../../../../../core/services/router.service';
import { TransactionPages } from '../../constants/transaction-pages';
import { ConfirmDialogService } from '../../../../../shared/services/confirm-dialog.service';

@Component({
  selector: 'app-list-transactions',
  imports: [DatePipe, ValueTypeColorPipe, SignedValuePipe, CurrencyPipe],
  templateUrl: './list-transactions.component.html',
  styleUrl: './list-transactions.component.css',
})
export class ListTransactionsComponent {
  private readonly transactionsService = inject(TransactionsService);
  private readonly routerService = inject(RouterService);
  private readonly dialogService = inject(ConfirmDialogService);

  @Output() editEmitter = new EventEmitter<string>();

  transactions: Transaction[] = [];
  transactionTypesEnum = TransactionTypes;
  transactionPagesEnum = TransactionPages;

  ngOnInit() {
    this.getTransactions();
  }

  getTransactions(): void {
    this.transactionsService
      .getTransactions()
      .pipe(first())
      .subscribe({
        next: (res) => {
          this.transactions = res;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  redirectToCreate(): void {
    this.routerService.setTransactionPage(TransactionPages.CREATE);
  }

  onEdit(id: string): void {
    this.editEmitter.emit(id);
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
                this.dialogService
                  .confirm({
                    title: 'Excluído',
                    message: 'A transação foi excluída com sucesso.',
                    type: 'success',
                    confirmText: 'OK',
                  })
                  .subscribe(() => {
                    this.getTransactions();
                  });
              },
              error: (err) => {
                console.log(err);
              },
            });
        }
      });
  }
}
