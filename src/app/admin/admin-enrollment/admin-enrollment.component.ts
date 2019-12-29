import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { StudentService } from 'src/app/student/student.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-admin-enrollment',
  templateUrl: './admin-enrollment.component.html',
  styleUrls: ['./admin-enrollment.component.css']
})
export class AdminEnrollmentComponent implements OnInit {

  enrollmentForm: FormGroup;
  addEnrollmentMessage: {isSuccess: boolean, message: string} = { isSuccess: null, message: null};
  emailMessage: {isSuccess: boolean, message: string} = { isSuccess: null, message: null};
  constructor(private studentService: StudentService) {}

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    const email = '';
    this.enrollmentForm = new FormGroup({
      email: new FormControl(email, [Validators.email, Validators.required])
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.enrollmentForm.controls; }

  onSubmit() {
    this.studentService.addEnrollment(this.enrollmentForm.controls.email.value).then(isSuccess => {
      if (isSuccess) {
        this.enrollmentForm.reset();
        this.addEnrollmentMessage.message = 'Student successfully added!';
        this.addEnrollmentMessage.isSuccess = true;
      } else {
        this.addEnrollmentMessage.message = 'Student could not be added, may aleady be enrolled!';
        this.addEnrollmentMessage.isSuccess = false;
      }
    });
  }

  onEmail() {
    this.studentService.getNonRegistered().pipe(take(1)).subscribe(students => {
      this.studentService.sendEmails(students).then(isSuccess => {
        if (isSuccess) {
          this.emailMessage.message = 'Emails successfully sent!';
          this.emailMessage.isSuccess = true;
        } else {
          this.emailMessage.message = 'Error: Problem sending emails';
          this.emailMessage.isSuccess = false;
        }
      });
    });

  }

}
