import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  constructor(private httpClient: HttpClient) {}

  sendResetEmail(email) {
    return new Promise(resolve => {
      this.httpClient.post<{message: string}>
      (`${environment.apiUrl}/users/reset-password`, {email})
      .subscribe(
        response => {
          resolve(true);
        },
        err => {
          console.log('Error resetting password: ', err.error.message);
          resolve(false);
        }
      );
    });
  }

  resetPassword(email, token, newPassword) {
    return new Promise(resolve => {
      this.httpClient.post<{message: string}>
      (`${environment.apiUrl}/auth/reset`, {email, token, newPassword})
      .subscribe(
        response => {
          resolve(true);
        },
        err => {
          console.log('Error resetting password: ', err.error.message);
          resolve(false);
        }
      );
    });
  }

  changePassword(email: string, oldPassword: string, newPassword: string) {
    return new Promise(resolve => {
      // /api/v1/auth/change
      this.httpClient.post<{message: string}>
      (`${environment.apiUrl}/auth/change`, {email, oldPassword, newPassword})
      .subscribe(
        response => {
          resolve(true);
        },
        err => {
          console.log('Error resetting password: ', err.error.message);
          resolve(false);
        }
      );
    });
  }

}
