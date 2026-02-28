import { Component } from '@angular/core';
import { CreateTransactionComponent } from "./components/create-transaction/create-transaction.component";

@Component({
  selector: 'app-transactions',
  imports: [CreateTransactionComponent],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css'
})
export class TransactionsComponent {

}
