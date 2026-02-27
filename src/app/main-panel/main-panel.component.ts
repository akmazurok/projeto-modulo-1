import { Component, inject } from '@angular/core';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TransactionsListComponent } from './pages/transactions-list/transactions-list.component';
import { Pages } from '../constants/pages.enum';
import { LoanComponent } from './pages/loan/loan.component';
import { TransfersComponent } from './pages/transfers/transfers.component';
import { RouterService } from '../core/services/router.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-main-panel',
  imports: [
    DashboardComponent,
    TransactionsListComponent,
    LoanComponent,
    TransfersComponent,
    AsyncPipe,
  ],
  templateUrl: './main-panel.component.html',
  styleUrl: './main-panel.component.css',
})
export class MainPanelComponent {
  private readonly routerService = inject(RouterService);

  page$ = this.routerService.getCurrentPage();
  pages = Pages;
}
