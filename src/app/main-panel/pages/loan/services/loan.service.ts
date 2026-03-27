import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Loan } from '../models/loan.model';
import { environment } from '../../../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoanService {
  private readonly http = inject(HttpClient);

  getLoans(): Observable<Loan[]> {
    return this.http.get<Loan[]>(`${environment.apiUrl}/loans`);
  }

  createLoan(loan: Loan): Observable<void> {
    return this.http.post<void>(`${environment.apiUrl}/loans`, loan);
  } 
  
}
