import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  constructor(private httpClient: HttpClient) {}

  resetPassword(email) {
    // /api/v1/users/reset-password
    this.httpClient.post<{students: []}>
    ('http://localhost:3000/api/v1/users/reset-password', {email})
    .subscribe(
      response => {
        console.log(response);
      },
      err => console.log('Error resetting password')
    );
  }
}
