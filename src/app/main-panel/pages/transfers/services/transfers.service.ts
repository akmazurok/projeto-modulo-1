import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transfer } from '../models/transfer.model';
import { environment } from '../../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class TransfersService {
  private readonly apiURL = `${environment.apiUrl}/transfers`;

  constructor(private http: HttpClient) {}

  getTransfers(): Observable<Transfer[]> {
    return this.http.get<Transfer[]>(`${this.apiURL}`);
  }

  createTransfer(transfer: Transfer): Observable<void> {
    return this.http.post<void>(`${this.apiURL}`, transfer);
  }
}
