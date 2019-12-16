import { Component, Input } from '@angular/core';

import { NavBarLink } from './navbar-link.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  @Input()links: Array<NavBarLink>;
  @Input()brand: string;
  @Input()isLoggedIn = false;
  @Input()role = '';
  @Input()showLoggedInUser = false;
  @Input()loggedInUser = null;

  public isCollapsed = true;
}
