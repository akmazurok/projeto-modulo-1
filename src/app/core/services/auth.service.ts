import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from '../../main-panel/pages/transfers/models/login.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated = signal<boolean>(this.hasToken());

  constructor(private router: Router) {}

  login(login: Login): boolean {
    if (login.email === 'admin@banco.com' && login.password === '123456') {
      const fakeJwt =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm_Do28gU2lsdmEiLCJpZCI6MX0.QMaSpJuzPBoarRQtBVyFosDvc1XHUQvxQofsRc_CgZA';
      localStorage.setItem('token', fakeJwt);
      this.isAuthenticated.set(true);
      this.router.navigate(['/dashboard']);
      return true;
    }
    return false;
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isAuthenticated.set(false);
    this.router.navigate(['/login']);
  }
}
