import { LoanType } from './loan-type.model';

export interface Loan {
  id: number;
  tipo: LoanType;
  taxaJuros: number;
  jurosTotal: number;
  taxaMensal: number;
  valorPrincipal: number;
  valorParcela: number;
  numeroParcelas: number;
  valorTotal: number;
}
