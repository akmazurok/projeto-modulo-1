import { Component, inject, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatCardModule } from '@angular/material/card';
import { Account } from './models/account.model';
import { DashboardService } from './services/dashboard.service';
import { AsyncPipe, CurrencyPipe, DatePipe } from '@angular/common';
import { NegativeValuePipe } from '../../../shared/pipes/negative-value.pipe';
import { TransactionsService } from '../transactions-list/services/transactions.service';
import { TransactionTypes } from '../transactions-list/constants/transaction-types';
import { Transaction } from '../transactions-list/models/transaction.model';
import { SignedValuePipe } from '../../../shared/pipes/signed-value.pipe';
import { ValueTypeColorPipe } from '../../../shared/pipes/value-type-color.pipe';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-dashboard',
  imports: [
    MatCardModule,
    CurrencyPipe,
    NegativeValuePipe,
    DatePipe,
    SignedValuePipe,
    ValueTypeColorPipe,
    AsyncPipe,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  private readonly dashboardService = inject(DashboardService);
  private readonly transactionsService = inject(TransactionsService);
  private readonly userService = inject(UserService);

  account?: Account;
  transactions: Transaction[] = [];
  transactionTypesEnum = TransactionTypes;
  totals = {
    income: 0,
    expense: 0,
    balance: 0,
  };
  userName$ = this.userService.userName$;
  firstName$ = this.userName$.pipe(map((name) => name?.split(' ')[0] || ''));

  ngOnInit() {
    this.getAccount();
    this.getTransactions();
  }

  getAccount(): void {
    this.dashboardService.getAccount().subscribe({
      next: (res: Account) => {
        this.account = res;
        this.userService.setUserName(res.name);
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

        return acc;
      },
      {
        income: 0,
        expense: 0,
        balance: 0,
      },
    );
  }
}
