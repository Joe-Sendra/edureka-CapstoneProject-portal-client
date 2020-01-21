import { Component } from '@angular/core';
import { TimeTable } from '../exam.model';

@Component({
  selector: 'app-exam-timetable',
  templateUrl: './exam-timetable.component.html',
  styleUrls: ['./exam-timetable.component.css']
})
export class ExamTimeTableComponent {

  timeTable: TimeTable[] = [];

  onSelectExamLocation(examLocation) {
    this.timeTable = examLocation.timeTable;
  }
}
