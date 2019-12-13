import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { StudentService } from 'src/app/student/student.service';

@Component({
  selector: 'app-admin-enrollment',
  templateUrl: './admin-enrollment.component.html',
  styleUrls: ['./admin-enrollment.component.css']
})
export class AdminEnrollmentComponent implements OnInit {

  enrollmentForm: FormGroup;

  constructor(private studentService: StudentService) {}

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    let email = '';
    this.enrollmentForm = new FormGroup({
      email: new FormControl(email, [Validators.email, Validators.required])
    });
  }

  onSubmit() {
    this.studentService.addEnrollment(this.enrollmentForm.controls.email.value);
  }

}
