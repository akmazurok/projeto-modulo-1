import { Component } from '@angular/core';

import { MenuItem } from '../models/menu-item.model';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [MatButtonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  menuItems: MenuItem[] = [
    {
      label: 'Dashboard',
      routerLinkActive: 'active',
      routerLink: '/dashboard',
    },
    { label: 'Perfil', routerLinkActive: 'active', routerLink: '/perfil' },
    {
      label: 'Extrato',
      routerLinkActive: 'active',
      routerLink: '/transacoes',
    },
    {
      label: 'Transferência',
      routerLinkActive: 'active',
      routerLink: '/transferencia',
    },
    { label: 'Crédito', routerLinkActive: 'active', routerLink: '/credito' },
  ];
}
