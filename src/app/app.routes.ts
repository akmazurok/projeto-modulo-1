import { Routes } from '@angular/router';
import { DashboardComponent } from './main-panel/pages/dashboard/dashboard.component';
import { TransfersComponent } from './main-panel/pages/transfers/transfers.component';
import { LoanComponent } from './main-panel/pages/loan/loan.component';
import { TransactionsComponent } from './main-panel/pages/transactions/transactions.component';
import { CreateTransactionComponent } from './main-panel/pages/transactions/components/create-transaction/create-transaction.component';
import { CreateTransferComponent } from './main-panel/pages/transfers/components/create-transfer/create-transfer.component';
import { NotFoundComponent } from './main-panel/pages/not-found/not-found.component';
import { PerfilComponent } from './main-panel/pages/perfil/perfil.component';
import { DadosComponent } from './main-panel/pages/perfil/componentes/dados/dados.component';
import { SegurancaComponent } from './main-panel/pages/perfil/componentes/seguranca/seguranca.component';
import { LoginComponent } from './main-panel/pages/login/login.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'transferencia', component: TransfersComponent },
  { path: 'transferencia/criar', component: CreateTransferComponent },
  { path: 'credito', component: LoanComponent },
  { path: 'transacoes', component: TransactionsComponent },
  { path: 'transacoes/criar', component: CreateTransactionComponent },
  { path: 'transacoes/editar/:id', component: CreateTransactionComponent },
  {
    path: 'perfil',
    component: PerfilComponent,
    children: [
      { path: '', redirectTo: 'dados', pathMatch: 'full' },
      { path: 'dados', component: DadosComponent },
      { path: 'seguranca', component: SegurancaComponent },
    ],
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];
