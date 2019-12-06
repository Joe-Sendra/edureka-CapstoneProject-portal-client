import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NavBarLink } from './navbar/navbar-link.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'portal-client';

  navbarLinks: Array<NavBarLink>;

  constructor(private router: Router) {
    this.router.config.unshift(
      { path: 'login', component: LoginComponent }
    );
    console.log(this.router.config);

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
}
