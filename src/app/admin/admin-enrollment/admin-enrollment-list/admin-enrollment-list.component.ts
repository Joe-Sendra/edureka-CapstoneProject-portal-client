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

  students: {email: string, registrationNumber: string}[];
  nonRegisteredSub: Subscription;

  constructor(private studentService: StudentService, private router: Router) {}

  ngOnInit() {
    this.studentService.getNonRegisteredStudents();
    this.nonRegisteredSub = this.studentService.getNonRegistered().subscribe(students => {
      this.students = students;
    });
  }

  onSendEmail(student: Student) {
    this.studentService.sendEmail(student);
  }

  onEnroll(student: Student) {
    this.router.navigate(['admin', 'register', {email: student.email, reg: student.registrationNumber}]);
  }

  ngOnDestroy() {
    this.nonRegisteredSub.unsubscribe();
  }

}
