import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdminUsersService } from '../admin-users/admin-users.service';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit, OnDestroy {

  profileForm: FormGroup;
  authSub$: Subscription;
  user = null;
  updateUserMessage: {isSuccess: boolean, message: string} = { isSuccess: null, message: null};

  constructor(
    private adminUsersService: AdminUsersService,
    private authService: AuthService, private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.authSub$ = this.authService.getAuthStatusListener().subscribe(authInfo => {
      this.adminUsersService.getUser(authInfo._id).then(user => {
        this.user = user;
        this.initForm();
      });
    });
  }

  initForm() {
    this.profileForm = this.formBuilder.group({
      nameFirst: [this.user.name.first, [Validators.required]],
      nameLast: [this.user.name.last, [Validators.required]],
      building: [this.user.faculty.office.building, [Validators.required]],
      number: [this.user.faculty.office.number, [Validators.required]],
      email: [this.user.email, [Validators.required]]
    });
  }

  onChangePassword() {
    this.router.navigate(['change-password']);
  }

  onCancel() {
    this.profileForm.reset();
    this.initForm();
  }

  onSubmit() {
    const formControls = this.profileForm.controls;
    const newFacultyInfo = {
      email: this.user.email,
      role: 'admin',
      name: {
        first: formControls.nameFirst.value,
        last: formControls.nameLast.value
      },
      faculty: {
        office: {
          building: formControls.building.value,
          number: formControls.number.value
        }
      }
    };
    this.adminUsersService.updateUser(this.user._id, newFacultyInfo).then(response => {
      this.updateUserMessage = response;
      if (response.isSuccess) {
        this.adminUsersService.getUser(this.user._id).then(user => {
          this.user = user;
          this.initForm();
        });
      }
    });
  }

  ngOnDestroy() {
    this.authSub$.unsubscribe();
  }

}
