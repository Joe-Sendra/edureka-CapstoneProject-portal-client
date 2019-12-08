import { Injectable } from '@angular/core';
import { NavBarLink } from './navbar/navbar-link.model';

@Injectable()
export class AppNavbarService {

  navbarLinks: NavBarLink[] = [
    {
      text: 'Home',
      type: 'routerLink',
      path: '/home',
      loggedInRequired: false,
      loggedOutRequired: false,
      requiresRole: false
    },
    {
      text: 'Dashboard',
      type: 'routerLink',
      path: '/admin',
      loggedInRequired: true,
      loggedOutRequired: false,
      requiresRole: true,
      role: 'admin'
    },
    {
      text: 'Dashboard',
      type: 'routerLink',
      path: '/student',
      loggedInRequired: true,
      loggedOutRequired: false,
      requiresRole: true,
      role: 'student'
    },
    {
      text: 'Login',
      type: 'routerLink',
      path: '/login',
      loggedInRequired: false,
      loggedOutRequired: true,
      requiresRole: false
    },
    {
      text: 'Logout',
      type: 'routerLink',
      path: '/logout',
      loggedInRequired: true,
      loggedOutRequired: false,
      requiresRole: false
    }
  ];

  getNavbarLinks() {
    return this.navbarLinks.slice();
  }

}
