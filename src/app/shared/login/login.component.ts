import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { AdminUsersService } from 'src/app/admin/admin-users/admin-users.service';
import { Admin } from 'src/app/admin/admin.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  authSub: Subscription;
  routeSub: Subscription;

  constructor(
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute,
    private adminUsersService: AdminUsersService
    ) {
    this.routeSub = this.route.data.subscribe(data => {
      if (data.isLogout) {
        this.authService.updateLoginStatus(false, null, null);
      }
    });
  }

  adminUsers: Admin[] = []; // TODO remove. for dev only

  ngOnInit() {
    this.authSub = this.authService.getLoginStatus().subscribe();
  }

  loginUser() {
    this.authService.updateLoginStatus(true, 'student', null);
    this.router.navigate(['student']);
  }

  loginAdmin() {
    const user = this.adminUsersService.getUsers();
    this.authService.updateLoginStatus(true, 'admin', user[0]);
    this.router.navigate(['admin']);
  }

  ngOnDestroy() {
    this.authSub.unsubscribe();
    this.routeSub.unsubscribe();
  }

}
