import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private router: Router, private authService: AuthService) {}

  loginUser() {
    // TODO update navbar to student links
    // change state to isLoggedIn
    // create then display StudentDashboardComponent

    this.authService.updateLoginStatus(true);
    this.router.navigate(['student']);
  }
  loginAdmin() {
    // TODO update navbar to admin links
    // change state to isLoggedIn
    // display AdminDashboardComponent
    this.authService.updateLoginStatus(true);
    this.router.navigate(['admin']);
  }
  logout() {
    this.authService.updateLoginStatus(false);
  }
}
