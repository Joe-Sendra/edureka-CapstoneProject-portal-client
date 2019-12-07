import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthService {

  private isLoggedIn = new BehaviorSubject<boolean>(null);

  constructor() {
    this.isLoggedIn.next(false);
  }

  getLoginStatus() {
    return this.isLoggedIn;
  }

  updateLoginStatus(status: boolean) {
    this.isLoggedIn.next(status);
  }
}
