import { Injectable } from '@angular/core';
import { NavBarLink } from './main/navbar/navbar-link.model';

@Injectable()
export class AppNavbarService {

  navbarLinks: NavBarLink[] = [
    {
      enabled: true,
      text: 'Home',
      type: 'routerLink',
      path: '/home',
      loggedInRequired: false,
      loggedOutRequired: false,
      requiresRole: false
    },
    {
      enabled: false,
      text: 'Dashboard',
      type: 'routerLink',
      path: '/admin/dashboard',
      loggedInRequired: true,
      loggedOutRequired: false,
      requiresRole: true,
      role: 'admin'
    },
    {
      enabled: true,
      text: 'Students',
      type: 'routerLink',
      path: '/admin/students',
      loggedInRequired: true,
      loggedOutRequired: false,
      requiresRole: true,
      role: 'admin'
    },
    {
      enabled: true,
      text: 'Publish',
      type: 'routerLink',
      path: '/admin/publish',
      loggedInRequired: true,
      loggedOutRequired: false,
      requiresRole: true,
      role: 'admin'
    },
    {
      enabled: true,
      text: 'Enrollment',
      type: 'routerLink',
      path: '/admin/enroll',
      loggedInRequired: true,
      loggedOutRequired: false,
      requiresRole: true,
      role: 'admin'
    },
    {
      enabled: true,
      text: 'Site',
      type: 'routerLink',
      path: '/admin/site',
      loggedInRequired: true,
      loggedOutRequired: false,
      requiresRole: true,
      role: 'admin'
    },
    {
      enabled: true,
      text: 'Profile',
      type: 'routerLink',
      path: '/admin/profile',
      loggedInRequired: true,
      loggedOutRequired: false,
      requiresRole: true,
      role: 'admin'
    },
    {
      enabled: false,
      text: 'Dashboard',
      type: 'routerLink',
      path: '/student/dashboard',
      loggedInRequired: true,
      loggedOutRequired: false,
      requiresRole: true,
      role: 'student'
    },
    {
      enabled: true,
      text: 'Exams',
      type: 'routerLink',
      path: '/student/exams',
      loggedInRequired: true,
      loggedOutRequired: false,
      requiresRole: true,
      role: 'student'
    },
    {
      enabled: true,
      text: 'Profile',
      type: 'routerLink',
      path: '/student/profile',
      loggedInRequired: true,
      loggedOutRequired: false,
      requiresRole: true,
      role: 'student'
    },
    {
      enabled: true,
      text: 'Login',
      type: 'routerLink',
      path: '/login',
      loggedInRequired: false,
      loggedOutRequired: true,
      requiresRole: false
    },
    {
      enabled: true,
      text: 'Logout',
      type: 'routerLink',
      path: '/logout',
      loggedInRequired: true,
      loggedOutRequired: false,
      requiresRole: false
    },
    {
      enabled: true,
      text: 'Register',
      type: 'routerLink',
      path: '/register',
      loggedInRequired: false,
      loggedOutRequired: true,
      requiresRole: false
    }
  ];

  getNavbarLinks() {
    // return this.navbarLinks.slice();
    return this.navbarLinks.filter(link => link.enabled).slice();
  }

}
