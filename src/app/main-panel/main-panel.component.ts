import { Component, inject } from '@angular/core';
import { Pages } from '../constants/pages.enum';
import { RouterService } from '../core/services/router.service';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-panel',
  imports: [RouterOutlet],
  templateUrl: './main-panel.component.html',
  styleUrl: './main-panel.component.css',
})
export class MainPanelComponent {
  private readonly routerService = inject(RouterService);

  page$ = this.routerService.getCurrentPage();
  pages = Pages;
}
