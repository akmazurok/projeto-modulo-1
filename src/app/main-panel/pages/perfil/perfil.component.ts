import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-perfil',
  imports: [RouterModule, MatTabsModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css',
})
export class PerfilComponent {
  links = [
    { label: 'Dados', path: 'dados' },
    { label: 'Segurança', path: 'seguranca' },
  ];
}
