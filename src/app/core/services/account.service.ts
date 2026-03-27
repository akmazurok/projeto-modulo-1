import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Account } from '../../models/account.model';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private readonly apiURL = `${environment.apiUrl}/account`;

  constructor(private http: HttpClient) {}

  getAccount(): Observable<Account> {
    return this.http.get<Account>(`${this.apiURL}`);
  }

  getBalance() {
    return this.http.get<{ balance: number }>(`${this.apiURL}`);
  }

  updateBalance(newBalance: number): Observable<Account> {
    const payload = {
      balance: newBalance,
      item: { balance: newBalance },
    };
    return this.http.patch<Account>(`${this.apiURL}`, payload).pipe(
      catchError((err) => {
        console.error(err);
        return throwError(() => new Error('Erro ao atualizar o saldo'));
      }),
    );
  }
 
}
