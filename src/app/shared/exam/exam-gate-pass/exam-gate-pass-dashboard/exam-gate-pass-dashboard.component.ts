import { Component, OnInit, OnDestroy  } from '@angular/core';
import { ExamService } from '../../exam.service';
import { Exam } from '../../exam.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-exam-gate-pass-dashboard',
  templateUrl: './exam-gate-pass-dashboard.component.html',
  styleUrls: ['./exam-gate-pass-dashboard.component.css']
})
export class ExamGatePassDashboardComponent implements OnInit, OnDestroy {

  exams = [];
  examsSub$: Subscription;
  selectedExam: string;

  constructor(private examService: ExamService) {}

  ngOnInit() {
    this.examsSub$ = this.examService.getExams().subscribe(exams => {
      this.exams = exams;
    });
  }

  ngOnDestroy() {
    this.examsSub$.unsubscribe();
  }

}
