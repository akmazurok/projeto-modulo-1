import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from '../models/account.model';
import { environment } from '../../../../constants/environment';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private readonly http = inject(HttpClient); 

  getAccount(): Observable<Account> {
    return this.http.get<Account>(`${environment.apiUrl}/account`);
  }
}
