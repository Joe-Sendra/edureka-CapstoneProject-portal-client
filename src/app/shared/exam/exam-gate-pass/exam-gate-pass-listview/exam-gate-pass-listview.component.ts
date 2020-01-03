import { Component, Input, OnInit, OnDestroy, OnChanges } from '@angular/core';

import { ExamService } from '../../exam.service';
import { Subscription } from 'rxjs';
import { Student } from 'src/app/student/student.model';

@Component({
  selector: 'app-gate-pass-listview',
  templateUrl: './exam-gate-pass-listview.component.html',
  styleUrls: ['./exam-gate-pass-listview.component.css']
})
export class ExamGatePassListviewComponent implements OnInit, OnChanges, OnDestroy {

  @Input()isStudentsWithGatepass: boolean;
  @Input() examId: string;

  studentSub$: Subscription;
  studentList: string[];

  students: Student[];

  constructor(private examService: ExamService) {}

  ngOnInit() {
    this.studentSub$ = this.examService.getStudents(this.examId, this.isStudentsWithGatepass).subscribe(students => {
      this.students = students;
    });
  }

  ngOnChanges() {
    this.studentSub$ = this.examService.getStudents(this.examId, this.isStudentsWithGatepass).subscribe(students => {
      this.students = students;
    });
  }

  // TODO disable buttons and add updating spinner when add or remove is clicked
  onAddGatePass(studentID: string) {
    this.examService.addGatePass(this.examId, studentID);
  }

  onRemoveGatePass(studentID: string) {
    this.examService.removeGatePass(this.examId, studentID);
  }

  ngOnDestroy() {
    this.studentSub$.unsubscribe();
  }

}
