import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transfer } from '../models/transfer.model';
import { environment } from '../../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class TransfersService {
  private readonly http = inject(HttpClient);

  getTransfers(): Observable<Transfer[]> {
    return this.http.get<Transfer[]>(`${environment.apiUrl}/transfers`);
  }

  createTransfer(transfer: Transfer): Observable<void> {
    return this.http.post<void>(`${environment.apiUrl}/transfers`, transfer);
  }
}
