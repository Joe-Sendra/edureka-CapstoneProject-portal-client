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

  constructor(private studentService: StudentService, private router: Router) {}

  ngOnInit() {
    this.nonRegisteredSub = this.studentService.getNonRegistered().subscribe(students => {
      this.students = students;
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
