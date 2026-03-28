import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { AccountService } from '../../../core/services/account.service';
import { Account } from '../../../shared/models/account.model';
import { FirstNamePipe } from '../../../shared/pipes/first-name.pipe';
import { NegativeValuePipe } from '../../../shared/pipes/negative-value.pipe';
import { SignedValuePipe } from '../../../shared/pipes/signed-value.pipe';
import { ValueTypeColorPipe } from '../../../shared/pipes/value-type-color.pipe';
import { TransactionTypes } from '../transactions/constants/transaction-types';
import { Transaction } from '../transactions/models/transaction.model';
import { TransactionsService } from '../transactions/services/transactions.service';
import { AuthService } from '../../../core/services/auth.service';
import { CreditCardInvoiceComponent } from './components/credit-card-invoice/credit-card-invoice.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    MatCardModule,
    CurrencyPipe,
    NegativeValuePipe,
    DatePipe,
    SignedValuePipe,
    ValueTypeColorPipe,
    MatIconModule,
    FirstNamePipe,
    CreditCardInvoiceComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly accountService = inject(AccountService);
  private readonly transactionsService = inject(TransactionsService);
  authService = inject(AuthService);

  accountData = toSignal(this.accountService.accountData$, {
    initialValue: { balance: 0 } as Account,
  });

  transactions: Transaction[] = [];
  lastTransactions: Transaction[] = [];
  transactionTypesEnum = TransactionTypes;

  now = new Date();
  currentMonth = this.now.getMonth();
  currentYear = this.now.getFullYear();

  isBalanceVisible = signal(false);
  isLoading = signal(false);

  ngOnInit() {
    this.getTransactions();
  }

  toogleBalance(): void {
    this.isBalanceVisible.update((visible) => !visible);
  }

  getTransactions(): void {
    this.transactionsService
      .getTransactions()
      .pipe(first())
      .subscribe({
        next: (res) => {
          this.transactions = res.sort((a, b) => {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
          });
          this.lastTransactions = this.transactions.slice(0, 5);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  get currentMonthTransactions() {
    return this.transactions.filter((item) => {
      const date = new Date(item.date);
      return (
        date.getMonth() === this.currentMonth &&
        date.getFullYear() === this.currentYear
      );
    });
  }

  get totalIncome(): number {
    return this.currentMonthTransactions
      .filter((item) => item.type === this.transactionTypesEnum.INCOME)
      .reduce((sum, item) => sum + item.amount, 0);
  }

  get totalExpense(): number {
    return this.currentMonthTransactions
      .filter((item) => item.type === this.transactionTypesEnum.EXPENSE)
      .reduce((sum, item) => sum + Math.abs(item.amount), 0);
  }

  navigateToTransactions(): void {
    this.router.navigate(['/transacoes']);
  }
}
