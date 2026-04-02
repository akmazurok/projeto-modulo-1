import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from '../../main-panel/pages/transfers/models/login.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated = signal<boolean>(this.hasToken());
  user = signal<string | null>(this.getUserFromToken());

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

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUserFromToken(): string {
    const token = localStorage.getItem('token');

    if (!token) return '';

    const payload = this.decodeJwt(token);    
    return payload.name;
  }

  decodeJwt(token: string): any {
    const payload = token.split('.')[1];
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');

    const decoded = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + c.charCodeAt(0).toString(16).padStart(2, '0'))
        .join(''),
    );
    return JSON.parse(decoded);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isAuthenticated.set(false);
    this.router.navigate(['/login']);
  }
}
