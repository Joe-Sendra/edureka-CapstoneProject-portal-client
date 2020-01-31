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
  addAdminStatus = {
    isSuccess: null,
    message: null
  };
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
    this.adminUserService.addUser(this.userForm.value).then(isSuccess => {
      console.log('onsubmit isSuccess', isSuccess);
      if (isSuccess) {
        this.addAdminStatus.isSuccess = true;
        this.addAdminStatus.message = 'Admin user successfully added';
        this.userForm.reset();
      } else {
        this.addAdminStatus.isSuccess = false;
        this.addAdminStatus.message = 'Admin user could not be added at this time.';
      }
    });
  }

}
