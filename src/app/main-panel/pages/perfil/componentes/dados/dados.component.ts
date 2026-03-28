import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { AccountService } from '../../../../../core/services/account.service';
import { Account } from '../../../../../shared/models/account.model';
import { DatePipe } from '@angular/common';
import { CpfPipe } from '../../../../../shared/pipes/cpf.pipe';

@Component({
  selector: 'app-dados',
  imports: [MatCardModule, MatIconModule, MatDividerModule, DatePipe, CpfPipe],
  templateUrl: './dados.component.html',
  styleUrl: './dados.component.css',
})
export class DadosComponent {
  private readonly accountService = inject(AccountService);

  user?: Account;
  ngOnInit(): void {
    this.loadAccount();
  }

  loadAccount() {
    this.accountService.getAccount().subscribe({
      next: (data) => {
        this.user = data;
        console.log('Dados carregados:', data);
      },
      error: (err) => console.error('Erro ao buscar conta', err),
    });
  }
}
