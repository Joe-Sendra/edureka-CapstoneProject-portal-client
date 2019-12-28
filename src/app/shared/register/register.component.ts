import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';

import { StudentService } from 'src/app/student/student.service';
import { Student } from 'src/app/student/student.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  email = '';
  regNumber = '';
  registerStudentMessage: {isSuccess: boolean, message: string} = { isSuccess: null, message: null};

  constructor(private studentService: StudentService, private route: ActivatedRoute, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.email = params.get('email');
      this.regNumber = params.get('reg');
    });

    this.initForm();
  }


  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  private initForm() {
    this.registerForm = this.formBuilder.group({
      email: [this.email, [Validators.required, Validators.email]],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmNewPassword: ['', Validators.required],
      regNumber: [this.regNumber, Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
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
    const studentRegister: Student = {
      email: this.registerForm.controls.email.value,
      password: this.registerForm.controls.newPassword.value,
      role: 'student',
      name: {
        first: this.registerForm.controls.firstName.value,
        last: this.registerForm.controls.lastName.value
      }
    };
    const registrationNumber = this.registerForm.controls.regNumber.value;
    this.studentService.enrollStudent(studentRegister, registrationNumber).then(isSuccess => {
      if (isSuccess) {
        this.registerForm.reset();
        this.registerStudentMessage.isSuccess = true;
        this.registerStudentMessage.message = 'Student successfully registered';
      } else {
        this.registerStudentMessage.isSuccess = false;
        this.registerStudentMessage.message = 'Student could not be registered.';
      }
    });
  }

}
