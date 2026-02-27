import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userNameSubject = new BehaviorSubject<string>(
    sessionStorage.getItem('userName') || '',
  );

  userName$ = this.userNameSubject.asObservable();

  setUserName(name: string) {
    sessionStorage.setItem('userName', name);
    this.userNameSubject.next(name);
  }

  clearUserName() {
    sessionStorage.removeItem('userName');
    this.userNameSubject.next('');
  }
}
