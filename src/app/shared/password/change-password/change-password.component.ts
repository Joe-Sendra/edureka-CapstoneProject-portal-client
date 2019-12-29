import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { PasswordService } from '../password.service';
import { AuthService } from '../../auth/auth.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  email = null;

  changePasswordForm: FormGroup;
  changePasswordMessage = {
    isSuccess: null,
    message: null
  };
  constructor(private authService: AuthService, private passwordService: PasswordService, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.authService.getAuthStatusListener().pipe(take(1)).subscribe(authStatus => {
      this.email = authStatus.user;
    });
    this.initForm();
  }

  // convenience getter for easy access to form fields
  get f() { return this.changePasswordForm.controls; }

  initForm() {
    this.changePasswordForm = this.formBuilder.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmNewPassword: ['', Validators.required]
    }, {validator: this.MustMatch('newPassword', 'confirmNewPassword')});
  }

  // Validator function to compare password with confirm password
  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    };
  }

  onSubmit() {
    const form = this.changePasswordForm.controls;
    this.passwordService.changePassword(this.email, form.oldPassword.value, form.newPassword.value).then(isSuccess => {
      if (isSuccess) {
        this.changePasswordMessage.isSuccess = true;
        this.changePasswordMessage.message = 'Password successfully changed';
        this.changePasswordForm.reset();
      } else {
        this.changePasswordMessage.isSuccess = false;
        this.changePasswordMessage.message = 'Error: password could not be changed';
      }
    });

  }
}
