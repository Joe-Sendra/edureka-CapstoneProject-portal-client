import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { LoginComponent } from './login/login.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { StudentDashboardComponent } from './student/student-dashboard/student-dashboard.component';
import { AuthService } from './auth/auth.service';
import { AppNavbarService } from './app-navbar.service';
import { NavBarLink } from './navbar/navbar-link.model';
import { AdminProfileComponent } from './admin/admin-profile/admin-profile.component';
import { AdminStudentsComponent } from './admin/admin-students/admin-students.component';
import { AdminPublishComponent } from './admin/admin-publish/admin-publish.component';
import { AdminEnrollmentComponent } from './admin/admin-enrollment/admin-enrollment.component';
import { AdminSiteComponent } from './admin/admin-site/admin-site.component';

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
      { path: 'admin',
       children: [
        { path: '', redirectTo: '/admin/dashboard', pathMatch: 'full'},
        { path: 'dashboard', component: AdminDashboardComponent, pathMatch: 'full'},
        { path: 'profile', component: AdminProfileComponent},
        { path: 'students', component: AdminStudentsComponent},
        { path: 'publish', component: AdminPublishComponent},
        { path: 'enroll', component: AdminEnrollmentComponent},
        { path: 'site', component: AdminSiteComponent}
       ]
      },
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
