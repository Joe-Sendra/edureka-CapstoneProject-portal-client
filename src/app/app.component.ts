import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { LoginComponent } from './login/login.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { StudentDashboardComponent } from './student/student-dashboard/student-dashboard.component';
import { AuthService } from './auth/auth.service';
import { AppNavbarService } from './app-navbar.service';
import { NavBarLink } from './navbar/navbar-link.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'portal-client';

  navbarLinks: Array<NavBarLink>;
  isLoggedIn = false;
  loggedInRole = '';
  loginSub: Subscription;
  roleSub: Subscription;

  constructor(
    private router: Router,
    private authService: AuthService,
    private navbarService: AppNavbarService) {
    this.router.config.unshift(
      { path: 'login', component: LoginComponent },
      { path: 'logout', component: LoginComponent, data: {isLogout: true} },
      { path: 'admin', component: AdminDashboardComponent },
      { path: 'student', component: StudentDashboardComponent }
    );
    console.log(this.router.config);

    this.navbarLinks = this.navbarService.getNavbarLinks();
  }

  ngOnInit() {
    this.loginSub = this.authService.getLoginStatus().subscribe(status => {
      this.isLoggedIn = status;
    });
    this.roleSub = this.authService.getRole().subscribe(authRole => {
      this.loggedInRole = authRole;
    });
  }

  ngOnDestroy() {
    this.loginSub.unsubscribe();
    this.roleSub.unsubscribe();
  }
}
