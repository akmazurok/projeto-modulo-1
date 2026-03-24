import { Component, inject, OnInit, signal, effect } from '@angular/core';
import { first } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { Account } from '../../../models/account.model';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { NegativeValuePipe } from '../../../shared/pipes/negative-value.pipe';
import { TransactionsService } from '../transactions/services/transactions.service';
import { TransactionTypes } from '../transactions/constants/transaction-types';
import { Transaction } from '../transactions/models/transaction.model';
import { SignedValuePipe } from '../../../shared/pipes/signed-value.pipe';
import { ValueTypeColorPipe } from '../../../shared/pipes/value-type-color.pipe';
import { AccountService } from '../../../core/services/account.service';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FirstNamePipe } from '../../../shared/pipes/first-name.pipe';

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
  accountService = inject(AccountService);
  private readonly transactionsService = inject(TransactionsService);

  account?: Account;
  transactions: Transaction[] = [];
  lastTransactions: Transaction[] = [];
  transactionTypesEnum = TransactionTypes;
  totals = {
    income: 0,
    expense: 0,
    balance: 0,
  };
 
  isBalanceVisible = signal(true);

  constructor() {
    effect(() => {
      console.log('Extrato:', this.isBalanceVisible());
    });
  }

  ngOnInit() {
    this.getAccount();
    this.getTransactions();
  }

  toogleBalance(): void {
    this.isBalanceVisible.update((visible) => !visible);
  }

  getAccount(): void {
    this.accountService.getAccount().subscribe({
      next: (res: Account) => {
        this.account = res;
        // this.userService.setUserName(res.name);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getTransactions(): void {
    this.transactionsService
      .getTransactions()
      .pipe(first())
      .subscribe({
        next: (res) => {
          this.transactions = res;
          this.lastTransactions = this.transactions.slice(-5).reverse();
          this.totals = this.calculateTotals(this.transactions);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  calculateTotals(transactions: Transaction[]) {
    return transactions.reduce(
      (acc, t) => {
        if (t.type === 'income') {
          acc.income += t.amount;
        } else {
          acc.expense += t.amount;
        }

        acc.balance = acc.income - acc.expense;
        this.accountService.updateUserBalance(acc.balance);

        return acc;
      },
      {
        income: 0,
        expense: 0,
        balance: 0,
      },
    );
  }

  navigateToTransactions(): void {
    this.router.navigate(['/transacoes']);
  }
}
