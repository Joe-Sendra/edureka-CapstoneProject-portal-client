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
  // enrollmentSub: Subscription;
  // nonRegisteredStudents: Student[];

  constructor(private studentService: StudentService) {}

  ngOnInit() {
    // this.enrollmentSub = this.studentService.getNonRegistered().subscribe(students => {
    //   this.nonRegisteredStudents = students;
    // });
    this.initForm();
  }

  private initForm() {
    const email = '';
    this.enrollmentForm = new FormGroup({
      email: new FormControl(email, [Validators.email, Validators.required])
    });
  }

  onSubmit() {
    this.studentService.addEnrollment(this.enrollmentForm.controls.email.value).then(response => {
      console.log(response);
      // if (isSuccess) {
      //   this.enrollmentForm.reset();
      // } else {
      //   // this.statusMessage = 'Student could not be added!';
      //   console.log('Student could not be added!');
      // }
    });
  }

  // onEmail() {
  //   this.studentService.sendEmails(this.nonRegisteredStudents);
  // }

  ngOnDestroy() {
    // this.enrollmentSub.unsubscribe();
  }
}
