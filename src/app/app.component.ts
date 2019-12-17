import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { LoginComponent } from './shared/login/login.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { StudentDashboardComponent } from './student/student-dashboard/student-dashboard.component';
import { AuthService } from './shared/auth/auth.service';
import { AppNavbarService } from './app-navbar.service';
import { NavBarLink } from './main/navbar/navbar-link.model';
import { AdminProfileComponent } from './admin/admin-profile/admin-profile.component';
import { AdminStudentsComponent } from './admin/admin-students/admin-students.component';
import { AdminPublishComponent } from './admin/admin-publish/admin-publish.component';
import { AdminEnrollmentComponent } from './admin/admin-enrollment/admin-enrollment.component';
import { AdminSiteComponent } from './admin/admin-site/admin-site.component';
import { StudentProfileComponent } from './student/student-profile/student-profile.component';
import { StudentExamComponent } from './student/student-exam/student-exam.component';
import { RegisterComponent } from './shared/register/register.component';

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
  loggedInUser = null;
  authSub: Subscription;

  constructor(
    private router: Router,
    private authService: AuthService,
    private navbarService: AppNavbarService) {
    // TODO add auth guards, maybe move this to a service/config file
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
        { path: 'publish/:id', component: AdminPublishComponent},
        { path: 'enroll', component: AdminEnrollmentComponent},
        { path: 'register', component: RegisterComponent },
        { path: 'site', component: AdminSiteComponent}
       ]
      },
      { path: 'student',
        children: [
          { path: '', redirectTo: '/student/dashboard', pathMatch: 'full'},
          { path: 'dashboard', component: StudentDashboardComponent },
          { path: 'profile', component: StudentProfileComponent},
          { path: 'exams', component: StudentExamComponent}
        ]
      },
      { path: 'register', component: RegisterComponent }
    );

    this.navbarLinks = this.navbarService.getNavbarLinks();
  }

  ngOnInit() {
    this.authSub = this.authService.getAuthStatusListener().subscribe(status => {
      this.isLoggedIn = status.isLoggedIn;
      this.loggedInRole = status.role;
      this.loggedInUser = status.user;
    });
  }

  ngOnDestroy() {
    this.authSub.unsubscribe();
  }

}
