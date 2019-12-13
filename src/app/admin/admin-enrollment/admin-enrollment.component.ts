import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { EnrollmentItem } from './enrollment.model';
import { EnrollmentService } from './enrollment.service';

@Component({
  selector: 'app-admin-enrollment',
  templateUrl: './admin-enrollment.component.html',
  styleUrls: ['./admin-enrollment.component.css']
})
export class AdminEnrollmentComponent implements OnInit, OnDestroy {

  studentEnrollment: EnrollmentItem[];
  enrollmentSub: Subscription;

  enrollmentForm: FormGroup;

  constructor(private enrollmentService: EnrollmentService) {}

  ngOnInit() {
    this.enrollmentSub = this.enrollmentService.enrollmentSub.subscribe(enrollment => {
      this.studentEnrollment = enrollment;
    });
    this.initForm();
  }

  private initForm() {
    let email = '';
    this.enrollmentForm = new FormGroup({
      email: new FormControl(email, [Validators.email, Validators.required])
    });
  }

  onSubmit() {
    this.enrollmentService.addEnrollment(this.enrollmentForm.value);
  }

  ngOnDestroy() {
    this.enrollmentSub.unsubscribe();
  }

}
