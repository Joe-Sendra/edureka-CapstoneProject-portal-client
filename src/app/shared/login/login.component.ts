import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth/auth.service';
import { AdminUsersService } from 'src/app/admin/admin-users/admin-users.service';
import { Admin } from 'src/app/admin/admin.model';
import { StudentService } from 'src/app/student/student.service';

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

  constructor(
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute,
    private adminUsersService: AdminUsersService,
    private studentService: StudentService
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

  onLoginSubmit(email, password) {
    const user = {
      email,
      password
    };
    this.authService.authenticateUser(user, this.returnUrl);
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

}
