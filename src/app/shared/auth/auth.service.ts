import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthService {

  private isLoggedIn = new BehaviorSubject<boolean>(null);
  private role = new BehaviorSubject<string>(null);
  private user = new BehaviorSubject<any>(null);

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

  getUser() {
    return this.user;
  }

  updateLoginStatus(status: boolean, role: string, user?: any) {
    this.isLoggedIn.next(status);
    if (user) {
      this.user.next(user);
    } else {
      this.user.next(null);
    }
    this.role.next(role);
  }
}
