import { Injectable } from '@angular/core';
import { Admin } from '../admin.model';

@Injectable()
export class AdminUsersService {

  adminUsers: Admin[] = [];

  addUser(newUser) {
    const adminUser: Admin = {
      email: newUser.email,
      name: {
        first: newUser.firstName,
        last: newUser.lastName
      },
      office: {
        building: newUser.officeBuilding,
        number: newUser.officeNumber
      },
      class: newUser.class ? newUser.class : [null]
    };

    this.adminUsers.push(adminUser);
  }

  getUsers() {
    return this.adminUsers.slice();
  }

}
