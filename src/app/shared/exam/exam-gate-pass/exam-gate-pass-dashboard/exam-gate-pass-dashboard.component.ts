import { Component, OnInit, OnDestroy, OnChanges  } from '@angular/core';
import { ExamService } from '../../exam.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-exam-gate-pass-dashboard',
  templateUrl: './exam-gate-pass-dashboard.component.html',
  styleUrls: ['./exam-gate-pass-dashboard.component.css']
})
export class ExamGatePassDashboardComponent implements OnInit, OnDestroy {

  exams = [];
  examsSub$: Subscription;
  selectedShift = {examID: null, shiftID: null};

  constructor(private examService: ExamService) {}

  ngOnInit() {
    this.examService.getExams().then(examsSubject => {
      this.examsSub$ = examsSubject.subscribe(exams => {
        exams.forEach(exam => {
          if (exam.timeTable.length > 0) {
            exam.timeTable.map(shift => {
              this.exams.push({
                examID: exam._id,
                name: exam.name,
                location: exam.location,
                shiftID: shift._id,
                date: shift.examDate,
                time: shift.examTime
              });
            });
          }
        });
        this.selectedShift = {
          examID: this.exams[0].examID,
          shiftID: this.exams[0].shiftID
        };
      });
    });
  }

  onSelectShift() {
    this.exams.find((exam) => {
      if (exam.shiftID === this.selectedShift.shiftID) {
        this.selectedShift.examID = exam.examID;
        return true;
      }
    });
  }

  ngOnDestroy() {
    this.examsSub$.unsubscribe();
  }

}
