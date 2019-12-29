import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PasswordService } from '../../password.service';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-reset-password-response',
  templateUrl: './reset-password-response.component.html',
  styleUrls: ['./reset-password-response.component.css']
})
export class ResetPasswordResponseComponent implements OnInit {

  email = '';
  token = '';

  resetPasswordForm: FormGroup;
  resetPasswordMessage = {
    isSuccess: null,
    message: null
  };

  constructor(private route: ActivatedRoute, private passwordService: PasswordService, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.email = params.get('userID');
      this.token = params.get('token');
    });
    this.initForm();
  }

  // convenience getter for easy access to form fields
  get f() { return this.resetPasswordForm.controls; }

  initForm() {
    this.resetPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
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
    const form = this.resetPasswordForm.controls;
    this.passwordService.resetPassword(form.email.value, this.token, form.newPassword.value).then(isSuccess => {
      if (isSuccess) {
        this.resetPasswordMessage.isSuccess = true;
        this.resetPasswordMessage.message = 'Password successfully reset';
        this.resetPasswordForm.reset();
      } else {
        this.resetPasswordMessage.isSuccess = false;
        this.resetPasswordMessage.message = 'Error: password could not be reset';
      }
    });

  }

}
