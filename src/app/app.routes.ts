import { Routes } from '@angular/router';
import { DashboardComponent } from './main-panel/pages/dashboard/dashboard.component';
import { TransfersComponent } from './main-panel/pages/transfers/transfers.component';
import { LoanComponent } from './main-panel/pages/loan/loan.component';
import { TransactionsComponent } from './main-panel/pages/transactions/transactions.component';
import { CreateTransactionComponent } from './main-panel/pages/transactions/components/create-transaction/create-transaction.component';
import { CreateTransferComponent } from './main-panel/pages/transfers/components/create-transfer/create-transfer.component';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'transferencia', component: TransfersComponent },
  { path: 'transferencia/criar', component: CreateTransferComponent },
  { path: 'credito', component: LoanComponent },
  { path: 'transacoes', component: TransactionsComponent },
  { path: 'transacoes/criar', component: CreateTransactionComponent },
  { path: 'transacoes/editar/:id', component: CreateTransactionComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];
