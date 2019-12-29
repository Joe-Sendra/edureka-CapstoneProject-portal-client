import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { AdminUsersService } from '../admin-users.service';
import { Admin } from '../../admin.model';

@Component({
  selector: 'app-admin-users-edit',
  templateUrl: './admin-users-edit.component.html',
  styleUrls: ['./admin-users-edit.component.css']
})
export class AdminUsersEditComponent implements OnInit {

  // editMode = false;
  userForm: FormGroup;
  // isViewUsers = false;
  // adminUsers: Admin[];
  // adminUser: Admin;

  constructor(private adminUserService: AdminUsersService) {}

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    // this.adminUsers = this.adminUserService.getUsers();
    let newUser = {
      email: '',
      password: '',
      name: {
        first: '',
        last: '',
      },
      faculty: {
        office: {
          building: '',
          number: ''
        }
      },
      class: [null]
    };

    // if (this.editMode) {
    //   newUser.email = 'fakeData'; // TODO get userEmail from service/DB/params, etc...
    //   // TODO get all Admin fields
    // }

    this.userForm = new FormGroup({
      email: new FormControl(newUser.email, [Validators.required, Validators.email]),
      password: new FormControl(newUser.password, [Validators.required, Validators.minLength(8)]),
      firstName: new FormControl(newUser.name.first, Validators.required),
      lastName: new FormControl(newUser.name.last, Validators.required),
      officeBuilding: new FormControl(newUser.faculty.office.building),
      officeNumber: new FormControl(newUser.faculty.office.number)
    });
  }

  onSubmit() {
    this.adminUserService.addUser(this.userForm.value);
    // this.adminUsers = this.adminUserService.getUsers();
  }

}
