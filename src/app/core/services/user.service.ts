import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../constants/environment';
import { Account } from '../../models/account.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly http = inject(HttpClient);

  private userNameSubject = new BehaviorSubject<string>(
    sessionStorage.getItem('userName') || '',
  );
  private userBalanceSubject = new BehaviorSubject<string>(
    sessionStorage.getItem('userBalance') || '',
  );

  userName$ = this.userNameSubject.asObservable();
  userBalance$ = this.userBalanceSubject.asObservable();

  setUserName(name: string) {
    sessionStorage.setItem('userName', name);
    this.userNameSubject.next(name);
  }

  clearUserName() {
    sessionStorage.removeItem('userName');
    this.userNameSubject.next('');
  }

  getUserBalance() {
    return this.http.get<{ balance: number }>(`${environment.apiUrl}/account`);
  }

  updateUserBalance(balance: number) {
    return this.http
      .patch(`${environment.apiUrl}/account`, { balance })
      .subscribe({
        next: () => {
          sessionStorage.setItem('userBalance', balance.toString());
          this.userBalanceSubject.next(balance.toString());
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  getAccount(): Observable<Account> {
    return this.http.get<Account>(`${environment.apiUrl}/account`);
  }
}
