import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminUsersService {

  constructor(private httpClient: HttpClient) {}

  addUser(newUser) {
    // TODO define user model that works for both students and faculty
    const adminUser = {
      email: newUser.email,
      password: newUser.password,
      role: 'admin',
      name: {
        first: newUser.firstName,
        last: newUser.lastName
      },
      faculty: {
        office: {
          building: newUser.officeBuilding,
          number: newUser.officeNumber
        }
      },
      class: newUser.class ? newUser.class : [null]
    };

    return new Promise(resolve => {
      this.httpClient.post<any>
      ('http://localhost:3000/api/v1/users', {studentEnroll: adminUser})
        .subscribe(responseData => {
          console.log(responseData);
          resolve(true);
        },
        (error => {
          resolve(false);
        })
      );
    });
  }

}
