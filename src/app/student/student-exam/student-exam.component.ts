import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { StudentService } from '../student.service';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { Student } from '../student.model';

@Component({
  selector: 'app-student-exam',
  templateUrl: './student-exam.component.html',
  styleUrls: ['./student-exam.component.css']
})
export class StudentExamComponent implements OnInit, OnDestroy {

  user: Student;
  authSub: Subscription;
  gatePasses = []; // TODO define gatepass model

  constructor(private studentService: StudentService, private authService: AuthService) {}

    ngOnInit() {
      this.authSub = this.authService.getAuthStatusListener().subscribe(status => {
        this.studentService.getStudent(status._id).then(student => {
            this.user = student;
            this.getGatePasses();
        });
      });
    }

    getGatePasses() {
      this.studentService.getStudentGatePasses(this.user._id).then(gatePasses => {
        this.gatePasses = gatePasses;
      });
    }

    ngOnDestroy() {
      this.authSub.unsubscribe();
    }
}
