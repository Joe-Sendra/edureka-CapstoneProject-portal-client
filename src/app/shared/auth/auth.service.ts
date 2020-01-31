import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthService {

  private authStatusListener = new BehaviorSubject<{isLoggedIn: boolean, user: string, _id: string, role: string, token: string }>({
    isLoggedIn: null,
    user: null,
    _id: null,
    role: null,
    token: null
  });

  constructor(private httpClient: HttpClient, private router: Router) {}

  authenticateUser(user: {email: string, password: string}, returnUrl): Promise<boolean | {error: string}> {
    return new Promise(resolve => {
      this.httpClient.post<{_id: string, token: string, role: string}>
        ('http://localhost:3000/api/v1/auth/login', user).subscribe(res => {

        const token = res.token;
        const role = res.role;
        const _id = res._id;
        if (token) {
          this.authStatusListener.next({isLoggedIn: true, user: user.email, _id, role, token});
          this.saveAuthData(token, user.email);
          if (returnUrl) {
            // login successful so redirect to return url
            this.router.navigateByUrl(returnUrl);
          } else {
            this.router.navigate([role]);
          }
          resolve(true);
        }
      }, err => {
        this.logout();
        resolve(false);
      });
    });
  }

  getAuthStatusListener() {
    return this.authStatusListener;
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    this.authStatusListener.next({
      isLoggedIn: false,
      user: null,
      _id: null,
      role: null,
      token: null
    });

    this.clearAuthData();
    this.router.navigate(['/login']);
  }

  private saveAuthData(token: string, user: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', user);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (!token) {
      return;
    }
    return {
      token,
      user
    };
  }
}
