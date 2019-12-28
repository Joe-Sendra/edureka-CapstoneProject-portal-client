import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth/auth.service';
import { Admin } from 'src/app/admin/admin.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  authSub: Subscription;
  routeSub: Subscription;
  loginForm: FormGroup;

  returnUrl: string;

  loginMessage = {
    isSuccess: null,
    message: null
  };

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute
    ) {
      this.routeSub = this.route.data.subscribe(data => {
        if (data.isLogout) {
          this.authService.logout();
        }
      });
    }

  adminUsers: Admin[] = []; // TODO remove. for dev only

  // TODO check for is blocked before logging in

  ngOnInit() {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl;
    this.initForm();
  }

  initForm() {
    const email = '';
    const password = '';
    this.loginForm = new FormGroup({
      email: new FormControl(email, [Validators.required, Validators.email]),
      password: new FormControl(password, Validators.required)
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onLoginSubmit(email, password) {
    const user = {
      email,
      password
    };
    if (!this.authService.authenticateUser(user, this.returnUrl)) {
      this.loginMessage.isSuccess = false;
      this.loginMessage.message = 'Invalid email or password!';
    }
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

}
