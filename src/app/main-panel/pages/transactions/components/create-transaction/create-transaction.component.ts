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
import { ConfirmDialogService } from '../../../../../shared/services/confirm-dialog.service';
import { dateNotInFuture } from '../../../../../shared/validators/date.validator';
import { Router } from '@angular/router';
import { CURRENCY_OPTIONS } from '../../../../../shared/config/currency.config';
import { getTodayISO } from '../../../../../shared/utils/date.utils';
import { AccountService } from '../../../../../core/services/account.service';

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
  private readonly dialogService = inject(ConfirmDialogService);
  private readonly router = inject(Router);
  private readonly accountService = inject(AccountService);

  @Input() id?: string;

  transactionForm!: FormGroup;
  transactionTypesEnum = TransactionTypes;
  todayISO = getTodayISO();
  currencyOptions = CURRENCY_OPTIONS;

  ngOnInit(): void {
    this.buildForm();

    if (this.id) {
      this.getTransactionById();
    }
  }

  buildForm(): void {
    this.transactionForm = new FormGroup({
      date: new FormControl<string>(this.todayISO, [
        Validators.required,
        dateNotInFuture,
      ]),
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
      next: () => {
        this.dialogService
          .confirm({
            title: 'Sucesso',
            message: 'Transação criada com sucesso!',
            type: 'success',
            confirmText: 'OK',
            cancelText: '',
          })
          .subscribe((result) => {
            if (result === true) {
              this.accountService
                .updateBalance(transactionData.amount, transactionData.type)
                .subscribe();
              this.backToList();
            }
          });
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
          this.dialogService
            .confirm({
              title: 'Sucesso',
              message: 'Transação editada com sucesso!',
              type: 'success',
              confirmText: 'OK',
              cancelText: '',
            })
            .subscribe(() => {
              this.backToList();
            });
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  updateBalance(amount: number, type: any) {
    this.accountService.updateBalance(amount, type);
  }

  backToList(): void {
    this.router.navigate(['/transacoes']);
  }
}
