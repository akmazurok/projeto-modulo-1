import { Component, inject, computed, ViewChild, effect } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CurrencyPipe } from '@angular/common';
import { TransfersService } from '../../services/transfers.service';
import { Transfer } from '../../models/transfer.model';
import { Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { SignedValuePipe } from '../../../../../shared/pipes/signed-value.pipe';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AccountMaskPipe } from '../../../../../shared/pipes/account-mask.pipe';

@Component({
  selector: 'app-list-transfers',
  imports: [
    DatePipe,
    CurrencyPipe,  
    SignedValuePipe,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    AccountMaskPipe,
  ],
  templateUrl: './list-transfers.component.html',
  styleUrl: './list-transfers.component.css',
})
export class ListTransfersComponent {
  private readonly transfersService = inject(TransfersService);
  private readonly router = inject(Router);

  transfers = toSignal(this.transfersService.transfers$, {
    initialValue: [] as Transfer[],
  });

  sortedTransfers = computed(() =>
    [...this.transfers()].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    ),
  );

  dataSource = new MatTableDataSource<Transfer>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['date', 'toAccountId', 'description', 'amount'];

  constructor() {
    effect(() => {
      this.dataSource.data = this.sortedTransfers();
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  redirectToCreate(): void {
    this.router.navigate(['/transferencia/criar']);
  }
}
