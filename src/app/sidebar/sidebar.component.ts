import { Component, inject } from '@angular/core';
import { Pages } from '../constants/pages.enum';
import { MenuItem } from '../models/menu-item.model';
import { MatButtonModule } from '@angular/material/button';
import { RouterService } from '../core/services/router.service';

@Component({
  selector: 'app-sidebar',
  imports: [MatButtonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  private readonly routerService = inject(RouterService);

  menuItems: MenuItem[] = [
    { label: 'Dashboard', selected: true, page: Pages.DASHBOARD },
    { label: 'Extrato', selected: false, page: Pages.EXTRACT },
    { label: 'Transferência', selected: false, page: Pages.TRANSACTIONS },
    { label: 'Crédito', selected: false, page: Pages.CREDIT },
  ];

  redirectToPage(page: Pages): void {
    this.routerService.setCurrentPage(page);
  }
}
