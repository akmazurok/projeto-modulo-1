import { Component, inject } from '@angular/core';
import { RouterService } from '../../../core/services/router.service';
import { TransferPages } from './constants/transfer-pages';
import { AsyncPipe } from '@angular/common';
import { CreateTransferComponent } from './components/create-transfer/create-transfer.component';
import { ListTransfersComponent } from './components/list-transfers/list-transfers.component';

@Component({
  selector: 'app-transfers',
  imports: [AsyncPipe, CreateTransferComponent, ListTransfersComponent],
  templateUrl: './transfers.component.html',
  styleUrl: './transfers.component.css'
})
export class TransfersComponent {
  private readonly routerService = inject(RouterService);

    page$ = this.routerService.getTransferPage();
    pagesEnum = TransferPages

}
