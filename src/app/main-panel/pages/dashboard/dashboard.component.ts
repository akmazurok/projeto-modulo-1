import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Account } from './models/account.model';
import { DashboardService } from './services/dashboard.service';
import { CurrencyPipe } from '@angular/common';
import { NegativeValuePipe } from '../../../shared/pipes/negative-value.pipe';

@Component({
  selector: 'app-dashboard',
  imports: [MatCardModule, CurrencyPipe, NegativeValuePipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  private readonly dashboardService = inject(DashboardService);

  account?: Account;
  
  ngOnInit(): void {
    this.dashboardService.getAccount().subscribe({
      next: (res: Account) => {
        this.account = res;
        console.log(this.account);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
