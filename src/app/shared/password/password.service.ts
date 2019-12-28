import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  constructor(private httpClient: HttpClient) {}

  sendResetEmail(email) {
    return new Promise(resolve => {
      this.httpClient.post<{message: string}>
      ('http://localhost:3000/api/v1/users/reset-password', {email})
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
      ('http://localhost:3000/api/v1/auth/reset', {email, token, newPassword})
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
