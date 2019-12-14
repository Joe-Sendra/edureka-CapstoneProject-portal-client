import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { StudentService } from 'src/app/student/student.service';
import { Student } from 'src/app/student/student.model';

@Component({
  selector: 'app-admin-enrollment',
  templateUrl: './admin-enrollment.component.html',
  styleUrls: ['./admin-enrollment.component.css']
})
export class AdminEnrollmentComponent implements OnInit, OnDestroy {

  enrollmentForm: FormGroup;
  enrollmentSub: Subscription;
  nonRegisteredStudents: Student[];

  constructor(private studentService: StudentService) {}

  ngOnInit() {
    this.enrollmentSub = this.studentService.nonRegisteredStudentsSub.subscribe(students => {
      this.nonRegisteredStudents = students;
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
    this.studentService.addEnrollment(this.enrollmentForm.controls.email.value);
    console.log(this.studentService.getNonRegisteredStudents());
  }

  onEmail() {
    this.studentService.sendEmails(this.nonRegisteredStudents);
  }

  ngOnDestroy() {
    this.enrollmentSub.unsubscribe();
  }
}
