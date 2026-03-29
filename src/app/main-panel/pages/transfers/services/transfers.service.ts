import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Transfer } from '../models/transfer.model';
import { environment } from '../../../../../environments/environment.development';
import { switchMap } from 'rxjs/operators';
import { toISOStringFromDate } from '../../../../shared/utils/date.utils';

@Injectable({
  providedIn: 'root',
})
export class TransfersService {
  private readonly apiURL = `${environment.apiUrl}/transfers`;
  private refresh$ = new BehaviorSubject<void>(undefined);

  transfers$ = this.refresh$.pipe(switchMap(() => this.getTransfers()));

  constructor(private http: HttpClient) {}

  getTransfers(): Observable<Transfer[]> {
    return this.http.get<Transfer[]>(`${this.apiURL}`);
  }

  createTransfer(transfer: Transfer): Observable<void> {
    return this.http.post<void>(`${this.apiURL}`, transfer);
  }
}
