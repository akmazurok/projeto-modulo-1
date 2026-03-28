import { Component, inject, effect } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgxCurrencyDirective } from 'ngx-currency';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Transfer } from '../../models/transfer.model';
import { TransfersService } from '../../services/transfers.service';
import { ConfirmDialogService } from '../../../../../shared/services/confirm-dialog.service';
import { TransactionsService } from '../../../transactions/services/transactions.service';
import { TransactionTypes } from '../../../transactions/constants/transaction-types';
import { NgxMaskDirective } from 'ngx-mask';
import { AccountService } from '../../../../../core/services/account.service';
import { amountLessThanBalance } from '../../../../../shared/validators/amount.validator';
import { Router } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { CurrencyPipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-create-transfer',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    NgxCurrencyDirective,
    NgxMaskDirective,
    CurrencyPipe,
    AsyncPipe,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './create-transfer.component.html',
  styleUrl: './create-transfer.component.css',
})
export class CreateTransferComponent {
  private readonly transferService = inject(TransfersService);
  private readonly dialogService = inject(ConfirmDialogService);
  private readonly transactionsService = inject(TransactionsService);
  private readonly accountService = inject(AccountService);
  private readonly router = inject(Router);

  accountData$ = this.accountService.accountData$;
  accountData = toSignal(this.accountData$);

  transferForm!: FormGroup;
  todayISO = new Date().toISOString().split('T')[0];
  userBalance: number = 0;

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

    effect(() => {
      this.accountData();
      this.transferForm.get('amount')?.updateValueAndValidity();
    });
  }

  buildForm(): void {
    // this.getUserBalance();
    this.transferForm = new FormGroup({
      date: new FormControl(this.todayISO),
      toAccountId: new FormControl(null, Validators.required),
      amount: new FormControl(null, [
        Validators.required,
        amountLessThanBalance(() => this.accountData()?.balance ?? 0),
      ]),
      description: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
      ]),
    });
  }

  // getUserBalance(): void {
  //   this.accountService.getBalance().subscribe({
  //     next: (res) => {
  //       this.userBalance = res.balance;
  //     },
  //     error: (err) => {
  //       console.error('Erro ao obter saldo do usuário:', err);
  //     },
  //   });
  // }

  saveTransfer(transactionData: Transfer): void {
    this.transferService.createTransfer(transactionData).subscribe({
      next: (res) => {
        this.createExpense();
        this.dialogService
          .confirm({
            title: 'Sucesso',
            message: 'Transferência criada com sucesso!',
            type: 'success',
            confirmText: 'OK',
            cancelText: '',
          })
          .subscribe(() => {
            this.transferForm.reset();
            this.accountService.refreshBalance();
          });
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  createExpense(): void {
    this.transactionsService
      .createTransaction({
        date: this.todayISO,
        description:
          'Transferência para ' + this.transferForm.get('toAccountId')?.value,
        amount: this.transferForm.get('amount')?.value,
        type: TransactionTypes.EXPENSE,
        id: '',
      })
      .subscribe({
        next: (res) => {        
          console.log('Transação de despesa criada:', res);
        },
        error: (err) => {
          console.error('Erro ao criar transação de despesa:', err);
        },
      });
  }

  onSubmit() {
    const payload: Transfer = this.transferForm.getRawValue();
    this.saveTransfer(payload);
  }

  backToList(): void {
    this.router.navigate(['/transferencia']);
  }
}
