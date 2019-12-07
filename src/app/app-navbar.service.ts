import { Injectable } from '@angular/core';

@Injectable()
export class AppNavbarService {

  navbarLinks = [
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

  getNavbarLinks() {
    return this.navbarLinks.slice();
  }

}
