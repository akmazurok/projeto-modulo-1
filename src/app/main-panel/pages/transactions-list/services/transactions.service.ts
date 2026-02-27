import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaction } from '../models/transaction.model';
import { environment } from '../../../../constants/environment';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  private readonly http = inject(HttpClient);

  getTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${environment.apiUrl}/transactions`);
  }

  getTransactionById(id: string): Observable<Transaction> {
    return this.http.get<Transaction>(
      `${environment.apiUrl}/transactions/${id}`,
    );
  }

  createTransaction(transaction: Transaction): Observable<void> {
    return this.http.post<void>(
      `${environment.apiUrl}/transactions`,
      transaction,
    );
  }

  updateTransaction(transaction: Transaction, id: string): Observable<void> {
    return this.http.put<void>(
      `${environment.apiUrl}/transactions/${id}`,
      transaction,
    );
  }

  deleteTransaction(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/transactions/${id}`);
  }
}
