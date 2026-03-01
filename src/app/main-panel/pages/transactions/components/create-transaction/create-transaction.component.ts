import { Component, inject, Input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TransactionsService } from '../../services/transactions.service';
import { TransactionTypes } from '../../constants/transaction-types';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Transaction } from '../../models/transaction.model';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { NgxCurrencyDirective } from 'ngx-currency';
import { first } from 'rxjs/operators';
import { RouterService } from '../../../../../core/services/router.service';
import { TransactionPages } from '../../constants/transaction-pages';

@Component({
  selector: 'app-create-transaction',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    NgxCurrencyDirective,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './create-transaction.component.html',
  styleUrl: './create-transaction.component.css',
})
export class CreateTransactionComponent {
  private readonly transactionsService = inject(TransactionsService);
  private readonly routerService = inject(RouterService);

  @Input() id?: string;

  transactionForm!: FormGroup;
  transactionTypesEnum = TransactionTypes;
  todayISO = new Date().toISOString().split('T')[0];

  currencyOptions = {
    prefix: 'R$ ',
    thousands: '.',
    decimal: ',',
    precision: 2,
    allowNegative: false,
    align: 'left',
  };

  ngOnInit(): void {
    this.buildForm();

    if (this.id) {
      this.getTransactionById();
    }

    this.transactionForm
      .get('date')
      ?.valueChanges.subscribe(() =>
        console.log(this.transactionForm.get('date')),
      );
  }

  buildForm(): void {
    this.transactionForm = new FormGroup({
      date: new FormControl(this.todayISO, Validators.required),
      description: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
      ]),
      amount: new FormControl(null, Validators.required),
      type: new FormControl(null, Validators.required),
    });
  }

  getTransactionById(): void {
    this.transactionsService
      .getTransactionById(this.id!)
      .pipe(first())
      .subscribe({
        next: (transaction) => {
          this.transactionForm.patchValue(transaction);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  onSubmit(): void {
    const payload: Transaction = this.transactionForm.getRawValue();

    if (this.id) {
      this.updateTransaction(payload);
      return;
    }

    this.saveTransaction(payload);
  }

  saveTransaction(transactionData: any): void {
    this.transactionsService.createTransaction(transactionData).subscribe({
      next: (res) => {
        console.log('Transação executada com sucesso:', res);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  updateTransaction(payload: Transaction): void {
    this.transactionsService
      .updateTransaction(payload, this.id!)
      .pipe(first())
      .subscribe({
        next: () => {
          console.log('Sucesso!');
          this.backToList();
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  backToList(): void {
    this.routerService.setTransactionPage(TransactionPages.LIST);
  }
}
