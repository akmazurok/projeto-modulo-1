import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface CreditCardTransaction {
  id: string;
  date: string;
  description: string;
  installment: string;
  amount: number;
}
@Component({
  selector: 'app-credit-card-invoice',
  imports: [CommonModule],
  templateUrl: './credit-card-invoice.component.html',
  styleUrl: './credit-card-invoice.component.css',
})
export class CreditCardInvoiceComponent {
  invoiceClosingDate = '2026-04-25';
  invoiceDueDate = '2026-05-01';

  invoiceTransactions: CreditCardTransaction[] = [
    {
      id: '1',
      date: '2026-04-01T00:00:00.000Z',
      description: 'Amazon',
      installment: '1/3',
      amount: 199.9,
    },
    {
      id: '2',
      date: '2026-04-02T00:00:00.000Z',
      description: 'iFood',
      installment: 'À vista',
      amount: 58.4,
    },
    {
      id: '3',
      date: '2026-04-03T00:00:00.000Z',
      description: 'Netflix',
      installment: 'Mensal',
      amount: 39.9,
    },
  ];

  get totalInvoice(): number {
    return this.invoiceTransactions.reduce(
      (total, item) => total + item.amount,
      0,
    );
  }
}
