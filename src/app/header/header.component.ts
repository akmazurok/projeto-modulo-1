import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { map } from 'rxjs/operators';
import { UserService } from '../core/services/user.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [MatButtonModule, MatIconModule, AsyncPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  private readonly userService = inject(UserService);

  userName$ = this.userService.userName$;
  firstName$ = this.userName$.pipe(map((name) => name?.split(' ')[0] || ''));
}
