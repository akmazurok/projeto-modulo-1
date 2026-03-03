import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { LoanService } from './services/loan.service';
import { NgxCurrencyDirective } from 'ngx-currency';
import { LoanType } from './models/loan-type.model';
import { Loan } from './models/loan.model';

@Component({
  selector: 'app-loan',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    NgxCurrencyDirective,
  ],
  templateUrl: './loan.component.html',
  styleUrl: './loan.component.css',
})
export class LoanComponent {
  private readonly loanService = inject(LoanService);

  loanForm!: FormGroup;
  simulacao: any = null;
  loan: Loan | null = null;
  loanTypes: LoanType[] = [
    { type: 'personal', label: 'Empréstimo Pessoal', interestRate: 2.5 },
    { type: 'consigned', label: 'Consignado', interestRate: 1.2 },
    { type: 'business', label: 'Empresarial', interestRate: 3.1 },
  ];

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
    this.listenLoanTypeChanges();
    this.calcularTotal();
  }

  onSubmit(): void {}

  buildForm(): void {
    this.loanForm = new FormGroup({
      valor: new FormControl(null, [Validators.required]),
      tipo: new FormControl(null, [Validators.required]),
      parcelas: new FormControl(null, [Validators.required, Validators.min(1)]),
      taxaJuros: new FormControl({ value: null, disabled: true }),
      valorTotal: new FormControl({ value: null, disabled: true }),
      valorParcela: new FormControl({ value: null, disabled: true }),
    });
  }

  private listenLoanTypeChanges(): void {
    this.loanForm
      .get('tipo')
      ?.valueChanges.subscribe((loan: LoanType | null) => {
        if (loan) {
          this.loanForm.patchValue({
            taxaJuros: loan.interestRate,
          });
        } else {
          this.loanForm.patchValue({
            taxaJuros: null,
          });
        }
      });
  }

  private calcularTotal(): void {
    this.loanForm.get('valor')?.valueChanges.subscribe(() => {
      this.atualizarSimulacao();
    });

    this.loanForm.get('parcelas')?.valueChanges.subscribe(() => {
      this.atualizarSimulacao();
    });

    this.loanForm.get('taxaJuros')?.valueChanges.subscribe(() => {
      this.atualizarSimulacao();
    });
  }

  private atualizarSimulacao(): void {
    let valor = this.loanForm.get('valor')?.value;
    const parcelas = this.loanForm.get('parcelas')?.value;
    const taxa = this.loanForm.get('taxaJuros')?.value;

    if (typeof valor === 'string') {
      valor = parseFloat(valor.replace(/[^\d,.-]/g, '').replace(',', '.'));
    } else if (valor !== null && valor !== undefined) {
      valor = Number(valor);
    }

    if (valor > 0 && taxa > 0 && parcelas > 0) {
      this.simulacao = this.calcularSimulacao(valor, taxa, parcelas);

      this.loanForm.patchValue(
        {
          valorTotal: this.simulacao.valorTotal,
          valorParcela: this.simulacao.valorParcela,
        },
        { emitEvent: false },
      );
     
    } else {
      this.simulacao = null;
      this.loanForm.patchValue(
        {
          valorTotal: null,
          valorParcela: null,
        },
        { emitEvent: false },
      );
    }
  }

  private calcularSimulacao(
    valor: number,
    taxaAnual: number,
    numeroParcelas: number,
  ): any {
    const taxaMensal = taxaAnual / 100 / 12;

    let valorParcela = 0;
    let valorTotal = 0;
    let jurosTotal = 0;

    if (taxaMensal === 0) {
      valorParcela = valor / numeroParcelas;
      valorTotal = valor;
      jurosTotal = 0;
    } else {
      const fatorJuro = Math.pow(1 + taxaMensal, numeroParcelas);
      valorParcela = (valor * taxaMensal * fatorJuro) / (fatorJuro - 1);
      valorTotal = valorParcela * numeroParcelas;
      jurosTotal = valorTotal - valor;
    }

    return {
      valorParcela: Math.round(valorParcela * 100) / 100,
      valorTotal: Math.round(valorTotal * 100) / 100,
      jurosTotal: Math.round(jurosTotal * 100) / 100,
      taxaAnual: taxaAnual,
      taxaMensal: Math.round(taxaMensal * 10000) / 10000,
      numeroParcelas: numeroParcelas,
    };
  }
}
