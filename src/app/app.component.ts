import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MainPanelComponent } from './main-panel/main-panel.component';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../environments/environment.development';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, SidebarComponent, MainPanelComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'projeto-modulo-1';
  constructor(private translate: TranslateService) {
    this.translate.addLangs(['pt-br', 'pt-pt']);
    this.translate.setFallbackLang(environment.defaultLang);
    const browserLang = this.translate.getBrowserCultureLang();
    this.translate.use(
      browserLang?.match(/pt-br|pt-pt/) ? browserLang : environment.defaultLang,
    );
  }
}
