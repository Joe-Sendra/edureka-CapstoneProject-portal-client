import { Component, OnInit, OnDestroy } from '@angular/core';

import { StudentService } from 'src/app/student/student.service';

import { Student } from 'src/app/student/student.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-enrollment-list',
  templateUrl: './admin-enrollment-list.component.html',
  styleUrls: ['./admin-enrollment-list.component.css']
})
export class AdminEnrollmentListComponent implements OnInit, OnDestroy {

  students: Student[];
  nonRegisteredSub: Subscription;

  constructor(private studentService: StudentService, private router: Router) {}

  ngOnInit() {
    this.nonRegisteredSub = this.studentService.nonRegisteredStudentsSub.subscribe(students => {
      this.students = students;
      console.log('nonRegistered students: ', this.students);
    });
  }

  onSendEmail(student: Student) {
    this.studentService.sendEmail(student);
  }

  onEnroll(student: Student) {
    this.router.navigate(['admin', 'register', {email: student.email, reg: student.registrationNumber}]);
    console.log('TODO - enroll this student: ', student);
  }

  ngOnDestroy() {
    this.nonRegisteredSub.unsubscribe();
  }

}
