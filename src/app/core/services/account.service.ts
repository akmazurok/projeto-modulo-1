import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Account } from '../../shared/models/account.model';
import { switchMap, take, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { calculateBalance, deleteTransaction } from '../../shared/utils/account.utils';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private readonly apiURL = `${environment.apiUrl}/account`;
  private refresh$ = new BehaviorSubject<void>(undefined);

  accountData$ = this.refresh$.pipe(switchMap(() => this.getBalance()));

  constructor(private http: HttpClient) {}

  getAccount(): Observable<Account> {
    return this.http.get<Account>(`${this.apiURL}`);
  }

  getBalance() {
    return this.http.get<{ balance: number }>(`${this.apiURL}`);
  }

  updateBalance(
    amount: number,
    type: 'income' | 'expense',
  ): Observable<Account> {
    return this.accountData$.pipe(
      take(1),
      switchMap((account: { balance: number }) => {
        const newBalance = calculateBalance(account.balance, amount, type);

        const payload = {
          balance: newBalance,         
        };

        return this.http.patch<Account>(`${this.apiURL}`, payload);
      }),
      tap(() => this.refresh$.next()),
    );
  }

  updateOnDelete(amount: number): Observable<Account>{
     return this.accountData$.pipe(
      take(1),
      switchMap((account: { balance: number }) => {
        const newBalance = deleteTransaction(account.balance, amount);

        const payload = {
          balance: newBalance,       
        };

        return this.http.patch<Account>(`${this.apiURL}`, payload);
      }),
      tap(() => this.refresh$.next()),
    );

  }

  refreshBalance() {
    this.refresh$.next();
  }
}
