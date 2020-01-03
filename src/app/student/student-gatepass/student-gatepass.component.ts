import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Student } from '../student.model';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student-gatepass',
  templateUrl: './student-gatepass.component.html',
  styleUrls: ['./student-gatepass.component.css']
})
export class StudentGatepassComponent implements OnInit, OnChanges {
  @Input()user: Student;
  gatePasses = []; // TODO define gatepass model

  constructor(private studentService: StudentService) {}

    ngOnInit() {
      this.getStudentGatePasses();
    }

    ngOnChanges() {
      this.getStudentGatePasses();
    }

    getStudentGatePasses() {
      this.studentService.getStudentGatePasses(this.user._id).then(gatePasses => {
        this.gatePasses = gatePasses;
      });
    }

}
