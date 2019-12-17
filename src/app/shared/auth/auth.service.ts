import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthService {

  private authStatusListener = new BehaviorSubject<{isLoggedIn: boolean, user: string, role: string }>({
    isLoggedIn: null,
    user: null,
    role: null
  });

  constructor(private httpClient: HttpClient, private router: Router) {}

  authenticateUser(user: {email: string, password: string}, returnUrl) {
    this.httpClient.post<{token: string, role: string}>
      ('http://localhost:3000/api/v1/auth/login', user).subscribe(res => {
      const token = res.token;
      const role = res.role;
      if (token) {
        this.authStatusListener.next({isLoggedIn: true, user: user.email, role});
        if (returnUrl) {
          // login successful so redirect to return url
          this.router.navigateByUrl(returnUrl);
        } else {
          this.router.navigate([role]);
        }
      }
    });
  }

  getAuthStatusListener() {
    return this.authStatusListener;
  }

  logout() {
    this.authStatusListener.next({
      isLoggedIn: false,
      user: null,
      role: null
    });

    this.router.navigate(['/']);
  }

}
