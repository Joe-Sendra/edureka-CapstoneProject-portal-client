import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { StudentService } from 'src/app/student/student.service';

@Component({
  selector: 'app-admin-enrollment-list',
  templateUrl: './admin-enrollment-list.component.html',
  styleUrls: ['./admin-enrollment-list.component.css']
})
export class AdminEnrollmentListComponent implements OnInit, OnDestroy {

  students: {email: string, registrationNumber: string}[];
  nonRegisteredSub: Subscription;
  emailMessage: {isSuccess: boolean, message: string, studentIndex: number} = { isSuccess: null, message: null, studentIndex: null};
  enrollTable = {
    page: 1,
    pageSize: 10,
    collectionSize: 0
  };
  constructor(private studentService: StudentService, private router: Router) {}

  get enrollPage() {
    return this.students
      .map((student, i) => ({id: i + 1, ...student}))
      .slice((this.enrollTable.page - 1) * this.enrollTable.pageSize,
        (this.enrollTable.page - 1) * this.enrollTable.pageSize + this.enrollTable.pageSize);
  }

  ngOnInit() {
    this.nonRegisteredSub = this.studentService.getNonRegistered().subscribe(students => {
      this.students = students;
      this.enrollTable.collectionSize = this.students.length;
    });
  }

  onSendEmail(student) {
    this.studentService.sendEmails([student]).then(isSuccess => {
      this.emailMessage.studentIndex = this.students.indexOf(student);
      if (isSuccess) {
        this.emailMessage.message = 'Email successfully sent!';
        this.emailMessage.isSuccess = true;
      } else {
        this.emailMessage.message = 'Error: Problem sending email';
        this.emailMessage.isSuccess = false;
      }
    });
  }

  onRegister(student: {email: string, registrationNumber: string}) {
    this.router.navigate(['admin', 'register', {email: student.email, reg: student.registrationNumber}]);
  }

  ngOnDestroy() {
    this.nonRegisteredSub.unsubscribe();
  }

}
