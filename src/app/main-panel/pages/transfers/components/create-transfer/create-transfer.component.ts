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
import { CurrencyPipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { CURRENCY_OPTIONS } from '../../../../../shared/config/currency.config';
import { AccountMaskPipe } from '../../../../../shared/pipes/account-mask.pipe';
import { Account } from '../../../../../shared/models/account.model';

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
   
  ],
  providers: [provideNativeDateAdapter(), AccountMaskPipe],
  templateUrl: './create-transfer.component.html',
  styleUrl: './create-transfer.component.css',
})
export class CreateTransferComponent {
  private readonly transferService = inject(TransfersService);
  private readonly dialogService = inject(ConfirmDialogService);
  private readonly transactionsService = inject(TransactionsService);
  private readonly accountService = inject(AccountService);
  private readonly router = inject(Router);
  private accountPipe = inject(AccountMaskPipe);

  accountData = toSignal(this.accountService.accountData$, {
    initialValue: { balance: 0 } as Account,
  });


  transferForm!: FormGroup;
  currencyOptions = CURRENCY_OPTIONS;

  constructor() {
    effect(() => {
      const balance = this.accountData()?.balance;
      if (balance !== undefined) {
        this.transferForm.get('amount')?.updateValueAndValidity();
      }
    });
  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.transferForm = new FormGroup({
      date: new FormControl(new Date(), Validators.required),
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

  onSubmit() {
    const payload: Transfer = this.transferForm.getRawValue();
    this.saveTransfer(payload);
  }

  saveTransfer(transferData: Transfer): void {
    this.transferService.createTransfer(transferData).subscribe({
      next: () => {
        this.createExpense(transferData);
        this.dialogService
          .confirm({
            title: 'Sucesso',
            message: 'Transferência criada com sucesso!',
            type: 'success',
            confirmText: 'OK',
            cancelText: '',
          })
          .subscribe((result) => {
            if (result === true) {
              this.accountService
                .updateBalance(transferData.amount, 'expense')
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

  createExpense(transferData: Transfer): void {
    this.transactionsService
      .createTransaction({
        ...transferData,
        description:
          'Transferência para ' +
          this.accountPipe.transform(
            this.transferForm.get('toAccountId')?.value,
          ),
        type: TransactionTypes.EXPENSE,
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

  updateBalance(amount: number, type: any) {
    this.accountService.updateBalance(amount, type);
  }

  backToList(): void {
    this.router.navigate(['/transferencia']);
  }
}
