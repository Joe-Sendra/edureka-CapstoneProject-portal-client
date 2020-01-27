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

  getUser(userID) {
    return new Promise(resolve => {
      this.httpClient.get<any>
      (`http://localhost:3000/api/v1/faculty/${userID}`)
        .subscribe(user => {
          console.log(user);
          resolve(user);
        },
        (error => {
          resolve(false);
        })
      );
    });
  }

  updateUser(_id, updateUserInfo): Promise<{isSuccess: boolean, message: string}> {
    return new Promise(resolve => {
      this.httpClient.patch<any>('http://localhost:3000/api/v1/users',
        {
          _id,
          updateUserInfo
        }
      )
        .subscribe(
          response => {
            if (response.isSuccess) {
              resolve({isSuccess: true, message: response.message});
            }
            resolve({isSuccess: false, message: response.message});
          },
          err => {
            resolve({isSuccess: true, message: 'Error retrieving users'});
            console.log(err, 'Error retrieving users');
          }
        );
    });
  }

}
