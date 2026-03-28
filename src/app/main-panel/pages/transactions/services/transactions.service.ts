import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Transaction } from '../models/transaction.model';
import { environment } from '../../../../../environments/environment.development';
import { switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  private readonly apiURL = `${environment.apiUrl}/transactions`;
  private refresh$ = new BehaviorSubject<void>(undefined);

  transactions$ = this.refresh$.pipe(switchMap(() => this.getTransactions()));

  constructor(private http: HttpClient) {}

  getTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.apiURL}`);
  }

  getTransactionById(id: string): Observable<Transaction> {
    return this.http.get<Transaction>(`${this.apiURL}/${id}`);
  }

  createTransaction(transaction: Transaction): Observable<void> {
    return this.http.post<void>(`${this.apiURL}`, transaction);
  }

  updateTransaction(transaction: Transaction, id: string): Observable<void> {
    return this.http.put<void>(`${this.apiURL}/${id}`, transaction);
  }

  deleteTransaction(id: string): Observable<void> {
    return this.http
      .delete<void>(`${this.apiURL}/${id}`)
      .pipe(tap(() => this.refresh$.next()));
  }
}
