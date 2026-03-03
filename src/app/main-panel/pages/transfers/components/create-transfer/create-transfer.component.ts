import { Component, inject } from '@angular/core';
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
import { RouterService } from '../../../../../core/services/router.service';
import { TransferPages } from '../../constants/transfer-pages';

@Component({
  selector: 'app-create-transfer',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    NgxCurrencyDirective,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './create-transfer.component.html',
  styleUrl: './create-transfer.component.css',
})
export class CreateTransferComponent {
  private readonly transferService = inject(TransfersService);
  private readonly dialogService = inject(ConfirmDialogService);
  private readonly transactionsService = inject(TransactionsService);
  private readonly routerService = inject(RouterService);

  transferForm!: FormGroup;
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
  }

  buildForm(): void {
    this.transferForm = new FormGroup({
      date: new FormControl(this.todayISO),
      toAccountId: new FormControl(null, Validators.required),
      amount: new FormControl(null, Validators.required),
      description: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
      ]),
    });
  }

  saveTransfer(transactionData: any): void {
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
    this.routerService.setTransferPage(TransferPages.LIST);
  }
}
