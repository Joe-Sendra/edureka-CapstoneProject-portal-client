import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthService {

  private isLoggedIn = new BehaviorSubject<boolean>(null);
  private role = new BehaviorSubject<string>(null);

  constructor() {
    // TODO change this once implementing auto login with valid token
    this.isLoggedIn.next(false);
  }

  getLoginStatus() {
    return this.isLoggedIn;
  }

  getRole() {
    return this.role;
  }

  updateLoginStatus(status: boolean, role: string) {
    this.isLoggedIn.next(status);
    this.role.next(role);
  }
}
