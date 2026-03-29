import { Component, inject, computed, ViewChild, effect } from '@angular/core';
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
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-list-transactions',
  imports: [
    DatePipe,
    ValueTypeColorPipe,
    SignedValuePipe,
    CurrencyPipe,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,  
  ],
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

  sortedTransactions = computed(() =>
    [...this.transactions()].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    ),
  );

  dataSource = new MatTableDataSource<Transaction>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['date', 'description', 'amount', 'actions'];

  constructor() {
    effect(() => {
      this.dataSource.data = this.sortedTransactions();
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

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
