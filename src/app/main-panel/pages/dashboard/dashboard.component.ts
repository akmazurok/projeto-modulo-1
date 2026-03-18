import { Component, inject, OnInit, signal, effect } from '@angular/core';
import { first } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatCardModule } from '@angular/material/card';
import { Account } from '../../../models/account.model';
import { AsyncPipe, CurrencyPipe, DatePipe } from '@angular/common';
import { NegativeValuePipe } from '../../../shared/pipes/negative-value.pipe';
import { TransactionsService } from '../transactions/services/transactions.service';
import { TransactionTypes } from '../transactions/constants/transaction-types';
import { Transaction } from '../transactions/models/transaction.model';
import { SignedValuePipe } from '../../../shared/pipes/signed-value.pipe';
import { ValueTypeColorPipe } from '../../../shared/pipes/value-type-color.pipe';
import { UserService } from '../../../core/services/user.service';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';



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
    MatIconModule,   
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  private readonly transactionsService = inject(TransactionsService);
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);

  account?: Account;
  transactions: Transaction[] = [];
  lastTransactions: Transaction[] = [];
  transactionTypesEnum = TransactionTypes;
  totals = {
    income: 0,
    expense: 0,
    balance: 0,
  };
  userName$ = this.userService.userName$;
  firstName$ = this.userName$.pipe(map((name) => name?.split(' ')[0] || ''));

  isBalanceVisible = signal(true);

  constructor() {
    effect(() => {
      console.log(
        'Extrato:',
        this.isBalanceVisible(),
      );
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
    this.userService.getAccount().subscribe({
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
        this.userService.updateUserBalance(acc.balance);

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
