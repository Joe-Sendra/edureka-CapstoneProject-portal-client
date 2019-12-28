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
    this.passwordService.resetPassword(email);
  }

}
