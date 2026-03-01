import { Component, inject } from '@angular/core';
import { CreateTransactionComponent } from "./components/create-transaction/create-transaction.component";
import { ListTransactionsComponent } from "./components/list-transactions/list-transactions.component";
import { RouterService } from '../../../core/services/router.service';
import { TransactionPages } from './constants/transaction-pages';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-transactions',
  imports: [CreateTransactionComponent, ListTransactionsComponent, AsyncPipe],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css'
})
export class TransactionsComponent {
  private readonly routerService = inject(RouterService);

   id?: string;

  page$ = this.routerService.getTransactionPage();
  pagesEnum = TransactionPages;

  handleEditTransaction(id: string): void {
    this.id = id;
    this.routerService.setTransactionPage(TransactionPages.EDIT);
  }

}
