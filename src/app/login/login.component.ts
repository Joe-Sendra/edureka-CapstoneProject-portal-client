import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  isLoggedIn: boolean;
  authSub: Subscription;

  constructor(private router: Router, private authService: AuthService) {

  }

  ngOnInit() {
    this.authSub = this.authService.getLoginStatus().subscribe(status => {
      this.isLoggedIn = status;
    });
  }

  loginUser() {
    this.authService.updateLoginStatus(true);
    this.router.navigate(['student']);
  }

  loginAdmin() {
    this.authService.updateLoginStatus(true);
    this.router.navigate(['admin']);
  }

  logout() {
    this.authService.updateLoginStatus(false);
  }

  ngOnDestroy() {
    this.authSub.unsubscribe();
  }

}
