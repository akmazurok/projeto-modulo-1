import { Injectable } from '@angular/core';
import { BehaviorSubject , Observable } from 'rxjs';
import { Pages } from '../../constants/pages.enum';

@Injectable({
  providedIn: 'root',
})
export class RouterService {
  private currentPage$ = new BehaviorSubject<Pages>(Pages.DASHBOARD);

  setCurrentPage(page: Pages): void {
    this.currentPage$.next(page);
  }

  getCurrentPage(): Observable<Pages> {
    return this.currentPage$;
  }
}
