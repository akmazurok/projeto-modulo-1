import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { AccountService } from '../../../core/services/account.service';
import { Account } from '../../../models/account.model';
import { FirstNamePipe } from '../../../shared/pipes/first-name.pipe';
import { NegativeValuePipe } from '../../../shared/pipes/negative-value.pipe';
import { SignedValuePipe } from '../../../shared/pipes/signed-value.pipe';
import { ValueTypeColorPipe } from '../../../shared/pipes/value-type-color.pipe';
import { TransactionTypes } from '../transactions/constants/transaction-types';
import { Transaction } from '../transactions/models/transaction.model';
import { TransactionsService } from '../transactions/services/transactions.service';
import { AuthService } from '../../../core/services/auth.service';

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
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly accountService = inject(AccountService);  
  private readonly transactionsService = inject(TransactionsService);
  authService = inject(AuthService);

  accountData = toSignal<Account>(this.accountService.getAccount());

  transactions: Transaction[] = [];
  lastTransactions: Transaction[] = [];
  transactionTypesEnum = TransactionTypes;
  balance = 2300;

  isBalanceVisible = signal(true);
  isLoading = signal(false);

  constructor() {}

  ngOnInit() {   
    //this.getTransactions();
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
          this.transactions = res;
          this.lastTransactions = this.transactions.slice(-5).reverse();      
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  get totalIncome(): number {
    return this.transactions
      .filter((item) => item.amount > 0)
      .reduce((sum, item) => sum + item.amount, 0);
  }

  get totalExpense(): number {
    return this.transactions
      .filter((item) => item.amount < 0)
      .reduce((sum, item) => sum + Math.abs(item.amount), 0);
  }

  navigateToTransactions(): void {
    this.router.navigate(['/transacoes']);
  }
}
