import { Component, Input, OnInit, OnDestroy, OnChanges } from '@angular/core';

import { ExamService } from '../../exam.service';
import { Subscription } from 'rxjs';

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

  constructor(private examService: ExamService) {}

  ngOnInit() {
    this.studentSub$ = this.examService.getStudents(this.examId, this.isStudentsWithGatepass).subscribe(studentIDs => {
      this.studentList = studentIDs;
    });
  }

  ngOnChanges() {
    this.studentSub$ = this.examService.getStudents(this.examId, this.isStudentsWithGatepass).subscribe(studentIDs => {
      this.studentList = studentIDs;
    });
  }

  onAddGatePass(studentID: string) {
    this.examService.addGatePass(this.examId, studentID);
  }

  onRemoveGatePass(studentID: string) {
    // TODO
  }

  ngOnDestroy() {
    this.studentSub$.unsubscribe();
  }

}
