import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthService {

  private authStatusListener = new BehaviorSubject<{isLoggedIn: boolean, user: string, _id: string, role: string }>({
    isLoggedIn: null,
    user: null,
    _id: null,
    role: null
  });

  constructor(private httpClient: HttpClient, private router: Router) {}

  authenticateUser(user: {email: string, password: string}, returnUrl) {
    this.httpClient.post<{_id: string, token: string, role: string}>
      ('http://localhost:3000/api/v1/auth/login', user).subscribe(res => {
      const token = res.token;
      const role = res.role;
      const _id = res._id;
      if (token) {
        this.authStatusListener.next({isLoggedIn: true, user: user.email, _id, role});
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
      _id: null,
      role: null
    });

    this.router.navigate(['/']);
  }

}
