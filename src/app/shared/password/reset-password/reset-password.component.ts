import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PasswordService } from '../password.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  resetPasswordForm: FormGroup;
  resetPasswordMessage = {
    isSuccess: null,
    message: null
  };

  constructor(private passwordService: PasswordService) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    const email = '';
    this.resetPasswordForm = new FormGroup({
      email: new FormControl(email, [Validators.required, Validators.email])
    });
  }

  onSubmit(email) {
    this.passwordService.sendResetEmail(email).then(isSuccess => {
      if (isSuccess) {
        this.resetPasswordMessage.isSuccess = true;
        this.resetPasswordMessage.message = 'Email has been sent';
        this.resetPasswordForm.reset();
      } else {
        this.resetPasswordMessage.isSuccess = false;
        this.resetPasswordMessage.message = 'Error: email not sent';
      }
    }); // TODO update template with status
  }

}
