import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../constants/environment';
import { Account } from '../../models/account.model';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private readonly apiURL = `${environment.apiUrl}/account`;
  user = signal<{ name: string } | null>(null);

  constructor(private http: HttpClient) {}

  private userBalanceSubject = new BehaviorSubject<string>(
    sessionStorage.getItem('userBalance') || '',
  );

  userBalance$ = this.userBalanceSubject.asObservable();

  getAccount(): Observable<Account> {
    return this.http.get<Account>(`${this.apiURL}`);
  }

  getUserBalance() {
    return this.http.get<{ balance: number }>(`${this.apiURL}`);
  }

  updateUserBalance(balance: number) {
    return this.http.patch(`${this.apiURL}`, { balance }).subscribe({
      next: () => {
        sessionStorage.setItem('userBalance', balance.toString());
        this.userBalanceSubject.next(balance.toString());
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  getUserFromToken(): string {
    const token = localStorage.getItem('token');

    if (!token) return '';

    const payload = this.decodeJwt(token);
    console.log(payload);
    return payload.name;
  } 

  decodeJwt(token: string): any {
    const payload = token.split('.')[1];
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');

    const decoded = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + c.charCodeAt(0).toString(16).padStart(2, '0'))
        .join(''),
    );
    return JSON.parse(decoded);
  }

}
