import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { NavBarLink } from './navbar/navbar-link.model';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { StudentDashboardComponent } from './student/student-dashboard/student-dashboard.component';
import { AuthService } from './auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'portal-client';

  navbarLinks: Array<NavBarLink>;
  isLoggedIn = false;
  loginSub: Subscription;

  constructor(private router: Router, private authService: AuthService) {
    this.router.config.unshift(
      { path: 'login', component: LoginComponent },
      { path: 'logout', component: LoginComponent, data: {isLogout: true} },
      { path: 'admin', component: AdminDashboardComponent },
      { path: 'student', component: StudentDashboardComponent }
    );
    console.log(this.router.config);

    // TODO create a service for links
    this.navbarLinks = [
      {
        text: 'home',
        type: 'routerLink',
        path: '/home',
        loggedInRequired: false,
        loggedOutRequired: false
      },
      {
        text: 'login',
        type: 'routerLink',
        path: '/login',
        loggedInRequired: false,
        loggedOutRequired: true
      },
      {
        text: 'logout',
        type: 'routerLink',
        path: '/logout',
        loggedInRequired: true,
        loggedOutRequired: false
      }
    ];
  }

  ngOnInit() {
    this.loginSub = this.authService.getLoginStatus().subscribe(status => {
      this.isLoggedIn = status;
    });
  }

  ngOnDestroy() {
    this.loginSub.unsubscribe();
  }
}
