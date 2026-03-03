import { Component, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CurrencyPipe } from '@angular/common';
import { TransfersService } from '../../services/transfers.service';
import { first } from 'rxjs/operators';
import { Transfer } from '../../models/transfer.model';
import { RouterService } from '../../../../../core/services/router.service';
import { TransferPages } from '../../constants/transfer-pages';
import { AccountMaskPipe } from '../../../../../shared/pipes/account-mask.pipe';

@Component({
  selector: 'app-list-transfers',
  imports: [DatePipe, CurrencyPipe, AccountMaskPipe],
  templateUrl: './list-transfers.component.html',
  styleUrl: './list-transfers.component.css',
})
export class ListTransfersComponent {
  private readonly transfersService = inject(TransfersService);
  private readonly routerService = inject(RouterService);

  transfers: Transfer[] = [];

  ngOnInit() {
    this.getTransfers();
  }

  getTransfers(): void {
    this.transfersService
      .getTransfers()
      .pipe(first())
      .subscribe({
        next: (res) => {
          this.transfers = res;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  redirectToCreate(): void {
    this.routerService.setTransferPage(TransferPages.CREATE);
  }
  
}
