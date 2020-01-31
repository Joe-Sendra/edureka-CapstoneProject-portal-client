import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  isLoggedIn: boolean = null;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.getAuthStatusListener().subscribe(authInfo => {
      this.isLoggedIn = authInfo.isLoggedIn;
    });
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.isLoggedIn) {
      this.router.navigate(['/login']);
    }
    return true;

  }

}
