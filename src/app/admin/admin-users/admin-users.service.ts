import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminUsersService {

  constructor(private httpClient: HttpClient) {}

  addUser(newUser) {
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
      (`${environment.apiUrl}/users`, {studentEnroll: adminUser})
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
      (`${environment.apiUrl}/faculty/${userID}`)
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
      this.httpClient.patch<any>(`${environment.apiUrl}/users`,
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
