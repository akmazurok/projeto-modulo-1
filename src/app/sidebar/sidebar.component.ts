import { Component } from '@angular/core';
import { MenuItem } from '../shared/models/menu-item.model';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-sidebar',
  imports: [MatButtonModule, RouterModule, TranslatePipe],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  menuItems: MenuItem[] = [
    {
      label: 'SIDEBAR.DASHBOARD',
      routerLinkActive: 'active',
      routerLink: '/dashboard',
    },
    { label: 'SIDEBAR.PROFILE', routerLinkActive: 'active', routerLink: '/perfil' },
    {
      label: 'SIDEBAR.TRANSACTIONS',
      routerLinkActive: 'active',
      routerLink: '/transacoes',
    },
    {
      label: 'SIDEBAR.TRANSFER',
      routerLinkActive: 'active',
      routerLink: '/transferencia',
    },
    { label: 'SIDEBAR.LOAN', routerLinkActive: 'active', routerLink: '/credito' },
  ];
}
