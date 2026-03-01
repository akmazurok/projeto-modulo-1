import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Pages } from '../../constants/pages.enum';
import { TransactionPages } from '../../main-panel/pages/transactions/constants/transaction-pages';

@Injectable({
  providedIn: 'root',
})
export class RouterService {
  private currentPage$ = new BehaviorSubject<Pages>(Pages.DASHBOARD);
  private transactionPage$ = new BehaviorSubject<TransactionPages>(
    TransactionPages.LIST,
  );

  setCurrentPage(page: Pages): void {
    this.currentPage$.next(page);
  }

  getCurrentPage(): Observable<Pages> {
    return this.currentPage$;
  }

    setTransactionPage(page: TransactionPages): void {
    this.transactionPage$.next(page);
  }

  getTransactionPage(): Observable<TransactionPages> {
    return this.transactionPage$;
  }
}
